import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { experience } from "../dataprojetcts/experience";
import { motion } from "framer-motion";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.18)";

const RHExperience = () => {
    const { lang } = useContext(GlobalContext);

    const labels = {
        es: {
            eyebrow: "Cronología de Impacto",
            title: "Trayectoria Profesional",
            desc: "Una historia definida por arquitectura sólida y entrega de soluciones que optimizan procesos críticos.",
            results: "Resultados & Impacto",
            arch: "Stack & Arquitectura",
            cta_eyebrow: "¿Siguiente paso?",
            cta_title: "Conversemos sobre su próximo proyecto.",
            download: "Descargar Currículum",
            contact: "Ir a Contacto",
        },
        en: {
            eyebrow: "Impact Timeline",
            title: "Professional Trajectory",
            desc: "A story defined by solid architecture and delivering solutions that optimize critical processes.",
            results: "Results & Impact",
            arch: "Stack & Architecture",
            cta_eyebrow: "Next step?",
            cta_title: "Let's talk about your next project.",
            download: "Download Resume",
            contact: "Go to Contact",
        }
    };

    const t = labels[lang as 'es' | 'en'] || labels.es;

    return (
        <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 lg:py-40">

            {/* ── Header ──────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mb-20 pl-7 md:pl-10 space-y-5"
                style={{ borderLeft: `3px solid ${GOLD}` }}
            >
                <span className="text-[10px] font-black uppercase tracking-[0.45em]" style={{ color: GOLD }}>
                    {t.eyebrow}
                </span>
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#F8F5F0] tracking-tight leading-[1.1]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {t.title}
                </h1>
                <p
                    className="text-lg md:text-xl text-[#7A7872] font-serif italic leading-relaxed max-w-2xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {t.desc}
                </p>
            </motion.div>

            {/* ── Vertical Timeline ────────────────────────────────── */}
            <div className="relative">
                {/* Vertical line */}
                <div
                    className="absolute left-8 md:left-10 top-0 bottom-0 w-px"
                    style={{ background: `linear-gradient(to bottom, ${GOLD}60, ${GOLD}10, transparent)` }}
                />

                <div className="space-y-12">
                    {experience.map((ex, i) => {
                        const title = lang === 'es' ? ex.titleEs : ex.titleEn;
                        const period = lang === 'es' ? ex.periodEs : ex.periodEn;
                        const company = lang === 'es' ? ex.companyEs : ex.companyEn;
                        const desc = lang === 'es' ? ex.descriptionEs : ex.descriptionEn;
                        const features = lang === 'es' ? (ex.details?.featuresEs || []) : (ex.details?.featuresEn || []);
                        const architecture = lang === 'es' ? (ex.details?.architectureEs || []) : (ex.details?.architectureEn || []);

                        return (
                            <motion.div
                                key={ex.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.08 }}
                                className="relative pl-20 md:pl-24"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-[26px] md:left-[30px] top-8 w-5 h-5 rounded-full flex items-center justify-center"
                                    style={{
                                        background: "#08090a",
                                        border: `2px solid ${GOLD}`,
                                        boxShadow: `0 0 12px rgba(201,168,76,0.4)`,
                                    }}
                                >
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: GOLD }}
                                    />
                                </div>

                                {/* Period badge */}
                                <div
                                    className="absolute left-[52px] md:left-[58px] top-[26px] h-5 w-px"
                                    style={{ background: `${GOLD}30` }}
                                />

                                {/* Card */}
                                <div
                                    className="rounded-2xl overflow-hidden transition-all duration-500 group"
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                    }}
                                >
                                    {/* Card header */}
                                    <div
                                        className="px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                                    >
                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="text-[9px] font-black uppercase tracking-[0.35em]"
                                                    style={{ color: GOLD }}
                                                >
                                                    {period}
                                                </span>
                                            </div>
                                            <h2
                                                className="text-2xl md:text-3xl font-serif italic text-[#F8F5F0] leading-tight"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {company}
                                            </h2>
                                        </div>
                                        <span
                                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl shrink-0 self-start"
                                            style={{
                                                background: GOLD_DIM,
                                                color: GOLD,
                                                border: `1px solid ${GOLD_BORDER}`,
                                            }}
                                        >
                                            {title}
                                        </span>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-8 space-y-8">
                                        <p
                                            className="text-base text-[#9E9E93] font-serif italic leading-relaxed"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {desc}
                                        </p>

                                        {(features.length > 0 || architecture.length > 0) && (
                                            <div className="grid sm:grid-cols-2 gap-8">
                                                {features.length > 0 && (
                                                    <div className="space-y-4">
                                                        <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                                                            {t.results}
                                                        </p>
                                                        <ul className="space-y-3">
                                                            {features.map((feat: string, fi: number) => (
                                                                <li key={fi} className="flex items-start gap-3 text-[12px] text-[#7A7872] font-medium leading-relaxed">
                                                                    <div
                                                                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                                                                        style={{ background: GOLD }}
                                                                    />
                                                                    {feat}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {architecture.length > 0 && (
                                                    <div className="space-y-4 sm:border-l sm:border-white/5 sm:pl-8">
                                                        <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                                                            {t.arch}
                                                        </p>
                                                        <ul className="space-y-2.5">
                                                            {architecture.map((arch: string, ai: number) => (
                                                                <li key={ai} className="flex items-start gap-3 text-[11px] text-[#5A5A54] font-medium leading-relaxed italic">
                                                                    <span className="material-symbols-outlined text-[11px] mt-0.5" style={{ color: `${GOLD}50` }}>layers</span>
                                                                    {arch}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                            {ex.stack.split(' • ').map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest transition-all duration-200 cursor-default"
                                                    style={{
                                                        background: "rgba(255,255,255,0.03)",
                                                        color: "#5A5A54",
                                                        border: "1px solid rgba(255,255,255,0.05)",
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                                                        (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLElement).style.color = "#5A5A54";
                                                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                                                    }}
                                                >
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
            </div>

            {/* ── CTA Footer ──────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24 md:mt-40 relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${GOLD_DIM}, transparent)`,
                    border: `1px solid ${GOLD_BORDER}`,
                }}
            >
                <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                        width: 400, height: 400,
                        background: `radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                />
                <div className="relative z-10 space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.45em]" style={{ color: GOLD }}>
                        {t.cta_eyebrow}
                    </span>
                    <h2
                        className="text-3xl md:text-5xl font-serif italic text-[#F8F5F0] tracking-tight leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {t.cta_title}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <a
                            href="/Cv Anahi Betzabe Lozano de Lira.pdf"
                            target="_blank"
                            className="flex items-center gap-3 px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
                            style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}
                        >
                            <span className="material-symbols-outlined text-sm">download</span>
                            {t.download}
                        </a>
                        <a
                            href="/contact"
                            className="px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-[#C8C4BB] transition-all duration-300 hover:text-[#F8F5F0] active:scale-95"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {t.contact}
                        </a>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default RHExperience;
