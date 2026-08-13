import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const localeRoot = path.resolve(toolsDirectory, "../_docs/locales");

const titles = {
  fr: {
    "README.md": "Guide de l’utilisateur SourceShelf",
    "getting-started.md": "Commencer avec SourceShelf",
    "guides/safari-capture.md": "Capturer depuis Safari",
    "guides/convert-files.md": "Convertir des fichiers et des dossiers",
    "guides/library-and-inspector.md": "Bibliothèque et inspecteur",
    "guides/storage-management.md": "Gérer le stockage SourceShelf",
    "guides/build-and-manage-packs.md": "Créer et gérer des packs",
    "guides/export-formats.md": "Choisir un format d’exportation",
    "guides/trust-safety-and-refresh.md": "Confiance et sécurité et packs évolutifs",
    "guides/llms-txt.md": "Importer et exporter llms.txt",
    "ios/getting-started.md": "Premiers pas sur iPhone et iPad",
    "ios/safari-capture.md": "Capturer avec Safari sur iPhone et iPad",
    "ios/import-and-read.md": "Importer et lire des documents sur iPhone et iPad",
    "ios/packs-and-portability.md": "Créer, exporter et déplacer des packs sur iPhone et iPad",
    "ios/settings-and-privacy.md": "Réglages et confidentialité sur iPhone et iPad",
    "mcp/local-ai-access.md": "Accès local à l’IA (MCP)",
    "mcp/lm-studio.md": "Utiliser SourceShelf avec LM Studio",
    "mcp/ollama.md": "Utiliser SourceShelf avec Ollama",
    "mcp/codex.md": "Utiliser SourceShelf avec Codex",
    "mcp/claude-code.md": "Utiliser SourceShelf avec Claude Code",
    "mcp/opencode.md": "Utiliser SourceShelf avec OpenCode",
    "mcp/troubleshooting.md": "Dépannage MCP",
    "reference/settings.md": "Référence des réglages",
    "reference/supported-formats.md": "Formats pris en charge",
    "reference/privacy-and-security.md": "Confidentialité et sécurité",
    "reference/glossary.md": "Glossaire"
  },
  "es-419": {
    "README.md": "Guía del usuario de SourceShelf",
    "getting-started.md": "Comenzar con SourceShelf",
    "guides/safari-capture.md": "Capturar desde Safari",
    "guides/convert-files.md": "Convertir archivos y carpetas",
    "guides/library-and-inspector.md": "Biblioteca e inspector",
    "guides/storage-management.md": "Administrar el almacenamiento de SourceShelf",
    "guides/build-and-manage-packs.md": "Crear y administrar paquetes",
    "guides/export-formats.md": "Elegir un formato de exportación",
    "guides/trust-safety-and-refresh.md": "Confianza y seguridad y paquetes en evolución",
    "guides/llms-txt.md": "Importar y exportar llms.txt",
    "ios/getting-started.md": "Primeros pasos en iPhone y iPad",
    "ios/safari-capture.md": "Capturar desde Safari en iPhone y iPad",
    "ios/import-and-read.md": "Importar y leer documentos en iPhone y iPad",
    "ios/packs-and-portability.md": "Crear, exportar y mover paquetes en iPhone y iPad",
    "ios/settings-and-privacy.md": "Configuración y privacidad en iPhone y iPad",
    "mcp/local-ai-access.md": "Acceso local a IA (MCP)",
    "mcp/lm-studio.md": "Usar SourceShelf con LM Studio",
    "mcp/ollama.md": "Usar SourceShelf con Ollama",
    "mcp/codex.md": "Usar SourceShelf con Codex",
    "mcp/claude-code.md": "Usar SourceShelf con Claude Code",
    "mcp/opencode.md": "Usar SourceShelf con OpenCode",
    "mcp/troubleshooting.md": "Solución de problemas de MCP",
    "reference/settings.md": "Referencia de configuración",
    "reference/supported-formats.md": "Formatos compatibles",
    "reference/privacy-and-security.md": "Privacidad y seguridad",
    "reference/glossary.md": "Glosario"
  },
  "pt-BR": {
    "README.md": "Guia do usuário do SourceShelf",
    "getting-started.md": "Começar a usar o SourceShelf",
    "guides/safari-capture.md": "Capturar no Safari",
    "guides/convert-files.md": "Converter arquivos e pastas",
    "guides/library-and-inspector.md": "Biblioteca e inspetor",
    "guides/storage-management.md": "Gerenciar o armazenamento do SourceShelf",
    "guides/build-and-manage-packs.md": "Criar e gerenciar pacotes",
    "guides/export-formats.md": "Escolher um formato de exportação",
    "guides/trust-safety-and-refresh.md": "Confiança e segurança e pacotes em evolução",
    "guides/llms-txt.md": "Importar e exportar llms.txt",
    "ios/getting-started.md": "Primeiros passos no iPhone e iPad",
    "ios/safari-capture.md": "Capture pelo Safari no iPhone e iPad",
    "ios/import-and-read.md": "Importe e leia documentos no iPhone e iPad",
    "ios/packs-and-portability.md": "Crie, exporte e mova pacotes no iPhone e iPad",
    "ios/settings-and-privacy.md": "Ajustes e privacidade no iPhone e iPad",
    "mcp/local-ai-access.md": "Acesso local à IA (MCP)",
    "mcp/lm-studio.md": "Usar o SourceShelf com o LM Studio",
    "mcp/ollama.md": "Usar o SourceShelf com o Ollama",
    "mcp/codex.md": "Usar o SourceShelf com o Codex",
    "mcp/claude-code.md": "Usar o SourceShelf com o Claude Code",
    "mcp/opencode.md": "Usar o SourceShelf com o OpenCode",
    "mcp/troubleshooting.md": "Solução de problemas do MCP",
    "reference/settings.md": "Referência de ajustes",
    "reference/supported-formats.md": "Formatos compatíveis",
    "reference/privacy-and-security.md": "Privacidade e segurança",
    "reference/glossary.md": "Glossário"
  },
  ja: {
    "README.md": "SourceShelfユーザーガイド",
    "getting-started.md": "SourceShelfを使い始める",
    "guides/safari-capture.md": "Safariからキャプチャ",
    "guides/convert-files.md": "ファイルとフォルダを変換",
    "guides/library-and-inspector.md": "ライブラリとインスペクタ",
    "guides/storage-management.md": "SourceShelfのストレージを管理",
    "guides/build-and-manage-packs.md": "パックを作成・管理",
    "guides/export-formats.md": "書き出し形式を選択",
    "guides/trust-safety-and-refresh.md": "信頼性と安全性、継続運用パック",
    "guides/llms-txt.md": "llms.txtのインポートとエクスポート",
    "ios/getting-started.md": "iPhoneとiPadで使い始める",
    "ios/safari-capture.md": "iPhoneとiPadのSafariからキャプチャする",
    "ios/import-and-read.md": "iPhoneとiPadで文書を読み込んで閲覧する",
    "ios/packs-and-portability.md": "iPhoneとiPadでパックを作成、書き出し、移動する",
    "ios/settings-and-privacy.md": "iPhoneとiPadの設定とプライバシー",
    "mcp/local-ai-access.md": "ローカルAIアクセス（MCP）",
    "mcp/lm-studio.md": "SourceShelfをLM Studioで使う",
    "mcp/ollama.md": "SourceShelfをOllamaで使う",
    "mcp/codex.md": "SourceShelfをCodexで使う",
    "mcp/claude-code.md": "SourceShelfをClaude Codeで使う",
    "mcp/opencode.md": "SourceShelfをOpenCodeで使う",
    "mcp/troubleshooting.md": "MCPのトラブルシューティング",
    "reference/settings.md": "設定リファレンス",
    "reference/supported-formats.md": "対応形式",
    "reference/privacy-and-security.md": "プライバシーとセキュリティ",
    "reference/glossary.md": "用語集"
  }
};

const replacements = {
  fr: [
    [/\bPaquets\b/g, "Packs"],
    [/\bpaquets\b/g, "packs"],
    [/\bPaquet\b/g, "Pack"],
    [/\bpaquet\b/g, "pack"]
  ],
  "es-419": [],
  "pt-BR": [],
  ja: [
    [/図書館/g, "ライブラリ"],
    [/検査官/g, "インスペクタ"],
    [/生活パック/g, "継続運用パック"],
    [/信頼と安全/g, "信頼性と安全性"],
    [/リフレッシュ＆比較/g, "更新して比較"],
    [/スナップ写真/g, "スナップショット"],
    [/オーダーされた/g, "順序付けされた"],
    [/注文/g, "順序"],
    [/輸入/g, "インポート"],
    [/輸出/g, "エクスポート"]
  ]
};

for (const [locale, pages] of Object.entries(titles)) {
  for (const [relativePath, title] of Object.entries(pages)) {
    const file = path.join(localeRoot, locale, relativePath);
    let source = await readFile(file, "utf8");
    source = source.replace(/^# .+$/m, `# ${title}`);
    for (const [pattern, replacement] of replacements[locale]) {
      source = source.replace(pattern, replacement);
    }
    await writeFile(file, source);
  }
}

console.log("Normalized localized documentation titles and product terminology.");
