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
    useEffect(() => {
        // Only set the hacker font.
        // We let index.css handle the variables for both dark and light themes smoothly
        // without JS color blocking.
        document.body.style.fontFamily = "'JetBrains Mono', monospace";
        
        return () => {
            document.body.style.fontFamily = ""; // Clear on unmount
        };
    }, []);

    return (
        <div className="relative min-h-screen selection:bg-[var(--primary)]/30 selection:text-[var(--primary)] crt-flicker">
            <div className="fixed inset-0 pointer-events-none z-[40]">
                <div className="scanline opacity-[0.03]"></div>
                <div className="noise opacity-[0.02]"></div>
                
                {/* Corner Coordinates - Enhanced Hacker-Tech meta */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 font-mono text-[7px] text-[var(--text-muted)] opacity-60 flex flex-col items-start gap-1 uppercase tracking-widest notranslate" translate="no">
                    <span className="hidden md:inline font-black text-[var(--secondary)]">TTY: /dev/pts/0</span>
                    <span className="hidden md:inline">LAT: 21.8823° N</span>
                    <span className="hidden md:inline">LON: 102.2826° W</span>
                    <span className="hidden md:inline font-black text-blue-400">KERNEL: 6.4.2-LQX</span>
                    <UptimeDisplay />
                </div>

                <div className="absolute top-4 right-4 md:top-8 md:right-8 font-mono text-[7px] text-[var(--text-muted)] opacity-60 flex flex-col items-end gap-1 text-right uppercase tracking-widest notranslate" translate="no">
                    <MouseCoordinates />
                    <span className="text-green-500 font-black opacity-100 italic">SYSTEM_LOAD: 0.12, 0.15, 0.08</span>
                    <span className="hidden md:inline text-[var(--primary)] font-black">TCP_ESTABLISHED: port:3000</span>
                </div>

                {/* Bottom indicators - Enhanced Traffic & Metrics */}
                <div className="absolute bottom-10 left-8 z-[1000] hidden lg:block">
                    <TrafficMonitor />
                </div>

                <div className="absolute bottom-8 right-8 font-mono text-[6px] text-[var(--text-muted)] opacity-40 flex flex-col items-end gap-0.5 text-right uppercase tracking-widest hidden md:flex notranslate" translate="no">
                    <div className="flex gap-2">
                        <span className="text-[var(--primary)] font-black">RX: {(Math.random() * 50).toFixed(2)} KB/S</span>
                        <span className="text-[var(--secondary)] font-black">TX: {(Math.random() * 20).toFixed(2)} KB/S</span>
                    </div>
                    <span>SYSTEM_OS: ANAHI_V6.4_LQX</span>
                    <span>KERNEL_AUTH: RE_LEVEL_7</span>
                </div>

                {/* Decorative Sharp Brackets */}
                <div className="absolute inset-4 md:inset-8 border border-[var(--primary)]/5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--secondary)]/30"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--primary)]/30"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--primary)]/30"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--secondary)]/30"></div>
                    
                    {/* Interior Crosshairs */}
                    <div className="absolute top-1/2 left-4 w-4 h-[1px] bg-[var(--primary)]/10"></div>
                    <div className="absolute top-1/2 right-4 w-4 h-[1px] bg-[var(--primary)]/10"></div>
                    <div className="absolute bottom-4 left-1/2 w-[1px] h-4 bg-[var(--primary)]/10"></div>
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
