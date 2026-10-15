import { destinations } from "./spaceDestinations";
import { projects } from "../dataprojetcts/projects";

const missionProjects=[projects[0],projects[2],projects[1]];
export default function SpaceExplorerHero({selected,onSelect}:{selected:number;onSelect:(index:number)=>void}) {
  const destination=selected>=0?destinations[selected]:null;
  return <section className="cosmos-hero cosmos-explorer" aria-label="Exploración interactiva del sistema de proyectos">
    <div className="cosmos-explorer-intro"><p className="cosmos-eyebrow"><i /> MISIÓN 2026 / SECTOR ANAHÍ</p><h1>Welcome to<br /><span>my universe.</span></h1><p>Ingeniera. Creadora. Exploradora.<br />Mi trabajo vive entre estos mundos.</p><span className="cosmos-explorer-hint">ARRASTRA PARA ORBITAR · SELECCIONA PARA EXPLORAR</span></div>
    <div className="cosmos-system-readout" aria-hidden="true"><span>DEEP SPACE NETWORK</span><b>SECTOR 2026 / SISTEMA ONLINE</b><span>ORIGIN: AGUASCALIENTES, MX</span><i /><span>3 DESTINOS · 2 SEÑALES DESCONOCIDAS</span></div>
    <div className="cosmos-navigation"><div className="cosmos-navigation-heading"><span>⌖ CARTA ESTELAR</span><span>01—03</span></div>{destinations.map((d,i)=><button key={d.name} onClick={()=>onSelect(selected===i?-1:i)} aria-pressed={selected===i}><span className="cosmos-nav-planet" style={{background:`radial-gradient(circle at 25% 25%, ${d.color}, #090d19 85%)`}} /><span><b>{d.name}</b><small>{d.type}</small></span><span>0{i+1} ↗</span></button>)}<a href="#cosmos-work">Ver todas las misiones <span>↓</span></a></div>
    {destination ? <article className="cosmos-mission-panel" key={destination.name}><div className="cosmos-mission-heading"><span>DESTINO ADQUIRIDO / 0{selected+1}</span><button onClick={()=>onSelect(-1)} aria-label="Cerrar misión y volver al sistema">×</button></div><h2>{destination.name}</h2><p>{missionProjects[selected].descriptionEs}</p><div className="cosmos-mission-tech">{missionProjects[selected].stack.split(" • ").slice(0,3).map(t=><span key={t}>{t}</span>)}</div><a href={destination.href}>Abrir misión <span>↗</span></a></article>:<div className="cosmos-explorer-note"><span>∞</span><p>No estás viendo el espacio.<br /><b>Estás dentro.</b></p><small>Encuentra a la astronauta y al visitante desconocido.</small></div>}
    <a className="cosmos-explorer-scroll" href="#cosmos-work">BITÁCORA DE PROYECTOS <span>↓</span></a>
  </section>;
}
