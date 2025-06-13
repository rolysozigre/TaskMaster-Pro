import { createContext, useContext, useState} from 'react';
import  type{ReactNode } from 'react';

type Theme = 'mui' | 'shadcn';
type ColorMode = 'normal' | 'gray' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}>({
  theme: 'mui',
  setTheme: () => {},
  colorMode: 'normal',
  setColorMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('mui');
  const [colorMode, setColorMode] = useState<ColorMode>('normal');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
