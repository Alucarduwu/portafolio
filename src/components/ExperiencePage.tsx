import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { experience } from "./dataprojetcts/experience";

const ExperiencePage = () => {
    const { t, lang } = useContext(GlobalContext);

    return (
        <main className="section-container pt-4 md:pt-8 pb-20 space-y-10 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 border-b border-[var(--border)] pb-8 text-center md:text-left">
                <div className="space-y-3 notranslate" translate="no">
                    <div className="system-label text-[var(--primary)] font-black italic justify-center md:justify-start"><span>{t('exp_status')}</span></div>
                    <h1 className="text-[var(--text-main)] font-black uppercase leading-none italic shadow-sm">
                        <span>{t('exp_title')}</span>
                    </h1>
                </div>
                <div className="text-[var(--text-soft)] text-[9px] md:text-xs font-bold font-mono opacity-50 uppercase tracking-[0.3em] notranslate" translate="no">
                    <span>{t('exp_ver')}</span>
                </div>
            </div>

            <div className="space-y-8 md:space-y-12 relative">
                {experience.map((ex, i) => {
                    const title = lang === 'es' ? ex.titleEs : ex.titleEn;
                    const period = lang === 'es' ? ex.periodEs : ex.periodEn;
                    const company = lang === 'es' ? ex.companyEs : ex.companyEn;
                    const desc = lang === 'es' ? ex.descriptionEs : ex.descriptionEn;

                    return (
                        <div key={ex.id} className="relative grid lg:grid-cols-12 gap-4 md:gap-8 items-start group">
                            <div className="lg:col-span-3 pt-2 text-center lg:text-left">
                                <div className="glass-pill border-[var(--primary)]/20 text-[var(--primary)] mb-2 inline-block shadow-sm">
                                    {lang === 'es' ? 'NODO_0' : 'NODE_0'}{i+1}
                                </div>
                                <div className="text-[9px] md:text-[10px] font-mono font-black text-[var(--text-muted)] uppercase tracking-widest block">{period}</div>
                            </div>
                            
                            <div className="lg:col-span-9 premium-card p-5 md:p-8 space-y-6 md:space-y-8 bg-[var(--bg-card)] shadow-[var(--shadow)] relative overflow-hidden group-hover:border-[var(--primary)]/30 transition-all">
                                <div className="scanline"></div>
                                
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-20">
                                    <div className="space-y-2 text-center md:text-left">
                                        <div className="system-label text-[9px] md:text-[10px] uppercase text-[var(--primary)] font-black mb-1 justify-center md:justify-start notranslate" translate="no">
                                            @ <span>{company.toUpperCase()}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] uppercase tracking-tighter italic leading-tight">
                                            <span>{title}</span>
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center md:justify-end notranslate" translate="no">
                                        <span className="status-dot online"></span>
                                        <span className="text-[7px] md:text-[8px] font-mono font-black text-green-500 uppercase tracking-widest"><span>ACTIVE_CORE</span></span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-20">
                                    <div className="space-y-4">
                                        <div className="system-label text-[8px] opacity-40 italic justify-center md:justify-start">{lang === 'es' ? 'PERSPECTIVA_DEL_REGISTRO' : 'LOG_PERSPECTIVE'}</div>
                                        <p className="text-[13px] md:text-[0.85rem] text-[var(--text-soft)] leading-relaxed font-bold border-l-4 md:border-l-2 border-[var(--primary)]/30 pl-4 md:pl-6 italic bg-[var(--primary)]/[0.01] py-3 md:py-4 rounded-r-2xl">
                                            {desc}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {ex.details && (lang === 'es' ? ex.details.featuresEs : ex.details.featuresEn) && (
                                            <div className="space-y-3 md:space-y-4">
                                               <h4 className="system-label text-[8px] opacity-40 italic uppercase justify-center md:justify-start">{lang === 'es' ? 'ARQUITECTURA_DE_LOGROS' : 'ACHIEVEMENT_ARCHITECTURE'}</h4>
                                               <ul className="space-y-2 md:space-y-2.5">
                                                  {(lang === 'es' ? ex.details.featuresEs : ex.details.featuresEn).map((feat: string, fIdx: number) => (
                                                     <li key={fIdx} className="text-[9px] font-black text-[var(--text-muted)] flex items-start gap-3 md:gap-4 uppercase tracking-[0.05em] border-b border-[var(--border)] pb-2 group-hover:text-[var(--text-soft)] transition-colors italic">
                                                        <span className="text-[var(--primary)] font-mono animate-pulse">›</span>
                                                        {feat}
                                                     </li>
                                                  ))}
                                               </ul>
                                            </div>
                                        )}

                                        <div className="pt-4 md:pt-6 border-t border-[var(--border)] flex flex-wrap gap-2 justify-center md:justify-start">
                                            {ex.stack.split(' • ').map(tech => (
                                               <span key={tech} className="glass-pill text-[7px] md:text-[8px]">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8 pt-4 border-t border-[var(--border)] flex justify-between items-center opacity-40 italic">
                                    <span className="font-mono text-[7px] font-black uppercase tracking-[0.4em] hidden sm:block">SIG_HASH: {ex.id.slice(0, 16).toUpperCase()}</span>
                                    <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em] ml-auto">{lang === 'es' ? 'EJECUCIÓN_ESTABLE' : 'STABLE_EXECUTION'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="py-12 md:py-20 text-center space-y-8 md:space-y-10">
                <div className="h-[1px] w-full max-w-xs md:max-w-md mx-auto bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-30"></div>
                <div className="space-y-4">
                    <div className="system-label text-[8px] md:text-[9px] opacity-40 mx-auto font-black italic tracking-[0.3em]">{t('exp_prospection')}</div>
                    <h2 className="text-2xl md:text-3xl font-black text-[var(--text-soft)] uppercase tracking-tighter opacity-30 italic leading-tight">
                        {t('exp_innovation')}
                    </h2>
                </div>
            </div>
        </main>
    );
};

export default ExperiencePage;
