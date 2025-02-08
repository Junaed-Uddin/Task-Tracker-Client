import { useEffect, useState } from 'react';
import { createContext } from "react";

export const DarkModeProvider = createContext();

const DarkModeContext = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const themeProvider = {
        theme,
        setTheme,
        toggleTheme
    }

    return (
        <DarkModeProvider.Provider value={themeProvider}>
            {children}
        </DarkModeProvider.Provider>
    );
};

export default DarkModeContext;