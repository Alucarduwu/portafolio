import React, { createContext, useState, useEffect } from "react";
import { translations } from "../config";

export const GlobalContext = createContext<any>(null);

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState(() => localStorage.getItem('sh_lang') || 'es');
    const [theme, setTheme] = useState(() => localStorage.getItem('sh_theme') || 'dark');
    const [perspective, setPerspective] = useState<string | null>(() => localStorage.getItem('sh_perspective'));

    useEffect(() => {
        const html = document.documentElement;
        localStorage.setItem('sh_theme', theme);
        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('sh_lang', lang);
    }, [lang]);

    useEffect(() => {
        if (perspective) {
            localStorage.setItem('sh_perspective', perspective);
            // RH perspective forces light theme for the "Executive" look
            if (perspective === 'rh' && theme === 'dark') {
                setTheme('light');
            }
        } else {
            localStorage.removeItem('sh_perspective');
            // When resetting (null perspective), default back to dark theme
            if (theme === 'light') {
                setTheme('dark');
            }
        }
    }, [perspective]); // Only trigger on perspective change

    const t = (key: string) => (translations as any)[lang][key] || key;

    return (
        <GlobalContext.Provider value={{ lang, setLang, theme, setTheme, t, perspective, setPerspective }}>
            {children}
        </GlobalContext.Provider>
    );
};
