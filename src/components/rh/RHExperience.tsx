import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { experience } from "../dataprojetcts/experience";
import { motion } from "framer-motion";

const RHExperience = () => {
    const { lang } = useContext(GlobalContext);

    const labels = {
        es: { title: "Trayectoria Profesional", subtitle: "Cronología de Impacto Institucional", download: "DESCARGAR CURRÍCULUM" },
        en: { title: "Professional Path", subtitle: "Institutional Impact Timeline", download: "DOWNLOAD RESUME" }
    };

    const t_rh = labels[lang as 'es' | 'en'] || labels.es;

    return (
        <main className="max-w-[1400px] mx-auto px-6 py-20 lg:py-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-32 text-left space-y-8 border-l-4 border-[#C5A059] pl-8 md:pl-12"
            >
                <div className="space-y-4">
                    <span className="text-sm md:text-lg text-[#C5A059] font-black tracking-[0.5em] uppercase opacity-80">
                        {t_rh.subtitle}
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white tracking-tighter leading-[1.1] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {t_rh.title}
                    </h1>
                </div>
                
                <div className="max-w-3xl">
                    <p className="text-xl md:text-2xl text-gray-400 font-serif italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {lang === 'es' 
                            ? "Una trayectoria definida por la arquitectura técnica sólida y la entrega de soluciones institucionales que optimizan procesos críticos."
                            : "A trajectory defined by solid technical architecture and the delivery of institutional solutions that optimize critical processes."}
                    </p>
                </div>
            </motion.div>

            <div className="space-y-32 relative">
                {/* Visual Timeline Line - High Contrast */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A059] via-[#C5A059]/10 to-transparent z-0 opacity-20"></div>

                {experience.map((ex, i) => {
                    const title = lang === 'es' ? ex.titleEs : ex.titleEn;
                    const period = lang === 'es' ? ex.periodEs : ex.periodEn;
                    const company = lang === 'es' ? ex.companyEs : ex.companyEn;
                    const desc = lang === 'es' ? ex.descriptionEs : ex.descriptionEn;
                    const features = lang === 'es' ? (ex.details?.featuresEs || []) : (ex.details?.featuresEn || []);
                    const architecture = lang === 'es' ? (ex.details?.architectureEs || []) : (ex.details?.architectureEn || []);

                    const isEven = i % 2 === 0;

                    return (
                        <motion.div 
                            key={ex.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Marker on timeline */}
                            <div className="absolute left-[16px] md:left-1/2 md:-ml-[5px] top-12 w-2.5 h-2.5 rounded-full bg-[#0b0c0e] border-2 border-[#C5A059] z-10 shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>

                            <div className={`w-full md:w-1/2 pt-12 md:pt-16 ${isEven ? 'md:text-right md:pr-16 lg:pr-24' : 'md:text-left md:pl-16 lg:pl-24'}`}>
                                <div className="space-y-6">
                                    <div className={`flex items-center gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                        <span className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase order-2">
                                            {period}
                                        </span>
                                        <div className="h-px w-8 bg-[#C5A059]/30 order-1"></div>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight break-words hyphens-auto max-w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {company}
                                    </h3>
                                    <div className={`flex flex-col gap-2 w-full ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest bg-white/[0.03] px-4 py-2 rounded-lg border border-white/5 inline-block break-words whitespace-normal max-w-full">
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <div className="h-full p-6 md:p-12 bg-white/[0.02] backdrop-blur-2xl rounded-3xl md:rounded-[2.5rem] border border-white/5 space-y-8 md:space-y-10 group hover:bg-white/[0.04] transition-all duration-700 relative overflow-hidden flex flex-col justify-between">
                                    <div className="absolute top-0 left-0 w-px h-0 group-hover:h-full bg-gradient-to-b from-[#C5A059] to-transparent transition-all duration-1000"></div>
                                    
                                    <div className="space-y-10">
                                        <p className="text-xl md:text-2xl text-gray-300 font-serif italic leading-relaxed opacity-90" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {desc}
                                        </p>
                                        
                                        <div className="grid sm:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <p className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.3em]">Resultados & Impacto</p>
                                                <ul className="space-y-4">
                                                    {features.map((feat: string, fIdx: number) => (
                                                        <li key={fIdx} className="flex items-start gap-4 text-xs text-gray-400 font-bold leading-relaxed group/item">
                                                            <div className="w-1 h-1 rounded-full bg-[#C5A059] mt-2 group-hover/item:scale-150 transition-transform"></div>
                                                            <span className="group-hover:text-white transition-colors">{feat}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {architecture && architecture.length > 0 && (
                                                <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-10">
                                                    <p className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.3em]">Arquitectura</p>
                                                    <ul className="space-y-4">
                                                        {architecture.map((arch: string, aIdx: number) => (
                                                            <li key={aIdx} className="flex items-start gap-4 text-xs text-gray-500 font-bold leading-relaxed border-b border-white/[0.02] pb-2 italic">
                                                                <span className="material-symbols-outlined text-[10px] text-[#C5A059]/40">layers</span>
                                                                {arch}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-10 border-t border-white/5">
                                        {ex.stack.split(' • ').map(tech => (
                                            <span key={tech} className="px-4 py-2 bg-white/[0.03] text-gray-500 text-[9px] font-black rounded-full uppercase tracking-widest border border-white/5 hover:text-white hover:border-[#C5A059]/30 transition-all">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 md:mt-48 p-8 md:p-20 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl md:rounded-[3rem] text-center space-y-8 md:space-y-10 relative overflow-hidden group shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[150px]"></div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                    <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] text-[#C5A059] uppercase block">Oportunidades Estratégicas</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white tracking-tighter leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {lang === 'es' ? "¿Listo para escalar su próximo sistema?" : "Ready to scale your next system?"}
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 relative z-10 pt-6 md:pt-10">
                    <button className="w-full md:w-auto px-8 py-5 md:px-16 md:py-8 bg-[#C5A059] text-black rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs shadow-2xl shadow-[#C5A059]/20 hover:scale-105 active:scale-95 transition-all">
                        {t_rh.download}
                    </button>
                    <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 pb-2 md:pb-0 md:pl-10 w-full md:w-auto">
                        <span className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Contacto Ejecutivo</span>
                        <span className="text-white font-serif italic text-lg md:text-xl break-all px-4 md:px-0">anahi.lozano@consultancy.pro</span>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default RHExperience;
