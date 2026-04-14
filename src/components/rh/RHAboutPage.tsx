import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useGithubProjects } from "../../hooks/useGithubProjects";
import { motion } from "framer-motion";

const RHAboutPage = () => {
    const { lang } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");

    const labels = {
        es: { 
            title: "Trayectoria & Perfil", 
            subtitle: "Excelencia en Ingeniería de Software",
            about: "Soy Ingeniera en Tecnologías de la Información y Comunicación centrada en el desarrollo de aplicaciones de alta complejidad. Mi práctica profesional se rige por la arquitectura limpia, la escalabilidad técnica y una visión estratégica para la resolución de problemas institucionales.",
            skills_extra: ["Arquitectura de Software", "Diseño de Sistemas", "Liderazgo Técnico", "Metodologías Ágiles", "Enfoque en Resultados", "Comunicación Efectiva"]
        },
        en: { 
            title: "Trajectory & Profile", 
            subtitle: "Software Engineering Excellence",
            about: "I am an Information and Communication Technologies Engineer focused on high-complexity application development. My professional practice is governed by clean architecture, technical scalability, and a strategic vision for solving institutional problems.",
            skills_extra: ["Software Architecture", "System Design", "Technical Leadership", "Agile Methodologies", "Results Oriented", "Effective Communication"]
        }
    };

    const t_rh = labels[lang as 'es' | 'en'] || labels.es;

    const skillCategories = [
        { label: 'Frontend', items: ['Angular', 'React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'] },
        { label: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Django', 'Laravel', '.NET', 'REST APIs', 'GraphQL'] },
        { label: 'Mobile / AI', items: ['Kotlin', 'Android Native', 'Dart / Flutter', 'Fuzzy Logic', 'MATLAB Automation'] },
        { label: 'Cloud / DB', items: ['SAP BTP', 'ABAP Cloud', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'] },
        { label: 'Ops / Test', items: ['Docker', 'Vercel', 'Git / GitHub', 'CI/CD Actions', 'Cypress', 'Playwright', 'Postman'] },
    ];

    return (
        <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-32 text-left space-y-6 border-l-4 border-[#C5A059] pl-8 md:pl-12"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tighter leading-[1.1] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t_rh.title}
                </h1>
                <p className="text-sm md:text-lg text-[#C5A059] font-black tracking-[0.5em] uppercase opacity-80">
                    {t_rh.subtitle}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-8 space-y-24">
                    <section className="relative p-6 md:p-14 bg-white/[0.02] backdrop-blur-2xl rounded-3xl md:rounded-[2.5rem] border border-white/5 space-y-8 group transition-all duration-700 hover:bg-white/[0.04]">
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.02] text-4xl md:text-6xl font-serif italic select-none pointer-events-none uppercase tracking-[0.2em]">Profile</div>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black tracking-[0.4em] text-[#C5A059] uppercase block">Resumen de Consultoría</span>
                            <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Visión Estratégica en Tecnología</h2>
                        </div>
                        <p className="text-lg md:text-2xl text-gray-300 font-serif italic leading-relaxed opacity-90" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {t_rh.about}
                        </p>
                    </section>

                    <section className="space-y-16">
                        <div className="flex items-center gap-4 md:gap-8 min-w-0">
                            <h2 className="text-xs font-black tracking-[0.4em] text-[#C5A059] uppercase break-words whitespace-normal sm:whitespace-nowrap">Matriz de Competencias Técnicas</h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                            {skillCategories.map((cat, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 md:p-9 bg-white/[0.01] rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-6 hover:border-[#C5A059]/30 hover:bg-white/[0.03] transition-all duration-500 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">{cat.label}</h3>
                                        <span className="text-[9px] font-black text-[#C5A059] opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {cat.items.map(item => (
                                            <span key={item} className="inline-block px-4 py-2 bg-white/[0.03] text-gray-400 font-bold text-[10px] rounded-full border border-white/5 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all cursor-default whitespace-normal break-words max-w-full">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 space-y-6 md:space-y-8">
                    <div className="p-6 md:p-12 bg-white/[0.02] rounded-3xl md:rounded-[3rem] border border-white/5 space-y-10 md:space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[100px]"></div>
                        
                        <div className="space-y-6 relative z-10">
                            <span className="text-[9px] font-black tracking-[0.4em] text-[#C5A059] uppercase block mb-4">Estado Profesional</span>
                            <div className="p-6 bg-white/[0.02] rounded-[1.5rem] md:rounded-3xl border border-green-500/20 flex flex-col items-center gap-3 text-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] md:text-xs font-black text-green-500 uppercase tracking-widest !text-[#C5A059]">{lang === 'es' ? 'DISPONIBILIDAD INMEDIATA' : 'IMMEDIATE AVAILABILITY'}</span>
                                </div>
                                <p className="text-lg md:text-xl font-serif italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {lang === 'es' ? 'Consultoría Técnica' : 'Technical Consultancy'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <span className="text-[9px] font-black tracking-[0.4em] text-[#C5A059] uppercase block mb-4">Indicadores de Valor</span>
                            <div className="grid gap-6">
                                <div className="p-6 bg-white/[0.02] rounded-[1.5rem] md:rounded-[2rem] border border-white/5 group hover:border-[#C5A059]/30 transition-all text-center">
                                    <p className="text-xl md:text-2xl font-serif italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>2024 - Present</p>
                                    <p className="text-[8px] font-black text-[#C5A059] uppercase tracking-widest mt-2 opacity-50">Ingeniería Profesional</p>
                                </div>
                                <div className="p-6 md:p-8 bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] border border-white/5 group hover:border-[#C5A059]/30 transition-all text-center">
                                    <p className="text-4xl md:text-5xl font-serif italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{isLoading ? '...' : projects.length + '+'}</p>
                                    <p className="text-[9px] font-black text-[#C5A059] uppercase tracking-widest mt-3 opacity-60">Sistemas Implementados</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 bg-gradient-to-br from-[#C5A059]/10 to-transparent rounded-3xl md:rounded-[4rem] space-y-8 md:space-y-10 border border-[#C5A059]/20 shadow-2xl shadow-[#C5A059]/5">
                        <h3 className="text-[9px] font-black tracking-[0.4em] text-[#C5A059] uppercase pl-2">Liderazgo & Soft Skills</h3>
                        <div className="grid gap-4 md:gap-6">
                            {t_rh.skills_extra.map((skill: string) => (
                                <div key={skill} className="flex items-center gap-4 text-[11px] md:text-xs font-bold text-gray-300 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:scale-150 transition-transform"></div>
                                    <span className="group-hover:text-white transition-colors">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RHAboutPage;
