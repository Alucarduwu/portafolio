import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
    const { t, theme, setTheme, lang, setLang } = useContext(GlobalContext);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setScrollProgress(percent);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { path: '/', label: t('nav_home') || 'KERNEL', icon: 'home' },
        { path: '/about', label: t('nav_about') || 'BIO', icon: 'person' },
        { path: '/experience', label: t('nav_exp') || 'LOGS', icon: 'history' },
        { path: '/projects', label: t('nav_projects') || 'CORE', icon: 'terminal' },
        { path: '/certificates', label: t('nav_certs') || 'HASH', icon: 'workspace_premium' },
        { path: '/contact', label: t('nav_contact') || 'IO', icon: 'alternate_email' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6">
            <div 
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-150 ease-out z-[101]" 
                style={{ width: `${scrollProgress}%` }}
            />
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-2xl px-4 md:px-6 py-2.5 shadow-[var(--shadow)] transition-all duration-700 hover:border-[var(--primary)]/30">
                <div className="flex items-center gap-2.5 md:gap-4">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden w-8 h-8 flex items-center justify-center text-[var(--text-main)] hover:text-[var(--primary)] transition-all bg-[var(--bg-ui)]/30 rounded-lg active:scale-90"
                    >
                        <span className="material-symbols-outlined text-xl">{mobileMenuOpen ? 'close' : 'menu_open'}</span>
                    </button>

                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center p-[1px] group-hover:rotate-[360deg] transition-all duration-1000 shadow-lg shadow-[var(--primary)]/20">
                            <div className="w-full h-full bg-[var(--bg-card)] rounded-[11px] flex items-center justify-center">
                                <span className="text-[var(--primary)] font-black text-[10px]">A</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col leading-none">
                            <span className="font-ex-bold text-[9px] tracking-widest text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors uppercase italic font-black">ANAHÍ BETZABE</span>
                            <span className="text-[7px] font-mono text-[var(--text-muted)] tracking-widest mt-0.5 opacity-60 uppercase">SYSTEM_OS_v6.4</span>
                        </div>
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 p-1.5 bg-[var(--bg-ui)]/40 rounded-xl border border-[var(--border)]/20">
                    {navLinks.map(link => (
                        <Link 
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                                location.pathname === link.path 
                                ? 'bg-[var(--primary)] text-white shadow-lg' 
                                : 'text-[var(--text-soft)] hover:text-[var(--text-main)] hover:bg-[var(--bg-ui)]'
                            }`}
                        >
                           <span className="material-symbols-outlined text-xs">{link.icon}</span>
                           {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2.5 md:gap-4 lg:pl-4 lg:border-l lg:border-[var(--border)]/60">
                    <button 
                        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                        className="h-8 px-3 rounded-lg border border-[var(--border)] text-[8px] md:text-[9px] font-black text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all uppercase tracking-[0.2em] bg-[var(--bg-ui)]/30 backdrop-blur"
                    >
                        {lang.toUpperCase()}
                    </button>
                    <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-8 h-8 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all flex items-center justify-center bg-[var(--bg-ui)]/30 backdrop-blur shadow-inner transform active:scale-95 overflow-hidden group/theme"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                           <span className={`material-symbols-outlined text-[14px] absolute transition-all duration-500 transform group-hover/theme:rotate-12 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180 translate-y-10'}`}>
                             light_mode
                           </span>
                           <span className={`material-symbols-outlined text-[14px] absolute transition-all duration-500 transform group-hover/theme:-rotate-12 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180 -translate-y-10'}`}>
                             dark_mode
                           </span>
                        </div>
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <>
                    <div className="lg:hidden fixed inset-0 z-[98] bg-[var(--bg-main)]/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="lg:hidden fixed inset-y-0 left-0 z-[99] w-[85%] max-w-[320px] bg-[var(--bg-card)]/95 backdrop-blur-3xl border-r border-[var(--primary)]/30 shadow-[20px_0_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-left duration-500 flex flex-col ring-1 ring-[var(--primary)]/20">
                        <div className="scanline opacity-10"></div>
                        
                        <div className="p-6 flex items-center justify-between border-b border-[var(--border)]/60 bg-[var(--bg-ui)]/40">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[var(--primary)] tracking-[0.3em] font-mono italic uppercase"><span>{t('sys_root_menu')}</span></span>
                                <span className="text-[7px] text-[var(--text-muted)] font-mono tracking-widest opacity-60"><span>{t('sys_status')}</span></span>
                            </div>
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] active:scale-90 transition-transform"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-2.5 custom-scrollbar">
                            <div className="mb-4 px-1">
                                <span className="text-[7px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] opacity-40"><span>{t('sys_select_node')}</span></span>
                            </div>
                            {navLinks.map((link, idx) => (
                                <Link 
                                    key={link.path}
                                    to={link.path}
                                    className={`group p-4 rounded-2xl flex items-center justify-between border transition-all duration-500 transform active:scale-95 ${
                                        location.pathname === link.path 
                                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)] shadow-[0_0_20px_rgba(192,132,252,0.1)]' 
                                        : 'bg-[var(--bg-ui)]/40 border-[var(--border)] text-[var(--text-soft)] hover:border-[var(--primary)]/40'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 ${location.pathname === link.path ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-ui)] border border-[var(--border)]'}`}>
                                            <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black uppercase tracking-[0.25em] italic leading-none">{link.label}</span>
                                            <span className="text-[7px] font-mono opacity-40 uppercase tracking-widest mt-1.5">{location.pathname === link.path ? 'ACTIVE_SESSION' : `0x${idx}${idx}`}</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">keyboard_double_arrow_right</span>
                                </Link>
                            ))}
                        </div>

                        <div className="p-6 bg-[var(--bg-ui)]/40 border-t border-[var(--border)] mt-auto flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black text-[var(--primary)] tracking-[0.3em] font-mono bg-[var(--primary)]/5 p-3 rounded-xl border border-[var(--primary)]/20 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-xs">language</span> {lang.toUpperCase()}
                                </button>
                                <div className="w-4"></div>
                                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex-1 flex items-center justify-center gap-2 text-[9px] font-black text-[var(--primary)] tracking-[0.3em] font-mono bg-[var(--primary)]/5 p-3 rounded-xl border border-[var(--primary)]/20 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-xs">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span> {theme.toUpperCase()}
                                </button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-1.5">
                                <span className="font-mono text-[6px] text-green-500/60 tracking-widest uppercase"><span>{t('sys_encryption')}</span></span>
                                <span className="font-mono text-[7px] text-[var(--text-muted)] tracking-widest opacity-30 uppercase">ANAHI_LOZANO_v6.4</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
