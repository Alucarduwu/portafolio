import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
}

const SpaceCursor: React.FC = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);
    const [particles, setParticles] = useState<Particle[]>([]);
    const nextId = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            setPos(prev => {
                const dx = currentX - prev.x;
                const dy = currentY - prev.y;
                
                // Only calculate angle if there is significant movement
                if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                    const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                    setAngle(newAngle);

                    // Add fire particle
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 5) {
                        setParticles(prevP => [
                            ...prevP, 
                            { id: nextId.current++, x: currentX, y: currentY }
                        ].slice(-15)); // Keep only last 15 particles
                    }
                }
                return { x: currentX, y: currentY };
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Clean up particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.slice(1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return createPortal(
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden lg:block hidden">
            {/* Fire Trail */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 0, y: 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_10px_#f97316]"
                        style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
                    />
                ))}
            </AnimatePresence>

            {/* Spaceship */}
            <motion.div
                className="absolute flex items-center justify-center text-[var(--primary)] text-2xl drop-shadow-[0_0_8px_var(--primary)]"
                style={{ 
                    left: pos.x, 
                    top: pos.y, 
                    rotate: `${angle}deg`,
                    transform: 'translate(-50%, -50%)'
                } as any}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                <span className="material-symbols-outlined fill-[1]">rocket_launch</span>
            </motion.div>
        </div>,
        document.body
    );
};

export default SpaceCursor;
