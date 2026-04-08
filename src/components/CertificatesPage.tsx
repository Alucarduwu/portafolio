import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  idCode: string;
  file: string;
  featured: boolean;
};

const sections: { key: string; labelEs: string; labelEn: string; icon: string; certs: Certificate[] }[] = [
  {
    key: "web",
    labelEs: "DESARROLLO WEB",
    labelEn: "WEB DEVELOPMENT",
    icon: "public",
    certs: [
      { title: "React", issuer: "Coursera", date: "Nov 2024", idCode: "COURSERA-RE-24", file: "/certificates/React.pdf", featured: true },
      { title: "Django Web Development", issuer: "Coursera", date: "Sep 2024", idCode: "COURSERA-DJ-24", file: "/certificates/Coursera CQPLODRRH46E Django.pdf", featured: false },
    ],
  },
  {
    key: "data",
    labelEs: "DATOS & INTELIGENCIA",
    labelEn: "DATA & INTELLIGENCE",
    icon: "database",
    certs: [
      { title: "Introduction to Data Science", issuer: "Cisco", date: "Apr 2023", idCode: "CISCO-DS-23", file: "/certificates/Introduction_to_Data_Science_certificate_19151741-aguascalientes-tecnm-mx_de68b3fa-be3b-4752-a93f-0c740c54911d.pdf", featured: false },
      { title: "Business Intelligence", issuer: "Instituto Tecnológico de Aguascalientes", date: "Feb 2025", idCode: "ITA-BI-2025", file: "/certificates/Anahi Betzabe Lozano de Lira business intelligence.pdf", featured: true },
    ],
  },
  {
    key: "redes",
    labelEs: "REDES & SEGURIDAD",
    labelEn: "NETWORKING & SECURITY",
    icon: "hub",
    certs: [
      { title: "NDG Linux Unhatched", issuer: "Cisco / NDG", date: "Jun 2023", idCode: "NDG-LX-2023", file: "/certificates/Partner-_NDG_Linux_Unhatched_certificate_19151741-aguascalientes-tecnm-mx_8c79be28-11fe-43bb-a2a9-d21cf793125b.pdf", featured: true },
      { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "Mar 2023", idCode: "CISCO-SEC-23", file: "/certificates/Introduction_to_Cybersecurity_certificate_19151741-aguascalientes-tecnm-mx_c56e9699-3501-4f5a-9be9-fc9cdab22920.pdf", featured: false },
      { title: "CCNA Switching, Routing and Wireless Essentials", issuer: "Cisco", date: "Aug 2024", idCode: "CSCO-CCNA-SRW-24", file: "/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_19151741-aguascalientes-tecnm-mx_8707393e-832a-4d15-97da-55bdb2202398.pdf", featured: true },
      { title: "CCNA Enterprise Networking, Security and Automation", issuer: "Cisco", date: "Dec 2024", idCode: "CSCO-CCNA-EN-24", file: "/certificates/CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_19151741-aguascalientes-tecnm-mx_e8fb72a0-45fc-4ca1-83c8-09c232760c6d.pdf", featured: true },
    ],
  },
  {
    key: "sap",
    labelEs: "SAP & ENTERPRISE",
    labelEn: "SAP & ENTERPRISE",
    icon: "corporate_fare",
    certs: [
      { title: "Learn SAP ABAP Fundamentals and Core Programming Concepts", issuer: "Board Infinity", date: "Apr 2026", idCode: "61KNUO38PPT3", file: "#", featured: true },
      { title: "Software Development on SAP HANA", issuer: "SkillUp / Coursera", date: "Mar 2026", idCode: "CQVWE7LWLIHQ", file: "https://coursera.org/verify/CQVWE7LWLIHQ", featured: true },
    ],
  },
];

const CertificatesPage = () => {
    const { t, lang } = useContext(GlobalContext);

    const allCerts = sections.flatMap(s => s.certs);
    const activeSections = sections.filter(s => s.certs.length > 0);

    return (
        <main className="section-container space-y-10 pt-4 md:pt-8 pb-20 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 border-b border-[var(--border)] pb-8 text-center md:text-left">
                <div className="space-y-3 notranslate" translate="no">
                    <div className="system-label text-[var(--primary)] text-[8px] tracking-[0.2em] justify-center md:justify-start"><span>{t('cert_vault')}</span></div>
                    <h1 className="font-extrabold text-[var(--text-main)] uppercase leading-none italic shadow-sm">
                        <span>{t('certs_title')}</span>
                    </h1>
                </div>
                <span className="font-mono text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-50 text-center md:text-right">
                    {allCerts.length} {t('cert_creds')}
                </span>
            </div>

            {activeSections.map(section => (
                <div key={section.key} className="space-y-5">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[16px] md:text-[18px] text-[var(--primary)] opacity-70">{section.icon}</span>
                        <span className="font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--primary)] opacity-80">
                            {lang === 'es' ? section.labelEs : section.labelEn}
                        </span>
                        <div className="flex-1 h-px bg-[var(--border)]"></div>
                        <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-widest opacity-40">{section.certs.length}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {section.certs.map((c, index) => (
                            <div key={index} className="premium-card flex flex-col group transition-all duration-300 bg-[var(--bg-card)] shadow-[var(--shadow)] overflow-hidden">
                                <div className="terminal-header bg-[var(--bg-ui)] py-3 px-4 flex justify-between items-center border-b border-[var(--border)]">
                                    <div className="flex gap-1.5 md:gap-2">
                                        <div className="dot dot-red"></div>
                                        <div className="dot dot-yellow"></div>
                                        <div className="dot dot-green"></div>
                                    </div>
                                    <span className="system-label text-[7px] md:text-[8px] opacity-40">REC_{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                <div className="p-5 space-y-4 flex-grow flex flex-col relative bg-gradient-to-br from-transparent to-[var(--bg-ui)]/5">
                                    <div className="flex justify-between items-center notranslate" translate="no">
                                        <span className="material-symbols-outlined text-2xl text-[var(--primary)] group-hover:scale-110 transition-transform">
                                            {c.featured ? 'workspace_premium' : 'verified'}
                                        </span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full font-mono ${
                                            c.featured
                                            ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
                                            : 'bg-[var(--bg-ui)] text-[var(--text-muted)] border border-[var(--border)]'
                                        }`}>
                                            <span>{c.featured ? '★ FEATURED' : 'STANDARD'}</span>
                                        </span>
                                    </div>

                                    <h3 className="text-base md:text-lg font-black text-[var(--text-main)] uppercase tracking-tight group-hover:text-[var(--primary)] transition-colors italic leading-tight">
                                        {c.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 notranslate" translate="no">
                                        <div>
                                            <div className="system-label text-[7px] opacity-50 mb-1 justify-center md:justify-start"><span>ISSUER</span></div>
                                            <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tight"><span>{c.issuer}</span></div>
                                        </div>
                                        <div>
                                            <div className="system-label text-[7px] opacity-50 mb-1 justify-center md:justify-start"><span>ID</span></div>
                                            <div className="text-[8px] md:text-[9px] font-mono text-[var(--text-muted)] tracking-tight truncate"><span>{c.idCode}</span></div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-[var(--border)]/40 flex justify-between items-center bg-transparent">
                                        <div>
                                            <div className="system-label text-[7px] opacity-50 mb-0.5 justify-center md:justify-start">{t('cert_issued')}</div>
                                            <div className="text-[11px] font-black text-[var(--text-primary)] tracking-wide">{c.date}</div>
                                        </div>
                                        <a
                                            href={c.file}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-[9px] font-black uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-lg"
                                        >
                                            {t('cert_view')} <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="pt-10 flex justify-center opacity-10">
                <div className="h-px w-48 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
            </div>
        </main>
    );
};

export default CertificatesPage;
