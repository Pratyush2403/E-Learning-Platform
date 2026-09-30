import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // index.js sets the starting theme before the first render
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("lh_theme", theme);
    } catch {
      /* storage unavailable, ignore */
    }
  }, [theme]);

  return (
    <button
      className="icon-btn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}