import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useGithubProjects } from "../../hooks/useGithubProjects";
import { motion } from "framer-motion";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.18)";

// Category color palette
const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
    Frontend: { bg: "rgba(99,102,241,0.08)", text: "#818CF8", dot: "#6366F1" },
    Backend:  { bg: "rgba(34,197,94,0.07)",  text: "#4ADE80", dot: "#22C55E" },
    "Mobile / AI": { bg: "rgba(236,72,153,0.07)", text: "#F472B6", dot: "#EC4899" },
    "Cloud / DB": { bg: "rgba(14,165,233,0.07)", text: "#38BDF8", dot: "#0EA5E9" },
    "Ops / Test": { bg: "rgba(251,146,60,0.07)", text: "#FB923C", dot: "#F97316" },
};

const RHAboutPage = () => {
    const { lang } = useContext(GlobalContext);
    const { projects, isLoading } = useGithubProjects(lang as "es" | "en");

    const labels = {
        es: {
            eyebrow: "Perfil Profesional",
            title: "Arquitecta de Soluciones",
            headline: "Construyo lo que los equipos necesitan, con la solidez que las empresas exigen.",
            about: "Ingeniería en TIC centrada en el desarrollo de aplicaciones de alta complejidad. Mi práctica está regida por arquitectura limpia, escalabilidad técnica y visión estratégica para la resolución de problemas institucionales. Trabajo en la intersección de la excelencia técnica y el impacto de negocio real.",
            skills_title: "Matriz de Competencias Técnicas",
            sidebar_availability: "Disponibilidad",
            sidebar_avail_value: "Inmediata",
            sidebar_mode: "Modalidad",
            sidebar_mode_value: "Remoto / Híbrido",
            sidebar_lang: "Idiomas",
            sidebar_lang_value: "Español · Inglés",
            sidebar_type: "Tipo",
            sidebar_type_value: "Full-time · Freelance",
            soft_title: "Liderazgo & Soft Skills",
            skills_extra: ["Arquitectura de Software", "Diseño de Sistemas", "Liderazgo Técnico", "Metodologías Ágiles", "Orientación a Resultados", "Comunicación Ejecutiva"]
        },
        en: {
            eyebrow: "Professional Profile",
            title: "Solutions Architect",
            headline: "I build what teams need, with the robustness enterprises demand.",
            about: "ICT Engineer focused on high-complexity application development. My practice is governed by clean architecture, technical scalability, and a strategic vision for institutional problem-solving. I work at the intersection of technical excellence and real business impact.",
            skills_title: "Technical Competency Matrix",
            sidebar_availability: "Availability",
            sidebar_avail_value: "Immediate",
            sidebar_mode: "Modality",
            sidebar_mode_value: "Remote / Hybrid",
            sidebar_lang: "Languages",
            sidebar_lang_value: "Spanish · English",
            sidebar_type: "Type",
            sidebar_type_value: "Full-time · Freelance",
            soft_title: "Leadership & Soft Skills",
            skills_extra: ["Software Architecture", "System Design", "Technical Leadership", "Agile Methodologies", "Results Oriented", "Executive Communication"]
        }
    };

    const t = labels[lang as 'es' | 'en'] || labels.es;

    const skillCategories = [
        { label: 'Frontend',     items: ['Angular', 'React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'] },
        { label: 'Backend',      items: ['Node.js', 'Express', 'NestJS', 'Django', 'Laravel', '.NET', 'REST APIs', 'GraphQL'] },
        { label: 'Mobile / AI',  items: ['Kotlin', 'Android Native', 'Dart / Flutter', 'Fuzzy Logic', 'MATLAB Automation'] },
        { label: 'Cloud / DB',   items: ['SAP BTP', 'ABAP Cloud', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'] },
        { label: 'Ops / Test',   items: ['Docker', 'Vercel', 'Git / GitHub', 'CI/CD Actions', 'Cypress', 'Playwright', 'Postman'] },
    ];

    const sidebarData = [
        { icon: "schedule", label: t.sidebar_availability, value: t.sidebar_avail_value, accent: true },
        { icon: "laptop_mac", label: t.sidebar_mode, value: t.sidebar_mode_value, accent: false },
        { icon: "language", label: t.sidebar_lang, value: t.sidebar_lang_value, accent: false },
        { icon: "work", label: t.sidebar_type, value: t.sidebar_type_value, accent: false },
    ];

    return (
        <main className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-28 pb-20 lg:pt-40 lg:pb-36">

            {/* ── Page header ─────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mb-20 pl-7 md:pl-10 space-y-4"
                style={{ borderLeft: `3px solid ${GOLD}` }}
            >
                <span
                    className="text-[10px] font-black uppercase tracking-[0.45em]"
                    style={{ color: GOLD }}
                >
                    {t.eyebrow}
                </span>
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#F8F5F0] tracking-tight leading-[1.1]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {t.title}
                </h1>
            </motion.div>

            {/* ── Body grid ───────────────────────────────────────── */}
            <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">

                {/* ── Main column ─────────────────────────────────── */}
                <div className="lg:col-span-8 space-y-20">

                    {/* Profile section */}
                    <section
                        className="relative p-8 md:p-14 rounded-3xl space-y-8 overflow-hidden transition-all duration-700"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 w-0.5 h-0 group-hover:h-full transition-all duration-1000"
                            style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
                        />
                        <blockquote
                            className="text-xl md:text-2xl font-serif italic leading-relaxed"
                            style={{ color: "#D8D4CC", fontFamily: "'Playfair Display', serif" }}
                        >
                            "{t.headline}"
                        </blockquote>
                        <p className="text-base text-[#7A7872] leading-[1.85] font-normal border-t border-white/5 pt-8">
                            {t.about}
                        </p>
                    </section>

                    {/* Skills matrix */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-6">
                            <h2
                                className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap"
                                style={{ color: GOLD }}
                            >
                                {t.skills_title}
                            </h2>
                            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.2), transparent)" }} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {skillCategories.map((cat, i) => {
                                const colors = CAT_COLORS[cat.label] ?? { bg: GOLD_DIM, text: GOLD, dot: GOLD };
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-7 rounded-2xl space-y-5 transition-all duration-400"
                                        style={{
                                            background: "rgba(255,255,255,0.015)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = colors.bg;
                                            (e.currentTarget as HTMLElement).style.borderColor = `${colors.dot}30`;
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
                                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ background: colors.dot, boxShadow: `0 0 8px ${colors.dot}60` }}
                                            />
                                            <h3
                                                className="text-[10px] font-black uppercase tracking-widest"
                                                style={{ color: colors.text }}
                                            >
                                                {cat.label}
                                            </h3>
                                            <span className="ml-auto text-[9px] font-black opacity-25" style={{ color: colors.text }}>
                                                0{i + 1}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.items.map(item => (
                                                <span
                                                    key={item}
                                                    className="inline-block px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-250 cursor-default"
                                                    style={{
                                                        background: "rgba(255,255,255,0.03)",
                                                        border: "1px solid rgba(255,255,255,0.06)",
                                                        color: "#7A7872",
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLElement).style.background = colors.bg;
                                                        (e.currentTarget as HTMLElement).style.color = colors.text;
                                                        (e.currentTarget as HTMLElement).style.borderColor = `${colors.dot}50`;
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                                                        (e.currentTarget as HTMLElement).style.color = "#7A7872";
                                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                                                    }}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* ── Sidebar ─────────────────────────────────────── */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Stats card */}
                    <div
                        className="p-8 rounded-3xl space-y-8 relative overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: `1px solid ${GOLD_BORDER}`,
                        }}
                    >
                        <div
                            className="absolute top-0 right-0 pointer-events-none"
                            style={{
                                width: 200, height: 200,
                                background: `radial-gradient(circle, ${GOLD_DIM} 0%, transparent 70%)`,
                                filter: "blur(30px)",
                            }}
                        />

                        {/* Key numbers */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center text-center p-5 rounded-2xl" style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}>
                                <span className="text-4xl font-serif italic" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                                    2024
                                </span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-[#7A7872] mt-2">
                                    {lang === 'es' ? 'Inicio Profesional' : 'Career Start'}
                                </span>
                            </div>
                            <div className="flex flex-col items-center text-center p-5 rounded-2xl" style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}>
                                <span className="text-4xl font-serif italic" style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                                    {isLoading ? '—' : `${projects.length}+`}
                                </span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-[#7A7872] mt-2">
                                    {lang === 'es' ? 'Proyectos' : 'Projects'}
                                </span>
                            </div>
                        </div>

                        {/* Details list */}
                        <div className="space-y-4">
                            {sidebarData.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-4 rounded-xl"
                                    style={{
                                        background: item.accent ? GOLD_DIM : "rgba(255,255,255,0.02)",
                                        border: `1px solid ${item.accent ? GOLD_BORDER : "rgba(255,255,255,0.05)"}`,
                                    }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: GOLD_DIM }}
                                    >
                                        <span className="material-symbols-outlined text-[16px]" style={{ color: GOLD }}>
                                            {item.icon}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-[#4A4A44]">{item.label}</p>
                                        <p className="text-sm font-bold text-[#C8C4BB] truncate">{item.value}</p>
                                    </div>
                                    {item.accent && (
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-auto shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Soft skills card */}
                    <div
                        className="p-8 rounded-3xl space-y-8"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD_DIM}, transparent)`,
                            border: `1px solid ${GOLD_BORDER}`,
                        }}
                    >
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>
                            {t.soft_title}
                        </h3>
                        <div className="grid gap-3">
                            {t.skills_extra.map((skill: string, i: number) => (
                                <div key={skill} className="flex items-center gap-4 group cursor-default">
                                    <div
                                        className="text-[10px] font-black w-5 text-right shrink-0 opacity-30"
                                        style={{ color: GOLD }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div className="w-px h-4 shrink-0" style={{ background: `${GOLD}30` }} />
                                    <span className="text-[12px] font-bold text-[#9E9E93] group-hover:text-[#F8F5F0] transition-colors duration-200">
                                        {skill}
                                    </span>
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
