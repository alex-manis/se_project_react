import "./Footer.css";
import { useContext } from "react";
import ThemeContext from "../../utils/contexts/ThemeContext";

function Footer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright"> 2025 Developed by Alex Manis</p>
        <button
          className={`theme-switch ${
            theme === "dark" ? "theme-switch--dark" : ""
          }`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="theme-switch__icon sun">☀️</span>
          <span className="theme-switch__icon moon">🌙</span>
          <span className="theme-switch__handle"></span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
