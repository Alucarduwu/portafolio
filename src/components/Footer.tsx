import { useContext } from "react";
import { CONTACT_CONFIG } from "../config";
import { GlobalContext } from "../context/GlobalContext";

const Footer = () => {
    const { t } = useContext(GlobalContext);
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--bg-footer)] backdrop-blur-2xl py-8 overflow-hidden relative selection:bg-[var(--primary)]/20">
            <div className="max-w-[1240px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 text-center md:text-left transition-all duration-700">
                
                <div className="flex flex-col gap-2.5">
                    <div className="font-mono font-black text-[9.5px] md:text-[11px] tracking-[0.5em] uppercase text-[var(--text-muted)] light:text-[var(--text-soft)]">
                        {t('sys_ver')}
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <span className="status-dot online"></span>
                        <span className="text-[7px] md:text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-black light:opacity-50"><span>{t('sys_runtime')}</span></span>
                    </div>
                </div>

                <div className="flex gap-12 md:gap-20 order-3 md:order-2 group">
                    <a href="https://github.com/Alucarduwu/portafolio" target="_blank" rel="noreferrer" className="text-[9.5px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-soft)] hover:text-[var(--primary)] transition-all hover:scale-110 active:scale-95 light:hover:text-[var(--accent-secondary)]">GITHUB_SRC</a>
                    <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noreferrer" className="text-[9.5px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-soft)] hover:text-[var(--primary)] transition-all hover:scale-110 active:scale-95 light:hover:text-[var(--accent-secondary)]">LINKEDIN_PROF</a>
                </div>

                <div className="text-[9.5px] md:text-[11px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)] order-2 md:order-3 light:text-[var(--text-soft)] notranslate" translate="no">
                    © 2026 // <span className="text-[var(--text-main)] font-black italic tracking-tighter opacity-80"><span>ANAHÍ BETZABE</span></span>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent group-hover:via-[var(--primary)]/40 transition-all duration-1000"></div>
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none hidden md:block notranslate" translate="no">
                <span className="font-mono text-[60px] font-black italic tracking-tighter"><span>IO_PROTOCOL</span></span>
            </div>
        </footer>
    );
};

export default Footer;