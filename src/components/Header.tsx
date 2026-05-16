import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
    const { t, theme, setTheme, lang, setLang, perspective, setPerspective } = useContext(GlobalContext);
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
        { path: '/', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Presentación' : 'Overview') : (t('nav_home') || 'KERNEL')}</span>, icon: 'home' },
        { path: '/about', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Perfil' : 'Profile') : (t('nav_about') || 'BIO')}</span>, icon: 'person' },
        { path: '/experience', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Trayectoria' : 'Trajectory') : (t('nav_exp') || 'LOGS')}</span>, icon: 'history' },
        { path: '/projects', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Soluciones' : 'Solutions') : (t('nav_projects') || 'CORE')}</span>, icon: 'terminal' },
        { path: '/certificates', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Certificados' : 'Credentials') : (t('nav_certs') || 'HASH')}</span>, icon: 'workspace_premium' },
        { path: '/contact', label: <span translate="no" className="notranslate">{perspective === 'rh' ? (lang === 'es' ? 'Consultoría' : 'Consultancy') : (t('nav_contact') || 'IO')}</span>, icon: 'alternate_email' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6">
            <div 
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-150 ease-out z-[101] ${perspective === 'rh' ? 'bg-[#C5A059]' : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]'}`} 
                style={{ width: `${scrollProgress}%` }}
            />
            <nav className={`max-w-[1200px] mx-auto flex items-center justify-between ${perspective === 'rh' ? 'bg-[#0b0c0e]/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/5 rounded-2xl' : 'bg-[var(--bg-card)]/80 border-[var(--border)] rounded-none'} backdrop-blur-xl border px-4 md:px-6 py-2.5 shadow-[var(--shadow)] transition-all duration-700 hover:border-[#C5A059]/30 notranslate`} translate="no">
                <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden w-10 h-10 flex items-center justify-center transition-all active:scale-90 ${perspective === 'rh' ? 'text-[#C5A059] bg-white/5 border border-white/5 rounded-xl' : 'text-[var(--text-main)] bg-[var(--bg-ui)]/30 border border-[var(--border)] rounded-none'}`}
                    >
                        <span className="material-symbols-outlined text-xl">{mobileMenuOpen ? 'close' : 'menu_open'}</span>
                    </button>

                    <Link to="/" className="flex items-center gap-4 group shrink-0">
                        <div className={`w-10 h-10 transition-all duration-1000 shadow-xl flex items-center justify-center p-[1px] ${perspective === 'rh' ? 'bg-gradient-to-br from-[#C5A059] to-[#8a6e3d] shadow-[#C5A059]/10 rounded-2xl' : 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-[var(--primary)]/20 rounded-none'}`}>
                            <div className={`w-full h-full flex items-center justify-center ${perspective === 'rh' ? 'bg-[#0b0c0e] rounded-[15px]' : 'bg-[var(--bg-card)] rounded-none'}`}>
                                <span className={`${perspective === 'rh' ? 'text-[#C5A059]' : 'text-[var(--primary)]'} font-black text-[10px]`}>A</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col leading-none shrink-0 notranslate" translate="no">
                            <span className={`font-serif text-[11px] tracking-widest transition-colors uppercase italic ${perspective === 'rh' ? 'text-white group-hover:text-[#C5A059]' : 'text-[var(--text-main)] group-hover:text-[var(--primary)]'}`} style={perspective === 'rh' ? { fontFamily: "'Playfair Display', serif" } : {}}><span>ANAHÍ BETZABE</span></span>
                            {perspective === 'dev' ? (
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[6px] font-mono text-[var(--text-muted)] tracking-widest opacity-60 uppercase"><span>SYSTEM_OS_v6.4</span></span>
                                    <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[6px] font-mono text-green-500/60 uppercase tracking-tighter">CPU: {(Math.random() * 5 + 10).toFixed(1)}%</span>
                                </div>
                            ) : (
                                <span className="text-[7px] font-black text-[#C5A059] tracking-[0.4em] uppercase mt-1.5 opacity-60 italic">Engineering Excellence</span>
                            )}
                        </div>
                    </Link>
                </div>

                <div className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border overflow-hidden shrink mx-4 ${perspective === 'rh' ? 'gap-1 p-1 bg-white/[0.02] border-white/10' : 'gap-2 p-1.5 bg-[var(--bg-ui)]/40 border-[var(--border)]/20'}`}>
                    {navLinks.map(link => (
                        <Link 
                            key={link.path}
                            to={link.path}
                            className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap ${
                                perspective === 'rh' ? 'rounded-xl' : 'rounded-xl'
                            } ${
                                location.pathname === link.path 
                                ? (perspective === 'rh' ? 'bg-[#C5A059] text-black shadow-lg shadow-[#C5A059]/20 font-bold' : 'bg-[var(--primary)] text-white shadow-lg')
                                : (perspective === 'rh' ? 'text-gray-400 hover:text-[#C5A059] hover:bg-white/5' : 'text-[var(--text-soft)] hover:text-[var(--text-main)] hover:bg-[var(--bg-ui)]/50')
                            }`}
                        >
                            {perspective === 'dev' && <span className="material-symbols-outlined text-[16px]">{link.icon}</span>}
                            {link.label}
                        </Link>
                    ))}
                    {perspective === 'dev' && (
                        <button 
                            onClick={() => setPerspective(null)}
                            className="ml-2 px-4 py-2.5 rounded-none text-[8px] font-black uppercase tracking-widest border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-ui)] transition-all"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3 md:gap-4 lg:pl-6 lg:border-l lg:border-white/5 shrink-0">
                    <button 
                        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                        className={`h-9 px-4 border text-[9px] md:text-[10px] font-black transition-all uppercase tracking-[0.3em] backdrop-blur ${perspective === 'rh' ? 'border-white/5 text-gray-400 hover:text-[#C5A059] hover:border-[#C5A059]/40 bg-white/[0.02] rounded-xl' : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] bg-[var(--bg-ui)]/30 rounded-none'}`}
                    >
                        {lang.toUpperCase()}
                    </button>
                    
                    {perspective === 'rh' && (
                        <button 
                            onClick={() => setPerspective(null)}
                            className={`w-9 h-9 rounded-xl border transition-all flex items-center justify-center backdrop-blur transform active:scale-95 group/perspective ${perspective === 'rh' ? 'border-white/10 text-gray-500 hover:border-[#C5A059]/40 hover:text-[#C5A059] bg-white/[0.02]' : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] bg-[var(--bg-ui)]/30'}`}
                            title={lang === 'es' ? 'Cambiar Perfil' : 'Change Profile'}
                        >
                            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                        </button>
                    )}

                    {perspective === 'dev' && (
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-9 h-9 rounded-none border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all flex items-center justify-center bg-[var(--bg-ui)]/30 backdrop-blur shadow-inner transform active:scale-95 overflow-hidden group/theme"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                               <span className={`material-symbols-outlined text-[16px] absolute transition-all duration-500 transform group-hover/theme:rotate-12 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180 translate-y-10'}`}>
                                 light_mode
                               </span>
                               <span className={`material-symbols-outlined text-[16px] absolute transition-all duration-500 transform group-hover/theme:-rotate-12 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180 -translate-y-10'}`}>
                                 dark_mode
                               </span>
                            </div>
                        </button>
                    )}
                </div>
            </nav>

            {mobileMenuOpen && (
                <>
                    <div className="lg:hidden fixed inset-0 z-[98] bg-[#0b0c0e]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className={`lg:hidden fixed inset-y-0 left-0 z-[99] w-[85%] max-w-[320px] backdrop-blur-3xl border-r shadow-2xl animate-in slide-in-from-left duration-500 flex flex-col notranslate ${perspective === 'rh' ? 'bg-[#0b0c0e]/98 border-white/5 rounded-r-[2.5rem]' : 'bg-[var(--bg-card)]/95 border-[var(--primary)]/30 rounded-none'}`} translate="no">
                        
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
                            <div className="flex flex-col gap-1 min-w-0 overflow-hidden">
                                <span className={`font-serif italic text-white tracking-widest uppercase truncate block ${perspective === 'rh' ? 'text-base md:text-lg' : 'text-[10px] font-mono'}`} style={perspective === 'rh' ? { fontFamily: "'Playfair Display', serif" } : {}}><span>{perspective === 'rh' ? 'Anahí Lozano' : 'ROOT@ANAHI_HQ: ~#'}</span></span>
                                <span className={`text-[7px] md:text-[8px] font-black tracking-[0.2em] uppercase opacity-60 truncate block ${perspective === 'rh' ? 'text-[#C5A059]' : 'text-[var(--primary)]'}`}><span>{perspective === 'rh' ? 'Engineering Executive' : 'SYS_STATUS: READY'}</span></span>
                            </div>
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-10 h-10 shrink-0 flex items-center justify-center active:scale-90 transition-transform ${perspective === 'rh' ? 'rounded-xl bg-white/5 text-[#C5A059]' : 'rounded-none bg-[var(--primary)]/10 text-[var(--primary)]'}`}
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                            {navLinks.map((link, idx) => (
                                <Link 
                                    key={link.path}
                                    to={link.path}
                                    className={`group p-5 flex items-center justify-between border transition-all duration-500 transform active:scale-95 overflow-hidden ${
                                        perspective === 'rh' ? 'rounded-[2rem]' : 'rounded-none'
                                    } ${
                                        location.pathname === link.path 
                                        ? (perspective === 'rh' ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-lg shadow-[#C5A059]/10' : 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)] shadow-[0_0_20px_rgba(192,132,252,0.1)]') 
                                        : (perspective === 'rh' ? 'bg-white/[0.02] border-white/5 text-gray-400' : 'bg-[var(--bg-ui)]/40 border-[var(--border)] text-[var(--text-soft)]')
                                    }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center transition-transform group-hover:rotate-12 ${perspective === 'rh' ? 'rounded-2xl' : 'rounded-xl shadow-lg'} ${location.pathname === link.path ? (perspective === 'rh' ? 'bg-black/10' : 'bg-[var(--primary)] text-white') : 'bg-white/5 border border-white/5'}`}>
                                            <span className="material-symbols-outlined text-[20px] md:text-[24px]">{link.icon}</span>
                                        </div>
                                        <div className="flex flex-col min-w-0 pr-2 notranslate" translate="no">
                                            <span className={`font-serif italic leading-none block whitespace-normal ${perspective === 'rh' ? 'text-base' : 'text-[10px] font-black uppercase tracking-[0.2em]'}`} style={perspective === 'rh' ? { fontFamily: "'Playfair Display', serif" } : {}}><span>{link.label}</span></span>
                                            <span className="text-[7px] md:text-[8px] font-black opacity-40 uppercase tracking-[0.2em] mt-1.5 block">{perspective === 'rh' ? `${String(idx+1).padStart(2,'0')} ·` : `0x${idx}${idx}`}</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">keyboard_double_arrow_right</span>
                                </Link>
                            ))}
                        </div>

                        <div className={`p-6 md:p-8 border-t mt-auto flex flex-col gap-4 md:gap-6 ${perspective === 'rh' ? 'bg-white/[0.01] border-white/5' : 'bg-[var(--bg-ui)]/40 border-[var(--border)]'}`}>
                            <div className="flex items-center justify-between gap-4">
                                <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className={`flex-1 flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.3em] p-4 border active:scale-95 transition-all ${perspective === 'rh' ? 'bg-white/5 border-white/5 text-[#C5A059] rounded-2xl' : 'bg-[var(--primary)]/5 border-[var(--primary)]/20 text-[var(--primary)] rounded-none'}`}>
                                    <span className="material-symbols-outlined text-xs">language</span> {lang.toUpperCase()}
                                </button>
                                <button onClick={() => setPerspective(null)} className={`flex-1 flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.3em] p-4 border active:scale-95 transition-all ${perspective === 'rh' ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-lg shadow-[#C5A059]/10 rounded-2xl' : 'bg-[var(--primary)] text-white shadow-lg rounded-none'}`}>
                                    RESET
                                </button>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-2 notranslate italic" translate="no">
                                <span className={`text-[7px] tracking-[0.4em] uppercase opacity-40 font-serif ${perspective === 'rh' ? 'text-[#C5A059]' : 'text-[var(--text-muted)]'}`}><span>{perspective === 'rh' ? 'Institutional Excellence' : t('sys_encryption')}</span></span>
                                <span className="text-[8px] text-gray-600 tracking-widest uppercase font-black"><span>ANAHI_LOZANO_v6.4</span></span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
