import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextData {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themes = {
    light: {
      'login-background-page': '#5964e0',
      'login-background': '#4953b8',
      'login-text': '#fff',
      'login-background-button-filled': '#4CD62B',
      'home-background-page': '#f2f3f5',
      text: '#666666',
      'text-highlight': '#b3b9ff',
      title: '#2e384d',
      background: '#f2f3f5',
      'background-challenge': '#fff',
      'modal-overlay-background': 'rgba(242, 243, 245, 0.8)',
    },
    dark: {
      'login-background-page': '#0B1529',
      'login-background': '#2E384D',
      'login-text': '#fff',
      'login-background-button-filled': '#4CD62B',
      'home-background-page': '#0B1529',
      text: '#FFFFFF',
      'text-highlight': '#b3b9ff',
      title: '#FFFFFF',
      background: '#0B1529',
      'background-challenge': '#273248',
      'modal-overlay-background': 'rgba(11, 21, 41, 0.7)',
    },
  };

  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    if (typeof window !== 'undefined') {
      const html = document.querySelector('html');

      const themeColors = themes[theme];

      Object.keys(themeColors).forEach(key => {
        html.style.setProperty(`--${key}`, themeColors[key]);
      });

      localStorage.setItem('@moveit/theme', theme);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageTheme = localStorage.getItem('@moveit/theme');
      setTheme(localStorageTheme);
    }
  }, []);

  useEffect(() => {
    toggleTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
