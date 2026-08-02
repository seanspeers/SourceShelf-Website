import { execFileSync } from "node:child_process";
import { readFile, readdir, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const outputRoot = path.join(siteRoot, "assets", "home");
const sourceArgument = process.argv[2];
if (!sourceArgument) {
  throw new Error("Usage: node _tools/sync-homepage-assets.mjs <localized-app-store-folder>");
}
const sourceRoot = path.resolve(sourceArgument);

const localeSources = {
  en: "en-US",
  fr: "fr-CA",
  "es-419": "es-MX",
  "pt-BR": "pt-BR",
  ja: "ja"
};

const screenshotNames = [
  "01-private-ai-source-packs.png",
  "02-local-ai-access.png",
  "03-review-before-sharing.png",
  "04-convert-files-for-ai.png",
  "05-capture-from-safari.png",
  "06-organize-research.png",
  "07-refresh-and-compare.png",
  "08-export-workflows.png",
  "09-private-by-design.png"
];

function readPngDimensions(buffer, fileName) {
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error(`Expected a PNG image: ${fileName}`);
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function requireCommand(command, args) {
  try {
    execFileSync(command, args, { stdio: "ignore" });
  } catch {
    throw new Error(`The ${command} command is required to generate homepage assets.`);
  }
}

requireCommand("cwebp", ["-version"]);
requireCommand("magick", ["-version"]);

await rm(outputRoot, { recursive: true, force: true });

let generatedCount = 0;
for (const [siteLocale, sourceLocale] of Object.entries(localeSources)) {
  const screenshotDirectory = path.join(sourceRoot, sourceLocale, "Screenshots");
  const availableFiles = (await readdir(screenshotDirectory))
    .filter((file) => file.endsWith(".png"))
    .sort();
  if (JSON.stringify(availableFiles) !== JSON.stringify(screenshotNames)) {
    throw new Error(`${sourceLocale} must contain the expected nine homepage screenshots in upload order.`);
  }

  const localeOutput = path.join(outputRoot, siteLocale);
  await mkdir(localeOutput, { recursive: true });

  for (const screenshotName of screenshotNames) {
    const sourceFile = path.join(screenshotDirectory, screenshotName);
    const sourceBuffer = await readFile(sourceFile);
    const dimensions = readPngDimensions(sourceBuffer, screenshotName);
    if (dimensions.width !== 2880 || dimensions.height !== 1800) {
      throw new Error(`${sourceLocale}/${screenshotName} must be 2880 × 1800 pixels.`);
    }

    const baseName = path.basename(screenshotName, ".png");
    const variants = [
      { width: 960, height: 600, quality: "82", preserveTextEdges: false },
      { width: 1440, height: 900, quality: "82", preserveTextEdges: false },
      { width: 2880, height: 1800, quality: "90", preserveTextEdges: true }
    ];
    for (const { width, height, quality, preserveTextEdges } of variants) {
      const outputFile = path.join(localeOutput, `${baseName}-${width}.webp`);
      const qualityArguments = preserveTextEdges ? ["-sharp_yuv"] : [];
      execFileSync(
        "cwebp",
        [
          "-quiet",
          "-q", quality,
          "-m", "6",
          ...qualityArguments,
          "-metadata", "none",
          "-resize", String(width), String(height),
          sourceFile,
          "-o", outputFile
        ],
        { stdio: "pipe" }
      );
      generatedCount += 1;
    }

    if (screenshotName === screenshotNames[0]) {
      execFileSync(
        "magick",
        [
          sourceFile,
          "-resize", "1200x630",
          "-background", "#07172b",
          "-gravity", "center",
          "-extent", "1200x630",
          "-strip",
          "-quality", "88",
          path.join(localeOutput, `${baseName}-social.jpg`)
        ],
        { stdio: "pipe" }
      );
      generatedCount += 1;
    }
  }
}

console.log(`Generated ${generatedCount} localized homepage image variants from ${sourceRoot}.`);
