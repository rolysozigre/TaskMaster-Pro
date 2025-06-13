import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeSwitcher.css";

export const ThemeSwitcher = () => {
  const { theme, setTheme, colorMode, setColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton collé à droite */}
      <button
        className="theme-toggle-btn-fixed"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer le thème"
        style={{height: '5px', lineHeight: '1px', marginTop: '8rem', borderRadius: '8px'}}
      >
        <i className="bi bi-gear"></i>
      </button>

      {/* Panneau glissant */}
      <div className={`theme-panel-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Réglages</h3>
          <button onClick={() => setIsOpen(false)} className="close-btn">✖</button>
        </div>

        <div className="theme-section">
          <h4>🎨 Couleur</h4>
          <select
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value as any)}
          >
            <option value="normal">Normal</option>
            <option value="gray">Gris</option>
            <option value="dark">Sombre</option>
          </select>
        </div>

        <div className="theme-section mt-3">
          <h4>💡 UI Kit</h4>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
          >
            <option value="mui">Material UI</option>
            <option value="shadcn">ShadCN</option>
          </select>
        </div>
      </div>
    </>
  );
};
