import { useMemo } from 'react';

const HackerBackground = () => {
    // Generate random columns of falling data
    const columns = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => {
            const left = Math.random() * 100;
            const duration = 15 + Math.random() * 25;
            const delay = Math.random() * -20;
            const content = Array.from({ length: 50 }).map(() => 
                Math.random() > 0.5 ? '1' : '0'
            ).join('\n');
            
            return { left, duration, delay, content, id: i };
        });
    }, []);

    const technicalPhrases = useMemo(() => {
        const phrases = [
            "GET /api/v1/kernel HTTP/1.1",
            "SYSTEM_BOOT_INIT...",
            "0x5F3759DF",
            "root@anahi_hq: ~#",
            "chmod +x portfolio.sh",
            "npm install --force",
            "git push origin master",
            "SSH_AUTH_SUCCESS",
            "ENCRYPTING_DATA...",
            "MEMORY_DUMP: 0x00FF",
        ];
        return Array.from({ length: 15 }).map((_, i) => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            phrase: phrases[Math.floor(Math.random() * phrases.length)],
            opacity: 0.05 + Math.random() * 0.1,
            delay: Math.random() * -10,
            id: i
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-[-1] opacity-40">
            {/* Binary Rain Columns */}
            {columns.map(col => (
                <div 
                    key={col.id}
                    className="absolute top-0 font-mono text-[10px] text-[var(--primary)] opacity-[0.15] whitespace-pre leading-none animate-matrix-fall"
                    style={{ 
                        left: `${col.left}%`, 
                        animationDuration: `${col.duration}s`,
                        animationDelay: `${col.delay}s`,
                    }}
                >
                    {col.content}
                </div>
            ))}

            {/* Static/Floating Tech Phrases */}
            {technicalPhrases.map(tp => (
                <div 
                    key={tp.id}
                    className="absolute font-mono text-[8px] md:text-[10px] text-[var(--primary)] uppercase tracking-widest animate-pulse"
                    style={{ 
                        top: `${tp.top}%`, 
                        left: `${tp.left}%`,
                        opacity: tp.opacity,
                        animationDelay: `${tp.delay}s`
                    }}
                >
                    {tp.phrase}
                </div>
            ))}

            {/* Circuit Line SVGs */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100h200l50 50h300l50-50h400" fill="none" stroke="var(--primary)" strokeWidth="1" />
                <path d="M0 400h100l25 25h150l25-25h200" fill="none" stroke="var(--secondary)" strokeWidth="1" />
                <path d="M800 0v200l-50 50v300l50 50v400" fill="none" stroke="var(--primary)" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default HackerBackground;
