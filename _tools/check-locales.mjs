import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const source = await readFile(path.resolve(toolsDirectory, "../locale.js"), "utf8");

function runtime({ languages = ["en-US"], stored = null, storageThrows = false, pathname = "/", search = "", hash = "", withDocument = false } = {}) {
  const storage = new Map();
  const documentListeners = new Map();
  const selectorListeners = new Map();
  const selector = {
    value: "en",
    attributes: new Map(),
    addEventListener(type, listener) {
      selectorListeners.set(type, listener);
    },
    getAttribute(name) {
      return this.attributes.get(name) || null;
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    }
  };
  const document = withDocument ? {
    readyState: "loading",
    addEventListener(type, listener) {
      documentListeners.set(type, listener);
    },
    querySelectorAll(selectorText) {
      return selectorText === "[data-locale-select]" ? [selector] : [];
    }
  } : undefined;
  if (stored) storage.set("sourceshelf-locale", stored);
  const location = {
    pathname,
    search,
    hash,
    href: `${pathname}${search}${hash}`,
    replaced: null,
    replace(value) {
      this.replaced = value;
    }
  };
  const localStorage = {
    getItem(key) {
      if (storageThrows) throw new Error("Storage is unavailable");
      return storage.get(key) || null;
    },
    setItem(key, value) {
      if (storageThrows) throw new Error("Storage is unavailable");
      storage.set(key, value);
    }
  };
  const sandbox = {
    Intl,
    console,
    document,
    globalThis: null,
    localStorage,
    location,
    navigator: { languages, language: languages[0] },
    window: null
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.runInNewContext(source, sandbox, { filename: "locale.js" });
  return {
    api: sandbox.SourceShelfLocale,
    location,
    selector,
    storage,
    fireDomReady() {
      if (!document) return;
      document.readyState = "complete";
      documentListeners.get("DOMContentLoaded")?.();
    },
    selectLocale(locale) {
      selector.value = locale;
      selectorListeners.get("change")?.({ currentTarget: selector });
    }
  };
}

const { api } = runtime();
assert.equal(api.matchLocale("fr-CA"), "fr");
assert.equal(api.matchLocale("es-MX"), "es-419");
assert.equal(api.matchLocale("es-419"), "es-419");
assert.equal(api.matchLocale("pt-BR"), "pt-BR");
assert.equal(api.matchLocale("ja-JP"), "ja");
assert.equal(api.matchLocale("es-ES"), null);
assert.equal(api.matchLocale("pt-PT"), null);
assert.equal(api.matchLocale("de-DE"), null);
assert.equal(api.preferredLocale(["de-DE", "fr-CA"]), "fr");
assert.equal(api.preferredLocale(["es-ES", "pt-PT"]), "en");

assert.equal(api.localizedPath("/docs/getting-started/", "fr"), "/fr/docs/getting-started/");
assert.equal(api.localizedPath("/pt-BR/privacy.html", "ja"), "/ja/privacy.html");
assert.equal(api.localizedPath("/es-419/docs/", "en"), "/docs/");

const detected = runtime({
  languages: ["de-DE", "es-MX"],
  pathname: "/docs/getting-started/",
  search: "?source=test",
  hash: "#first-pack"
});
detected.api.bootstrap("en");
assert.equal(detected.location.replaced, "/es-419/docs/getting-started/?source=test#first-pack");
assert.equal(detected.storage.get("sourceshelf-locale"), "es-419");

const saved = runtime({ languages: ["en-US"], stored: "ja", pathname: "/support.html" });
saved.api.bootstrap("en");
assert.equal(saved.location.replaced, "/ja/support.html");

const explicit = runtime({ languages: ["ja-JP"], pathname: "/fr/docs/" });
explicit.api.bootstrap("fr");
assert.equal(explicit.location.replaced, null);

const unavailableStorage = runtime({ languages: ["fr-FR"], storageThrows: true, pathname: "/privacy.html" });
unavailableStorage.api.bootstrap("en");
assert.equal(unavailableStorage.location.replaced, "/fr/privacy.html");

const manual = runtime({ stored: "pt-BR", pathname: "/pt-BR/docs/", search: "?a=1", hash: "#top" });
manual.api.navigate("en");
assert.equal(manual.location.href, "/docs/?a=1#top");
assert.equal(manual.storage.get("sourceshelf-locale"), "en");

const interactive = runtime({
  stored: "en",
  pathname: "/docs/reference/settings/",
  search: "?from=selector",
  hash: "#language",
  withDocument: true
});
interactive.fireDomReady();
assert.equal(interactive.selector.getAttribute("data-locale-bound"), "true");
interactive.selectLocale("fr");
assert.equal(interactive.location.href, "/fr/docs/reference/settings/?from=selector#language");
assert.equal(interactive.storage.get("sourceshelf-locale"), "fr");

console.log("Checked locale matching, fallback, persistence, selector binding, explicit routes, and path preservation.");
