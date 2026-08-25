(function () {
  var storageKey = "sourceshelf-theme";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var year = document.querySelector("[data-current-year]");
  var analyticsMeasurementId = "G-D15DHBQH6F";
  var analyticsConsentStorageKey = "sourceshelf-analytics-consent-v1";
  var analyticsDisableKey = "ga-disable-" + analyticsMeasurementId;
  var analyticsBanner = document.querySelector("[data-analytics-consent-banner]");
  var analyticsAccept = document.querySelector("[data-analytics-consent-accept]");
  var analyticsDecline = document.querySelector("[data-analytics-consent-decline]");
  var analyticsSettings = document.querySelectorAll("[data-analytics-consent-settings]");
  var analyticsInitialized = false;
  var activeAnalyticsSettings = null;

  function getStoredAnalyticsConsent() {
    try {
      var value = window.localStorage.getItem(analyticsConsentStorageKey);
      return value === "granted" || value === "denied" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredAnalyticsConsent(value) {
    try {
      window.localStorage.setItem(analyticsConsentStorageKey, value);
    } catch (error) {
      // The choice still applies to the current page if storage is unavailable.
    }
  }

  function analyticsConsentState(analyticsStorage) {
    return {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: analyticsStorage
    };
  }

  function ensureGoogleTagQueue() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
  }

  function enableAnalytics() {
    window[analyticsDisableKey] = false;
    ensureGoogleTagQueue();

    if (!analyticsInitialized) {
      window.gtag("consent", "default", analyticsConsentState("denied"));
      window.gtag("set", "ads_data_redaction", true);
    }

    window.gtag("consent", "update", analyticsConsentState("granted"));

    if (!analyticsInitialized) {
      window.gtag("js", new Date());
      window.gtag("config", analyticsMeasurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });

      var googleTag = document.createElement("script");
      googleTag.async = true;
      googleTag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(analyticsMeasurementId);
      googleTag.setAttribute("data-sourceshelf-analytics", "");
      document.head.appendChild(googleTag);
      analyticsInitialized = true;
    }
  }

  function clearAnalyticsCookies() {
    var hostname = window.location.hostname;
    var hostnameParts = hostname.split(".");
    var baseDomain = hostnameParts.length > 1 ? hostnameParts.slice(-2).join(".") : hostname;
    var domains = ["", hostname, "." + hostname, baseDomain, "." + baseDomain];
    var cookieNames = document.cookie.split(";").map(function (cookie) {
      return cookie.split("=")[0].trim();
    }).filter(function (name) {
      return name === "_ga" || name.indexOf("_ga_") === 0 || name === "_gid" || name === "_gat";
    });

    cookieNames.forEach(function (name) {
      domains.forEach(function (domain) {
        var expiredCookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
        if (domain) expiredCookie += "; domain=" + domain;
        document.cookie = expiredCookie;
      });
    });
  }

  function disableAnalytics() {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", analyticsConsentState("denied"));
    }
    window[analyticsDisableKey] = true;
    clearAnalyticsCookies();
  }

  function showAnalyticsChoices(moveFocus) {
    if (!analyticsBanner) return;
    analyticsBanner.hidden = false;
    if (moveFocus && analyticsDecline) analyticsDecline.focus();
  }

  function hideAnalyticsChoices() {
    if (!analyticsBanner) return;
    analyticsBanner.hidden = true;
    if (activeAnalyticsSettings) {
      activeAnalyticsSettings.focus();
      activeAnalyticsSettings = null;
    }
  }

  var currentAnalyticsConsent = getStoredAnalyticsConsent();
  if (currentAnalyticsConsent === "granted") {
    enableAnalytics();
  } else if (currentAnalyticsConsent === "denied") {
    disableAnalytics();
  } else {
    showAnalyticsChoices(false);
  }

  Array.prototype.forEach.call(analyticsSettings, function (button) {
    button.addEventListener("click", function () {
      activeAnalyticsSettings = button;
      showAnalyticsChoices(true);
    });
  });

  if (analyticsAccept) {
    analyticsAccept.addEventListener("click", function () {
      var shouldEnable = currentAnalyticsConsent !== "granted" || window[analyticsDisableKey] === true;
      currentAnalyticsConsent = "granted";
      setStoredAnalyticsConsent(currentAnalyticsConsent);
      if (shouldEnable) enableAnalytics();
      hideAnalyticsChoices();
    });
  }

  if (analyticsDecline) {
    analyticsDecline.addEventListener("click", function () {
      currentAnalyticsConsent = "denied";
      setStoredAnalyticsConsent(currentAnalyticsConsent);
      disableAnalytics();
      hideAnalyticsChoices();
    });
  }

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Theme still changes for the current page if storage is unavailable.
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    var resolvedTheme = theme === "light" || theme === "dark" ? theme : getSystemTheme();
    root.setAttribute("data-theme", resolvedTheme);

    if (toggle) {
      toggle.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        resolvedTheme === "dark"
          ? toggle.getAttribute("data-light-label") || "Switch to light mode"
          : toggle.getAttribute("data-dark-label") || "Switch to dark mode"
      );
    }
  }

  applyTheme(getStoredTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      setStoredTheme(nextTheme);
    });
  }

  if (!getStoredTheme()) {
    var colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    var handleColorSchemeChange = function () {
      applyTheme(null);
    };
    if (colorScheme.addEventListener) {
      colorScheme.addEventListener("change", handleColorSchemeChange);
    } else if (colorScheme.addListener) {
      colorScheme.addListener(handleColorSchemeChange);
    }
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var lightbox = document.querySelector("[data-home-lightbox]");
  var lightboxImage = document.querySelector("[data-home-lightbox-image]");
  var lightboxCaption = document.querySelector("[data-home-lightbox-caption]");
  var lightboxViewport = document.querySelector("[data-home-lightbox-viewport]");
  var lightboxClose = document.querySelector("[data-home-lightbox-close]");
  var lightboxZoom = document.querySelector("[data-home-lightbox-zoom]");
  var lightboxTriggers = document.querySelectorAll("[data-home-screenshot-trigger]");
  var activeLightboxTrigger = null;
  var lightboxScrollPosition = 0;

  function setLightboxZoom(zoomed) {
    if (!lightbox || !lightboxZoom || !lightboxViewport) return;
    lightbox.classList.toggle("is-zoomed", zoomed);
    lightboxZoom.setAttribute("aria-pressed", zoomed ? "true" : "false");
    lightboxZoom.textContent = zoomed
      ? lightboxZoom.getAttribute("data-fit-label")
      : lightboxZoom.getAttribute("data-zoom-label");
    if (zoomed) {
      window.requestAnimationFrame(function () {
        lightboxViewport.scrollLeft = Math.max((lightboxViewport.scrollWidth - lightboxViewport.clientWidth) / 2, 0);
        lightboxViewport.scrollTop = Math.max((lightboxViewport.scrollHeight - lightboxViewport.clientHeight) / 2, 0);
      });
    } else {
      lightboxViewport.scrollLeft = 0;
      lightboxViewport.scrollTop = 0;
    }
  }

  function closeLightbox() {
    if (lightbox && lightbox.open) lightbox.close();
  }

  if (
    lightbox &&
    lightboxImage &&
    lightboxCaption &&
    lightboxViewport &&
    lightboxClose &&
    lightboxZoom &&
    typeof lightbox.showModal === "function"
  ) {
    Array.prototype.forEach.call(lightboxTriggers, function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        activeLightboxTrigger = trigger;
        lightboxScrollPosition = window.scrollY;
        setLightboxZoom(false);
        lightboxImage.src = trigger.href;
        lightboxImage.alt = trigger.getAttribute("data-lightbox-alt") || "";
        var imageWidth = parseInt(trigger.getAttribute("data-lightbox-width") || "2880", 10);
        var imageHeight = parseInt(trigger.getAttribute("data-lightbox-height") || "1800", 10);
        lightboxImage.width = imageWidth;
        lightboxImage.height = imageHeight;
        lightbox.style.setProperty("--lightbox-image-width", imageWidth + "px");
        lightbox.style.setProperty("--lightbox-image-height", imageHeight + "px");
        lightboxCaption.textContent = trigger.getAttribute("data-lightbox-caption") || "";
        document.body.classList.add("home-lightbox-open");
        lightbox.showModal();
        lightboxClose.focus({ preventScroll: true });
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxZoom.addEventListener("click", function () {
      setLightboxZoom(!lightbox.classList.contains("is-zoomed"));
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target === lightboxViewport) closeLightbox();
    });

    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
    });

    lightbox.addEventListener("close", function () {
      setLightboxZoom(false);
      document.body.classList.remove("home-lightbox-open");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightbox.style.removeProperty("--lightbox-image-width");
      lightbox.style.removeProperty("--lightbox-image-height");
      lightboxCaption.textContent = "";
      window.scrollTo(0, lightboxScrollPosition);
      if (activeLightboxTrigger) {
        try {
          activeLightboxTrigger.focus({ preventScroll: true });
        } catch (error) {
          activeLightboxTrigger.focus();
        }
      }
      activeLightboxTrigger = null;
    });
  }

  var youtubePlayers = document.querySelectorAll("[data-youtube-player]");
  Array.prototype.forEach.call(youtubePlayers, function (player) {
    var frame = player.querySelector("[data-youtube-frame]");
    var loadButton = player.querySelector("[data-youtube-load]");
    if (!frame || !loadButton) return;

    loadButton.addEventListener("click", function () {
      var embedUrl = loadButton.getAttribute("data-youtube-embed") || "";
      if (!/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(embedUrl)) return;

      var iframe = document.createElement("iframe");
      iframe.src = embedUrl + "?autoplay=1&rel=0";
      iframe.title = loadButton.getAttribute("data-youtube-title") || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.setAttribute("allowfullscreen", "");
      frame.replaceChildren(iframe);
      player.classList.add("is-loaded");
    });
  });

})();
