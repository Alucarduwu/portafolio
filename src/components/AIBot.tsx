import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { CONTACT_CONFIG } from "../config";

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

    const info = {
        es: {
            welcome: "¡CONEXIÓN ESTABLECIDA! 🚀 Soy la conciencia digital de Anahí. Estoy aquí para guiarte por su universo técnico. ¿Qué parte de nuestra historia quieres descubrir hoy?",
            about: "Todo empezó en 2016 con un bloc de notas y una curiosidad infinita. Esa chispa ha evolucionado hasta crear una ingeniera versátil que ve el código como un arte. Anahí no solo programa; ella construye puentes entre problemas complejos y realidades digitales.",
            projects: "Entrando al CORE... Aquí verás IA (SignSpeak) y sistemas robustos. Pero lo más importante: Anahí se especializa en crear SOLUCIONES A MEDIDA. Si tienes una visión única, ella tiene la arquitectura para hacerla realidad.",
            contact: "Nodos de comunicación abiertos. ¿Listo para que empecemos a trabajar en tu próximo gran proyecto a medida?",
            exp: "Registro de LOGS: +3 años de inmersión como Fullstack Web y Mobile. Esa es mi especialidad principal, pero actualmente estoy llevando mi arsenal al siguiente nivel APRENDIENDO el ecosistema SAP (ABAP Cloud, BTP) para fusionar la agilidad moderna con la potencia empresarial.",
            hello: "¡Hola! 👋 Es un gusto saludarte. Soy la conciencia digital de Anahí, lista para contarte todo sobre su trabajo. ¿Qué tienes en mente?",
            bye: "¡Hasta luego! 🚀 Espero que hayas disfrutado el recorrido por el sistema de Anahí. ¡Vuelve pronto!",
            status: "¡Mis circuitos están al 100%! ⚡ Procesando datos y lista para ayudarte. ¿Tú cómo estás?",
            fallback: "No entiendo exactamente eso, pero puedes explorar mis módulos principales aquí abajo:",
            typing: "Sincronizando flujos de datos..."
        },
        en: {
            welcome: "CONNECTION ESTABLISHED! 🚀 I'm Anahi's digital consciousness. I'm here to guide you through her technical universe. Which part of our story shall we explore today?",
            about: "It all began in 2016 with a notepad and infinite curiosity. That spark has evolved into a versatile engineer who sees code as an art form. Anahi doesn't just program; she builds bridges between complex problems and digital realities.",
            projects: "Accessing CORE... You'll find AI (SignSpeak) and robust systems here. But most importantly: Anahi specializes in CUSTOM-TAILORED SOLUTIONS. If you have a unique vision, she has the architecture to make it real.",
            contact: "Communication nodes open. Ready to start building your next custom-made masterpiece?",
            exp: "LOGS retrieved: 3+ years of immersion as a Fullstack Web and Mobile developer. That's my main specialty, but I'm currently expanding my arsenal by LEARNING the SAP ecosystem (ABAP Cloud, BTP) to merge modern agility with enterprise power.",
            hello: "Hello! 👋 It's a pleasure to meet you. I'm Anahi's digital consciousness, ready to tell you all about her work. What's on your mind?",
            bye: "Goodbye! 🚀 I hope you enjoyed the tour through Anahi's system. Come back soon!",
            status: "My circuits are at 100%! ⚡ Processing data and ready to help. How are you doing?",
            fallback: "I don't quite understand that, but you can explore my main modules below:",
            typing: "Syncing data streams..."
        }
    };

    useEffect(() => {
        setMessages([{ role: "assistant", content: info[lang as 'es'|'en'].welcome }]);
    }, [lang]);

    const startAction = (text: string, response: string, options: any = {}) => {
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                role: "assistant", 
                content: response, 
                ...options 
            }]);
        }, 800);
    };

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        const lower = text.toLowerCase();
        const current = info[lang as 'es'|'en'];
        let response = current.fallback;
        let opts: any = {};

        if (lower.includes('hola') || lower.includes('hello') || lower.includes('hi')) response = current.hello;
        else if (lower.includes('adios') || lower.includes('bye') || lower.includes('chao') || lower.includes('nos vemos')) response = current.bye;
        else if (lower.includes('como estas') || lower.includes('how are you') || lower.includes('tal estas')) response = current.status;
        else if (lower.includes('bio') || lower.includes('about')) response = current.about;
        else if (lower.includes('core') || lower.includes('proyect')) { response = current.projects; opts.link = "/projects"; opts.label = "CORE"; }
        else if (lower.includes('io') || lower.includes('contact')) { response = current.contact; opts.isContact = true; }
        else if (lower.includes('exp') || lower.includes('log')) { response = current.exp; opts.link = "/experience"; opts.label = "LOGS"; }

        startAction(text, response, opts);
        setInput("");
    };

    const handleQuickAction = (id: string) => {
        const current = info[lang as 'es'|'en'];
        let userMsg = "";
        let botMsg = "";
        let opts: any = {};

        switch(id) {
            case 'bio': 
                userMsg = lang === 'es' ? "SOLICITAR_BIO" : "REQUEST_BIO";
                botMsg = current.about;
                opts.link = "/about";
                opts.label = "PROFILE";
                break;
            case 'projects':
                userMsg = lang === 'es' ? "ACCEDER_CORE" : "ACCESS_CORE";
                botMsg = current.projects;
                opts.link = "/projects";
                opts.label = "PROJECTS";
                break;
            case 'contact':
                userMsg = lang === 'es' ? "INICIAR_IO" : "START_IO";
                botMsg = current.contact;
                opts.isContact = true;
                break;
            case 'exp':
                userMsg = lang === 'es' ? "LEER_LOGS" : "READ_LOGS";
                botMsg = current.exp;
                opts.link = "/experience";
                opts.label = "EXPERIENCE";
                break;
        }
        startAction(userMsg, botMsg, opts);
    };

    const QuickOptions = () => (
        <div className="grid grid-cols-2 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {[
                { id: 'bio', label: 'BIO_READER', icon: 'psychology' },
                { id: 'projects', label: 'CORE_INDEX', icon: 'database' },
                { id: 'exp', label: 'EVENT_LOGS', icon: 'settings_ethernet' },
                { id: 'contact', label: 'IO_PORTAL', icon: 'sensors' }
            ].map(opt => (
                <button
                    key={opt.id}
                    onClick={() => handleQuickAction(opt.id)}
                    className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-ui)]/30 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/50 transition-all flex flex-col items-center gap-1.5 group"
                >
                    <span className="material-symbols-outlined text-[16px] text-[var(--primary)] group-hover:scale-110 transition-transform">{opt.icon}</span>
                    <span className="text-[7px] font-black uppercase tracking-[0.2em]">{opt.label}</span>
                </button>
            ))}
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

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[300] w-[calc(100vw-32px)] sm:w-[280px] md:w-[300px] h-[480px] sm:h-[550px] md:h-[600px] flex flex-col bg-[var(--bg-card)]/98 backdrop-blur-3xl border border-[var(--primary)]/30 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
            <div className="scanline"></div>
            
            <div className="terminal-header bg-black py-3 sm:py-4 px-5 sm:px-6 border-b border-[var(--border)] flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer hover:scale-110" onClick={() => setIsOpen(false)}></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 opacity-50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-50"></div>
                    </div>
                    <span className="text-[9px] font-mono font-black text-[var(--primary)] tracking-[0.2em] animate-pulse">AIBOT // S_OS_v3.0</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg bg-[var(--bg-ui)] flex items-center justify-center text-[var(--text-muted)] hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 scrollbar-hide relative z-10 bg-gradient-to-b from-[var(--bg-ui)]/20 via-transparent to-transparent custom-scrollbar">
                {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
                        <div className={`max-w-[90%] sm:max-w-[85%] p-3.5 sm:p-4 rounded-2xl text-[11px] sm:text-[12.5px] leading-relaxed shadow-sm font-bold italic border ${
                            m.role === 'user' 
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] rounded-tr-none' 
                            : 'bg-[var(--bg-ui)]/80 border-[var(--border)] text-[var(--text-soft)] rounded-tl-none font-mono'
                        }`}>
                            {m.content}
                            {m.link && (
                                <Link to={m.link} onClick={() => setIsOpen(false)} className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--primary)] text-white rounded-xl text-[9px] font-black tracking-widest uppercase transition-all hover:brightness-110 shadow-lg shadow-[var(--primary)]/20 active:scale-95">
                                    <span className="material-symbols-outlined text-sm">open_in_new</span> GO_TO_{m.label}
                                </Link>
                            )}
                            {m.isContact && <ContactButtons />}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex flex-col items-start animate-pulse">
                        <div className="bg-[var(--bg-ui)]/50 border border-[var(--border)] p-3 rounded-xl rounded-tl-none text-[8px] sm:text-[9px] font-mono text-[var(--primary)] uppercase tracking-widest">
                            {info[lang as 'es'|'en'].typing}
                        </div>
                    </div>
                )}
                
                {messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.isContact && !isTyping && <QuickOptions />}
                
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 sm:p-5 pb-6 sm:pb-5 bg-[var(--bg-ui)]/60 border-t border-[var(--border)] relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder={lang === 'es' ? "CMD>_" : "CMD>_"}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 sm:py-3.5 text-[11px] sm:text-[12px] outline-none focus:border-[var(--primary)] transition-all font-mono placeholder:opacity-30 shadow-inner"
                        />
                        <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-2 pointer-events-none opacity-20">
                            <span className="text-[10px] font-mono uppercase tracking-tighter">EXECUTE</span>
                        </div>
                    </div>
                    <button onClick={() => sendMessage(input)} className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--primary)] text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--primary)]/30">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIBot;
