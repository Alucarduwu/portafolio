import React, { useState, useRef, useCallback, memo } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

interface TechItem {
  name: string;
  icon?: string;
}

interface TechOrbitalProps {
  title: string;
  items: TechItem[];
  icon: string;
}

interface TechItemNodeProps {
  item: TechItem;
  index: number;
  total: number;
  isActive: boolean;
  onHover: (name: string) => void;
  onLeave: () => void;
  radius: number;
}

const TechItemNode = memo(({ item, index, total, isActive, onHover, onLeave, radius }: TechItemNodeProps) => {
  const [hasFailed, setHasFailed] = useState(false);
  
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const techId = item.name.toLowerCase().trim().replace(/ /g, '').replace(/\.js/g, 'dotjs').replace(/\#/g, 'sharp');
  const isMobile = radius < 100;

  return (
    <motion.div
      style={{
          position: 'absolute',
          x: x,
          y: y,
          zIndex: isActive ? 100 : 5,
      }}
      className="pointer-events-auto touch-pan-y"
    >
        <div 
            className="w-14 h-14 -ml-7 -mt-7 cursor-pointer relative"
            onMouseEnter={() => onHover(item.name)}
            onMouseLeave={onLeave}
            onClick={(e) => {
                e.stopPropagation();
                onHover(item.name);
            }}
        >
            <motion.div
                animate={{ 
                    scale: isActive ? (isMobile ? 1.3 : 1.8) : 1,
                    y: isActive ? (isMobile ? -10 : -30) : 0,
                    rotate: isActive ? -5 : 0 
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-full h-full rounded-xl border flex items-center justify-center transition-all duration-500 relative overflow-hidden ${isActive ? 'bg-[var(--bg-card)] border-[var(--primary)] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_var(--primary-glow)]' : 'bg-[var(--bg-ui)]/20 border-[var(--border)]'}`}
            >
                {!hasFailed ? (
                    <img 
                        src={`https://cdn.simpleicons.org/${techId}`} 
                        alt={item.name}
                        loading="lazy"
                        className={`w-[60%] h-[60%] object-contain transition-all duration-500 ${isActive ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-50 contrast-125'}`}
                        style={{
                            filter: isActive ? 'none' : 'grayscale(1) brightness(0.8)'
                        }}
                        onError={() => setHasFailed(true)}
                    />
                ) : (
                    <span className="text-[10px] font-black font-mono text-[var(--primary)] opacity-60">
                        {item.name.substring(0, 2).toUpperCase()}
                    </span>
                )}

                {isActive && (
                    <motion.div 
                        initial={{ top: -100 }}
                        animate={{ top: 100 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/10 to-transparent w-full h-1/2"
                    />
                )}
            </motion.div>
        </div>
    </motion.div>
  );
});

const TechOrbital: React.FC<TechOrbitalProps> = ({ title, items, icon }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [radius, setRadius] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 125);

  React.useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 90 : 125);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Hyper-responsive springs
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (radius < 100) return; // Disable expensive tracking on mobile bounds
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredTech(null);
  };

  const handleHover = useCallback((name: string) => setHoveredTech(name), []);
  const handleItemLeave = useCallback(() => setHoveredTech(null), []);

  const activeTech = hoveredTech; 

  return (
    <div 
        className="premium-card hacker-brackets p-6 bg-[var(--bg-card)] border-t-2 border-t-[var(--primary)] overflow-hidden flex flex-col h-[420px] relative group/orbital"
        onMouseLeave={handleMouseLeave}
        onClick={() => setHoveredTech(null)}
    >
      {/* Background Decorative Icon */}
      <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.03] pointer-events-none group-hover/orbital:scale-110 transition-transform duration-1000">
        <span className="material-symbols-outlined text-[12rem] text-[var(--primary)]">{icon}</span>
      </div>

      {/* NEW: Background Scanning Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Radar Pulse */}
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[var(--primary)]/30 rounded-full"
          />
          
          {/* Scanning Beam (Vertical) */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent z-0"
          />

          {/* Grid coordinates */}
          <div className="absolute top-2 right-4 font-mono text-[8px] text-[var(--primary)] opacity-40 text-right uppercase">
             SYS_TRACKING_ON<br/>
             [{title.replace(/ /g, '_')}]
          </div>
      </div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--primary)] text-2xl animate-pulse">{icon}</span>
            <div className="flex flex-col">
                <span className="system-label text-[7px] opacity-40 leading-none">SECTOR_ID</span>
                <span className="system-label text-[8px] opacity-80 tracking-widest">{title.replace(/ /g, '_').toUpperCase()}</span>
            </div>
        </div>
        <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-ping opacity-20"></div>
      </div>
      
      <div className="flex flex-col mb-4 relative z-10">
        <h3 className="text-xl font-black text-[var(--text-main)] uppercase italic font-mono tracking-tighter leading-tight">{title}</h3>
        <div className="h-6 flex items-center">
            <AnimatePresence mode="wait">
                {activeTech && (
                    <motion.div 
                        key={activeTech}
                        initial={{ opacity: 0, x: -20, skewX: 20 }}
                        animate={{ opacity: 1, x: 0, skewX: -10 }}
                        exit={{ opacity: 0, x: 20, skewX: 20 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-[var(--primary)] font-mono font-black text-xs tracking-[0.3em] uppercase italic bg-[var(--primary)]/10 px-3 py-0.5 rounded-sm border-l-2 border-[var(--primary)] shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                            {activeTech}
                        </span>
                        <motion.span 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="h-px w-12 bg-gradient-to-r from-[var(--primary)] to-transparent origin-left"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="orbital-container flex-grow cursor-crosshair relative flex items-center justify-center p-12 touch-pan-y"
      >
        <motion.div 
          style={{ x: springX, y: springY }}
          className="orbital-center relative z-20"
        >
          <div className="w-16 h-16 rounded-full border-2 border-[var(--primary)]/20 flex items-center justify-center p-2 backdrop-blur-sm bg-[var(--primary)]/5">
              <span className="material-symbols-outlined text-3xl text-[var(--primary)] opacity-80">{icon}</span>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full border border-dashed border-[var(--primary)]/40 opacity-20"
          />
        </motion.div>

        {items.map((item, index) => (
          <TechItemNode
            key={item.name}
            item={item}
            index={index}
            total={items.length}
            isActive={hoveredTech === item.name}
            onHover={handleHover}
            onLeave={handleItemLeave}
            radius={radius}
          />
        ))}
      </div>
    </div>
  );
};

export default TechOrbital;
