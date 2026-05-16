import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { motion, type Transition } from "framer-motion";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.12)";
const GOLD_BORDER = "rgba(201,168,76,0.20)";

const RHHomePage = () => {
    const { lang } = useContext(GlobalContext);

    const content = {
        es: {
            eyebrow: "Ingeniería de Software · Soluciones Empresariales",
            role: "Desarrolladora Fullstack",
            tagline: "Arquitecto sistemas que escalan. Resuelvo problemas que importan.",
            about: "Ingeniera en TIC con especialidad en Aplicaciones Avanzadas. Mi enfoque está en la intersección de la arquitectura robusta y el impacto institucional real — construyo software que los equipos de negocio pueden confiar.",
            experience_btn: "Ver Trayectoria",
            contact_btn: "Iniciar Conversación",
            availability: "Disponible para nuevas oportunidades",
            metrics: [
                { label: "Años activa", value: "2+", sub: "en desarrollo profesional" },
                { label: "Proyectos", value: "10+", sub: "soluciones implementadas" },
                { label: "Nivel", value: "Senior Jr.", sub: "Fullstack · Cloud · SAP" }
            ],
            expertise: [
                { icon: "layers", area: "Arquitectura de Software", detail: "Diseño de sistemas distribuidos, APIs REST/GraphQL, patrones Clean Architecture." },
                { icon: "code", area: "Fullstack Engineering", detail: "React, Node.js, Angular, Next.js — desde el dato hasta la UI." },
                { icon: "cloud", area: "Cloud & Enterprise", detail: "SAP BTP, ABAP Cloud, Firebase, Docker. Infraestructura que escala." },
                { icon: "psychology", area: "Resolución Estratégica", detail: "Toma de decisiones técnicas orientada a resultados de negocio medibles." }
            ]
        },
        en: {
            eyebrow: "Software Engineering · Enterprise Solutions",
            role: "Fullstack Software Developer",
            tagline: "I architect systems that scale. I solve problems that matter.",
            about: "ICT Engineer specialized in Advanced Applications. My focus is at the intersection of solid architecture and real institutional impact — I build software that business teams can trust.",
            experience_btn: "View Trajectory",
            contact_btn: "Start a Conversation",
            availability: "Open to new opportunities",
            metrics: [
                { label: "Years active", value: "2+", sub: "in professional development" },
                { label: "Projects", value: "10+", sub: "implemented solutions" },
                { label: "Level", value: "Sr. Junior", sub: "Fullstack · Cloud · SAP" }
            ],
            expertise: [
                { icon: "layers", area: "Software Architecture", detail: "Distributed systems, REST/GraphQL APIs, Clean Architecture patterns." },
                { icon: "code", area: "Fullstack Engineering", detail: "React, Node.js, Angular, Next.js — from data to UI." },
                { icon: "cloud", area: "Cloud & Enterprise", detail: "SAP BTP, ABAP Cloud, Firebase, Docker. Infrastructure that scales." },
                { icon: "psychology", area: "Strategic Problem Solving", detail: "Technical decision-making oriented toward measurable business outcomes." }
            ]
        }
    };

    const t = content[lang as 'es' | 'en'] || content.es;

    const fadeUpTransition = (delay = 0): Transition => ({
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
    });

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: fadeUpTransition(delay)
    });

    return (
        <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-24 lg:py-36">

            {/* ── Top eyebrow ──────────────────────────────────────── */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-16">
                <div className="w-8 h-px" style={{ background: GOLD }} />
                <span
                    className="text-[10px] font-black uppercase tracking-[0.35em]"
                    style={{ color: GOLD }}
                >
                    {t.eyebrow}
                </span>
            </motion.div>

            {/* ── Hero grid ────────────────────────────────────────── */}
            <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                {/* ── LEFT: Identity ───────────────────────────────── */}
                <div className="space-y-10">

                    <motion.div {...fadeUp(0.05)} className="space-y-5">
                        {/* Name */}
                        <h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#F8F5F0] leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Anahí{" "}
                            <span style={{ color: GOLD }}>Lozano</span>
                        </h1>

                        {/* Role */}
                        <div className="flex items-center gap-4">
                            <div className="w-0.5 h-8 rounded-full" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#9E9E93]">
                                {t.role}
                            </p>
                        </div>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        {...fadeUp(0.12)}
                        className="text-2xl sm:text-3xl text-[#D8D4CC] font-serif italic leading-[1.4]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {t.tagline}
                    </motion.p>

                    {/* Bio */}
                    <motion.div
                        {...fadeUp(0.18)}
                        className="relative p-7 rounded-2xl"
                        style={{
                            background: GOLD_DIM,
                            border: `1px solid ${GOLD_BORDER}`,
                        }}
                    >
                        <div
                            className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                            style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
                        />
                        <p className="text-base text-[#B0ACA4] leading-[1.85] font-normal pl-4">
                            {t.about}
                        </p>
                    </motion.div>

                    {/* Expertise chips */}
                    <motion.div {...fadeUp(0.24)} className="grid sm:grid-cols-2 gap-4">
                        {t.expertise.map((exp, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-400 group cursor-default"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                    (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                }}
                            >
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                                >
                                    <span
                                        className="material-symbols-outlined text-[16px]"
                                        style={{ color: GOLD }}
                                    >
                                        {exp.icon}
                                    </span>
                                </div>
                                <div>
                                    <p
                                        className="text-[10px] font-black uppercase tracking-widest mb-1.5"
                                        style={{ color: GOLD }}
                                    >
                                        {exp.area}
                                    </p>
                                    <p className="text-[12px] text-[#7A7872] leading-[1.65] font-normal">
                                        {exp.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div {...fadeUp(0.30)} className="flex flex-wrap gap-4 pt-2">
                        <Link
                            to="/experience"
                            className="relative px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] text-black overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgba(201,168,76,0.35)]"
                            style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}
                        >
                            {/* shimmer */}
                            <span
                                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                                    backgroundSize: "200% 100%",
                                    animation: "shimmer 1.5s infinite",
                                }}
                            />
                            <span className="relative">{t.experience_btn}</span>
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] text-[#C8C4BB] transition-all duration-300 hover:text-[#F8F5F0] active:scale-95"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: `1px solid rgba(255,255,255,0.10)`,
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                            }}
                        >
                            {t.contact_btn}
                        </Link>
                    </motion.div>
                </div>

                {/* ── RIGHT: Visual panel ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center gap-6"
                >
                    {/* Monogram / Avatar */}
                    <div className="relative">
                        {/* Outer rotating ring */}
                        <div
                            className="absolute inset-[-16px] rounded-full"
                            style={{
                                border: `1px solid ${GOLD_BORDER}`,
                                animation: "spin 24s linear infinite",
                            }}
                        />
                        {/* Middle ring */}
                        <div
                            className="absolute inset-[-8px] rounded-full"
                            style={{
                                border: `1px dashed rgba(201,168,76,0.10)`,
                            }}
                        />
                        {/* Avatar circle */}
                        <div
                            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center relative"
                            style={{
                                background: `radial-gradient(135deg at 30% 30%, rgba(201,168,76,0.18), rgba(8,9,10,0.9))`,
                                border: `2px solid ${GOLD_BORDER}`,
                                boxShadow: `0 0 60px rgba(201,168,76,0.12), inset 0 0 40px rgba(201,168,76,0.06)`,
                            }}
                        >
                            <span
                                className="text-7xl font-serif italic select-none"
                                style={{ color: GOLD, fontFamily: "'Playfair Display', serif", textShadow: `0 0 30px rgba(201,168,76,0.4)` }}
                            >
                                AL
                            </span>
                        </div>
                        {/* Availability badge */}
                        <div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
                            style={{
                                background: "#111214",
                                border: `1px solid rgba(34,197,94,0.3)`,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-green-400">
                                {t.availability}
                            </span>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="w-full grid grid-cols-3 gap-4 mt-10">
                        {t.metrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-400"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: `1px solid ${GOLD_BORDER}`,
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                }}
                            >
                                <span
                                    className="text-3xl sm:text-4xl font-serif italic leading-none"
                                    style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
                                >
                                    {m.value}
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#7A7872] mt-2">
                                    {m.label}
                                </span>
                                <span className="text-[9px] text-[#4A4A44] mt-1 leading-tight hidden sm:block">
                                    {m.sub}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom decorative card */}
                    <div
                        className="w-full p-6 rounded-2xl flex items-center justify-between"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD_DIM}, transparent)`,
                            border: `1px solid ${GOLD_BORDER}`,
                        }}
                    >
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: GOLD }}>
                                Status
                            </p>
                            <p
                                className="text-lg font-serif italic text-[#F8F5F0]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {lang === 'es' ? "Consultas Técnicas Abiertas" : "Open for Technical Consulting"}
                            </p>
                        </div>
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                        >
                            <span className="material-symbols-outlined text-2xl" style={{ color: GOLD }}>verified</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Shimmer keyframe */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
};

export default RHHomePage;
