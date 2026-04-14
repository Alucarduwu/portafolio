import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";

const PerspectiveSelector = () => {
  const { setPerspective } = useContext(GlobalContext);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = (choice: 'dev' | 'rh') => {
    setPerspective(choice);
  };

  const options = [
    {
      id: 'rh',
      title: 'VISTA EJECUTIVA',
      subtitle: 'RECURSOS HUMANOS / MANAGERS',
      desc: 'Una experiencia limpia, profesional y enfocada en impacto de negocio y logros clave.',
      icon: 'business_center',
      gradient: 'from-blue-500/20 to-purple-500/20',
      border: 'border-purple-500/30',
      hoverBorder: 'border-purple-500',
      glow: 'shadow-[0_0_50px_rgba(168,85,247,0.15)]',
      label: 'RH'
    },
    {
      id: 'dev',
      title: 'CORE_ENGINE',
      subtitle: 'DEVELOPERS / TECH LEADERS',
      desc: 'Una inmersión técnica profunda en el stack, arquitectura y registros de ejecución.',
      icon: 'terminal',
      gradient: 'from-emerald-500/20 to-cyan-500/20',
      border: 'border-emerald-500/30',
      hoverBorder: 'border-emerald-500',
      glow: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]',
      label: 'DEV'
    }
  ];

  return (
    <div className="fixed inset-0 z-[99999] p-6 py-12 md:p-12 bg-[#050507] notranslate overflow-y-auto overflow-x-hidden flex items-start sm:items-center justify-center" translate="no">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-6xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
             <span className="text-[10px] font-black tracking-[0.5em] text-purple-400 uppercase">Bienvenida</span>
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none break-words max-w-full">
            HOLA :) SOY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 block sm:inline mt-2 sm:mt-0">ANAHÍ LOZANO</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Soy desarrolladora Fullstack. ¿Qué experiencia de usuario necesitas hoy?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {options.map((opt, idx) => (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              onMouseEnter={() => setHovered(opt.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(opt.id as 'dev' | 'rh')}
              className={`
                relative group cursor-pointer p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 bg-white/[0.03] backdrop-blur-2xl
                transition-all duration-500 flex flex-col items-center text-center space-y-5 md:space-y-6
                ${opt.border} ${hovered === opt.id ? `${opt.hoverBorder} ${opt.glow} scale-[1.02]` : ''}
              `}
            >
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black tracking-widest border transition-colors duration-500 notranslate whitespace-nowrap ${hovered === opt.id ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-800'}`} translate="no">
                {opt.label}
              </div>

              <div className={`
                w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl
                bg-gradient-to-br ${opt.gradient} border border-white/10
                group-hover:scale-110 group-hover:rotate-6
              `}>
                <span className="material-symbols-outlined text-4xl text-white opacity-80 group-hover:opacity-100">
                  {opt.icon}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white italic tracking-tight uppercase leading-none">
                  {opt.title}
                </h2>
                <p className="text-[10px] font-black tracking-[0.3em] text-purple-400/80">
                  {opt.subtitle}
                </p>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                {opt.desc}
              </p>

              <div className="pt-4">
                <div className={`
                  px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300
                  ${hovered === opt.id ? 'bg-white text-black scale-105' : 'bg-white/5 text-gray-500 border border-white/10'}
                `}>
                  INGRESAR {">"}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 transition-all duration-500 opacity-20 ${hovered === opt.id ? 'border-white opacity-40 scale-110' : 'border-gray-600'}`}></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-[9px] font-black tracking-[0.4em] text-gray-600 uppercase"
        >
          ANAHI_LOZANO // SYSTEM_VERSION_6.4.2
        </motion.div>
      </div>
    </div>
  );
};

export default PerspectiveSelector;
