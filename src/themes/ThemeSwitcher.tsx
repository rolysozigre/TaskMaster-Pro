// src/themes/ThemeSwitcher.tsx
import { useTheme } from "../context/ThemeContext";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as "mui" | "shadcn")}
      className="border px-2 py-1 rounded"
    >
      <option value="mui">Material UI</option>
      <option value="shadcn">ShadCN</option>
    </select>
  );
};
