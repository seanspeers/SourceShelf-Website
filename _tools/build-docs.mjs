import { execFileSync } from "node:child_process";
import { readFile, readdir, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const sourceRoot = path.join(siteRoot, "_docs");
const outputRoot = path.join(siteRoot, "docs");
const canonicalOrigin = "https://sourceshelf.app";
const buildDate = "2026-08-01";

const navigation = JSON.parse(
  await readFile(path.join(sourceRoot, "navigation.json"), "utf8")
);

const pageBySource = new Map(navigation.pages.map((page) => [page.source, page]));
const imageMap = new Map();

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
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
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
        : ` <a class="heading-anchor" href="#${slug}" aria-label="Link to ${escapeHtml(label)}"><span aria-hidden="true">#</span></a>`;
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
        html: `<section class="table-wrap" tabindex="0" aria-label="Scrollable table"><table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></section>`
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
    blocks.push({ type: "paragraph", html: `<p>${paragraph}</p>` });
  }

  if (!blocks.length || blocks[0].type !== "heading" || blocks[0].level !== 1) {
    throw new Error(`${page.source} must start with a level-one heading`);
  }

  const firstSection = blocks.findIndex((block) => block.type === "heading" && block.level === 2);
  const splitIndex = firstSection === -1 ? 1 : firstSection;
  return {
    title: blocks[0].text,
    leadHtml: blocks.slice(0, splitIndex).map((block) => block.html).join("\n"),
    bodyHtml: blocks.slice(splitIndex).map((block) => block.html).join("\n"),
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

function renderNavigation(currentPage) {
  const homePage = navigation.pages[0];
  const homeCurrent = currentPage.route === homePage.route ? ' aria-current="page"' : "";
  const groups = navigation.groups.map((group) => {
    const links = navigation.pages
      .filter((page) => page.group === group)
      .map((page) => {
        const current = currentPage.route === page.route ? ' aria-current="page"' : "";
        return `<li><a href="${page.route}"${current}>${escapeHtml(page.label)}</a></li>`;
      })
      .join("");
    return `<section class="docs-nav-group"><h2>${escapeHtml(group)}</h2><ul>${links}</ul></section>`;
  }).join("\n");

  return `<a class="docs-nav-home" href="${homePage.route}"${homeCurrent}>Documentation Home</a>${groups}`;
}

function renderBreadcrumbs(page, title) {
  const crumbs = ['<li><a href="/">Home</a></li>'];
  if (page.route === "/docs/") {
    crumbs.push('<li aria-current="page">Documentation</li>');
  } else {
    crumbs.push('<li><a href="/docs/">Documentation</a></li>');
    if (page.group && page.group !== "Getting Started") {
      crumbs.push(`<li>${escapeHtml(page.group)}</li>`);
    }
    crumbs.push(`<li aria-current="page">${escapeHtml(title)}</li>`);
  }
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${crumbs.join("")}</ol></nav>`;
}

function renderToc(headings, className, label) {
  const links = headings.map((heading) => (
    `<li class="toc-level-${heading.level}"><a href="#${heading.slug}">${escapeHtml(heading.text)}</a></li>`
  )).join("");
  return `<nav class="${className}" aria-label="${label}"><h2>On this page</h2><ol>${links}</ol></nav>`;
}

function renderPagination(page) {
  const index = navigation.pages.findIndex((candidate) => candidate.route === page.route);
  const previous = navigation.pages[index - 1];
  const next = navigation.pages[index + 1];
  const previousHtml = previous
    ? `<a class="docs-page-link docs-page-link-previous" href="${previous.route}"><span>Previous</span><strong>${escapeHtml(previous.label)}</strong></a>`
    : '<span class="docs-page-link-placeholder" aria-hidden="true"></span>';
  const nextHtml = next
    ? `<a class="docs-page-link docs-page-link-next" href="${next.route}"><span>Next</span><strong>${escapeHtml(next.label)}</strong></a>`
    : '<span class="docs-page-link-placeholder" aria-hidden="true"></span>';
  return `<nav class="docs-pagination" aria-label="Documentation pages">${previousHtml}${nextHtml}</nav>`;
}

function themeBootstrap() {
  return `<script>
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
  const title = `${rendered.title} | SourceShelf Documentation`;
  const canonicalUrl = `${canonicalOrigin}${page.route}`;
  const navigationHtml = renderNavigation(page);
  const hasToc = rendered.sectionCount >= 3;
  const mobileToc = hasToc
    ? `<details class="docs-toc-mobile"><summary>On this page</summary>${renderToc(rendered.headings, "docs-toc-list", "Mobile table of contents")}</details>`
    : "";
  const desktopToc = hasToc
    ? `<aside class="docs-toc" aria-label="Page contents">${renderToc(rendered.headings, "docs-toc-list", "Table of contents")}</aside>`
    : '<div class="docs-toc docs-toc-empty" aria-hidden="true"></div>';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="theme-color" content="#08244d">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${canonicalOrigin}/assets/icons/SourceShelf-Icon-lightmode.png">
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="/assets/icons/SourceShelf-Icon-lightmode.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icons/SourceShelf-Icon-lightmode.png">
  <link rel="stylesheet" href="/styles.css?v=20260801">
  ${themeBootstrap()}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/">
        <img class="brand-icon" src="/assets/icons/SourceShelf-Icon-lightmode.png" alt="" width="36" height="36">
        <span>SourceShelf</span>
      </a>
      <div class="nav-links">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/privacy.html">Privacy</a>
        <a class="nav-link" href="/docs/" aria-current="page">Documentation</a>
        <a class="nav-link" href="/support.html">Support</a>
        <a class="nav-download" href="https://apps.apple.com/ca/app/sourceshelf/id6785887729?mt=12" aria-label="Download SourceShelf on the Mac App Store">Download</a>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle dark mode" aria-pressed="false">
          <span class="theme-toggle-icon" aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  </header>

  <main id="main" class="main docs-main">
    <div class="docs-page">
      ${renderBreadcrumbs(page, rendered.title)}
      <details class="docs-mobile-nav">
        <summary>Browse documentation</summary>
        <nav aria-label="Mobile documentation navigation">${navigationHtml}</nav>
      </details>
      <div class="docs-layout">
        <aside class="docs-sidebar" aria-label="Documentation sidebar">
          <nav aria-label="Documentation navigation">${navigationHtml}</nav>
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

  <footer class="site-footer">
    <div class="footer-inner">
      <span>&copy; <span data-current-year>${new Date().getFullYear()}</span> SourceShelf</span>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/docs/">Documentation</a>
        <a href="/support.html">Support</a>
        <a href="mailto:support@sourceshelf.app">support@sourceshelf.app</a>
      </div>
    </div>
  </footer>
  <script src="/script.js?v=20260801"></script>
</body>
</html>
`;
  return html.replace(/[ \t]+$/gm, "");
}

async function writeSitemap() {
  const routes = ["/", "/privacy.html", "/support.html", ...navigation.pages.map((page) => page.route)];
  const entries = routes.map((route) => `  <url>\n    <loc>${canonicalOrigin}${route}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  await writeFile(path.join(siteRoot, "sitemap.xml"), sitemap);
}

async function build() {
  if (navigation.pages.length !== 20) {
    throw new Error(`Expected 20 documentation pages, found ${navigation.pages.length}`);
  }
  if (pageBySource.size !== navigation.pages.length) {
    throw new Error("Documentation navigation contains duplicate source paths");
  }
  const routes = new Set(navigation.pages.map((page) => page.route));
  if (routes.size !== navigation.pages.length) {
    throw new Error("Documentation navigation contains duplicate routes");
  }

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  await optimizeImages();

  for (const page of navigation.pages) {
    const sourceFile = path.join(sourceRoot, page.source);
    const markdown = await readFile(sourceFile, "utf8");
    const rendered = renderMarkdown(markdown, page);
    const outputDirectory = page.route === "/docs/"
      ? outputRoot
      : path.join(siteRoot, page.route.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, "index.html"), renderPage(page, rendered));
  }

  await writeSitemap();
  console.log(`Generated ${navigation.pages.length} documentation pages and ${imageMap.size * 2} image variants.`);
}

await build();
