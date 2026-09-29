import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import Lenis from "lenis";
import { GlobalContext } from "../context/GlobalContext";
import { CONTACT_CONFIG } from "../config";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { certificates } from "./dataprojetcts/certificates";
import voraaSite from "../assets/projects/voraa/1.png";
import voraaCards from "../assets/projects/voraa/3.png";
import booskha from "../assets/projects/buskq/booskha.png";
import { PIXEL, PixelCat, Sakura, LevelHud, AchievementToast, useAchievements, useKonami } from "./Kawaii";

// Una sola página: la barra lleva a cada sección con scroll suave (Lenis).
// Todo lo que se afirma sale del CV 2026 o de los sitios enlazados.

const SECTIONS = ["inicio", "sobre-mi", "experiencia", "proyectos", "servicios", "certificados", "contacto"] as const;
type SectionId = typeof SECTIONS[number];

// Las rutas viejas siguen funcionando: llevan a su sección.
export const LEGACY_ROUTES: Record<string, SectionId> = {
    "/about": "sobre-mi", "/experience": "experiencia", "/projects": "proyectos",
    "/certificates": "certificados", "/contact": "contacto",
};

const CV = "/Anahi_Lozano_CV_2026.pdf";
const SERIF = { fontFamily: "'Instrument Serif', 'Playfair Display', serif" };

const copy = {
    es: {
        nav: { "inicio": "Inicio", "sobre-mi": "Sobre mí", "experiencia": "Experiencia", "proyectos": "Proyectos", "servicios": "Servicios", "certificados": "Certificados", "contacto": "Contacto" },
        cv: "CV",
        hello: "Hola, soy",
        role: "Desarrolladora Full Stack",
        heroLine: "Construyo software que la gente usa de verdad: de la base de datos al pase que llevas en tu Wallet.",
        chips: ["Aguascalientes, México", "Programando desde 2016", "Remoto · híbrido"],
        available: "Disponible para empleo y freelance",
        ctaWork: "Trabajemos juntos",
        ctaCv: "Descargar CV",
        badgeA: "1,284 pruebas escritas por mí",
        badgeB: "Web · móvil · escritorio",
        scroll: "▶ PRESS START",
        aboutKicker: "Sobre mí",
        aboutTitle: ["No soy un puesto.", "Soy la persona que se queda hasta que funciona."],
        about: [
            "Empecé a programar en 2016, en la carrera técnica del CECyTEA, y desde entonces no he dejado de construir. Estudié Ingeniería en Tecnologías de la Información en el Tecnológico de Aguascalientes, me clavé con redes y seguridad hasta sacar las certificaciones CCNA de Cisco, y descubrí lo que más me mueve: ver algo que hice funcionando en las manos de otra persona.",
            "Muchos de mis proyectos nacen de mi propia vida: una app para ordenar mis finanzas, otra para registrar mis entrenamientos, un traductor de lenguaje de señas para que más gente pueda comunicarse. Antes del software pasé dos años atendiendo clientes en servicios financieros; ahí aprendí a escuchar, a cuidar la información de las personas y a explicar lo complicado con palabras simples.",
            "Hoy me hago cargo de productos completos: pienso la arquitectura, diseño los datos, escribo las pruebas, despliego y me siento con los usuarios a ver qué no se entiende. Y si algo no lo sé, lo aprendo: así llevé Apple Wallet y Google Wallet a producción.",
        ],
        traits: [
            { t: "Me hago dueña del problema", d: "No entrego tickets, entrego cosas que funcionan de punta a punta." },
            { t: "Pruebo lo que construyo", d: "Llevo 1,284 pruebas automatizadas escritas. Lo que no se prueba, se rompe." },
            { t: "Hablo claro", d: "Con el equipo, con el cliente y con quien no es técnico." },
            { t: "Aprendo rápido", d: "PassKit, APNs, .NET, Flutter: si el producto lo pide, lo domino." },
        ],
        facts: [
            ["Formación", "Ingeniería en TIC · ITA"],
            ["Antes", "Técnica en Programación · CECyTEA"],
            ["Idiomas", "Español nativo · Inglés B2"],
            ["Base", "Aguascalientes · remoto"],
            ["Fuera del código", "Videojuegos · anime ✦"],
        ],
        numbers: [
            ["2016", "empecé a programar"],
            ["1,284", "pruebas automatizadas"],
            ["53", "rutas de API en producción"],
            ["77", "proyectos .NET que mantengo"],
            ["11", "certificaciones"],
        ],
        expKicker: "Experiencia",
        expTitle: "Lo que he logrado",
        now: "Actual",
        projKicker: "Proyectos",
        projTitle: "Cosas que hice y siguen vivas",
        live: "En vivo",
        visit: "Visitar",
        code: "Código",
        more: "Proyectos propios",
        servKicker: "Servicios freelance",
        servTitle: "¿Tienes una idea o un negocio? Lo construimos.",
        services: [
            { n: "01", t: "Sitios y apps web a la medida", d: "Desde una página que vende hasta un sistema con panel de administración, usuarios y roles. React, Next.js y Node.js." },
            { n: "02", t: "Tarjetas de lealtad y pases Wallet", d: "Tu marca en Apple Wallet y Google Wallet: sellos, recompensas y avisos que llegan al celular de tus clientes." },
            { n: "03", t: "Apps móviles", d: "Apps en Flutter para Android y iOS, listas para publicarse en las tiendas." },
            { n: "04", t: "Rescate y mantenimiento", d: "¿Tienes un sistema que falla o que nadie entiende? Lo diagnostico, lo estabilizo y lo documento." },
        ],
        process: ["Platicamos 30 minutos", "Te mando propuesta, tiempos y costo", "Ves avances cada semana", "Entrego, despliego y te acompaño"],
        quote: "Cotizar mi proyecto",
        certKicker: "Certificaciones",
        certTitle: "Aprender es parte del trabajo",
        pdf: "Ver PDF",
        verify: "Verificar",
        contactKicker: "Contacto",
        contactTitle: "Hablemos.",
        contactLine: "Para una vacante, un proyecto freelance o sólo para conocernos.",
        copy: "Copiar",
        copied: "¡Copiado!",
        footer: "Hecho con ♡, café y muchas partidas (っ˘ω˘ς )",
        mail: "Hola Anahí, vi tu portafolio",
    },
    en: {
        nav: { "inicio": "Home", "sobre-mi": "About", "experiencia": "Experience", "proyectos": "Projects", "servicios": "Services", "certificados": "Certificates", "contacto": "Contact" },
        cv: "CV",
        hello: "Hi, I'm",
        role: "Full Stack Developer",
        heroLine: "I build software people actually use: from the database to the pass in your Wallet.",
        chips: ["Aguascalientes, Mexico", "Coding since 2016", "Remote · hybrid"],
        available: "Open to full-time roles and freelance",
        ctaWork: "Let's work together",
        ctaCv: "Download CV",
        badgeA: "1,284 tests written by me",
        badgeB: "Web · mobile · desktop",
        scroll: "▶ PRESS START",
        aboutKicker: "About me",
        aboutTitle: ["I'm not a job title.", "I'm the one who stays until it works."],
        about: [
            "I started coding in 2016, in the programming technical program at CECyTEA, and I haven't stopped building since. I studied Information and Communication Technologies Engineering at the Instituto Tecnológico de Aguascalientes, went deep into networking and security all the way to Cisco's CCNA certifications, and found what drives me most: seeing something I made working in someone else's hands.",
            "Many of my projects come from my own life: an app to organize my finances, another to track my workouts, a sign-language translator so more people can communicate. Before software I spent two years in customer service at a financial services company; that's where I learned to listen, to take care of people's information and to explain complex things in simple words.",
            "Today I own complete products: I think through the architecture, design the data, write the tests, deploy, and sit with users to see what isn't clear. And if I don't know something, I learn it: that's how I shipped Apple Wallet and Google Wallet to production.",
        ],
        traits: [
            { t: "I own the problem", d: "I don't close tickets, I ship things that work end to end." },
            { t: "I test what I build", d: "1,284 automated tests written so far. What isn't tested breaks." },
            { t: "I speak plainly", d: "With the team, with clients and with non-technical people." },
            { t: "I learn fast", d: "PassKit, APNs, .NET, Flutter: if the product needs it, I master it." },
        ],
        facts: [
            ["Education", "B.Eng. in ICT · ITA"],
            ["Before that", "Programming technician · CECyTEA"],
            ["Languages", "Spanish (native) · English B2"],
            ["Based in", "Aguascalientes · remote"],
            ["Off the clock", "Video games · anime ✦"],
        ],
        numbers: [
            ["2016", "started coding"],
            ["1,284", "automated tests"],
            ["53", "API routes in production"],
            ["77", ".NET projects I maintain"],
            ["11", "certifications"],
        ],
        expKicker: "Experience",
        expTitle: "What I've achieved",
        now: "Current",
        projKicker: "Projects",
        projTitle: "Things I built that are still alive",
        live: "Live",
        visit: "Visit",
        code: "Code",
        more: "Personal projects",
        servKicker: "Freelance services",
        servTitle: "Got an idea or a business? Let's build it.",
        services: [
            { n: "01", t: "Custom websites and web apps", d: "From a page that sells to a full system with an admin panel, users and roles. React, Next.js and Node.js." },
            { n: "02", t: "Loyalty cards and Wallet passes", d: "Your brand in Apple Wallet and Google Wallet: stamps, rewards and notifications on your customers' phones." },
            { n: "03", t: "Mobile apps", d: "Flutter apps for Android and iOS, ready to publish on the stores." },
            { n: "04", t: "Rescue and maintenance", d: "A system that keeps failing or that nobody understands? I diagnose it, stabilize it and document it." },
        ],
        process: ["We talk for 30 minutes", "You get a proposal, timeline and cost", "You see progress every week", "I deliver, deploy and support you"],
        quote: "Get a quote",
        certKicker: "Certifications",
        certTitle: "Learning is part of the job",
        pdf: "View PDF",
        verify: "Verify",
        contactKicker: "Contact",
        contactTitle: "Let's talk.",
        contactLine: "For a role, a freelance project, or just to meet.",
        copy: "Copy",
        copied: "Copied!",
        footer: "Made with ♡, coffee and many game sessions (っ˘ω˘ς )",
        mail: "Hi Anahí, I saw your portfolio",
    },
};

type Job = {
    company: string; role: { es: string; en: string }; period: { es: string; en: string }; place: { es: string; en: string };
    headline: { es: string; en: string }; links: { label: string; href: string }[];
    bullets: { es: string[]; en: string[] }; stack: string[]; current?: boolean;
};

const JOBS: Job[] = [
    {
        company: "Voraa", current: true,
        role: { es: "Desarrolladora Full Stack · única ingeniera", en: "Full Stack Developer · sole engineer" },
        period: { es: "May 2026 – hoy", en: "May 2026 – now" },
        place: { es: "Aguascalientes, México", en: "Aguascalientes, Mexico" },
        headline: { es: "Construí sola una plataforma de lealtad que hoy está en producción.", en: "I single-handedly built a loyalty platform that is live in production." },
        links: [{ label: "voraa.io", href: "https://voraa.io/restaurantes/" }],
        bullets: {
            es: [
                "Construí Voraa Lealtad de punta a punta: alta autoservicio de restaurantes, registro de clientes por QR y teléfono, visitas y canje de recompensas por marca y sucursal.",
                "Diseñé el monorepo de tres servicios (Next.js, TypeScript, PostgreSQL / Supabase): 53 rutas de API, 18 migraciones y 1,284 pruebas automatizadas, desplegado en Railway y Cloudflare.",
                "Integré Apple Wallet y Google Wallet con PassKit, firma PKCS#7 y avisos por APNs: la tarjeta se actualiza sola en el celular del cliente.",
                "Blindé la seguridad: autorización en servidor, políticas a nivel de fila, rate limiting y reCAPTCHA Enterprise; migré los datos de Firebase a PostgreSQL.",
                "Creé un motor de enriquecimiento de negocios con Google Places, Geocoding, OpenStreetMap y Serper, y mantengo la app Flutter con CI en Codemagic.",
            ],
            en: [
                "Built Voraa Loyalty end to end: self-service restaurant onboarding, customer sign-up by QR and phone, visits and reward redemption per brand and location.",
                "Designed the three-service monorepo (Next.js, TypeScript, PostgreSQL / Supabase): 53 API routes, 18 migrations and 1,284 automated tests, deployed on Railway and Cloudflare.",
                "Integrated Apple Wallet and Google Wallet with PassKit, PKCS#7 signing and APNs: the card updates itself on the customer's phone.",
                "Hardened security: server-side authorization, row-level policies, rate limiting and reCAPTCHA Enterprise; migrated data from Firebase to PostgreSQL.",
                "Built a business-enrichment engine with Google Places, Geocoding, OpenStreetMap and Serper, and maintain the Flutter app with CI on Codemagic.",
            ],
        },
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "PassKit", "Google Wallet", "Flutter", "Railway", "Cloudflare"],
    },
    {
        company: "i3 Solutions Inc.", current: true,
        role: { es: "Desarrolladora de Software", en: "Software Developer" },
        period: { es: "May 2026 – hoy", en: "May 2026 – now" },
        place: { es: "Toronto, Canadá · remoto", en: "Toronto, Canada · remote" },
        headline: { es: "Mantengo software que usan hospitales en Canadá.", en: "I maintain software used by hospitals in Canada." },
        links: [{ label: "i3inc.ca", href: "https://i3inc.ca/" }, { label: "Panacea™", href: "https://i3inc.ca/panacea/" }],
        bullets: {
            es: [
                "Desarrollo y mantengo Panacea: terminales C# / WPF sobre .NET Framework y backend Node.js con MongoDB, junto a un equipo internacional.",
                "Resuelvo incidencias de reconexión, comunicación con el Management Server, reinicio remoto y estados de carga de las terminales en hospitales.",
                "Implementé y validé la reconexión automática (cinco intentos cada cinco segundos) con pruebas de recuperación cuando el servidor regresa.",
                "Trabajo en el módulo de facturación y monitoreo de compras con PayPal, dentro de una solución de 77 proyectos .NET, con Docker, WSL, Jira y pull requests.",
            ],
            en: [
                "I develop and maintain Panacea: C# / WPF terminals on .NET Framework and a Node.js backend with MongoDB, alongside an international team.",
                "I resolve reconnection, Management Server communication, remote restart and loading-state issues on hospital terminals.",
                "Implemented and validated automatic reconnection (five attempts every five seconds) with recovery tests when the server comes back.",
                "I work on billing and PayPal purchase monitoring, inside a 77-project .NET solution, with Docker, WSL, Jira and pull requests.",
            ],
        },
        stack: ["C#", "WPF", ".NET Framework", "Node.js", "MongoDB", "Docker", "Jira"],
    },
    {
        company: "Lemaboox",
        role: { es: "Desarrolladora Full Stack", en: "Full Stack Developer" },
        period: { es: "Ago 2025 – Jul 2026", en: "Aug 2025 – Jul 2026" },
        place: { es: "Aguascalientes, México", en: "Aguascalientes, Mexico" },
        headline: { es: "Llevé un directorio web de los requerimientos a producción.", en: "I took a web directory from requirements to production." },
        links: [{ label: "lemaboox.com", href: "https://lemaboox.com/" }, { label: "Booskha", href: "https://booskha.com/home" }],
        bullets: {
            es: [
                "Diseñé y desarrollé la plataforma web con Angular, Node.js, Express y MySQL, desde el levantamiento de requerimientos hasta la entrega.",
                "Implementé APIs REST, autenticación y roles (RBAC) y dashboards administrativos responsivos.",
                "Diseñé los esquemas relacionales, optimicé consultas y traduje procesos del negocio en funcionalidades junto a las áreas involucradas.",
            ],
            en: [
                "Designed and built the web platform with Angular, Node.js, Express and MySQL, from requirements gathering to delivery.",
                "Implemented REST APIs, authentication and role-based access (RBAC), and responsive admin dashboards.",
                "Designed relational schemas, optimized queries and turned business processes into features with the teams involved.",
            ],
        },
        stack: ["Angular", "Node.js", "Express", "MySQL", "RBAC"],
    },
    {
        company: "NRFM Finance Services",
        role: { es: "Servicio al Cliente", en: "Customer Service" },
        period: { es: "2022 – 2024", en: "2022 – 2024" },
        place: { es: "Aguascalientes, México", en: "Aguascalientes, Mexico" },
        headline: { es: "Aprendí a trabajar con personas e información delicada.", en: "I learned to work with people and sensitive information." },
        links: [],
        bullets: {
            es: ["Gestioné operaciones financieras y validaciones digitales con información sensible, con exactitud y apego a los procesos."],
            en: ["Handled financial operations and digital validations with sensitive information, accurately and by the book."],
        },
        stack: [],
    },
];

const TECH = [
    "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Supabase", "C#", ".NET", "WPF", "Flutter", "Angular",
    "Express", "MongoDB", "MySQL", "Apple Wallet", "Google Wallet", "Docker", "Railway", "Cloudflare", "Tailwind CSS",
    "Drizzle", "Firebase", "Kotlin", "Jetpack Compose", "Vitest", "Playwright", "GitHub Actions", "GitLab CI", "Figma",
];

// Proyectos que ya salen como destacados o que son este mismo sitio.
const SKIP_IN_GRID = ["voraa", "booskha", "portafolio"];

const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const Kicker = ({ children, n }: { children: React.ReactNode; n?: number }) => (
    <p className="flex items-center gap-2.5 text-[15px] text-[var(--one-accent)]" style={PIXEL}>
        <span className="text-[var(--one-accent-2)]">★</span>{n ? `STAGE 0${n} · ` : ""}{children}
    </p>
);

const Portrait = () => {
    const [ok, setOk] = useState(true);
    return ok ? (
        <img src="/anahi.jpg" alt="Anahí Lozano" onError={() => setOk(false)} className="h-full w-full object-cover" />
    ) : (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#3b2a6b,transparent_60%),radial-gradient(circle_at_80%_90%,#5b2346,transparent_55%)] bg-[#141220]">
            <span className="select-none text-[140px] leading-none text-[var(--one-paper)] italic" style={SERIF}>AL</span>
        </div>
    );
};

const OnePage = () => {
    const { lang, setLang } = useContext(GlobalContext);
    const t = copy[lang as "es" | "en"] || copy.es;
    const L = (lang === "en" ? "en" : "es") as "es" | "en";
    const { projects } = useGithubProjects(L);

    const lenisRef = useRef<Lenis | null>(null);
    const [active, setActive] = useState<SectionId>("inicio");
    const [menuOpen, setMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [party, setParty] = useState(false);
    const { items: trophies, unlock } = useAchievements();
    const pets = useRef(0);
    const petCat = () => {
        pets.current += 1;
        if (pets.current === 5) unlock("cat", L === "es" ? "Amiga de los gatos" : "Cat friend", L === "es" ? "Acariciaste al gatito 5 veces · +50 XP" : "Pet the kitty 5 times · +50 XP");
    };
    useKonami(() => {
        unlock("konami", "↑↑↓↓←→←→BA", L === "es" ? "Código secreto · +30 vidas" : "Secret code · +30 lives");
        setParty(true);
        setTimeout(() => setParty(false), 7000);
    });
    const [scrolled, setScrolled] = useState(false);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    // Luz que sigue al cursor en el hero.
    const mx = useMotionValue(0.5), my = useMotionValue(0.3);
    const sx = useSpring(mx, { stiffness: 40, damping: 20 }), sy = useSpring(my, { stiffness: 40, damping: 20 });
    const glowX = useTransform(sx, v => `${v * 100}%`), glowY = useTransform(sy, v => `${v * 100}%`);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduce) {
            const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
            lenisRef.current = lenis;
            let id = 0;
            const raf = (time: number) => { lenis.raf(time); id = requestAnimationFrame(raf); };
            id = requestAnimationFrame(raf);
            return () => { cancelAnimationFrame(id); lenis.destroy(); lenisRef.current = null; };
        }
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id as SectionId); });
        }, { rootMargin: "-45% 0px -50% 0px" });
        SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
    }, []);

    const go = (id: SectionId) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (!el) return;
        // Lenis ya respeta el scroll-margin de cada sección (scroll-mt-24).
        if (lenisRef.current) lenisRef.current.scrollTo(id === "inicio" ? 0 : el, { duration: 1.2 });
        else el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", id === "inicio" ? "/" : `/#${id}`);
    };

    // Llegar por /about, /#proyectos, etc. baja directo a la sección.
    useEffect(() => {
        const fromHash = window.location.hash.replace("#", "") as SectionId;
        const target = SECTIONS.includes(fromHash) ? fromHash : LEGACY_ROUTES[window.location.pathname];
        if (target) setTimeout(() => go(target), 350);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (active === "contacto") unlock("end", L === "es" ? "Llegaste al final" : "You made it to the end", L === "es" ? "Gracias por leer hasta aquí · +100 XP" : "Thanks for reading this far · +100 XP");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const mail = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(t.mail)}`;
    const whatsapp = `https://wa.me/52${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(t.mail)}`;
    const copyMail = async () => {
        try { await navigator.clipboard.writeText(CONTACT_CONFIG.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* sin permiso de portapapeles */ }
    };

    const ownProjects = projects.filter(p => !SKIP_IN_GRID.some(s => `${p.title} ${p.github}`.toLowerCase().includes(s)));

    return (
        <div className="one min-h-screen bg-[var(--one-ink)] text-[var(--one-paper)] antialiased selection:bg-[var(--one-accent)] selection:text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
            <motion.div className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-[var(--one-accent)] to-[var(--one-accent-2)]" style={{ scaleX: progress }} />

            {/* ── Barra ── */}
            <header className="fixed inset-x-0 top-0 z-[110] px-4 pt-4">
                <nav className={`mx-auto flex max-w-[1200px] items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${scrolled ? "border-white/10 bg-[#0d0c14]/75 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
                    <button onClick={() => go("inicio")} className="flex items-center gap-2.5 pl-2 pr-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--one-accent)] to-[var(--one-accent-2)] text-[13px] font-bold text-black">A</span>
                        <span className="text-[15px] font-semibold tracking-tight">Anahí Lozano</span>
                    </button>

                    <ul className="hidden items-center gap-1 lg:flex">
                        {SECTIONS.slice(1).map(id => (
                            <li key={id} className="relative">
                                <button onClick={() => go(id)} className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${active === id ? "text-black" : "text-white/65 hover:text-white"}`}>
                                    {t.nav[id]}
                                </button>
                                {active === id && (
                                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[var(--one-paper)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setLang(lang === "es" ? "en" : "es")} className="rounded-full border border-white/10 px-3 py-2 text-[12px] font-semibold text-white/75 hover:text-white">
                            {lang === "es" ? "EN" : "ES"}
                        </button>
                        <a href={CV} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[var(--one-paper)] px-4 py-2 text-[13px] font-semibold text-black transition-transform hover:scale-[1.04] sm:inline-flex">{t.cv} ↓</a>
                        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menú" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 lg:hidden">
                            <span className="material-symbols-outlined text-[20px]">{menuOpen ? "close" : "menu"}</span>
                        </button>
                    </div>
                </nav>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="mx-auto mt-2 max-w-[1200px] rounded-3xl border border-white/10 bg-[#0d0c14]/95 p-3 backdrop-blur-xl lg:hidden">
                            {SECTIONS.slice(1).map((id, i) => (
                                <motion.button key={id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035 }}
                                    onClick={() => go(id)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-lg ${active === id ? "bg-white/10" : ""}`}>
                                    <span style={SERIF} className="text-2xl italic">{t.nav[id]}</span>
                                    <span className="text-[11px] text-white/40">0{i + 1}</span>
                                </motion.button>
                            ))}
                            <a href={CV} target="_blank" rel="noopener noreferrer" className="mt-2 flex w-full justify-center rounded-2xl bg-[var(--one-paper)] py-3.5 text-sm font-semibold text-black">{t.ctaCv}</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Inicio ── */}
            <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}>
                <motion.div className="pointer-events-none absolute h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
                    style={{ left: glowX, top: glowY, background: "radial-gradient(circle, rgba(182,156,255,0.35), rgba(255,158,207,0.12) 45%, transparent 70%)" }} />
                <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                <Sakura />

                <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
                    <div>
                        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-emerald-300">
                            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
                            {t.available}
                        </motion.span>

                        <h1 className="mt-5 leading-[0.92] tracking-[-0.02em]">
                            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}
                                className="block text-[22px] font-medium text-white/55 sm:text-[26px]">{t.hello}</motion.span>
                            {["Anahí", "Lozano"].map((w, i) => (
                                <span key={w} className="block overflow-hidden pb-2">
                                    <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                        className={`block text-[76px] sm:text-[112px] lg:text-[128px] ${i ? "italic bg-gradient-to-r from-[var(--one-accent)] via-[#d9c8ff] to-[var(--one-accent-2)] bg-clip-text text-transparent" : ""}`} style={SERIF}>
                                        {w}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
                            <p className="mt-4 text-xl font-semibold sm:text-2xl">{t.role}<span className="kawaii-caret ml-1.5 inline-block h-[0.85em] w-[3px] translate-y-[3px] bg-[var(--one-accent)]" /></p>
                            <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-white/65 sm:text-lg">{t.heroLine}</p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {t.chips.map(c => <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/70">{c}</span>)}
                            </div>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <button onClick={() => go("contacto")} className="group inline-flex items-center gap-2 rounded-full bg-[var(--one-paper)] px-7 py-4 text-[15px] font-semibold text-black transition-transform hover:scale-[1.03]">
                                    {t.ctaWork}<span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </button>
                                <a href={CV} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[15px] font-semibold transition-colors hover:border-white/40">
                                    <span className="material-symbols-outlined text-[18px]">download</span>{t.ctaCv}
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mx-auto w-full max-w-[380px]">
                        <div className="absolute -top-[48px] right-10 z-10"><PixelCat onPet={petCat} lang={L} /></div>
                        <div className="aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                            <Portrait />
                        </div>
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -left-6 top-10 rounded-2xl border border-white/10 bg-[#15131f]/90 px-4 py-3 text-[13px] font-medium shadow-xl backdrop-blur sm:-left-12">
                            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />{t.badgeA}
                        </motion.div>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-4 bottom-12 rounded-2xl border border-white/10 bg-[#15131f]/90 px-4 py-3 text-[13px] font-medium shadow-xl backdrop-blur sm:-right-10">
                            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--one-accent)]" />{t.badgeB}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.button onClick={() => go("sobre-mi")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="kawaii-press absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[15px] text-white/70 sm:flex" style={PIXEL}>
                    {t.scroll}
                    <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="material-symbols-outlined text-[18px]">south</motion.span>
                </motion.button>
            </section>

            {/* ── Cifras en movimiento ── */}
            <div className="relative overflow-hidden border-y border-white/[0.07] py-7">
                <div className="one-marquee flex w-max gap-14">
                    {[...t.numbers, ...t.numbers].map(([n, l], i) => (
                        <div key={i} className="flex items-baseline gap-3 whitespace-nowrap">
                            <span className="text-5xl italic text-[var(--one-accent)]" style={SERIF}>{n}</span>
                            <span className="text-[14px] text-white/55">{l}</span>
                            <span className="ml-10 text-white/15">✦</span>
                        </div>
                    ))}
                </div>
            </div>

            <main className="mx-auto max-w-[1200px] space-y-36 px-5 py-32 sm:px-8 md:space-y-44">

                {/* ── Sobre mí ── */}
                <section id="sobre-mi" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={1}>{t.aboutKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="mt-6 max-w-[980px] text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px]" style={SERIF}>
                        {t.aboutTitle[0]} <span className="italic text-white/45">{t.aboutTitle[1]}</span>
                    </motion.h2>

                    <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
                        <div className="space-y-6">
                            {t.about.map((p, i) => (
                                <motion.p key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
                                    className={`leading-relaxed ${i === 0 ? "text-xl text-white/90 sm:text-[22px]" : "text-[17px] text-white/65"}`}>{p}</motion.p>
                            ))}
                        </div>
                        <motion.dl {...reveal} className="h-fit divide-y divide-white/[0.07] rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6">
                            {t.facts.map(([k, v]) => (
                                <div key={k} className="py-5">
                                    <dt className="text-[11px] uppercase tracking-[0.22em] text-white/40">{k}</dt>
                                    <dd className="mt-1.5 text-[15px] font-medium">{v}</dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>

                    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {t.traits.map((tr, i) => (
                            <motion.div key={tr.t} {...reveal} transition={{ ...reveal.transition, delay: i * 0.07 }}
                                className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--one-accent)]/40 hover:bg-white/[0.04]">
                                <span className="text-[26px] text-[var(--one-accent)]" style={PIXEL}>{["♥", "⚔", "✦", "⚡"][i]}</span>
                                <h3 className="mt-6 text-[17px] font-semibold">{tr.t}</h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/55">{tr.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Experiencia ── */}
                <section id="experiencia" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={2}>{t.expKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="mt-6 text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px]" style={SERIF}>{t.expTitle}</motion.h2>

                    <div className="mt-16 space-y-5">
                        {JOBS.map((job, i) => (
                            <motion.article key={job.company} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }}
                                className="grid gap-8 rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-500 hover:border-white/15 md:grid-cols-[0.8fr_1.2fr] md:p-10">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 text-[13px] text-white/45">
                                        <span>{job.period[L]}</span>
                                        {job.current && <span className="rounded-full bg-[var(--one-accent)]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--one-accent)]">{t.now}</span>}
                                    </div>
                                    <h3 className="mt-3 text-[32px] leading-[1.08] sm:text-[38px]" style={SERIF}>{job.headline[L]}</h3>
                                    <p className="mt-4 font-semibold text-white/90">{job.role[L]}</p>
                                    <p className="mt-1 text-[13px] text-white/45">{job.company} · {job.place[L]}</p>
                                    {job.links.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {job.links.map(l => (
                                                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                                                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold transition-colors hover:border-[var(--one-accent)] hover:text-[var(--one-accent)]">
                                                    {l.label}<span className="material-symbols-outlined text-[15px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">north_east</span>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <ul className="space-y-3.5">
                                        {job.bullets[L].map(b => (
                                            <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                                                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--one-accent)]" />{b}
                                            </li>
                                        ))}
                                    </ul>
                                    {job.stack.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-1.5">
                                            {job.stack.map(s => <span key={s} className="rounded-full bg-white/[0.05] px-3 py-1 text-[12px] text-white/60">{s}</span>)}
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* ── Proyectos ── */}
                <section id="proyectos" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={3}>{t.projKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="mt-6 text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px]" style={SERIF}>{t.projTitle}</motion.h2>

                    <div className="mt-16 grid gap-5 lg:grid-cols-2">
                        {[
                            { name: "Voraa Lealtad", where: L === "es" ? "Única ingeniera · de punta a punta" : "Sole engineer · end to end", href: "https://voraa.io/restaurantes/", img: voraaCards, alt: voraaSite,
                              d: L === "es" ? "Programas de lealtad para restaurantes con tarjetas en Apple y Google Wallet. Lo construí completo como única ingeniera." : "Loyalty programs for restaurants with Apple and Google Wallet cards. I built it end to end as the sole engineer.",
                              tags: ["Next.js", "PostgreSQL", "PassKit", "Google Wallet"] },
                            { name: "Booskha", where: L === "es" ? "Del requerimiento a producción" : "From requirements to production", href: "https://booskha.com/home", img: booskha, alt: booskha,
                              d: L === "es" ? "Directorio que conecta a personas con negocios locales: búsqueda por ciudad, colonia o código postal y panel con roles." : "Directory connecting people with local businesses: search by city, neighborhood or ZIP code and a role-based panel.",
                              tags: ["Angular", "Node.js", "Express", "MySQL"] },
                        ].map((p, i) => (
                            <motion.a key={p.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} href={p.href} target="_blank" rel="noopener noreferrer"
                                className="group block overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] transition-colors duration-500 hover:border-white/20">
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f0ea]">
                                    <img src={p.img} alt={p.name} className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" />
                                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[12px] font-semibold text-emerald-300 backdrop-blur">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{t.live}
                                    </span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-[12px] uppercase tracking-[0.2em] text-white/40">{p.where}</p>
                                            <h3 className="mt-1 text-[34px] leading-tight" style={SERIF}>{p.name}</h3>
                                        </div>
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--one-accent)] group-hover:bg-[var(--one-accent)] group-hover:text-black">
                                            <span className="material-symbols-outlined text-[20px]">north_east</span>
                                        </span>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-white/60">{p.d}</p>
                                    <div className="mt-5 flex flex-wrap gap-1.5">{p.tags.map(s => <span key={s} className="rounded-full bg-white/[0.05] px-3 py-1 text-[12px] text-white/60">{s}</span>)}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    <motion.h3 {...reveal} className="mt-20 text-[28px]" style={SERIF}>{t.more}</motion.h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {ownProjects.slice(0, 9).map((p, i) => (
                            <motion.div key={String(p.id)} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }}
                                className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#221d36] to-[#1a1320]">
                                    {p.images?.[0]
                                        ? <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
                                        : <div className="flex h-full items-center justify-center text-6xl italic text-white/20" style={SERIF}>{p.title.slice(0, 1)}</div>}
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <h4 className="text-[17px] font-semibold leading-snug">{p.title}</h4>
                                    <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-white/55">{p.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-1.5">{(p.stack || []).slice(0, 4).map(s => <span key={s} className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white/55">{s}</span>)}</div>
                                    <div className="mt-auto flex gap-4 pt-5 text-[13px] font-semibold">
                                        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-[var(--one-accent)]">{t.code}<span className="material-symbols-outlined text-[15px]">north_east</span></a>}
                                        {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-[var(--one-accent)]">{t.visit}<span className="material-symbols-outlined text-[15px]">north_east</span></a>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Servicios ── */}
                <section id="servicios" className="scroll-mt-24">
                    <motion.div {...reveal} className="overflow-hidden rounded-[36px] border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_left,rgba(182,156,255,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(255,158,207,0.08),transparent_50%)] p-7 sm:p-12 md:p-16">
                        <Kicker n={4}>{t.servKicker}</Kicker>
                        <h2 className="mt-6 max-w-[820px] text-[40px] leading-[1.04] tracking-[-0.02em] sm:text-[60px]" style={SERIF}>{t.servTitle}</h2>
                        <div className="mt-14 grid gap-x-10 gap-y-2 md:grid-cols-2">
                            {t.services.map(s => (
                                <div key={s.n} className="group flex gap-5 border-t border-white/10 py-7">
                                    <span className="text-[13px] font-semibold text-[var(--one-accent)]">{s.n}</span>
                                    <div>
                                        <h3 className="text-xl font-semibold transition-colors group-hover:text-[var(--one-accent)]">{s.t}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {t.process.map((p, i) => (
                                <li key={p} className="rounded-2xl bg-black/30 p-5">
                                    <span className="text-2xl italic text-[var(--one-accent)]" style={SERIF}>{i + 1}.</span>
                                    <p className="mt-2 text-[14px] font-medium text-white/80">{p}</p>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--one-paper)] px-7 py-4 text-[15px] font-semibold text-black transition-transform hover:scale-[1.03]">
                                {t.quote}<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                            <a href={mail} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[15px] font-semibold hover:border-white/40">{CONTACT_CONFIG.email}</a>
                        </div>
                    </motion.div>
                </section>

                {/* ── Tecnologías (dos filas en sentidos opuestos) ── */}
                <div className="-mx-5 space-y-4 overflow-hidden sm:-mx-8">
                    {[TECH, [...TECH].reverse()].map((row, r) => (
                        <div key={r} className={`one-marquee flex w-max gap-3 ${r ? "one-marquee-reverse" : ""}`}>
                            {[...row, ...row].map((s, i) => (
                                <span key={i} className="whitespace-nowrap rounded-full border border-white/10 px-5 py-2.5 text-[15px] text-white/70">{s}</span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* ── Certificados ── */}
                <section id="certificados" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={5}>{t.certKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="mt-6 text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px]" style={SERIF}>{t.certTitle}</motion.h2>
                    <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                        {certificates.map((c, i) => (
                            <motion.div key={c.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                                className="group grid items-center gap-3 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1fr_auto] sm:px-3">
                                <div className="flex items-baseline gap-4">
                                    <span className="w-8 shrink-0 text-[12px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                                    <div>
                                        <p className="text-[16px] font-medium transition-colors group-hover:text-[var(--one-accent)]">{c.title}</p>
                                        <p className="text-[13px] text-white/45">{c.issuer} · {c.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pl-12 sm:pl-0">
                                    {c.file && <a href={c.file} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/12 px-4 py-1.5 text-[12px] font-semibold text-white/75 hover:border-white/40 hover:text-white">{t.pdf}</a>}
                                    {c.verify && <a href={c.verify} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/12 px-4 py-1.5 text-[12px] font-semibold text-white/75 hover:border-white/40 hover:text-white">{t.verify}</a>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Contacto ── */}
                <section id="contacto" className="scroll-mt-24 pb-10">
                    <motion.div {...reveal}><Kicker n={6}>{t.contactKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="mt-6 text-[88px] leading-[0.9] tracking-[-0.03em] sm:text-[150px]" style={SERIF}>
                        <span className="italic bg-gradient-to-r from-[var(--one-accent)] to-[var(--one-accent-2)] bg-clip-text text-transparent">{t.contactTitle}</span>
                    </motion.h2>
                    <motion.p {...reveal} className="mt-6 max-w-[520px] text-lg text-white/60">{t.contactLine}</motion.p>

                    <motion.div {...reveal} className="mt-12 flex flex-wrap items-center gap-3">
                        <a href={mail} className="break-all text-2xl font-semibold underline decoration-white/20 decoration-2 underline-offset-8 transition-colors hover:decoration-[var(--one-accent)] sm:text-4xl">{CONTACT_CONFIG.email}</a>
                        <button onClick={copyMail} className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-white/70 hover:text-white">{copied ? t.copied : t.copy}</button>
                    </motion.div>

                    <motion.div {...reveal} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { l: "LinkedIn", h: CONTACT_CONFIG.linkedin, i: "work" },
                            { l: "GitHub", h: "https://github.com/Alucarduwu", i: "code" },
                            { l: "WhatsApp", h: whatsapp, i: "chat" },
                            { l: t.ctaCv, h: CV, i: "description" },
                        ].map(x => (
                            <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer"
                                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 transition-all duration-500 hover:border-[var(--one-accent)]/50 hover:bg-white/[0.04]">
                                <span className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[20px] text-white/50">{x.i}</span>{x.l}</span>
                                <span className="material-symbols-outlined text-[18px] text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--one-accent)]">north_east</span>
                            </a>
                        ))}
                    </motion.div>
                </section>
            </main>

            <LevelHud level={SECTIONS.indexOf(active) + 1} total={SECTIONS.length} label={t.nav[active]} />
            <AchievementToast items={trophies} lang={L} />
            {party && <div className="pointer-events-none fixed inset-0 z-[125]"><Sakura /><Sakura /></div>}

            <footer className="border-t border-white/[0.07] px-5 pb-24 pt-10 sm:px-8">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-[13px] text-white/40 sm:flex-row">
                    <span>© 2026 Anahí Lozano</span>
                    <span>{t.footer}</span>
                    <button onClick={() => go("inicio")} className="inline-flex items-center gap-1 hover:text-white">↑ {t.nav.inicio}</button>
                </div>
            </footer>
        </div>
    );
};

export default OnePage;
