import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const RHContactPage = () => {
    const { lang } = useContext(GlobalContext);

    const labels = {
        es: { 
            title: "Consultoría & Contacto", 
            subtitle: "¿Listo para impulsar su próximo hito institucional?",
            desc: "Disponible para aperturas de liderazgo técnico, colaboraciones estratégicas y arquitectura de software de alto nivel. Establezcamos una conexión profesional.",
            email_btn: "INICIAR CONTACTO",
            cv_btn: "DOSSIER PROFESIONAL",
            social_title: "Canales Corporativos"
        },
        en: { 
            title: "Consultancy & Contact", 
            subtitle: "Ready to drive your next institutional milestone?",
            desc: "Available for technical leadership openings, strategic collaborations, and high-level software architecture. Let's establish a professional connection.",
            email_btn: "START CONTACT",
            cv_btn: "PROFESSIONAL DOSSIER",
            social_title: "Corporate Channels"
        }
    };

    const t_rh = labels[lang as 'es' | 'en'] || labels.es;

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-20 lg:py-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-20 text-center space-y-4"
            >
                <h1 className="text-3xl md:text-4xl lg:text-4xl font-serif text-white tracking-tighter leading-none italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t_rh.title}
                </h1>
                <p className="text-xl text-[#C5A059] font-black tracking-[0.3em] uppercase opacity-80">
                    {t_rh.subtitle}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-7 space-y-12">
                    <section className="p-12 bg-white/[0.02] backdrop-blur-xl rounded-[3rem] border border-white/5 space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#C5A059] to-transparent"></div>
                        <div className="space-y-6">
                            <h2 className="text-xs font-black tracking-[0.4em] text-[#C5A059] uppercase">Propuesta de Valor</h2>
                            <p className="text-3xl text-gray-300 font-serif italic leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {t_rh.desc}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-6">
                            <a href="mailto:anahydlira@gmail.com" className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-[#C5A059] text-black rounded-full font-black tracking-widest uppercase text-[10px] text-center shadow-2xl shadow-[#C5A059]/10 hover:scale-105 transition-all">
                                {t_rh.email_btn}
                            </a>
                            <div className="flex items-center justify-center sm:justify-start gap-4 px-6 md:px-8 py-4 bg-white/[0.03] border border-white/5 rounded-full font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest min-w-[220px]">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
                                Tiempo de respuesta: &lt; 24h
                            </div>
                        </div>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-8">
                        <a href="/Cv Anahi Betzabe Lozano de Lira.pdf" target="_blank" className="p-10 bg-white/[0.02] text-white rounded-[3rem] space-y-6 hover:bg-white/[0.05] transition-all border border-white/5 group">
                            <span className="material-symbols-outlined text-[#C5A059] text-5xl opacity-40 group-hover:opacity-100 transition-opacity">description</span>
                            <div>
                                <h3 className="text-xl font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>Curriculum Vitae</h3>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 italic">Formato Estándar</p>
                            </div>
                        </a>
                        <a href="/Anahi_Lozano_Harvard_CV.pdf" target="_blank" className="p-10 bg-[#C5A059]/5 text-white rounded-[3rem] space-y-6 hover:bg-[#C5A059]/10 transition-all border border-[#C5A059]/20 group">
                            <span className="material-symbols-outlined text-[#C5A059] text-5xl">workspace_premium</span>
                            <div>
                                <h3 className="text-xl font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>Executive Resume</h3>
                                <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest mt-1 italic">Harvard Methodology</p>
                            </div>
                        </a>
                    </section>
                </div>

                <div className="lg:col-span-5">
                    <section className="p-12 bg-white/[0.02] backdrop-blur-xl rounded-[4rem] border border-white/5 space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[100px]"></div>
                        <h2 className="text-xs font-black tracking-[0.4em] text-[#C5A059] uppercase">{t_rh.social_title}</h2>
                        
                        <div className="space-y-6 md:space-y-8">
                            <a href="https://www.linkedin.com/in/anahi-lozano-de-lira-a4213a187/" target="_blank" rel="noreferrer" className="flex items-center gap-4 sm:gap-6 md:gap-8 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] hover:bg-white/[0.05] transition-all group border border-white/5 overflow-hidden">
                                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white/[0.03] flex items-center justify-center text-gray-400 border border-white/10 group-hover:border-[#C5A059]/50 group-hover:text-[#C5A059] transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">work</span>
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <p className="text-base sm:text-lg font-serif italic text-white truncate block" style={{ fontFamily: "'Playfair Display', serif" }}>LinkedIn</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest italic block truncate">Corporate Profile</p>
                                </div>
                            </a>

                            <a href="https://github.com/Alucarduwu/portafolio" target="_blank" rel="noreferrer" className="flex items-center gap-4 sm:gap-6 md:gap-8 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] hover:bg-white/[0.05] transition-all group border border-white/5 overflow-hidden">
                                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white/[0.03] flex items-center justify-center text-gray-400 border border-white/10 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">code</span>
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <p className="text-base sm:text-lg font-serif italic text-white truncate block" style={{ fontFamily: "'Playfair Display', serif" }}>GitHub</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest italic block truncate">Code Assets</p>
                                </div>
                            </a>

                            <div className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-[#C5A059]/5 border border-[#C5A059]/10 flex items-center gap-4 sm:gap-6 md:gap-8 overflow-hidden">
                                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-[#C5A059] flex items-center justify-center text-black">
                                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">alternate_email</span>
                                </div>
                                <div className="space-y-1 min-w-0 flex-1">
                                    <p className="text-base sm:text-lg font-serif italic text-white block break-all" style={{ fontFamily: "'Playfair Display', serif" }}>anahydlira@gmail.com</p>
                                    <p className="text-[9px] md:text-[10px] text-[#C5A059] font-black uppercase tracking-widest italic block truncate">Primary Inbox</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/5 text-center">
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] italic mb-2">Designed for Excellence by Anahí</p>
                            <div className="w-8 h-[2px] bg-[#C5A059]/30 mx-auto"></div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default RHContactPage;
