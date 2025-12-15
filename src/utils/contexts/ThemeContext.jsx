import { createContext, useContext, useState, useEffect } from "react";

// Делаем и default, и named экспорт совместимыми
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default ThemeContext;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Применяем класс темы + сохраняем
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Реакция на смену системной темы
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const systemChange = (e) => {
      const saved = localStorage.getItem("theme");
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mq.addEventListener("change", systemChange);
    return () => mq.removeEventListener("change", systemChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
