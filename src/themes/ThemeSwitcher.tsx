import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeSwitcher.css";
import { FaSun, FaMoon, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

export const ThemeSwitcher = () => {
  const { ui, setUi, mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant fixé à droite */}
      <button
        className="theme-toggle-btn-fixed"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer le thème"
      >
        <i className="bi bi-gear"></i>
      </button>

      {/* Drawer latéral */}
      <div className={`theme-panel-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Réglages</h3>
          <button onClick={() => setIsOpen(false)} className="close-btn">✖</button>
        </div>

        <div className="drawer-content">
          <h4>Interface</h4>
          <div className="d-flex bloc-buttton">
          <button
            onClick={() => setUi('mui')}
            className={`theme-btn ${ui === 'mui' ? 'active' : ''}`}
          >
            <FaReact /> Material UI
          </button>
          <button
            onClick={() => setUi('shadcn')}
            className={`theme-btn ${ui === 'shadcn' ? 'active' : ''}`}
          >
            <SiTailwindcss /> ShadCN
          </button>
          </div>
          <h4>Thème</h4>
          <div className="d-flex bloc-buttton">
          <button
            onClick={() => setMode('light')}
            className={`theme-btn ${mode === 'light' ? 'active' : ''}`}
          >
            <FaSun /> Clair
          </button>
          <button
            onClick={() => setMode('dark')}
            className={`theme-btn ${mode === 'dark' ? 'active' : ''}`}
          >
            <FaMoon /> Sombre
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
