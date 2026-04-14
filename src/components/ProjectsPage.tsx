import { useContext, useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useGithubProjects, type Project } from "../hooks/useGithubProjects";
import { motion, AnimatePresence } from "framer-motion";
import RHProjects from "./rh/RHProjects";

const isMobile = (p: Project) => {
    const stack = (p.stack || []).join(' ').toLowerCase();
    return stack.includes('kotlin') || stack.includes('android') || stack.includes('flutter') || stack.includes('react native') || stack.includes('compose');
};

const ProjectsPage = () => {
    const { t, lang, perspective } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const closeProject = () => {
        setSelectedProject(null);
        setActiveImageIndex(null);
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

    if (perspective === 'rh') {
        return <RHProjects />;
    }

    const ProjectCard = ({ p, index }: { p: Project; index: number }) => {
        const [imgError, setImgError] = useState(false);
        const firstImage = p.images && p.images.length > 0 ? p.images[0] : null;

        return (
            <motion.div 
                className="premium-card group relative flex flex-col h-full bg-[var(--bg-card)]/40 border-[var(--border)] hover:border-[var(--primary)] transition-all duration-500 hover:shadow-[0_20px_50px_var(--shadow-base),0_0_30px_var(--primary-glow)] rounded-2xl overflow-hidden"
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
                <div className="aspect-video w-full bg-[var(--bg-primary)] relative overflow-hidden group-hover:cursor-pointer border-b border-[var(--border)]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                    <div className="scanline"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[8px] font-mono font-black text-white/50 uppercase tracking-widest">Live_Connect</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1 space-y-3">
                    {/* Project Title */}
                    <div className="space-y-1">
                        <h3 className="text-sm font-black text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors uppercase italic tracking-tighter leading-snug line-clamp-2 md:line-clamp-1">
                            {p.title}
                        </h3>
                    </div>

                    {/* Terminal Metadata Block — visible BEFORE click */}
                    <div className="flex-1 rounded-lg bg-[var(--bg-ui)]/40 border border-[var(--primary)]/15 group-hover:border-[var(--primary)]/40 transition-all duration-500 overflow-hidden font-mono text-[10px] leading-relaxed">
                        {/* Block header */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[var(--primary)]/10 bg-[var(--primary)]/5">
                            <span className="text-[var(--primary)] opacity-50 text-[8px] font-black tracking-widest uppercase">PROJECT.json</span>
                        </div>
                        {/* Meta rows */}
                        <div className="px-3 py-2.5 space-y-1.5">
                            {/* type */}
                            <div className="flex items-start gap-1.5">
                                <span className="text-[var(--primary)] opacity-60 flex-shrink-0 mt-0.5">›</span>
                                <span className="text-[var(--text-muted)] flex-shrink-0">type:</span>
                                <span className="text-[var(--text-soft)] group-hover:text-[var(--text-main)] transition-colors line-clamp-1 italic opacity-80">
                                    {p.description}
                                </span>
                            </div>
                            {/* stack */}
                            <div className="flex items-start gap-1.5">
                                <span className="text-[var(--primary)] opacity-60 flex-shrink-0 mt-0.5">›</span>
                                <span className="text-[var(--text-muted)] flex-shrink-0">stack:</span>
                                <span className="text-[var(--primary)] opacity-80 group-hover:opacity-100 transition-opacity line-clamp-1">
                                    {(p.stack || []).join(' | ')}
                                </span>
                            </div>
                            {/* features */}
                            {p.features && p.features.length > 0 && (
                                <div className="flex items-start gap-1.5">
                                    <span className="text-[var(--primary)] opacity-60 flex-shrink-0 mt-0.5">›</span>
                                    <span className="text-[var(--text-muted)] flex-shrink-0">features:</span>
                                    <span className="text-green-400/70 group-hover:text-green-400 transition-colors line-clamp-1">
                                        {p.features.slice(0,3).join(', ')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Interaction */}
                <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-500 bg-[var(--bg-ui)]/20">
                     <span className="text-[8px] font-mono font-black text-[var(--primary)] tracking-widest uppercase italic opacity-70">open_record →</span>
                     <span className="material-symbols-outlined text-sm text-[var(--primary)] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
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
                                className="absolute inset-0 bg-[var(--bg-primary)]/85 backdrop-blur-2xl" 
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
                                        <span className="system-label text-[9px] md:text-[11px] font-black tracking-[0.25em] md:tracking-[0.4em] text-[var(--primary)] uppercase italic leading-tight">
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
                                                            onClick={() => setActiveImageIndex(i)}
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
                                                {selectedProject.demo && selectedProject.demo.trim() !== '' && selectedProject.demo !== 'null' && selectedProject.demo !== '#' && selectedProject.demo.startsWith('http') && (
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

                                        {/* HIGH-RELEVANCE TECH STACK (Moved up for Dev Mode) */}
                                        <div className="relative p-6 md:p-8 rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.02] overflow-hidden group/dna">
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-black text-[60px] md:text-[80px] select-none pointer-events-none tracking-tighter italic font-mono">_DNA</div>
                                            <div className="relative z-10 space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"></span>
                                                        <span className="system-label text-[10px] md:text-xs font-black text-white/90 tracking-[0.3em] uppercase">{t('tech_stack') || 'CORE_TECH_DNA'}</span>
                                                    </div>
                                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--primary)]/40 to-transparent opacity-30"></div>
                                                </div>
                                                <div className="flex flex-wrap gap-3 md:gap-4">
                                                    {(selectedProject.stack || []).map((tech: string) => {
                                                        const techId = tech.toLowerCase().trim().replace(/ /g, '').replace(/\.js/g, 'dotjs');
                                                        return (
                                                            <div key={tech} className="group/chip flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-[var(--primary)]/50 transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                                <img 
                                                                    src={`https://cdn.simpleicons.org/${techId}/ffffff`} 
                                                                    alt={tech} 
                                                                    className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-40 group-hover/chip:opacity-100 transition-opacity" 
                                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                                                />
                                                                <span className="text-[10px] md:text-[12px] font-black text-white/70 group-hover/chip:text-white tracking-widest uppercase font-mono">{tech}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
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

                                        {/* Professional Dossier Extension */}
                                        {(selectedProject.technical_challenges || selectedProject.learning) && (
                                            <div className="space-y-6">
                                                {selectedProject.technical_challenges && (
                                                    <div className="p-6 md:p-8 rounded-2xl border border-[var(--primary)]/10 bg-[var(--bg-ui)]/20 space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-[var(--primary)] text-sm">engineering</span>
                                                            <span className="system-label text-[9px] uppercase tracking-widest text-[var(--primary)] opacity-70">TECHNICAL_CHALLENGES_LOG</span>
                                                        </div>
                                                        <p className="text-[12px] md:text-[14px] text-[var(--text-soft)] leading-relaxed italic opacity-80 whitespace-pre-line">{selectedProject.technical_challenges}</p>
                                                    </div>
                                                )}
                                                {selectedProject.learning && (
                                                    <div className="p-6 md:p-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-blue-400 text-sm">psychology</span>
                                                            <span className="system-label text-[9px] uppercase tracking-widest text-blue-400 opacity-70">KNOWLEDGE_ACQUIRED</span>
                                                        </div>
                                                        <p className="text-[12px] md:text-[14px] text-[var(--text-soft)] leading-relaxed italic opacity-80">{selectedProject.learning}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Status & Future Roadmap */}
                                        {selectedProject.status && (
                                            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-green-500/[0.03] to-transparent border border-green-500/10">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                        <div className="flex flex-col">
                                                            <span className="system-label text-[8px] text-green-500 opacity-60 uppercase tracking-widest">CURRENT_STATUS</span>
                                                            <span className="text-[11px] font-black uppercase tracking-widest text-white">{selectedProject.status}</span>
                                                        </div>
                                                    </div>
                                                    {selectedProject.future && (
                                                        <div className="flex-1 md:ml-12 border-l md:border-l border-white/5 pl-6">
                                                            <span className="system-label text-[8px] text-[var(--primary)] opacity-60 uppercase tracking-widest block mb-1">ROADMAP_v2.0</span>
                                                            <p className="text-[10px] text-[var(--text-muted)] italic leading-tight">{selectedProject.future}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Core Features */}
                                        {selectedProject.features && selectedProject.features.length > 0 && (
                                            <div className="p-5 md:p-10 rounded-2xl md:rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-ui)]/30 space-y-6 md:space-y-8">
                                                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                                                            <span className="material-symbols-outlined text-xl md:text-2xl">architecture</span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] uppercase tracking-tighter">System Architecture</h3>
                                                            <span className="system-label text-[8px] md:text-[10px] text-[var(--primary)]/60 uppercase tracking-[0.2em] md:tracking-[0.4em] block">FEATURE_MANIFEST v2.1.0</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {selectedProject.architecture && (
                                                        <div className="flex-1 mt-4 md:mt-0 p-4 border-l-2 border-[var(--primary)]/30 bg-[var(--primary)]/[0.02]">
                                                            <p className="text-[12px] md:text-[13px] text-[var(--text-soft)] italic font-medium leading-relaxed">
                                                                <strong className="text-[var(--primary)] uppercase text-[10px] tracking-widest block mb-1">Architecture Pattern:</strong>
                                                                {selectedProject.architecture}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                    {selectedProject.features.map((feature, i) => (
                                                        <div key={i} className="flex gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[var(--primary)]/20 transition-all duration-300 group/item">
                                                            <span className="text-[var(--primary)] text-[10px] md:text-xs font-black opacity-30 group-hover:opacity-100 transition-opacity">{(i + 1).toString().padStart(2, '0')}</span>
                                                            <p className="text-[12px] md:text-[14px] text-[var(--text-soft)] font-bold italic opacity-80 group-hover:opacity-100 transition-opacity flex-1">{feature}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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

            {/* Dev Mode Lightbox Carousel Portal */}
            {createPortal(
                <AnimatePresence>
                    {activeImageIndex !== null && selectedProject && selectedProject.images && (
                        <div className="fixed inset-0 z-[200000] flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-2xl">
                            {/* Close Button */}
                            <button 
                                onClick={() => setActiveImageIndex(null)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                            >
                                <span className="material-symbols-outlined text-xl md:text-3xl">close</span>
                            </button>

                            {/* Main Image View */}
                            <motion.div 
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full p-4 md:p-12 lg:p-20 flex items-center justify-center"
                            >
                                <img 
                                    src={selectedProject.images[activeImageIndex]} 
                                    alt="Project Preview" 
                                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl drop-shadow-[0_0_50px_var(--primary-glow)]"
                                />
                            </motion.div>

                            {/* Navigation Prev */}
                            {selectedProject.images.length > 1 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex(prev => prev === null ? 0 : (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
                                    }}
                                    className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--text-soft)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all z-50 group shadow-lg"
                                >
                                    <span className="material-symbols-outlined text-2xl md:text-4xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
                                </button>
                            )}

                            {/* Navigation Next */}
                            {selectedProject.images.length > 1 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex(prev => prev === null ? 0 : (prev + 1) % selectedProject.images!.length);
                                    }}
                                    className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--text-soft)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all z-50 group shadow-lg"
                                >
                                    <span className="material-symbols-outlined text-2xl md:text-4xl group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            )}

                            {/* Photo Counter */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 border border-[var(--primary)]/30 backdrop-blur-md text-[var(--primary)] font-black tracking-widest text-xs shadow-[0_0_15px_var(--primary-glow)]">
                                {activeImageIndex + 1} / {selectedProject.images.length}
                            </div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </main>
    );
};

export default ProjectsPage;
