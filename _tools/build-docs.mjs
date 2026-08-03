import { execFileSync } from "node:child_process";
import { readFile, readdir, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const sourceRoot = path.join(siteRoot, "_docs");
const outputRoot = path.join(siteRoot, "docs");
const siteSourceRoot = path.join(siteRoot, "_site");
const blogSourceRoot = path.join(siteRoot, "_blog");
const buildDate = "2026-08-03";
const assetVersion = "20260803-3";
const localeCodes = ["en", "fr", "es-419", "pt-BR", "ja"];

const productConfig = JSON.parse(
  await readFile(path.join(siteSourceRoot, "product.json"), "utf8")
);
const canonicalOrigin = productConfig.canonicalOrigin;
const appStoreUrl = productConfig.appStore.default;

const baseNavigation = JSON.parse(
  await readFile(path.join(sourceRoot, "navigation.json"), "utf8")
);
const translationOverrides = JSON.parse(
  await readFile(path.join(siteSourceRoot, "translation-overrides.json"), "utf8")
);
const editorialOverrides = JSON.parse(
  await readFile(path.join(siteSourceRoot, "editorial-overrides.json"), "utf8")
);
const homepageContent = JSON.parse(
  await readFile(path.join(siteSourceRoot, "homepage.json"), "utf8")
);
const blogManifest = JSON.parse(
  await readFile(path.join(blogSourceRoot, "posts.json"), "utf8")
);
const landingContent = new Map(await Promise.all(localeCodes.map(async (code) => {
  const content = JSON.parse(
    await readFile(path.join(siteSourceRoot, "landing-pages", `${code}.json`), "utf8")
  );
  return [code, content];
})));
const locales = await Promise.all(localeCodes.map(async (code) => {
  const catalog = JSON.parse(
    await readFile(path.join(siteSourceRoot, "locales", `${code}.json`), "utf8")
  );
  const prefix = code === "en" ? "" : `/${code}`;
  const translations = {
    ...catalog.translations,
    ...(translationOverrides[code] || {}),
    ...(editorialOverrides[code] || {})
  };
  const locale = {
    code,
    prefix,
    nativeName: catalog.nativeName,
    translations
  };
  locale.pages = baseNavigation.pages.map((page) => ({
    ...page,
    locale,
    source: code === "en" ? page.source : `locales/${code}/${page.source}`,
    logicalSource: page.source,
    logicalRoute: page.route,
    route: `${prefix}${page.route}`
  }));
  return locale;
}));
const localeByCode = new Map(locales.map((locale) => [locale.code, locale]));
const allPages = locales.flatMap((locale) => locale.pages);
const landingPages = locales.flatMap((locale) => {
  const content = landingContent.get(locale.code);
  return content.pages.map((page) => ({
    ...page,
    locale,
    logicalRoute: page.route,
    route: localizedRoute(locale, page.route)
  }));
});
const landingPageByLocaleAndId = new Map(
  landingPages.map((page) => [`${page.locale.code}:${page.id}`, page])
);
const blogPages = locales.flatMap((locale) => blogManifest.posts.map((post) => ({
  ...post,
  locale,
  content: post.locales[locale.code],
  source: locale.code === "en" ? post.source : `locales/${locale.code}/${post.source}`,
  logicalSource: post.source,
  logicalRoute: post.route,
  route: localizedRoute(locale, post.route)
})));

const pageBySource = new Map(allPages.map((page) => [page.source, page]));
const imageMap = new Map();

function translate(locale, value) {
  if (!value) return value;
  return locale.translations[value] || value;
}

function localizedRoute(locale, logicalRoute) {
  return `${locale.prefix}${logicalRoute}`;
}

function canonicalUrlForRoute(route) {
  if (!route.startsWith("/")) {
    throw new Error(`Canonical routes must be root-relative: ${route}`);
  }
  if (route.includes("#") || route.includes("?") || route.includes("index.html")) {
    throw new Error(`Canonical routes cannot contain fragments, queries, or index.html: ${route}`);
  }
  if (route !== "/" && !route.endsWith("/") && !route.endsWith(".html")) {
    throw new Error(`Canonical routes must end in / or .html: ${route}`);
  }
  return `${canonicalOrigin}${route}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function plainText(value) {
  return String(value)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/[_#]/g, "")
    .trim();
}

function slugify(value) {
  const slug = plainText(value)
    .normalize("NFKC")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  const resolvedSlug = slug || "section";
  return /^[0-9]/.test(resolvedSlug) ? `section-${resolvedSlug}` : resolvedSlug;
}

function normalizeSourcePath(value) {
  return path.posix.normalize(value.replaceAll("\\", "/"));
}

function resolveLink(destination, page) {
  if (
    destination.startsWith("http://") ||
    destination.startsWith("https://") ||
    destination.startsWith("mailto:") ||
    destination.startsWith("#") ||
    destination.startsWith("/")
  ) {
    return destination;
  }

  const hashIndex = destination.indexOf("#");
  const sourceDestination = hashIndex === -1 ? destination : destination.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : destination.slice(hashIndex);

  if (!sourceDestination.endsWith(".md")) {
    return destination;
  }

  const resolvedSource = normalizeSourcePath(
    path.posix.join(path.posix.dirname(page.source), sourceDestination)
  );
  const targetPage = pageBySource.get(resolvedSource);
  if (!targetPage) {
    throw new Error(`Unresolved Markdown link in ${page.source}: ${destination}`);
  }
  return `${targetPage.route}${fragment}`;
}

function renderInline(value, page) {
  let output = "";
  let index = 0;

  while (index < value.length) {
    if (value.startsWith("**", index)) {
      const end = value.indexOf("**", index + 2);
      if (end !== -1) {
        output += `<strong>${renderInline(value.slice(index + 2, end), page)}</strong>`;
        index = end + 2;
        continue;
      }
    }

    if (value[index] === "`") {
      const end = value.indexOf("`", index + 1);
      if (end !== -1) {
        output += `<code>${escapeHtml(value.slice(index + 1, end))}</code>`;
        index = end + 1;
        continue;
      }
    }

    if (value[index] === "[") {
      const labelEnd = value.indexOf("](", index + 1);
      if (labelEnd !== -1) {
        const destinationEnd = value.indexOf(")", labelEnd + 2);
        if (destinationEnd !== -1) {
          const label = value.slice(index + 1, labelEnd);
          const destination = value.slice(labelEnd + 2, destinationEnd).trim();
          const href = resolveLink(destination, page);
          output += `<a href="${escapeHtml(href)}">${renderInline(label, page)}</a>`;
          index = destinationEnd + 1;
          continue;
        }
      }
    }

    if (value[index] === "*" && value[index + 1] !== "*") {
      const end = value.indexOf("*", index + 1);
      if (end !== -1) {
        output += `<em>${renderInline(value.slice(index + 1, end), page)}</em>`;
        index = end + 1;
        continue;
      }
    }

    if (value[index] === "\\" && index + 1 < value.length) {
      output += escapeHtml(value[index + 1]);
      index += 2;
      continue;
    }

    output += escapeHtml(value[index]);
    index += 1;
  }

  return output;
}

function splitTableRow(line) {
  let row = line.trim();
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|")) row = row.slice(0, -1);
  return row.split("|").map((cell) => cell.trim());
}

function isTableDivider(line) {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isStandaloneImage(line) {
  return /^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim());
}

function startsBlock(lines, index) {
  const line = lines[index] || "";
  if (!line.trim()) return true;
  if (/^```/.test(line)) return true;
  if (/^#{1,6}\s+/.test(line)) return true;
  if (/^>\s?/.test(line)) return true;
  if (/^[-*+]\s+/.test(line)) return true;
  if (/^\d+\.\s+/.test(line)) return true;
  if (isStandaloneImage(line)) return true;
  if (line.includes("|") && isTableDivider(lines[index + 1] || "")) return true;
  return false;
}

function renderImage(line, page) {
  const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (!match) throw new Error(`Unsupported image syntax in ${page.source}: ${line}`);

  const alt = match[1].trim();
  const destination = match[2].trim().replace(/\s+"[^"]*"$/, "");
  if (!alt) throw new Error(`Documentation image is missing alt text in ${page.source}`);
  if (/^(https?:)?\/\//.test(destination)) {
    throw new Error(`Remote documentation images are not supported: ${destination}`);
  }

  const homepageImage = destination.match(/^\/assets\/home\/([^/]+)\/(.+)-1440\.webp$/);
  if (homepageImage) {
    if (!page.content || homepageImage[1] !== page.locale.code) {
      throw new Error(`Localized blog image does not match ${page.locale.code} in ${page.source}: ${destination}`);
    }
    const base = `/assets/home/${homepageImage[1]}/${homepageImage[2]}`;
    return [
      '<figure class="docs-figure blog-product-figure">',
      `  <a href="${base}-2880.webp"><img src="${base}-1440.webp" srcset="${base}-960.webp 960w, ${base}-1440.webp 1440w" sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) calc(100vw - 80px), 760px" alt="${escapeHtml(alt)}" width="1440" height="900" loading="lazy" decoding="async"></a>`,
      "</figure>"
    ].join("\n");
  }

  const sourcePath = normalizeSourcePath(
    path.posix.join(path.posix.dirname(page.source), destination)
  );
  const image = imageMap.get(sourcePath);
  if (!image) throw new Error(`Missing documentation image in ${page.source}: ${destination}`);

  return [
    '<figure class="docs-figure">',
    `  <img src="${image.large.url}" srcset="${image.small.url} ${image.small.width}w, ${image.large.url} ${image.large.width}w" sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) calc(100vw - 80px), 760px" alt="${escapeHtml(alt)}" width="${image.large.width}" height="${image.large.height}" loading="lazy" decoding="async">`,
    "</figure>"
  ].join("\n");
}

function renderMarkdown(markdown, page) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks = [];
  const headings = [];
  const usedSlugs = new Map();
  let index = 0;

  function uniqueSlug(text) {
    const base = slugify(text);
    const count = usedSlugs.get(base) || 0;
    usedSlugs.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  }

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fenceMatch = line.match(/^```([A-Za-z0-9_-]*)\s*$/);
    if (fenceMatch) {
      const language = fenceMatch[1];
      const code = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index >= lines.length) throw new Error(`Unclosed code fence in ${page.source}`);
      index += 1;
      const languageClass = language ? ` class="language-${escapeHtml(language)}"` : "";
      blocks.push({
        type: "code",
        html: `<div class="code-block"><pre><code${languageClass}>${escapeHtml(code.join("\n"))}</code></pre></div>`
      });
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const slug = uniqueSlug(text);
      const label = plainText(text);
      const anchor = level === 1
        ? ""
        : ` <a class="heading-anchor" href="#${slug}" aria-label="${escapeHtml(translate(page.locale, "Section link"))}: ${escapeHtml(label)}"><span aria-hidden="true">#</span></a>`;
      blocks.push({
        type: "heading",
        level,
        slug,
        text: label,
        html: `<h${level} id="${slug}">${renderInline(text, page)}${anchor}</h${level}>`
      });
      if (level === 2 || level === 3) headings.push({ level, slug, text: label });
      index += 1;
      continue;
    }

    if (isStandaloneImage(line)) {
      blocks.push({ type: "image", html: renderImage(line, page) });
      index += 1;
      continue;
    }

    if (line.includes("|") && isTableDivider(lines[index + 1] || "")) {
      const headers = splitTableRow(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      const headHtml = headers.map((cell) => `<th scope="col">${renderInline(cell, page)}</th>`).join("");
      const bodyHtml = rows.map((row) => {
        const cells = headers.map((_, cellIndex) => `<td>${renderInline(row[cellIndex] || "", page)}</td>`).join("");
        return `<tr>${cells}</tr>`;
      }).join("\n");
      blocks.push({
        type: "table",
        html: `<section class="table-wrap" tabindex="0" aria-label="${escapeHtml(translate(page.locale, "Scrollable table"))}"><table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></section>`
      });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", html: `<blockquote><p>${renderInline(quote.join(" "), page)}</p></blockquote>` });
      continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*+]\s+/, ""));
        index += 1;
      }
      blocks.push({
        type: "list",
        html: `<ul>${items.map((item) => `<li>${renderInline(item, page)}</li>`).join("")}</ul>`
      });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      const start = Number(line.match(/^(\d+)\./)[1]);
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      const startAttribute = start === 1 ? "" : ` start="${start}"`;
      blocks.push({
        type: "list",
        html: `<ol${startAttribute}>${items.map((item) => `<li>${renderInline(item, page)}</li>`).join("")}</ol>`
      });
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim() && !startsBlock(lines, index)) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    if (paragraphLines.length === 0) {
      throw new Error(`Unsupported Markdown block in ${page.source} at line ${index + 1}: ${line}`);
    }
    const paragraph = paragraphLines.map((paragraphLine, lineIndex) => {
      const hardBreak = /\s{2}$/.test(paragraphLine);
      const rendered = renderInline(paragraphLine.replace(/\s{2}$/, ""), page);
      if (hardBreak) return `${rendered}<br>`;
      return lineIndex < paragraphLines.length - 1 ? `${rendered} ` : rendered;
    }).join("");
    blocks.push({
      type: "paragraph",
      text: plainText(paragraphLines.join(" ")),
      html: `<p>${paragraph}</p>`
    });
  }

  if (!blocks.length || blocks[0].type !== "heading" || blocks[0].level !== 1) {
    throw new Error(`${page.source} must start with a level-one heading`);
  }

  const firstSection = blocks.findIndex((block) => block.type === "heading" && block.level === 2);
  const splitIndex = firstSection === -1 ? 1 : firstSection;
  return {
    title: blocks[0].text,
    titleHtml: blocks[0].html,
    introHtml: blocks.slice(1, splitIndex).map((block) => block.html).join("\n"),
    leadHtml: blocks.slice(0, splitIndex).map((block) => block.html).join("\n"),
    bodyHtml: blocks.slice(splitIndex).map((block) => block.html).join("\n"),
    description: blocks.find((block) => block.type === "paragraph")?.text || blocks[0].text,
    headings,
    sectionCount: headings.filter((heading) => heading.level === 2).length
  };
}

function readPngDimensions(buffer, fileName) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error(`Expected a PNG image: ${fileName}`);
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function optimizeImages() {
  const sourceDirectory = path.join(sourceRoot, "assets", "images");
  const outputDirectory = path.join(outputRoot, "assets", "images");
  await mkdir(outputDirectory, { recursive: true });

  try {
    execFileSync("cwebp", ["-version"], { stdio: "ignore" });
  } catch {
    throw new Error("The cwebp command is required to generate optimized documentation images.");
  }

  const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith(".png")).sort();
  for (const file of files) {
    const sourceFile = path.join(sourceDirectory, file);
    const sourceBuffer = await readFile(sourceFile);
    const dimensions = readPngDimensions(sourceBuffer, file);
    const baseName = path.basename(file, ".png");
    const variants = [];

    for (const maximumWidth of [800, 1600]) {
      const width = Math.min(maximumWidth, dimensions.width);
      const height = Math.round((dimensions.height * width) / dimensions.width);
      const outputName = `${baseName}-${maximumWidth}.webp`;
      const outputFile = path.join(outputDirectory, outputName);
      execFileSync(
        "cwebp",
        [
          "-quiet",
          "-q", "90",
          "-m", "6",
          "-metadata", "none",
          "-resize", String(width), String(height),
          sourceFile,
          "-o", outputFile
        ],
        { stdio: "pipe" }
      );
      variants.push({
        width,
        height,
        url: `/docs/assets/images/${outputName}`
      });
    }

    imageMap.set(`assets/images/${file}`, {
      small: variants[0],
      large: variants[1]
    });
  }
}

function renderBlogHeroSvg(page) {
  const labels = page.content.diagram;
  const text = (value) => escapeHtml(value);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
  <title id="title">${text(page.rendered.title)}</title>
  <desc id="description">${text(page.content.heroAlt)}</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061528"/>
      <stop offset="0.58" stop-color="#08244d"/>
      <stop offset="1" stop-color="#0a5d78"/>
    </linearGradient>
    <linearGradient id="source" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#15375f"/>
      <stop offset="1" stop-color="#0c2b50"/>
    </linearGradient>
    <linearGradient id="pack" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#31d4dc"/>
      <stop offset="1" stop-color="#72edf2"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#020b17" flood-opacity="0.42"/>
    </filter>
    <style>
      .label { font-family: Helvetica, sans-serif; font-weight: 700; text-anchor: middle; }
      .detail { font-family: Helvetica, sans-serif; font-weight: 500; text-anchor: middle; }
    </style>
  </defs>
  <rect width="1200" height="630" fill="url(#background)"/>
  <circle cx="110" cy="84" r="220" fill="#31d4dc" opacity="0.08"/>
  <circle cx="1090" cy="560" r="270" fill="#2ea9ff" opacity="0.10"/>
  <g filter="url(#shadow)">
    <rect x="105" y="56" width="990" height="112" rx="28" fill="url(#source)" stroke="#89b8d7" stroke-opacity="0.35"/>
    <rect x="374" y="237" width="452" height="112" rx="32" fill="url(#pack)"/>
    <rect x="54" y="446" width="510" height="136" rx="30" fill="#0c213c" stroke="#31d4dc" stroke-opacity="0.66"/>
    <rect x="636" y="446" width="510" height="136" rx="30" fill="#0c213c" stroke="#6ab8ff" stroke-opacity="0.72"/>
  </g>
  <path d="M600 168 V214" stroke="#7beff4" stroke-width="7" stroke-linecap="round"/>
  <path d="M600 349 V394 H309 V432 M600 394 H891 V432" fill="none" stroke="#7beff4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M585 198 L600 216 L615 198" fill="none" stroke="#7beff4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M294 416 L309 434 L324 416 M876 416 L891 434 L906 416" fill="none" stroke="#7beff4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <text class="label" x="600" y="125" fill="#f6fbff" font-size="31">${text(labels.sources)}</text>
  <text class="label" x="600" y="306" fill="#041121" font-size="35">${text(labels.pack)}</text>
  <text class="label" x="309" y="507" fill="#f6fbff" font-size="31">${text(labels.okf)}</text>
  <text class="detail" x="309" y="546" fill="#9fdce8" font-size="21">${text(labels.okfDetail)}</text>
  <text class="label" x="891" y="507" fill="#f6fbff" font-size="29">${text(labels.context)}</text>
  <text class="detail" x="891" y="546" fill="#a9d6ff" font-size="21">${text(labels.contextDetail)}</text>
</svg>\n`;
}

async function buildBlogAssets() {
  try {
    execFileSync("sips", ["--help"], { stdio: "ignore" });
  } catch {
    throw new Error("The macOS sips utility is required to generate localized blog social images.");
  }

  const root = path.join(siteRoot, "assets", "blog");
  await rm(root, { recursive: true, force: true });
  for (const page of blogPages) {
    const directory = path.join(root, page.locale.code);
    await mkdir(directory, { recursive: true });
    const svgFile = path.join(directory, `${page.heroAsset}.svg`);
    const pngFile = path.join(directory, `${page.heroAsset}.png`);
    await writeFile(svgFile, renderBlogHeroSvg(page));
    execFileSync("sips", ["-s", "format", "png", svgFile, "--out", pngFile], { stdio: "pipe" });
  }
}

function renderNavigation(currentPage) {
  const { locale } = currentPage;
  const homePage = locale.pages[0];
  const homeCurrent = currentPage.route === homePage.route ? ' aria-current="page"' : "";
  const groups = baseNavigation.groups.map((group) => {
    const links = locale.pages
      .filter((page) => page.group === group)
      .map((page) => {
        const current = currentPage.route === page.route ? ' aria-current="page"' : "";
        return `<li><a href="${page.route}"${current}>${escapeHtml(page.rendered.title)}</a></li>`;
      })
      .join("");
    return `<section class="docs-nav-group"><h2>${escapeHtml(translate(locale, group))}</h2><ul>${links}</ul></section>`;
  }).join("\n");

  return `<a class="docs-nav-home" href="${homePage.route}"${homeCurrent}>${escapeHtml(translate(locale, "Documentation Home"))}</a>${groups}`;
}

function renderBreadcrumbs(page, title) {
  const { locale } = page;
  const homeRoute = localizedRoute(locale, "/");
  const docsRoute = localizedRoute(locale, "/docs/");
  const crumbs = [`<li><a href="${homeRoute}">${escapeHtml(translate(locale, "Home"))}</a></li>`];
  if (page.logicalRoute === "/docs/") {
    crumbs.push(`<li aria-current="page">${escapeHtml(translate(locale, "Documentation"))}</li>`);
  } else {
    crumbs.push(`<li><a href="${docsRoute}">${escapeHtml(translate(locale, "Documentation"))}</a></li>`);
    if (page.group && page.group !== "Getting Started") {
      crumbs.push(`<li>${escapeHtml(translate(locale, page.group))}</li>`);
    }
    crumbs.push(`<li aria-current="page">${escapeHtml(title)}</li>`);
  }
  return `<nav class="breadcrumbs" aria-label="${escapeHtml(translate(locale, "Breadcrumb"))}"><ol>${crumbs.join("")}</ol></nav>`;
}

function renderToc(headings, className, label, locale) {
  const links = headings.map((heading) => (
    `<li class="toc-level-${heading.level}"><a href="#${heading.slug}">${escapeHtml(heading.text)}</a></li>`
  )).join("");
  return `<nav class="${className}" aria-label="${escapeHtml(translate(locale, label))}"><h2>${escapeHtml(translate(locale, "On this page"))}</h2><ol>${links}</ol></nav>`;
}

function renderPagination(page) {
  const { locale } = page;
  const index = locale.pages.findIndex((candidate) => candidate.route === page.route);
  const previous = locale.pages[index - 1];
  const next = locale.pages[index + 1];
  const previousHtml = previous
    ? `<a class="docs-page-link docs-page-link-previous" href="${previous.route}"><span>${escapeHtml(translate(locale, "Previous"))}</span><strong>${escapeHtml(previous.rendered.title)}</strong></a>`
    : '<span class="docs-page-link-placeholder" aria-hidden="true"></span>';
  const nextHtml = next
    ? `<a class="docs-page-link docs-page-link-next" href="${next.route}"><span>${escapeHtml(translate(locale, "Next"))}</span><strong>${escapeHtml(next.rendered.title)}</strong></a>`
    : '<span class="docs-page-link-placeholder" aria-hidden="true"></span>';
  return `<nav class="docs-pagination" aria-label="${escapeHtml(translate(locale, "Documentation pages"))}">${previousHtml}${nextHtml}</nav>`;
}

function renderAlternateLinks(logicalRoute) {
  const links = locales.map((locale) => (
    `  <link rel="alternate" hreflang="${locale.code}" href="${canonicalUrlForRoute(localizedRoute(locale, logicalRoute))}">`
  ));
  links.push(`  <link rel="alternate" hreflang="x-default" href="${canonicalUrlForRoute(logicalRoute)}">`);
  return links.join("\n");
}

function renderLanguageSelector(locale) {
  const options = locales.map((candidate) => {
    const selected = candidate.code === locale.code ? " selected" : "";
    return `<option value="${candidate.code}" lang="${candidate.code}"${selected}>${escapeHtml(candidate.nativeName)}</option>`;
  }).join("");
  return `<label class="locale-picker"><span class="visually-hidden">${escapeHtml(translate(locale, "Language"))}</span><select data-locale-select aria-label="${escapeHtml(translate(locale, "Select language"))}">${options}</select></label>`;
}

function renderHeader(locale, currentSection) {
  const link = (section, route, label) => {
    const current = currentSection === section ? ' aria-current="page"' : "";
    return `<a class="nav-link" href="${localizedRoute(locale, route)}"${current}>${escapeHtml(translate(locale, label))}</a>`;
  };
  const brandCurrent = currentSection === "home" ? ' aria-current="page"' : "";
  return `<header class="site-header">
    <nav class="nav" aria-label="${escapeHtml(translate(locale, "Main navigation"))}">
      <a class="brand" href="${localizedRoute(locale, "/")}"${brandCurrent}>
        <img class="brand-icon" src="/assets/icons/SourceShelf-Icon-lightmode.png" alt="" width="36" height="36">
        <span>SourceShelf</span>
      </a>
      <div class="nav-links">
        ${link("home", "/", "Home")}
        ${link("blog", "/blog/", "Blog")}
        ${link("privacy", "/privacy.html", "Privacy")}
        ${link("docs", "/docs/", "Documentation")}
        ${link("support", "/support.html", "Support")}
        <a class="nav-download" href="${appStoreUrl}" aria-label="${escapeHtml(translate(locale, "Download SourceShelf on the Mac App Store"))}">${escapeHtml(translate(locale, "Download"))}</a>
        ${renderLanguageSelector(locale)}
        <button class="theme-toggle" type="button" data-theme-toggle data-light-label="${escapeHtml(translate(locale, "Switch to light mode"))}" data-dark-label="${escapeHtml(translate(locale, "Switch to dark mode"))}" aria-label="${escapeHtml(translate(locale, "Toggle dark mode"))}" aria-pressed="false">
          <span class="theme-toggle-icon" aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  </header>`;
}

function renderFooter(locale) {
  const landing = landingContent.get(locale.code);
  const useCaseLinks = landing.pages.map((page) => (
    `<li><a href="${localizedRoute(locale, page.route)}">${escapeHtml(page.hero.eyebrow)}</a></li>`
  )).join("");
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-primary">
        <span>&copy; <span data-current-year>${new Date().getFullYear()}</span> SourceShelf</span>
        <div class="footer-links">
          <a href="${localizedRoute(locale, "/")}">${escapeHtml(translate(locale, "Home"))}</a>
          <a href="${localizedRoute(locale, "/blog/")}">${escapeHtml(translate(locale, "Blog"))}</a>
          <a href="${localizedRoute(locale, "/privacy.html")}">${escapeHtml(translate(locale, "Privacy"))}</a>
          <a href="${localizedRoute(locale, "/docs/")}">${escapeHtml(translate(locale, "Documentation"))}</a>
          <a href="${localizedRoute(locale, "/support.html")}">${escapeHtml(translate(locale, "Support"))}</a>
          <a href="mailto:support@sourceshelf.app">support@sourceshelf.app</a>
        </div>
      </div>
      <nav class="footer-use-cases" aria-label="${escapeHtml(landing.shared.sourceShelfUseCases)}">
        <h2>${escapeHtml(landing.shared.waysToUse)}</h2>
        <ul>${useCaseLinks}</ul>
      </nav>
    </div>
  </footer>`;
}

function renderHomepageImage(locale, item, lightbox, { hero = false } = {}) {
  const basePath = `/assets/home/${locale.code}/${item.image}`;
  const fullImagePath = `${basePath}-2880.webp`;
  const caption = item.title || item.alt;
  const loading = hero
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy"';
  const sizes = hero
    ? "(max-width: 920px) calc(100vw - 24px), 680px"
    : "(max-width: 700px) calc(100vw - 60px), (max-width: 1100px) calc(50vw - 48px), 560px";
  return `<a class="home-screenshot-trigger" href="${fullImagePath}" data-home-screenshot-trigger data-lightbox-alt="${escapeHtml(item.alt)}" data-lightbox-caption="${escapeHtml(caption)}" aria-haspopup="dialog" aria-controls="homepage-lightbox" aria-label="${escapeHtml(lightbox.openLabel)}: ${escapeHtml(caption)}">
    <img class="homepage-screenshot" src="${basePath}-1440.webp" srcset="${basePath}-960.webp 960w, ${basePath}-1440.webp 1440w" sizes="${sizes}" alt="${escapeHtml(item.alt)}" width="1440" height="900" ${loading} decoding="async">
    <span class="home-screenshot-expand" aria-hidden="true">${escapeHtml(lightbox.open)}</span>
  </a>`;
}

function renderHomepageFeatureCard(locale, item, lightbox) {
  return `<article class="home-feature-card">
    <div class="home-screenshot-frame">
      ${renderHomepageImage(locale, item, lightbox)}
    </div>
    <div class="home-feature-copy">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </div>
  </article>`;
}

function renderHomepageUseCases(locale) {
  const landing = landingContent.get(locale.code);
  const cards = landing.pages.map((page) => `<article class="home-use-case-card">
    <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
    <h3><a href="${localizedRoute(locale, page.route)}">${escapeHtml(page.hero.title)}</a></h3>
    <p>${escapeHtml(page.meta.socialDescription)}</p>
  </article>`).join("\n");
  return `<section id="ways-to-use" class="section home-use-cases-section" aria-labelledby="ways-to-use-title">
    <div class="section-heading home-section-heading">
      <p class="eyebrow">${escapeHtml(landing.shared.sourceShelfUseCases)}</p>
      <h2 id="ways-to-use-title">${escapeHtml(landing.shared.waysToUse)}</h2>
      <p>${escapeHtml(landing.shared.waysToUseIntro)}</p>
    </div>
    <div class="home-use-cases-grid">${cards}</div>
  </section>`;
}

function renderHomepageMain(locale, content) {
  const localized = (route) => localizedRoute(locale, route);
  const heroTitle = Array.isArray(content.hero.titleLines)
    ? content.hero.titleLines.map((line) => `<span class="home-title-line">${escapeHtml(line)}</span>`).join("")
    : escapeHtml(content.hero.title);
  const heroImage = {
    image: "01-private-ai-source-packs",
    alt: content.hero.alt,
    title: content.hero.title
  };
  const proofItems = content.proof.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const captureCards = content.capture.items.map((item) => renderHomepageFeatureCard(locale, item, content.lightbox)).join("\n");
  const reviewCards = content.review.items.map((item) => renderHomepageFeatureCard(locale, item, content.lightbox)).join("\n");
  const connectCards = content.connect.items.map((item) => renderHomepageFeatureCard(locale, item, content.lightbox)).join("\n");

  return `<main id="main" class="main home-main">
    <section class="section hero home-hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <img class="hero-icon" src="/assets/icons/SourceShelf-Icon-lightmode.png" alt="" width="96" height="96">
        <p class="eyebrow">${escapeHtml(content.hero.eyebrow)}</p>
        <h1 id="hero-title">${heroTitle}</h1>
        <p class="home-hero-tagline">${escapeHtml(content.hero.tagline)}</p>
        <p class="subheading">${escapeHtml(content.hero.description)}</p>
        <div class="actions">
          <a class="button button-primary" href="${appStoreUrl}">${escapeHtml(content.hero.download)}</a>
          <a class="button button-secondary" href="#how-it-works">${escapeHtml(content.hero.seeHow)}</a>
        </div>
        <ul class="home-proof-list" aria-label="${escapeHtml(content.hero.eyebrow)}">${proofItems}</ul>
      </div>
      <div class="hero-visual home-hero-visual">
        <div class="home-screenshot-frame home-hero-frame">
          ${renderHomepageImage(locale, heroImage, content.lightbox, { hero: true })}
        </div>
      </div>
    </section>

    <section id="how-it-works" class="section home-story-section" aria-labelledby="capture-title">
      <div class="section-heading home-section-heading">
        <p class="eyebrow">${escapeHtml(content.capture.eyebrow)}</p>
        <h2 id="capture-title">${escapeHtml(content.capture.title)}</h2>
        <p>${escapeHtml(content.capture.intro)}</p>
      </div>
      <div class="home-feature-grid home-feature-grid-three">
        ${captureCards}
      </div>
    </section>

    <section class="section home-story-section home-story-section-tinted" aria-labelledby="review-title">
      <div class="section-heading home-section-heading">
        <p class="eyebrow">${escapeHtml(content.review.eyebrow)}</p>
        <h2 id="review-title">${escapeHtml(content.review.title)}</h2>
        <p>${escapeHtml(content.review.intro)}</p>
      </div>
      <div class="home-feature-grid home-feature-grid-two">
        ${reviewCards}
      </div>
    </section>

    <section class="section home-story-section" aria-labelledby="connect-title">
      <div class="section-heading home-section-heading">
        <p class="eyebrow">${escapeHtml(content.connect.eyebrow)}</p>
        <h2 id="connect-title">${escapeHtml(content.connect.title)}</h2>
        <p>${escapeHtml(content.connect.intro)}</p>
        <a class="text-link" href="${localized("/docs/mcp/local-ai-access/")}">${escapeHtml(content.connect.guide)} <span aria-hidden="true">→</span></a>
      </div>
      <div class="home-feature-grid home-feature-grid-two">
        ${connectCards}
      </div>
    </section>

    <section class="section home-privacy-section" aria-labelledby="privacy-title">
      <div class="home-privacy-copy">
        <p class="eyebrow">${escapeHtml(content.privacy.eyebrow)}</p>
        <h2 id="privacy-title">${escapeHtml(content.privacy.title)}</h2>
        <p>${escapeHtml(content.privacy.description)}</p>
        <strong>${escapeHtml(content.privacy.imageTitle)}</strong>
        <a class="text-link" href="${localized("/privacy.html")}">${escapeHtml(content.privacy.privacyLink)} <span aria-hidden="true">→</span></a>
      </div>
      <div class="home-screenshot-frame">
        ${renderHomepageImage(locale, {
          image: "09-private-by-design",
          alt: content.privacy.alt,
          title: content.privacy.imageTitle
        }, content.lightbox)}
      </div>
    </section>

    <section class="section home-overview-section" aria-labelledby="overview-title">
      <div class="section-heading home-section-heading">
        <p class="eyebrow">${escapeHtml(content.overview.eyebrow)}</p>
        <h2 id="overview-title">${escapeHtml(content.overview.title)}</h2>
      </div>
      <div class="home-overview-grid">
        <article class="home-overview-card">
          <h3>${escapeHtml(content.overview.formatsTitle)}</h3>
          <p>${escapeHtml(content.overview.formatsDescription)}</p>
          <a class="text-link" href="${localized("/docs/reference/supported-formats/")}">${escapeHtml(content.overview.formatsLink)} <span aria-hidden="true">→</span></a>
        </article>
        <article class="home-overview-card">
          <h3>${escapeHtml(content.overview.audienceTitle)}</h3>
          <p>${escapeHtml(content.overview.audienceDescription)}</p>
          <a class="text-link" href="${localized("/docs/")}">${escapeHtml(content.overview.docsLink)} <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>

    ${renderHomepageUseCases(locale)}

    <section class="section home-closing-section" aria-labelledby="closing-title">
      <div>
        <h2 id="closing-title">${escapeHtml(content.closing.title)}</h2>
        <p>${escapeHtml(content.closing.description)}</p>
      </div>
      <div class="actions">
        <a class="button button-primary" href="${appStoreUrl}">${escapeHtml(content.closing.download)}</a>
        <a class="button button-secondary" href="${localized("/docs/")}">${escapeHtml(content.closing.learn)}</a>
      </div>
    </section>
  </main>

  <dialog id="homepage-lightbox" class="home-lightbox" data-home-lightbox aria-label="${escapeHtml(content.lightbox.dialogLabel)}" aria-describedby="homepage-lightbox-caption">
    <div class="home-lightbox-shell">
      <div class="home-lightbox-toolbar">
        <p id="homepage-lightbox-caption" class="home-lightbox-caption" data-home-lightbox-caption></p>
        <div class="home-lightbox-controls">
          <button class="home-lightbox-button" type="button" data-home-lightbox-zoom data-zoom-label="${escapeHtml(content.lightbox.zoom)}" data-fit-label="${escapeHtml(content.lightbox.fit)}" aria-pressed="false">${escapeHtml(content.lightbox.zoom)}</button>
          <button class="home-lightbox-button home-lightbox-close" type="button" data-home-lightbox-close aria-label="${escapeHtml(content.lightbox.closeLabel)}" autofocus>${escapeHtml(content.lightbox.close)}</button>
        </div>
      </div>
      <div class="home-lightbox-viewport" data-home-lightbox-viewport>
        <img class="home-lightbox-image" data-home-lightbox-image alt="" width="2880" height="1800" decoding="async">
      </div>
    </div>
  </dialog>`;
}

function appStoreURLFor(page) {
  return productConfig.appStore.campaigns[page.campaignKey] || productConfig.appStore.default;
}

function youtubeVideoFor(page) {
  const video = productConfig.youtubeVideos?.[page.id];
  if (!video) throw new Error(`YouTube video configuration is missing for landing page: ${page.id}`);
  if (
    !/^[A-Za-z0-9_-]{11}$/.test(video.id) ||
    video.watchUrl !== `https://youtu.be/${video.id}` ||
    video.embedUrl !== `https://www.youtube-nocookie.com/embed/${video.id}`
  ) {
    throw new Error(`YouTube video configuration is invalid for landing page: ${page.id}`);
  }
  return video;
}

function renderAppStoreBadge(locale, page) {
  const content = landingContent.get(locale.code);
  const badge = productConfig.appStore.badges[locale.code];
  return `<a class="app-store-badge-link" href="${escapeHtml(appStoreURLFor(page))}">
    <img src="${escapeHtml(badge.path)}" alt="${escapeHtml(content.shared.viewOnAppStoreLabel)}" width="${badge.width}" height="${badge.height}">
  </a>`;
}

function landingLightboxLabels(content) {
  return {
    open: content.shared.viewLarger,
    openLabel: content.shared.viewFullScreen,
    close: content.shared.close,
    closeLabel: content.shared.closeLabel,
    zoom: content.shared.zoom,
    fit: content.shared.fit,
    dialogLabel: content.shared.screenshotViewer
  };
}

function renderLandingScreenshot(locale, item, content, { hero = false } = {}) {
  return renderHomepageImage(locale, {
    image: item.image,
    alt: item.alt,
    title: item.caption
  }, landingLightboxLabels(content), { hero });
}

function renderLandingBreadcrumbs(locale, page, content) {
  return `<nav class="landing-breadcrumbs" aria-label="${escapeHtml(translate(locale, "Breadcrumb"))}">
    <ol>
      <li><a href="${localizedRoute(locale, "/")}">${escapeHtml(translate(locale, "Home"))}</a></li>
      <li><a href="${localizedRoute(locale, "/")}#ways-to-use">${escapeHtml(content.shared.waysToUse)}</a></li>
      <li aria-current="page">${escapeHtml(page.hero.eyebrow)}</li>
    </ol>
  </nav>`;
}

function renderLandingDemo(locale, page, content) {
  const previewPath = `/assets/home/${locale.code}/${page.demo.previewImage}-1440.webp`;
  const transcript = page.demo.transcript.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
  const video = youtubeVideoFor(page);
  const noticeId = `video-privacy-${page.id}`;
  const preview = `<figure class="landing-demo-preview landing-demo-youtube" data-youtube-player>
      <div class="landing-video-frame" data-youtube-frame>
        <img src="${previewPath}" alt="" width="1440" height="900" loading="lazy" decoding="async">
        <button class="landing-video-play" type="button" data-youtube-load data-youtube-embed="${escapeHtml(video.embedUrl)}" data-youtube-title="${escapeHtml(page.demo.title)}" aria-describedby="${noticeId}" aria-label="${escapeHtml(`${content.shared.playVideo}: ${page.demo.title}`)}">
          <span class="landing-video-play-icon" aria-hidden="true"></span>
          <span>${escapeHtml(content.shared.playVideo)}</span>
        </button>
      </div>
      <figcaption id="${noticeId}" class="landing-video-consent">
        <span>${escapeHtml(content.shared.videoPrivacyNotice)}</span>
        <a href="${escapeHtml(video.watchUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(content.shared.watchOnYouTube)} <span aria-hidden="true">↗</span></a>
      </figcaption>
    </figure>`;
  return `<section class="section landing-demo" aria-labelledby="demo-title-${page.id}">
    <div class="section-heading landing-section-heading">
      <p class="eyebrow">${escapeHtml(content.shared.demoEyebrow)}</p>
      <h2 id="demo-title-${page.id}">${escapeHtml(page.demo.title)}</h2>
    </div>
    <div class="landing-demo-grid">
      ${preview}
      <div id="demo-transcript-${page.id}" class="landing-transcript">
        <h3>${escapeHtml(content.shared.videoOverviewTitle)}</h3>
        ${transcript}
      </div>
    </div>
  </section>`;
}

function renderLandingSection(locale, section, pagesById) {
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
  const links = (section.links || []).length
    ? `<ul class="landing-inline-links">${section.links.map((link) => {
      const target = pagesById.get(link.page);
      if (!target) throw new Error(`Landing-page link target is missing: ${link.page}`);
      return `<li><a href="${target.route}">${escapeHtml(link.label)} <span aria-hidden="true">→</span></a></li>`;
    }).join("")}</ul>`
    : "";
  if (section.kind === "details") {
    const items = (section.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    return `<section id="${escapeHtml(section.id)}" class="landing-content-section landing-content-details" aria-labelledby="heading-${escapeHtml(section.id)}">
      <h2 id="heading-${escapeHtml(section.id)}">${escapeHtml(section.heading)}</h2>
      ${paragraphs}
      <details>
        <summary>${escapeHtml(section.summary)}</summary>
        <ul>${items}</ul>
      </details>
      ${links}
    </section>`;
  }
  const modifier = section.kind === "callout" ? " landing-content-callout" : "";
  return `<section id="${escapeHtml(section.id)}" class="landing-content-section${modifier}" aria-labelledby="heading-${escapeHtml(section.id)}">
    <h2 id="heading-${escapeHtml(section.id)}">${escapeHtml(section.heading)}</h2>
    ${paragraphs}
    ${links}
  </section>`;
}

function renderLandingGallery(locale, page, content) {
  if (page.screenshots.length < 2) return "";
  const figures = page.screenshots.slice(1).map((screenshot) => `<figure class="landing-gallery-item">
    <div class="home-screenshot-frame">${renderLandingScreenshot(locale, screenshot, content)}</div>
    <figcaption>${escapeHtml(screenshot.caption)}</figcaption>
  </figure>`).join("\n");
  return `<section class="section landing-gallery" aria-label="${escapeHtml(page.hero.eyebrow)}">${figures}</section>`;
}

function renderLandingWorkflow(page, content) {
  const steps = page.workflow.steps.map((step, index) => `<li>
    <span class="landing-step-number" aria-hidden="true">${index + 1}</span>
    <div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></div>
  </li>`).join("\n");
  return `<section id="how-it-works" class="section landing-workflow" aria-labelledby="workflow-title-${page.id}">
    <div class="section-heading landing-section-heading">
      <p class="eyebrow">${escapeHtml(content.shared.workflowEyebrow)}</p>
      <h2 id="workflow-title-${page.id}">${escapeHtml(content.shared.workflowTitle)}</h2>
    </div>
    <ol class="landing-workflow-list">${steps}</ol>
  </section>`;
}

function renderLandingFAQ(page, content) {
  const entries = page.faq.map((entry) => `<article class="landing-faq-item">
    <h3>${escapeHtml(entry.question)}</h3>
    <p>${escapeHtml(entry.answer)}</p>
  </article>`).join("\n");
  return `<section class="section landing-faq" aria-labelledby="faq-title-${page.id}">
    <div class="section-heading landing-section-heading">
      <p class="eyebrow">${escapeHtml(content.shared.faqEyebrow)}</p>
      <h2 id="faq-title-${page.id}">${escapeHtml(content.shared.faqTitle)}</h2>
    </div>
    <div class="landing-faq-list">${entries}</div>
  </section>`;
}

function renderLandingRelated(page, content, pagesById) {
  const cards = page.related.map((pageId) => {
    const target = pagesById.get(pageId);
    if (!target) throw new Error(`Related landing page is missing: ${pageId}`);
    return `<article class="landing-related-card">
      <p class="eyebrow">${escapeHtml(target.hero.eyebrow)}</p>
      <h3><a href="${target.route}">${escapeHtml(target.hero.title)}</a></h3>
      <p>${escapeHtml(target.meta.socialDescription)}</p>
    </article>`;
  }).join("\n");
  return `<section class="section landing-related" aria-labelledby="related-title-${page.id}">
    <div class="section-heading landing-section-heading">
      <p class="eyebrow">${escapeHtml(content.shared.relatedEyebrow)}</p>
      <h2 id="related-title-${page.id}">${escapeHtml(content.shared.relatedTitle)}</h2>
    </div>
    <div class="landing-related-grid">${cards}</div>
  </section>`;
}

function renderLandingDialog(content) {
  const labels = landingLightboxLabels(content);
  return `<dialog id="homepage-lightbox" class="home-lightbox" data-home-lightbox aria-label="${escapeHtml(labels.dialogLabel)}" aria-describedby="homepage-lightbox-caption">
    <div class="home-lightbox-shell">
      <div class="home-lightbox-toolbar">
        <p id="homepage-lightbox-caption" class="home-lightbox-caption" data-home-lightbox-caption></p>
        <div class="home-lightbox-controls">
          <button class="home-lightbox-button" type="button" data-home-lightbox-zoom data-zoom-label="${escapeHtml(labels.zoom)}" data-fit-label="${escapeHtml(labels.fit)}" aria-pressed="false">${escapeHtml(labels.zoom)}</button>
          <button class="home-lightbox-button home-lightbox-close" type="button" data-home-lightbox-close aria-label="${escapeHtml(labels.closeLabel)}">${escapeHtml(labels.close)}</button>
        </div>
      </div>
      <div class="home-lightbox-viewport" data-home-lightbox-viewport>
        <img class="home-lightbox-image" data-home-lightbox-image alt="" width="2880" height="1800" decoding="async">
      </div>
    </div>
  </dialog>`;
}

function structuredDataForLanding(page) {
  const software = productConfig.software;
  const video = youtubeVideoFor(page);
  const canonicalURL = canonicalUrlForRoute(page.route);
  const localizedHomeURL = canonicalUrlForRoute(localizedRoute(page.locale, "/"));
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: software.name,
      applicationCategory: software.applicationCategory,
      operatingSystem: software.operatingSystem,
      softwareVersion: software.version,
      url: canonicalURL,
      downloadUrl: appStoreURLFor(page),
      offers: {
        "@type": "Offer",
        price: software.offer.price,
        priceCurrency: software.offer.priceCurrency,
        url: appStoreURLFor(page)
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {"@type": "ListItem", position: 1, name: translate(page.locale, "Home"), item: localizedHomeURL},
        {"@type": "ListItem", position: 2, name: landingContent.get(page.locale.code).shared.waysToUse, item: localizedHomeURL},
        {"@type": "ListItem", position: 3, name: page.hero.eyebrow, item: canonicalURL}
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: page.demo.title,
      description: page.meta.description,
      thumbnailUrl: `${canonicalOrigin}/assets/home/${page.locale.code}/${page.demo.previewImage}-1440.webp`,
      embedUrl: video.embedUrl,
      sameAs: video.watchUrl,
      url: canonicalURL,
      inLanguage: page.locale.code,
      publisher: {
        "@type": "Organization",
        name: "SourceShelf",
        url: canonicalUrlForRoute("/")
      }
    }
  ];
}

function renderLandingPage(page) {
  const { locale } = page;
  const content = landingContent.get(locale.code);
  const pagesById = new Map(content.pages.map((candidate) => [candidate.id, {
    ...candidate,
    route: localizedRoute(locale, candidate.route)
  }]));
  const canonicalURL = canonicalUrlForRoute(page.route);
  const socialImage = `${canonicalOrigin}/assets/home/${locale.code}/01-private-ai-source-packs-social.jpg`;
  const sections = page.sections.map((section) => renderLandingSection(locale, section, pagesById)).join("\n");
  const structuredData = structuredDataForLanding(page).map((value) => (
    `<script type="application/ld+json">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`
  )).join("\n  ");

  return `<!DOCTYPE html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.meta.description)}">
  <meta name="theme-color" content="#08244d">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonicalURL}">
${renderAlternateLinks(page.logicalRoute)}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.meta.socialTitle)}">
  <meta property="og:description" content="${escapeHtml(page.meta.socialDescription)}">
  <meta property="og:url" content="${canonicalURL}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.meta.socialTitle)}">
  <meta name="twitter:description" content="${escapeHtml(page.meta.socialDescription)}">
  <meta name="twitter:image" content="${socialImage}">
  <title>${escapeHtml(page.meta.title)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=${assetVersion}">
  ${headBootstrap(locale)}
  ${structuredData}
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(translate(locale, "Skip to content"))}</a>
  ${renderHeader(locale, "use-cases")}
  <main id="main" class="main landing-main landing-layout-${escapeHtml(page.layout)}">
    <div class="landing-page-shell">
      ${renderLandingBreadcrumbs(locale, page, content)}
      <section class="section hero landing-hero" aria-labelledby="landing-title-${page.id}">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
          <h1 id="landing-title-${page.id}">${escapeHtml(page.hero.title)}</h1>
          <p class="subheading">${escapeHtml(page.hero.description)}</p>
          <div class="landing-actions">
            ${renderAppStoreBadge(locale, page)}
            <a class="button button-secondary" href="#how-it-works">${escapeHtml(content.shared.seeHow)}</a>
          </div>
        </div>
        <div class="hero-visual landing-hero-visual">
          <div class="home-screenshot-frame home-hero-frame">${renderLandingScreenshot(locale, page.screenshots[0], content, { hero: true })}</div>
          <p class="landing-hero-caption">${escapeHtml(page.screenshots[0].caption)}</p>
        </div>
      </section>
      <ul class="landing-trust-strip" aria-label="${escapeHtml(content.shared.trustLabel)}">
        ${page.trust.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      ${renderLandingDemo(locale, page, content)}
      <div class="section landing-content-grid">${sections}</div>
      ${renderLandingGallery(locale, page, content)}
      ${renderLandingWorkflow(page, content)}
      ${renderLandingFAQ(page, content)}
      ${renderLandingRelated(page, content, pagesById)}
      <section class="section landing-closing" aria-labelledby="closing-title-${page.id}">
        <div><h2 id="closing-title-${page.id}">${escapeHtml(page.closing.heading)}</h2><p>${escapeHtml(page.closing.description)}</p></div>
        ${renderAppStoreBadge(locale, page)}
      </section>
    </div>
  </main>
  ${renderLandingDialog(content)}
  ${renderFooter(locale)}
  <script src="/script.js?v=${assetVersion}"></script>
</body>
</html>
`.replace(/[ \t]+$/gm, "");
}

function headBootstrap(locale) {
  return `<script src="/locale.js?v=${assetVersion}"></script>
  <script>
    window.SourceShelfLocale.bootstrap(${JSON.stringify(locale.code)});
    (function () {
      try {
        var theme = localStorage.getItem("sourceshelf-theme");
        if (theme === "light" || theme === "dark") {
          document.documentElement.setAttribute("data-theme", theme);
        }
      } catch (error) {}
    })();
  </script>`;
}

function renderPage(page, rendered) {
  const { locale } = page;
  const title = `${rendered.title} | ${translate(locale, "SourceShelf Documentation")}`;
  const canonicalUrl = canonicalUrlForRoute(page.route);
  const description = page.locale.code === "en" ? page.description : rendered.description;
  const navigationHtml = renderNavigation(page);
  const hasToc = rendered.sectionCount >= 3;
  const mobileToc = hasToc
    ? `<details class="docs-toc-mobile"><summary>${escapeHtml(translate(locale, "On this page"))}</summary>${renderToc(rendered.headings, "docs-toc-list", "Mobile table of contents", locale)}</details>`
    : "";
  const desktopToc = hasToc
    ? `<aside class="docs-toc" aria-label="${escapeHtml(translate(locale, "Page contents"))}">${renderToc(rendered.headings, "docs-toc-list", "Table of contents", locale)}</aside>`
    : '<div class="docs-toc docs-toc-empty" aria-hidden="true"></div>';

  const html = `<!DOCTYPE html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#08244d">
  <link rel="canonical" href="${canonicalUrl}">
${renderAlternateLinks(page.logicalRoute)}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png">
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=${assetVersion}">
  ${headBootstrap(locale)}
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(translate(locale, "Skip to content"))}</a>
  ${renderHeader(locale, "docs")}

  <main id="main" class="main docs-main">
    <div class="docs-page">
      ${renderBreadcrumbs(page, rendered.title)}
      <details class="docs-mobile-nav">
        <summary>${escapeHtml(translate(locale, "Browse documentation"))}</summary>
        <nav aria-label="${escapeHtml(translate(locale, "Mobile documentation navigation"))}">${navigationHtml}</nav>
      </details>
      <div class="docs-layout">
        <aside class="docs-sidebar" aria-label="${escapeHtml(translate(locale, "Documentation sidebar"))}">
          <nav aria-label="${escapeHtml(translate(locale, "Documentation navigation"))}">${navigationHtml}</nav>
        </aside>
        <article class="docs-article">
          <header class="docs-article-header">
            ${rendered.leadHtml}
          </header>
          ${mobileToc}
          <div class="docs-article-body">
            ${rendered.bodyHtml}
          </div>
          ${renderPagination(page)}
        </article>
        ${desktopToc}
      </div>
    </div>
  </main>

  ${renderFooter(locale)}
  <script src="/script.js?v=${assetVersion}"></script>
</body>
</html>
`;
  return html.replace(/[ \t]+$/gm, "");
}

function formatBlogDate(locale, value) {
  return new Intl.DateTimeFormat(locale.code, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00Z`));
}

function renderBlogBreadcrumbs(locale, title) {
  const blog = blogManifest.index[locale.code];
  const items = [`<li><a href="${localizedRoute(locale, "/")}">${escapeHtml(translate(locale, "Home"))}</a></li>`];
  if (title) {
    items.push(`<li><a href="${localizedRoute(locale, "/blog/")}">${escapeHtml(blog.eyebrow)}</a></li>`);
    items.push(`<li aria-current="page">${escapeHtml(title)}</li>`);
  } else {
    items.push(`<li aria-current="page">${escapeHtml(blog.eyebrow)}</li>`);
  }
  return `<nav class="breadcrumbs blog-breadcrumbs" aria-label="${escapeHtml(translate(locale, "Breadcrumb"))}"><ol>${items.join("")}</ol></nav>`;
}

function renderBlogAppStoreBadge(page) {
  const badge = productConfig.appStore.badges[page.locale.code];
  return `<a class="app-store-badge-link" href="${escapeHtml(appStoreUrl)}">
    <img src="${escapeHtml(badge.path)}" alt="${escapeHtml(page.content.ctaButton)}" width="${badge.width}" height="${badge.height}">
  </a>`;
}

function blogStructuredData(value) {
  return `<script type="application/ld+json">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;
}

function renderBlogIndex(locale) {
  const content = blogManifest.index[locale.code];
  const pages = blogPages
    .filter((page) => page.locale.code === locale.code)
    .sort((left, right) => right.published.localeCompare(left.published));
  const canonicalUrl = canonicalUrlForRoute(localizedRoute(locale, "/blog/"));
  const canonicalHomeUrl = canonicalUrlForRoute(localizedRoute(locale, "/"));
  const socialImage = `${canonicalOrigin}/assets/blog/${locale.code}/${pages[0].heroAsset}.png`;
  const cards = pages.map((page) => `<article class="blog-card" aria-labelledby="blog-card-${escapeHtml(page.id)}">
    <a class="blog-card-image" href="${page.route}" tabindex="-1" aria-hidden="true">
      <img src="/assets/blog/${locale.code}/${page.heroAsset}.svg" alt="" width="1200" height="630" loading="lazy" decoding="async">
    </a>
    <div class="blog-card-copy">
      <p class="eyebrow">${escapeHtml(page.content.articleLabel)}</p>
      <h2 id="blog-card-${escapeHtml(page.id)}"><a href="${page.route}">${escapeHtml(page.rendered.title)}</a></h2>
      <p>${escapeHtml(page.content.excerpt)}</p>
      <div class="blog-card-meta"><span>${escapeHtml(content.published)}</span> <time datetime="${page.published}">${escapeHtml(formatBlogDate(locale, page.published))}</time></div>
      <a class="text-link" href="${page.route}">${escapeHtml(content.readArticle)} <span aria-hidden="true">→</span></a>
    </div>
  </article>`).join("\n");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: content.eyebrow,
      headline: content.heading,
      description: content.description,
      url: canonicalUrl,
      inLanguage: locale.code,
      publisher: { "@type": "Organization", name: "SourceShelf", url: canonicalUrlForRoute("/") },
      blogPost: pages.map((page) => ({
        "@type": "BlogPosting",
        headline: page.rendered.title,
        description: page.content.excerpt,
        url: canonicalUrlForRoute(page.route),
        datePublished: page.published,
        dateModified: page.modified,
        image: `${canonicalOrigin}/assets/blog/${locale.code}/${page.heroAsset}.png`
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: translate(locale, "Home"), item: canonicalHomeUrl },
        { "@type": "ListItem", position: 2, name: content.eyebrow, item: canonicalUrl }
      ]
    }
  ].map(blogStructuredData).join("\n  ");

  return `<!DOCTYPE html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(content.description)}">
  <meta name="theme-color" content="#08244d">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonicalUrl}">
${renderAlternateLinks("/blog/")}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(content.title)}">
  <meta property="og:description" content="${escapeHtml(content.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(content.title)}">
  <meta name="twitter:description" content="${escapeHtml(content.description)}">
  <meta name="twitter:image" content="${socialImage}">
  <title>${escapeHtml(content.title)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=${assetVersion}">
  ${headBootstrap(locale)}
  ${structuredData}
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(translate(locale, "Skip to content"))}</a>
  ${renderHeader(locale, "blog")}
  <main id="main" class="main blog-main">
    <div class="blog-page">
      ${renderBlogBreadcrumbs(locale)}
      <header class="blog-index-header">
        <p class="eyebrow">${escapeHtml(content.eyebrow)}</p>
        <h1>${escapeHtml(content.heading)}</h1>
        <p>${escapeHtml(content.intro)}</p>
      </header>
      <section class="blog-list" aria-labelledby="blog-latest-title">
        <h2 id="blog-latest-title" class="visually-hidden">${escapeHtml(content.latest)}</h2>
        ${cards}
      </section>
    </div>
  </main>
  ${renderFooter(locale)}
  <script src="/script.js?v=${assetVersion}"></script>
</body>
</html>
`.replace(/[ \t]+$/gm, "");
}

function renderBlogArticle(page) {
  const { locale, content, rendered } = page;
  const canonicalUrl = canonicalUrlForRoute(page.route);
  const canonicalHomeUrl = canonicalUrlForRoute(localizedRoute(locale, "/"));
  const canonicalBlogUrl = canonicalUrlForRoute(localizedRoute(locale, "/blog/"));
  const socialImage = `${canonicalOrigin}/assets/blog/${locale.code}/${page.heroAsset}.png`;
  const heroImage = `/assets/blog/${locale.code}/${page.heroAsset}.svg`;
  const mobileToc = `<details class="docs-toc-mobile blog-toc-mobile"><summary>${escapeHtml(translate(locale, "On this page"))}</summary>${renderToc(rendered.headings, "docs-toc-list", "Mobile table of contents", locale)}</details>`;
  const desktopToc = `<aside class="docs-toc blog-toc" aria-label="${escapeHtml(translate(locale, "Page contents"))}">${renderToc(rendered.headings, "docs-toc-list", "Table of contents", locale)}</aside>`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: rendered.title,
      description: content.metaDescription,
      image: socialImage,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      datePublished: page.published,
      dateModified: page.modified,
      inLanguage: locale.code,
      articleSection: content.articleLabel,
      author: { "@type": "Organization", name: page.author, url: canonicalUrlForRoute("/") },
      publisher: {
        "@type": "Organization",
        name: "SourceShelf",
        url: canonicalUrlForRoute("/"),
        logo: { "@type": "ImageObject", url: `${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png` }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: translate(locale, "Home"), item: canonicalHomeUrl },
        { "@type": "ListItem", position: 2, name: blogManifest.index[locale.code].eyebrow, item: canonicalBlogUrl },
        { "@type": "ListItem", position: 3, name: rendered.title, item: canonicalUrl }
      ]
    }
  ].map(blogStructuredData).join("\n  ");

  return `<!DOCTYPE html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(content.metaDescription)}">
  <meta name="theme-color" content="#08244d">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonicalUrl}">
${renderAlternateLinks(page.logicalRoute)}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(content.seoTitle)}">
  <meta property="og:description" content="${escapeHtml(content.metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${socialImage}">
  <meta property="article:published_time" content="${page.published}">
  <meta property="article:modified_time" content="${page.modified}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(content.seoTitle)}">
  <meta name="twitter:description" content="${escapeHtml(content.metaDescription)}">
  <meta name="twitter:image" content="${socialImage}">
  <title>${escapeHtml(content.seoTitle)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=${assetVersion}">
  ${headBootstrap(locale)}
  ${structuredData}
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(translate(locale, "Skip to content"))}</a>
  ${renderHeader(locale, "blog")}
  <main id="main" class="main blog-main">
    <div class="blog-page blog-article-page">
      ${renderBlogBreadcrumbs(locale, rendered.title)}
      <article class="blog-article">
        <header class="blog-article-header">
          <p class="eyebrow">${escapeHtml(content.articleLabel)}</p>
          ${rendered.titleHtml}
          <p class="blog-article-excerpt">${escapeHtml(content.excerpt)}</p>
          <div class="blog-article-meta">
            <span>${escapeHtml(content.publishedLabel)} <time datetime="${page.published}">${escapeHtml(formatBlogDate(locale, page.published))}</time></span>
            <span>${escapeHtml(content.byLabel)} ${escapeHtml(page.author)}</span>
            <span class="blog-verified">${escapeHtml(content.verifiedLabel)}</span>
          </div>
          <figure class="blog-hero-figure">
            <img src="${heroImage}" alt="${escapeHtml(content.heroAlt)}" width="1200" height="630" loading="eager" fetchpriority="high" decoding="async">
          </figure>
        </header>
        ${mobileToc}
        <div class="blog-article-layout">
          <div class="docs-article blog-copy">
            <div class="docs-article-body">
              ${rendered.introHtml}
              ${rendered.bodyHtml}
            </div>
            <section class="blog-cta" aria-labelledby="blog-cta-${escapeHtml(page.id)}">
              <div>
                <p class="eyebrow">SourceShelf</p>
                <h2 id="blog-cta-${escapeHtml(page.id)}">${escapeHtml(content.ctaTitle)}</h2>
                <p>${escapeHtml(content.ctaDescription)}</p>
              </div>
              ${renderBlogAppStoreBadge(page)}
            </section>
          </div>
          ${desktopToc}
        </div>
      </article>
    </div>
  </main>
  ${renderFooter(locale)}
  <script src="/script.js?v=${assetVersion}"></script>
</body>
</html>
`.replace(/[ \t]+$/gm, "");
}

const generalPages = [
  { template: "index.html", logicalRoute: "/", section: "home" },
  { template: "privacy.html", logicalRoute: "/privacy.html", section: "privacy" },
  { template: "support.html", logicalRoute: "/support.html", section: "support" }
];

const preservedSiteStrings = new Set([
  "SourceShelf",
  "support@sourceshelf.app",
  "Markdown",
  "Open Knowledge Format (OKF)",
  "Page Name.assets",
  "TXT",
  "HTML",
  "RTF",
  "PNG",
  "JPEG",
  "TIFF",
  "HEIC/HEIF where supported",
  "DOCX",
  "PPTX",
  "XLSX",
  ".doc",
  ".ppt",
  ".xls",
  ".docx",
  ".pptx",
  ".xlsx"
]);

function extractMatch(pattern, source, description) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not extract ${description} from a general-page template`);
  return match[1];
}

function localizeValue(locale, rawValue) {
  const leading = rawValue.match(/^\s*/)?.[0] || "";
  const trailing = rawValue.match(/\s*$/)?.[0] || "";
  const value = rawValue.trim().replace(/\s+/g, " ");
  if (!value || preservedSiteStrings.has(value) || !/[\p{Letter}]/u.test(value)) return rawValue;
  const translated = translate(locale, value);
  return `${leading}${escapeHtml(translated)}${trailing}`;
}

function localizeMainHtml(locale, html) {
  let output = html.replace(/>([^<]+)</g, (match, value) => `>${localizeValue(locale, value)}<`);
  output = output.replace(/\b(aria-label|alt|title)="([^"]+)"/g, (match, attribute, value) => (
    `${attribute}="${localizeValue(locale, value).trim()}"`
  ));
  output = output
    .replace(/\bsrc="assets\//g, 'src="/assets/')
    .replace(/\bhref="index\.html"/g, `href="${localizedRoute(locale, "/")}"`)
    .replace(/\bhref="privacy\.html"/g, `href="${localizedRoute(locale, "/privacy.html")}"`)
    .replace(/\bhref="support\.html"/g, `href="${localizedRoute(locale, "/support.html")}"`)
    .replace(/\bhref="docs\/"/g, `href="${localizedRoute(locale, "/docs/")}"`);
  return output;
}

function renderGeneralPage(definition, locale, template) {
  const homepage = definition.section === "home" ? homepageContent[locale.code] : null;
  if (definition.section === "home" && !homepage) {
    throw new Error(`Homepage content is missing for ${locale.code}`);
  }
  const title = homepage?.meta.title || extractMatch(/<title>([^<]+)<\/title>/, template, "page title");
  const description = homepage?.meta.description || extractMatch(/<meta name="description" content="([^"]+)">/, template, "page description");
  const socialTitle = homepage?.meta.socialTitle || extractMatch(/<meta property="og:title" content="([^"]+)">/, template, "social title");
  const socialDescription = homepage?.meta.socialDescription || extractMatch(/<meta property="og:description" content="([^"]+)">/, template, "social description");
  const main = extractMatch(/(<main\b[\s\S]*?<\/main>)/, template, "main content");
  const route = localizedRoute(locale, definition.logicalRoute);
  const canonicalUrl = canonicalUrlForRoute(route);
  const localizedTitle = homepage ? title : translate(locale, title);
  const localizedDescription = homepage ? description : translate(locale, description);
  const localizedSocialTitle = homepage ? socialTitle : translate(locale, socialTitle);
  const localizedSocialDescription = homepage ? socialDescription : translate(locale, socialDescription);
  const socialImage = homepage
    ? `${canonicalOrigin}/assets/home/${locale.code}/01-private-ai-source-packs-social.jpg`
    : `${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png`;
  const renderedMain = homepage ? renderHomepageMain(locale, homepage) : localizeMainHtml(locale, main);

  const html = `<!DOCTYPE html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(localizedDescription)}">
  <meta name="theme-color" content="#08244d">
  <link rel="canonical" href="${canonicalUrl}">
${renderAlternateLinks(definition.logicalRoute)}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(localizedSocialTitle)}">
  <meta property="og:description" content="${escapeHtml(localizedSocialDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(localizedSocialTitle)}">
  <meta name="twitter:description" content="${escapeHtml(localizedSocialDescription)}">
  <meta name="twitter:image" content="${socialImage}">
  <title>${escapeHtml(localizedTitle)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=${assetVersion}">
  ${headBootstrap(locale)}
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(translate(locale, "Skip to content"))}</a>
  ${renderHeader(locale, definition.section)}

  ${renderedMain}

  ${renderFooter(locale)}
  <script src="/script.js?v=${assetVersion}"></script>
</body>
</html>
`;
  return html.replace(/[ \t]+$/gm, "");
}

async function buildGeneralPages() {
  for (const definition of generalPages) {
    const template = await readFile(path.join(siteSourceRoot, "templates", definition.template), "utf8");
    for (const locale of locales) {
      const outputDirectory = locale.code === "en" ? siteRoot : path.join(siteRoot, locale.code);
      await mkdir(outputDirectory, { recursive: true });
      await writeFile(path.join(outputDirectory, definition.template), renderGeneralPage(definition, locale, template));
    }
  }
}

async function buildLandingPages() {
  for (const page of landingPages) {
    const outputDirectory = path.join(siteRoot, page.route.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, "index.html"), renderLandingPage(page));
  }
}

async function buildBlogPages() {
  for (const locale of locales) {
    const indexDirectory = path.join(siteRoot, localizedRoute(locale, "/blog/").slice(1));
    await mkdir(indexDirectory, { recursive: true });
    await writeFile(path.join(indexDirectory, "index.html"), renderBlogIndex(locale));
  }
  for (const page of blogPages) {
    const outputDirectory = path.join(siteRoot, page.route.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, "index.html"), renderBlogArticle(page));
  }
}

async function writeSitemap() {
  const generalRoutes = locales.flatMap((locale) => generalPages.map((page) => localizedRoute(locale, page.logicalRoute)));
  const blogIndexRoutes = locales.map((locale) => localizedRoute(locale, "/blog/"));
  const routes = [...new Set([
    ...generalRoutes,
    ...landingPages.map((page) => page.route),
    ...allPages.map((page) => page.route),
    ...blogIndexRoutes,
    ...blogPages.map((page) => page.route)
  ])].sort();
  const entries = routes.map((route) => `  <url>\n    <loc>${canonicalUrlForRoute(route)}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  await writeFile(path.join(siteRoot, "sitemap.xml"), sitemap);
}

async function build() {
  const preservedDocumentationFiles = ["SEO_MEDIA_CAPTURE_PLAN.md", "SEO_TRANSLATION_REVIEW.md"];
  const preservedDocumentation = new Map(await Promise.all(preservedDocumentationFiles.map(async (file) => {
    try {
      return [file, await readFile(path.join(outputRoot, file), "utf8")];
    } catch {
      return [file, null];
    }
  })));
  if (pageBySource.size !== allPages.length) {
    throw new Error("Documentation navigation contains duplicate source paths");
  }
  const routes = new Set(allPages.map((page) => page.route));
  if (routes.size !== allPages.length) {
    throw new Error("Documentation navigation contains duplicate routes");
  }
  const englishLanding = landingContent.get("en");
  const expectedLandingIDs = englishLanding.pages.map((page) => page.id);
  const expectedLandingRoutes = englishLanding.pages.map((page) => page.route);
  for (const locale of locales) {
    const content = landingContent.get(locale.code);
    if (!content || content.code !== locale.code || content.pages.length !== expectedLandingIDs.length) {
      throw new Error(`Landing-page content is incomplete for ${locale.code}`);
    }
    if (JSON.stringify(content.pages.map((page) => page.id)) !== JSON.stringify(expectedLandingIDs)) {
      throw new Error(`Landing-page IDs do not match English for ${locale.code}`);
    }
    if (JSON.stringify(content.pages.map((page) => page.route)) !== JSON.stringify(expectedLandingRoutes)) {
      throw new Error(`Landing-page routes do not match English for ${locale.code}`);
    }
    for (const page of content.pages) {
      if (!(page.campaignKey in productConfig.appStore.campaigns)) {
        throw new Error(`Unknown App Store campaign key on ${locale.code}:${page.id}`);
      }
    }
  }
  const uniqueLandingRoutes = new Set(landingPages.map((page) => page.route));
  if (uniqueLandingRoutes.size !== landingPages.length) {
    throw new Error("Landing-page content contains duplicate localized routes");
  }
  const blogIDs = new Set();
  const blogRoutes = new Set();
  for (const post of blogManifest.posts) {
    if (blogIDs.has(post.id) || blogRoutes.has(post.route)) {
      throw new Error(`Blog manifest contains a duplicate id or route: ${post.id}`);
    }
    blogIDs.add(post.id);
    blogRoutes.add(post.route);
    for (const locale of locales) {
      if (!blogManifest.index[locale.code] || !post.locales[locale.code]) {
        throw new Error(`Blog content is incomplete for ${locale.code}:${post.id}`);
      }
    }
  }

  for (const locale of locales.filter((candidate) => candidate.code !== "en")) {
    await rm(path.join(siteRoot, locale.code), { recursive: true, force: true });
  }
  for (const page of englishLanding.pages) {
    await rm(path.join(siteRoot, page.route.slice(1)), { recursive: true, force: true });
  }
  await rm(path.join(siteRoot, "blog"), { recursive: true, force: true });
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  for (const [file, source] of preservedDocumentation) {
    if (source) await writeFile(path.join(outputRoot, file), source);
  }
  await optimizeImages();

  for (const page of allPages) {
    const sourceFile = path.join(sourceRoot, page.source);
    const markdown = await readFile(sourceFile, "utf8");
    page.rendered = renderMarkdown(markdown, page);
  }
  for (const page of blogPages) {
    const sourceFile = path.join(blogSourceRoot, page.source);
    const markdown = await readFile(sourceFile, "utf8");
    page.rendered = renderMarkdown(markdown, page);
  }
  await buildBlogAssets();

  await buildGeneralPages();
  await buildLandingPages();
  await buildBlogPages();

  for (const page of allPages) {
    const outputDirectory = path.join(siteRoot, page.route.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, "index.html"), renderPage(page, page.rendered));
  }

  await writeSitemap();
  console.log(`Generated ${generalPages.length * locales.length} general pages, ${landingPages.length} landing pages, ${allPages.length} documentation pages, ${locales.length} blog indexes, ${blogPages.length} blog articles, and ${imageMap.size * 2} documentation image variants.`);
}

await build();
