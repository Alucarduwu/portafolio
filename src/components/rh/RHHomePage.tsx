import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";
import { CONTACT_CONFIG } from "../../config";
import { experience } from "../dataprojetcts/experience";
import voraaSite from "../../assets/projects/voraa/1.png";
import voraaCards from "../../assets/projects/voraa/3.png";

const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.22)";
const SERIF = { fontFamily: "'Playfair Display', serif" };

// Todo lo que se afirma aquí sale del CV 2026: un reclutador cruza cada cifra con él.
const content = {
    es: {
        status: "Disponible para empleo y proyectos freelance",
        role: "Desarrolladora Full Stack",
        stack: "TypeScript · React · Next.js · Node.js · PostgreSQL · C# / .NET",
        pitch: "Llevo productos de la idea a producción. Hoy soy la única ingeniera de Voraa, una plataforma de lealtad con tarjetas en Apple y Google Wallet, y mantengo software empresarial para un equipo en Canadá.",
        where: "Aguascalientes, México · Remoto o híbrido · Español nativo, inglés B2",
        ctaTalk: "Hablemos",
        ctaCv: "Descargar CV",
        ctaWork: "Ver proyectos",
        live: "En producción",
        numbers: [
            { value: "1,284", label: "pruebas automatizadas", sub: "Voraa" },
            { value: "53", label: "rutas de API", sub: "Voraa" },
            { value: "18", label: "migraciones PostgreSQL", sub: "Voraa" },
            { value: "77", label: "proyectos .NET mantenidos", sub: "i3 Solutions" },
        ],
        caseEyebrow: "Caso destacado",
        caseTitle: "Voraa Lealtad",
        caseSub: "Tarjetas de lealtad digitales para restaurantes, directo en el celular del cliente.",
        caseRole: "Mi papel: única ingeniera. Arquitectura, datos, despliegue y pruebas con usuarios.",
        caseBullets: [
            "Pases de Apple Wallet (PassKit, firma PKCS#7, avisos por APNs) y de Google Wallet, sin app que instalar.",
            "Alta de negocios en autoservicio, registro de clientes por QR o teléfono, visitas y canje por marca y sucursal.",
            "Seguridad a nivel de fila en PostgreSQL, límites de uso y reCAPTCHA Enterprise.",
            "Monorepo de tres servicios desplegado en Railway y Cloudflare, con 1,284 pruebas automatizadas.",
        ],
        caseSite: "Ver sitio",
        caseMore: "Todos los proyectos",
        expEyebrow: "Experiencia",
        expTitle: "Dónde he trabajado",
        expMore: "Ver trayectoria completa",
        now: "Actual",
        offerEyebrow: "Cómo puedo ayudarte",
        hireTitle: "Para tu equipo",
        hireItems: [
            "Me hago cargo de una función de principio a fin: diseño de datos, API, interfaz, pruebas y despliegue.",
            "Experiencia en equipos remotos e internacionales, con Jira, revisiones de código y CI.",
            "Código con pruebas y documentado, pensado para que otro lo mantenga.",
        ],
        hireCta: "Tengo una vacante",
        freeTitle: "Para tu negocio (freelance)",
        freeItems: [
            { icon: "language", t: "Sitios y apps web a la medida", d: "React, Next.js y Node.js, con panel de administración." },
            { icon: "wallet", t: "Tarjetas de lealtad y pases Wallet", d: "Apple y Google Wallet para tu marca." },
            { icon: "smartphone", t: "Apps móviles", d: "Flutter para Android y iOS." },
            { icon: "build", t: "Mantenimiento y modernización", d: "APIs, bases de datos y sistemas .NET existentes." },
        ],
        steps: ["Llamada de 30 min", "Propuesta con alcance y tiempos", "Avances cada semana", "Entrega y soporte"],
        freeCta: "Cotizar un proyecto",
        stackEyebrow: "Tecnologías",
        stackGroups: [
            { name: "Frontend", items: ["TypeScript", "React", "Next.js", "Angular", "Tailwind CSS"] },
            { name: "Backend y datos", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "MySQL", "MongoDB"] },
            { name: "Móvil y escritorio", items: ["Flutter", "Apple Wallet", "Google Wallet", "C# / WPF", ".NET Framework"] },
            { name: "Entrega", items: ["Railway", "Cloudflare", "Docker", "GitHub Actions", "GitLab CI", "Vitest", "Playwright"] },
        ],
        eduTitle: "Formación",
        edu: "Ingeniería en TIC · Instituto Tecnológico de Aguascalientes (titulación en trámite)",
        certs: "11 certificaciones: Cisco CCNAv7, Meta (React, Django), SAP HANA, ciberseguridad y ciencia de datos.",
        certsCta: "Ver certificados",
        finalTitle: "¿Tienes una vacante o un proyecto?",
        finalSub: "Escríbeme por correo o LinkedIn y lo platicamos.",
        mailSubject: "Contacto desde tu portafolio",
    },
    en: {
        status: "Open to full-time roles and freelance projects",
        role: "Full Stack Developer",
        stack: "TypeScript · React · Next.js · Node.js · PostgreSQL · C# / .NET",
        pitch: "I take products from idea to production. Today I'm the sole engineer at Voraa, a loyalty platform with Apple and Google Wallet cards, and I maintain enterprise software for a team in Canada.",
        where: "Aguascalientes, Mexico · Remote or hybrid · Spanish (native), English B2",
        ctaTalk: "Let's talk",
        ctaCv: "Download CV",
        ctaWork: "See projects",
        live: "In production",
        numbers: [
            { value: "1,284", label: "automated tests", sub: "Voraa" },
            { value: "53", label: "API routes", sub: "Voraa" },
            { value: "18", label: "PostgreSQL migrations", sub: "Voraa" },
            { value: "77", label: ".NET projects maintained", sub: "i3 Solutions" },
        ],
        caseEyebrow: "Featured case",
        caseTitle: "Voraa Loyalty",
        caseSub: "Digital loyalty cards for restaurants, right on the customer's phone.",
        caseRole: "My role: sole engineer. Architecture, data, deployment and user testing.",
        caseBullets: [
            "Apple Wallet passes (PassKit, PKCS#7 signing, APNs updates) and Google Wallet passes, no app to install.",
            "Self-service business onboarding, customer sign-up by QR or phone, visits and redemptions per brand and location.",
            "Row-level security in PostgreSQL, rate limiting and reCAPTCHA Enterprise.",
            "Three-service monorepo deployed on Railway and Cloudflare, with 1,284 automated tests.",
        ],
        caseSite: "Visit site",
        caseMore: "All projects",
        expEyebrow: "Experience",
        expTitle: "Where I've worked",
        expMore: "Full trajectory",
        now: "Current",
        offerEyebrow: "How I can help",
        hireTitle: "For your team",
        hireItems: [
            "I own a feature end to end: data design, API, UI, tests and deployment.",
            "Experience on remote, international teams with Jira, code review and CI.",
            "Tested, documented code built for someone else to maintain.",
        ],
        hireCta: "I have an opening",
        freeTitle: "For your business (freelance)",
        freeItems: [
            { icon: "language", t: "Custom websites and web apps", d: "React, Next.js and Node.js, with an admin panel." },
            { icon: "wallet", t: "Loyalty cards and Wallet passes", d: "Apple and Google Wallet for your brand." },
            { icon: "smartphone", t: "Mobile apps", d: "Flutter for Android and iOS." },
            { icon: "build", t: "Maintenance and modernization", d: "Existing APIs, databases and .NET systems." },
        ],
        steps: ["30-min call", "Proposal with scope and timeline", "Weekly progress", "Delivery and support"],
        freeCta: "Get a quote",
        stackEyebrow: "Technologies",
        stackGroups: [
            { name: "Frontend", items: ["TypeScript", "React", "Next.js", "Angular", "Tailwind CSS"] },
            { name: "Backend & data", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "MySQL", "MongoDB"] },
            { name: "Mobile & desktop", items: ["Flutter", "Apple Wallet", "Google Wallet", "C# / WPF", ".NET Framework"] },
            { name: "Delivery", items: ["Railway", "Cloudflare", "Docker", "GitHub Actions", "GitLab CI", "Vitest", "Playwright"] },
        ],
        eduTitle: "Education",
        edu: "B.Eng. in ICT · Instituto Tecnológico de Aguascalientes (degree in process)",
        certs: "11 certifications: Cisco CCNAv7, Meta (React, Django), SAP HANA, cybersecurity and data science.",
        certsCta: "See certificates",
        finalTitle: "Have an opening or a project?",
        finalSub: "Email me or reach out on LinkedIn and let's talk.",
        mailSubject: "Contact from your portfolio",
    },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: GOLD }}>{children}</p>
);

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const RHHomePage = () => {
    const { lang } = useContext(GlobalContext);
    const t = content[lang as "es" | "en"] || content.es;
    const mail = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(t.mailSubject)}`;
    const jobs = experience.filter(e => e.id !== "exp-nrfm");

    return (
        <main className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-28 md:pt-36 pb-24 space-y-24 md:space-y-32">

            {/* ── Hero: quién, qué, prueba y cómo contactar, sin hacer scroll ── */}
            <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
                <motion.div {...fade()} className="space-y-7">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-emerald-300"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {t.status}
                    </span>

                    <div className="space-y-3">
                        <h1 className="normal-case text-5xl sm:text-6xl md:text-7xl italic text-[#F8F5F0] leading-[1.02] tracking-tight" style={SERIF}>
                            Anahí <span style={{ color: GOLD }}>Lozano</span>
                        </h1>
                        <p className="text-lg md:text-xl font-semibold text-[#F8F5F0]">{t.role}</p>
                        <p className="text-[13px] font-medium text-[#9E9A90] tracking-wide">{t.stack}</p>
                    </div>

                    <p className="text-base md:text-lg text-[#C8C4BB] leading-relaxed max-w-xl">{t.pitch}</p>

                    <div className="flex flex-wrap gap-3">
                        <a href={mail}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                            style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}>
                            <span className="material-symbols-outlined text-[18px]">mail</span>{t.ctaTalk}
                        </a>
                        <a href="/Anahi_Lozano_CV_2026.pdf" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#F8F5F0] transition-colors hover:border-[#C9A84C]"
                            style={{ border: `1px solid ${GOLD_BORDER}`, background: "rgba(255,255,255,0.02)" }}>
                            <span className="material-symbols-outlined text-[18px]">download</span>{t.ctaCv}
                        </a>
                        <Link to="/projects" className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-bold text-[#C8C4BB] hover:text-[#F8F5F0]">
                            {t.ctaWork}<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>

                    <p className="flex items-center gap-2 text-[12px] text-[#7A7872]">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>{t.where}
                    </p>
                </motion.div>

                <motion.a {...fade(0.1)} href="https://voraa.io/restaurantes/" target="_blank" rel="noopener noreferrer"
                    className="block group rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                    style={{ border: `1px solid ${GOLD_BORDER}`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#16171a] border-b border-white/5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3b3e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#3a3b3e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#3a3b3e]" />
                        <span className="ml-3 flex-1 text-[11px] text-[#7A7872] truncate">voraa.io/restaurantes</span>
                        <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{t.live}
                        </span>
                    </div>
                    <img src={voraaSite} alt="Voraa Lealtad" className="w-full aspect-[16/10] object-cover object-top" />
                </motion.a>
            </section>

            {/* ── Cifras verificables ── */}
            <motion.section {...fade()} className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden" style={{ border: `1px solid ${GOLD_BORDER}` }}>
                {t.numbers.map((n, i) => (
                    <div key={n.label} className={`p-6 md:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-white/5`}
                        style={{ background: "rgba(255,255,255,0.015)" }}>
                        <p className="text-4xl md:text-5xl italic" style={{ ...SERIF, color: GOLD }}>{n.value}</p>
                        <p className="mt-2 text-sm font-semibold text-[#F8F5F0]">{n.label}</p>
                        <p className="text-[11px] text-[#7A7872]">{n.sub}</p>
                    </div>
                ))}
            </motion.section>

            {/* ── Caso destacado ── */}
            <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <motion.div {...fade()} className="space-y-6">
                    <div>
                        <Eyebrow>{t.caseEyebrow}</Eyebrow>
                        <h2 className="normal-case tracking-normal text-4xl md:text-5xl italic text-[#F8F5F0]" style={SERIF}>{t.caseTitle}</h2>
                        <p className="mt-3 text-base text-[#C8C4BB]">{t.caseSub}</p>
                    </div>
                    <p className="text-sm font-semibold px-4 py-3 rounded-xl" style={{ background: GOLD_DIM, color: "#E8C97A", border: `1px solid ${GOLD_BORDER}` }}>{t.caseRole}</p>
                    <ul className="space-y-3.5">
                        {t.caseBullets.map(b => (
                            <li key={b} className="flex gap-3 text-[15px] text-[#C8C4BB] leading-relaxed">
                                <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0" style={{ color: GOLD }}>check_circle</span>{b}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {["TypeScript", "Next.js", "PostgreSQL", "Supabase", "PassKit", "Google Wallet", "Railway", "Cloudflare"].map(s => (
                            <span key={s} className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#9E9A90]" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>{s}</span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-5 pt-2 text-sm font-bold">
                        <a href="https://voraa.io/restaurantes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5" style={{ color: GOLD }}>
                            {t.caseSite}<span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                        <Link to="/projects" className="inline-flex items-center gap-1.5 text-[#C8C4BB] hover:text-[#F8F5F0]">
                            {t.caseMore}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                </motion.div>
                <motion.div {...fade(0.1)} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${GOLD_BORDER}` }}>
                    <img src={voraaCards} alt={lang === "es" ? "Tarjetas de lealtad de Voraa en Wallet" : "Voraa loyalty cards in Wallet"} className="w-full" />
                </motion.div>
            </section>

            {/* ── Experiencia ── */}
            <section>
                <motion.div {...fade()} className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div>
                        <Eyebrow>{t.expEyebrow}</Eyebrow>
                        <h2 className="normal-case tracking-normal text-3xl md:text-4xl italic text-[#F8F5F0]" style={SERIF}>{t.expTitle}</h2>
                    </div>
                    <Link to="/experience" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: GOLD }}>
                        {t.expMore}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-4">
                    {jobs.map((job, i) => {
                        const period = (lang === "es" ? job.periodEs : job.periodEn).split(" · ")[0];
                        const current = /Actualidad|Present/i.test(period);
                        return (
                            <motion.div key={job.id} {...fade(i * 0.06)} className="p-6 rounded-2xl space-y-3"
                                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[11px] font-semibold text-[#7A7872]">{period}</p>
                                    {current && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: GOLD_DIM, color: GOLD }}>{t.now}</span>}
                                </div>
                                <h3 className="normal-case tracking-normal text-2xl italic text-[#F8F5F0]" style={SERIF}>{lang === "es" ? job.companyEs : job.companyEn}</h3>
                                <p className="text-sm font-semibold" style={{ color: "#E8C97A" }}>{lang === "es" ? job.titleEs : job.titleEn}</p>
                                <p className="text-[13px] text-[#9E9A90] leading-relaxed line-clamp-4">{lang === "es" ? job.descriptionEs : job.descriptionEn}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ── Qué ofrezco: empleo y freelance ── */}
            <section>
                <motion.div {...fade()} className="mb-8"><Eyebrow>{t.offerEyebrow}</Eyebrow></motion.div>
                <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5">
                    <motion.div {...fade()} className="p-7 md:p-9 rounded-2xl flex flex-col"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="material-symbols-outlined text-[28px] mb-4" style={{ color: GOLD }}>groups</span>
                        <h3 className="normal-case tracking-normal text-2xl md:text-3xl italic text-[#F8F5F0] mb-5" style={SERIF}>{t.hireTitle}</h3>
                        <ul className="space-y-4 mb-8">
                            {t.hireItems.map(h => (
                                <li key={h} className="flex gap-3 text-[15px] text-[#C8C4BB] leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: GOLD }} />{h}
                                </li>
                            ))}
                        </ul>
                        <a href={mail} className="mt-auto self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#F8F5F0]"
                            style={{ border: `1px solid ${GOLD_BORDER}` }}>
                            {t.hireCta}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                    </motion.div>

                    <motion.div {...fade(0.08)} className="p-7 md:p-9 rounded-2xl flex flex-col"
                        style={{ background: `linear-gradient(145deg, ${GOLD_DIM}, rgba(255,255,255,0.01))`, border: `1px solid ${GOLD_BORDER}` }}>
                        <span className="material-symbols-outlined text-[28px] mb-4" style={{ color: GOLD }}>rocket_launch</span>
                        <h3 className="normal-case tracking-normal text-2xl md:text-3xl italic text-[#F8F5F0] mb-6" style={SERIF}>{t.freeTitle}</h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-7">
                            {t.freeItems.map(f => (
                                <div key={f.t} className="flex gap-3">
                                    <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5" style={{ color: GOLD }}>{f.icon}</span>
                                    <div>
                                        <p className="text-[15px] font-semibold text-[#F8F5F0]">{f.t}</p>
                                        <p className="text-[13px] text-[#9E9A90] leading-relaxed">{f.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                            {t.steps.map((s, i) => (
                                <li key={s} className="p-3 rounded-xl text-[12px] font-semibold text-[#C8C4BB]" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <span className="block text-[11px] font-black mb-1" style={{ color: GOLD }}>0{i + 1}</span>{s}
                                </li>
                            ))}
                        </ol>
                        <a href={mail} className="mt-auto self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black"
                            style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}>
                            {t.freeCta}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Tecnologías y formación ── */}
            <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
                <motion.div {...fade()} className="p-7 md:p-9 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Eyebrow>{t.stackEyebrow}</Eyebrow>
                    <div className="space-y-5 mt-5">
                        {t.stackGroups.map(g => (
                            <div key={g.name}>
                                <p className="text-[12px] font-bold text-[#7A7872] mb-2">{g.name}</p>
                                <div className="flex flex-wrap gap-2">
                                    {g.items.map(s => (
                                        <span key={s} className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#E6E2D8]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div {...fade(0.08)} className="p-7 md:p-9 rounded-2xl flex flex-col" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Eyebrow>{t.eduTitle}</Eyebrow>
                    <span className="material-symbols-outlined text-[28px] mt-3 mb-3" style={{ color: GOLD }}>school</span>
                    <p className="text-[15px] font-semibold text-[#F8F5F0] leading-relaxed">{t.edu}</p>
                    <p className="mt-4 text-[14px] text-[#9E9A90] leading-relaxed">{t.certs}</p>
                    <Link to="/certificates" className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: GOLD }}>
                        {t.certsCta}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </motion.div>
            </section>

            {/* ── Cierre ── */}
            <motion.section {...fade()} className="rounded-3xl px-6 py-14 md:p-16 text-center space-y-6"
                style={{ background: `radial-gradient(ellipse at top, ${GOLD_DIM}, transparent 70%)`, border: `1px solid ${GOLD_BORDER}` }}>
                <h2 className="normal-case tracking-normal text-3xl md:text-5xl italic text-[#F8F5F0]" style={SERIF}>{t.finalTitle}</h2>
                <p className="text-[#9E9A90]">{t.finalSub}</p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a href={mail} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-black"
                        style={{ background: `linear-gradient(135deg, #E8C97A, ${GOLD} 60%, #A87C30)` }}>
                        <span className="material-symbols-outlined text-[18px]">mail</span>{CONTACT_CONFIG.email}
                    </a>
                    <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#F8F5F0]" style={{ border: `1px solid ${GOLD_BORDER}` }}>
                        LinkedIn
                    </a>
                    <a href="/Anahi_Lozano_CV_2026.pdf" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#F8F5F0]" style={{ border: `1px solid ${GOLD_BORDER}` }}>
                        {t.ctaCv}
                    </a>
                </div>
            </motion.section>
        </main>
    );
};

export default RHHomePage;
