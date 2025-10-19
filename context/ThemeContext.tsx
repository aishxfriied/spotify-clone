'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/types';

const lightTheme: Theme = {
  colors: {
    primary: '#1db954',
    secondary: '#1ed760',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#000000',
    textSecondary: '#666666',
    accent: '#1db954',
    error: '#e22134',
    success: '#1db954',
    warning: '#ffa500',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#1db954',
    secondary: '#1ed760',
    background: '#121212',
    surface: '#181818',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    accent: '#1db954',
    error: '#e22134',
    success: '#1db954',
    warning: '#ffa500',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Update CSS custom properties
      const root = document.documentElement;
      const theme = isDark ? darkTheme : lightTheme;
      
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
      
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--border-radius-${key}`, value);
      });
      
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
      });
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
