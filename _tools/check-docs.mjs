import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const sourceRoot = path.join(siteRoot, "_docs");
const siteSourceRoot = path.join(siteRoot, "_site");
const blogSourceRoot = path.join(siteRoot, "_blog");
const localeCodes = ["en", "fr", "es-419", "pt-BR", "ja"];
const navigation = JSON.parse(await readFile(path.join(sourceRoot, "navigation.json"), "utf8"));
const homepageContent = JSON.parse(await readFile(path.join(siteSourceRoot, "homepage.json"), "utf8"));
const productConfig = JSON.parse(await readFile(path.join(siteSourceRoot, "product.json"), "utf8"));
const canonicalOrigin = productConfig.canonicalOrigin;
const landingContent = new Map(await Promise.all(localeCodes.map(async (locale) => [
  locale,
  JSON.parse(await readFile(path.join(siteSourceRoot, "landing-pages", `${locale}.json`), "utf8"))
])));
const landingRoutes = landingContent.get("en").pages.map((page) => page.route);
const blogManifest = JSON.parse(await readFile(path.join(blogSourceRoot, "posts.json"), "utf8"));
const blogRoutes = blogManifest.posts.map((post) => post.route);
const examplesContent = JSON.parse(await readFile(path.join(siteSourceRoot, "examples.json"), "utf8"));
const exampleRoutes = examplesContent.pages.map((page) => page.logicalRoute);
const sharedScript = await readFile(path.join(siteRoot, "script.js"), "utf8");
const homepageAssetNames = [
  "01-private-ai-source-packs",
  "02-local-ai-access",
  "03-review-before-sharing",
  "04-convert-files-for-ai",
  "05-capture-from-safari",
  "06-organize-research",
  "07-refresh-and-compare",
  "08-export-workflows",
  "09-private-by-design",
  "10-pdf-to-markdown",
  "11-ask-this-pack"
];

function homepageScreenshotNames(homepage) {
  return [
    homepage.hero.image || "01-private-ai-source-packs",
    ...homepage.capture.items.map((item) => item.image),
    ...homepage.review.items.map((item) => item.image),
    ...homepage.connect.items.map((item) => item.image),
    "09-private-by-design"
  ];
}

function prefixFor(locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function localizedRoute(locale, logicalRoute) {
  return `${prefixFor(locale)}${logicalRoute}`;
}

function canonicalUrlForRoute(route) {
  if (!route.startsWith("/")) throw new Error(`Canonical route is not root-relative: ${route}`);
  if (route.includes("#") || route.includes("?") || route.includes("index.html")) {
    throw new Error(`Canonical route contains a forbidden variant: ${route}`);
  }
  if (route !== "/" && !route.endsWith("/") && !route.endsWith(".html")) {
    throw new Error(`Canonical route does not follow the trailing-slash or .html convention: ${route}`);
  }
  return `${canonicalOrigin}${route}`;
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
  for (const logicalRoute of ["/", "/privacy.html", "/support.html", "/blog/", ...blogRoutes, ...landingRoutes, ...exampleRoutes, ...navigation.pages.map((page) => page.route)]) {
    const route = localizedRoute(locale, logicalRoute);
    expectedPages.set(route, {
      locale,
      logicalRoute,
      isDocs: logicalRoute.startsWith("/docs/"),
      isLanding: landingRoutes.includes(logicalRoute),
      isBlogIndex: logicalRoute === "/blog/",
      isBlogArticle: blogRoutes.includes(logicalRoute),
      isExample: exampleRoutes.includes(logicalRoute)
    });
  }
}
const expectedCanonicalUrls = new Set([...expectedPages.keys()].map(canonicalUrlForRoute));

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".cache", "_blog", "_docs", "_site", "_tools"].includes(entry.name)) continue;
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

function attributeValue(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "";
}

function inspectStructuredUrl(value, publicPath, errors) {
  if (typeof value !== "string") return;
  if (/^http:\/\/sourceshelf\.app(?:\/|$)/i.test(value)) {
    errors.push(`${publicPath} contains a non-HTTPS SourceShelf structured-data URL: ${value}`);
    return;
  }
  if (value === canonicalOrigin) {
    errors.push(`${publicPath} contains a SourceShelf structured-data homepage URL without its canonical trailing slash`);
    return;
  }
  if (!value.startsWith(`${canonicalOrigin}/`)) return;
  const url = new URL(value);
  if (url.hash || url.search || url.pathname.endsWith("/index.html")) {
    errors.push(`${publicPath} contains a non-canonical structured-data URL: ${value}`);
  }
  if (!url.pathname.startsWith("/assets/") && !path.posix.extname(url.pathname) && !url.pathname.endsWith("/")) {
    errors.push(`${publicPath} contains a structured-data directory URL without a trailing slash: ${value}`);
  }
}

function auditStructuredUrls(value, publicPath, errors) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) auditStructuredUrls(item, publicPath, errors);
    return;
  }
  for (const [key, nested] of Object.entries(value)) {
    if (["url", "mainEntityOfPage", "item"].includes(key)) {
      inspectStructuredUrl(nested, publicPath, errors);
    }
    auditStructuredUrls(nested, publicPath, errors);
  }
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
const landingTitles = new Set();
const landingDescriptions = new Set();

if (!sharedScript.includes('var analyticsMeasurementId = "G-D15DHBQH6F";')) {
  errors.push("script.js is missing the SourceShelf Google Analytics measurement ID");
}
if (!sharedScript.includes('var analyticsConsentStorageKey = "sourceshelf-analytics-consent-v1";')) {
  errors.push("script.js is missing the versioned analytics consent choice");
}
if (!sharedScript.includes('googleTag.setAttribute("data-sourceshelf-analytics", "")')) {
  errors.push("script.js does not load Google Analytics through the consent-gated tag marker");
}

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
  const { locale, logicalRoute, isDocs, isLanding, isBlogIndex, isBlogArticle, isExample } = expected;
  const expectedBlogPost = isBlogArticle
    ? blogManifest.posts.find((post) => post.route === logicalRoute)
    : null;

  if (/PRIVACY\.md|\.markdownlint|assets\/README\.md/.test(html)) {
    errors.push(`${publicPath} contains a repository-only or Markdown source link`);
  }

  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (/^http:\/\/sourceshelf\.app(?:\/|$)/i.test(reference)) {
      errors.push(`${publicPath} contains a non-HTTPS internal link: ${reference}`);
    }
    const sameOriginAbsolute = reference === canonicalOrigin || reference.startsWith(`${canonicalOrigin}/`);
    if (!sameOriginAbsolute && isExternal(reference)) continue;
    const referencePath = sameOriginAbsolute
      ? new URL(reference).pathname
      : splitReference(reference).path;
    if (/(?:^|\/)index\.html$/i.test(referencePath)) {
      errors.push(`${publicPath} contains an internal index.html link: ${reference}`);
    }
    if (referencePath && !referencePath.endsWith("/") && !path.posix.extname(referencePath)) {
      const localReference = sameOriginAbsolute ? referencePath : reference;
      const { target } = await resolveTarget(localReference, htmlFile);
      if (target.endsWith(`${path.sep}index.html`)) {
        try {
          await access(target);
          errors.push(`${publicPath} links to a directory without a trailing slash: ${reference}`);
        } catch {}
      }
    }
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (isExternal(reference) || reference.startsWith("data:")) continue;
    if (/\.md(?:#.*)?$/.test(reference)) {
      const expectedMarkdownAlternate = expectedBlogPost?.publishMarkdown
        ? `${localizedRoute(locale, logicalRoute)}index.md`
        : null;
      if (reference !== expectedMarkdownAlternate) {
        errors.push(`${publicPath} contains an internal Markdown source link: ${reference}`);
        continue;
      }
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
  if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
    errors.push(`${publicPath} unexpectedly blocks indexing`);
  }
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0] || "";
  const canonicalTags = [...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/gi)].map((match) => match[0]);
  const headCanonicalTags = [...head.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/gi)].map((match) => match[0]);
  if (canonicalTags.length !== 1 || headCanonicalTags.length !== 1) {
    errors.push(`${publicPath} must contain exactly one canonical link inside <head>`);
  }
  const expectedCanonical = canonicalUrlForRoute(route);
  const canonicalHref = canonicalTags[0] ? attributeValue(canonicalTags[0], "href") : "";
  if (!canonicalHref.startsWith(`${canonicalOrigin}/`)) {
    errors.push(`${publicPath} canonical URL is not an absolute ${canonicalOrigin}/ URL`);
  }
  if (canonicalHref !== expectedCanonical) {
    errors.push(`${publicPath} canonical URL must self-reference ${expectedCanonical}`);
  }
  if (route !== "/" && canonicalHref === canonicalUrlForRoute("/")) {
    errors.push(`${publicPath} incorrectly canonicalizes a distinct page to the homepage`);
  }
  const ogUrlTags = [...html.matchAll(/<meta\b[^>]*\bproperty="og:url"[^>]*>/gi)].map((match) => match[0]);
  if (ogUrlTags.length !== 1 || attributeValue(ogUrlTags[0] || "", "content") !== expectedCanonical) {
    errors.push(`${publicPath} must contain exactly one og:url matching its canonical URL`);
  }
  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      errors.push(`${publicPath} contains invalid JSON-LD`);
      return null;
    }
  }).filter(Boolean);
  for (const value of structuredData) {
    auditStructuredUrls(value, publicPath, errors);
    if (["SoftwareApplication", "Blog", "BlogPosting", "VideoObject"].includes(value["@type"]) && value.url !== expectedCanonical) {
      errors.push(`${publicPath} ${value["@type"]} URL must match its canonical URL`);
    }
    if (value.mainEntityOfPage && value.mainEntityOfPage !== expectedCanonical) {
      errors.push(`${publicPath} mainEntityOfPage must match its canonical URL`);
    }
    if (value["@type"] === "BreadcrumbList") {
      const finalItem = value.itemListElement?.at(-1)?.item;
      if (finalItem !== expectedCanonical) {
        errors.push(`${publicPath} final breadcrumb URL must match its canonical URL`);
      }
    }
  }
  for (const alternateLocale of localeCodes) {
    const alternateUrl = canonicalUrlForRoute(localizedRoute(alternateLocale, logicalRoute));
    if (!html.includes(`<link rel="alternate" hreflang="${alternateLocale}" href="${alternateUrl}">`)) {
      errors.push(`${publicPath} is missing the ${alternateLocale} alternate URL`);
    }
  }
  if (!html.includes(`<link rel="alternate" hreflang="x-default" href="${canonicalUrlForRoute(logicalRoute)}">`)) {
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
  if ((html.match(/data-analytics-consent-settings/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain one analytics settings control`);
  }
  if ((html.match(/data-analytics-consent-banner/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain one analytics consent banner`);
  }
  if ((html.match(/data-analytics-consent-accept/g) || []).length !== 1 || (html.match(/data-analytics-consent-decline/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain one accept and one decline analytics control`);
  }
  if (html.includes("googletagmanager.com/gtag/js")) {
    errors.push(`${publicPath} preloads Google Analytics before consent`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) {
    errors.push(`${publicPath} is missing a page title`);
  }
  if ((html.match(/class="footer-use-cases"/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain one grouped use-case footer`);
  }
  const footerUseCases = html.match(/<nav class="footer-use-cases"[\s\S]*?<\/nav>/)?.[0] || "";
  if ((footerUseCases.match(/<a href=/g) || []).length !== 6) {
    errors.push(`${publicPath} must link all six use cases from its grouped footer`);
  }
  const footerPrimary = html.match(/<div class="footer-links">[\s\S]*?<\/div>/)?.[0] || "";
  const localizedExamplesRoute = localizedRoute(locale, "/examples/");
  const localizedExamplesLabel = examplesContent.translations[locale]?.Examples;
  if (!localizedExamplesLabel || !footerPrimary.includes(`<a href="${localizedExamplesRoute}">${localizedExamplesLabel}</a>`)) {
    errors.push(`${publicPath} is missing the localized Examples footer link`);
  }

  if (isExample) {
    if (!html.includes('class="examples-nav"') || !html.includes(`href="${localizedExamplesRoute}" aria-current="page"`)) {
      errors.push(`${publicPath} is missing the examples navigation or current-section state`);
    }
    for (const englishLabel of [
      "Japan Trip Planner",
      "Developer Documentation Assistant",
      "Home Renovation Research",
      "Academic Research Assistant",
      "Personal Learning Assistant"
    ]) {
      const label = examplesContent.translations[locale]?.[englishLabel] || englishLabel;
      if (!html.includes(label)) errors.push(`${publicPath} is missing localized example label: ${label}`);
    }
    if (/<iframe\b/i.test(html) || /\bsrc="https:\/\/(?:www\.)?youtube/i.test(html)) {
      errors.push(`${publicPath} contacts YouTube before the visitor chooses to play the video`);
    }

    if (logicalRoute === "/examples/japan-trip-ai-planner/") {
      const pageContent = examplesContent.pages.find((page) => page.logicalRoute === logicalRoute)?.locales?.[locale];
      if (!pageContent || !html.includes(`<title>${pageContent.title}</title>`)) {
        errors.push(`${publicPath} has the wrong SEO title`);
      }
      if (!pageContent || !html.includes(`meta name="description" content="${pageContent.description}"`)) {
        errors.push(`${publicPath} has the wrong SEO description`);
      }
      const localizedHero = examplesContent.translations[locale]?.["Plan your next trip with your own private AI travel assistant"] || "Plan your next trip with your own private AI travel assistant";
      if (!html.includes(localizedHero)) {
        errors.push(`${publicPath} is missing the requested hero heading`);
      }
      if (
        !html.includes('data-youtube-embed="https://www.youtube-nocookie.com/embed/EgGdSRGvE7Y"') ||
        !html.includes('href="https://youtube.com/shorts/EgGdSRGvE7Y?feature=share"') ||
        !html.includes("data-youtube-load")
      ) {
        errors.push(`${publicPath} is missing the privacy-enhanced Japan demo video`);
      }
      if ((html.match(/class="example-evidence-card(?: |")/g) || []).length !== 3) {
        errors.push(`${publicPath} must contain three product-evidence cards`);
      }
      if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
        errors.push(`${publicPath} must prioritize only its Japan hero image`);
      }
      if (!html.includes('data-home-lightbox') || (html.match(/data-home-screenshot-trigger/g) || []).length < 7) {
        errors.push(`${publicPath} is missing the shared screenshot viewer or its evidence triggers`);
      }
    }
  }

  if (logicalRoute === "/") {
    const homepage = homepageContent[locale];
    if (!homepage) {
      errors.push(`${publicPath} is missing localized homepage content`);
    }
    const expectedHomepageScreenshots = homepage ? homepageScreenshotNames(homepage) : [];
    const homepageImages = [...html.matchAll(/<img\b[^>]*\bclass="homepage-screenshot"[^>]*>/g)].map((match) => match[0]);
    if (homepageImages.length !== expectedHomepageScreenshots.length) {
      errors.push(`${publicPath} must contain exactly ${expectedHomepageScreenshots.length} homepage screenshots`);
    }
    const homepageTriggers = [...html.matchAll(/<a\b[^>]*\bclass="home-screenshot-trigger"[^>]*>/g)].map((match) => match[0]);
    if (homepageTriggers.length !== expectedHomepageScreenshots.length) {
      errors.push(`${publicPath} must contain exactly ${expectedHomepageScreenshots.length} homepage screenshot viewer triggers`);
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
    for (const screenshotName of expectedHomepageScreenshots) {
      if (!usedScreenshotNames.has(screenshotName)) {
        errors.push(`${publicPath} is missing homepage screenshot ${screenshotName}`);
      }
    }
    if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
      errors.push(`${publicPath} must eagerly prioritize only the hero screenshot`);
    }
    if ((html.match(/class="homepage-screenshot"[^>]*loading="lazy"/g) || []).length !== Math.max(0, expectedHomepageScreenshots.length - 1)) {
      errors.push(`${publicPath} must lazy-load every non-hero homepage screenshot`);
    }
    if (!html.includes('href="#how-it-works"') || !html.includes('id="how-it-works"')) {
      errors.push(`${publicPath} is missing the how-it-works anchor contract`);
    }
    if (!html.includes('id="ways-to-use"') || (html.match(/class="home-use-case-card"/g) || []).length !== 6) {
      errors.push(`${publicPath} must contain the six-card Ways to use SourceShelf section`);
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
    const expectedSocialImage = `${canonicalOrigin}/assets/home/${locale}/${homepage?.meta.socialImage}`;
    if (!html.includes(`property="og:image" content="${expectedSocialImage}"`) || !html.includes(`name="twitter:image" content="${expectedSocialImage}"`)) {
      errors.push(`${publicPath} has incorrect localized social imagery`);
    }
    if (
      homepage &&
      (!html.includes(`property="og:image:alt" content="${homepage.meta.socialImageAlt}"`) ||
       !html.includes(`name="twitter:image:alt" content="${homepage.meta.socialImageAlt}"`) ||
       !html.includes('property="og:image:width" content="1200"') ||
       !html.includes('property="og:image:height" content="630"'))
    ) {
      errors.push(`${publicPath} is missing localized social-image semantics`);
    }
    try {
      await access(path.join(siteRoot, `assets/home/${locale}/${homepage.meta.socialImage}`));
    } catch {
      errors.push(`${publicPath} references a missing localized social image`);
    }
    const homepageJsonLD = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }).filter(Boolean);
    const homepageSoftware = homepageJsonLD.filter((value) => value["@type"] === "SoftwareApplication");
    if (
      homepageSoftware.length !== 1 ||
      homepageSoftware[0]?.operatingSystem !== "macOS, iOS, iPadOS" ||
      homepageSoftware[0]?.softwareVersion !== productConfig.software.version ||
      homepageSoftware[0]?.description !== homepage?.meta.description
    ) {
      errors.push(`${publicPath} has incorrect cross-platform SoftwareApplication metadata`);
    }
  }

  if (isLanding) {
    const localeContent = landingContent.get(locale);
    const page = localeContent.pages.find((candidate) => candidate.route === logicalRoute);
    if (!page) {
      errors.push(`${publicPath} has no localized landing-page source`);
      continue;
    }

    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || "";
    const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1] || "";
    const titleKey = `${locale}:${title}`;
    const descriptionKey = `${locale}:${description}`;
    if (landingTitles.has(titleKey)) errors.push(`${publicPath} duplicates a localized landing-page title`);
    if (landingDescriptions.has(descriptionKey)) errors.push(`${publicPath} duplicates a localized landing-page description`);
    landingTitles.add(titleKey);
    landingDescriptions.add(descriptionKey);

    if (!html.includes('<meta name="robots" content="index,follow">')) {
      errors.push(`${publicPath} must explicitly allow indexing and following`);
    }
    if (!html.includes('class="landing-breadcrumbs"') || !html.includes('class="landing-trust-strip"')) {
      errors.push(`${publicPath} is missing visible breadcrumbs or its trust strip`);
    }
    if (!html.includes('class="section landing-demo"') || !html.includes('class="landing-transcript"')) {
      errors.push(`${publicPath} is missing its video demonstration and visible overview`);
    }
    const video = productConfig.youtubeVideos?.[page.id];
    if (!video) {
      errors.push(`${publicPath} has no configured YouTube video`);
    } else {
      const expectedWatchUrl = `https://youtu.be/${video.id}`;
      const expectedEmbedUrl = `https://www.youtube-nocookie.com/embed/${video.id}`;
      if (
        video.watchUrl !== expectedWatchUrl ||
        video.embedUrl !== expectedEmbedUrl ||
        !video.uploadDate ||
        Number.isNaN(Date.parse(video.uploadDate))
      ) {
        errors.push(`${publicPath} has inconsistent YouTube video configuration`);
      }
      if (
        !html.includes('class="landing-demo-preview landing-demo-youtube"') ||
        !html.includes(`data-youtube-embed="${expectedEmbedUrl}"`) ||
        !html.includes(`href="${expectedWatchUrl}"`) ||
        !html.includes("data-youtube-load")
      ) {
        errors.push(`${publicPath} does not render its mapped privacy-enhanced YouTube controls`);
      }
      if (/<iframe\b/i.test(html) || /\bsrc="https:\/\/(?:www\.)?youtube/i.test(html)) {
        errors.push(`${publicPath} contacts YouTube before the visitor chooses to play the video`);
      }
    }
    if (html.includes("<video") || /\.(?:mp4|vtt)|-poster\.webp/.test(html)) {
      errors.push(`${publicPath} still references planned local video placeholder media`);
    }
    if (!html.includes('id="how-it-works"') || !html.includes('class="landing-workflow-list"')) {
      errors.push(`${publicPath} is missing its static workflow`);
    }
    if ((html.match(/class="landing-faq-item"/g) || []).length !== page.faq.length) {
      errors.push(`${publicPath} does not render every localized FAQ entry`);
    }
    if ((html.match(/class="landing-related-card"/g) || []).length !== page.related.length) {
      errors.push(`${publicPath} does not render the configured related pages`);
    }

    const landingImages = [...html.matchAll(/<img\b[^>]*\bclass="homepage-screenshot"[^>]*>/g)].map((match) => match[0]);
    if (landingImages.length !== page.screenshots.length) {
      errors.push(`${publicPath} renders ${landingImages.length} meaningful screenshots instead of ${page.screenshots.length}`);
    }
    const landingAltTexts = new Set();
    for (const image of landingImages) {
      checkedImages += 1;
      const alt = image.match(/\balt="([^"]*)"/)?.[1] || "";
      if (!alt.trim()) errors.push(`${publicPath} contains a meaningful landing-page screenshot without alt text`);
      if (landingAltTexts.has(alt)) errors.push(`${publicPath} repeats a meaningful screenshot alt text`);
      landingAltTexts.add(alt);
      if (!image.includes('width="1440"') || !image.includes('height="900"') || !image.includes("srcset=") || !image.includes("sizes=")) {
        errors.push(`${publicPath} contains a landing-page screenshot without responsive intrinsic dimensions`);
      }
    }
    if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
      errors.push(`${publicPath} must prioritize only its hero screenshot`);
    }
    if ((html.match(/class="homepage-screenshot"[^>]*loading="lazy"/g) || []).length !== Math.max(0, page.screenshots.length - 1)) {
      errors.push(`${publicPath} must lazy-load every non-hero meaningful screenshot`);
    }

    const expectedAppStoreURL = productConfig.appStore.campaigns[page.campaignKey] || productConfig.appStore.default;
    if ((html.match(new RegExp(`class="app-store-badge-link" href="${expectedAppStoreURL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "g")) || []).length !== 2) {
      errors.push(`${publicPath} does not use the configured App Store campaign fallback for both primary CTAs`);
    }
    const badge = productConfig.appStore.badges[locale];
    if (!html.includes(`src="${badge.path}"`) || !html.includes(`width="${badge.width}"`) || !html.includes(`height="${badge.height}"`)) {
      errors.push(`${publicPath} does not use the correct localized official App Store badge`);
    }

    const jsonLD = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        errors.push(`${publicPath} contains invalid JSON-LD`);
        return null;
      }
    }).filter(Boolean);
    const software = jsonLD.filter((value) => value["@type"] === "SoftwareApplication");
    const breadcrumbs = jsonLD.filter((value) => value["@type"] === "BreadcrumbList");
    const videoObjects = jsonLD.filter((value) => value["@type"] === "VideoObject");
    if (software.length !== 1 || breadcrumbs.length !== 1 || videoObjects.length !== 1) {
      errors.push(`${publicPath} must contain one SoftwareApplication, one BreadcrumbList, and one VideoObject`);
    }
    if (jsonLD.some((value) => value["@type"] === "FAQPage")) {
      errors.push(`${publicPath} contains unsupported FAQ structured data`);
    }
    if (videoObjects[0] && (
      videoObjects[0].url !== expectedCanonical ||
      videoObjects[0].uploadDate !== video?.uploadDate ||
      videoObjects[0].sameAs !== video?.watchUrl ||
      videoObjects[0].embedUrl !== video?.embedUrl ||
      videoObjects[0].inLanguage !== locale
    )) {
      errors.push(`${publicPath} VideoObject does not match its canonical page and mapped YouTube video`);
    }
    if (software[0]) {
      if (software[0].softwareVersion !== productConfig.software.version || software[0].operatingSystem !== productConfig.software.operatingSystem) {
        errors.push(`${publicPath} structured product metadata is out of sync with product.json`);
      }
      if (software[0].aggregateRating || software[0].review || software[0].offers?.aggregateRating) {
        errors.push(`${publicPath} structured data contains an invented rating or review`);
      }
      if (software[0].offers?.price !== productConfig.software.offer.price || software[0].offers?.priceCurrency !== productConfig.software.offer.priceCurrency) {
        errors.push(`${publicPath} structured offer data is out of sync with product.json`);
      }
    }
  }

  if (isBlogIndex || isBlogArticle) {
    const localeContent = blogManifest.index[locale];
    const post = isBlogArticle ? blogManifest.posts.find((candidate) => candidate.route === logicalRoute) : null;
    if (!localeContent || (isBlogArticle && !post?.locales?.[locale])) {
      errors.push(`${publicPath} has no complete localized blog source`);
      continue;
    }
    if (!html.includes('<meta name="robots" content="index,follow">')) {
      errors.push(`${publicPath} must explicitly allow blog indexing and following`);
    }
    if (!html.includes(`href="${localizedRoute(locale, "/blog/")}" aria-current="page"`)) {
      errors.push(`${publicPath} does not mark Blog as the current navigation section`);
    }
    if (!html.includes('class="breadcrumbs blog-breadcrumbs"')) {
      errors.push(`${publicPath} is missing visible blog breadcrumbs`);
    }

    const jsonLD = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        errors.push(`${publicPath} contains invalid blog JSON-LD`);
        return null;
      }
    }).filter(Boolean);
    const breadcrumbs = jsonLD.filter((value) => value["@type"] === "BreadcrumbList");
    if (breadcrumbs.length !== 1) {
      errors.push(`${publicPath} must contain one blog BreadcrumbList object`);
    }

    if (isBlogIndex) {
      const blogs = jsonLD.filter((value) => value["@type"] === "Blog");
      if (blogs.length !== 1 || blogs[0].inLanguage !== locale || blogs[0].blogPost?.length !== blogManifest.posts.length) {
        errors.push(`${publicPath} must contain one complete localized Blog object`);
      }
      if ((html.match(/class="blog-card"/g) || []).length !== blogManifest.posts.length) {
        errors.push(`${publicPath} does not render every configured blog post`);
      }
      if (!html.includes('property="og:type" content="website"')) {
        errors.push(`${publicPath} must use website Open Graph metadata`);
      }
    }

    if (isBlogArticle) {
      const content = post.locales[locale];
      const video = post.youtubeVideo;
      const postings = jsonLD.filter((value) => value["@type"] === "BlogPosting");
      const videoObjects = jsonLD.filter((value) => value["@type"] === "VideoObject");
      if (postings.length !== 1) {
        errors.push(`${publicPath} must contain one BlogPosting object`);
      } else if (
        postings[0].datePublished !== post.published ||
        postings[0].dateModified !== post.modified ||
        postings[0].author?.name !== "SourceShelf" ||
        postings[0].publisher?.name !== "SourceShelf" ||
        postings[0].inLanguage !== locale
      ) {
        errors.push(`${publicPath} contains incomplete BlogPosting dates, locale, author, or publisher data`);
      }
      if (!html.includes('property="og:type" content="article"') || !html.includes(`property="article:published_time" content="${post.published}"`)) {
        errors.push(`${publicPath} is missing article Open Graph metadata`);
      }
      if (!html.includes('<link rel="describedby" href="/llms.txt">')) {
        errors.push(`${publicPath} is missing its llms.txt discovery link`);
      }
      if (post.publishMarkdown && !html.includes(`<link rel="alternate" type="text/markdown" href="${localizedRoute(locale, logicalRoute)}index.md">`)) {
        errors.push(`${publicPath} is missing its published Markdown alternate`);
      }
      if (content.verifiedLabel && !html.includes('class="blog-verified"')) {
        errors.push(`${publicPath} is missing its localized verification date`);
      }
      if (!content.verifiedLabel && html.includes('class="blog-verified"')) {
        errors.push(`${publicPath} renders a verification label that is not configured`);
      }
      if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
        errors.push(`${publicPath} must prioritize only the blog hero image`);
      }
      const hero = html.match(/<img\b[^>]*\bsrc="\/assets\/blog\/[^>]+>/)?.[0] || "";
      if (!hero.includes(`src="/assets/blog/${locale}/${post.heroAsset}.${post.heroFormat || "svg"}"`) || !/\balt="[^"]+"/.test(hero) || !hero.includes('width="1200"') || !hero.includes('height="630"')) {
        errors.push(`${publicPath} has incomplete localized hero image markup`);
      }
      if (video) {
        const expectedWatchUrl = `https://youtu.be/${video.id}`;
        const expectedEmbedUrl = `https://www.youtube-nocookie.com/embed/${video.id}`;
        if (
          !/^[A-Za-z0-9_-]{11}$/.test(video.id) ||
          video.watchUrl !== expectedWatchUrl ||
          video.embedUrl !== expectedEmbedUrl ||
          !video.uploadDate ||
          Number.isNaN(Date.parse(video.uploadDate))
        ) {
          errors.push(`${publicPath} has invalid blog YouTube video configuration`);
        } else if (
          !html.includes('class="blog-hero-figure"') ||
          !html.includes('class="blog-inline-video landing-demo-preview landing-demo-youtube"') ||
          !html.includes(`data-youtube-embed="${expectedEmbedUrl}"`) ||
          !html.includes(`href="${expectedWatchUrl}"`) ||
          !html.includes("data-youtube-load")
        ) {
          errors.push(`${publicPath} does not render its static hero image and privacy-enhanced inline YouTube controls`);
        }
        if (videoObjects.length !== 1) {
          errors.push(`${publicPath} must contain one blog VideoObject`);
        } else if (
          videoObjects[0].url !== expectedCanonical ||
          videoObjects[0].uploadDate !== video.uploadDate ||
          videoObjects[0].sameAs !== video.watchUrl ||
          videoObjects[0].embedUrl !== video.embedUrl ||
          videoObjects[0].inLanguage !== locale
        ) {
          errors.push(`${publicPath} VideoObject does not match its canonical page and mapped YouTube video`);
        }
      } else if (post.videoPlaceholder) {
        const placeholder = content.videoPlaceholder;
        const poster = `/assets/blog/${locale}/${post.videoPlaceholder.posterAsset}.webp`;
        if (!placeholder || !html.includes('class="blog-video-placeholder"') || !html.includes(`src="${poster}"`) || !html.includes('class="blog-video-transcript"') || !html.includes(placeholder.status)) {
          errors.push(`${publicPath} does not render its localized, metadata-free video placeholder`);
        }
        if (videoObjects.length !== 0 || html.includes("data-youtube-load")) {
          errors.push(`${publicPath} gives an unpublished placeholder fake video metadata or controls`);
        }
      } else if (!post.mediaOptional) {
        errors.push(`${publicPath} has neither a video nor a video placeholder`);
      }
      if (/<iframe\b/i.test(html) || /\bsrc="https:\/\/(?:www\.)?youtube/i.test(html)) {
        errors.push(`${publicPath} contacts YouTube before the visitor chooses to play the blog video`);
      }
      for (const asset of [...(post.articleGraphics || []), ...(post.articleScreenshots || [])]) {
        const format = asset.format || "webp";
        const image = html.match(new RegExp(`<img\\b[^>]*\\bsrc="/assets/blog/${locale}/${asset.id}\\.${format}"[^>]*>`))?.[0] || "";
        const responsiveMarkup = format === "webp" ? image.includes("srcset=") : true;
        if (!/\balt="[^"]+"/.test(image) || !responsiveMarkup || !image.includes(`width="${asset.width}"`) || !image.includes(`height="${asset.height}"`)) {
          errors.push(`${publicPath} has incomplete localized article image markup for ${asset.id}`);
        }
      }
      if (post.ctaRoute) {
        if (!html.includes(`class="button button-primary blog-cta-button" href="${localizedRoute(locale, post.ctaRoute)}"`)) {
          errors.push(`${publicPath} does not use its configured localized internal CTA`);
        }
      } else {
        const badge = productConfig.appStore.badges[locale];
        if (!html.includes(`class="app-store-badge-link" href="${productConfig.appStore.default}"`) || !html.includes(`src="${badge.path}"`)) {
          errors.push(`${publicPath} does not use the configured localized App Store CTA`);
        }
      }
      for (const url of post.requiredExternalLinks || []) {
        if (!html.includes(`href="${url}"`)) errors.push(`${publicPath} is missing official source link: ${url}`);
      }
      for (const route of post.requiredLogicalLinks || []) {
        if (!html.includes(`href="${localizedRoute(locale, route)}"`)) errors.push(`${publicPath} is missing localized internal link: ${route}`);
      }
      if (html.includes("```") || /!\[[^\]]*\]\([^)]+\)/.test(html)) {
        errors.push(`${publicPath} contains unrendered blog Markdown`);
      }
      const articleBody = html.match(/<div class="docs-article-body">([\s\S]*?)<\/div>\s*<section class="blog-cta"/)?.[1] || "";
      for (const heading of articleBody.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)) {
        if (!heading[3].includes(`class="heading-anchor" href="#${heading[2]}"`)) {
          errors.push(`${publicPath} has a blog heading without an anchor link: #${heading[2]}`);
        }
      }
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

const blogIDs = new Set();
const configuredBlogRoutes = new Set();
for (const post of blogManifest.posts) {
  if (blogIDs.has(post.id) || configuredBlogRoutes.has(post.route)) {
    errors.push(`Blog manifest contains a duplicate id or route: ${post.id}`);
  }
  blogIDs.add(post.id);
  configuredBlogRoutes.add(post.route);
  const englishFile = path.join(blogSourceRoot, post.source);
  let english = "";
  try {
    english = await readFile(englishFile, "utf8");
  } catch {
    errors.push(`Missing English blog source: ${post.source}`);
    continue;
  }
  for (const locale of localeCodes) {
    if (!blogManifest.index[locale] || !post.locales?.[locale]) {
      errors.push(`Blog manifest is incomplete for ${locale}:${post.id}`);
      continue;
    }
    const localizedFile = locale === "en"
      ? englishFile
      : path.join(blogSourceRoot, "locales", locale, post.source);
    try {
      const localized = await readFile(localizedFile, "utf8");
      const englishStructure = markdownStructure(english);
      const localizedStructure = markdownStructure(localized);
      for (const key of Object.keys(englishStructure)) {
        if (englishStructure[key] !== localizedStructure[key]) {
          errors.push(`${locale}/${post.source} has different blog ${key} structure from English`);
        }
      }
      if (JSON.stringify(fencedBlocks(english)) !== JSON.stringify(fencedBlocks(localized))) {
        errors.push(`${locale}/${post.source} changes a fenced blog code block`);
      }
      if (locale !== "en" && localized === english) {
        errors.push(`${locale}/${post.source} silently falls back to English`);
      }
      if (/ZXQ(?:TERM|LINK|CODE)/i.test(localized)) {
        errors.push(`${locale}/${post.source} contains an unresolved translation placeholder`);
      }
      for (const image of post.requiredMarkdownImages || []) {
        if (!localized.includes(`/assets/home/${locale}/${image}`)) {
          errors.push(`${locale}/${post.source} does not reference its required localized SourceShelf image: ${image}`);
        }
      }
      for (const asset of [...(post.articleGraphics || []), ...(post.articleScreenshots || [])]) {
        const format = asset.format || "webp";
        if (!localized.includes(`/assets/blog/${locale}/${asset.id}.${format}`)) {
          errors.push(`${locale}/${post.source} does not reference localized blog image: ${asset.id}`);
        }
      }
      if (english.includes("{{benefit-cards}}") !== localized.includes("{{benefit-cards}}")) {
        errors.push(`${locale}/${post.source} changes the blog benefit-card component directive`);
      }
    } catch {
      errors.push(`${locale}/${post.source} is missing from the localized blog source`);
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

function contentShape(value) {
  if (Array.isArray(value)) return value.map(contentShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, contentShape(value[key])]));
  }
  return typeof value;
}

function collectPublicStrings(value, pathParts = []) {
  const preservedKeys = new Set(["id", "route", "campaignKey", "layout", "kind", "image", "previewImage", "page", "related", "code"]);
  if (Array.isArray(value)) return value.flatMap((item, index) => collectPublicStrings(item, [...pathParts, index]));
  if (value && typeof value === "object") {
    return Object.keys(value).sort().flatMap((key) => (
      preservedKeys.has(key) ? [] : collectPublicStrings(value[key], [...pathParts, key])
    ));
  }
  return typeof value === "string" ? [{path: pathParts.join("."), value}] : [];
}

const englishLandingContent = landingContent.get("en");
const englishLandingShape = JSON.stringify(contentShape(englishLandingContent.pages));
const englishPublicStrings = new Map(collectPublicStrings(englishLandingContent).map((entry) => [entry.path, entry.value]));
const landingPageIds = englishLandingContent.pages.map((page) => page.id).sort();
const configuredVideoIds = Object.keys(productConfig.youtubeVideos || {}).sort();
if (JSON.stringify(configuredVideoIds) !== JSON.stringify(landingPageIds)) {
  errors.push("YouTube video configuration must map every SEO landing page exactly once");
}
const uniqueYouTubeIds = new Set(Object.values(productConfig.youtubeVideos || {}).map((video) => video.id));
if (uniqueYouTubeIds.size !== landingPageIds.length) {
  errors.push("YouTube video configuration contains a duplicate video ID");
}
const blogVideoIds = blogManifest.posts.map((post) => post.youtubeVideo?.id).filter(Boolean);
const exampleVideoIds = examplesContent.pages.map((page) => page.video?.id).filter(Boolean);
const allYouTubeIds = [...uniqueYouTubeIds, ...blogVideoIds, ...exampleVideoIds];
if (new Set(allYouTubeIds).size !== allYouTubeIds.length) {
  errors.push("YouTube video configuration reuses an ID across SEO pages and blog articles");
}
for (const locale of localeCodes) {
  const content = landingContent.get(locale);
  if (content.code !== locale || content.pages.length !== 6) {
    errors.push(`${locale} landing-page source has an incorrect locale code or page count`);
  }
  if (JSON.stringify(contentShape(content.pages)) !== englishLandingShape) {
    errors.push(`${locale} landing-page source does not match the complete English schema`);
  }
  if (locale !== "en") {
    for (const entry of collectPublicStrings(content)) {
      const english = englishPublicStrings.get(entry.path);
      if (english && english.length >= 45 && entry.value === english) {
        errors.push(`${locale} landing-page source silently falls back to English at ${entry.path}`);
      }
    }
  }
}

const exampleTranslationKeys = Object.keys(examplesContent.translations.fr || {}).sort();
for (const locale of localeCodes.slice(1)) {
  const translations = examplesContent.translations[locale] || {};
  if (JSON.stringify(Object.keys(translations).sort()) !== JSON.stringify(exampleTranslationKeys)) {
    errors.push(`${locale} example translations do not mirror the complete example string set`);
  }
  for (const [english, localized] of Object.entries(translations)) {
    if (!localized?.trim()) errors.push(`${locale} example translation is empty: ${english}`);
    if (english.length >= 45 && localized === english) {
      errors.push(`${locale} example translation silently falls back to English: ${english}`);
    }
  }
}
for (const page of examplesContent.pages) {
  const english = page.locales.en;
  const englishShape = JSON.stringify(contentShape(english));
  for (const locale of localeCodes) {
    const content = page.locales[locale];
    if (!content || JSON.stringify(contentShape(content)) !== englishShape) {
      errors.push(`${locale} example-page source does not match the English schema for ${page.id}`);
      continue;
    }
    if (locale !== "en") {
      for (const entry of collectPublicStrings(content)) {
        const englishValue = collectPublicStrings(english).find((candidate) => candidate.path === entry.path)?.value;
        if (englishValue?.length >= 45 && entry.value === englishValue) {
          errors.push(`${locale} example-page source silently falls back to English at ${page.id}.${entry.path}`);
        }
      }
    }
  }
}

for (const [locale, badge] of Object.entries(productConfig.appStore.badges)) {
  try {
    const svg = await readFile(path.join(siteRoot, badge.path.slice(1)), "utf8");
    if (!svg.includes("<svg") || !svg.includes(`height="${badge.height}"`)) {
      errors.push(`${locale} App Store badge is not the expected official SVG asset`);
    }
  } catch {
    errors.push(`Missing localized App Store badge for ${locale}`);
  }
}

for (const file of ["SEO_MEDIA_CAPTURE_PLAN.md", "SEO_TRANSLATION_REVIEW.md"]) {
  try {
    await access(path.join(siteRoot, "docs", file));
  } catch {
    errors.push(`Missing generated SEO documentation file: docs/${file}`);
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
  if (homepage.proof.length !== 4 || homepage.capture.items.length !== 3 || homepage.review.items.length !== 3 || homepage.connect.items.length !== 2 || homepage.useCases.items.length !== 6) {
    errors.push(`${locale} homepage content does not match the shared section structure`);
  }
  const lightboxKeys = ["open", "openLabel", "close", "closeLabel", "zoom", "fit", "dialogLabel"];
  if (lightboxKeys.some((key) => !homepage.lightbox?.[key]?.trim())) {
    errors.push(`${locale} homepage content is missing localized screenshot viewer labels`);
  }
  for (const screenshotName of homepageAssetNames) {
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
const expectedHomepageAssetCount = homepageAssetNames.length * localeCodes.length * 3 + localeCodes.length * 2;
if (homepageAssets.length !== expectedHomepageAssetCount) {
  errors.push(`Expected ${expectedHomepageAssetCount} localized homepage assets, found ${homepageAssets.length}`);
}

const blogAssets = allFiles.filter((file) => file.startsWith(path.join(siteRoot, "assets", "blog")));
const expectedBlogAssetsPerLocale = blogManifest.posts.reduce((count, post) => {
  const heroAssets = 2 + (post.heroMobile ? 1 : 0) + (post.heroFormat === "webp" ? 2 : 0);
  const graphicAssets = (post.articleGraphics || []).reduce((total, asset) => (
    total + (asset.format === "svg" ? (asset.mobileWidth ? 2 : 1) : 3)
  ), 0);
  return count + heroAssets + graphicAssets + (post.articleScreenshots?.length || 0) * 2;
}, 0);
const expectedBlogAssetCount = expectedBlogAssetsPerLocale * localeCodes.length;
if (blogAssets.length !== expectedBlogAssetCount) {
  errors.push(`Expected ${expectedBlogAssetCount} localized blog assets, found ${blogAssets.length}`);
}
for (const post of blogManifest.posts) {
  for (const locale of localeCodes) {
    const svgFile = path.join(siteRoot, "assets", "blog", locale, `${post.heroAsset}.svg`);
    const pngFile = path.join(siteRoot, "assets", "blog", locale, `${post.heroAsset}.png`);
    try {
      const svg = await readFile(svgFile, "utf8");
      const png = await readFile(pngFile);
      if (!svg.includes('width="1200"') || !svg.includes('height="630"') || !svg.includes(post.locales[locale].heroAlt.replaceAll("&", "&amp;").replaceAll("'", "&#39;"))) {
        errors.push(`${locale}/${post.heroAsset}.svg is missing localized intrinsic or accessible content`);
      }
      if (png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" || png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
        errors.push(`${locale}/${post.heroAsset}.png is not a 1200x630 PNG`);
      }
      if (post.heroFormat === "webp") {
        await access(path.join(siteRoot, "assets", "blog", locale, `${post.heroAsset}.webp`));
        await access(path.join(siteRoot, "assets", "blog", locale, `${post.heroAsset}-800.webp`));
      }
      if (post.heroMobile) {
        const mobileHero = await readFile(path.join(siteRoot, "assets", "blog", locale, `${post.heroAsset}-mobile.svg`), "utf8");
        if (!mobileHero.includes(`width="${post.heroMobileWidth || 800}"`) || !mobileHero.includes(`height="${post.heroMobileHeight || 940}"`)) {
          errors.push(`${locale}/${post.heroAsset}-mobile.svg has incorrect intrinsic dimensions`);
        }
      }
      for (const asset of post.articleGraphics || []) {
        const graphicSvg = await readFile(path.join(siteRoot, "assets", "blog", locale, `${asset.id}.svg`), "utf8");
        if (!graphicSvg.includes(`width="${asset.width}"`) || !graphicSvg.includes(`height="${asset.height}"`)) {
          errors.push(`${locale}/${asset.id}.svg has incorrect intrinsic dimensions`);
        }
        if (asset.format === "svg") {
          if (asset.mobileWidth) {
            const mobileSvg = await readFile(path.join(siteRoot, "assets", "blog", locale, `${asset.id}-mobile.svg`), "utf8");
            if (!mobileSvg.includes(`width="${asset.mobileWidth}"`) || !mobileSvg.includes(`height="${asset.mobileHeight}"`)) {
              errors.push(`${locale}/${asset.id}-mobile.svg has incorrect intrinsic dimensions`);
            }
          }
        } else {
          await access(path.join(siteRoot, "assets", "blog", locale, `${asset.id}.webp`));
          await access(path.join(siteRoot, "assets", "blog", locale, `${asset.id}-800.webp`));
        }
      }
      for (const asset of post.articleScreenshots || []) {
        await access(path.join(siteRoot, "assets", "blog", locale, `${asset.id}.webp`));
        await access(path.join(siteRoot, "assets", "blog", locale, `${asset.id}-${asset.smallWidth || 960}.webp`));
      }
    } catch {
      errors.push(`Missing localized blog assets for ${locale}:${post.id}`);
    }
  }
}

const sitemap = await readFile(path.join(siteRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = new Set(sitemapUrls);
if (uniqueSitemapUrls.size !== sitemapUrls.length) {
  errors.push("sitemap.xml contains duplicate URL entries");
}
for (const url of sitemapUrls) {
  if (!url.startsWith(`${canonicalOrigin}/`)) {
    errors.push(`sitemap.xml contains a non-canonical or non-HTTPS URL: ${url}`);
    continue;
  }
  const parsed = new URL(url);
  if (parsed.hash || parsed.search || parsed.pathname.endsWith("/index.html")) {
    errors.push(`sitemap.xml contains a fragment, query, or index.html URL: ${url}`);
  }
  if (!expectedCanonicalUrls.has(url)) {
    errors.push(`sitemap.xml contains an unexpected or redirecting URL variant: ${url}`);
  }
}
for (const url of expectedCanonicalUrls) {
  if (!uniqueSitemapUrls.has(url)) errors.push(`sitemap.xml is missing canonical URL: ${url}`);
}
if (sitemapUrls.length !== expectedCanonicalUrls.size || (sitemap.match(/<url>/g) || []).length !== expectedCanonicalUrls.size) {
  errors.push(`Expected ${expectedCanonicalUrls.size} canonical sitemap entries`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files, ${landingRoutes.length * localeCodes.length} localized landing pages, ${blogRoutes.length * localeCodes.length} localized blog articles, ${checkedReferences} local references, ${checkedImages} accessible images, ${expectedHomepageAssetCount} localized homepage assets, and ${navigation.pages.length * (localeCodes.length - 1)} localized guide sources.`);
  console.log(`Canonical URL audit passed: ${htmlFiles.length} self-referencing canonicals, ${sitemapUrls.length} canonical HTTPS sitemap URLs, and 0 internal index.html links.`);
  console.log(`YouTube privacy audit passed: ${(landingRoutes.length + blogVideoIds.length + exampleVideoIds.length) * localeCodes.length} localized click-to-load players, ${allYouTubeIds.length} unique mapped videos, and 0 preloaded YouTube iframes.`);
}
