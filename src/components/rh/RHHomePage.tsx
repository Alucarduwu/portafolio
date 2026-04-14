import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const RHHomePage = () => {
    const { lang } = useContext(GlobalContext);

    const content = {
        es: {
            greeting: "Ingeniería de Software & Soluciones de Negocio",
            role: "Software Developer Fullstack",
            tagline: "Desarrollo estratégico de alta fidelidad con enfoque en escalabilidad institucional.",
            about: "Soy Ingeniera en Tecnologías de la Información con especialidad en Aplicaciones Avanzadas. Mi valor reside en la intersección de la solvencia técnica y el impacto estratégico, garantizando soluciones robustas para el sector empresarial.",
            experience_btn: "TRAYECTORIA",
            contact_btn: "CONTACTO",
            metrics: [
                { label: "Trayectoria Tecnológica", value: "Desde 2024" },
                { label: "Soluciones de Alto Impacto", value: "10+" },
                { label: "Arquitectura & Backend", value: "Junior Mid" }
            ],
            expertise: [
                { area: "Arquitectura de Software", detail: "Diseño de sistemas distribuidos y patrones de diseño corporativos." },
                { area: "Fullstack Engineering", detail: "Especialista en React, Node.js y ecosistemas Cloud escalables." },
                { area: "Enterprise Solutions", detail: "Desarrollo de herramientas de gestión de alto rendimiento." },
                { area: "Liderazgo Técnico", detail: "Capacidad de toma de decisiones arquitectónicas y mentoría." }
            ]
        },
        en: {
            greeting: "Software Engineering & Business Solutions",
            role: "Fullstack Software Developer",
            tagline: "High-fidelity strategic development focused on institutional scalability.",
            about: "I am an Information Technology Engineer specialized in Advanced Applications. My value lies at the intersection of technical excellence and strategic impact, ensuring robust solutions for the business sector.",
            experience_btn: "EXPERIENCE",
            contact_btn: "CONTACT",
            metrics: [
                { label: "Technological Path", value: "Since 2024" },
                { label: "High Impact Solutions", value: "10+" },
                { label: "Architecture & Backend", value: "Junior Mid" }
            ],
            expertise: [
                { area: "Software Architecture", areaTitle: "Software Architecture", detail: "Design of distributed systems and corporate design patterns." },
                { area: "Fullstack Engineering", areaTitle: "Fullstack Engineering", detail: "Specialist in React, Node.js, and scalable Cloud ecosystems." },
                { area: "Enterprise Solutions", areaTitle: "Enterprise Solutions", detail: "Development of high-performance management tools." },
                { area: "Technical Leadership", areaTitle: "Technical Leadership", detail: "Architectural decision-making and mentorship capabilities." }
            ]
        }
    };

    const t_rh = content[lang as 'es' | 'en'] || content.es;

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-20 lg:py-32 flex flex-col items-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-12"
                >
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-[var(--primary)] opacity-50"></div>
                            <span className="text-[var(--primary)] font-black tracking-[0.3em] uppercase text-[10px]">
                               {t_rh.greeting}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif text-[var(--text-main)] tracking-tight leading-[1.2] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Anahí <br />
                            <span className="text-[var(--primary)]">Lozano</span>
                        </h1>
                        <h2 className="text-lg md:text-xl font-medium text-[var(--text-soft)] uppercase tracking-[0.2em] border-l border-[var(--primary)]/30 pl-6 py-1">
                            {t_rh.role}
                        </h2>
                    </div>

                    <p className="text-lg text-[var(--text-soft)] leading-[1.8] font-normal max-w-xl italic opacity-90 border-l border-[var(--primary)]/20 pl-6">
                        {t_rh.tagline}
                    </p>

                    <div className="p-10 bg-[var(--bg-ui)]/30 backdrop-blur-md rounded-3xl border border-[var(--border)] space-y-4 relative overflow-hidden group hover:border-[var(--primary)]/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--primary)] to-transparent opacity-50"></div>
                        <p className="text-base text-[var(--text-muted)] leading-[1.9] font-normal">
                            {t_rh.about}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                        {(t_rh.expertise as any[]).map((exp, i) => (
                            <div key={i} className="p-6 bg-[var(--bg-ui)]/20 border border-[var(--border)]/50 rounded-2xl hover:border-[var(--primary)]/30 transition-colors">
                                <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.2em] mb-3">{exp.area}</p>
                                <p className="text-[13px] text-[var(--text-muted)] font-normal leading-[1.7]">{exp.detail}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-6 pt-6">
                        <Link to="/experience" className="px-10 py-5 bg-[var(--primary)] text-white rounded-full font-bold tracking-[0.2em] uppercase text-[11px] shadow-2xl shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:-translate-y-1 active:scale-95 transition-all">
                            {t_rh.experience_btn}
                        </Link>
                        <Link to="/contact" className="px-10 py-5 bg-transparent text-[var(--text-main)] border border-[var(--border)] rounded-full font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-[var(--bg-ui)] active:scale-95 transition-all">
                            {t_rh.contact_btn}
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="relative"
                >
                    <div className="relative z-10 grid grid-cols-2 gap-6">
                        {t_rh.metrics.map((metric, i) => (
                            <div key={i} className={`p-6 md:p-8 bg-[var(--bg-ui)]/20 backdrop-blur-xl rounded-[2rem] md:rounded-3xl border border-[var(--border)] flex flex-col items-center justify-center text-center space-y-3 hover:-translate-y-2 hover:border-[var(--primary)]/30 transition-all duration-500 ${i === 0 ? 'col-span-2 py-10 md:py-14 bg-[var(--bg-ui)]/30' : ''}`}>
                                <span className={`font-serif italic tracking-tight text-[var(--text-main)] ${i === 0 ? 'text-4xl sm:text-5xl md:text-6xl text-[var(--primary)]' : 'text-2xl sm:text-3xl md:text-4xl'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {metric.value}
                                </span>
                                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase px-2">
                                    {metric.label}
                                </span>
                            </div>
                        ))}

                        <div className="col-span-2 p-6 md:p-10 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-[2rem] md:rounded-[2.5rem] border border-[var(--primary)]/20 text-[var(--text-main)] flex flex-col md:flex-row items-center justify-between overflow-hidden relative group gap-6 md:gap-0 text-center md:text-left">
                            <div className="relative z-10 space-y-2">
                                <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[var(--primary)] uppercase">Status</p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-serif italic tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Executive Consultation Ready</p>
                            </div>
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                                <span className="material-symbols-outlined text-[var(--primary)] text-2xl md:text-3xl">verified</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default RHHomePage;
