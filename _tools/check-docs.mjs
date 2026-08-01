import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const navigation = JSON.parse(
  await readFile(path.join(siteRoot, "_docs", "navigation.json"), "utf8")
);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "_docs" || entry.name === "_tools") continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
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

const allFiles = await walk(siteRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const idCache = new Map();
const errors = [];
const pageTitles = new Map();
let checkedReferences = 0;
let checkedImages = 0;

async function idsFor(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));
  }
  return idCache.get(file);
}

for (const page of navigation.pages) {
  const routeFile = page.route === "/docs/"
    ? path.join(siteRoot, "docs", "index.html")
    : path.join(siteRoot, page.route.slice(1), "index.html");
  try {
    await access(routeFile);
  } catch {
    errors.push(`Missing expected route: ${page.route}`);
  }
}

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const publicPath = path.relative(siteRoot, htmlFile);

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

  if (publicPath.startsWith(`docs${path.sep}`)) {
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

    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    if (!title) {
      errors.push(`${publicPath} is missing a page title`);
    } else if (pageTitles.has(title)) {
      errors.push(`${publicPath} duplicates the title from ${pageTitles.get(title)}`);
    } else {
      pageTitles.set(title, publicPath);
    }

    const route = publicPath === path.join("docs", "index.html")
      ? "/docs/"
      : `/${publicPath.replaceAll(path.sep, "/").replace(/index\.html$/, "")}`;
    const expectedCanonical = `https://sourceshelf.app${route}`;
    if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
      errors.push(`${publicPath} has an incorrect canonical URL`);
    }

    if ((html.match(/<h1\b/g) || []).length !== 1) {
      errors.push(`${publicPath} must contain exactly one level-one heading`);
    }

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

const generatedDocCount = htmlFiles.filter((file) => file.includes(`${path.sep}docs${path.sep}`)).length;
if (generatedDocCount !== navigation.pages.length) {
  errors.push(`Expected ${navigation.pages.length} generated documentation routes, found ${generatedDocCount}`);
}

const generatedImages = allFiles.filter((file) => (
  file.startsWith(path.join(siteRoot, "docs", "assets", "images")) && file.endsWith(".webp")
));
if (generatedImages.length !== 18) {
  errors.push(`Expected 18 optimized documentation images, found ${generatedImages.length}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files, ${checkedReferences} local references, and ${checkedImages} documentation images.`);
}
