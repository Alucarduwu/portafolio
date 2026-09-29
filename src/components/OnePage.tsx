import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { GlobalContext } from "../context/GlobalContext";
import { CONTACT_CONFIG } from "../config";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { certificates } from "./dataprojetcts/certificates";
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

// Etiqueta de sección: sticker con letra pixel, como pantalla de nivel.
const Kicker = ({ children, n, color = "var(--lila)" }: { children: React.ReactNode; n?: number; color?: string }) => (
    <span className="tag -rotate-1 text-[14px]" style={{ ...PIXEL, background: color }}>
        ★ {n ? `STAGE 0${n} · ` : ""}{children}
    </span>
);

// Ventanita de sistema viejito: barra con título pixel y botones _ □ ×.
const Win = ({ title, color, children, className = "" }: { title: React.ReactNode; color: string; children: React.ReactNode; className?: string }) => (
    <div className={`stk overflow-hidden ${className}`}>
        <div className="win-bar" style={{ background: color }}>
            <span className="truncate">{title}</span>
            <span className="flex shrink-0 gap-1.5" aria-hidden>
                {["_", "□", "×"].map(b => <span key={b} className="flex h-5 w-5 items-center justify-center rounded-[5px] border-2 border-[var(--ink)] bg-white text-[11px] leading-none">{b}</span>)}
            </span>
        </div>
        {children}
    </div>
);

const Portrait = () => {
    const [ok, setOk] = useState(true);
    return ok ? (
        <img src="/anahi.jpg" alt="Anahí Lozano" onError={() => setOk(false)} className="h-full w-full object-cover" />
    ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--lila)]"
            style={{ backgroundImage: "radial-gradient(rgba(29,21,48,.14) 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }}>
            <span className="display select-none text-[120px] font-bold leading-none text-[var(--ink)]">AL</span>
            <span className="mt-2 text-[20px]" style={PIXEL}>(◕‿◕)♡</span>
        </div>
    );
};

const PASTELS = ["var(--lila)", "var(--menta)", "var(--mante)", "var(--rosa)", "var(--cielo)"];

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

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
        return () => obs.disconnect();
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
    const H2 = "display mt-5 text-[40px] font-bold leading-[1.05] sm:text-[60px]";

    return (
        <div className="one min-h-screen overflow-x-clip antialiased selection:bg-[var(--rosa)]">
            <motion.div className="fixed inset-x-0 top-0 z-[120] h-[5px] origin-left bg-[var(--rosa)]" style={{ scaleX: progress }} />

            {/* ── Barra ── */}
            <header className="fixed inset-x-0 top-0 z-[110] px-4 pt-4">
                <nav className="stk mx-auto flex max-w-[1200px] items-center justify-between !rounded-2xl px-2.5 py-2">
                    <button onClick={() => go("inicio")} className="flex items-center gap-2.5 pl-1 pr-3">
                        <span className="display flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-[var(--ink)] bg-[var(--rosa)] text-[15px] font-bold">A</span>
                        <span className="display text-[17px] font-semibold">Anahí Lozano</span>
                    </button>

                    <ul className="hidden items-center gap-1 lg:flex">
                        {SECTIONS.slice(1).map(id => (
                            <li key={id} className="relative">
                                <button onClick={() => go(id)} className="relative z-10 rounded-xl px-3.5 py-1.5 text-[14px] font-bold">
                                    {t.nav[id]}
                                </button>
                                {active === id && (
                                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl border-2 border-[var(--ink)] bg-[var(--mante)]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setLang(lang === "es" ? "en" : "es")} className="btn btn-sm bg-white">{lang === "es" ? "EN" : "ES"}</button>
                        <a href={CV} target="_blank" rel="noopener noreferrer" className="btn btn-sm hidden bg-[var(--menta)] sm:inline-flex">{t.cv} ↓</a>
                        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menú" className="btn btn-sm bg-white lg:hidden">
                            <span className="material-symbols-outlined text-[18px]">{menuOpen ? "close" : "menu"}</span>
                        </button>
                    </div>
                </nav>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="stk mx-auto mt-3 max-w-[1200px] p-3 lg:hidden">
                            {SECTIONS.slice(1).map((id, i) => (
                                <motion.button key={id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035 }}
                                    onClick={() => go(id)} className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left ${active === id ? "border-[var(--ink)] bg-[var(--mante)]" : "border-transparent"}`}>
                                    <span className="display text-2xl font-semibold">{t.nav[id]}</span>
                                    <span className="text-[13px]" style={PIXEL}>0{i + 1}</span>
                                </motion.button>
                            ))}
                            <a href={CV} target="_blank" rel="noopener noreferrer" className="btn mt-2 w-full bg-[var(--menta)]">{t.ctaCv}</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Inicio ── */}
            <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-32 sm:px-8">
                <Sakura />
                <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <motion.span initial={{ opacity: 0, y: 10, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: 0.5 }}
                            className="tag bg-[var(--menta)] text-[13px]">
                            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-emerald-400" /></span>
                            {t.available}
                        </motion.span>

                        <h1 className="display mt-6 font-bold leading-[0.95]">
                            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                                className="block text-[24px] font-semibold sm:text-[28px]">{t.hello} <span className="inline-block origin-[70%_70%] animate-[wiggle_2.4s_ease-in-out_infinite]">👋</span></motion.span>
                            {["Anahí", "Lozano"].map((w, i) => (
                                <motion.span key={w} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.15 + i * 0.12 }}
                                    className="block text-[78px] sm:text-[112px] lg:text-[128px]">
                                    <span className={i ? "hl" : ""}>{w}</span>{i === 1 && <span className="ml-2 inline-block -translate-y-10 rotate-12 text-[40px] text-[var(--one-accent)]">✦</span>}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
                            <p className="display mt-5 text-2xl font-semibold sm:text-[28px]">{t.role}<span className="kawaii-caret ml-1.5 inline-block h-[0.85em] w-[4px] translate-y-[3px] bg-[var(--one-accent)]" /></p>
                            <p className="mt-3 max-w-[560px] text-[18px] font-semibold leading-relaxed text-[var(--ink)]/70">{t.heroLine}</p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {t.chips.map((c, i) => <span key={c} className="tag" style={{ background: PASTELS[i + 2] }}>{c}</span>)}
                            </div>
                            <div className="mt-9 flex flex-wrap items-center gap-3.5">
                                <button onClick={() => go("contacto")} className="btn bg-[var(--rosa)] text-[16px]">
                                    {t.ctaWork}<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                                <a href={CV} target="_blank" rel="noopener noreferrer" className="btn bg-white text-[16px]">
                                    <span className="material-symbols-outlined text-[18px]">download</span>{t.ctaCv}
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Polaroid con cinta washi y el gatito encima */}
                    <motion.div initial={{ opacity: 0, rotate: -8, y: 30 }} animate={{ opacity: 1, rotate: 3, y: 0 }} transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.25 }}
                        className="relative mx-auto w-full max-w-[270px] sm:max-w-[360px]">
                        <span className="washi -left-6 top-3 -rotate-[28deg]" />
                        <span className="washi -right-6 top-3 rotate-[30deg]" style={{ background: "repeating-linear-gradient(45deg, rgba(168,236,208,.95) 0 9px, rgba(255,255,255,.75) 9px 18px)" }} />
                        <div className="absolute -top-[46px] left-8 z-10"><PixelCat onPet={petCat} lang={L} /></div>
                        <div className="stk bg-white p-3.5 pb-14">
                            <div className="aspect-[4/5] overflow-hidden rounded-[10px] border-[2.5px] border-[var(--ink)]">
                                <Portrait />
                            </div>
                            <p className="absolute bottom-4 left-0 right-0 text-center text-[17px]" style={PIXEL}>yo_2026.png ✌</p>
                        </div>
                        <motion.div animate={{ y: [0, -7, 0], rotate: [-6, -4, -6] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="tag absolute -left-6 bottom-[13%] bg-[var(--mante)] sm:-left-12 sm:bottom-[26%] px-3 py-1.5 text-[13px] shadow-[3px_3px_0_var(--ink)]">✦ {t.badgeA}</motion.div>
                        <motion.div animate={{ y: [0, 7, 0], rotate: [5, 7, 5] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                            className="tag absolute -right-4 top-[14%] bg-[var(--cielo)] sm:-right-8 px-3 py-1.5 text-[13px] shadow-[3px_3px_0_var(--ink)]">⌨ {t.badgeB}</motion.div>
                    </motion.div>
                </div>

                <motion.button onClick={() => go("sobre-mi")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="kawaii-press absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[17px] sm:block" style={PIXEL}>
                    {t.scroll}
                </motion.button>
            </section>

            {/* ── Cinta de cifras ── */}
            <div className="relative -mx-4 -rotate-[1.2deg] overflow-hidden border-y-[2.5px] border-[var(--ink)] bg-[var(--mante)] py-4">
                <div className="one-marquee flex w-max gap-10">
                    {[...t.numbers, ...t.numbers].map(([n, l], i) => (
                        <div key={i} className="flex items-baseline gap-2.5 whitespace-nowrap">
                            <span className="display text-4xl font-bold">{n}</span>
                            <span className="text-[15px] font-bold">{l}</span>
                            <span className="ml-8 text-[18px]" style={PIXEL}>♥</span>
                        </div>
                    ))}
                </div>
            </div>

            <main className="mx-auto max-w-[1200px] space-y-32 px-5 py-28 sm:px-8 md:space-y-40">

                {/* ── Sobre mí ── */}
                <section id="sobre-mi" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={1}>{t.aboutKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className={`${H2} max-w-[980px]`}>
                        {t.aboutTitle[0]} <span className="hl-lila">{t.aboutTitle[1]}</span>
                    </motion.h2>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
                        <motion.div {...reveal}>
                            <Win title="sobre_mi.txt" color="var(--lila)">
                                <div className="space-y-5 p-6 sm:p-8">
                                    {t.about.map((p, i) => (
                                        <p key={i} className={`leading-relaxed ${i === 0 ? "text-[19px] font-bold sm:text-[21px]" : "text-[17px] font-semibold text-[var(--ink)]/75"}`}>{p}</p>
                                    ))}
                                </div>
                            </Win>
                        </motion.div>
                        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                            <Win title="stats.json" color="var(--mante)">
                                <dl className="divide-y-2 divide-dashed divide-[var(--ink)]/15 px-5">
                                    {t.facts.map(([k, v]) => (
                                        <div key={k} className="py-4">
                                            <dt className="text-[12px] text-[var(--ink)]/55" style={PIXEL}>{k}</dt>
                                            <dd className="mt-0.5 text-[15px] font-extrabold">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Win>
                        </motion.div>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {t.traits.map((tr, i) => (
                            <motion.div key={tr.t} {...reveal} transition={{ ...reveal.transition, delay: i * 0.07 }}
                                className="stk stk-hover p-6" style={{ background: PASTELS[[3, 1, 0, 2][i]], rotate: `${[-1.5, 1, -0.8, 1.4][i]}deg` }}>
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[var(--ink)] bg-white text-[22px]" style={PIXEL}>{["♥", "⚔", "✦", "⚡"][i]}</span>
                                <h3 className="display mt-5 text-[19px] font-semibold">{tr.t}</h3>
                                <p className="mt-1.5 text-[14.5px] font-semibold leading-relaxed text-[var(--ink)]/75">{tr.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Experiencia ── */}
                <section id="experiencia" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={2} color="var(--menta)">{t.expKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className={H2}>{t.expTitle}</motion.h2>

                    <div className="mt-12 space-y-8">
                        {JOBS.map((job, i) => (
                            <motion.div key={job.company} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }}>
                                <Win color={PASTELS[i % PASTELS.length]} title={<>{`logro_0${i + 1}.exe`} <span className="opacity-60">· {job.period[L]}</span></>}>
                                    <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[0.85fr_1.15fr]">
                                        <div>
                                            {job.current && <span className="tag mb-3 bg-[var(--menta)]" style={PIXEL}>▶ {t.now}</span>}
                                            <h3 className="display text-[28px] font-bold leading-[1.1] sm:text-[32px]">{job.headline[L]}</h3>
                                            <p className="mt-4 text-[16px] font-extrabold">{job.role[L]}</p>
                                            <p className="mt-0.5 text-[14px] font-semibold text-[var(--ink)]/60">{job.company} · {job.place[L]}</p>
                                            {job.links.length > 0 && (
                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {job.links.map(l => (
                                                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-white">
                                                            {l.label}<span className="material-symbols-outlined text-[15px]">north_east</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <ul className="space-y-3">
                                                {job.bullets[L].map(b => (
                                                    <li key={b} className="flex gap-3 text-[15.5px] font-semibold leading-relaxed text-[var(--ink)]/80">
                                                        <span className="mt-[2px] shrink-0 text-[15px] text-[var(--one-accent-2)]" style={PIXEL}>♥</span>{b}
                                                    </li>
                                                ))}
                                            </ul>
                                            {job.stack.length > 0 && (
                                                <div className="mt-5 flex flex-wrap gap-1.5">
                                                    {job.stack.map(s => <span key={s} className="tag text-[12px]">{s}</span>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Win>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Proyectos ── */}
                <section id="proyectos" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={3} color="var(--mante)">{t.projKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className={H2}>{t.projTitle}</motion.h2>

                    <div className="mt-12 grid gap-8 lg:grid-cols-2">
                        {[
                            { name: "Voraa Lealtad", url: "voraa.io", where: L === "es" ? "Única ingeniera · de punta a punta" : "Sole engineer · end to end", href: "https://voraa.io/restaurantes/", img: voraaCards, color: "var(--rosa)",
                              d: L === "es" ? "Programas de lealtad para restaurantes con tarjetas en Apple y Google Wallet. Lo construí completo como única ingeniera." : "Loyalty programs for restaurants with Apple and Google Wallet cards. I built it end to end as the sole engineer.",
                              tags: ["Next.js", "PostgreSQL", "PassKit", "Google Wallet"] },
                            { name: "Booskha", url: "booskha.com", where: L === "es" ? "Del requerimiento a producción" : "From requirements to production", href: "https://booskha.com/home", img: booskha, color: "var(--cielo)",
                              d: L === "es" ? "Directorio que conecta a personas con negocios locales: búsqueda por ciudad, colonia o código postal y panel con roles." : "Directory connecting people with local businesses: search by city, neighborhood or ZIP code and a role-based panel.",
                              tags: ["Angular", "Node.js", "Express", "MySQL"] },
                        ].map((p, i) => (
                            <motion.a key={p.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
                                <Win color={p.color} className="stk-hover" title={<>{p.url} <span className="ml-1 inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-[var(--ink)] bg-emerald-400" />{t.live}</span></>}>
                                    <div className="aspect-[16/10] overflow-hidden border-b-[2.5px] border-[var(--ink)] bg-[#f3f0ea]">
                                        <img src={p.img} alt={p.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-[13px] text-[var(--ink)]/60" style={PIXEL}>{p.where}</p>
                                        <div className="mt-1 flex items-center justify-between gap-3">
                                            <h3 className="display text-[30px] font-bold">{p.name}</h3>
                                            <span className="btn btn-sm bg-[var(--mante)]">{t.visit} ↗</span>
                                        </div>
                                        <p className="mt-2 text-[15.5px] font-semibold leading-relaxed text-[var(--ink)]/75">{p.d}</p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">{p.tags.map(s => <span key={s} className="tag">{s}</span>)}</div>
                                    </div>
                                </Win>
                            </motion.a>
                        ))}
                    </div>

                    <motion.h3 {...reveal} className="display mt-20 text-[28px] font-bold">{t.more} <span style={PIXEL} className="text-[18px]">(｡•̀ᴗ-)✧</span></motion.h3>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {ownProjects.slice(0, 9).map((p, i) => (
                            <motion.div key={String(p.id)} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} className="h-full">
                                <Win color={PASTELS[i % PASTELS.length]} className="stk-hover flex h-full flex-col" title={(p.github?.split("/").pop() || p.title).toLowerCase()}>
                                    <div className="aspect-[16/9] overflow-hidden border-b-[2.5px] border-[var(--ink)] bg-[var(--paper)]">
                                        {p.images?.[0]
                                            ? <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover object-top" />
                                            : <div className="flex h-full items-center justify-center text-[42px]" style={PIXEL}>{p.title.slice(0, 1)}</div>}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <h4 className="display text-[18px] font-semibold leading-snug">{p.title}</h4>
                                        <p className="mt-1.5 line-clamp-3 text-[14px] font-semibold leading-relaxed text-[var(--ink)]/70">{p.description}</p>
                                        <div className="mt-3 flex flex-wrap gap-1.5">{(p.stack || []).slice(0, 4).map(s => <span key={s} className="tag text-[11px]">{s}</span>)}</div>
                                        <div className="mt-auto flex gap-2 pt-5">
                                            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-white">{t.code} ↗</a>}
                                            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[var(--menta)]">{t.visit} ↗</a>}
                                        </div>
                                    </div>
                                </Win>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Servicios ── */}
                <section id="servicios" className="scroll-mt-24">
                    <motion.div {...reveal} className="stk relative p-7 sm:p-12" style={{ background: "#efe8ff" }}>
                        <span className="washi -top-3 left-10 -rotate-3" />
                        <Kicker n={4} color="var(--rosa)">{t.servKicker}</Kicker>
                        <h2 className={`${H2} max-w-[820px]`}>{t.servTitle}</h2>
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {t.services.map((s, i) => (
                                <div key={s.n} className="stk stk-hover flex gap-4 bg-white p-5">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[2.5px] border-[var(--ink)] text-[16px]" style={{ ...PIXEL, background: PASTELS[i] }}>{s.n}</span>
                                    <div>
                                        <h3 className="display text-[20px] font-semibold">{s.t}</h3>
                                        <p className="mt-1 text-[15px] font-semibold leading-relaxed text-[var(--ink)]/70">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {t.process.map((p, i) => (
                                <li key={p} className="rounded-xl border-2 border-dashed border-[var(--ink)]/40 bg-white/70 p-4">
                                    <span className="text-[14px] text-[var(--one-accent)]" style={PIXEL}>{`PASO ${i + 1}`}</span>
                                    <p className="mt-1 text-[15px] font-bold">{p}</p>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn bg-[var(--rosa)]">{t.quote}<span className="material-symbols-outlined text-[18px]">arrow_forward</span></a>
                            <a href={mail} className="btn bg-white">{CONTACT_CONFIG.email}</a>
                        </div>
                    </motion.div>
                </section>

                {/* ── Tecnologías (dos filas en sentidos opuestos) ── */}
                <div className="-mx-5 space-y-3 overflow-hidden py-2 sm:-mx-8">
                    {[TECH, [...TECH].reverse()].map((row, r) => (
                        <div key={r} className={`one-marquee flex w-max gap-3 ${r ? "one-marquee-reverse" : ""}`}>
                            {[...row, ...row].map((s, i) => (
                                <span key={i} className="tag whitespace-nowrap px-4 py-1.5 text-[15px]" style={{ background: i % 3 === 0 ? PASTELS[(i + r) % PASTELS.length] : "#fff" }}>{s}</span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* ── Certificados ── */}
                <section id="certificados" className="scroll-mt-24">
                    <motion.div {...reveal}><Kicker n={5} color="var(--cielo)">{t.certKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className={H2}>{t.certTitle}</motion.h2>
                    <motion.div {...reveal} className="mt-12">
                        <Win title="certificados.zip" color="var(--cielo)">
                            <div className="divide-y-2 divide-dashed divide-[var(--ink)]/15">
                                {certificates.map((c, i) => (
                                    <div key={c.title} className="grid items-center gap-3 px-5 py-4 transition-colors hover:bg-[var(--paper)] sm:grid-cols-[1fr_auto] sm:px-7">
                                        <div className="flex items-baseline gap-4">
                                            <span className="w-7 shrink-0 text-[14px] text-[var(--one-accent)]" style={PIXEL}>{String(i + 1).padStart(2, "0")}</span>
                                            <div>
                                                <p className="text-[16px] font-extrabold">{c.title}</p>
                                                <p className="text-[13.5px] font-semibold text-[var(--ink)]/60">{c.issuer} · {c.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pl-11 sm:pl-0">
                                            {c.file && <a href={c.file} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-white">{t.pdf}</a>}
                                            {c.verify && <a href={c.verify} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[var(--menta)]">{t.verify} ✓</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Win>
                    </motion.div>
                </section>

                {/* ── Contacto ── */}
                <section id="contacto" className="scroll-mt-24 pb-10">
                    <motion.div {...reveal}><Kicker n={6} color="var(--rosa)">{t.contactKicker}</Kicker></motion.div>
                    <motion.h2 {...reveal} className="display mt-5 text-[76px] font-bold leading-[0.95] sm:text-[130px]">
                        <span className="hl">{t.contactTitle}</span> <span className="inline-block text-[44px] sm:text-[64px]" style={PIXEL}>♡</span>
                    </motion.h2>
                    <motion.p {...reveal} className="mt-5 max-w-[540px] text-[19px] font-semibold text-[var(--ink)]/70">{t.contactLine}</motion.p>

                    <motion.div {...reveal} className="mt-10 flex flex-wrap items-center gap-4">
                        <a href={mail} className="stk stk-hover relative break-all bg-white px-6 py-4 text-[22px] font-extrabold sm:text-[32px]">
                            {CONTACT_CONFIG.email}
                            <span className="absolute -bottom-[13px] left-10 h-5 w-5 rotate-45 border-b-[2.5px] border-r-[2.5px] border-[var(--ink)] bg-white" aria-hidden />
                        </a>
                        <button onClick={copyMail} className="btn btn-sm bg-[var(--mante)] text-[13px]">{copied ? t.copied : t.copy}</button>
                    </motion.div>

                    <motion.div {...reveal} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { l: "LinkedIn", h: CONTACT_CONFIG.linkedin, i: "work", c: "var(--cielo)" },
                            { l: "GitHub", h: "https://github.com/Alucarduwu", i: "code", c: "var(--menta)" },
                            { l: "WhatsApp", h: whatsapp, i: "chat", c: "var(--rosa)" },
                            { l: t.ctaCv, h: CV, i: "description", c: "var(--mante)" },
                        ].map(x => (
                            <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer" className="btn justify-between py-4 text-[17px]" style={{ background: x.c }}>
                                <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-[20px]">{x.i}</span>{x.l}</span>
                                <span className="material-symbols-outlined text-[18px]">north_east</span>
                            </a>
                        ))}
                    </motion.div>
                </section>
            </main>

            <LevelHud level={SECTIONS.indexOf(active) + 1} total={SECTIONS.length} label={t.nav[active]} />
            <AchievementToast items={trophies} lang={L} />
            {party && <div className="pointer-events-none fixed inset-0 z-[125]"><Sakura /><Sakura /></div>}

            <footer className="border-t-[2.5px] border-dashed border-[var(--ink)]/30 px-5 pb-24 pt-10 sm:px-8">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-[14px] font-bold text-[var(--ink)]/65 sm:flex-row">
                    <span>© 2026 Anahí Lozano</span>
                    <span>{t.footer}</span>
                    <button onClick={() => go("inicio")} className="btn btn-sm bg-white">↑ {t.nav.inicio}</button>
                </div>
            </footer>
        </div>
    );
};

export default OnePage;
