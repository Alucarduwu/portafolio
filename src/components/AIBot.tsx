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
            welcome: "¡SISTEMA ACTIVO! Soy tu asistente de interfaz. ¿Qué módulo deseas consultar hoy?",
            about: "Anahí es una apasionada de la ingeniería IT que comenzó forjando su lógica en 2016 con papel y bloc de notas. Esa curiosidad inicial ha evolucionado en una desarrolladora versátil con una visión integral, capaz de entender la tecnología desde sus bases más puras hasta las arquitecturas modernas.",
            projects: "Accediendo a CORE... Tengo indexados proyectos de Inteligencia Artificial (SignSpeak), Sistemas Full Stack y Aplicaciones Móviles nativas. ¿Deseas explorar el índice?",
            contact: "Protocolo de comunicación establecido. Puedes contactar directamente a la terminal de Anahí mediante estos nodos:",
            exp: "Registro de LOGS: +3 años de inmersión total en el desarrollo Full Stack y Mobile. Especialista en React, Node.js y plataformas móviles, con un enfoque actual en la arquitectura empresarial SAP (ABAP Cloud, BTP) y sistemas de alta disponibilidad.",
            fallback: "Entrada no reconocida. Por favor, utiliza los comandos del panel principal para una navegación óptima.",
            typing: "Sincronizando datos de perfil..."
        },
        en: {
            welcome: "SYSTEM ACTIVE! I'm your interface assistant. Which module would you like to access today?",
            about: "Anahi is a passionate IT engineer who began building her logic in 2016 with just paper and Notepad. That initial curiosity has evolved into a versatile developer with a comprehensive vision, capable of understanding technology from its purest foundations to modern architectures.",
            projects: "Accessing CORE... I have indexed Artificial Intelligence projects (SignSpeak), Full Stack systems, and native Mobile apps. Would you like to explore the index?",
            contact: "Communication protocol established. You can contact Anahi's terminal directly through these nodes:",
            exp: "LOGS retrieved: 3+ years of total immersion in Full Stack and Mobile development. Specialist in React, Node.js, and mobile platforms, currently focused on SAP enterprise architecture (ABAP Cloud, BTP) and high-availability systems.",
            fallback: "Input not recognized. Please use the main panel commands for optimal navigation.",
            typing: "Syncing profile data..."
        }
    };

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: "assistant", content: info[lang as 'es'|'en'].welcome }]);
        }
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

        if (lower.includes('bio') || lower.includes('about')) response = current.about;
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
