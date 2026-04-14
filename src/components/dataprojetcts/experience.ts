import { Briefcase, Cpu } from "lucide-react";

export interface ExperienceItem {
  id: string;
  titleEs: string;
  titleEn: string;
  companyEs: string;
  companyEn: string;
  periodEs: string;
  periodEn: string;
  descriptionEs: string;
  descriptionEn: string;
  stack: string;
  icon: any;
  details?: {
    featuresEs: string[];
    featuresEn: string[];
    architectureEs: string[];
    architectureEn: string[];
  };
}

export const experience: ExperienceItem[] = [
  {
    id: "exp-01",
    titleEs: "Líder de Arquitectura & Full Stack – Sistema de Gobernanza Empresarial",
    titleEn: "Lead Architect & Full Stack Developer – Enterprise Governance System",
    companyEs: "Lemaboox / Instituto Tecnológico de Aguascalientes",
    companyEn: "Lemaboox / Instituto Tecnológico de Aguascalientes",
    periodEs: "Agosto 2025 – Actualidad",
    periodEn: "August 2025 – Present",
    descriptionEs:
      "Dirección técnica en el diseño y despliegue de una plataforma web de alta disponibilidad para la gestión estratégica de activos institucionales y procesos administrativos complejos.",
    descriptionEn:
      "Technical direction in the design and deployment of a high-availability web platform for strategic institutional asset management and complex administrative processes.",
    stack: "Angular • Node.js • MySQL • Cloud Integration • RBAC Security",
    icon: Briefcase,
    details: {
      featuresEs: [
        "Ingeniería de APIs robustas bajo estándares industriales de seguridad y escalabilidad.",
        "Implementación de esquemas RBAC avanzados para la protección de datos sensibles.",
        "Optimización de lógica de negocio en servidor reduciendo tiempos de respuesta en un 30%.",
        "Diseño de interfaces de usuario de alta densidad para analítica en tiempo real."
      ],
      featuresEn: [
        "Engineering of robust APIs under industrial security and scalability standards.",
        "Implementation of advanced RBAC schemes for sensitive data protection.",
        "Server-side business logic optimization reducing response times by 30%.",
        "Design of high-density user interfaces for real-time analytics."
      ],
      architectureEs: [
        "Arquitectura escalable basada en microservicios y patrones de diseño limpios.",
        "Middleware de seguridad personalizado para validación y saneamiento de datos.",
        "Modelado de bases de datos altamente normalizado para integridad referencial."
      ],
      architectureEn: [
        "Scalable architecture based on microservices and clean design patterns.",
        "Custom security middleware for data validation and sanitization.",
        "Highly normalized database modeling for referential integrity."
      ]
    }
  },
  {
    id: "exp-02",
    titleEs: "Especialista en Ingeniería de Sistemas AI – Unidad de Control Lógica Difusa",
    titleEn: "AI Systems Engineering Specialist – Fuzzy Logic Control Unit",
    companyEs: "Instituto Tecnológico de Aguascalientes",
    companyEn: "Instituto Tecnológico de Aguascalientes",
    periodEs: "Enero 2025 – Agosto 2025",
    periodEn: "January 2025 – August 2025",
    descriptionEs:
      "Investigación y desarrollo de un núcleo de inteligencia computacional basado en lógica difusa para la automatización predictiva de procesos industriales y ambientales.",
    descriptionEn:
      "Research and development of a computational intelligence core based on fuzzy logic for predictive automation of industrial and environmental processes.",
    stack: "JavaScript • MATLAB • Artificial Intelligence • Fuzzy Logic • R&D",
    icon: Cpu,
    details: {
      featuresEs: [
        "Modelado de algoritmos de inferencia difusa para la toma de decisiones autónomas.",
        "Creación de prototipos funcionales de alta fidelidad integrando lógica matemática compleja.",
        "Validación de fiabilidad del sistema mediante simulaciones de estrés en entornos MATLAB.",
        "Definición estratégica de variables lingüísticas y funciones de membresía."
      ],
      featuresEn: [
        "Modeling of fuzzy inference algorithms for autonomous decision making.",
        "Creation of high-fidelity functional prototypes integrating complex mathematical logic.",
        "System reliability validation through stress simulations in MATLAB environments.",
        "Strategic definition of linguistic variables and membership functions."
      ],
      architectureEs: [
        "Integración de sistemas expertos para el control dinámico en tiempo real.",
        "Motor de reglas personalizado diseñado para la escalabilidad de funciones AI.",
        "Optimización de procesamiento de señales mediante lógica computacional avanzada."
      ],
      architectureEn: [
        "Integration of expert systems for dynamic real-time control.",
        "Custom rule engine designed for AI function scalability.",
        "Signal processing optimization through advanced computational logic."
      ]
    }
  },
  {
    id: "exp-03",
    titleEs: "Consultoría Técnica Estratégica & Desarrollo Independiente",
    titleEn: "Strategic Technical Consultant & Independent Development",
    companyEs: "Independent / Freelance Portfolio",
    companyEn: "Independent / Freelance Portfolio",
    periodEs: "2024 – Presente",
    periodEn: "2024 – Present",
    descriptionEs:
      "Gestión y ejecución de soluciones tecnológicas personalizadas para clientes independientes, enfocándome en la arquitectura de software y el valor de negocio.",
    descriptionEn:
      "Management and execution of custom technological solutions for independent clients, focusing on software architecture and business value.",
    stack: "React • TypeScript • Next.js • TailwindCSS • System Design",
    icon: Briefcase,
    details: {
      featuresEs: [
        "Despliegue de arquitecturas web modernas con enfoque en SEO y performance.",
        "Consultoría en digitalización de procesos para pequeñas y medianas empresas.",
        "Desarrollo de landing pages de alta conversión y sistemas de control ligero.",
        "Liderazgo en la selección del stack tecnológico para proyectos de rápido crecimiento."
      ],
      featuresEn: [
        "Deployment of modern web architectures with a focus on SEO and performance.",
        "Consultancy on process digitalization for small and medium-sized enterprises.",
        "Development of high-conversion landing pages and lightweight control systems.",
        "Leadership in tech stack selection for rapid-growth projects."
      ],
      architectureEs: [
        "Patrones de diseño orientados a componentes y mantenibilidad a largo plazo.",
        "Implementación de CI/CD para despliegues automatizados y seguros.",
        "Arquitectura de frontend modular para escalabilidad de funciones futuras."
      ],
      architectureEn: [
        "Component-oriented design patterns and long-term maintainability.",
        "CI/CD implementation for automated and secure deployments.",
        "Modular frontend architecture for future feature scalability."
      ]
    }
  }
];