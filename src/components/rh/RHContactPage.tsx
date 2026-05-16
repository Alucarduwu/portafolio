import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.18)";

const RHContactPage = () => {
    const { lang } = useContext(GlobalContext);

    const labels = {
        es: {
            eyebrow: "Contacto Profesional",
            title: "Hablemos.",
            subtitle: "Siempre hay espacio para una buena conversación técnica.",
            desc: "Estoy disponible para posiciones de liderazgo técnico, colaboraciones estratégicas y proyectos de arquitectura de software. Cuéntame en qué puedo ayudarte.",
            email_btn: "Enviar Mensaje",
            availability_label: "Tiempo de respuesta promedio",
            availability_value: "< 24 horas",
            hours_label: "Horario de disponibilidad",
            hours_value: "Lun – Vie · 9:00 – 18:00",
            zone_label: "Zona horaria",
            zone_value: "CST (UTC-6) · México",
            social_title: "Canales de Contacto",
            cv_title: "Documentos Profesionales",
            cv_standard: "Currículum Vitae",
            cv_standard_sub: "Formato ATS-optimizado",
            cv_exec: "Executive Resume",
            cv_exec_sub: "Metodología Harvard",
        },
        en: {
            eyebrow: "Professional Contact",
            title: "Let's Talk.",
            subtitle: "There's always room for a good technical conversation.",
            desc: "Available for technical leadership positions, strategic collaborations, and software architecture projects. Tell me how I can help you.",
            email_btn: "Send Message",
            availability_label: "Average response time",
            availability_value: "< 24 hours",
            hours_label: "Availability hours",
            hours_value: "Mon – Fri · 9:00 – 18:00",
            zone_label: "Time zone",
            zone_value: "CST (UTC-6) · Mexico",
            social_title: "Contact Channels",
            cv_title: "Professional Documents",
            cv_standard: "Curriculum Vitae",
            cv_standard_sub: "ATS-optimized format",
            cv_exec: "Executive Resume",
            cv_exec_sub: "Harvard Methodology",
        }
    };

    const t = labels[lang as 'es' | 'en'] || labels.es;

    return (
        <main className="max-w-[1200px] mx-auto px-5 sm:px-8 py-24 lg:py-36">

            {/* ── Header ──────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mb-16 text-center space-y-4"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.45em]" style={{ color: GOLD }}>
                    {t.eyebrow}
                </span>
                <h1
                    className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#F8F5F0] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {t.title}
                </h1>
                <p className="text-base text-[#7A7872] font-medium">{t.subtitle}</p>
            </motion.div>

            {/* ── Body grid ───────────────────────────────────────── */}
            <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-start">

                {/* ── Left: Main CTA ──────────────────────────────── */}
                <div className="lg:col-span-7 space-y-8">

                    {/* Proposal card */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative p-10 md:p-14 rounded-3xl space-y-8 overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div
                            className="absolute left-0 top-0 bottom-0 w-0.5"
                            style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
                        />
                        <div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: GOLD }}>
                                {lang === 'es' ? 'Propuesta de Valor' : 'Value Proposition'}
                            </h2>
                            <p
                                className="text-2xl md:text-3xl text-[#C8C4BB] font-serif italic leading-relaxed"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {t.desc}
                            </p>
                        </div>

                        {/* Direct email CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <a
                                href="mailto:anahydlira@gmail.com"
                                className="flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] text-black transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
                                style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}
                            >
                                <span className="material-symbols-outlined text-sm">mail</span>
                                {t.email_btn}
                            </a>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-400">{t.availability_value}</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* Availability details */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.18 }}
                        className="grid sm:grid-cols-3 gap-4"
                    >
                        {[
                            { icon: "schedule", label: t.availability_label, value: t.availability_value },
                            { icon: "today", label: t.hours_label, value: t.hours_value },
                            { icon: "public", label: t.zone_label, value: t.zone_value },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl flex flex-col gap-2"
                                style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                            >
                                <span className="material-symbols-outlined text-[20px]" style={{ color: GOLD }}>{item.icon}</span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-[#4A4A44]">{item.label}</span>
                                <span className="text-[12px] font-bold text-[#C8C4BB] leading-snug">{item.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CV Downloads */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="space-y-4"
                    >
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: GOLD }}>
                            {t.cv_title}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <a
                                href="/Cv Anahi Betzabe Lozano de Lira.pdf"
                                target="_blank"
                                className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 group"
                                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                    (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                }}
                            >
                                <span className="material-symbols-outlined text-4xl opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }}>description</span>
                                <div>
                                    <p className="text-sm font-serif italic text-[#F8F5F0]" style={{ fontFamily: "'Playfair Display', serif" }}>{t.cv_standard}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest mt-1 opacity-50" style={{ color: GOLD }}>{t.cv_standard_sub}</p>
                                </div>
                            </a>
                            <a
                                href="/Anahi_Lozano_Harvard_CV.pdf"
                                target="_blank"
                                className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 group"
                                style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.18)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = GOLD_DIM;
                                }}
                            >
                                <span className="material-symbols-outlined text-4xl" style={{ color: GOLD }}>workspace_premium</span>
                                <div>
                                    <p className="text-sm font-serif italic text-[#F8F5F0]" style={{ fontFamily: "'Playfair Display', serif" }}>{t.cv_exec}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest mt-1" style={{ color: GOLD }}>{t.cv_exec_sub}</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* ── Right: Social links ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="lg:col-span-5"
                >
                    <div
                        className="p-10 rounded-3xl space-y-10 relative overflow-hidden"
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
                        <h2 className="text-[9px] font-black uppercase tracking-[0.4em] relative z-10" style={{ color: GOLD }}>
                            {t.social_title}
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/anahi-lozano-de-lira-a4213a187/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 group"
                                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
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
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                                >
                                    <span className="material-symbols-outlined text-xl" style={{ color: GOLD }}>work</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-serif italic text-[#F8F5F0]" style={{ fontFamily: "'Playfair Display', serif" }}>LinkedIn</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mt-0.5" style={{ color: GOLD }}>Professional Network</p>
                                </div>
                                <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-60 group-hover:translate-x-1 transition-all" style={{ color: GOLD }}>arrow_forward</span>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/Alucarduwu"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 group"
                                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
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
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    <span className="material-symbols-outlined text-xl text-[#C8C4BB]">code</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-serif italic text-[#F8F5F0]" style={{ fontFamily: "'Playfair Display', serif" }}>GitHub</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-[#4A4A44] opacity-80 mt-0.5">@Alucarduwu</p>
                                </div>
                                <span className="material-symbols-outlined text-sm text-[#4A4A44] group-hover:opacity-60 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </a>

                            {/* Email display */}
                            <div
                                className="flex items-center gap-5 p-6 rounded-2xl"
                                style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{ background: GOLD, }}
                                >
                                    <span className="material-symbols-outlined text-xl text-black">alternate_email</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-serif italic text-[#F8F5F0] break-all" style={{ fontFamily: "'Playfair Display', serif" }}>anahydlira@gmail.com</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color: GOLD }}>Primary Inbox</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer signature */}
                        <div className="pt-6 border-t border-white/5 text-center relative z-10">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 italic" style={{ color: GOLD }}>
                                Designed with purpose by Anahí Lozano
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default RHContactPage;
