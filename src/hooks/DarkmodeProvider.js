'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('theme-mode', mode);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
  }, [mode, isMounted]);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    mode,
  }), [mode]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'dark' ? '#90caf9' : '#1976d2',
        },
        secondary: {
          main: mode === 'dark' ? '#f48fb1' : '#dc004e',
        },
        background: {
          default: mode === 'dark' ? '#07061c' : '#ffffff',
          paper: mode === 'dark' ? '#121212' : '#f5f5f5',
        },
      },
      typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      },
    }), [mode]);

  if (!isMounted) return null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within CustomThemeProvider');
  }
  return context;
};
