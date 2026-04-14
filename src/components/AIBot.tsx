import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { CONTACT_CONFIG } from "../config";

// ─── Static project summaries the bot knows about ────────────────────────────
const PROJECT_DATA: Record<string, { type: string; stack: string; features: string; url: string }> = {
    buskq: {
        type: "Business directory platform",
        stack: "Angular | Node.js | MySQL",
        features: "RBAC auth, geospatial search, admin panel, SEO optimized",
        url: "/projects"
    },
    snackify: {
        type: "ERP + order management system",
        stack: "Astro | TypeScript | MySQL",
        features: "Orders, inventory, role management, ultra-fast SSR",
        url: "/projects"
    },
    allofme: {
        type: "Mobile productivity app",
        stack: "Kotlin | Jetpack Compose | MVVM | Room",
        features: "Finance tracking, task system, offline-first, secure persistence",
        url: "/projects"
    },
    senas: {
        type: "Sign language translator prototype",
        stack: "React Native | Firebase | Computer Vision",
        features: "Real-time hand detection, gesture recognition, scalable prototype",
        url: "/projects"
    },
    portfolio: {
        type: "Interactive developer portfolio",
        stack: "React | TypeScript | Framer Motion | Vite",
        features: "Terminal UI, AI bot, GitHub sync, mobile responsive",
        url: "/projects"
    }
};

const CV_LINKS = {
    standard_es: "https://drive.google.com/file/d/1xFb_5L2F0y8Uu4xwrMvN9VJVLT5mEW7C/view",
    standard_en: "https://drive.google.com/file/d/1xFb_5L2F0y8Uu4xwrMvN9VJVLT5mEW7C/view",
};

const AIBot = () => {
    const { lang } = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages.length, isOpen, isTyping]);

    const isEs = lang === 'es';

    const strings = {
        welcome:        isEs ? "¡CONEXIÓN ESTABLECIDA! 🚀 Soy la IA de Anahí. Pregúntame sobre ella, sus proyectos, stack, experiencia o descarga su CV. ¿Por dónde empezamos?" : "CONNECTION ESTABLISHED! 🚀 I'm Anahi's AI assistant. Ask me about her, her projects, stack, or download her CV. Where shall we start?",

        // ── Personal ────────────────────────────────────────────────────────────
        who: isEs
            ? "👩‍💻 Anahí Lozano de Lira es Ingeniera en Tecnologías de la Información y Comunicación, especializada en Desarrollo de Aplicaciones Avanzadas del Software. Construye soluciones Full Stack, apps móviles nativas y sistemas SAP enterprise. Lo que la distingue: ve el código como arquitectura, no solo como funcionalidad."
            : "👩‍💻 Anahí Lozano de Lira is an ICT Engineer specialized in Advanced Software Application Development. She builds Full Stack solutions, native mobile apps, and SAP enterprise systems. What sets her apart: she sees code as architecture, not just functionality.",

        location: isEs
            ? "📍 Anahí vive en Aguascalientes, México (UTC-6). Trabaja de forma remota y está abierta a oportunidades globales. Timezone: MX // UTC-6."
            : "📍 Anahí is based in Aguascalientes, México (UTC-6). She works remotely and is open to global opportunities. Timezone: MX // UTC-6.",

        education: isEs
            ? "🎓 Estudió Ingeniería en Tecnologías de la Información y Comunicación con especialidad en Desarrollo de Aplicaciones Avanzadas del Software. Su formación cubre desde arquitecturas de software hasta sistemas empresariales SAP."
            : "🎓 She studied Information and Communication Technologies Engineering, specialized in Advanced Software Application Development. Her education spans from software architectures to SAP enterprise systems.",

        motivation: isEs
            ? "✨ Empezó en 2016 con un bloc de notas y curiosidad infinita. Hoy construye sistemas que resuelven problemas reales: desde apps offline para gestión personal hasta plataformas empresariales de búsqueda geo-espacial. Su motor: transformar ideas complejas en realidades digitales elegantes."
            : "✨ She started in 2016 with a notepad and infinite curiosity. Today she builds systems that solve real problems: from offline personal management apps to enterprise geospatial search platforms. Her drive: transforming complex ideas into elegant digital realities.",

        learning: isEs
            ? "🚀 Actualmente Anahí está expandiendo su arsenal al ecosistema SAP: ABAP Cloud, BTP (Business Technology Platform), RAP y CDS Views. Su objetivo: fusionar la agilidad del desarrollo moderno con la potencia de los sistemas enterprise. También sigue profundizando en arquitecturas cloud y DevOps."
            : "🚀 Currently Anahí is leveling up into the SAP ecosystem: ABAP Cloud, BTP (Business Technology Platform), RAP and CDS Views. Her goal: merging modern development agility with enterprise-grade power. She's also deepening her cloud architecture and DevOps knowledge.",

        availability: isEs
            ? "✅ Anahí está disponible para proyectos freelance, colaboraciones y oportunidades full-time. Trabaja remoto globalmente. ¿Tienes algo en mente? ¡Escríbele!"
            : "✅ Anahí is available for freelance projects, collaborations, and full-time opportunities. Works remotely worldwide. Got something in mind? Reach out!",

        personality: isEs
            ? "🧠 Anahí combina mentalidad de ingeniería con sensibilidad de diseño. Obsesionada con la calidad del código, la arquitectura limpia y las UX que se sienten premium. Fuera del código: le encanta el diseño, explorar nuevas tecnologías y resolver puzzles de arquitectura de sistemas."
            : "🧠 Anahí blends engineering mindset with design sensibility. Obsessed with code quality, clean architecture, and UX that feels premium. Outside code: she loves design, exploring new tech, and solving system architecture puzzles.",

        // ── Existing ─────────────────────────────────────────────────────────────
        about:          isEs ? "Anahí es Ingeniera en TIC especializada en desarrollo de apps avanzadas. +3 años construyendo soluciones Full Stack, Mobile nativo y sistemas SAP enterprise. Empezó con un bloc de notas en 2016 y no ha parado." : "Anahi is an ICT Engineer specialized in Advanced Software Dev. 3+ years building Full Stack, native Mobile, and SAP enterprise solutions. Started with a notepad in 2016 and never stopped.",
        contactMsg:     isEs ? "Nodos de comunicación abiertos. ¿Lista para co-crear algo increíble?" : "Communication nodes open. Ready to co-create something incredible?",
        expMsg:         isEs ? "LOGS: +3 años como Fullstack Web & Mobile. Actualmente expandiendo el arsenal al ecosistema SAP (ABAP Cloud, BTP) — fusionando agilidad moderna con potencia enterprise." : "LOGS: 3+ years as Fullstack Web & Mobile dev. Currently leveling up into SAP (ABAP Cloud, BTP) — merging modern agility with enterprise power.",
        hello:          isEs ? "¡Hola! 👋 Soy la IA de Anahí. Puedo contarte sobre ella, sus proyectos, stack o ayudarte a contactarla. ¿Qué necesitas?" : "Hello! 👋 I'm Anahi's AI assistant. I can tell you about her, her projects, stack, or help you contact her. What do you need?",
        bye:            isEs ? "¡Hasta luego! 🚀 Espero haber sido de ayuda. ¡Hasta pronto!" : "Goodbye! 🚀 Hope I was helpful. Come back anytime!",
        status:         isEs ? "¡Circuitos al 100%! ⚡ Lista para ayudarte. ¿Y tú?" : "Circuits at 100%! ⚡ Ready to help. How are you?",
        stackMsg:       isEs ? "💻 Stack principal de Anahí:" : "💻 Anahi's main stack:",
        projectsMsg:    isEs ? "Aquí está el índice de proyectos. Haz click en cualquier nombre para ver detalles:" : "Here's the project index. Click any name to see full details:",
        cvMsg:          isEs ? "📄 CV disponible para descarga:" : "📄 CV available for download:",
        fallback:       isEs
            ? "Hmm, no entendí eso 🤔 Prueba preguntar:\n• 'quién es anahí' — perfil personal\n• 'show projects' — ver proyectos\n• 'explain buskq' — detalles de un proyecto\n• 'stack' — tecnologías\n• 'download cv' — descargar CV\n• 'disponible' — disponibilidad\n• 'contact' — contacto"
            : "Hmm, didn't catch that 🤔 Try asking:\n• 'who is anahi' — personal profile\n• 'show projects' — view projects\n• 'explain buskq' — project details\n• 'stack' — technologies\n• 'download cv' — download CV\n• 'available' — availability\n• 'contact' — get in touch",
        typing:         isEs ? "Sincronizando flujos de datos..." : "Syncing data streams...",
        projectNotFound: isEs ? "No encontré ese proyecto específico. Los proyectos que conozco son: Buskq, Snackify, AllOfMe, Señas. ¿Cuál te interesa?" : "I didn't find that specific project. Projects I know: Buskq, Snackify, AllOfMe, Señas. Which one interests you?",
    };

    useEffect(() => {
        setMessages([{ role: "assistant", content: strings.welcome }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    const pushMessage = (text: string, response: string, options: any = {}) => {
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "assistant", content: response, ...options }]);
        }, 700);
    };

    // ─── Intent parser ────────────────────────────────────────────────────────
    const parseIntent = (raw: string): { type: string; extra?: string } => {
        const t = raw.toLowerCase().trim();

        // --- project explain ---
        for (const key of Object.keys(PROJECT_DATA)) {
            if (t.includes(key)) return { type: 'explain_project', extra: key };
        }
        // Aliases
        if (t.includes('allofme') || t.includes('all of me') || t.includes('all-of-me')) return { type: 'explain_project', extra: 'allofme' };
        if (t.includes('seña') || t.includes('sena') || t.includes('sign')) return { type: 'explain_project', extra: 'senas' };

        // --- show projects ---
        if (t.match(/show\s*project|ver\s*proyecto|proyectos?|projects?|portafolio|portfolio|core/)) return { type: 'projects' };

        // --- stack ---
        if (t.match(/stack|technolog|tecnolog|skills?|habilidad|lenguaj|what.*use|qué.*usa/)) return { type: 'stack' };

        // --- cv / resume ---
        if (t.match(/cv|resume|currículum|curriculum|download|descargar/)) return { type: 'cv' };

        // --- contact ---
        if (t.match(/contact|contacto|io|email|whatsapp|linkedin|hir|contratar/)) return { type: 'contact' };

        // --- experience ---
        if (t.match(/exp|log|años|years|trayectoria|career/)) return { type: 'exp' };

        // --- WHO / personal profile ---
        if (t.match(/quién es|quien es|who is|who(')?s|cuéntame|cuéntame sobre|tell me about|sobre ella|about her|presentate|introduce/)) return { type: 'who' };

        // --- location ---
        if (t.match(/dónde|donde|ubica|vive|live|location|ciudad|city|country|país|pais|mexico|aguascalientes/)) return { type: 'location' };

        // --- education ---
        if (t.match(/estudi|school|universidad|carrera|degree|educac|formac|titulación|titulacion/)) return { type: 'education' };

        // --- motivation / story / origins ---
        if (t.match(/motivaci|motivación|cómo empezó|como empezo|why.*code|por qué|porqué|historia|story|origen|began|started/)) return { type: 'motivation' };

        // --- currently learning ---
        if (t.match(/aprend|learning|actualmente|currently|ahora|now|sap|abap|btp/)) return { type: 'learning' };

        // --- availability / hire ---
        if (t.match(/disponible|disponibilidad|available|availability|freelance|hire|trabajo|work|abiert/)) return { type: 'availability' };

        // --- personality / hobbies ---
        if (t.match(/person|hobby|hobbies|pasión|pasion|gusta|like|fun|fuera|outside|cuando no|when not/)) return { type: 'personality' };

        // --- about / bio (general) ---
        if (t.match(/bio|about|quien|who|quién|profile/)) return { type: 'who' };

        // --- greetings ---
        if (t.match(/^(hola|hello|hi|hey|buenas|saludos|good)/)) return { type: 'hello' };
        if (t.match(/adios|bye|chao|hasta/)) return { type: 'bye' };
        if (t.match(/como estas|how are you|how r u/)) return { type: 'status' };

        return { type: 'fallback' };
    };

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        setInput("");

        const { type, extra } = parseIntent(text);

        switch (type) {
            case 'explain_project': {
                const p = PROJECT_DATA[extra!];
                if (!p) { pushMessage(text, strings.projectNotFound); return; }
                pushMessage(text, '', { projectCard: { name: extra!, ...p } });
                return;
            }
            case 'projects':      pushMessage(text, strings.projectsMsg,   { showProjects: true }); return;
            case 'stack':         pushMessage(text, strings.stackMsg,       { showStack: true    }); return;
            case 'cv':            pushMessage(text, strings.cvMsg,          { showCV: true       }); return;
            case 'contact':       pushMessage(text, strings.contactMsg,     { isContact: true    }); return;
            case 'exp':           pushMessage(text, strings.expMsg,         { link: '/experience', label: 'EXPERIENCE' }); return;
            case 'who':           pushMessage(text, strings.who,            { link: '/about', label: 'PROFILE' }); return;
            case 'about':         pushMessage(text, strings.about,          { link: '/about', label: 'PROFILE' }); return;
            case 'location':      pushMessage(text, strings.location); return;
            case 'education':     pushMessage(text, strings.education); return;
            case 'motivation':    pushMessage(text, strings.motivation); return;
            case 'learning':      pushMessage(text, strings.learning); return;
            case 'availability':  pushMessage(text, strings.availability,   { isContact: true    }); return;
            case 'personality':   pushMessage(text, strings.personality); return;
            case 'hello':         pushMessage(text, strings.hello); return;
            case 'bye':           pushMessage(text, strings.bye);  return;
            case 'status':        pushMessage(text, strings.status); return;
            default:              pushMessage(text, strings.fallback);
        }
    };

    // ─── Sub-components ───────────────────────────────────────────────────────

    const ProjectCard = ({ card }: { card: { name: string; type: string; stack: string; features: string; url: string } }) => (
        <div className="mt-3 rounded-xl border border-[var(--primary)]/30 bg-black/40 overflow-hidden font-mono text-[10px] animate-in fade-in duration-500">
            <div className="px-3 py-1.5 bg-[var(--primary)]/10 border-b border-[var(--primary)]/20 flex items-center justify-between" translate="no">
                <span className="text-[var(--primary)] font-black text-[9px] uppercase tracking-widest">{card.name.toUpperCase()}.json</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="px-3 py-2 space-y-1">
                <div className="flex gap-2 items-start"><span className="text-[var(--primary)]/60 mt-0.5">›</span><span className="text-[var(--text-muted)] shrink-0">type:</span><span className="text-[var(--text-soft)] italic leading-tight">{card.type}</span></div>
                <div className="flex gap-2 items-start"><span className="text-[var(--primary)]/60 mt-0.5">›</span><span className="text-[var(--text-muted)] shrink-0">stack:</span><span className="text-[var(--primary)] leading-tight">{card.stack}</span></div>
                <div className="flex gap-2 items-start"><span className="text-[var(--primary)]/60 mt-0.5">›</span><span className="text-[var(--text-muted)] shrink-0">features:</span><span className="text-green-400 leading-tight">{card.features}</span></div>
            </div>
            <Link to={card.url} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 py-2 bg-[var(--primary)]/5 hover:bg-[var(--primary)]/15 border-t border-[var(--primary)]/20 text-[var(--primary)] text-[9px] font-black uppercase tracking-widest transition-all">
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                {isEs ? 'VER TODOS LOS PROYECTOS' : 'VIEW ALL PROJECTS'}
            </Link>
        </div>
    );

    const ProjectList = () => (
        <div className="mt-3 space-y-1.5 animate-in fade-in duration-500 font-mono text-[10px]">
            {Object.entries(PROJECT_DATA).map(([key, val]) => (
                <button
                    key={key}
                    onClick={() => sendMessage(`explain ${key}`)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 border border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all text-left group"
                >
                    <span className="text-[var(--primary)]/60 group-hover:text-[var(--primary)] transition-colors">›</span>
                    <span className="font-black uppercase tracking-wider text-[var(--text-soft)] group-hover:text-[var(--text-main)]">{key}</span>
                    <span className="text-[var(--text-muted)] italic truncate flex-1">{val.type}</span>
                    <span className="material-symbols-outlined text-[12px] text-[var(--primary)]/40 group-hover:text-[var(--primary)] transition-colors">arrow_forward_ios</span>
                </button>
            ))}
            <Link to="/projects" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 mt-2 py-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-[9px] font-black uppercase tracking-widest hover:bg-[var(--primary)]/20 transition-all">
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                {isEs ? 'ABRIR CORE COMPLETO' : 'OPEN FULL CORE'}
            </Link>
        </div>
    );

    const StackDisplay = () => {
        const categories = [
            { label: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Astro', 'Vue.js', 'TypeScript'] },
            { label: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Python', 'C#', '.NET'] },
            { label: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Flutter', 'React Native'] },
            { label: 'Data / SAP', items: ['MySQL', 'PostgreSQL', 'Firebase', 'ABAP', 'SAP BTP', 'HANA'] },
            { label: 'Cloud / DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel'] },
        ];
        return (
            <div className="mt-3 space-y-2.5 animate-in fade-in duration-500 font-mono text-[9px]">
                {categories.map(cat => (
                    <div key={cat.label}>
                        <div className="text-[var(--primary)] opacity-60 uppercase tracking-[0.2em] mb-1 font-black">&gt; {cat.label}</div>
                        <div className="flex flex-wrap gap-1">
                            {cat.items.map(item => (
                                <span key={item} className="px-2 py-0.5 rounded bg-[var(--bg-ui)] border border-[var(--border)] text-[var(--text-soft)] font-bold text-[8px] uppercase tracking-wide hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-all cursor-default notranslate" translate="no">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const CVButtons = () => (
        <div className="flex flex-col gap-2 mt-3 animate-in fade-in duration-300">
            <a
                href={CV_LINKS.standard_es}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all text-[9px] font-black uppercase tracking-widest"
            >
                <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">description</span>
                    {isEs ? 'CV ESTÁNDAR (ES/EN)' : 'STANDARD CV (ES/EN)'}
                </span>
                <span className="material-symbols-outlined text-xs">download</span>
            </a>
        </div>
    );

    const ContactButtons = () => (
        <div className="flex flex-col gap-2 mt-4 w-full animate-in zoom-in-95 duration-300">
            <a href={`https://wa.me/52${CONTACT_CONFIG.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20 transition-all text-[9px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">chat</span> WHATSAPP</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
            <a href={`mailto:${CONTACT_CONFIG.email}`} className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 hover:bg-blue-500/20 transition-all text-[9px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> EMAIL</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
            <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/20 transition-all text-[9px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">share</span> LINKEDIN</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
        </div>
    );

    // ─── Quick action chips ───────────────────────────────────────────────────
    const QuickChips = () => {
        const chips = isEs
            ? [
                { label: 'Sobre ella',    cmd: 'quién es anahí', icon: 'person'      },
                { label: 'Ver proyectos', cmd: 'show projects',  icon: 'database'    },
                { label: 'Stack',         cmd: 'stack',          icon: 'code'        },
                { label: 'Disponible?',   cmd: 'disponible',     icon: 'work'        },
                { label: 'Descargar CV',  cmd: 'download cv',    icon: 'description' },
              ]
            : [
                { label: 'About her',    cmd: 'who is anahi',   icon: 'person'      },
                { label: 'Projects',     cmd: 'show projects',  icon: 'database'    },
                { label: 'Stack',        cmd: 'stack',          icon: 'code'        },
                { label: 'Available?',   cmd: 'available',      icon: 'work'        },
                { label: 'Download CV',  cmd: 'download cv',    icon: 'description' },
              ];
        return (
            <div className="flex flex-wrap gap-1.5 mt-3 animate-in fade-in duration-500">
                {chips.map(c => (
                    <button
                        key={c.cmd}
                        onClick={() => sendMessage(c.cmd)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-ui)]/40 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10 transition-all text-[8px] font-black uppercase tracking-wider text-[var(--text-soft)] hover:text-[var(--primary)] group"
                    >
                        <span className="material-symbols-outlined text-[11px]">{c.icon}</span>
                        {c.label}
                    </button>
                ))}
            </div>
        );
    };

    // ─── Collapsed button ─────────────────────────────────────────────────────
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[300] w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-2xl border border-[var(--primary)]/40 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            >
                <div className="absolute inset-0 scanline opacity-20"></div>
                <div className="relative">
                    <span className="material-symbols-outlined text-[var(--primary)] text-2xl md:text-4xl animate-pulse">robot_2</span>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--bg-card)]"></div>
                </div>
            </button>
        );
    }

    // ─── Open chat panel ──────────────────────────────────────────────────────
    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[300] w-[calc(100vw-32px)] sm:w-[300px] md:w-[320px] h-[500px] sm:h-[560px] flex flex-col bg-[var(--bg-card)]/98 backdrop-blur-3xl border border-[var(--primary)]/30 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
            <div className="scanline"></div>

            {/* Header */}
            <div className="terminal-header bg-black py-3 px-4 border-b border-[var(--border)] flex justify-between items-center relative z-20">
                <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer hover:scale-110" onClick={() => setIsOpen(false)}></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 opacity-50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-50"></div>
                    </div>
                    <span className="text-[9px] font-mono font-black text-[var(--primary)] tracking-[0.2em] animate-pulse">AIBOT_v4.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                    {/* Back to menu — only when there are messages beyond welcome */}
                    {messages.length > 1 && (
                        <button
                            onClick={() => setMessages([{ role: 'assistant', content: strings.welcome }])}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-ui)]/40 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all text-[8px] font-black uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--primary)] group"
                            title={isEs ? 'Volver al menú' : 'Back to menu'}
                        >
                            <span className="material-symbols-outlined text-[12px]">home</span>
                            <span className="hidden sm:inline">{isEs ? 'Menú' : 'Menu'}</span>
                        </button>
                    )}
                    <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg bg-[var(--bg-ui)] flex items-center justify-center text-[var(--text-muted)] hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide relative z-10 bg-gradient-to-b from-[var(--bg-ui)]/20 via-transparent to-transparent">
                {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
                        <div className={`max-w-[92%] p-3 rounded-2xl text-[11px] leading-relaxed font-bold border ${
                            m.role === 'user'
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] rounded-tr-none italic'
                            : 'bg-[var(--bg-ui)]/80 border-[var(--border)] text-[var(--text-soft)] rounded-tl-none font-mono'
                        }`}>
                            {m.content && <span>{m.content}</span>}

                            {/* Project card inline */}
                            {m.projectCard && <ProjectCard card={m.projectCard} />}

                            {/* Project list */}
                            {m.showProjects && <ProjectList />}

                            {/* Stack display */}
                            {m.showStack && <StackDisplay />}

                            {/* CV download */}
                            {m.showCV && <CVButtons />}

                            {/* Contact buttons */}
                            {m.isContact && <ContactButtons />}

                            {/* Nav link */}
                            {m.link && (
                                <Link to={m.link} onClick={() => setIsOpen(false)} className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-[var(--primary)] text-white rounded-xl text-[9px] font-black tracking-widest uppercase transition-all hover:brightness-110">
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    GO_TO_{m.label}
                                </Link>
                            )}
                        </div>

                        {/* Quick chips after last plain bot message */}
                        {m.role === 'assistant' && i === messages.length - 1 && !m.isContact && !m.showProjects && !m.showStack && !m.showCV && !m.projectCard && !isTyping && (
                            <QuickChips />
                        )}

                        {/* Back-to-menu button after rich content responses */}
                        {m.role === 'assistant' && i === messages.length - 1 && !isTyping && (m.isContact || m.showProjects || m.showStack || m.showCV || m.projectCard) && (
                            <button
                                onClick={() => setMessages([{ role: 'assistant', content: strings.welcome }])}
                                className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-ui)]/30 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all text-[8px] font-black uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--primary)] animate-in fade-in duration-300"
                            >
                                <span className="material-symbols-outlined text-[11px]">arrow_back</span>
                                {isEs ? '← Volver al menú' : '← Back to menu'}
                            </button>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex flex-col items-start animate-pulse">
                        <div className="bg-[var(--bg-ui)]/50 border border-[var(--border)] p-3 rounded-xl rounded-tl-none text-[8px] font-mono text-[var(--primary)] uppercase tracking-widest">
                            {strings.typing}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 pb-5 bg-[var(--bg-ui)]/60 border-t border-[var(--border)] relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={isEs ? "e.g. explain buskq..." : "e.g. show projects..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                        className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[11px] outline-none focus:border-[var(--primary)] transition-all font-mono placeholder:opacity-30 shadow-inner"
                    />
                    <button onClick={() => sendMessage(input)} className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--primary)] text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--primary)]/30">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIBot;
