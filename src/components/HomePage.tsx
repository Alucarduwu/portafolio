import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import RHHomePage from "./rh/RHHomePage";

const HomePage = () => {
    const { t, perspective } = useContext(GlobalContext);

    if (perspective === 'rh') {
        return <RHHomePage />;
    }

    return (
        <main className="section-container flex flex-col justify-center min-h-[60vh] py-6 relative overflow-hidden">
            <div className="bg-grid opacity-10 md:opacity-[0.2]"></div>
            <div className="noise"></div>
            
            <div className="absolute inset-x-0 -top-40 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl pointer-events-none" aria-hidden="true">
                <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-10" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="flex flex-col space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="space-y-3 md:space-y-4 w-full text-center lg:text-left">
                        <div className="inline-flex flex-wrap justify-center lg:justify-start items-center gap-3 px-4 py-2 rounded-none bg-[var(--bg-ui)] border border-[var(--border)] text-[var(--primary)] font-black text-[9px] tracking-[0.2em] uppercase italic group hover:bg-[var(--primary)]/10 transition-all font-mono break-words max-w-full">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[var(--primary)] opacity-75"></span>
                                <span className="relative inline-flex rounded-none h-2 w-2 bg-[var(--primary)]"></span>
                            </span>
                            <span className="truncate max-w-full">ROOT@ANAHI_HQ: ~# SUDO INIT --SYSTEM_V6.4</span> <span className="typing-cursor notranslate" translate="no"></span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--text-main)] font-black italic drop-shadow-2xl leading-[1.1] notranslate break-words" translate="no">
                            <span className="block mb-2 sm:mb-4">ANAHÍ BETZABE</span>
                            <span className="text-[var(--primary)] opacity-90 block tracking-tighter hover:translate-x-2 transition-transform duration-700 cursor-default">
                                LOZANO DE LIRA
                            </span>
                        </h1>
                    </div>
                    
                    <div className="premium-card p-6 md:p-8 space-y-4 md:space-y-5 max-w-lg relative group border-l-4 !border-l-[var(--primary)] mb-6 mx-auto lg:mx-0">
                        <div className="absolute right-4 top-4 opacity-[0.03] group-hover:opacity-[0.10] transition-opacity">
                            <span className="material-symbols-outlined text-4xl md:text-5xl">terminal</span>
                        </div>
                        <h2 className="text-[10px] md:text-xs font-black text-[var(--primary)] uppercase tracking-tight flex flex-wrap items-center gap-2 md:gap-4 italic font-mono leading-relaxed">
                           <span className="text-[var(--text-muted)] opacity-50 text-[10px] md:text-xs shrink-0">0x01/</span> 
                           <span className="flex-1 min-w-[200px]">{t('hero_about_role')}</span>
                        </h2>
                        <p className="text-[14.5px] text-[var(--text-soft)] leading-relaxed font-bold italic opacity-95">
                            {t('about_desc')}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                        <Link to="/projects" className="tech-btn btn-primary shadow-xl !rounded-none">
                            <span className="material-symbols-outlined text-[16px]">terminal</span> [ DISCOVER_CORE ]
                        </Link>
                        <Link to="/contact" className="tech-btn btn-outline bg-[var(--bg-card)] backdrop-blur-xl !rounded-none">
                            <span className="material-symbols-outlined text-[16px]">podcasts</span> [ ESTABLISH_LINK ]
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block relative group animate-in fade-in zoom-in duration-1000 slide-in-from-right-20">
                    <div className="premium-card relative z-10 bg-[var(--bg-card)]/80 backdrop-blur-xl shadow-[var(--shadow)] hover:border-[var(--primary)]/60 transition-all duration-700">
                        <div className="scanline"></div>
                        <div className="terminal-header bg-[var(--bg-ui)] py-3.5 px-6 items-center justify-between">
                            <div className="flex gap-2">
                               <div className="dot dot-red"></div>
                               <div className="dot dot-yellow"></div>
                               <div className="dot dot-green"></div>
                            </div>
                            <span className="font-mono text-[8px] text-[var(--text-muted)] font-black uppercase tracking-[0.4em] opacity-40">BASH // ANALYZE_LOGS_v6.4</span>
                        </div>
                        <div className="p-8 font-mono text-[12px] space-y-6 flex flex-col justify-center italic bg-gradient-to-br from-transparent via-[var(--primary)]/[0.015] to-[var(--secondary)]/[0.015]">
                            <div className="space-y-3">
                               <p className="text-[var(--text-muted)] opacity-70">$ whoami --detailed</p>
                               <div className="flex items-center gap-3">
                                  <span className="material-symbols-outlined text-base text-[var(--primary)]">person</span>
                                  <p className="text-[var(--primary)] font-black text-lg tracking-tighter italic uppercase">ANAHI_LOZANO [STABLE_BUILD]</p>
                               </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                               <p className="text-[var(--text-muted)] mb-2 opacity-70">$ system_metrics --fetch_all</p>
                               <div className="space-y-2.5 pl-6 border-l border-[var(--primary)]/30">
                                  <p className="text-[var(--text-soft)] flex items-center gap-3 font-bold"> 
                                     <span className="text-[var(--primary)]">›</span> STK: REACT // NEXT // NODE // PY 
                                  </p>
                                  <p className="text-[var(--text-soft)] flex items-center gap-3 font-bold"> 
                                     <span className="text-[var(--primary)]">›</span> DB: FB // MONGO // PG // HANA 
                                  </p>
                                  <p className="text-[var(--text-soft)] flex items-center gap-3 font-bold"> 
                                     <span className="text-[var(--primary)]">›</span> MOB: KT // FLUTTER // EXPO // RN // GM 
                                  </p>
                                  <p className="text-[var(--text-soft)] flex items-center gap-3 font-bold"> 
                                     <span className="text-[var(--primary)]">›</span> LANG: TS // JS // PY // JAVA // C# // PHP // KT 
                                  </p>
                                  <p className="text-[var(--text-soft)] flex items-center gap-3 font-bold notranslate" translate="no"> 
                                     <span className="text-[var(--primary)]">›</span> <span>SYNC: READY_STATE_OK_v.6.4</span>
                                  </p>
                               </div>
                            </div>
                            <div className="pt-10 flex items-center gap-3">
                               <span className="text-[var(--primary)] font-black italic shrink-0 opacity-70">anahi@lozano_hq:~$</span>
                               <span className="typing-cursor"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
        </main>
    );
};

export default HomePage;
