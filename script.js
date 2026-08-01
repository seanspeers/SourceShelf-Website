(function () {
  var storageKey = "sourceshelf-theme";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var year = document.querySelector("[data-current-year]");

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

})();
