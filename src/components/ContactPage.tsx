import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const ContactPage = () => {
    const { t, lang } = useContext(GlobalContext);

    return (
        <main className="section-container space-y-10 md:space-y-12 pt-4 md:pt-6 pb-20 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-[var(--border)] pb-8 text-center md:text-left">
                <div className="space-y-3">
                    <div className="system-label text-[var(--primary)] font-black tracking-[0.2em] animate-pulse justify-center md:justify-start">COMMS_LINK_v4.5</div>
                    <h1 className="font-ex-bold text-[var(--text-main)] uppercase leading-none drop-shadow-sm shrink-0 italic">
                        {t('contact_title') || 'COMMUNICATION HUB'}
                    </h1>
                </div>
                <div className="text-[var(--text-soft)] text-[10px] md:text-xs font-bold leading-relaxed italic border-l-0 md:border-l-2 border-[var(--border)] md:pl-6 self-center md:self-end opacity-80 max-w-sm">
                    {lang === 'es' 
                        ? 'Estableciendo protocolos de comunicación síncrona y asíncrona.'
                        : 'Establishing synchronous and asynchronous communication protocols.'}
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-5 items-stretch animate-in fade-in duration-700 slide-in-from-bottom-2">
                <div className="lg:col-span-8 flex flex-col min-h-[350px] md:min-h-[400px]">
                    <div className="premium-card h-full flex flex-col group relative bg-[var(--bg-card)] shadow-[var(--shadow)] overflow-hidden">
                        <div className="scanline"></div>
                        <div className="terminal-header items-center justify-between py-3 px-5 md:px-6 bg-[var(--bg-ui)] border-b border-[var(--border)] relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="dot dot-red"></div>
                                <div className="dot dot-yellow"></div>
                                <div className="dot dot-green"></div>
                            </div>
                            <span className="system-label text-[8px] font-black tracking-widest text-[var(--primary)] uppercase italic leading-none truncate pr-4">MAINFRAME // ROOT_ACCESS</span>
                        </div>
                        
                        <div className="flex-grow flex flex-col p-6 md:p-10 space-y-6 relative z-10 bg-gradient-to-br from-transparent to-[var(--primary)]/[0.03] text-center md:text-left">
                            <div className="space-y-4 font-mono">
                                <div className="flex items-center gap-3 text-[var(--text-soft)] opacity-70 justify-center md:justify-start">
                                    <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-black">{lang === 'es' ? 'CONEXIÓN SEGURA ESTABLECIDA' : 'SECURE CONNECTION ESTABLISHED'}</span>
                                </div>
                                <h2 className="text-xs md:text-sm font-black text-[var(--primary)] uppercase tracking-tighter italic mt-4">
                                    root@anahi_loz:~/contact_node$
                                </h2>
                                <p className="text-[13px] md:text-[14px] text-[var(--text-main)] italic opacity-90 typing-effect">
                                    {lang === 'es' 
                                        ? '> Iniciando protocolo de contacto directo... ¿En qué te puedo ayudar hoy? Estoy disponible para nuevos proyectos, oportunidades laborales o simplemente para conectar.'
                                        : '> Initiating direct contact protocol... How can I help you today? I am available for new projects, job opportunities, or simply to connect.'}
                                </p>
                            </div>

                            <div className="mt-auto pt-8 flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
                                <a href="mailto:anahydlira@gmail.com" className="tech-btn btn-primary px-8 py-4 w-full md:w-auto text-[11px] md:text-[13px] shadow-lg hover:-translate-y-1">
                                    <span className="material-symbols-outlined text-sm md:text-base">send</span> 
                                    {lang === 'es' ? 'INICIAR_TRANSMISIÓN_EMAIL' : 'INITIATE_EMAIL_TRANSMISSION'}
                                </a>
                                <div className="text-[9px] md:text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest px-4 border-l-0 md:border-l border-[var(--border)] italic">
                                    Status: <span className="text-green-500 font-black animate-pulse">Awaiting Payload</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="premium-card group flex flex-col bg-[var(--bg-card)] shadow-[var(--shadow)] flex-grow border border-[var(--border)] overflow-hidden">
                        <div className="terminal-header py-3 px-5 md:px-6 bg-[var(--bg-ui)] border-b border-[var(--border)]">
                           <span className="system-label text-[8px] font-black tracking-widest uppercase italic text-[var(--primary)]">{lang === 'es' ? 'DESCARGAS_Y_CV' : 'DOWNLOADS_&_CV'}</span>
                        </div>
                        <div className="p-5 md:p-8 space-y-3.5 flex flex-col justify-center flex-grow bg-gradient-to-br from-transparent to-[var(--bg-ui)]/10 text-center">
                            <a href="/Cv Anahi Betzabe Lozano de Lira.pdf" target="_blank" rel="noreferrer" className="tech-btn btn-primary px-5 py-4 shadow-sm flex items-center justify-center gap-2.5 w-full text-[10px] md:text-[11px]">
                               <span className="material-symbols-outlined text-[18px]">download</span> {t('cv_standard') || 'CV ESTÁNDAR'}
                            </a>
                            <a href="/Anahi_Lozano_Harvard_CV.pdf" target="_blank" rel="noreferrer" className="tech-btn btn-outline px-5 py-4 bg-[var(--bg-card)] flex items-center justify-center gap-2.5 w-full border-[var(--border)] text-[10px] md:text-[11px]">
                               <span className="material-symbols-outlined text-[18px]">workspace_premium</span> {t('cv_ai') || 'CV OPTIMIZADO'}
                            </a>
                        </div>
                    </div>

                    <div className="premium-card group flex flex-col bg-[var(--bg-card)] shadow-[var(--shadow)] flex-grow border border-[var(--border)] overflow-hidden">
                        <div className="terminal-header py-3 px-5 md:px-6 bg-[var(--bg-ui)] border-b border-[var(--border)]">
                           <span className="system-label text-[8px] font-black tracking-widest uppercase italic text-[var(--accent-secondary)]">{lang === 'es' ? 'NODOS_SOCIALES' : 'SOCIAL_NODES'}</span>
                        </div>
                        <div className="p-5 space-y-3 flex flex-col justify-center items-center flex-grow text-center">
                            <div className="flex gap-3 w-full">
                                <a href="https://github.com/Alucarduwu/portafolio" target="_blank" rel="noreferrer"
                                   className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-ui)] hover:bg-[#24292E] hover:border-[#24292E] hover:text-white transition-all">
                                   <span className="material-symbols-outlined text-2xl">code</span>
                                   <span className="text-[8px] font-black uppercase tracking-widest font-mono">GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/anahi-lozano-de-lira-a4213a187/" target="_blank" rel="noreferrer"
                                   className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-ui)] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all">
                                   <span className="material-symbols-outlined text-2xl">work</span>
                                   <span className="text-[8px] font-black uppercase tracking-widest font-mono">LinkedIn</span>
                                </a>
                            </div>
                            <a href="mailto:anahydlira@gmail.com"
                               className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-ui)] hover:bg-[var(--accent-secondary)] hover:text-white transition-all text-[9.5px] font-black uppercase tracking-widest font-mono truncate px-2">
                               <span className="material-symbols-outlined text-sm">alternate_email</span>
                               anahydlira@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 md:pt-10 pb-12">
                <div className="p-5 md:p-6 border border-[var(--border)] bg-[var(--bg-ui)]/50 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 justify-around items-center rounded-2xl opacity-60 text-center sm:text-left">
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                        <span className="status-dot active"></span>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase text-[var(--text-muted)]">{lang === 'es' ? 'proveedor' : 'carrier'}</span>
                            <span className="text-[9px] md:text-[10px] font-mono font-bold text-[var(--text-main)] uppercase italic tracking-[0.15em]">{lang === 'es' ? 'SEÑAL_ESTABLE' : 'STABLE_SIGNAL'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                        <span className="status-dot online"></span>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase text-[var(--text-muted)]">{lang === 'es' ? 'encriptación' : 'encryption'}</span>
                            <span className="text-[9px] md:text-[10px] font-mono font-bold text-[var(--text-main)] uppercase italic tracking-[0.15em]">TLS_v1.7_ENABLED</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                        <span className="status-dot online"></span>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase text-[var(--text-muted)]">{lang === 'es' ? 'ancho_banda' : 'bandwidth'}</span>
                            <span className="text-[9px] md:text-[10px] font-mono font-bold text-[var(--text-main)] uppercase italic tracking-[0.15em]">{lang === 'es' ? 'E/S_ILIMITADA' : 'UNLIMITED_IO'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
