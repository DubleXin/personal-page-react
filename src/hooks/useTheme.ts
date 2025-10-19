import { useState, useEffect } from "react";

type ThemeType = "light" | "dark";

const cacheKey = `${import.meta.env.VITE_CACHE_API_KEY ?? "app"}_theme`;

export function useTheme(): { theme: ThemeType; toggleTheme: () => void } {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const cachedTheme = localStorage.getItem(cacheKey);
    if (cachedTheme === "light" || cachedTheme === "dark") return cachedTheme;

    const preferredDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return preferredDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(cacheKey, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
}
