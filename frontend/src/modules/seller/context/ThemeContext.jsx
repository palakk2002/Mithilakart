/**
 * Theme Context
 * Manages light/dark mode for the seller module.
 * Scoped to .seller-module wrapper — does not affect other modules.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('seller_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('seller_theme', theme);
    // Apply theme class to the seller module wrapper
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('seller-dark');
    } else {
      root.classList.remove('seller-dark');
    }
    return () => root.classList.remove('seller-dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
