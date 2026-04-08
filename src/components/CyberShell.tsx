import React, { useState, useEffect } from "react";
import TrafficMonitor from "./TrafficMonitor";

// Isolate Uptime State to prevent global app re-renders every 1 second
const UptimeDisplay = () => {
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatUptime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return <span className="text-[var(--primary)] font-black opacity-100">UPTIME: {formatUptime(uptime)}</span>;
};

// Isolate Mouse Coordinate State to prevent global app re-renders on every pixel moved
const MouseCoordinates = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let ticking = false;
        const handleMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setMousePos({ x: e.clientX, y: e.clientY });
                    ticking = false;
                });
                ticking = true;
            }
        };
        // Use passive listener for extreme performance
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <span className="hidden md:inline">X: {mousePos.x}</span>
            <span className="hidden md:inline">Y: {mousePos.y}</span>
        </>
    );
};

const CyberShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // CyberShell is now a STATeless wrapper. 
    // Moving the states out guarantees that `<App />` and all its animations don't re-render when the mouse moves.

    return (
        <div className="relative min-h-screen selection:bg-[var(--primary)]/30 selection:text-[var(--primary)] crt-flicker">
            <div className="fixed inset-0 pointer-events-none z-[40]">
                <div className="scanline opacity-[0.03]"></div>
                <div className="noise opacity-[0.02]"></div>
                
                {/* Corner Coordinates - Subtler and theme-aware */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-[7px] text-[var(--text-muted)] opacity-60 flex flex-col items-start gap-1 uppercase tracking-widest">
                    <span className="hidden md:inline">LAT: 21.8823° N</span>
                    <span className="hidden md:inline">LON: 102.2826° W</span>
                    <UptimeDisplay />
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[7px] text-[var(--text-muted)] opacity-60 flex flex-col items-end gap-1 text-right uppercase tracking-widest">
                    <MouseCoordinates />
                    <span className="text-green-500 font-black opacity-100">SECURE_TUNNEL</span>
                </div>

                {/* Bottom indicators - Traffic & Access Logs */}
                <div className="absolute bottom-6 left-6 z-[1000]">
                    <TrafficMonitor />
                </div>

                <div className="absolute bottom-4 right-6 font-mono text-[6px] text-[var(--text-muted)] opacity-30 flex flex-col items-end gap-0.5 text-right uppercase tracking-tighter hidden md:flex">
                    <span>BITRATE: 12.4 MB/S</span>
                    <span>ENCRYPTION: AES-256</span>
                </div>

                {/* Decorative Brackets around the viewport */}
                <div className="absolute inset-2 md:inset-4 border border-[var(--primary)]/5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--primary)]/20"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--primary)]/20"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--primary)]/20"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--primary)]/20"></div>
                </div>
            </div>

            <div className="relative">
                {children}
            </div>
            
            <style>{`
                .crt-flicker {
                    animation: crt-flicker 0.15s infinite;
                }
                @keyframes crt-flicker {
                    0% { opacity: 0.99; }
                    5% { opacity: 0.98; }
                    10% { opacity: 0.99; }
                    15% { opacity: 0.97; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default CyberShell;
