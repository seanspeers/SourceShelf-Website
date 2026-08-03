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
  for (const logicalRoute of ["/", "/privacy.html", "/support.html", "/blog/", ...blogRoutes, ...landingRoutes, ...navigation.pages.map((page) => page.route)]) {
    const route = localizedRoute(locale, logicalRoute);
    expectedPages.set(route, {
      locale,
      logicalRoute,
      isDocs: logicalRoute.startsWith("/docs/"),
      isLanding: landingRoutes.includes(logicalRoute),
      isBlogIndex: logicalRoute === "/blog/",
      isBlogArticle: blogRoutes.includes(logicalRoute)
    });
  }
}

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
  const { locale, logicalRoute, isDocs, isLanding, isBlogIndex, isBlogArticle } = expected;

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
  if ((html.match(/class="footer-use-cases"/g) || []).length !== 1) {
    errors.push(`${publicPath} must contain one grouped use-case footer`);
  }
  const footerUseCases = html.match(/<nav class="footer-use-cases"[\s\S]*?<\/nav>/)?.[0] || "";
  if ((footerUseCases.match(/<a href=/g) || []).length !== 6) {
    errors.push(`${publicPath} must link all six use cases from its grouped footer`);
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
      errors.push(`${publicPath} is missing its reserved demonstration and visible transcript`);
    }
    if (html.includes("<video") || html.includes("VideoObject") || html.includes(page.demo.video) || html.includes(page.demo.poster) || html.includes(page.demo.captions)) {
      errors.push(`${publicPath} references unavailable video media or VideoObject data`);
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
    if (software.length !== 1 || breadcrumbs.length !== 1) {
      errors.push(`${publicPath} must contain one SoftwareApplication and one BreadcrumbList object`);
    }
    if (jsonLD.some((value) => ["FAQPage", "VideoObject"].includes(value["@type"]))) {
      errors.push(`${publicPath} contains unsupported FAQ or video structured data`);
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
      const postings = jsonLD.filter((value) => value["@type"] === "BlogPosting");
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
      if (!html.includes(`class="blog-verified">${content.verifiedLabel}`)) {
        errors.push(`${publicPath} is missing its localized verification date`);
      }
      if ((html.match(/loading="eager"/g) || []).length !== 1 || (html.match(/fetchpriority="high"/g) || []).length !== 1) {
        errors.push(`${publicPath} must prioritize only the blog hero image`);
      }
      const hero = html.match(/<img\b[^>]*\bsrc="\/assets\/blog\/[^>]+>/)?.[0] || "";
      if (!hero.includes(`src="/assets/blog/${locale}/${post.heroAsset}.svg"`) || !/\balt="[^"]+"/.test(hero) || !hero.includes('width="1200"') || !hero.includes('height="630"')) {
        errors.push(`${publicPath} has incomplete localized hero image markup`);
      }
      const productImage = html.match(/<img\b[^>]*\bsrc="\/assets\/home\/[^>]+08-export-workflows-1440\.webp[^>]*>/)?.[0] || "";
      if (!productImage.includes(`/assets/home/${locale}/`) || !/\balt="[^"]+"/.test(productImage) || !productImage.includes("srcset=")) {
        errors.push(`${publicPath} has incomplete localized SourceShelf workflow imagery`);
      }
      const badge = productConfig.appStore.badges[locale];
      if (!html.includes(`class="app-store-badge-link" href="${productConfig.appStore.default}"`) || !html.includes(`src="${badge.path}"`)) {
        errors.push(`${publicPath} does not use the configured localized App Store CTA`);
      }
      for (const url of [
        "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md",
        "https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt",
        "https://help.openai.com/en/articles/8555545-uploading-images-and-files-in-chatgpt",
        "https://help.openai.com/en/articles/8983675-what-types-of-files-are-supported"
      ]) {
        if (!html.includes(`href="${url}"`)) errors.push(`${publicPath} is missing official source link: ${url}`);
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
      if (!localized.includes(`/assets/home/${locale}/08-export-workflows-1440.webp`)) {
        errors.push(`${locale}/${post.source} does not reference its localized SourceShelf workflow image`);
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
  const preservedKeys = new Set(["id", "route", "campaignKey", "layout", "kind", "image", "previewImage", "video", "poster", "captions", "page", "related", "code"]);
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

const blogAssets = allFiles.filter((file) => file.startsWith(path.join(siteRoot, "assets", "blog")));
if (blogAssets.length !== blogManifest.posts.length * localeCodes.length * 2) {
  errors.push(`Expected ${blogManifest.posts.length * localeCodes.length * 2} localized blog assets, found ${blogAssets.length}`);
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
    } catch {
      errors.push(`Missing localized blog hero assets for ${locale}:${post.id}`);
    }
  }
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
  console.log(`Checked ${htmlFiles.length} HTML files, ${landingRoutes.length * localeCodes.length} localized landing pages, ${blogRoutes.length * localeCodes.length} localized blog articles, ${checkedReferences} local references, ${checkedImages} accessible images, 140 localized homepage assets, and ${navigation.pages.length * (localeCodes.length - 1)} localized guide sources.`);
}
