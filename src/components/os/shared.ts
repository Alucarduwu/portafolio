import { createContext, useContext } from "react";
import {
    User, Briefcase, FolderKanban, Layers, Handshake, Award, FileText, Mail, BadgeCheck, SquareTerminal,
    Calculator, NotebookPen, Gamepad2, Settings, Trophy, CircleHelp, type LucideIcon,
} from "lucide-react";
import type { Job } from "../OnePage";

// Piezas compartidas de AnahíOS: tipos, registro de apps, textos, logros y preferencias.

export type Lang = "es" | "en";
export type AppId =
    | "about" | "exp" | "projects" | "skills" | "services" | "certs" | "resume" | "contact" | "recruiter"
    | "terminal" | "calc" | "notes" | "games" | "settings" | "trophies" | "help";

export type OsProject = { name: string; d: string; tags: string[]; href?: string; code?: string; img?: string; badge?: string };

export type PageCopy = {
    nav: Record<string, string>; role: string; heroLine: string; available: string; chips: string[];
    about: string[]; facts: string[][]; numbers: string[][]; traits: { t: string; d: string }[];
    services: { n: string; t: string; d: string }[]; process: string[];
    now: string; visit: string; code: string; pdf: string; verify: string; quote: string;
    contactLine: string; copy: string; copied: string; ctaCv: string;
};

export type AccentId = "lila" | "rosa" | "menta" | "cielo" | "ambar";
export type WallpaperId = "aurora" | "sakura" | "stars" | "plain";
export type Prefs = { theme: "light" | "dark"; accent: AccentId; wallpaper: WallpaperId };

// Cada acento tiene un tono para fondo oscuro y otro para fondo claro (contraste).
export const ACCENTS: Record<AccentId, { dark: string; light: string }> = {
    lila: { dark: "#b79cff", light: "#7a5cf0" },
    rosa: { dark: "#ff8fc4", light: "#d6337f" },
    menta: { dark: "#5eead4", light: "#0d8f7f" },
    cielo: { dark: "#7cc4ff", light: "#1f73d1" },
    ambar: { dark: "#fbbf24", light: "#b45309" },
};
export const WALLPAPERS: WallpaperId[] = ["aurora", "sakura", "stars", "plain"];

export const APPS: { id: AppId; icon: LucideIcon; grad: [string, string]; w: number; h: number; pinned?: boolean; desktop?: boolean }[] = [
    { id: "about", icon: User, grad: ["#a78bfa", "#6d4bea"], w: 860, h: 600, pinned: true, desktop: true },
    { id: "exp", icon: Briefcase, grad: ["#34d399", "#0f9f77"], w: 820, h: 620, desktop: true },
    { id: "projects", icon: FolderKanban, grad: ["#60a5fa", "#2563eb"], w: 900, h: 640, pinned: true, desktop: true },
    { id: "skills", icon: Layers, grad: ["#fbbf24", "#ea8a0c"], w: 760, h: 580 },
    { id: "services", icon: Handshake, grad: ["#fb7185", "#e11d74"], w: 780, h: 600 },
    { id: "certs", icon: Award, grad: ["#38bdf8", "#0284c7"], w: 760, h: 580 },
    { id: "resume", icon: FileText, grad: ["#f472b6", "#db2777"], w: 820, h: 660, pinned: true, desktop: true },
    { id: "contact", icon: Mail, grad: ["#2dd4bf", "#0d9488"], w: 620, h: 520, pinned: true, desktop: true },
    { id: "recruiter", icon: BadgeCheck, grad: ["#c084fc", "#9333ea"], w: 720, h: 600 },
    { id: "terminal", icon: SquareTerminal, grad: ["#64748b", "#1e293b"], w: 680, h: 440, pinned: true },
    { id: "games", icon: Gamepad2, grad: ["#f97316", "#e2468f"], w: 460, h: 700, pinned: true, desktop: true },
    { id: "calc", icon: Calculator, grad: ["#f87171", "#dc2626"], w: 320, h: 500 },
    { id: "notes", icon: NotebookPen, grad: ["#facc15", "#eab308"], w: 520, h: 460 },
    { id: "trophies", icon: Trophy, grad: ["#fbbf24", "#f59e0b"], w: 640, h: 600 },
    { id: "settings", icon: Settings, grad: ["#94a3b8", "#475569"], w: 680, h: 600 },
    { id: "help", icon: CircleHelp, grad: ["#22d3ee", "#0891b2"], w: 560, h: 520 },
];
export const appMeta = (id: AppId) => APPS.find(a => a.id === id)!;

export const TROPHIES: { id: string; xp: number; es: [string, string]; en: [string, string] }[] = [
    { id: "first", xp: 10, es: ["Primeros pasos", "Abre tu primera app"], en: ["First steps", "Open your first app"] },
    { id: "five", xp: 15, es: ["De ventana en ventana", "Abre 5 apps distintas"], en: ["Window shopper", "Open 5 different apps"] },
    { id: "all", xp: 40, es: ["Lo viste todo", "Abre todas las apps"], en: ["Completionist", "Open every app"] },
    { id: "project", xp: 15, es: ["Curiosidad", "Abre el detalle de un proyecto"], en: ["Curious", "Open a project's details"] },
    { id: "cv", xp: 25, es: ["CV en mano", "Abre o descarga el CV"], en: ["Resume in hand", "Open or download the resume"] },
    { id: "contact", xp: 20, es: ["Conexión", "Abre un enlace de contacto"], en: ["Connected", "Open a contact link"] },
    { id: "theme", xp: 15, es: ["A tu gusto", "Cambia el tema, el acento o el fondo"], en: ["Make it yours", "Change the theme, accent or wallpaper"] },
    { id: "search", xp: 15, es: ["Atajo", "Abre algo desde el buscador (Ctrl+K)"], en: ["Power user", "Launch something from search (Ctrl+K)"] },
    { id: "terminal", xp: 15, es: ["Hola, terminal", "Ejecuta un comando"], en: ["Hello, terminal", "Run a command"] },
    { id: "gamer", xp: 15, es: ["Player 1", "Juega un mini juego"], en: ["Player 1", "Play a mini game"] },
    { id: "snake10", xp: 30, es: ["Gatito glotón", "Consigue 10 puntos en Snake"], en: ["Hungry kitty", "Score 10 points in Snake"] },
    { id: "memory", xp: 25, es: ["Buena memoria", "Completa el memorama"], en: ["Good memory", "Finish the memory game"] },
];
const LEVELS = [0, 30, 80, 150, 230];
export const levelOf = (xp: number) => {
    const level = LEVELS.filter(l => xp >= l).length;
    return { level, next: LEVELS[level] ?? null, base: LEVELS[level - 1] };
};

export const load = <T,>(key: string, fallback: T): T => {
    try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw) as T; } catch { return fallback; }
};
export const save = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* almacenamiento bloqueado */ } };

export const S = {
    es: {
        apps: {
            about: "Sobre mí", exp: "Experiencia", projects: "Proyectos", skills: "Tecnologías", services: "Servicios", certs: "Certificados",
            resume: "CV", contact: "Contacto", recruiter: "Modo reclutador", terminal: "Terminal", calc: "Calculadora", notes: "Notas",
            games: "Juegos", settings: "Ajustes", trophies: "Logros", help: "Ayuda",
        } as Record<AppId, string>,
        unlock: "Haz clic o presiona una tecla para entrar", recruiterCta: "Vengo a reclutar", exit: "Salir del modo OS", exitShort: "Salir",
        lock: "Bloquear", lockHint: "Vuelve a la pantalla de bloqueo. No se pierde nada.", start: "Inicio",
        search: "Busca apps y proyectos…", appsTitle: "Apps", projectsTitle: "Proyectos", nothing: "Sin resultados",
        min: "Minimizar", max: "Maximizar", close: "Cerrar", back: "Volver", level: "Nivel", lang: "Cambiar idioma",
        toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro", unlocked: "Logro desbloqueado",
        welcome: "Te doy la bienvenida a AnahíOS", welcomeBody: "Abre apps desde el dock o los íconos, arrastra las ventanas y busca con Ctrl+K. Hay mini juegos y logros escondidos.", gotIt: "Entendido",
        details: "Ver detalle", open: "Abrir en pestaña nueva", download: "Descargar", pdfMobile: "En celular el PDF se abre mejor en una pestaña nueva.",
        quick: "Resumen en 30 segundos", stack: "Stack principal", whereNow: "Hoy", reach: "Escríbeme",
        theme: "Tema", light: "Claro", dark: "Oscuro", accent: "Color de acento", wallpaper: "Fondo de pantalla",
        wallpapers: { aurora: "Aurora", sakura: "Sakura", stars: "Noche estrellada", plain: "Liso" },
        reset: "Restablecer datos", resetHint: "Borra logros, notas, récords y preferencias de este navegador.", resetDone: "Datos restablecidos",
        xpTo: "XP para el nivel", maxLevel: "Nivel máximo", of: "de", locked: "Bloqueado",
        notesHint: "Escribe aquí… se guarda solo en este navegador.", saved: "Guardado",
        shortcuts: [["Ctrl + K", "Abrir el buscador"], ["Esc", "Cerrar el menú"], ["Doble clic en la barra", "Maximizar la ventana"], ["Esquina inferior derecha", "Cambiar el tamaño"], ["Flechas / WASD", "Mover al gatito en Snake"]],
        helpIntro: "AnahíOS es mi portafolio en forma de escritorio. Todo lo que ves aquí también está en la versión normal del sitio.",
        helpMade: "Hecho con React, TypeScript, Tailwind y Framer Motion.",
        snake: "Snake", memory: "Memorama", score: "Puntos", best: "Récord", moves: "Movimientos", play: "Jugar", again: "Otra vez", pause: "Pausa", resume: "Seguir",
        over: "¡Fin del juego!", win: "¡Completado!", snakeHint: "Flechas, WASD, desliza o usa los botones. Come ♥ sin chocar.", memoryHint: "Encuentra las 8 parejas en los menos movimientos posibles.",
        termHello: "AnahíOS 2026 · escribe «ayuda» para ver los comandos.",
        termHelp: ["ayuda          esta lista", "whoami         quién soy", "apps           lista de apps", "abrir <app>    abre una app (ej. abrir proyectos)", "tema <claro|oscuro>", "neofetch       ficha del sistema", "fecha          fecha y hora", "cv             abre mi CV", "jugar          abre los mini juegos", "clear          limpia la pantalla", "salir          vuelve al sitio normal"],
        termOpen: "abriendo", termUnknown: "comando no encontrado. Prueba «ayuda».", termSudo: "buen intento (｡•̀ᴗ-)✧ aquí la root soy yo.", termTheme: "tema cambiado a",
    },
    en: {
        apps: {
            about: "About me", exp: "Experience", projects: "Projects", skills: "Tech stack", services: "Services", certs: "Certificates",
            resume: "Resume", contact: "Contact", recruiter: "Recruiter mode", terminal: "Terminal", calc: "Calculator", notes: "Notes",
            games: "Games", settings: "Settings", trophies: "Achievements", help: "Help",
        } as Record<AppId, string>,
        unlock: "Click or press any key to enter", recruiterCta: "I'm a recruiter", exit: "Exit OS mode", exitShort: "Exit",
        lock: "Lock", lockHint: "Back to the lock screen. Nothing is lost.", start: "Start",
        search: "Search apps and projects…", appsTitle: "Apps", projectsTitle: "Projects", nothing: "No results",
        min: "Minimize", max: "Maximize", close: "Close", back: "Back", level: "Level", lang: "Change language",
        toLight: "Switch to light mode", toDark: "Switch to dark mode", unlocked: "Achievement unlocked",
        welcome: "Welcome to AnahíOS", welcomeBody: "Open apps from the dock or the icons, drag the windows around and search with Ctrl+K. There are mini games and hidden achievements.", gotIt: "Got it",
        details: "View details", open: "Open in new tab", download: "Download", pdfMobile: "On phones the PDF opens better in a new tab.",
        quick: "The 30-second summary", stack: "Main stack", whereNow: "Today", reach: "Reach me",
        theme: "Theme", light: "Light", dark: "Dark", accent: "Accent color", wallpaper: "Wallpaper",
        wallpapers: { aurora: "Aurora", sakura: "Sakura", stars: "Starry night", plain: "Plain" },
        reset: "Reset data", resetHint: "Clears achievements, notes, high scores and preferences in this browser.", resetDone: "Data reset",
        xpTo: "XP to level", maxLevel: "Max level", of: "of", locked: "Locked",
        notesHint: "Type here… it's saved only in this browser.", saved: "Saved",
        shortcuts: [["Ctrl + K", "Open search"], ["Esc", "Close the menu"], ["Double-click the title bar", "Maximize the window"], ["Bottom-right corner", "Resize"], ["Arrows / WASD", "Move the kitty in Snake"]],
        helpIntro: "AnahíOS is my portfolio as a desktop. Everything here is also in the regular version of the site.",
        helpMade: "Built with React, TypeScript, Tailwind and Framer Motion.",
        snake: "Snake", memory: "Memory", score: "Score", best: "Best", moves: "Moves", play: "Play", again: "Play again", pause: "Pause", resume: "Resume",
        over: "Game over!", win: "Completed!", snakeHint: "Arrows, WASD, swipe or use the buttons. Eat ♥ without crashing.", memoryHint: "Find all 8 pairs in as few moves as you can.",
        termHello: "AnahíOS 2026 · type “help” to list the commands.",
        termHelp: ["help           this list", "whoami         who I am", "apps           list of apps", "open <app>     opens an app (e.g. open projects)", "theme <light|dark>", "neofetch       system card", "date           date and time", "cv             opens my resume", "play           opens the mini games", "clear          clears the screen", "exit           back to the regular site"],
        termOpen: "opening", termUnknown: "command not found. Try “help”.", termSudo: "nice try (｡•̀ᴗ-)✧ I'm root here.", termTheme: "theme set to",
    },
};
export type Strings = typeof S.es;

export type OsContext = {
    L: Lang; s: Strings; t: PageCopy; jobs: Job[]; projects: OsProject[]; cv: string; mail: string; whatsapp: string;
    prefs: Prefs; setPrefs: (patch: Partial<Prefs>) => void;
    unlocked: string[]; xp: number; award: (id: string) => void; resetData: () => void;
    openApp: (id: AppId) => void; exit: () => void;
    projectSel: string | null; setProjectSel: (name: string | null) => void;
    top: AppId | undefined;
};
export const OsCtx = createContext<OsContext | null>(null);
export const useOs = () => useContext(OsCtx)!;
