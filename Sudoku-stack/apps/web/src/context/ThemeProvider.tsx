import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('sudoku_theme');
        return saved ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        document.body.className = isDark ? 'dark-mode' : 'light-mode';
        localStorage.setItem('sudoku_theme', JSON.stringify(isDark));
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};