import { useContext } from "react";
import { CONTACT_CONFIG } from "../config";
import { GlobalContext } from "../context/GlobalContext";

const Footer = () => {
    const { t, lang, perspective } = useContext(GlobalContext);

    // En la vista profesional, un pie que se lee: nada de «SYSTM_UI» ni «SESIÓN_ACTIVA».
    if (perspective === 'rh') {
        return (
            <footer className="border-t border-white/5 bg-[#08090a] py-10">
                <div className="max-w-[1180px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <p className="text-[#F8F5F0] font-semibold">Anahí Lozano</p>
                        <p className="text-[12px] text-[#7A7872]">{lang === 'es' ? 'Desarrolladora Full Stack · Aguascalientes, México' : 'Full Stack Developer · Aguascalientes, Mexico'}</p>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-6 text-[13px] font-semibold text-[#C8C4BB]">
                        <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-[#C9A84C]">{CONTACT_CONFIG.email}</a>
                        <a href="https://github.com/Alucarduwu" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C]">GitHub</a>
                        <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C]">LinkedIn</a>
                    </nav>
                    <p className="text-[12px] text-[#5A5A54]">© 2026</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--bg-footer)] transition-colors duration-500 backdrop-blur-2xl py-12 md:py-10 overflow-hidden relative selection:bg-[var(--primary)]/20">
            <div className="scanline opacity-[0.03]"></div>
            
            <div className="max-w-[1240px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10 text-center md:text-left transition-all duration-700">
                
                <div className="flex flex-col gap-3">
                    <div className="font-mono font-black text-[9.5px] md:text-[11px] tracking-[0.5em] uppercase text-[var(--accent-secondary)] opacity-80">
                        {t('sys_ver')}
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        <span className="text-[7.5px] md:text-[8.5px] font-mono text-[var(--text-soft)] uppercase tracking-widest font-black opacity-70">
                            TIEMPO_EJECUCIÓN: SESIÓN_ACTIVA
                        </span>
                    </div>
                </div>

                <div className="flex gap-12 md:gap-20 order-3 md:order-2 group">
                    <a href="https://github.com/Alucarduwu" target="_blank" rel="noreferrer" className="text-[9.5px] md:text-[11.5px] font-black uppercase tracking-[0.4em] text-[var(--text-soft)] hover:text-[var(--primary)] transition-all hover:scale-110 active:scale-95 group-hover:tracking-[0.6em]">GITHUB_SRC</a>
                    <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noreferrer" className="text-[9.5px] md:text-[11.5px] font-black uppercase tracking-[0.4em] text-[var(--text-soft)] hover:text-[var(--primary)] transition-all hover:scale-110 active:scale-95 group-hover:tracking-[0.6em]">LINKEDIN_PROF</a>
                </div>

                <div className="flex flex-col items-center md:items-end gap-1.5 order-2 md:order-3">
                    <div className="text-[9.5px] md:text-[11px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)] notranslate" translate="no">
                        © 2026 // <span className="text-[var(--text-main)] font-black italic tracking-tighter hover:text-[var(--primary)] transition-colors cursor-crosshair"><span>ANAHÍ LOZANO</span></span>
                    </div>
                    <div className="flex gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <div className="h-0.5 w-4 bg-[var(--text-muted)]"></div>
                        <div className="h-0.5 w-1.5 bg-[var(--primary)]"></div>
                    </div>
                </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                <div className="absolute top-0 left-10 h-full w-px bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent"></div>
                <div className="absolute top-0 right-40 h-full w-px bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"></div>
            
            <div className="absolute top-0 left-0 p-4 font-mono text-[6px] text-[var(--text-muted)] opacity-20 uppercase tracking-widest hidden lg:block">
                ROOT_DIR: /PORTFOLIO_V6/SYSTEM
            </div>
        </footer>
    );
};

export default Footer;