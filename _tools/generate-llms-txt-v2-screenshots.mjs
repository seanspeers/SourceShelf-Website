import { execFileSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(toolsDirectory, "..");
const appRoot = path.resolve(siteRoot, "../VaultMarkDesktop");
const resourceRoot = path.resolve(siteRoot, "../SourceShelfResources/AppStore/iOS");
const extensionRoot = path.join(appRoot, "VaultMarkExtension", "Resources");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const locales = {
  en: {
    capture: "en-US",
    messages: "en",
    language: "en",
    collection: "Documentation Research Pack",
    titles: [
      "Getting Started", "Architecture Overview", "Importing Content", "Security and Privacy",
      "Metadata Reference", "API Overview", "Export Formats", "Troubleshooting",
      "Deployment Guide", "Accessibility", "Release Notes", "Integration Examples"
    ]
  },
  fr: {
    capture: "fr-CA",
    messages: "fr",
    language: "fr",
    collection: "Pack de recherche documentaire",
    titles: [
      "Bien démarrer", "Vue d’ensemble de l’architecture", "Importer du contenu", "Sécurité et confidentialité",
      "Référence des métadonnées", "Vue d’ensemble de l’API", "Formats d’exportation", "Dépannage",
      "Guide de déploiement", "Accessibilité", "Notes de version", "Exemples d’intégration"
    ]
  },
  "es-419": {
    capture: "es-MX",
    messages: "es_419",
    language: "es",
    collection: "Paquete de investigación documental",
    titles: [
      "Primeros pasos", "Descripción de la arquitectura", "Importación de contenido", "Seguridad y privacidad",
      "Referencia de metadatos", "Descripción de la API", "Formatos de exportación", "Solución de problemas",
      "Guía de implementación", "Accesibilidad", "Notas de la versión", "Ejemplos de integración"
    ]
  },
  "pt-BR": {
    capture: "pt-BR",
    messages: "pt_BR",
    language: "pt-BR",
    collection: "Pacote de pesquisa de documentação",
    titles: [
      "Primeiros passos", "Visão geral da arquitetura", "Importação de conteúdo", "Segurança e privacidade",
      "Referência de metadados", "Visão geral da API", "Formatos de exportação", "Solução de problemas",
      "Guia de implantação", "Acessibilidade", "Notas da versão", "Exemplos de integração"
    ]
  },
  ja: {
    capture: "ja",
    messages: "ja",
    language: "ja",
    collection: "ドキュメント調査パック",
    titles: [
      "はじめに", "アーキテクチャ概要", "コンテンツの読み込み", "セキュリティとプライバシー",
      "メタデータリファレンス", "API概要", "書き出し形式", "トラブルシューティング",
      "デプロイガイド", "アクセシビリティ", "リリースノート", "連携例"
    ]
  }
};

function renderMessage(messages, key, substitutions = []) {
  const entry = messages[key] || { message: key };
  let value = entry.message;
  substitutions.forEach((replacement, index) => {
    value = value.replaceAll(`$${index + 1}`, replacement);
  });
  for (const [placeholder, metadata] of Object.entries(entry.placeholders || {})) {
    const content = metadata.content || "";
    if (!/^\$\d+$/.test(content)) continue;
    const replacement = substitutions[Number(content.slice(1)) - 1];
    if (replacement === undefined) continue;
    value = value.replaceAll(`$${placeholder.toUpperCase()}$`, replacement);
    value = value.replaceAll(`$${placeholder}$`, replacement);
  }
  return value;
}

function optimize(input, output, width = null, crop = null) {
  const argumentsList = ["-quiet", "-q", "90", "-m", "6", "-metadata", "none"];
  if (crop) {
    argumentsList.push("-crop", String(crop.x), String(crop.y), String(crop.width), String(crop.height));
  }
  if (width) argumentsList.push("-resize", String(width), "0");
  argumentsList.push(input, "-o", output);
  execFileSync("cwebp", argumentsList, { stdio: "pipe" });
}

async function renderSourceSelection(locale, configuration, temporaryRoot) {
  const work = path.join(temporaryRoot, locale);
  await mkdir(work, { recursive: true });
  await copyFile(path.join(extensionRoot, "popup.css"), path.join(work, "popup.css"));
  await copyFile(path.join(extensionRoot, "icons", "icon-48.png"), path.join(work, "icon-48.png"));
  await copyFile(path.join(extensionRoot, "icons", "icon-48-dark.png"), path.join(work, "icon-48-dark.png"));

  const messages = JSON.parse(await readFile(
    path.join(extensionRoot, "_locales", configuration.messages, "messages.json"),
    "utf8"
  ));
  let html = await readFile(path.join(extensionRoot, "popup.html"), "utf8");
  for (const script of [
    '<script src="i18n.js" defer></script>',
    '<script src="acquisition.js" defer></script>',
    '<script src="popup.js" defer></script>'
  ]) {
    html = html.replace(script, "");
  }
  html = html.replace("<html>", `<html lang="${configuration.language}">`);
  const values = Object.fromEntries(Object.entries(messages).map(([key, value]) => [key, value.message]));
  const payload = {
    values,
    collection: configuration.collection,
    titles: configuration.titles,
    summary: renderMessage(messages, "llmsResourceSummary", ["12", "12", "0"]),
    available: renderMessage(messages, "available"),
    importSelected: renderMessage(messages, "importSelected"),
    ready: renderMessage(messages, "ready")
  };
  const harness = `<style>
html,body{width:450px;height:700px}.popup-shell{padding:18px;gap:10px}.source-list{max-height:270px}.source-row{padding:7px 9px}.source-row-copy strong{font-size:11px}.source-row-copy small,.permission-state{font-size:9.5px}
</style><script>
const payload=${JSON.stringify(payload)};
function localize(){
  document.querySelectorAll('[data-i18n]').forEach((element)=>{const value=payload.values[element.dataset.i18n];if(value)element.textContent=value});
  for(const [dataName,attribute] of [['data-i18n-aria-label','aria-label'],['data-i18n-title','title'],['data-i18n-placeholder','placeholder']]){
    document.querySelectorAll('['+dataName+']').forEach((element)=>{const value=payload.values[element.getAttribute(dataName)];if(value)element.setAttribute(attribute,value)});
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  localize();
  document.getElementById('recipe-card').hidden=true;
  document.getElementById('open-settings').hidden=true;
  document.getElementById('manage-recipes').hidden=true;
  document.getElementById('quick-capture-panel').hidden=true;
  document.getElementById('highlights-panel').hidden=true;
  document.getElementById('research-panel').hidden=false;
  document.getElementById('quick-capture-tab').classList.remove('selected');
  document.getElementById('quick-capture-tab').setAttribute('aria-selected','false');
  document.getElementById('research-tab').classList.add('selected');
  document.getElementById('research-tab').setAttribute('aria-selected','true');
  document.getElementById('research-actions').hidden=true;
  document.getElementById('research-review').hidden=false;
  document.getElementById('review-title').textContent=payload.collection;
  document.getElementById('review-summary').textContent=payload.summary;
  document.getElementById('new-pack-name').value=payload.collection;
  document.getElementById('start-research').textContent=payload.importSelected;
  document.getElementById('status').textContent=payload.ready;
  const selected=new Set([0,1,3,5,8,10]);
  const list=document.getElementById('source-list');
  payload.titles.forEach((titleValue,index)=>{
    const row=document.createElement('label');row.className='source-row';
    const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=selected.has(index);
    const copy=document.createElement('span');copy.className='source-row-copy';
    const title=document.createElement('strong');title.textContent=titleValue;
    const detail=document.createElement('small');detail.textContent='docs.example.com';copy.append(title,detail);
    const status=document.createElement('span');status.className='permission-state';status.textContent=payload.available;
    row.append(checkbox,copy,status);list.append(row);
  });
});
</script>`;
  html = html.replace("</body>", `${harness}</body>`);
  const htmlFile = path.join(work, "source-selection.html");
  const pngFile = path.join(work, "source-selection.png");
  await writeFile(htmlFile, html);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-dark-mode",
    "--force-device-scale-factor=2", "--window-size=450,700",
    `--screenshot=${pngFile}`, `file://${htmlFile}`
  ], { stdio: "pipe" });
  return pngFile;
}

async function main() {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "sourceshelf-llms-v2-"));
  try {
    for (const [locale, configuration] of Object.entries(locales)) {
      const destination = path.join(siteRoot, "_blog", "assets", locale);
      await mkdir(destination, { recursive: true });
      const captureRoot = path.join(resourceRoot, "captures", configuration.capture, "iPad");
      const selection = await renderSourceSelection(locale, configuration, temporaryRoot);
      // The App Store Safari capture contains local demo browser chrome above the
      // real webpage and extension panel. Crop that setup context out of blog media.
      const safariContentCrop = { x: 176, y: 264, width: 2520, height: 1800 };
      const assets = [
        [path.join(captureRoot, "llms-import.png"), "llms-txt-v2-safari-discovery", 1440, 960, safariContentCrop],
        [selection, "llms-txt-v2-source-selection", null, 600, null],
        [path.join(captureRoot, "organize-search.png"), "llms-txt-v2-sourceshelf-pack", 1440, 960, null]
      ];
      for (const [source, name, largeWidth, smallWidth, crop] of assets) {
        optimize(source, path.join(destination, `${name}-1440.webp`), largeWidth, crop);
        optimize(source, path.join(destination, `${name}-${smallWidth}.webp`), smallWidth, crop);
      }
      console.log(`${locale}: generated authentic SourceShelf screenshot assets`);
    }
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

await main();
