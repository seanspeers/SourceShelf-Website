(function (global) {
  "use strict";

  var storageKey = "sourceshelf-locale";
  var localeCodes = ["en", "fr", "es-419", "pt-BR", "ja"];
  var latinAmericanSpanishRegions = {
    "419": true,
    AR: true,
    BO: true,
    CL: true,
    CO: true,
    CR: true,
    CU: true,
    DO: true,
    EC: true,
    GT: true,
    HN: true,
    MX: true,
    NI: true,
    PA: true,
    PE: true,
    PR: true,
    PY: true,
    SV: true,
    UY: true,
    VE: true
  };

  function localeParts(tag) {
    if (typeof tag !== "string" || !tag.trim()) return null;
    try {
      if (typeof Intl !== "undefined" && Intl.Locale) {
        var parsed = new Intl.Locale(tag);
        return {
          language: parsed.language.toLowerCase(),
          region: parsed.region ? parsed.region.toUpperCase() : ""
        };
      }
    } catch (error) {}

    var pieces = tag.replace(/_/g, "-").split("-");
    var language = (pieces[0] || "").toLowerCase();
    var region = "";
    for (var index = 1; index < pieces.length; index += 1) {
      if (/^[A-Za-z]{2}$/.test(pieces[index]) || /^\d{3}$/.test(pieces[index])) {
        region = pieces[index].toUpperCase();
        break;
      }
    }
    return language ? { language: language, region: region } : null;
  }

  function matchLocale(tag) {
    var parts = localeParts(tag);
    if (!parts) return null;
    if (parts.language === "en") return "en";
    if (parts.language === "fr") return "fr";
    if (parts.language === "ja") return "ja";
    if (parts.language === "pt" && parts.region === "BR") return "pt-BR";
    if (parts.language === "es" && latinAmericanSpanishRegions[parts.region]) return "es-419";
    return null;
  }

  function preferredLocale(languages) {
    var preferences = Array.isArray(languages) ? languages : [];
    for (var index = 0; index < preferences.length; index += 1) {
      var matched = matchLocale(preferences[index]);
      if (matched) return matched;
    }
    return "en";
  }

  function storedLocale() {
    try {
      var value = global.localStorage && global.localStorage.getItem(storageKey);
      return localeCodes.indexOf(value) === -1 ? null : value;
    } catch (error) {
      return null;
    }
  }

  function storeLocale(locale) {
    if (localeCodes.indexOf(locale) === -1) return;
    try {
      if (global.localStorage) global.localStorage.setItem(storageKey, locale);
    } catch (error) {}
  }

  function basePath(pathname) {
    var path = pathname || "/";
    for (var index = 1; index < localeCodes.length; index += 1) {
      var prefix = "/" + localeCodes[index];
      if (path === prefix) return "/";
      if (path.indexOf(prefix + "/") === 0) return path.slice(prefix.length) || "/";
    }
    return path;
  }

  function localizedPath(pathname, locale) {
    var path = basePath(pathname);
    if (path.charAt(0) !== "/") path = "/" + path;
    if (locale === "en") return path;
    return "/" + locale + (path === "/" ? "/" : path);
  }

  function navigate(locale) {
    if (localeCodes.indexOf(locale) === -1 || !global.location) return;
    storeLocale(locale);
    var target = localizedPath(global.location.pathname, locale)
      + (global.location.search || "")
      + (global.location.hash || "");
    global.location.href = target;
  }

  function bindSelectors() {
    if (!global.document) return;
    var selectors = global.document.querySelectorAll("[data-locale-select]");
    for (var index = 0; index < selectors.length; index += 1) {
      var selector = selectors[index];
      if (selector.getAttribute("data-locale-bound") === "true") continue;
      selector.setAttribute("data-locale-bound", "true");
      selector.addEventListener("change", function (event) {
        navigate(event.currentTarget.value);
      });
    }
  }

  function bootstrap(currentLocale) {
    if (currentLocale !== "en" || !global.location) return;
    var resolved = storedLocale();
    if (!resolved) {
      var languages = global.navigator && global.navigator.languages
        ? Array.prototype.slice.call(global.navigator.languages)
        : [global.navigator && global.navigator.language].filter(Boolean);
      resolved = preferredLocale(languages);
      storeLocale(resolved);
    }
    if (resolved === "en") return;
    var target = localizedPath(global.location.pathname, resolved)
      + (global.location.search || "")
      + (global.location.hash || "");
    if (target !== global.location.pathname + (global.location.search || "") + (global.location.hash || "")) {
      global.location.replace(target);
    }
  }

  global.SourceShelfLocale = {
    basePath: basePath,
    bindSelectors: bindSelectors,
    bootstrap: bootstrap,
    localizedPath: localizedPath,
    matchLocale: matchLocale,
    navigate: navigate,
    preferredLocale: preferredLocale,
    storeLocale: storeLocale,
    storageKey: storageKey
  };

  if (global.document) {
    if (global.document.readyState === "loading") {
      global.document.addEventListener("DOMContentLoaded", bindSelectors, { once: true });
    } else {
      bindSelectors();
    }
  }
})(typeof window === "undefined" ? globalThis : window);
