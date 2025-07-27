'use client'
import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                // Dark mode palette
                background: {
                  default: '#07061c',
                  paper: '#07061c',
                },
              }
            : {
                // Light mode palette
                background: {
                  default: '#ffffff',
                  paper: '#f5f5f5',
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);