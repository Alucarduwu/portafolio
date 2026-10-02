import { useEffect, useRef, useState } from "react";
import { Check, Lock, Moon, Sun } from "lucide-react";
import { ACCENTS, APPS, TROPHIES, WALLPAPERS, levelOf, load, save, useOs, type AccentId, type AppId } from "./shared";

// Utilidades del sistema: terminal, calculadora, notas, ajustes, logros y ayuda.

const ALIASES: Record<string, AppId> = {
    sobre: "about", about: "about", exp: "exp", experiencia: "exp", experience: "exp", proyectos: "projects", projects: "projects",
    tecnologias: "skills", skills: "skills", stack: "skills", servicios: "services", services: "services", certs: "certs", certificados: "certs",
    certificates: "certs", contacto: "contact", contact: "contact", juegos: "games", jugar: "games", games: "games", play: "games", snake: "games",
    ajustes: "settings", settings: "settings", logros: "trophies", achievements: "trophies", notas: "notes", notes: "notes",
    calc: "calc", calculadora: "calc", calculator: "calc", ayuda: "help", reclutador: "recruiter", recruiter: "recruiter", resume: "resume",
};

export const Terminal = () => {
    const { L, s, t, cv, prefs, setPrefs, openApp, exit, award, xp } = useOs();
    const [lines, setLines] = useState<string[]>([s.termHello]);
    const [value, setValue] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const cursor = useRef(-1);
    const end = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); }, [lines]);

    const run = (raw: string) => {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;
        setHistory(h => [raw, ...h]);
        cursor.current = -1;
        award("terminal");
        const [head, ...rest] = cmd.split(/\s+/);
        const arg = rest.join(" ");
        if (head === "clear" || head === "cls") return setLines([]);
        if (head === "salir" || head === "exit") return exit();
        let out: string[];
        const launch = (id: AppId) => { openApp(id); return [`${s.termOpen} ${s.apps[id]}…`]; };
        if (head === "ayuda" || head === "help") out = s.termHelp;
        else if (head === "whoami") out = [`Anahí Lozano · ${t.role}`, t.heroLine];
        else if (head === "apps" || head === "ls") out = APPS.map(a => `${a.id.padEnd(11)}${s.apps[a.id]}`);
        else if (head === "fecha" || head === "date") out = [new Date().toLocaleString(L === "es" ? "es-MX" : "en-US")];
        else if (head === "cv") { window.open(cv, "_blank", "noopener"); award("cv"); out = [`${s.termOpen} CV.pdf…`]; }
        else if (head === "neofetch") out = [
            "  /\\_/\\     anahi@os", " ( o.o )    ---------", "  > ^ <     OS: AnahíOS 2026",
            `            Shell: react 19 · typescript`, `            Theme: ${prefs.theme} · ${prefs.accent}`, `            XP: ${xp}`,
        ];
        else if (head === "tema" || head === "theme") {
            const dark = /oscuro|dark/.test(arg), light = /claro|light/.test(arg);
            if (dark || light) { setPrefs({ theme: dark ? "dark" : "light" }); out = [`${s.termTheme} ${arg}`]; }
            else out = [`${head} <${L === "es" ? "claro|oscuro" : "light|dark"}>`];
        }
        else if (head.startsWith("sudo")) out = [s.termSudo];
        else if ((head === "abrir" || head === "open") && (ALIASES[arg] || APPS.some(a => a.id === arg))) out = launch(ALIASES[arg] || arg as AppId);
        else if (ALIASES[head]) out = launch(ALIASES[head]);
        else out = [`${head}: ${s.termUnknown}`];
        setLines(ls => [...ls, `> ${raw}`, ...out]);
    };

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
        e.preventDefault();
        cursor.current = Math.max(-1, Math.min(history.length - 1, cursor.current + (e.key === "ArrowUp" ? 1 : -1)));
        setValue(cursor.current === -1 ? "" : history[cursor.current]);
    };

    return (
        <form onSubmit={e => { e.preventDefault(); run(value); setValue(""); }} onClick={() => input.current?.focus()}
            className="flex min-h-full cursor-text flex-col bg-[#0d0b14] p-4 font-mono text-[13px] leading-relaxed text-[#9be9d0]">
            {lines.map((l, i) => <pre key={i} className={`whitespace-pre-wrap font-mono ${l.startsWith("> ") ? "text-white" : ""}`}>{l}</pre>)}
            <label className="flex items-center gap-2">
                <span className="text-[#ff8fc4]">anahi@os:~$</span>
                <input ref={input} value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey} autoFocus spellCheck={false} autoCapitalize="none" autoComplete="off"
                    aria-label={s.apps.terminal} className="min-w-0 flex-1 bg-transparent text-white caret-[#ff8fc4] !outline-none" />
            </label>
            <div ref={end} />
        </form>
    );
};

const fmt = (n: number) => (Number.isFinite(n) ? String(Number(n.toPrecision(10))) : "Error");
const OPS: Record<string, (a: number, b: number) => number> = { "+": (a, b) => a + b, "−": (a, b) => a - b, "×": (a, b) => a * b, "÷": (a, b) => a / b };

export const Calc = () => {
    const [display, setDisplay] = useState("0");
    const [acc, setAcc] = useState<number | null>(null);
    const [op, setOp] = useState<string | null>(null);
    const [fresh, setFresh] = useState(true);
    const cur = display === "Error" ? 0 : parseFloat(display);

    const press = (k: string) => {
        if (/^[0-9]$/.test(k)) { setDisplay(fresh || display === "0" ? k : (display + k).slice(0, 14)); setFresh(false); }
        else if (k === ".") { if (fresh) { setDisplay("0."); setFresh(false); } else if (!display.includes(".")) setDisplay(display + "."); }
        else if (k === "C") { setDisplay("0"); setAcc(null); setOp(null); setFresh(true); }
        else if (k === "±") setDisplay(fmt(-cur));
        else if (k === "%") setDisplay(fmt(cur / 100));
        else if (k === "=") { if (op !== null && acc !== null) { setDisplay(fmt(OPS[op](acc, cur))); setAcc(null); setOp(null); setFresh(true); } }
        else {
            const value = op !== null && acc !== null && !fresh ? OPS[op](acc, cur) : cur;
            setAcc(value); setDisplay(fmt(value)); setOp(k); setFresh(true);
        }
    };
    const KEYS = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];

    return (
        <div className="flex h-full flex-col gap-3 p-4">
            <div className="os-card flex min-h-[76px] flex-col items-end justify-end px-4 py-2">
                <span className="os-muted h-4 text-[12px]">{acc !== null && op ? `${fmt(acc)} ${op}` : ""}</span>
                <span className="os-display max-w-full truncate text-[32px] font-semibold leading-tight">{display}</span>
            </div>
            <div className="grid flex-1 grid-cols-4 gap-2">
                {KEYS.map(k => {
                    const isOp = k in OPS || k === "=";
                    return (
                        <button key={k} onClick={() => press(k)} className={`os-btn !text-[17px] ${k === "0" ? "col-span-2" : ""} ${isOp ? "os-btn-primary" : ""}`}
                            style={op === k && fresh ? { filter: "brightness(1.25)" } : undefined}>{k}</button>
                    );
                })}
            </div>
        </div>
    );
};

export const Notes = () => {
    const { s } = useOs();
    const [text, setText] = useState(() => load("os_notes", ""));
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => { save("os_notes", text); setSaved(true); }, 400);
        return () => clearTimeout(id);
    }, [text]);
    return (
        <div className="flex h-full flex-col">
            <textarea value={text} onChange={e => { setText(e.target.value); setSaved(false); }} placeholder={s.notesHint} spellCheck={false}
                className="min-h-0 flex-1 resize-none bg-transparent p-5 text-[14.5px] leading-relaxed !outline-none placeholder:text-[var(--os-muted)]" />
            <div className="os-muted flex justify-between border-t border-[var(--os-border)] px-4 py-1.5 text-[12px]">
                <span>{text.length} · {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                <span>{saved && text ? `✓ ${s.saved}` : ""}</span>
            </div>
        </div>
    );
};

export const SettingsApp = () => {
    const { s, prefs, setPrefs, resetData } = useOs();
    const [done, setDone] = useState(false);
    return (
        <div className="space-y-6 p-6">
            <section>
                <h3 className="os-label">{s.theme}</h3>
                <div className="mt-2 grid max-w-[360px] grid-cols-2 gap-2">
                    {(["light", "dark"] as const).map(th => (
                        <button key={th} onClick={() => setPrefs({ theme: th })} data-on={prefs.theme === th} className="os-btn !justify-start !py-3"
                            style={prefs.theme === th ? { borderColor: "var(--os-accent)" } : undefined}>
                            {th === "light" ? <Sun size={16} /> : <Moon size={16} />}{s[th]}{prefs.theme === th && <Check size={14} className="os-accent ml-auto" />}
                        </button>
                    ))}
                </div>
            </section>
            <section>
                <h3 className="os-label">{s.accent}</h3>
                <div className="mt-2 flex flex-wrap gap-3">
                    {(Object.keys(ACCENTS) as AccentId[]).map(a => (
                        <button key={a} onClick={() => setPrefs({ accent: a })} aria-label={a} title={a} aria-pressed={prefs.accent === a}
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
                            style={{ background: ACCENTS[a][prefs.theme], boxShadow: prefs.accent === a ? `0 0 0 3px var(--os-surface), 0 0 0 5px ${ACCENTS[a][prefs.theme]}` : undefined }}>
                            {prefs.accent === a && <Check size={16} color={prefs.theme === "dark" ? "#14101f" : "#fff"} />}
                        </button>
                    ))}
                </div>
            </section>
            <section>
                <h3 className="os-label">{s.wallpaper}</h3>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {WALLPAPERS.map(w => (
                        <button key={w} onClick={() => setPrefs({ wallpaper: w })} aria-pressed={prefs.wallpaper === w} className="text-left">
                            <span className="relative block aspect-[16/10] overflow-hidden rounded-xl border-2" style={{ borderColor: prefs.wallpaper === w ? "var(--os-accent)" : "var(--os-border)", background: "var(--os-bg)" }}>
                                <span className={`os-wall os-wall-${w}`} />
                            </span>
                            <span className="mt-1 block text-[12.5px] font-semibold">{s.wallpapers[w]}</span>
                        </button>
                    ))}
                </div>
            </section>
            <section className="os-card flex flex-wrap items-center justify-between gap-3 p-4">
                <p className="os-muted max-w-[42ch] text-[13px]">{s.resetHint}</p>
                <button onClick={() => { resetData(); setDone(true); }} className="os-btn">{done ? <><Check size={14} />{s.resetDone}</> : s.reset}</button>
            </section>
        </div>
    );
};

export const Trophies = () => {
    const { L, s, unlocked, xp } = useOs();
    const { level, next, base } = levelOf(xp);
    const pct = next === null ? 100 : Math.round(((xp - base) / (next - base)) * 100);
    return (
        <div className="space-y-4 p-6">
            <div className="os-card flex items-center gap-4 p-4">
                <span className="os-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[24px] font-semibold" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>{level}</span>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold">{s.level} {level} · {xp} XP · {unlocked.length} {s.of} {TROPHIES.length}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--os-border)]"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "var(--os-accent)" }} /></div>
                    <p className="os-muted mt-1 text-[12px]">{next === null ? s.maxLevel : `${next - xp} ${s.xpTo} ${level + 1}`}</p>
                </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
                {TROPHIES.map(tr => {
                    const got = unlocked.includes(tr.id);
                    return (
                        <div key={tr.id} className="os-card flex items-center gap-3 p-3" style={got ? { borderColor: "color-mix(in srgb, var(--os-accent) 50%, transparent)" } : { opacity: 0.62 }}>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px]" style={{ background: got ? "color-mix(in srgb, var(--os-accent) 22%, transparent)" : "var(--os-border)" }}>
                                {got ? "🏆" : <Lock size={15} className="os-muted" />}
                            </span>
                            <div className="min-w-0">
                                <p className="font-semibold leading-snug">{tr[L][0]}</p>
                                <p className="os-muted text-[12.5px] leading-snug">{tr[L][1]}</p>
                            </div>
                            <span className="os-chip ml-auto shrink-0">+{tr.xp} XP</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const Help = () => {
    const { s } = useOs();
    return (
        <div className="space-y-4 p-6">
            <p className="text-[15px] leading-relaxed">{s.helpIntro}</p>
            <div className="os-card divide-y divide-[var(--os-border)]">
                {s.shortcuts.map(([k, d]) => (
                    <div key={k} className="flex items-center justify-between gap-3 px-4 py-2.5">
                        <span className="os-muted">{d}</span>
                        <kbd className="shrink-0 rounded-md border border-[var(--os-border)] bg-[var(--os-surface)] px-2 py-0.5 font-mono text-[12px]">{k}</kbd>
                    </div>
                ))}
            </div>
            <p className="os-muted text-[12.5px]">AnahíOS 2026 · {s.helpMade}</p>
        </div>
    );
};
