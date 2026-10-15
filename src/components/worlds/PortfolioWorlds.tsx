import { useState } from "react";
import { CONTACT_CONFIG } from "../../config";
import { projects } from "../dataprojetcts/projects";
import "./worlds.css";
import SpacePortfolio from "./SpacePortfolio";

type Mode = "metro" | "space";
const featured = projects.slice(0, 5);
const mail = `mailto:${CONTACT_CONFIG.email}`;

function WorldNav({ mode }: { mode: Mode }) {
  return <nav className="world-nav" aria-label="Versiones del portafolio">
    <a href="/">← Portafolio original</a><span>ANAHÍ / MULTIVERSO</span>
    <a href={`/?world=${mode === "metro" ? "space" : "metro"}`}>{mode === "metro" ? "Ir al espacio ↗" : "Viajar a los 2000 ↗"}</a>
  </nav>;
}

function ProjectLinks({ project }: { project: typeof projects[number] }) {
  return <div className="world-links">{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Ver proyecto ↗</a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">Código ↗</a>}</div>;
}

function Metro() {
  const [selected, setSelected] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [skin, setSkin] = useState("pink");
  const [liked, setLiked] = useState(false);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [signed, setSigned] = useState(false);
  const [entries, setEntries] = useState<{ name: string; note: string }[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("anahi_metro_guestbook") || "[]");
      return Array.isArray(saved) ? saved.filter((e): e is { name: string; note: string } => e && typeof e.name === "string" && typeof e.note === "string").slice(0, 12) : [];
    } catch { return []; }
  });
  const project = featured[selected];
  const selectProject = (index: number) => { setSelected(index); setPhoto(0); setLiked(false); };
  return <div className={`world metro metro-${skin}`}><WorldNav mode="metro" />
    <div className="metro-shell">
      <div className="metro-service-bar"><a className="metro-logo" href="/?world=metro">anahí<span>FLOG</span><small>tu dosis diaria de código.</small></a><div><a href="#metro-perfil">Mi perfil</a><a href="#metro-proyectos">Mis fotos</a><a href="#metro-firmas">Firmar</a><a href={mail}>Enviar MP</a></div></div>
      <div className="metro-address"><span>Estás en:</span> anahíFLOG / <b>xX_Anahí_Lozano_Xx</b><span className="metro-online">● online</span></div>
      <header className="metro-banner"><div className="metro-deco metro-deco-left" aria-hidden="true">★<span>✧</span>♡</div><div><p>ღ el pequeño mundo de una dev ღ</p><h1>xX_Anahí_Xx</h1><p className="metro-banner-tag">código en las manos · estrellas en la cabeza</p><div className="metro-banner-badges"><span>FULL STACK GIRL</span><span>♡ MX ♡</span><span>EST. 2016</span></div></div><div className="metro-deco metro-deco-right" aria-hidden="true">♡<span>✧</span>★</div></header>
      <div className="metro-ticker"><span>★ holaaa! bienvenid@ a mi flog ♥ pasa, mira mis proyectos y deja tu firmita! ★ gracias x pasar ★</span></div>
      <div className="metro-menu"><a href="#metro-foto">Mi metro</a><a href="#metro-proyectos">Fotos anteriores</a><a href="#metro-favoritos">Favoritos</a><a href="#metro-firmas">Libro de visitas</a></div>
      <div className="metro-layout">
        <aside className="metro-sidebar">
          <section className="metro-box" id="metro-perfil"><h2>Acerca de mí</h2><div className="metro-avatar" aria-label="Avatar tipográfico de Anahí"><span className="metro-avatar-star">★</span><b>A</b><span>♡</span><small>just a girl who codes</small></div><h3>ღ Anahí Lozano ღ</h3><p className="metro-status">● Disponible para proyectos</p><dl className="metro-profile-data"><dt>De:</dt><dd>Aguascalientes, MX</dd><dt>Ocupación:</dt><dd>Full Stack Developer</dd><dt>Desde:</dt><dd>Programando en 2016</dd></dl><p className="metro-bio">Ingeniera en TIC. Me gusta hacer cosas bonitas que también funcionan.<br /><br />Videojuegos + anime + café + código = yo ♡</p><a href="/Anahi_Lozano_CV_2026.pdf" target="_blank" rel="noopener noreferrer">» Descargar mi CV</a></section>
          <section className="metro-box" id="metro-favoritos"><h2>Amigos / favoritos</h2><a href="https://github.com/Alucarduwu" target="_blank" rel="noopener noreferrer">♡ Alucarduwu / GitHub</a><a href={CONTACT_CONFIG.linkedin} target="_blank" rel="noopener noreferrer">♡ Mi LinkedIn</a><a href="https://booskha.com/home" target="_blank" rel="noopener noreferrer">♡ Booskha.com</a><a href="https://voraa.io/restaurantes/" target="_blank" rel="noopener noreferrer">♡ Voraa.io</a><a href={mail}>✉ Envíame un MP</a></section>
          <div className="metro-sticker">i ♥ coding<small>hecho con amor & café</small></div><div className="metro-blinkie">★ UNDER CONSTRUCTION ★<small>siempre creando algo nuevo</small></div>
        </aside>
        <main className="metro-feed">
          <section className="metro-box metro-post" id="metro-foto"><h2><span>Mi foto / entrada {String(selected + 1).padStart(2, "0")}</span><span>♥ {photo + 1} de {project.images.length}</span></h2><div className="metro-photo-heading"><p>ღ {project.titleEs.split(" · ")[0]} ღ</p><span>por xX_Anahí_Xx · álbum de proyectos</span></div><div className="metro-photo"><img src={project.images[photo]} alt={`Captura ${photo + 1} de ${project.titleEs}`} /><div className="metro-photo-stamp">xX_Anahí_Xx ♡</div></div><div className="metro-photo-controls"><button onClick={() => setPhoto((photo - 1 + project.images.length) % project.images.length)} aria-label="Foto anterior">« anterior</button><span>foto {photo + 1} / {project.images.length}</span><button onClick={() => setPhoto((photo + 1) % project.images.length)} aria-label="Foto siguiente">siguiente »</button></div><div className="metro-post-copy"><p className="metro-date">♫ mood: orgullosa de lo que construyo :')</p><h3>{project.titleEs}</h3><p>{project.descriptionEs}</p><p className="metro-post-sign">Gracias x pasar! deja tu firma abajo ↓<br />·.·★ un poquito de mí en cada línea de código ★·.·</p><ProjectLinks project={project} /><button className="metro-button" aria-pressed={liked} onClick={() => setLiked(!liked)}>{liked ? "♥ Agregado a tus favoritos" : "♡ Agregar a favoritos"}</button><a className="metro-sign-link" href="#metro-firmas">[ firmar este metro ]</a></div></section>
          <section className="metro-box" id="metro-firmas"><h2><span>Libro de visitas</span><span>{entries.length} firmas ♡</span></h2><div className="metro-guestbook-intro"><b>·.· Tu firmita hace bonito mi flog ·.·</b><p>Pasa y saluda, no seas fantasmita! (づ｡◕‿‿◕｡)づ</p></div><p className="metro-local">Tus firmas quedan guardadas en este navegador.</p>{entries.length === 0 && <div className="metro-empty"><span>✎</span><p>Este espacio espera tu primera firma.<br /><b>¿Me estrenas el libro? ♡</b></p></div>}{entries.map((e, i) => <blockquote key={i}><div className="metro-sign-avatar" aria-hidden="true">{e.name.slice(0, 1).toUpperCase()}</div><div><b>{e.name}</b><small> pasó por aquí y dejó su firma:</small><p>{e.note}</p></div></blockquote>)}<form onSubmit={e => { e.preventDefault(); if (!name.trim() || !note.trim()) return; const next = [{ name: name.trim(), note: note.trim() }, ...entries].slice(0, 12); setEntries(next); try { localStorage.setItem("anahi_metro_guestbook", JSON.stringify(next)); } catch { /* Session still works without storage. */ } setNote(""); setSigned(true); }}><label>Nombre / apodo<input value={name} maxLength={40} onChange={e => setName(e.target.value)} required placeholder="xX_tu_nombre_Xx" /></label><label>Firma<textarea value={note} maxLength={400} onChange={e => { setNote(e.target.value); setSigned(false); }} required placeholder="holaaa! pasé a dejarte mi firmita ♥" /></label><div className="metro-form-footer"><button className="metro-button" type="submit">Enviar firma ♥</button><span>{note.length}/400</span></div><span role="status">{signed ? "¡Gracias por tu firmita! ♡" : ""}</span></form></section>
        </main>
        <aside className="metro-rightbar"><section className="metro-box" id="metro-proyectos"><h2>Últimas fotos</h2><div className="metro-albums">{featured.map((p, i) => <button key={p.titleEs} onClick={() => selectProject(i)} aria-pressed={selected === i}><img src={p.images[0]} alt="" /><span><small>ENTRADA 0{i + 1}</small>{p.titleEs.split(" · ")[0]}</span></button>)}</div></section><section className="metro-box"><h2>Personaliza mi metro</h2><p>¿De qué color ves el mundo?</p><div className="metro-skins" role="group" aria-label="Color del fotolog">{["pink", "purple", "blue"].map(s => <button key={s} className={`metro-swatch metro-swatch-${s}`} onClick={() => setSkin(s)} aria-label={{ pink: "Rosa", purple: "Violeta", blue: "Azul" }[s]} aria-pressed={skin === s}>♥</button>)}</div></section><div className="metro-note"><span>♡</span><p>no olvides<br /><b>dejar tu huellita</b></p><a href="#metro-firmas">firmar »</a></div><div className="metro-mini-badges"><span>CSS IS MY SUPERPOWER</span><span>★ ANIME & CODE ★</span><span>MADE IN MÉXICO ♡</span></div></aside>
      </div><footer><div className="metro-footer-logo">anahí<span>FLOG</span></div><p>♥ Este metro está hecho con código, café y nostalgia ♥</p><p>Portafolio de Anahí Lozano · edición 2000s · <a href="/">volver al presente</a></p><small>Diseño inspirado en los fotologs de los 2000.</small></footer>
    </div>
  </div>;
}

export default function PortfolioWorlds({ mode }: { mode: Mode }) { return mode === "metro" ? <Metro /> : <SpacePortfolio />; }
