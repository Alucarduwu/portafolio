import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useGithubProjects } from "../hooks/useGithubProjects";
import TechOrbital from "./TechOrbital";

const AboutPage = () => {
    const { t, lang } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");

    return (
        <main className="section-container space-y-8 md:space-y-10 py-4 relative">
            <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-end border-b border-[var(--border)] pb-8 text-center md:text-left">
                <div className="lg:col-span-8 space-y-4">
                    <div className="system-label animate-pulse justify-center md:justify-start notranslate" translate="no"><span>BIO_DUMP_v.6.4</span></div>
                    <h1 className="text-[var(--text-main)] uppercase leading-none italic font-black shadow-sm glitch-text" data-text={t('about_title')}>
                        <span>{t('about_title')}</span>
                    </h1>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 premium-card group flex flex-col relative overflow-hidden bg-[var(--bg-card)] shadow-[var(--shadow)]">
                    <div className="scanline"></div>
                    <div className="terminal-header bg-[var(--bg-ui)] px-4 md:px-6 py-3 items-center justify-between border-b border-[var(--border)]">
                        <div className="flex items-center gap-2 md:gap-3">
                           <div className="dot dot-red"></div>
                           <div className="dot dot-yellow"></div>
                           <div className="dot dot-green"></div>
                        </div>
                        <span className="font-mono text-[8px] md:text-[9px] text-[var(--text-muted)] ml-auto uppercase tracking-widest font-black opacity-40">BASH // CORE_PROFILE</span>
                    </div>
                    
                    <div className="p-5 md:p-8 space-y-6 flex-grow bg-gradient-to-br from-transparent to-[var(--primary)]/[0.02]">
                        <div className="space-y-4 font-mono">
                            <h2 className="text-xs md:text-sm font-black text-[var(--primary)] uppercase tracking-tighter italic">root@anahi_loz:~$</h2>
                            <div className="text-[13px] md:text-[14px] text-[var(--text-soft)] leading-relaxed font-bold max-w-4xl whitespace-pre-line italic opacity-95">
                                <p>
                                    {lang === 'es'
                                        ? 'Soy Ingeniera en Tecnologías de la Información y Comunicación con especialidad en Desarrollo de Aplicaciones Avanzadas del Software, enfocada en crear soluciones tecnológicas integrales, con experiencia en el ciclo de vida completo de desarrollo. Mi perspectiva técnica abarca desde la creación de aplicaciones móviles nativas de alto rendimiento hasta la implementación de complejos sistemas empresariales SAP, priorizando siempre la eficiencia, la escalabilidad y una arquitectura de software impecable.'
                                        : 'I am an Information and Communication Technologies Engineer specialized in Advanced Software Application Development, focused on creating comprehensive technological solutions with experience across the entire development lifecycle. My technical perspective ranges from building high-performance native mobile apps to implementing complex SAP enterprise systems, always prioritizing efficiency, scalability, and impeccable software architecture.'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 md:pt-8 relative z-20">
                            {[
                                { label: lang === 'es' ? 'EXP' : 'EXP', val: lang === 'es' ? '3+ AÑOS' : '3+ YEARS' },
                                { label: 'NODES', val: isLoading ? '...' : `${projects.length}+` },
                                { label: 'MX', val: 'MEX // MX' },
                                { label: 'AUTH', val: 'SECURE' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-[var(--bg-ui)]/30 backdrop-blur-md p-3 md:p-4 text-center flex flex-col justify-center items-center shadow-inner border border-[var(--border)] rounded-xl group/stat hover:border-[var(--primary)]/40 transition-all">
                                    <span className="font-mono text-[8px] md:text-[9px] text-[var(--text-muted)] uppercase tracking-widest block mb-1 font-black opacity-60">{stat.label}</span>
                                    <div className={`text-xs md:text-sm font-black ${stat.label === 'AUTH' ? 'text-green-500' : 'text-[var(--text-main)]'} uppercase italic tracking-tighter leading-none`}>{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                    <div className="premium-card p-5 flex flex-col justify-center group overflow-hidden bg-gradient-to-t from-[var(--primary)]/[0.05] to-transparent bg-[var(--bg-card)] min-h-[140px]">
                        <span className="system-label text-[9px] opacity-60 mb-4 uppercase tracking-widest italic animate-pulse">{lang === 'es' ? 'TRAYECTORIA_SEÑALES' : 'STATUS_SIGNALS'}</span>
                        <div className="space-y-4 font-mono text-[10px] md:text-[11px] font-black italic">
                           <div className="flex justify-between items-center text-green-500 border-b border-[var(--border)] pb-3 uppercase tracking-widest leading-none">
                               <span>{lang === 'es' ? 'energía' : 'power'}</span>
                               <span className="flex items-center gap-2"> <span className="status-dot online"></span> NOMINAL</span>
                           </div>
                           <div className="flex justify-between items-center text-[var(--text-soft)] uppercase tracking-widest leading-none">
                               <span>{lang === 'es' ? 'flujo_lógico' : 'logic flux'}</span>
                               <span className="text-[var(--primary)] animate-pulse">{lang === 'es' ? 'activo' : 'active'}</span>
                           </div>
                        </div>
                    </div>

                    <div className="premium-card flex-grow group relative overflow-hidden bg-[var(--bg-card)] shadow-[var(--shadow)] flex flex-col items-center justify-center p-5 min-h-[140px]">
                        <div className="absolute inset-0 scanline opacity-[0.03]"></div>
                        <div className="space-y-3 text-center z-10">
                            <span className="material-symbols-outlined text-3xl text-[var(--primary)] animate-bounce drop-shadow-[0_0_15px_var(--primary-glow)]">location_on</span>
                            <div className="space-y-1">
                                <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-tight italic">Aguascalientes</h3>
                                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase italic tracking-widest font-black opacity-60">MX // UTC-6</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8 md:space-y-12 pt-8 md:pt-12">
                <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-[var(--primary)] text-3xl">developer_board</span>
                    <div className="flex flex-col text-center md:text-left">
                        <span className="system-label text-[9px] md:text-[10px] opacity-50 justify-center md:justify-start">STK_FULL_DECRYPTION</span>
                        <h2 className="text-xl md:text-2xl font-black text-[var(--text-main)] italic tracking-tighter uppercase leading-none">💻 FULL SKILL SET</h2>
                    </div>
                </div>

                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <TechOrbital 
                        title="🖥️ FRONTEND" 
                        icon="desktop_windows"
                        items={[
                            'React', 'Angular', 'Vue.js', 'Next.js', 'Astro', 'HTML5', 'CSS3', 
                            'TypeScript', 'JavaScript', 'Tailwind CSS', 'SCSS', 'Bootstrap', 'Material UI'
                        ].map(t => ({ name: t }))}
                    />
                    
                    <TechOrbital 
                        title="⚙️ BACKEND" 
                        icon="settings_ethernet"
                        items={[
                            'Node.js', 'Express', 'NestJS', 'Laravel', 'C#', '.NET', 'ASP.NET Core',
                            'Django', 'Flask', 'FastAPI', 'Python', 'Java', 'PHP'
                        ].map(t => ({ name: t }))}
                    />

                    <TechOrbital 
                        title="🧠 SAP / DATA" 
                        icon="corporate_fare"
                        items={[
                            'SAP BTP', 'ABAP', 'HANA', 'RAP', 'CDS Views',
                            'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server'
                        ].map(t => ({ name: t }))}
                    />

                    <TechOrbital 
                        title="📱 MOBILE" 
                        icon="smartphone"
                        items={['Kotlin', 'Android', 'Jetpack Compose', 'Flutter', 'Dart', 'React Native', 'Expo', 'Swift'].map(t => ({ name: t }))}
                    />

                    <TechOrbital 
                        title="☁️ CLOUD / OPS" 
                        icon="cloud"
                        items={['AWS', 'Docker', 'GitHub Actions', 'GitLab', 'Vercel', 'Postman', 'Git', 'VS Code'].map(t => ({ name: t }))}
                    />

                    <TechOrbital 
                        title="🎨 DESIGN & UX" 
                        icon="auto_awesome"
                        items={['Figma', 'Stitch', 'Modern UI', 'Glassmorphism', 'Animations'].map(t => ({ name: t }))}
                    />

                    <TechOrbital 
                        title="🧪 TESTING" 
                        icon="bug_report"
                        items={['Cypress', 'Playwright', 'PyTest', 'Jest', 'Mocha'].map(t => ({ name: t }))}
                    />
                </div>

                <div className="grid lg:grid-cols-12 gap-5 pt-4">
                    <div className="lg:col-span-8 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-ui)] border border-[var(--border)] border-l-4 border-l-[var(--primary)] shadow-2xl relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-3xl md:text-4xl text-[var(--primary)]">format_quote</span>
                        </div>
                        <h3 className="system-label text-[9px] mb-3 opacity-70 justify-center md:justify-start">🚀 PROFILE_DUMP</h3>
                        <p className="text-xs md:text-[15px] text-[var(--text-secondary)] leading-relaxed italic font-bold tracking-tight uppercase max-w-2xl">
                            {lang === 'es' 
                                ? 'Ingeniera en TIC especializada en desarrollo de apps avanzadas del software. Enfocada en sistemas integrales de alto rendimiento para web, móvil y entornos empresariales SAP.'
                                : 'ICT Engineer specialized in Advanced Software Application Development. Focused on high-performance web, mobile, and SAP enterprise ecosystems.'
                            }
                        </p>
                    </div>

                    <div className="lg:col-span-4 p-5 md:p-6 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/40 flex flex-col justify-center items-center text-center space-y-3">
                        <span className="material-symbols-outlined text-3xl text-[var(--primary)] animate-bounce font-black">shield_with_heart</span>
                        <div className="space-y-0.5">
                           <h3 className="text-sm font-black text-[var(--text-main)] italic uppercase">{lang === 'es' ? '💎 VALOR ESTRATÉGICO' : '💎 STRATEGIC VALUE'}</h3>
                        </div>
                        <div className="text-[9px] md:text-[10px] text-[var(--text-soft)] font-mono font-black italic space-y-1.5 uppercase text-left w-full sm:w-auto">
                            {lang === 'es' ? (
                                <>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> Arquitectura Full-Stack Avanzada</p>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> Ingeniería de Performance Móvil</p>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> Soluciones Enterprise SAP Cloud</p>
                                </>
                            ) : (
                                <>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> Advanced Full-Stack Architecture</p>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> Mobile Performance Engineering</p>
                                    <p className="flex items-center gap-2"><span className="text-[var(--primary)]">›</span> SAP Enterprise Cloud Solutions</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-20"></div>
        </main>
    );
};

export default AboutPage;
