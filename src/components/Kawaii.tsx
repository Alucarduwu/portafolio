import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Detalles chiquitos: pixel art, sakura, logros de consola y el código Konami.

export const PIXEL = { fontFamily: "'Pixelify Sans', 'Inter', monospace" };

// ── Gatito en pixel art ───────────────────────────────────────────
const CAT = [
    "..X......X..",
    ".XPX....XPX.",
    ".XXXXXXXXXX.",
    "XXXXXXXXXXXX",
    "XXEEXXXXEEXX",
    "XXEEXXXXEEXX",
    "XPXXXMMXXXPX",
    "XXXXXXXXXXXX",
    ".XXXXXXXXXX.",
    "..XX....XX..",
];
const CAT_COLORS: Record<string, string> = { X: "#c9b6ff", P: "#ff9ecf", E: "#1a1426", M: "#ff9ecf" };

export const PixelCat = ({ onPet, lang }: { onPet: () => void; lang: string }) => {
    const [hearts, setHearts] = useState<number[]>([]);
    const [talk, setTalk] = useState(false);
    const pet = () => {
        onPet();
        setTalk(true);
        setTimeout(() => setTalk(false), 1400);
        const id = Date.now();
        setHearts(h => [...h, id]);
        setTimeout(() => setHearts(h => h.filter(x => x !== id)), 1200);
    };
    return (
        <button onClick={pet} aria-label={lang === "es" ? "Acariciar al gatito" : "Pet the kitty"}
            className="group relative block cursor-pointer" title="nya~">
            <svg viewBox="0 0 12 10" width="60" height="50" shapeRendering="crispEdges" className="transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-90">
                {CAT.flatMap((row, y) => row.split("").map((c, x) => c === "." ? null : (
                    <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={CAT_COLORS[c]}
                        className={c === "E" ? "kawaii-blink" : undefined} style={c === "E" ? { transformOrigin: `${x + 0.5}px 4.5px` } : undefined} />
                )))}
            </svg>
            <AnimatePresence>
                {talk && (
                    <motion.span initial={{ opacity: 0, y: 4, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--one-paper)] px-2 py-0.5 text-[12px] text-black" style={PIXEL}>
                        nya~ ♡
                    </motion.span>
                )}
            </AnimatePresence>
            {hearts.map(id => (
                <motion.span key={id} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -40, x: (id % 3 - 1) * 14 }} transition={{ duration: 1.1 }}
                    className="pointer-events-none absolute left-1/2 top-0 text-[16px] text-[var(--one-accent-2)]">♥</motion.span>
            ))}
        </button>
    );
};

// ── Pétalos de sakura (posiciones fijas: nada de aleatorio en cada render) ──
const PETALS = [
    [4, 0, 13], [12, 5, 16], [21, 2, 12], [30, 8, 17], [38, 1, 14], [47, 6, 15], [55, 3, 13],
    [63, 9, 18], [71, 4, 14], [79, 7, 16], [86, 2, 12], [94, 5, 17],
];
export const Sakura = () => (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {PETALS.map(([left, delay, dur], i) => (
            <span key={i} className="kawaii-petal" style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${dur}s`, opacity: 0.35 + (i % 4) * 0.12, transform: `scale(${0.6 + (i % 3) * 0.25})` }} />
        ))}
    </div>
);

// ── Barra de nivel: sube conforme bajas por la página ──
export const LevelHud = ({ level, total, label }: { level: number; total: number; label: string }) => (
    <div className="fixed bottom-4 left-4 z-[100] hidden items-center gap-2.5 rounded-lg border border-white/10 bg-[#0d0c14]/85 px-3 py-2 backdrop-blur md:flex" style={PIXEL}>
        <span className="text-[13px] text-[var(--one-accent)]">LV.{level}</span>
        <span className="flex gap-[3px]">
            {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`h-2.5 w-2.5 transition-colors duration-500 ${i < level ? "bg-[var(--one-accent)]" : "bg-white/10"}`} />
            ))}
        </span>
        <span className="text-[12px] text-white/55">{label}</span>
    </div>
);

// ── Logros estilo consola ──
export type Achievement = { id: number; title: string; sub: string };

export const AchievementToast = ({ items, lang }: { items: Achievement[]; lang: string }) => (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[130] flex flex-col items-end gap-2">
        <AnimatePresence>
            {items.map(a => (
                <motion.div key={a.id} initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    className="flex items-center gap-3 rounded-xl border border-[var(--one-accent)]/40 bg-[#15121f]/95 py-2.5 pl-2.5 pr-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--one-accent)] to-[var(--one-accent-2)] text-lg">🏆</span>
                    <span>
                        <span className="block text-[11px] uppercase tracking-wider text-[var(--one-accent)]" style={PIXEL}>{lang === "es" ? "Logro desbloqueado" : "Achievement unlocked"}</span>
                        <span className="block text-[14px] font-semibold">{a.title}</span>
                        <span className="block text-[12px] text-white/50">{a.sub}</span>
                    </span>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

export const useAchievements = () => {
    const [items, setItems] = useState<Achievement[]>([]);
    const [seen] = useState(() => new Set<string>());
    const unlock = (key: string, title: string, sub: string) => {
        if (seen.has(key)) return;
        seen.add(key);
        const id = Date.now() + Math.floor(Math.random() * 1000);
        setItems(xs => [...xs, { id, title, sub }]);
        setTimeout(() => setItems(xs => xs.filter(x => x.id !== id)), 4200);
    };
    return { items, unlock };
};

// ── ↑↑↓↓←→←→BA ──
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
export const useKonami = (onCode: () => void) => {
    // En una referencia: la página se vuelve a pintar al hacer scroll y no debe reiniciar el conteo.
    const cb = useRef(onCode);
    cb.current = onCode;
    useEffect(() => {
        let i = 0;
        const onKey = (e: KeyboardEvent) => {
            const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            i = k === KONAMI[i] ? i + 1 : (k === KONAMI[0] ? 1 : 0);
            if (i === KONAMI.length) { i = 0; cb.current(); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
};
