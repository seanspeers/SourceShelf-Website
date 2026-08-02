import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const sourceRoot = path.join(siteRoot, "_docs");
const siteSourceRoot = path.join(siteRoot, "_site");
const canonicalOrigin = "https://sourceshelf.app";
const localeCodes = ["en", "fr", "es-419", "pt-BR", "ja"];
const navigation = JSON.parse(await readFile(path.join(sourceRoot, "navigation.json"), "utf8"));
const homepageContent = JSON.parse(await readFile(path.join(siteSourceRoot, "homepage.json"), "utf8"));
const homepageScreenshotNames = [
  "01-private-ai-source-packs",
  "02-local-ai-access",
  "03-review-before-sharing",
  "04-convert-files-for-ai",
  "05-capture-from-safari",
  "06-organize-research",
  "07-refresh-and-compare",
  "08-export-workflows",
  "09-private-by-design"
];

function prefixFor(locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function localizedRoute(locale, logicalRoute) {
  return `${prefixFor(locale)}${logicalRoute}`;
}

function localeForRoute(route) {
  for (const locale of localeCodes.slice(1)) {
    if (route === `/${locale}/` || route.startsWith(`/${locale}/`)) return locale;
  }
  return "en";
}

function logicalRouteFor(route, locale) {
  if (locale === "en") return route;
  const stripped = route.slice(locale.length + 1);
  return stripped || "/";
}

const expectedPages = new Map();
for (const locale of localeCodes) {
  for (const logicalRoute of ["/", "/privacy.html", "/support.html", ...navigation.pages.map((page) => page.route)]) {
    const route = localizedRoute(locale, logicalRoute);
    expectedPages.set(route, { locale, logicalRoute, isDocs: logicalRoute.startsWith("/docs/") });
  }
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".cache", "_docs", "_site", "_tools"].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function routeFile(route) {
  if (route === "/") return path.join(siteRoot, "index.html");
  const target = path.join(siteRoot, route.slice(1));
  return route.endsWith("/") ? path.join(target, "index.html") : target;
}

function routeForFile(file) {
  const relative = path.relative(siteRoot, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function splitReference(reference) {
  const hashIndex = reference.indexOf("#");
  const queryIndex = reference.indexOf("?");
  const pathEnd = [hashIndex, queryIndex]
    .filter((index) => index !== -1)
    .reduce((lowest, index) => Math.min(lowest, index), reference.length);
  return {
    path: reference.slice(0, pathEnd),
    fragment: hashIndex === -1 ? "" : decodeURIComponent(reference.slice(hashIndex + 1))
  };
}

function isExternal(reference) {
  return /^(?:[a-z]+:)?\/\//i.test(reference) || /^(?:mailto|tel):/i.test(reference);
}

async function resolveTarget(reference, sourceFile) {
  const parts = splitReference(reference);
  let target;
  if (!parts.path) {
    target = sourceFile;
  } else if (parts.path.startsWith("/")) {
    target = path.join(siteRoot, parts.path.slice(1));
  } else {
    target = path.resolve(path.dirname(sourceFile), parts.path);
  }

  if (parts.path.endsWith("/") || parts.path === "/") {
    target = path.join(target, "index.html");
  } else {
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    } catch {}
  }
  return { target, fragment: parts.fragment };
}

function markdownStructure(source) {
  return {
    headings: [...source.matchAll(/^#{1,6}\s+/gm)].length,
    fences: [...source.matchAll(/^```/gm)].length,
    images: [...source.matchAll(/!\[[^\]]*\]\([^)]+\)/g)].length,
    tables: [...source.matchAll(/^\|.*\|$/gm)].length
  };
}

function fencedBlocks(source) {
  return [...source.matchAll(/^```[^\n]*\n[\s\S]*?^```\s*$/gm)].map((match) => match[0]);
}

const allFiles = await walk(siteRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const idCache = new Map();
const errors = [];
let checkedReferences = 0;
let checkedImages = 0;

async function idsFor(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));
  }
  return idCache.get(file);
}

for (const route of expectedPages.keys()) {
  try {
    await access(routeFile(route));
  } catch {
    errors.push(`Missing expected route: ${route}`);
  }
}

if (htmlFiles.length !== expectedPages.size) {
  errors.push(`Expected ${expectedPages.size} public HTML files, found ${htmlFiles.length}`);
}

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const publicPath = path.relative(siteRoot, htmlFile);
  const route = routeForFile(htmlFile);
  const expected = expectedPages.get(route);
  if (!expected) {
    errors.push(`Unexpected public HTML file: ${publicPath}`);
    continue;
  }
  const { locale, logicalRoute, isDocs } = expected;

  if (/PRIVACY\.md|\.markdownlint|assets\/README\.md/.test(html)) {
    errors.push(`${publicPath} contains a repository-only or Markdown source link`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (isExternal(reference) || reference.startsWith("data:")) continue;
    if (/\.md(?:#.*)?$/.test(reference)) {
      errors.push(`${publicPath} contains an internal Markdown source link: ${reference}`);
      continue;
    }
    checkedReferences += 1;
    const { target, fragment } = await resolveTarget(reference, htmlFile);
    try {
      await access(target);
      if (fragment && !(await idsFor(target)).has(fragment)) {
        errors.push(`${publicPath} links to missing fragment #${fragment} in ${path.relative(siteRoot, target)}`);
      }
    } catch {
      errors.push(`${publicPath} links to missing file: ${reference}`);
    }
  }

  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      const reference = candidate.trim().split(/\s+/)[0];
      checkedReferences += 1;
      const { target } = await resolveTarget(reference, htmlFile);
      try {
        await access(target);
      } catch {
        errors.push(`${publicPath} references a missing srcset image: ${reference}`);
      }
    }
  }

  const requiredMetadata = [
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"'
  ];
  for (const marker of requiredMetadata) {
    if (!html.includes(marker)) errors.push(`${publicPath} is missing metadata: ${marker}`);
  }

  if (!html.includes(`<html lang="${locale}">`)) {
    errors.push(`${publicPath} has an incorrect document language`);
  }
  const expectedCanonical = `${canonicalOrigin}${route}`;
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
    errors.push(`${publicPath} has an incorrect canonical URL`);
  }
  for (const alternateLocale of localeCodes) {
    const alternateUrl = `${canonicalOrigin}${localizedRoute(alternateLocale, logicalRoute)}`;
    if (!html.includes(`<link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}">`)) {
      errors.push(`${publicPath} is missing the ${alternateLocale} alternate URL`);
    }
  }
  if (!html.includes(`<link rel="alternate" hreflang="x-default" href="${canonicalOrigin}${logicalRoute}">`)) {
    errors.push(`${publicPath} is missing the English x-default URL`);
  }
  if (!html.includes(`<option value="${locale}" lang="${locale}" selected>`)) {
    errors.push(`${publicPath} does not select its current language`);
  }
  if (!html.includes(`window.SourceShelfLocale.bootstrap("${locale}")`)) {
    errors.push(`${publicPath} bootstraps the wrong locale`);
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain exactly one level-one heading`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) {
    errors.push(`${publicPath} is missing a page title`);
  }

  if (logicalRoute === "/") {
    const homepage = homepageContent[locale];
    if (!homepage) {
      errors.push(`${publicPath} is missing localized homepage content`);
    }
    const homepageImages = [...html.matchAll(/<img\b[^>]*\bclass="homepage-screenshot"[^>]*>/g)].map((match) => match[0]);
    if (homepageImages.length !== homepageScreenshotNames.length) {
      errors.push(`${publicPath} must contain exactly nine homepage screenshots`);
    }
    const homepageTriggers = [...html.matchAll(/<a\b[^>]*\bclass="home-screenshot-trigger"[^>]*>/g)].map((match) => match[0]);
    if (homepageTriggers.length !== homepageScreenshotNames.length) {
      errors.push(`${publicPath} must contain exactly nine homepage screenshot viewer triggers`);
    }
    for (const trigger of homepageTriggers) {
      const href = trigger.match(/\bhref="([^"]+)"/)?.[1] || "";
      if (!href.startsWith(`/assets/home/${locale}/`) || !href.endsWith("-2880.webp")) {
        errors.push(`${publicPath} has an incorrect full-resolution screenshot link: ${href}`);
      }
      if (!trigger.includes("data-home-screenshot-trigger") || !trigger.includes('aria-haspopup="dialog"') || !trigger.includes('aria-controls="homepage-lightbox"')) {
        errors.push(`${publicPath} contains a screenshot trigger without the expected dialog semantics`);
      }
      if (!/\bdata-lightbox-alt="[^"]+"/.test(trigger) || !/\bdata-lightbox-caption="[^"]+"/.test(trigger) || !/\baria-label="[^"]+"/.test(trigger)) {
        errors.push(`${publicPath} contains a screenshot trigger without localized accessible text`);
      }
    }
    const usedScreenshotNames = new Set();
    for (const image of homepageImages) {
      checkedImages += 1;
      const source = image.match(/\bsrc="([^"]+)"/)?.[1] || "";
      const expectedPrefix = `/assets/home/${locale}/`;
      if (!source.startsWith(expectedPrefix)) {
        errors.push(`${publicPath} loads a homepage screenshot from the wrong locale: ${source}`);
      }
      const screenshotName = source.match(/\/([^/]+)-1440\.webp$/)?.[1];
      if (screenshotName) usedScreenshotNames.add(screenshotName);
      const alt = image.match(/\balt="([^"]*)"/)?.[1] || "";
      if (!alt.trim()) errors.push(`${publicPath} contains a homepage screenshot without alt text`);
      if (!image.includes('width="1440"') || !image.includes('height="900"')) {
        errors.push(`${publicPath} contains a homepage screenshot without the expected dimensions`);
      }
      if (!image.includes("srcset=") || !image.includes("sizes=")) {
        errors.push(`${publicPath} contains a homepage screenshot without responsive image attributes`);
      }
      if (image.includes("-2880.webp")) {
        errors.push(`${publicPath} eagerly exposes a full-resolution screenshot in responsive image markup`);
      }
    }
    for (const screenshotName of homepageScreenshotNames) {
      if (!usedScreenshotNames.has(screenshotName)) {
        errors.push(`${publicPath} is missing homepage screenshot ${screenshotName}`);
      }
    }
    if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
      errors.push(`${publicPath} must eagerly prioritize only the hero screenshot`);
    }
    if ((html.match(/class="homepage-screenshot"[^>]*loading="lazy"/g) || []).length !== 8) {
      errors.push(`${publicPath} must lazy-load the eight non-hero screenshots`);
    }
    if (!html.includes('href="#how-it-works"') || !html.includes('id="how-it-works"')) {
      errors.push(`${publicPath} is missing the how-it-works anchor contract`);
    }
    if ((html.match(/<dialog\b[^>]*\bdata-home-lightbox\b/g) || []).length !== 1) {
      errors.push(`${publicPath} must contain one shared homepage screenshot dialog`);
    }
    if (!html.includes("data-home-lightbox-image") || !html.includes("data-home-lightbox-close") || !html.includes("data-home-lightbox-zoom")) {
      errors.push(`${publicPath} is missing screenshot dialog controls`);
    }
    const lightboxImage = html.match(/<img\b[^>]*\bdata-home-lightbox-image\b[^>]*>/)?.[0] || "";
    if (/\bsrc=/.test(lightboxImage)) {
      errors.push(`${publicPath} preloads the full-resolution screenshot before the viewer opens`);
    }
    const expectedSocialImage = `${canonicalOrigin}/assets/home/${locale}/01-private-ai-source-packs-social.jpg`;
    if (!html.includes(`property="og:image" content="${expectedSocialImage}"`) || !html.includes(`name="twitter:image" content="${expectedSocialImage}"`)) {
      errors.push(`${publicPath} has incorrect localized social imagery`);
    }
    try {
      await access(path.join(siteRoot, `assets/home/${locale}/01-private-ai-source-packs-social.jpg`));
    } catch {
      errors.push(`${publicPath} references a missing localized social image`);
    }
  }

  if (isDocs) {
    const articleBody = html.match(/<div class="docs-article-body">([\s\S]*?)<\/div>\s*<nav class="docs-pagination"/)?.[1] || "";
    for (const heading of articleBody.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)) {
      if (!heading[3].includes(`class="heading-anchor" href="#${heading[2]}"`)) {
        errors.push(`${publicPath} has a section heading without an anchor link: #${heading[2]}`);
      }
    }
    if (html.includes("```") || /!\[[^\]]*\]\([^)]+\)/.test(html)) {
      errors.push(`${publicPath} contains unrendered Markdown`);
    }
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="\/docs\/assets\/images\/[^"]+"[^>]*>/g)) {
      checkedImages += 1;
      const alt = match[0].match(/\balt="([^"]*)"/);
      if (!alt || !alt[1].trim()) errors.push(`${publicPath} contains a documentation image without alt text`);
      if (!/\bwidth="\d+"/.test(match[0]) || !/\bheight="\d+"/.test(match[0])) {
        errors.push(`${publicPath} contains a documentation image without intrinsic dimensions`);
      }
    }
  }
}

for (const locale of localeCodes.slice(1)) {
  for (const page of navigation.pages) {
    const englishFile = path.join(sourceRoot, page.source);
    const localizedFile = path.join(sourceRoot, "locales", locale, page.source);
    try {
      const english = await readFile(englishFile, "utf8");
      const localized = await readFile(localizedFile, "utf8");
      const englishStructure = markdownStructure(english);
      const localizedStructure = markdownStructure(localized);
      for (const key of Object.keys(englishStructure)) {
        if (englishStructure[key] !== localizedStructure[key]) {
          errors.push(`${locale}/${page.source} has different ${key} structure from English`);
        }
      }
      if (JSON.stringify(fencedBlocks(english)) !== JSON.stringify(fencedBlocks(localized))) {
        errors.push(`${locale}/${page.source} changes a fenced code block`);
      }
    } catch {
      errors.push(`${locale}/${page.source} is missing from the localized documentation source`);
    }
  }
}

const englishCatalog = JSON.parse(await readFile(path.join(siteSourceRoot, "locales", "en.json"), "utf8"));
const englishKeys = Object.keys(englishCatalog.translations).sort();
for (const locale of localeCodes.slice(1)) {
  const catalog = JSON.parse(await readFile(path.join(siteSourceRoot, "locales", `${locale}.json`), "utf8"));
  if (JSON.stringify(Object.keys(catalog.translations).sort()) !== JSON.stringify(englishKeys)) {
    errors.push(`${locale} website catalog does not mirror the English catalog`);
  }
}

const generatedImages = allFiles.filter((file) => (
  file.startsWith(path.join(siteRoot, "docs", "assets", "images")) && file.endsWith(".webp")
));
if (generatedImages.length !== 18) {
  errors.push(`Expected 18 optimized documentation images, found ${generatedImages.length}`);
}

for (const locale of localeCodes) {
  const homepage = homepageContent[locale];
  if (!homepage) {
    errors.push(`Homepage content is missing for ${locale}`);
    continue;
  }
  if (homepage.proof.length !== 4 || homepage.capture.items.length !== 3 || homepage.review.items.length !== 2 || homepage.connect.items.length !== 2) {
    errors.push(`${locale} homepage content does not match the shared section structure`);
  }
  const lightboxKeys = ["open", "openLabel", "close", "closeLabel", "zoom", "fit", "dialogLabel"];
  if (lightboxKeys.some((key) => !homepage.lightbox?.[key]?.trim())) {
    errors.push(`${locale} homepage content is missing localized screenshot viewer labels`);
  }
  for (const screenshotName of homepageScreenshotNames) {
    for (const width of [960, 1440, 2880]) {
      try {
        await access(path.join(siteRoot, `assets/home/${locale}/${screenshotName}-${width}.webp`));
      } catch {
        errors.push(`Missing optimized homepage image: ${locale}/${screenshotName}-${width}.webp`);
      }
    }
  }
}

const homepageAssets = allFiles.filter((file) => file.startsWith(path.join(siteRoot, "assets", "home")));
if (homepageAssets.length !== 140) {
  errors.push(`Expected 140 localized homepage assets, found ${homepageAssets.length}`);
}

const sitemap = await readFile(path.join(siteRoot, "sitemap.xml"), "utf8");
for (const route of expectedPages.keys()) {
  if (!sitemap.includes(`<loc>${canonicalOrigin}${route}</loc>`)) {
    errors.push(`Sitemap is missing ${route}`);
  }
}
if ((sitemap.match(/<url>/g) || []).length !== expectedPages.size) {
  errors.push(`Expected ${expectedPages.size} sitemap entries`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files, ${checkedReferences} local references, ${checkedImages} accessible images, 140 localized homepage assets, and ${navigation.pages.length * (localeCodes.length - 1)} localized guide sources.`);
}
