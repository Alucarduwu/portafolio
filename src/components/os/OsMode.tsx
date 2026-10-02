import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion";
import { BadgeCheck, Download, Languages, LayoutGrid, Lock, LogOut, Mail, Minus, Moon, Search, Settings, Square, Sun, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT_CONFIG } from "../../config";
import { Sakura } from "../Kawaii";
import type { Job } from "../OnePage";
import { About, Certs, Contact, Experience, Projects, Recruiter, Resume, Services, Skills } from "./apps";
import { Games } from "./games";
import { Calc, Help, Notes, SettingsApp, Terminal, Trophies } from "./tools";
import { ACCENTS, APPS, OsCtx, S, TROPHIES, appMeta, levelOf, load, save, type AppId, type Lang, type OsProject, type PageCopy, type Prefs, type Strings, type WallpaperId } from "./shared";

// AnahíOS: el portafolio como escritorio. Pantalla de bloqueo, dock, menú de inicio con
// buscador, ventanas que se arrastran y cambian de tamaño, temas, logros y mini juegos.

type Props = {
    L: Lang; t: PageCopy; jobs: Job[]; projects: OsProject[]; cv: string; mail: string; whatsapp: string;
    onToggleLang: () => void; onClose: () => void;
};

const BODY: Record<AppId, () => React.ReactNode> = {
    about: About, exp: Experience, projects: Projects, skills: Skills, services: Services, certs: Certs, resume: Resume, contact: Contact,
    recruiter: Recruiter, terminal: Terminal, calc: Calc, notes: Notes, games: Games, settings: SettingsApp, trophies: Trophies, help: Help,
};
const STORAGE_KEYS = ["os_prefs", "os_trophies", "os_notes", "os_snake_best", "os_memory_best", "os_welcomed"];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const systemTheme = (): Prefs["theme"] => (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
const defaultPrefs = (): Prefs => ({ theme: systemTheme(), accent: "lila", wallpaper: "aurora" });

const useMobile = () => {
    const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 639px)").matches);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const on = () => setMobile(mq.matches);
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);
    return mobile;
};

// Posiciones fijas: nada aleatorio en cada render.
const STARS = Array.from({ length: 48 }, (_, i) => [(i * 37 + 7) % 100, (i * 53 + 13) % 100, (i % 6) * 0.55]);
const Wallpaper = ({ id }: { id: WallpaperId }) => (
    <div className={`os-wall os-wall-${id}`} aria-hidden>
        {id === "stars" && STARS.map(([l, t, d], i) => <span key={i} className="os-star" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${d}s` }} />)}
        {id === "sakura" && <Sakura />}
    </div>
);

const Tile = ({ id, size }: { id: AppId; size: number }) => {
    const { icon: Icon, grad } = appMeta(id);
    return (
        <span className="os-tile" style={{ width: size, height: size, background: `linear-gradient(145deg, ${grad[0]}, ${grad[1]})` }}>
            <Icon size={size * 0.54} strokeWidth={2} />
        </span>
    );
};

// ── Ventana: se arrastra desde la barra y se estira desde la esquina; en celular ocupa todo ──
const Window = ({ id, title, z, active, hidden, mobile, bounds, s, onFocus, onMin, onClose, children }: {
    id: AppId; title: string; z: number; active: boolean; hidden: boolean; mobile: boolean;
    bounds: React.RefObject<HTMLDivElement | null>; s: Strings; onFocus: () => void; onMin: () => void; onClose: () => void; children: React.ReactNode;
}) => {
    const meta = appMeta(id);
    const controls = useDragControls();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const saved = useRef({ x: 0, y: 0 });
    const [max, setMax] = useState(false);
    const [box, setBox] = useState(() => {
        const r = bounds.current?.getBoundingClientRect();
        const W = r?.width ?? 1200, H = r?.height ?? 700;
        const w = Math.min(meta.w, W - 24), h = Math.min(meta.h, H - 20);
        const off = ((APPS.indexOf(meta) % 5) - 2) * 26;
        return { w, h, left: clamp((W - w) / 2 + off, 12, Math.max(12, W - w - 12)), top: clamp((H - h) / 2 + off * 0.6, 10, Math.max(10, H - h - 10)) };
    });
    const full = max || mobile;

    const toggleMax = () => {
        if (!max) { saved.current = { x: x.get(), y: y.get() }; x.set(0); y.set(0); }
        else { x.set(saved.current.x); y.set(saved.current.y); }
        setMax(m => !m);
    };
    useEffect(() => { if (mobile) { x.set(0); y.set(0); } }, [mobile, x, y]);

    const startResize = (e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const sx = e.clientX, sy = e.clientY, { w, h } = box;
        const r = bounds.current!.getBoundingClientRect();
        const move = (ev: PointerEvent) => setBox(b => ({ ...b, w: clamp(w + ev.clientX - sx, 300, r.width), h: clamp(h + ev.clientY - sy, 220, r.height) }));
        const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    };

    const ctl = "flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--os-border)]";
    return (
        <motion.section role="dialog" aria-label={title} data-active={active}
            drag={!full} dragControls={controls} dragListener={false} dragMomentum={false} dragElastic={0} dragConstraints={bounds}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.18, ease: "easeOut" }}
            onPointerDown={onFocus}
            style={{ x, y, zIndex: 10 + z, ...(full ? {} : { left: box.left, top: box.top, width: box.w, height: box.h }) }}
            className={`os-win pointer-events-auto absolute flex flex-col overflow-hidden ${hidden ? "hidden" : ""} ${full ? "inset-0 !rounded-none !border-0" : ""}`}>
            <div className={`flex h-11 shrink-0 select-none items-center gap-2.5 border-b border-[var(--os-border)] bg-[var(--os-surface-2)] pl-3 pr-2 ${full ? "" : "cursor-grab touch-none active:cursor-grabbing"}`}
                onPointerDown={e => { if (!full) controls.start(e); }} onDoubleClick={() => { if (!mobile) toggleMax(); }}>
                <Tile id={id} size={22} />
                <span className="truncate text-[13px] font-semibold">{title}</span>
                <span className="ml-auto flex shrink-0 gap-0.5" onPointerDown={e => e.stopPropagation()}>
                    <button aria-label={s.min} title={s.min} onClick={onMin} className={ctl}><Minus size={14} /></button>
                    {!mobile && <button aria-label={s.max} title={s.max} onClick={toggleMax} className={ctl}><Square size={11} /></button>}
                    <button aria-label={s.close} title={s.close} onClick={onClose} className={`${ctl} hover:!bg-[#e5484d] hover:text-white`}><X size={14} /></button>
                </span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {!full && <span onPointerDown={startResize} aria-hidden className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize touch-none" style={{ background: "linear-gradient(135deg, transparent 55%, var(--os-muted) 55%, var(--os-muted) 62%, transparent 62%, transparent 74%, var(--os-muted) 74%, var(--os-muted) 81%, transparent 81%)" }} />}
        </motion.section>
    );
};

const OsMode = ({ L, t, jobs, projects, cv, mail, whatsapp, onToggleLang, onClose }: Props) => {
    const s = S[L];
    const mobile = useMobile();
    const area = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const [prefs, setPrefsState] = useState<Prefs>(() => ({ ...defaultPrefs(), ...load<Partial<Prefs>>("os_prefs", {}) }));
    const [locked, setLocked] = useState(true);
    // El orden del arreglo es el orden de apilado: la última ventana queda encima.
    const [open, setOpen] = useState<AppId[]>([]);
    const [minimized, setMinimized] = useState<AppId[]>([]);
    const [menu, setMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [projectSel, setProjectSel] = useState<string | null>(null);
    const [unlocked, setUnlocked] = useState<string[]>(() => load<string[]>("os_trophies", []));
    const [toasts, setToasts] = useState<{ tid: number; id: string }[]>([]);
    const [welcome, setWelcome] = useState(() => !load("os_welcomed", false));
    const [now, setNow] = useState(() => new Date());
    const got = useRef(new Set(unlocked));
    const seen = useRef(new Set<AppId>());

    useEffect(() => { save("os_prefs", prefs); }, [prefs]);
    useEffect(() => { save("os_trophies", unlocked); }, [unlocked]);
    useEffect(() => {
        const tick = setInterval(() => setNow(new Date()), 15000);
        return () => clearInterval(tick);
    }, []);

    const award = useCallback((id: string) => {
        if (got.current.has(id) || !TROPHIES.some(tr => tr.id === id)) return;
        got.current.add(id);
        setUnlocked(u => [...u, id]);
        const tid = Date.now() + Math.random();
        setToasts(ts => [...ts, { tid, id }]);
        setTimeout(() => setToasts(ts => ts.filter(x => x.tid !== tid)), 4200);
    }, []);

    const setPrefs = (patch: Partial<Prefs>) => { setPrefsState(p => ({ ...p, ...patch })); award("theme"); };
    const resetData = () => {
        STORAGE_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch { /* almacenamiento bloqueado */ } });
        got.current.clear();
        seen.current.clear();
        setUnlocked([]);
        setPrefsState(defaultPrefs());
    };

    const openApp = useCallback((id: AppId) => {
        setMenu(false);
        setQuery("");
        setMinimized(m => m.filter(x => x !== id));
        setOpen(o => [...o.filter(x => x !== id), id]);
        seen.current.add(id);
        award("first");
        if (seen.current.size >= 5) award("five");
        if (seen.current.size === APPS.length) award("all");
    }, [award]);
    const close = (id: AppId) => { setOpen(o => o.filter(x => x !== id)); setMinimized(m => m.filter(x => x !== id)); };
    const minimize = (id: AppId) => setMinimized(m => [...m, id]);
    const visible = open.filter(id => !minimized.includes(id));
    const top = visible[visible.length - 1];

    const openMenu = () => { setMenu(true); setTimeout(() => searchRef.current?.focus(), 60); };
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (locked) { if (!e.ctrlKey && !e.metaKey && !e.altKey) setLocked(false); return; }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openMenu(); }
            else if (e.key === "Escape") setMenu(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [locked]);

    const q = query.trim().toLowerCase();
    const appHits = APPS.filter(a => !q || s.apps[a.id].toLowerCase().includes(q) || a.id.includes(q));
    const projectHits = projects.filter(p => !q || `${p.name} ${p.tags.join(" ")}`.toLowerCase().includes(q)).slice(0, q ? 6 : 4);
    const launchProject = (name: string) => { setProjectSel(name); openApp("projects"); award("project"); if (q) award("search"); };
    const launchApp = (id: AppId) => { if (q) award("search"); openApp(id); };
    const submitSearch = () => { if (appHits[0]) launchApp(appHits[0].id); else if (projectHits[0]) launchProject(projectHits[0].name); };

    const xp = TROPHIES.filter(tr => unlocked.includes(tr.id)).reduce((sum, tr) => sum + tr.xp, 0);
    const { level, next, base } = levelOf(xp);
    const locale = L === "es" ? "es-MX" : "en-US";
    const time = now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    const dockApps = [...APPS.filter(a => a.pinned).map(a => a.id), ...open.filter(id => !appMeta(id).pinned)];
    const tray = "flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-xl px-2 text-[12.5px] font-semibold transition-colors hover:bg-[var(--os-border)]";

    return (
        <OsCtx.Provider value={{ L, s, t, jobs, projects, cv, mail, whatsapp, prefs, setPrefs, unlocked, xp, award, resetData, openApp, exit: onClose, projectSel, setProjectSel, top }}>
            <motion.div data-lenis-prevent role="application" aria-label="AnahíOS" data-theme={prefs.theme} className="os"
                style={{ "--os-accent": ACCENTS[prefs.accent][prefs.theme] } as React.CSSProperties}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Wallpaper id={prefs.wallpaper} />

                {/* ── Íconos del escritorio ── */}
                <div className="absolute inset-0 pb-24" onPointerDown={() => setMenu(false)}>
                    <div className="flex max-h-full flex-wrap content-start gap-1 p-3 sm:h-full sm:w-max sm:flex-col">
                        {APPS.filter(a => a.desktop).map(a => (
                            <button key={a.id} onClick={() => openApp(a.id)} className="group flex w-[88px] flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-white/10">
                                <span className="transition-transform group-hover:-translate-y-0.5 group-active:scale-95"><Tile id={a.id} size={54} /></span>
                                <span className="rounded-md bg-black/35 px-1.5 py-px text-center text-[12px] font-semibold leading-tight text-white backdrop-blur-sm">{s.apps[a.id]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Ventanas ── */}
                <div ref={area} className="pointer-events-none absolute inset-x-0 bottom-[72px] top-0 sm:bottom-[80px]">
                    <AnimatePresence>
                        {open.map(id => {
                            const Body = BODY[id];
                            return (
                                <Window key={id} id={id} title={s.apps[id]} z={open.indexOf(id)} active={top === id} hidden={minimized.includes(id)} mobile={mobile}
                                    bounds={area} s={s} onFocus={() => { if (top !== id) setOpen(o => [...o.filter(x => x !== id), id]); setMenu(false); }}
                                    onMin={() => minimize(id)} onClose={() => close(id)}>
                                    <Body />
                                </Window>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* ── Logros y aviso de bienvenida ── */}
                <div className="pointer-events-none absolute right-3 top-3 z-[70] flex w-[min(320px,calc(100%-24px))] flex-col gap-2">
                    <AnimatePresence>
                        {toasts.map(({ tid, id }) => {
                            const tr = TROPHIES.find(x => x.id === id)!;
                            return (
                                <motion.div key={tid} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="os-panel flex items-center gap-3 rounded-2xl p-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[20px]" style={{ background: "color-mix(in srgb, var(--os-accent) 24%, transparent)" }}>🏆</span>
                                    <span className="min-w-0">
                                        <span className="os-label block">{s.unlocked}</span>
                                        <span className="block font-semibold leading-snug">{tr[L][0]}</span>
                                        <span className="os-muted block text-[12px] leading-snug">{tr[L][1]} · <span className="os-accent font-semibold">+{tr.xp} XP</span></span>
                                    </span>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {welcome && !locked && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                            className="os-panel absolute bottom-[88px] right-3 z-[65] w-[min(340px,calc(100%-24px))] rounded-2xl p-4">
                            <p className="os-display text-[17px] font-semibold">{s.welcome} ✦</p>
                            <p className="os-muted mt-1 text-[13px] leading-relaxed">{s.welcomeBody}</p>
                            <button onClick={() => { setWelcome(false); save("os_welcomed", true); }} className="os-btn os-btn-primary mt-3 w-full">{s.gotIt}</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Menú de inicio ── */}
                <AnimatePresence>
                    {menu && (
                        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.16 }}
                            className="os-panel absolute inset-x-2 bottom-[76px] z-[75] mx-auto grid max-h-[calc(100%-92px)] max-w-[700px] overflow-y-auto rounded-2xl sm:bottom-[84px] sm:grid-cols-[230px_1fr]">
                            <div className="order-last flex flex-col gap-1 border-t border-[var(--os-border)] p-4 sm:order-first sm:border-r sm:border-t-0">
                                <span className="os-display flex h-14 w-14 items-center justify-center rounded-full text-[20px] font-semibold" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>AL</span>
                                <p className="os-display mt-1 text-[17px] font-semibold leading-tight">Anahí Lozano</p>
                                <p className="os-muted text-[12.5px]">{t.role} · Aguascalientes</p>
                                <a href={cv} target="_blank" rel="noopener noreferrer" onClick={() => award("cv")} className="os-btn os-btn-primary my-2"><Download size={14} />{t.ctaCv}</a>
                                <button onClick={() => openApp("recruiter")} className="os-row"><BadgeCheck size={16} />{s.apps.recruiter}</button>
                                <button onClick={() => openApp("contact")} className="os-row"><Mail size={16} />{s.apps.contact}</button>
                                <a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => award("contact")} className="os-row"><FaLinkedin size={16} />LinkedIn</a>
                                <a href="https://github.com/Alucarduwu" target="_blank" rel="noopener noreferrer" onClick={() => award("contact")} className="os-row"><FaGithub size={16} />GitHub</a>
                                <button onClick={onToggleLang} className="os-row"><Languages size={16} />{L === "es" ? "English" : "Español"}</button>
                                <div className="mt-auto border-t border-[var(--os-border)] pt-2">
                                    <button onClick={() => { setMenu(false); setLocked(true); }} title={s.lockHint} className="os-row"><Lock size={16} />{s.lock}</button>
                                    <button onClick={onClose} className="os-row text-[#e5484d]"><LogOut size={16} />{s.exit}</button>
                                </div>
                            </div>
                            <div className="min-w-0 p-4">
                                <form onSubmit={e => { e.preventDefault(); submitSearch(); }} className="relative">
                                    <Search size={15} className="os-muted pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder={s.search} aria-label={s.search} className="os-input !pl-9" />
                                </form>
                                {appHits.length > 0 && <p className="os-label mt-4">{s.appsTitle}</p>}
                                <div className="mt-2 grid grid-cols-4 gap-1">
                                    {appHits.map(a => (
                                        <button key={a.id} onClick={() => launchApp(a.id)} className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center hover:bg-[var(--os-border)]">
                                            <Tile id={a.id} size={40} />
                                            <span className="text-[11.5px] font-medium leading-tight">{s.apps[a.id]}</span>
                                        </button>
                                    ))}
                                </div>
                                {projectHits.length > 0 && <p className="os-label mt-4">{s.projectsTitle}</p>}
                                <div className="mt-1">
                                    {projectHits.map(p => (
                                        <button key={p.name} onClick={() => launchProject(p.name)} className="os-row">
                                            <Tile id="projects" size={26} />
                                            <span className="min-w-0">
                                                <span className="block truncate font-semibold leading-snug">{p.name}</span>
                                                <span className="os-muted block truncate text-[12px] leading-snug">{p.tags.slice(0, 3).join(" · ")}</span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {!appHits.length && !projectHits.length && <p className="os-muted mt-6 text-center">{s.nothing}</p>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Dock y bandeja ── */}
                <div className="absolute inset-x-2 bottom-2 z-[80] flex items-center justify-center gap-2 sm:bottom-3">
                    <div className="os-glass flex min-w-0 items-center gap-1.5 overflow-x-auto rounded-2xl p-1.5 [scrollbar-width:none]">
                        <button onClick={() => (menu ? setMenu(false) : openMenu())} aria-expanded={menu} aria-label={s.start} title={`${s.start} (Ctrl+K)`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform hover:-translate-y-0.5" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>
                            <LayoutGrid size={21} />
                        </button>
                        <span className="h-7 w-px shrink-0 bg-[var(--os-border)]" />
                        {dockApps.map(id => (
                            <button key={id} onClick={() => (top === id ? minimize(id) : openApp(id))} aria-label={s.apps[id]} title={s.apps[id]}
                                className="relative shrink-0 rounded-xl p-0.5 transition-transform hover:-translate-y-1">
                                <Tile id={id} size={40} />
                                {open.includes(id) && <span className="absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full transition-all" style={{ width: top === id ? 16 : 5, background: "var(--os-accent)" }} />}
                            </button>
                        ))}
                    </div>
                    <div className="os-glass flex shrink-0 items-center gap-0.5 rounded-2xl p-1.5">
                        <button onClick={() => openApp("trophies")} title={`${s.level} ${level} · ${xp} XP`} aria-label={s.apps.trophies} className={tray}>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>{level}</span>
                            <span className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-[var(--os-border)] md:block">
                                <span className="block h-full rounded-full" style={{ width: `${next === null ? 100 : ((xp - base) / (next - base)) * 100}%`, background: "var(--os-accent)" }} />
                            </span>
                        </button>
                        <button onClick={onToggleLang} title={s.lang} aria-label={s.lang} className={`${tray} hidden sm:flex`}><Languages size={15} />{L.toUpperCase()}</button>
                        <button onClick={() => setPrefs({ theme: prefs.theme === "dark" ? "light" : "dark" })} title={prefs.theme === "dark" ? s.toLight : s.toDark} aria-label={prefs.theme === "dark" ? s.toLight : s.toDark} className={tray}>
                            {prefs.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button onClick={() => openApp("settings")} title={s.apps.settings} aria-label={s.apps.settings} className={`${tray} hidden sm:flex`}><Settings size={16} /></button>
                        <span className="hidden px-2 text-right leading-tight md:block">
                            <span className="block text-[12.5px] font-semibold">{time}</span>
                            <span className="os-muted block text-[11px]">{now.toLocaleDateString(locale, { day: "numeric", month: "short" })}</span>
                        </span>
                        <button onClick={onClose} title={s.exit} aria-label={s.exit} className={tray}><LogOut size={16} /><span className="hidden lg:inline">{s.exitShort}</span></button>
                    </div>
                </div>

                {/* ── Pantalla de bloqueo ── */}
                <AnimatePresence>
                    {locked && (
                        <motion.div exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.35 }} onClick={() => setLocked(false)}
                            className="absolute inset-0 z-[90] flex cursor-pointer flex-col items-center bg-[#0c0a14]/80 px-4 pb-5 pt-[12vh] text-white backdrop-blur-md">
                            <p className="os-display text-[72px] font-semibold leading-none sm:text-[112px]">{time}</p>
                            <p className="mt-3 text-[17px] text-white/80 first-letter:uppercase">{now.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}</p>
                            <div className="mt-auto flex flex-col items-center gap-3">
                                <span className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 font-semibold">
                                    <span className="os-display flex h-8 w-8 items-center justify-center rounded-full text-[13px]" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>AL</span>Anahí Lozano
                                </span>
                                <p className="text-[13px] text-white/65">{s.unlock}</p>
                            </div>
                            <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-2" onClick={e => e.stopPropagation()}>
                                <button onClick={onToggleLang} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/20"><Languages size={15} />{L === "es" ? "Español" : "English"}</button>
                                <span className="flex gap-2">
                                    <button onClick={() => { setLocked(false); openApp("recruiter"); }} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/20"><BadgeCheck size={15} />{s.recruiterCta}</button>
                                    <button onClick={onClose} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/20"><LogOut size={15} />{s.exitShort}</button>
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </OsCtx.Provider>
    );
};

export default OsMode;
