import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const outputRoot = path.join(siteRoot, "assets", "app-store-badges");
const badgeLocales = {
  en: "en-us",
  fr: "fr-ca",
  "es-419": "es-mx",
  "pt-BR": "pt-br",
  ja: "ja-jp"
};

await mkdir(outputRoot, { recursive: true });

for (const [siteLocale, appleLocale] of Object.entries(badgeLocales)) {
  const url = `https://tools.applemediaservices.com/api/badges/download-on-the-mac-app-store/black/${appleLocale}?size=250x83`;
  const response = await fetch(url);
  if (!response.ok || !response.headers.get("content-type")?.includes("image/svg+xml")) {
    throw new Error(`Could not download the official ${appleLocale} Mac App Store badge.`);
  }
  const svg = await response.text();
  if (!svg.includes("<svg") || !svg.includes("viewBox=") || !svg.includes("height=\"40\"")) {
    throw new Error(`The ${appleLocale} Mac App Store badge did not match Apple's expected SVG format.`);
  }
  await writeFile(path.join(outputRoot, `${siteLocale}.svg`), svg);
}

console.log(`Downloaded ${Object.keys(badgeLocales).length} official localized Mac App Store badges.`);
