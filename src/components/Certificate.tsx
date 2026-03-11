import { motion, type Variants } from "framer-motion";
import {
  Award,
  ExternalLink,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  BookOpen,
  BadgeCheck,
  Network,
  Database,
  Code2,
  ServerCog,
  Laptop2,
} from "lucide-react";
import type { Language } from "../App";

interface CertificatesProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const certificates = [
  {
    title: "NDG Linux Unhatched",
    issuer: "Cisco / NDG",
    date: "2024",
    file: "/certificates/Partner-_NDG_Linux_Unhatched_certificate_19151741-aguascalientes-tecnm-mx_8c79be28-11fe-43bb-a2a9-d21cf793125b.pdf",
    categoryEs: "Linux / Sistemas",
    categoryEn: "Linux / Systems",
    descriptionEs:
      "Fundamentos de Linux, navegación en terminal, estructura de archivos y bases para administración del sistema.",
    descriptionEn:
      "Linux fundamentals, terminal navigation, file structure and system administration basics.",
    featured: true,
  },
  {
    title: "React",
    issuer: "Coursera",
    date: "2024",
    file: "/certificates/React.pdf",
    categoryEs: "Frontend",
    categoryEn: "Frontend",
    descriptionEs:
      "Bases de React para construcción de interfaces, componentes reutilizables, props, estado y estructura visual.",
    descriptionEn:
      "React foundations for interface building, reusable components, props, state and visual structure.",
    featured: true,
  },
  {
    title: "Django Web Development",
    issuer: "Coursera",
    date: "2024",
    file: "/certificates/Coursera CQPLODRRH46E Django.pdf",
    categoryEs: "Backend",
    categoryEn: "Backend",
    descriptionEs:
      "Desarrollo web backend con Django, estructura de aplicaciones, rutas, lógica y organización del proyecto.",
    descriptionEn:
      "Backend web development with Django, app structure, routing, logic and project organization.",
    featured: false,
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2024",
    file: "/certificates/Introduction_to_Cybersecurity_certificate_19151741-aguascalientes-tecnm-mx_c56e9699-3501-4f5a-9be9-fc9cdab22920.pdf",
    categoryEs: "Ciberseguridad",
    categoryEn: "Cybersecurity",
    descriptionEs:
      "Conceptos base de ciberseguridad, riesgos digitales, protección de sistemas y fundamentos de seguridad informática.",
    descriptionEn:
      "Core cybersecurity concepts, digital risks, system protection and information security fundamentals.",
    featured: false,
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "2024",
    file: "/certificates/Introduction_to_Data_Science_certificate_19151741-aguascalientes-tecnm-mx_de68b3fa-be3b-4752-a93f-0c740c54911d.pdf",
    categoryEs: "Data Science",
    categoryEn: "Data Science",
    descriptionEs:
      "Introducción a análisis de datos, pensamiento analítico y bases del trabajo con información para toma de decisiones.",
    descriptionEn:
      "Introduction to data analysis, analytical thinking and data fundamentals for decision-making.",
    featured: false,
  },
  {
    title: "CCNA Enterprise Networking, Security and Automation",
    issuer: "Cisco",
    date: "2024",
    file: "/certificates/CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_19151741-aguascalientes-tecnm-mx_e8fb72a0-45fc-4ca1-83c8-09c232760c6d.pdf",
    categoryEs: "Redes / Seguridad",
    categoryEn: "Networking / Security",
    descriptionEs:
      "Enfoque en redes empresariales, automatización, fundamentos de seguridad y operación de infraestructura moderna.",
    descriptionEn:
      "Focused on enterprise networking, automation, security fundamentals and modern infrastructure operations.",
    featured: true,
  },
  {
    title: "CCNA Switching, Routing and Wireless Essentials",
    issuer: "Cisco",
    date: "2024",
    file: "/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_19151741-aguascalientes-tecnm-mx_8707393e-832a-4d15-97da-55bdb2202398.pdf",
    categoryEs: "Redes",
    categoryEn: "Networking",
    descriptionEs:
      "Principios de switching, routing y redes inalámbricas, con enfoque en conectividad y arquitectura de red.",
    descriptionEn:
      "Switching, routing and wireless networking principles focused on connectivity and network architecture.",
    featured: true,
  },
  {
    title: "Network Security",
    issuer: "Cisco",
    date: "2024",
    file: "/certificates/_certificate_networksecurity.pdf",
    categoryEs: "Seguridad de Redes",
    categoryEn: "Network Security",
    descriptionEs:
      "Seguridad aplicada a redes, protección de tráfico, amenazas comunes y buenas prácticas de infraestructura segura.",
    descriptionEn:
      "Network-focused security, traffic protection, common threats and secure infrastructure best practices.",
    featured: false,
  },
  {
    title: "Business Intelligence",
    issuer: "Instituto Tecnológico de Aguascalientes",
    date: "2024",
    file: "/certificates/Anahi Betzabe Lozano de Lira business intelligence.pdf",
    categoryEs: "Business Intelligence",
    categoryEn: "Business Intelligence",
    descriptionEs:
      "Bases de inteligencia de negocios, análisis de información y apoyo a decisiones con enfoque empresarial.",
    descriptionEn:
      "Business intelligence foundations, information analysis and business-oriented decision support.",
    featured: false,
  },
];

const content = {
  es: {
    badge: "Certificados",
    title: "Certificaciones y formación complementaria",
    description:
      "Esta sección reúne cursos y certificaciones que fortalecen mi perfil técnico en frontend, backend, Linux, redes, ciberseguridad y análisis de datos.",
    panelTitle: "Achievements Archive",
    issuer: "Institución",
    date: "Fecha",
    category: "Categoría",
    view: "Ver certificado",
    featured: "Destacado",
  },
  en: {
    badge: "Certificates",
    title: "Certificates and complementary training",
    description:
      "This section gathers courses and certifications that strengthen my technical profile in frontend, backend, Linux, networking, cybersecurity and data analysis.",
    panelTitle: "Achievements Archive",
    issuer: "Issuer",
    date: "Date",
    category: "Category",
    view: "View certificate",
    featured: "Featured",
  },
};

function getCategoryIcon(category: string) {
  const value = category.toLowerCase();

  if (value.includes("frontend")) return Laptop2;
  if (value.includes("backend")) return ServerCog;
  if (value.includes("linux")) return Code2;
  if (value.includes("redes") || value.includes("network")) return Network;
  if (value.includes("data")) return Database;
  if (value.includes("security") || value.includes("seguridad"))
    return ShieldCheck;

  return Award;
}

export default function Certificates({ language }: CertificatesProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={fadeUp}
      >
        <div className="game-label retro-badge w-fit">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h2 className="pixel-title glow-text mt-4 max-w-5xl text-2xl text-white sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="game-title-gradient">{t.title}</span>
        </h2>

        <div className="mt-4 flex items-center justify-start">
          <div className="pacman-row scale-90 sm:scale-100">
            <span className="pacman" />
            <span className="pacdot" />
            <span className="pacdot" />
            <span className="pacdot" />
            <span className="power-pellet" />
            <span className="arcade-ghost arcade-ghost--violet" />
          </div>
        </div>

        <div className="mt-6 max-w-4xl">
          <div className="game-screen retro-screen p-4 sm:p-5 md:p-6">
            <p className="text-left text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8">
              {t.description}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate) => {
            const category =
              language === "es"
                ? certificate.categoryEs
                : certificate.categoryEn;

            const description =
              language === "es"
                ? certificate.descriptionEs
                : certificate.descriptionEn;

            const CategoryIcon = getCategoryIcon(category);

            return (
              <motion.article
                key={`${certificate.title}-${certificate.issuer}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
              >
                <div className="rpg-window__bar console-topbar">
                  <div className="rpg-window__title console-brand">
                    {t.panelTitle}
                  </div>

                  <div className="rpg-window__dots console-leds">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="game-screen console-screen p-4 sm:p-5">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 text-fuchsia-200">
                        <Award className="h-5 w-5" />
                      </div>

                      {certificate.featured && (
                        <span className="game-chip">
                          <BadgeCheck className="h-3.5 w-3.5 text-fuchsia-200" />
                          {t.featured}
                        </span>
                      )}
                    </div>

                    <h3 className="text-left text-base font-semibold text-white sm:text-lg">
                      {certificate.title}
                    </h3>

                    <div className="mt-4 space-y-2.5 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 shrink-0 text-fuchsia-200" />
                        <span>
                          <span className="text-slate-400">{t.issuer}: </span>
                          {certificate.issuer}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 shrink-0 text-violet-200" />
                        <span>
                          <span className="text-slate-400">{t.date}: </span>
                          {certificate.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4 shrink-0 text-pink-200" />
                        <span>
                          <span className="text-slate-400">{t.category}: </span>
                          {category}
                        </span>
                      </div>
                    </div>

                    <div className="game-divider my-4" />

                    <p className="text-sm leading-7 text-slate-300">
                      {description}
                    </p>

                    <div className="mt-5">
                      <a
                        href={certificate.file}
                        target="_blank"
                        rel="noreferrer"
                        className="game-button-secondary w-full justify-center sm:justify-start"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t.view}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}