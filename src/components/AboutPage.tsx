import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useGithubProjects } from "../hooks/useGithubProjects";
import RHAboutPage from "./rh/RHAboutPage";

const AboutPage = () => {
    const { t, lang, perspective } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");

    if (perspective === 'rh') {
        return <RHAboutPage />;
    }

    return (
        <main className="section-container space-y-8 md:space-y-10 pt-24 md:pt-32 pb-4 relative">
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

                {/* ── Cyber Deck: Optimized Skill Manifest ── */}
                <div className="premium-card bg-[var(--bg-card)] border-t-2 border-t-[var(--primary)] overflow-hidden relative group/stack hacker-brackets">
                    {/* Corner Markers */}
                    <div className="corner-marker marker-tl animate-pulse"></div>
                    <div className="corner-marker marker-tr animate-pulse delay-75"></div>
                    <div className="corner-marker marker-bl animate-pulse delay-150"></div>
                    <div className="corner-marker marker-br animate-pulse delay-200"></div>

                    {/* Scanner Hacker Background Animation */}
                    <div className="scanner-beam"></div>

                    {/* Matrix Rain Background - Even more subtle */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.015] z-0 flex justify-around">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="flex flex-col font-mono text-[9px] text-[var(--primary)] leading-none animate-[matrix-rain_20s_linear_infinite]"
                                style={{ animationDelay: `${Math.random() * 10}s`, animationDuration: `${15 + Math.random() * 10}s` }}
                            >
                                {Array.from({ length: 40 }).map((_, j) => (
                                    <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="scanline opacity-[0.03]"></div>

                    {/* Card header: Cyber UI - Tighter */}
                    <div className="terminal-header bg-[var(--bg-ui)]/95 backdrop-blur-md px-4 py-3 border-b border-[var(--primary)]/20 flex flex-wrap items-center justify-between gap-3 relative z-20 min-w-0">
                        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
                            </div>
                            <div className="h-3 w-px bg-[var(--primary)]/10 mx-1"></div>
                            <span className="font-mono text-[9px] md:text-[10px] text-[var(--primary)] tracking-[0.2em] md:tracking-[0.3em] font-black uppercase truncate block" data-text="OS_SKILLS_DUMP_v4">OS_SKILLS_DUMP_v4</span>
                        </div>
                        <div className="flex items-center gap-3 text-[8px] md:text-[9px] font-mono opacity-60 italic whitespace-nowrap">
                           <span>SCANNER_MODE: ACTIVE</span>
                        </div>
                    </div>

                    <div className="p-4 md:p-6 space-y-3 font-mono relative z-20">
                        {(() => {
                            const getIcon = (name: string) => {
                                const map: Record<string, { s: string; c: string }> = {
                                    'React': { s: 'react', c: '61DAFB' },
                                    'Angular': { s: 'angular', c: 'DD0031' },
                                    'Vue.js': { s: 'vuedotjs', c: '4FC08D' },
                                    'Next.js': { s: 'nextdotjs', c: 'ffffff' },
                                    'Astro': { s: 'astro', c: 'FF5D01' },
                                    'TypeScript': { s: 'typescript', c: '3178C6' },
                                    'JavaScript': { s: 'javascript', c: 'F7DF1E' },
                                    'Tailwind CSS': { s: 'tailwindcss', c: '06B6D4' },
                                    'Node.js': { s: 'nodedotjs', c: '339933' },
                                    'Python': { s: 'python', c: '3776AB' },
                                    'Django': { s: 'django', c: '092E20' },
                                    'Laravel': { s: 'laravel', c: 'FF2D20' },
                                    'Kotlin': { s: 'kotlin', c: '7F52FF' },
                                    'Android': { s: 'android', c: '3DDC84' },
                                    'Flutter': { s: 'flutter', c: '02569B' },
                                    'Firebase': { s: 'firebase', c: 'FFCA28' },
                                    'MySQL': { s: 'mysql', c: '4479A1' },
                                    'MongoDB': { s: 'mongodb', c: '47A248' },
                                    'PostgreSQL': { s: 'postgresql', c: '4169E1' },
                                    'Docker': { s: 'docker', c: '2496ED' },
                                    'AWS': { s: 'amazonaws', c: 'FF9900' },
                                    'Figma': { s: 'figma', c: 'F24E1E' },
                                    'SAP BTP': { s: 'sap', c: '008FD3' },
                                    'HANA': { s: 'sap', c: '008FD3' },
                                    'Git': { s: 'git', c: 'F05032' },
                                    'Vercel': { s: 'vercel', c: 'ffffff' },
                                    'C#': { s: 'csharp', c: '239120' },
                                    '.NET Core': { s: 'dotnet', c: '512BD4' },
                                    'PHP': { s: 'php', c: '777BB4' },
                                    'Java': { s: 'openjdk', c: 'ffffff' },
                                    'Swift': { s: 'swift', c: 'F05138' },
                                    'Three.js': { s: 'threedotjs', c: 'ffffff' },
                                    'GraphQL': { s: 'graphql', c: 'E10098' },
                                    'Redis': { s: 'redis', c: 'DC382D' },
                                    'Playwright': { s: 'playwright', c: '2EAD33' },
                                    'Cypress': { s: 'cypress', c: '17202C' },
                                    'JIRA': { s: 'jira', c: '0052CC' },
                                    'Framer Motion': { s: 'framer', c: '0055FF' }
                                };
                                const found = map[name];
                                if (!found) return null;
                                return `https://cdn.simpleicons.org/${found.s}/${found.c}`;
                            };

                            return [
                                { label: 'front', color: 'text-blue-400', border: 'border-blue-500/20', items: ['React', 'Angular', 'Vue.js', 'Next.js', 'Astro', 'Three.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'] },
                                { label: 'back', color: 'text-violet-400', border: 'border-violet-500/20', items: ['Node.js', 'Express', 'NestJS', 'Laravel', 'C#', '.NET Core', 'Python', 'Django', 'FastAPI', 'Flask', 'Java', 'PHP', 'REST APIs', 'GraphQL'] },
                                { label: 'mob / ai', color: 'text-green-400', border: 'border-green-500/20', items: ['Kotlin', 'Android', 'Jetpack Compose', 'Computer Vision', 'Flutter', 'Dart', 'React Native', 'Expo', 'Swift', 'MVVM'] },
                                { label: 'sap / db', color: 'text-amber-400', border: 'border-amber-500/20', items: ['SAP BTP', 'ABAP Cloud', 'HANA', 'RAP', 'CDS Views', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Firebase', 'Redis'] },
                                { label: 'ops / tst', color: 'text-cyan-400', border: 'border-cyan-500/20', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel', 'Git', 'Bitbucket', 'Playwright', 'Cypress', 'Jest', 'Mocha', 'Postman'] },
                                { label: 'ux / design', color: 'text-pink-400', border: 'border-pink-500/20', items: ['Figma', 'Stitch', 'Framer Motion', 'Animations', 'Clean Architecture', 'SOLID', 'Agile', 'SCRUM', 'JIRA'] },
                            ].map(cat => (
                                <div key={cat.label} className="grid grid-cols-[65px_1fr] md:grid-cols-[75px_1fr] gap-3 items-start group/cat pb-2.5 border-b border-[var(--border)] last:border-0 last:pb-0 min-w-0">
                                    <div className={`${cat.color} text-[9px] font-black uppercase tracking-tighter flex-shrink-0 pt-1 flex items-center gap-1.5 break-words`}>
                                        <span className="w-0.5 h-2.5 bg-current opacity-30 rounded-full"></span>
                                        {cat.label}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 min-w-0">
                                        {cat.items.map(item => {
                                            const iconUrl = getIcon(item);
                                            return (
                                                <span
                                                    key={item}
                                                    className={`group/tag flex items-center gap-1.5 px-2 py-0.5 rounded-lg border ${cat.border} bg-[var(--bg-ui)]/80 backdrop-blur-sm text-[var(--text-main)] text-[10px] md:text-[11px] font-extrabold uppercase tracking-tight transition-all duration-300 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10 hover:scale-105 active:scale-95`}
                                                >
                                                    {iconUrl ? (
                                                        <img src={iconUrl} alt={item} className="w-3.5 h-3.5 object-contain" />
                                                    ) : (
                                                        <span className="w-1 h-1 rounded-full bg-[var(--primary)]/40"></span>
                                                    )}
                                                    <span className="opacity-95 group-hover/tag:opacity-100">{item}</span>
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            ));
                        })()}

                        {/* Status Footer - Tighter */}
                        <div className="pt-3 border-t border-[var(--primary)]/10 flex flex-wrap items-center justify-between gap-3 min-w-0">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className="text-[var(--primary)] text-[10px] font-black opacity-40 shrink-0">$</span>
                                <span className="text-[8px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono italic opacity-40 truncate block">scanner_active_manifest_v4.run</span>
                            </div>
                            <div className="flex items-center gap-3 text-[7px] md:text-[8px] font-mono text-[var(--text-muted)] opacity-40 uppercase shrink-0 whitespace-nowrap">
                                <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> OK</span>
                                <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[var(--primary)] rounded-full animate-pulse"></span> SYNCING</span>
                            </div>
                        </div>
                    </div>
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

                    <div className="lg:col-span-4 p-5 md:p-6 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/40 flex flex-col justify-center items-start space-y-4 font-mono">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[var(--primary)] text-xl animate-pulse">military_tech</span>
                            <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] font-mono">&gt; STRENGTHS</span>
                        </div>
                        
                        <ul className="text-[10px] md:text-[11px] text-[var(--text-main)] space-y-2 font-bold italic uppercase tracking-tighter">
                            <li className="flex items-center gap-2">
                                <span className="text-[var(--primary)]">-</span> Full Stack development
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[var(--primary)]">-</span> Database design (MySQL)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[var(--primary)]">-</span> REST API architecture
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[var(--primary)]">-</span> Role-based access control
                            </li>
                        </ul>
                        
                        <div className="pt-2 w-full">
                            <div className="h-px w-full bg-gradient-to-r from-[var(--primary)]/30 to-transparent"></div>
                            <span className="text-[8px] opacity-40 uppercase tracking-widest mt-2 block">POSITION: SENIOR_JUNIOR_READY</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-20"></div>
        </main>
    );
};

export default AboutPage;
