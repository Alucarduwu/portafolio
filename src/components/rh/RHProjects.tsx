import { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useGithubProjects, type Project } from "../../hooks/useGithubProjects";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.18)";

const RHProjects = () => {
    const { lang } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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

    const labels = {
        es: {
            title: "Catálogo de Soluciones",
            subtitle: "Ingeniería Estratégica & Casos de Éxito",
            view_project: "CONSULTAR DETALLES",
            visit: "EJECUCIÓN",
            source: "REPOSITORIO"
        },
        en: {
            title: "Solutions Catalog",
            subtitle: "Strategic Engineering & Success Cases",
            view_project: "CASE DETAILS",
            visit: "EXECUTION",
            source: "REPOSITORY"
        }
    };

    const t_rh = labels[lang as 'es' | 'en'] || labels.es;

    return (
        <main className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 lg:py-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-20 pl-7 md:pl-10 space-y-4"
                style={{ borderLeft: `3px solid ${GOLD}` }}
            >
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#F8F5F0] tracking-tight leading-[1.1]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {t_rh.title}
                </h1>
                <p className="text-sm md:text-lg font-black tracking-[0.5em] uppercase opacity-80" style={{ color: GOLD }}>
                    {t_rh.subtitle}
                </p>
            </motion.div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 animate-spin" style={{ borderTopColor: GOLD }} />
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase animate-pulse" style={{ color: GOLD }}>
                        {lang === 'es' ? 'Cargando soluciones...' : 'Loading solutions...'}
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.08 }}
                            className={`group relative p-8 rounded-3xl transition-all duration-500 flex flex-col h-full ${
                                i % 3 === 1 ? 'lg:mt-16' : i % 3 === 2 ? 'lg:mt-32' : ''
                            } ${i % 2 !== 0 ? 'md:mt-12 lg:mt-0' : ''}`}
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                            }}
                        >
                            <div className="space-y-5 flex-1">
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black tracking-[0.4em] uppercase italic" style={{ color: GOLD, opacity: 0.7 }}>
                                        {p.category}
                                    </span>
                                    <h3
                                        className="text-xl md:text-2xl font-serif italic text-[#F8F5F0] leading-tight group-hover:text-[#E8C97A] transition-colors"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {p.title}
                                    </h3>
                                </div>

                                <p className="text-[#7A7872] text-sm font-medium italic line-clamp-3 leading-relaxed">
                                    {p.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {p.stack.slice(0, 3).map(s => (
                                        <span
                                            key={s}
                                            className="px-3 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                color: "#5A5A54",
                                                border: "1px solid rgba(255,255,255,0.05)",
                                            }}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                    {p.stack.length > 3 && (
                                        <span className="text-[9px] font-black" style={{ color: `${GOLD}40` }}>
                                            +{p.stack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="pt-6 mt-auto">
                                    <button
                                        onClick={() => setSelectedProject(p)}
                                        className="w-full py-4 rounded-full font-black tracking-widest uppercase text-[10px] transition-all duration-300"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            color: "#C8C4BB",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = GOLD;
                                            (e.currentTarget as HTMLElement).style.color = "#000";
                                            (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                                            (e.currentTarget as HTMLElement).style.color = "#C8C4BB";
                                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        }}
                                    >
                                        {t_rh.view_project}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 backdrop-blur-3xl"
                                style={{ background: "rgba(8,9,10,0.96)" }}
                                onClick={() => setSelectedProject(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-y-auto hide-scrollbar relative z-10"
                                style={{
                                    background: "#0e0f11",
                                    border: `1px solid ${GOLD_BORDER}`,
                                    boxShadow: "0 0 100px rgba(0,0,0,0.8)",
                                }}
                            >
                                <div className="p-6 md:p-14 space-y-10 md:space-y-14">
                                    <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 pb-8 md:pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                        <div className="space-y-4 max-w-4xl">
                                            <span className="text-[10px] font-black tracking-[0.4em] uppercase italic" style={{ color: GOLD, opacity: 0.7 }}>
                                                {selectedProject.category}
                                            </span>
                                            <h2
                                                className="text-2xl sm:text-4xl md:text-6xl font-serif italic text-[#F8F5F0] leading-[1.1] tracking-tight"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {selectedProject.title}
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-[#7A7872] transition-all hover:text-white"
                                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                                (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-2xl">close</span>
                                        </button>
                                    </div>

                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div
                                            className="w-full relative cursor-zoom-in group/gallery"
                                            onClick={() => setActiveImageIndex(0)}
                                        >
                                            <div className="aspect-video md:aspect-[21/9] w-full rounded-2xl overflow-hidden relative" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <img
                                                    src={selectedProject.images[0]}
                                                    alt={selectedProject.title}
                                                    className="w-full h-full object-cover group-hover/gallery:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,10,0.6), transparent)" }} />
                                                <div className="absolute bottom-5 right-6 flex items-center gap-3 px-4 py-2 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                                    <span className="material-symbols-outlined text-lg" style={{ color: GOLD }}>photo_library</span>
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedProject.images.length} IMG</span>
                                                </div>
                                            </div>
                                            {selectedProject.images.length > 1 && (
                                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl" style={{ background: "rgba(8,9,10,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                                    {selectedProject.images.slice(0, 4).map((img, idx) => (
                                                        <div key={idx} className="w-12 h-10 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {selectedProject.images.length > 4 && (
                                                        <div className="w-12 h-10 rounded-lg flex items-center justify-center text-[#7A7872] text-[10px] font-black" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                                                            +{selectedProject.images.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-3 gap-12">
                                        <div className="md:col-span-2 space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: GOLD, opacity: 0.7 }}>
                                                    {lang === 'es' ? 'Resumen Ejecutivo' : 'Executive Summary'}
                                                </h4>
                                                <p
                                                    className="text-xl text-[#C8C4BB] font-serif italic leading-relaxed"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                                >
                                                    {selectedProject.description}
                                                </p>
                                            </div>

                                            <div className="grid gap-6">
                                                {(selectedProject.problem || selectedProject.solution) && (
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {selectedProject.problem && (
                                                            <div className="p-8 rounded-2xl space-y-3" style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${GOLD_BORDER}` }}>
                                                                <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: GOLD }}>
                                                                    {lang === 'es' ? 'El Desafío' : 'The Challenge'}
                                                                </h5>
                                                                <p className="text-sm text-[#7A7872] font-medium leading-relaxed italic">{selectedProject.problem}</p>
                                                            </div>
                                                        )}
                                                        {selectedProject.solution && (
                                                            <div className="p-8 rounded-2xl space-y-3" style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${GOLD_BORDER}` }}>
                                                                <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: GOLD }}>
                                                                    {lang === 'es' ? 'Valor Institucional' : 'Institutional Value'}
                                                                </h5>
                                                                <p className="text-sm text-[#7A7872] font-medium leading-relaxed italic">{selectedProject.solution}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {selectedProject.technical_challenges && (
                                                    <div className="p-8 rounded-2xl space-y-3" style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${GOLD}60` }}>
                                                        <h5 className="text-[10px] font-black uppercase tracking-widest" style={{ color: GOLD }}>
                                                            {lang === 'es' ? 'Retos Técnicos' : 'Technical Challenges'}
                                                        </h5>
                                                        <p className="text-sm text-[#7A7872] font-medium leading-relaxed italic whitespace-pre-line">{selectedProject.technical_challenges}</p>
                                                    </div>
                                                )}

                                                {selectedProject.learning && (
                                                    <div className="p-8 rounded-2xl space-y-3" style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}>
                                                        <h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: GOLD }}>
                                                            <span className="material-symbols-outlined text-sm">psychology</span>
                                                            {lang === 'es' ? 'Aprendizajes & Impacto' : 'Learnings & Impact'}
                                                        </h5>
                                                        <p className="text-sm text-[#C8C4BB] font-medium leading-relaxed italic">{selectedProject.learning}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: GOLD, opacity: 0.7 }}>
                                                    {lang === 'es' ? 'Matriz Técnica' : 'Tech Matrix'}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.stack.map(s => (
                                                        <span
                                                            key={s}
                                                            className="px-3 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest"
                                                            style={{
                                                                background: "rgba(255,255,255,0.03)",
                                                                color: "#7A7872",
                                                                border: "1px solid rgba(255,255,255,0.05)",
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedProject.status && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: GOLD, opacity: 0.7 }}>
                                                        {lang === 'es' ? 'Estado & Roadmap' : 'Status & Roadmap'}
                                                    </h4>
                                                    <div className="p-5 rounded-2xl space-y-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#C8C4BB]">{selectedProject.status}</span>
                                                        </div>
                                                        {selectedProject.future && (
                                                            <p className="text-[10px] text-[#5A5A54] font-medium italic border-t border-white/5 pt-3 line-clamp-4">{selectedProject.future}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: GOLD, opacity: 0.7 }}>
                                                    {lang === 'es' ? 'Acciones Directas' : 'Direct Actions'}
                                                </h4>
                                                <div className="grid gap-3">
                                                    {selectedProject.demo && selectedProject.demo !== 'null' && selectedProject.demo.startsWith('http') && (
                                                        <a
                                                            href={selectedProject.demo}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-full py-4 rounded-full font-black tracking-widest uppercase text-[10px] text-center text-black transition-all duration-300 hover:scale-105"
                                                            style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}
                                                        >
                                                            {t_rh.visit}
                                                        </a>
                                                    )}
                                                    {selectedProject.github && (
                                                        <a
                                                            href={selectedProject.github}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-full py-4 rounded-full font-black tracking-widest uppercase text-[10px] text-center text-[#C8C4BB] transition-all duration-300 hover:text-white"
                                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                                                        >
                                                            {t_rh.source}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Lightbox Carousel Portal */}
            {createPortal(
                <AnimatePresence>
                    {activeImageIndex !== null && selectedProject && selectedProject.images && (
                        <div className="fixed inset-0 z-[200000] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(20px)" }}>
                            <button
                                onClick={() => setActiveImageIndex(null)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-2xl flex items-center justify-center text-[#7A7872] hover:text-white transition-all z-50"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>

                            <motion.div
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full p-6 md:p-16 flex items-center justify-center"
                            >
                                <img
                                    src={selectedProject.images[activeImageIndex]}
                                    alt="Project Preview"
                                    className="max-w-full max-h-full object-contain rounded-xl"
                                    style={{ boxShadow: `0 0 60px rgba(201,168,76,0.08)` }}
                                />
                            </motion.div>

                            {selectedProject.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === null ? 0 : (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length); }}
                                        className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all z-50 group"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = "#000"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                                    >
                                        <span className="material-symbols-outlined text-2xl">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === null ? 0 : (prev + 1) % selectedProject.images!.length); }}
                                        className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all z-50 group"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = "#000"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                                    >
                                        <span className="material-symbols-outlined text-2xl">chevron_right</span>
                                    </button>
                                </>
                            )}

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full font-black tracking-widest text-xs text-white" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
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

export default RHProjects;
