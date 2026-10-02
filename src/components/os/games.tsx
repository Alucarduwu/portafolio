import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Play, RotateCcw } from "lucide-react";
import { load, save, useOs } from "./shared";

// Mini juegos: Snake (el gatito come corazones) y memorama.

const N = 17;
type P = { x: number; y: number };
const fresh = () => ({ snake: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }] as P[], dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: { x: 12, y: 8 }, score: 0 });

const Snake = () => {
    const { s, award, top } = useOs();
    const canvas = useRef<HTMLCanvasElement>(null);
    const g = useRef(fresh());
    const swipe = useRef<P | null>(null);
    const [state, setState] = useState<"idle" | "run" | "pause" | "over">("idle");
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(() => load("os_snake_best", 0));

    const draw = useCallback(() => {
        const c = canvas.current;
        const ctx = c?.getContext("2d");
        if (!c || !ctx) return;
        const css = getComputedStyle(c);
        const accent = css.getPropertyValue("--os-accent").trim() || "#b79cff";
        const cell = c.width / N;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = css.getPropertyValue("--os-border").trim();
        for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) if ((x + y) % 2 === 0) ctx.fillRect(x * cell, y * cell, cell, cell);
        const { snake, food, dir } = g.current;
        ctx.fillStyle = "#ff6fae";
        ctx.font = `${cell * 0.95}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♥", (food.x + 0.5) * cell, (food.y + 0.56) * cell);
        snake.forEach((p, i) => {
            ctx.globalAlpha = i === 0 ? 1 : Math.max(0.45, 1 - i * 0.04);
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.roundRect(p.x * cell + 1, p.y * cell + 1, cell - 2, cell - 2, cell * 0.3);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        // Carita del gatito en la cabeza.
        const h = snake[0];
        ctx.fillStyle = "#14101f";
        const ex = dir.x * cell * 0.12, ey = dir.y * cell * 0.12;
        for (const side of [-1, 1]) {
            const ox = dir.x === 0 ? side * cell * 0.2 : 0, oy = dir.y === 0 ? side * cell * 0.2 : 0;
            ctx.beginPath();
            ctx.arc((h.x + 0.5) * cell + ox + ex, (h.y + 0.5) * cell + oy + ey, cell * 0.09, 0, Math.PI * 2);
            ctx.fill();
        }
    }, []);

    const start = () => { g.current = fresh(); setScore(0); setState("run"); award("gamer"); };
    const turn = (x: number, y: number) => {
        const d = g.current.dir;
        if (d.x === -x && d.y === -y) return;
        g.current.next = { x, y };
    };

    useEffect(() => { draw(); }, [draw, state]);

    // Si la ventana deja de estar al frente, el juego se pausa solo.
    const active = top === "games";
    useEffect(() => { if (!active) setState(st => (st === "run" ? "pause" : st)); }, [active]);

    useEffect(() => {
        if (state !== "run") return;
        const id = setInterval(() => {
            const game = g.current;
            game.dir = game.next;
            const head = { x: game.snake[0].x + game.dir.x, y: game.snake[0].y + game.dir.y };
            const crash = head.x < 0 || head.y < 0 || head.x >= N || head.y >= N || game.snake.some(p => p.x === head.x && p.y === head.y);
            if (crash) {
                setState("over");
                setBest(b => { const nb = Math.max(b, game.score); save("os_snake_best", nb); return nb; });
                return;
            }
            game.snake.unshift(head);
            if (head.x === game.food.x && head.y === game.food.y) {
                game.score += 1;
                setScore(game.score);
                if (game.score >= 10) award("snake10");
                let f: P;
                do { f = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) }; } while (game.snake.some(p => p.x === f.x && p.y === f.y));
                game.food = f;
            } else game.snake.pop();
            draw();
        }, 125);
        return () => clearInterval(id);
    }, [state, draw, award]);

    useEffect(() => {
        if (!active) return;
        const keys: Record<string, [number, number]> = {
            ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            const k = keys[e.key.length === 1 ? e.key.toLowerCase() : e.key];
            if (k) { e.preventDefault(); turn(k[0], k[1]); }
            else if (e.key === " ") { e.preventDefault(); setState(st => (st === "run" ? "pause" : st === "pause" ? "run" : st)); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    const overlay = state === "idle" ? { title: s.snake, btn: s.play, fn: start }
        : state === "over" ? { title: s.over, btn: s.again, fn: start }
        : state === "pause" ? { title: s.pause, btn: s.resume, fn: () => setState("run") } : null;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex w-full max-w-[340px] items-center justify-between font-semibold">
                <span>{s.score}: <span className="os-accent">{score}</span></span>
                <span className="os-muted">{s.best}: {best}</span>
            </div>
            <div className="relative w-full max-w-[340px]">
                <canvas ref={canvas} width={680} height={680} className="os-card aspect-square w-full touch-none"
                    onPointerDown={e => { swipe.current = { x: e.clientX, y: e.clientY }; }}
                    onPointerUp={e => {
                        if (!swipe.current) return;
                        const dx = e.clientX - swipe.current.x, dy = e.clientY - swipe.current.y;
                        swipe.current = null;
                        if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
                        if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0); else turn(0, Math.sign(dy));
                    }} />
                {overlay && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[14px] bg-black/55 text-white backdrop-blur-[2px]">
                        <p className="os-display text-[26px] font-semibold">{overlay.title}</p>
                        {state === "over" && <p className="text-[14px]">{s.score}: {score}</p>}
                        <button onClick={overlay.fn} className="os-btn os-btn-primary">{state === "over" ? <RotateCcw size={14} /> : <Play size={14} />}{overlay.btn}</button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
                <span />
                <button aria-label="↑" onClick={() => turn(0, -1)} className="os-btn !p-2.5"><ChevronUp size={18} /></button>
                <span />
                <button aria-label="←" onClick={() => turn(-1, 0)} className="os-btn !p-2.5"><ChevronLeft size={18} /></button>
                <button aria-label="↓" onClick={() => turn(0, 1)} className="os-btn !p-2.5"><ChevronDown size={18} /></button>
                <button aria-label="→" onClick={() => turn(1, 0)} className="os-btn !p-2.5"><ChevronRight size={18} /></button>
            </div>
            <p className="os-muted max-w-[340px] text-center text-[12.5px]">{s.snakeHint}</p>
        </div>
    );
};

const FACES = ["🐱", "🌸", "⭐", "🎮", "💜", "☕", "🍡", "🚀"];
const deal = () => [...FACES, ...FACES].map((f, i) => ({ f, k: i, r: Math.random() })).sort((a, b) => a.r - b.r);

const Memory = () => {
    const { s, award } = useOs();
    const [cards, setCards] = useState(deal);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);
    const [best, setBest] = useState(() => load<number | null>("os_memory_best", null));
    const won = matched.length === FACES.length;

    const flip = (i: number) => {
        if (flipped.length === 2 || flipped.includes(i) || matched.includes(cards[i].f)) return;
        const now = [...flipped, i];
        setFlipped(now);
        if (now.length < 2) return;
        const total = moves + 1;
        setMoves(total);
        award("gamer");
        if (cards[now[0]].f === cards[now[1]].f) {
            const done = [...matched, cards[i].f];
            setMatched(done);
            setFlipped([]);
            if (done.length === FACES.length) {
                award("memory");
                const nb = best === null ? total : Math.min(best, total);
                setBest(nb);
                save("os_memory_best", nb);
            }
        } else setTimeout(() => setFlipped([]), 750);
    };
    const restart = () => { setCards(deal()); setFlipped([]); setMatched([]); setMoves(0); };

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex w-full max-w-[340px] items-center justify-between font-semibold">
                <span>{s.moves}: <span className="os-accent">{moves}</span></span>
                <span className="os-muted">{s.best}: {best ?? "—"}</span>
            </div>
            <div className="grid w-full max-w-[340px] grid-cols-4 gap-2">
                {cards.map((c, i) => {
                    const up = flipped.includes(i) || matched.includes(c.f);
                    return (
                        <button key={c.k} onClick={() => flip(i)} aria-label={up ? c.f : "?"}
                            className="os-card relative flex aspect-square items-center justify-center text-[28px] transition-all duration-200"
                            style={up ? { background: "color-mix(in srgb, var(--os-accent) 22%, var(--os-surface-2))", borderColor: "var(--os-accent)" } : undefined}>
                            <span className={`transition-transform duration-200 ${up ? "scale-100" : "scale-0"}`}>{c.f}</span>
                            {!up && <span className="os-accent absolute text-[18px] font-bold">?</span>}
                        </button>
                    );
                })}
            </div>
            {won && <p className="os-display os-accent text-[20px] font-semibold">{s.win} ✦</p>}
            <button onClick={restart} className="os-btn"><RotateCcw size={14} />{s.again}</button>
            <p className="os-muted max-w-[340px] text-center text-[12.5px]">{s.memoryHint}</p>
        </div>
    );
};

export const Games = () => {
    const { s } = useOs();
    const [game, setGame] = useState<"snake" | "memory">("snake");
    return (
        <div className="p-5">
            <div className="os-card mx-auto mb-4 flex w-max gap-1 !rounded-xl p-1">
                {(["snake", "memory"] as const).map(id => (
                    <button key={id} onClick={() => setGame(id)} className="rounded-lg px-4 py-1.5 text-[13px] font-semibold"
                        style={game === id ? { background: "var(--os-accent)", color: "var(--os-on-accent)" } : undefined}>{s[id]}</button>
                ))}
            </div>
            {game === "snake" ? <Snake /> : <Memory />}
        </div>
    );
};
