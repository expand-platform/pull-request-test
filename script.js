(function () {
  const STORAGE_KEY = "pr-test-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (toggle) {
      const isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      toggle.title = isDark ? "Light mode" : "Dark mode";
    }
  }

  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  applyTheme(root.getAttribute("data-theme") || getPreferredTheme());

  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (event) => {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
      applyTheme(event.matches ? "light" : "dark");
    });
})();