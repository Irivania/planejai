import { createContext } from 'react';

type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
