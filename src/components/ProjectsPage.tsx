import { useContext, useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useGithubProjects, type Project } from "../hooks/useGithubProjects";
import { motion, AnimatePresence } from "framer-motion";

const isMobile = (p: Project) => {
    const stack = (p.stack || []).join(' ').toLowerCase();
    return stack.includes('kotlin') || stack.includes('android') || stack.includes('flutter') || stack.includes('react native') || stack.includes('compose');
};

const ProjectsPage = () => {
    const { t, lang } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const closeProject = () => {
        setSelectedProject(null);
        setZoomedImage(null);
    };

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    const enterpriseProjects = useMemo(() => projects.filter(p => p.category === 'empresarial'), [projects]);
    const mobileProjects     = useMemo(() => projects.filter(p => isMobile(p)), [projects]);
    const webProjects        = useMemo(() => projects.filter(p => !isMobile(p) && p.category !== 'empresarial'), [projects]);

    const sections = useMemo(() => [
        { key: 'enterprise', label: t('cat_enterprise'), icon: 'corporate_fare', items: enterpriseProjects },
        { key: 'web',        label: t('cat_web'),        icon: 'public',         items: webProjects        },
        { key: 'mobile',     label: t('cat_mobile'),     icon: 'smartphone',     items: mobileProjects     },
    ], [enterpriseProjects, webProjects, mobileProjects, t]);

    const ProjectCard = ({ p, index }: { p: Project; index: number }) => {
        const [imgError, setImgError] = useState(false);
        const firstImage = p.images && p.images.length > 0 ? p.images[0] : null;

        return (
            <motion.div 
                className="premium-card group relative flex flex-col h-full bg-[var(--bg-card)]/40 border-[var(--border)] hover:border-[var(--primary)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_var(--primary-glow)] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedProject(p)}
            >
                {/* Terminal Header */}
                <div className="terminal-header py-3 px-4 bg-[var(--bg-ui)]/90 flex items-center justify-between border-b border-[var(--border)] relative z-20">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 group-hover:bg-[#ff5f56] transition-colors shadow-sm"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 group-hover:bg-[#ffbd2e] transition-colors shadow-sm"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70 group-bg-[#27c93f] transition-colors shadow-sm"></div>
                    </div>
                    <span className="font-mono text-[9px] text-[var(--primary)] font-black opacity-60 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                        NODE_0x{String(p.id).substring(0,4) || 'NULL'}
                    </span>
                </div>

                {/* Integrated Preview Engine */}
                <div className="aspect-video w-full bg-black relative overflow-hidden group-hover:cursor-pointer border-b border-[var(--border)]">
                    {!imgError && firstImage ? (
                        <motion.img 
                            src={firstImage} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                            alt={p.title}
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-ui)]/30 space-y-3 opacity-30 group-hover:opacity-100 transition-opacity">
                             <span className="material-symbols-outlined text-4xl text-[var(--primary)] animate-pulse">terminal</span>
                             <span className="text-[10px] font-mono font-black text-[var(--primary)] uppercase tracking-widest whitespace-nowrap">INIT_NO_VISUAL_FEED</span>
                        </div>
                    )}
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                    <div className="scanline"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[8px] font-mono font-black text-white/50 uppercase tracking-widest">Live_Connect</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1 space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 mb-1">
                             <span className="text-[var(--primary)] font-mono font-bold text-[10px] tracking-tighter opacity-50 italic">[{String(p.category || 'GEN').substring(0,3).toUpperCase()}]</span>
                             <div className="h-px flex-1 bg-gradient-to-r from-[var(--primary)]/20 to-transparent"></div>
                        </div>
                        <h3 className="text-sm font-black text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors uppercase italic tracking-tighter line-clamp-1">
                             {p.title}
                        </h3>
                    </div>

                    <p className="text-[11px] text-[var(--text-soft)] italic line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed flex-1">
                        {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {(p.stack || []).slice(0, 4).map(tech => (
                            <span key={tech} className="px-1.5 py-0.5 rounded bg-[var(--bg-ui)] text-[var(--primary)]/70 text-[8px] font-mono font-bold uppercase border border-[var(--border)] group-hover:border-[var(--primary)]/30 transition-all">
                                #{tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Interaction */}
                <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity bg-[var(--bg-ui)]/20">
                     <span className="text-[8px] font-mono font-black text-[var(--text-muted)] tracking-widest uppercase italic">Data_Source: GH_API</span>
                     <span className="material-symbols-outlined text-sm text-[var(--primary)]">arrow_forward_ios</span>
                </div>
            </motion.div>
        );
    };

    return (
        <main className="section-container pt-4 md:pt-8 pb-12 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--border)] pb-6 mb-8 gap-6 md:gap-8">
                <div className="space-y-2 notranslate" translate="no">
                    <div className="system-label text-[9px] opacity-70 tracking-[0.3em] font-black italic"><span>{lang === 'es' ? 'NÚCLEO_REPOSITORIOS' : 'CORE_REPOSITORIES'}</span> <span className="typing-cursor h-2.5 w-1"></span></div>
                    <h1 className="text-[var(--text-main)] font-black italic leading-[0.85] tracking-tighter uppercase text-left glitch-text" data-text={t('projects_title') || 'ÍNDICE_PROYECTOS'}>
                        <span>{t('projects_title') || 'ÍNDICE_PROYECTOS'}</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-[var(--text-muted)] font-black uppercase tracking-[0.2em] opacity-60">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
                    {projects.length} {t('repos_verified')}
                </div>
            </div>

            <div className="mb-8 md:mb-10 p-4 md:p-5 rounded-xl bg-[var(--primary)]/[0.03] border border-[var(--primary)]/20 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex flex-col md:flex-row items-start gap-4">
                    <span className="material-symbols-outlined text-[var(--primary)] bg-[var(--primary)]/10 p-2.5 rounded-lg hidden md:block">hub</span>
                    <div className="space-y-1.5 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <h3 className="text-[10px] md:text-[11px] font-black text-[var(--primary)] uppercase tracking-[0.2em] font-mono">
                                {t('sync_protocol')}
                            </h3>
                            <div className="inline-flex items-center gap-1 text-[8px] md:text-[9px] font-mono text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded w-fit">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                </span>
                                {t('sync_connected')}
                            </div>
                        </div>
                        <p className="text-[10px] md:text-[11.5px] text-[var(--text-soft)] italic leading-relaxed font-bold opacity-80 max-w-3xl">
                            {t('sync_desc')}
                        </p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 md:py-32 space-y-6">
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></div>
                    <span className="system-label text-[10px] animate-bounce">{lang === 'es' ? 'CARGANDO...' : 'LOADING...'}</span>
                </div>
            ) : (
                <div className="space-y-12 animate-in fade-in duration-700">
                    {sections.map(section => section.items.length > 0 && (
                        <div key={section.key} className="pt-4">
                            <div className="flex items-center gap-3 mb-8 px-1 md:px-0">
                                <span className="material-symbols-outlined text-[16px] md:text-[18px] text-[var(--primary)] opacity-70">{section.icon}</span>
                                <span className="font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--primary)] opacity-80">
                                    {section.label}
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent ml-4"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {section.items.map((p, index) => (
                                    <ProjectCard key={p.id || index} p={p} index={index} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-0 sm:p-4 md:p-8 lg:p-12">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/85 backdrop-blur-2xl" 
                                onClick={closeProject}
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                className="premium-card max-w-5xl w-full h-full sm:h-[90vh] flex flex-col relative z-[100001] shadow-[0_20px_100px_rgba(0,0,0,1)] border-[var(--primary)]/40 bg-[var(--bg-card)] rounded-none sm:rounded-3xl overflow-hidden"
                            >
                                <div className="scanline"></div>
                                
                                {/* Modal Header */}
                                <div className="terminal-header py-4 md:py-5 px-5 md:px-10 border-b border-[var(--border)] bg-[var(--bg-ui)]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
                                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                        <div className="flex gap-1.5 md:gap-2 mr-2 md:mr-6 flex-shrink-0">
                                            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_12px_#ff5f56] cursor-pointer hover:scale-125 transition-transform" onClick={closeProject}></div>
                                            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_#ffbd2e]"></div>
                                            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_12px_#27c93f]"></div>
                                        </div>
                                        <div className="h-5 w-px bg-[var(--border)] mx-1 opacity-50"></div>
                                        <span className="system-label text-[9px] md:text-[11px] font-black tracking-[0.25em] md:tracking-[0.4em] text-[var(--primary)] uppercase italic truncate max-w-[150px] xs:max-w-[250px] md:max-w-none">
                                            {selectedProject.title}
                                        </span>
                                    </div>
                                    <button onClick={closeProject} className="text-[var(--text-muted)] hover:text-[var(--primary)] p-1.5 transition-all hover:rotate-90">
                                        <span className="material-symbols-outlined text-2xl">close</span>
                                    </button>
                                </div>

                                <div className="flex-grow overflow-y-auto hide-scrollbar scroll-smooth">
                                    {/* Visual Engine: Images */}
                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div className="w-full bg-[var(--bg-primary)] py-8 px-4 md:px-10">
                                            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-p-10 hide-scrollbar">
                                                {selectedProject.images.map((imgUrl: string, i: number) => (
                                                    <div key={i} className="aspect-video shrink-0 w-[90%] md:w-[80%] lg:w-[70%] rounded-2xl overflow-hidden border-2 border-[var(--border)] relative bg-[var(--bg-ui)] shadow-2xl snap-center group/img">
                                                        <img
                                                            src={imgUrl}
                                                            alt={`${selectedProject.title} ${i + 1}`}
                                                            className="w-full h-full object-cover cursor-zoom-in group-hover/img:scale-110 transition-transform duration-1000"
                                                            onDoubleClick={() => setZoomedImage(imgUrl)}
                                                            onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Technical Content */}
                                    <div className="p-4 xs:p-6 md:p-10 lg:p-12 space-y-6 md:space-y-10">
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 md:gap-8 border-b border-[var(--border)] pb-8 md:pb-10">
                                            <div className="space-y-3 md:space-y-4 flex-1">
                                                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                    <div className="px-2 py-0.5 md:px-3 md:py-1 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 rounded-lg font-mono font-black text-[8px] md:text-[9px] tracking-widest uppercase">
                                                        {selectedProject.category || 'TECHNICAL_ASSET'}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-green-500 text-[8px] font-black uppercase tracking-widest">
                                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                        {t('repos_verified')}
                                                    </div>
                                                </div>
                                                <h2 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-black text-[var(--text-main)] italic tracking-tighter leading-[0.9] uppercase underline decoration-[var(--primary)]/30 decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8 text-left">
                                                    <span>{selectedProject.title}</span>
                                                </h2>
                                                <p className="text-sm md:text-lg text-[var(--text-soft)] leading-relaxed italic border-l-4 border-[var(--primary)]/20 pl-4 md:pl-6 py-1 md:py-2 max-w-3xl text-left">
                                                    <span>{selectedProject.description}</span>
                                                </p>
                                            </div>
                                            
                                            <div className="flex flex-row md:flex-col gap-2 md:gap-3 min-w-0 md:min-w-[240px]">
                                                {selectedProject.demo && selectedProject.demo.trim() !== '' && selectedProject.demo !== 'null' && selectedProject.demo !== '#' && (
                                                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="tech-btn btn-primary flex-1 py-3 md:py-4 rounded-xl shadow-[0_5px_15px_var(--primary-glow)]">
                                                        <span className="material-symbols-outlined text-base md:text-lg">rocket_launch</span>
                                                        <span className="hidden xs:inline">LIVE</span>
                                                    </a>
                                                )}
                                                {selectedProject.github && (
                                                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="tech-btn btn-outline flex-1 py-3 md:py-4 rounded-xl">
                                                        <span className="material-symbols-outlined text-base md:text-lg">code</span>
                                                        <span className="hidden xs:inline">{t('cat_back') === 'Backend' ? 'SOURCE' : 'CÓDIGO'}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Grid of Case Study Blocks */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                                            {selectedProject.problem && (
                                                <div className="group/box p-5 md:p-8 rounded-2xl md:rounded-3xl border border-red-500/10 bg-red-500/[0.02] space-y-3 md:space-y-4 hover:border-red-500/30 transition-all duration-500 shadow-inner">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                                                            <span className="material-symbols-outlined text-lg md:text-xl">warning</span>
                                                        </div>
                                                        <span className="system-label text-[9px] md:text-[10px] text-red-500/80 uppercase tracking-[0.2em] md:tracking-[0.3em] font-black italic">{t('challenge_analysis')}</span>
                                                    </div>
                                                    <p className="text-[13px] md:text-[15px] text-[var(--text-soft)] font-bold leading-relaxed opacity-90 italic">{selectedProject.problem}</p>
                                                </div>
                                            )}
                                            {selectedProject.solution && (
                                                <div className="group/box p-5 md:p-8 rounded-2xl md:rounded-3xl border border-green-500/10 bg-green-500/[0.02] space-y-3 md:space-y-4 hover:border-green-500/30 transition-all duration-500 shadow-inner">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                                            <span className="material-symbols-outlined text-lg md:text-xl">check_circle</span>
                                                        </div>
                                                        <span className="system-label text-[9px] md:text-[10px] text-green-500/80 uppercase tracking-[0.2em] md:tracking-[0.3em] font-black italic">{t('solution_strategy')}</span>
                                                    </div>
                                                    <p className="text-[13px] md:text-[15px] text-[var(--text-soft)] font-bold leading-relaxed opacity-90 italic">{selectedProject.solution}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Features & Technical Stack */}
                                        <div className="p-5 md:p-10 rounded-2xl md:rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-ui)]/30 space-y-6 md:space-y-8">
                                            <div className="flex items-center gap-4">
                                                <span className="system-label text-[9px] md:text-[10px] opacity-100 text-[var(--primary)] uppercase tracking-[0.4em] font-black">{t('stk_architecture')}</span>
                                                <div className="flex-1 h-px bg-gradient-to-r from-[var(--primary)]/30 to-transparent"></div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 md:gap-4">
                                                {(selectedProject.stack || []).map((tech: string) => {
                                                    const techId = tech.toLowerCase().trim().replace(/ /g, '').replace(/\.js/g, 'dotjs');
                                                    return (
                                                        <div key={tech} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-[var(--bg-card)] text-[var(--primary)] text-[9px] md:text-[11px] font-black font-mono uppercase tracking-widest border border-[var(--primary)]/20 shadow-md hover:-translate-y-1 transition-all duration-300 group/badge">
                                                            <img src={`https://cdn.simpleicons.org/${techId}/f43f5e`} alt={tech} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                            <span>{tech}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-6 md:px-10 bg-[var(--bg-ui)] border-t border-[var(--border)] flex items-center justify-between z-50">
                                    <div className="hidden md:block">
                                        <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-[0.5em] opacity-40 uppercase">SYSTEM_SESSION: {new Date().toLocaleDateString()} // AUTH_OK</span>
                                    </div>
                                    <button onClick={closeProject} className="tech-btn btn-outline py-3 px-10 border-2 border-[var(--primary)] text-[var(--primary)] font-black italic tracking-widest hover:bg-[var(--primary)] hover:text-white transition-all !rounded-xl">
                                        {t('terminate_audit')}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {zoomedImage && (
                <div className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomedImage(null)}>
                    <img src={zoomedImage} alt="Zoom" className="max-w-full max-h-full object-contain shadow-2xl" />
                </div>
            )}
        </main>
    );
};

export default ProjectsPage;
