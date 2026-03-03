import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || 'auto';
  });

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = theme === 'auto' ? systemTheme : theme;
    document.documentElement.setAttribute("data-theme", activeTheme);
    if (activeTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}