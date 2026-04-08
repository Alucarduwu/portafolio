import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
}

const SpaceCursor: React.FC = () => {
    // useMotionValue allows updating the DOM directly without triggering React re-renders, solving the lag issue
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const angle = useMotionValue(0);

    const [particles, setParticles] = useState<Particle[]>([]);
    const nextId = useRef(0);
    const lastParticleTime = useRef(0);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            // Direct cursor updates (No React Render = ZERO Lag)
            mouseX.set(currentX);
            mouseY.set(currentY);

            const dx = currentX - lastX;
            const dy = currentY - lastY;
            
            // Only calculate angle and particles if moving
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                angle.set(newAngle);

                // Throttle particle creation (max 1 per 30ms) to avoid array overflow and lag
                const now = Date.now();
                if (now - lastParticleTime.current > 30) {
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 3) {
                        lastParticleTime.current = now;
                        // Appending directly via state, but keeping array very small
                        setParticles(prev => [
                            ...prev, 
                            { id: nextId.current++, x: currentX, y: currentY }
                        ].slice(-8)); // Reduced max particles from 15 to 8 for massive performance gain
                    }
                }
            }
            lastX = currentX;
            lastY = currentY;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, angle]);

    // Cleanup stale particles automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.length > 0 ? prev.slice(1) : prev);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    if (typeof window === "undefined") return null;

    return createPortal(
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden lg:block hidden">
            {/* Fire Trail */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 0, y: 15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_10px_#f97316]"
                        style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
                    />
                ))}
            </AnimatePresence>

            {/* Spaceship */}
            <motion.div
                className="absolute flex items-center justify-center text-[var(--primary)] text-2xl drop-shadow-[0_0_8px_var(--primary)]"
                style={{ 
                    x: mouseX, 
                    y: mouseY, 
                    rotate: angle,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
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
