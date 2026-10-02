import { useState } from "react";
import { ArrowLeft, Check, Copy, Download, ExternalLink, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { CONTACT_CONFIG } from "../../config";
import { certificates } from "../dataprojetcts/certificates";
import { skillSections } from "../dataprojetcts/skills";
import { useOs } from "./shared";

// Apps de contenido: lo mismo que cuenta la página normal, en ventanas.

const H = "os-display text-[22px] font-semibold leading-tight";
const ext = { target: "_blank", rel: "noopener noreferrer" };

export const About = () => {
    const { t } = useOs();
    return (
        <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-4">
                <div>
                    <h2 className="os-display text-[28px] font-semibold leading-tight">Anahí Lozano</h2>
                    <p className="os-accent font-semibold">{t.role}</p>
                </div>
                {t.about.map((p, i) => <p key={i} className={`leading-relaxed ${i === 0 ? "text-[15px] font-medium" : "os-muted"}`}>{p}</p>)}
            </div>
            <div className="space-y-3">
                <dl className="os-card divide-y divide-[var(--os-border)] px-4">
                    {t.facts.map(([k, v]) => (
                        <div key={k} className="py-2.5">
                            <dt className="os-label">{k}</dt>
                            <dd className="font-semibold">{v}</dd>
                        </div>
                    ))}
                </dl>
                {t.traits.map(tr => (
                    <div key={tr.t} className="os-card p-3.5">
                        <p className="flex items-center gap-2 font-semibold"><Sparkles size={15} className="os-accent" />{tr.t}</p>
                        <p className="os-muted mt-0.5 text-[13px]">{tr.d}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Experience = () => {
    const { L, t, jobs } = useOs();
    return (
        <div className="p-6">
            <ol className="relative space-y-5 border-l border-[var(--os-border)] pl-6">
                {jobs.map(job => (
                    <li key={job.company} className="relative">
                        <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--os-surface)]" style={{ background: job.current ? "var(--os-accent)" : "var(--os-muted)" }} />
                        <div className="os-card p-5">
                            <div className="flex flex-wrap items-center gap-2">
                                {job.current && <span className="os-chip">● {t.now}</span>}
                                <span className="os-muted text-[12.5px] font-medium">{job.period[L]} · {job.place[L]}</span>
                            </div>
                            <h3 className={`${H} mt-2`}>{job.headline[L]}</h3>
                            <p className="mt-1 font-semibold">{job.role[L]} · <span className="os-accent">{job.company}</span></p>
                            <ul className="os-muted mt-3 space-y-1.5">
                                {job.bullets[L].map(b => <li key={b} className="flex gap-2.5 leading-relaxed"><span className="os-accent shrink-0">▸</span>{b}</li>)}
                            </ul>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {job.stack.map(x => <span key={x} className="os-chip">{x}</span>)}
                            </div>
                            {job.links.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {job.links.map(l => <a key={l.href} href={l.href} {...ext} className="os-btn">{l.label}<ExternalLink size={13} /></a>)}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export const Projects = () => {
    const { s, t, projects, projectSel, setProjectSel, award } = useOs();
    const sel = projects.find(p => p.name === projectSel);

    if (sel) return (
        <div className="p-6">
            <button onClick={() => setProjectSel(null)} className="os-btn"><ArrowLeft size={14} />{s.back}</button>
            {sel.img && <img src={sel.img} alt={sel.name} className="mt-4 max-h-[340px] w-full rounded-xl border border-[var(--os-border)] object-cover object-top" />}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <h2 className="os-display text-[28px] font-semibold leading-tight">{sel.name}</h2>
                {sel.badge && <span className="os-chip">● {sel.badge}</span>}
            </div>
            <p className="os-muted mt-2 max-w-[70ch] text-[15px] leading-relaxed">{sel.d}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{sel.tags.map(x => <span key={x} className="os-chip">{x}</span>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">
                {sel.href && <a href={sel.href} {...ext} className="os-btn os-btn-primary">{t.visit}<ExternalLink size={14} /></a>}
                {sel.code && <a href={sel.code} {...ext} className="os-btn"><FaGithub size={14} />{t.code}</a>}
            </div>
        </div>
    );

    return (
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(p => (
                <button key={p.name} onClick={() => { setProjectSel(p.name); award("project"); }} title={s.details}
                    className="os-card group flex flex-col overflow-hidden text-left transition-transform hover:-translate-y-1 hover:border-[var(--os-accent)]">
                    <div className="aspect-[16/9] w-full overflow-hidden" style={{ background: "color-mix(in srgb, var(--os-accent) 16%, var(--os-surface-2))" }}>
                        {p.img
                            ? <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                            : <span className="os-display os-accent flex h-full items-center justify-center text-[34px] font-semibold">{p.name.slice(0, 2)}</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="os-display text-[16px] font-semibold leading-snug">{p.name}</h3>
                            {p.badge && <span className="os-chip">● {p.badge}</span>}
                        </div>
                        <p className="os-muted mt-1 line-clamp-3 text-[13px] leading-relaxed">{p.d}</p>
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">{p.tags.slice(0, 3).map(x => <span key={x} className="os-chip">{x}</span>)}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export const Skills = () => {
    const { L } = useOs();
    return (
        <div className="space-y-5 p-6">
            {skillSections.map(sec => (
                <section key={sec.titleEn}>
                    <h3 className="os-label">{L === "es" ? sec.titleEs : sec.titleEn}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {sec.skills.map(k => (
                            <span key={k.name} className="os-card flex items-center gap-2 !rounded-xl px-3 py-2 text-[13px] font-semibold">
                                <k.icon size={16} className="os-accent" />{k.name}
                            </span>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export const Services = () => {
    const { t, whatsapp, award } = useOs();
    return (
        <div className="p-6">
            <div className="grid gap-3 sm:grid-cols-2">
                {t.services.map(x => (
                    <div key={x.n} className="os-card p-4">
                        <span className="os-accent text-[12px] font-bold">{x.n}</span>
                        <h3 className="os-display text-[17px] font-semibold leading-snug">{x.t}</h3>
                        <p className="os-muted mt-1 text-[13px] leading-relaxed">{x.d}</p>
                    </div>
                ))}
            </div>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                {t.process.map((p, i) => (
                    <li key={p} className="flex items-center gap-3 font-medium">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold" style={{ background: "var(--os-accent)", color: "var(--os-on-accent)" }}>{i + 1}</span>{p}
                    </li>
                ))}
            </ol>
            <a href={whatsapp} {...ext} onClick={() => award("contact")} className="os-btn os-btn-primary mt-6"><FaWhatsapp size={15} />{t.quote}</a>
        </div>
    );
};

export const Certs = () => {
    const { t } = useOs();
    return (
        <div className="divide-y divide-[var(--os-border)]">
            {certificates.map((c, i) => (
                <div key={c.title} className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5">
                    <div className="flex items-baseline gap-3">
                        <span className="os-accent w-5 shrink-0 text-[12px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                            <p className="font-semibold">{c.title}</p>
                            <p className="os-muted text-[12.5px]">{c.issuer} · {c.date}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 pl-8 sm:pl-0">
                        {c.file && <a href={c.file} {...ext} className="os-btn">{t.pdf}</a>}
                        {c.verify && <a href={c.verify} {...ext} className="os-btn os-btn-primary">{t.verify}<Check size={13} /></a>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const Resume = () => {
    const { s, cv, award } = useOs();
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-2 border-b border-[var(--os-border)] px-4 py-2.5">
                <a href={cv} download onClick={() => award("cv")} className="os-btn os-btn-primary"><Download size={14} />{s.download}</a>
                <a href={cv} {...ext} onClick={() => award("cv")} className="os-btn">{s.open}<ExternalLink size={13} /></a>
                <span className="os-muted text-[12.5px] sm:hidden">{s.pdfMobile}</span>
            </div>
            <iframe src={`${cv}#view=FitH`} title="CV" className="hidden min-h-0 flex-1 bg-white sm:block" />
        </div>
    );
};

const ContactLinks = () => {
    const { t, cv, whatsapp, award } = useOs();
    const links = [
        { l: "LinkedIn", h: CONTACT_CONFIG.linkedin, icon: FaLinkedin, id: "contact" },
        { l: "GitHub", h: "https://github.com/Alucarduwu", icon: FaGithub, id: "contact" },
        { l: "WhatsApp", h: whatsapp, icon: FaWhatsapp, id: "contact" },
        { l: t.ctaCv, h: cv, icon: Download, id: "cv" },
    ];
    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {links.map(x => (
                <a key={x.l} href={x.h} {...ext} onClick={() => award(x.id)} className="os-btn !justify-between !py-3">
                    <span className="flex items-center gap-2"><x.icon size={16} className="os-accent" />{x.l}</span><ExternalLink size={13} className="os-muted" />
                </a>
            ))}
        </div>
    );
};

const MailRow = () => {
    const { t, mail, award } = useOs();
    const [copied, setCopied] = useState(false);
    const copyMail = async () => {
        try { await navigator.clipboard.writeText(CONTACT_CONFIG.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* sin permiso de portapapeles */ }
    };
    return (
        <div className="flex flex-wrap items-center gap-2.5">
            <a href={mail} onClick={() => award("contact")} className="os-display os-accent break-all text-[20px] font-semibold hover:underline">{CONTACT_CONFIG.email}</a>
            <button onClick={copyMail} className="os-btn">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? t.copied : t.copy}</button>
        </div>
    );
};

export const Contact = () => {
    const { t } = useOs();
    return (
        <div className="space-y-5 p-6">
            <p className="os-muted text-[15px]">{t.contactLine}</p>
            <MailRow />
            <ContactLinks />
        </div>
    );
};

// Para quien tiene dos minutos: disponibilidad, cifras, stack y cómo escribirme.
export const Recruiter = () => {
    const { s, t, L, jobs } = useOs();
    const current = jobs.filter(j => j.current);
    const stack = [...new Set(current.flatMap(j => j.stack))].slice(0, 12);
    return (
        <div className="space-y-5 p-6">
            <div>
                <span className="os-chip">● {t.available}</span>
                <h2 className="os-display mt-2 text-[28px] font-semibold leading-tight">Anahí Lozano · {t.role}</h2>
                <p className="os-muted mt-1 text-[15px]">{t.heroLine}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{t.chips.map(c => <span key={c} className="os-chip">{c}</span>)}</div>
            </div>
            <div>
                <h3 className="os-label">{s.quick}</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {t.numbers.map(([n, l]) => (
                        <div key={l} className="os-card p-3">
                            <p className="os-display os-accent text-[22px] font-semibold leading-none">{n}</p>
                            <p className="os-muted mt-1 text-[12px] leading-snug">{l}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="os-label">{s.whereNow}</h3>
                <ul className="mt-2 space-y-1.5">
                    {current.map(j => <li key={j.company}><span className="font-semibold">{j.company}</span> <span className="os-muted">· {j.role[L]} · {j.headline[L]}</span></li>)}
                </ul>
            </div>
            <div>
                <h3 className="os-label">{s.stack}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">{stack.map(x => <span key={x} className="os-chip">{x}</span>)}</div>
            </div>
            <div>
                <h3 className="os-label">{s.reach}</h3>
                <div className="mt-2 space-y-3"><MailRow /><ContactLinks /></div>
            </div>
        </div>
    );
};
