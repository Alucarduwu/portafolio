import { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useGithubProjects, type Project } from "../../hooks/useGithubProjects";
import { motion, AnimatePresence } from "framer-motion";

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
        <main className="max-w-[1400px] mx-auto px-6 py-20 lg:py-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-32 text-left space-y-6 border-l-4 border-[#C5A059] pl-8 md:pl-12"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-serif text-white tracking-tighter leading-[0.9] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t_rh.title}
                </h1>
                <p className="text-sm md:text-lg text-[#C5A059] font-black tracking-[0.5em] uppercase opacity-80">
                    {t_rh.subtitle}
                </p>
            </motion.div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="w-12 h-12 rounded-full border border-[#C5A059]/20 border-t-[#C5A059] animate-spin"></div>
                    <p className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase animate-pulse">Sincronizando Activos...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {projects.map((p, i) => (
                        <motion.div 
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`group relative p-10 bg-white/[0.02] border border-white/5 rounded-[4rem] hover:bg-white/[0.04] transition-all duration-700 flex flex-col h-full bg-grid-white/[0.02] ${
                                i % 3 === 1 ? 'lg:mt-16' : i % 3 === 2 ? 'lg:mt-32' : ''
                            } ${i % 2 !== 0 ? 'md:mt-16 lg:mt-0' : ''}`}
                        >
                            <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                    <span className="text-[9px] font-black tracking-[0.4em] text-[#C5A059] uppercase opacity-60 italic">{p.category}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-tight group-hover:text-[#C5A059] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
                                </div>
                                
                                <p className="text-gray-400 text-sm font-bold italic line-clamp-3 leading-relaxed opacity-70">
                                    {p.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {p.stack.slice(0, 3).map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-white/[0.03] text-gray-500 text-[8px] font-black rounded-full uppercase tracking-widest border border-white/5">{s}</span>
                                    ))}
                                    {p.stack.length > 3 && <span className="text-[9px] font-black text-white/20">+{p.stack.length - 3}</span>}
                                </div>

                                <div className="pt-8 mt-auto">
                                    <button 
                                        onClick={() => setSelectedProject(p)}
                                        className="w-full py-5 bg-white/[0.03] text-white border border-white/10 rounded-full font-black tracking-widest uppercase text-[10px] hover:bg-[#C5A059] hover:text-black transition-all group-hover:shadow-[0_0_30px_rgba(197,160,89,0.15)]"
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
                                className="absolute inset-0 bg-[#0b0c0e]/95 backdrop-blur-3xl"
                                onClick={() => setSelectedProject(null)}
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="bg-white/[0.02] w-full max-w-6xl max-h-[95vh] rounded-[2rem] md:rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] overflow-y-auto hide-scrollbar relative z-10"
                            >
                                <div className="p-6 md:p-20 space-y-12 md:space-y-16">
                                    <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-8 md:pb-12">
                                        <div className="space-y-4 md:space-y-6 max-w-4xl">
                                            <span className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase opacity-60 italic">{selectedProject.category}</span>
                                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic text-white leading-[1.1] tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedProject.title}</h2>
                                        </div>
                                        <button onClick={() => setSelectedProject(null)} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10 hover:bg-[#C5A059] hover:text-black hover:border-transparent self-end md:self-auto">
                                            <span className="material-symbols-outlined text-2xl md:text-3xl">close</span>
                                        </button>
                                    </div>

                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div 
                                            className="w-full relative shadow-2xl group/gallery cursor-zoom-in"
                                            onClick={() => setActiveImageIndex(0)}
                                        >
                                            {/* Main Image Banner */}
                                            <div className="aspect-video md:aspect-[21/9] w-full rounded-3xl md:rounded-[3.5rem] overflow-hidden border border-white/5 relative">
                                                <img 
                                                    src={selectedProject.images[0]} 
                                                    alt={selectedProject.title} 
                                                    className="w-full h-full object-cover group-hover/gallery:scale-105 transition-transform duration-700" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/80 via-transparent to-transparent"></div>
                                                
                                                {/* Gallery Hint */}
                                                <div className="absolute bottom-6 right-8 flex items-center gap-3 bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                                                    <span className="material-symbols-outlined text-[#C5A059] text-xl">photo_library</span>
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedProject.images.length} ARCHIVOS</span>
                                                </div>
                                            </div>

                                            {/* Preview Strip */}
                                            {selectedProject.images.length > 1 && (
                                                <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 p-2 md:p-3 bg-[#0b0c0e]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                                                    {selectedProject.images.slice(0, 4).map((img, idx) => (
                                                        <div key={idx} className="w-10 h-8 md:w-16 md:h-12 rounded-lg overflow-hidden border border-white/20 opacity-60 hover:opacity-100 transition-opacity">
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {selectedProject.images.length > 4 && (
                                                        <div className="w-10 h-8 md:w-16 md:h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/50 text-[10px] font-black">
                                                            +{selectedProject.images.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-3 gap-16">
                                        <div className="md:col-span-2 space-y-12">
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase italic opacity-60">Resumen Ejecutivo</h4>
                                                <p className="text-2xl text-gray-300 font-serif italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedProject.description}</p>
                                            </div>

                                            <div className="grid gap-8">
                                                {(selectedProject.problem || selectedProject.solution) && (
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        {selectedProject.problem && (
                                                            <div className="p-10 bg-white/[0.02] rounded-[2.5rem] border-l-2 border-[#C5A059]/20 space-y-4">
                                                                <h5 className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">El Desafío</h5>
                                                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic opacity-80">{selectedProject.problem}</p>
                                                            </div>
                                                        )}
                                                        {selectedProject.solution && (
                                                            <div className="p-10 bg-white/[0.02] rounded-[2.5rem] border-l-2 border-[#C5A059]/20 space-y-4">
                                                                <h5 className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">Valor Institucional</h5>
                                                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic opacity-80">{selectedProject.solution}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {selectedProject.technical_challenges && (
                                                    <div className="p-10 bg-white/[0.02] rounded-[2.5rem] border-l-2 border-[#C5A059]/30 space-y-4">
                                                        <h5 className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">Retos Técnicos de Ingeniería</h5>
                                                        <p className="text-sm text-gray-400 font-bold leading-relaxed italic opacity-80 whitespace-pre-line">{selectedProject.technical_challenges}</p>
                                                    </div>
                                                )}

                                                {selectedProject.learning && (
                                                    <div className="p-10 bg-[#C5A059]/5 rounded-[2.5rem] border border-[#C5A059]/10 space-y-4">
                                                        <h5 className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-sm">psychology</span>
                                                            Aprendizajes & Impacto
                                                        </h5>
                                                        <p className="text-sm text-gray-300 font-bold leading-relaxed italic opacity-90">{selectedProject.learning}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-12">
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase italic opacity-60">Matriz Técnica</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.stack.map(s => (
                                                        <span key={s} className="px-4 py-2 bg-white/[0.03] text-gray-400 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5">{s}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedProject.status && (
                                                <div className="space-y-6">
                                                    <h4 className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase italic opacity-60">Estado & Roadmap</h4>
                                                    <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{selectedProject.status}</span>
                                                        </div>
                                                        {selectedProject.future && (
                                                            <p className="text-[10px] text-gray-400 font-bold italic border-t border-white/5 pt-4 opacity-60 line-clamp-4">{selectedProject.future}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase italic opacity-60">Acciones Directas</h4>
                                                <div className="grid gap-4">
                                                    {selectedProject.demo && selectedProject.demo !== 'null' && selectedProject.demo.startsWith('http') && (
                                                        <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="w-full py-5 bg-[#C5A059] text-black rounded-full font-black tracking-widest uppercase text-[10px] text-center shadow-xl shadow-[#C5A059]/10 hover:scale-[1.02] transition-transform">
                                                            {t_rh.visit}
                                                        </a>
                                                    )}
                                                    {selectedProject.github && (
                                                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="w-full py-5 bg-transparent text-white border border-white/20 rounded-full font-black tracking-widest uppercase text-[10px] text-center hover:bg-white/5 transition-all">
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
                        <div className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
                            {/* Close Button */}
                            <button 
                                onClick={() => setActiveImageIndex(null)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-50"
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
                                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl drop-shadow-[0_0_50px_rgba(197,160,89,0.1)]"
                                />
                            </motion.div>

                            {/* Navigation Prev */}
                            {selectedProject.images.length > 1 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex(prev => prev === null ? 0 : (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
                                    }}
                                    className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#C5A059] hover:text-black transition-all z-50 group"
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
                                    className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#C5A059] hover:text-black transition-all z-50 group"
                                >
                                    <span className="material-symbols-outlined text-2xl md:text-4xl group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            )}

                            {/* Photo Counter */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white font-black tracking-widest text-xs">
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
