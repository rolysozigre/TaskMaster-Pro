// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type UIType = 'mui' | 'shadcn';
type ModeType = 'light' | 'dark';

interface ThemeContextType {
  ui: UIType;
  mode: ModeType;
  setUi: (ui: UIType) => void;
  setMode: (mode: ModeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [ui, setUi] = useState<UIType>('mui');
  const [mode, setMode] = useState<ModeType>('light');

  // Optionnel : persistance locale
  useEffect(() => {
    const savedUi = localStorage.getItem('ui') as UIType;
    const savedMode = localStorage.getItem('mode') as ModeType;
    if (savedUi) setUi(savedUi);
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('ui', ui);
    localStorage.setItem('mode', mode);
  }, [ui, mode]);

  useEffect(() => {
    const root = document.documentElement;
  
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);
  

  return (
    <ThemeContext.Provider value={{ ui, mode, setUi, setMode }}>
      <div className={mode === 'dark' ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
