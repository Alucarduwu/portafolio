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
    titleEs: "Desarrolladora Full Stack – Sistema Web Empresarial",
    titleEn: "Full Stack Developer – Business Web Platform",
    companyEs: "Lemaboox / Instituto Tecnológico de Aguascalientes",
    companyEn: "Lemaboox / Instituto Tecnológico de Aguascalientes",
    periodEs: "Agosto 2025 – Marzo 2026",
    periodEn: "August 2025 – March 2026",
    descriptionEs:
      "Diseñé y desarrollé una aplicación web empresarial robusta enfocada en la gestión estructurada de información y control administrativo.",
    descriptionEn:
      "Designed and developed a robust enterprise web application focused on structured information management and administrative control.",
    stack: "Angular • Node.js • MySQL • REST APIs • RBAC",
    icon: Briefcase,
    details: {
      featuresEs: [
        "Implementación de APIs REST seguras para consumo de datos institucionales.",
        "Sistema de autenticación con control de acceso basado en roles (RBAC).",
        "Dashboard administrativo responsivo con visualización de datos en tiempo real.",
        "Modelado relacional complejo para optimización de consultas SQL."
      ],
      featuresEn: [
        "Implementation of secure REST APIs for institutional data consumption.",
        "Authentication system with role-based access control (RBAC).",
        "Responsive administrative dashboard with real-time data visualization.",
        "Complex relational modeling for SQL query optimization."
      ],
      architectureEs: [
        "Arquitectura desacoplada Angular/Node.js para escalabilidad vertical.",
        "Implementación de Middleware para validación de sesiones y seguridad.",
        "Diseño de base de datos normalizada para integridad de datos críticos."
      ],
      architectureEn: [
        "Decoupled Angular/Node.js architecture for vertical scalability.",
        "Middleware implementation for session validation and security.",
        "Normalized database design for critical data integrity."
      ]
    }
  },
  {
    id: "exp-02",
    titleEs: "Servicio Social – Sistema de Automatización Inteligente",
    titleEn: "Social Service – Intelligent Automation System",
    companyEs: "Instituto Tecnológico de Aguascalientes",
    companyEn: "Instituto Tecnológico de Aguascalientes",
    periodEs: "Enero 2025 – Agosto 2025",
    periodEn: "January 2025 – August 2025",
    descriptionEs:
      "Desarrollo de un núcleo de inteligencia basado en lógica difusa para la automatización de entornos domésticos mediante variables ambientales.",
    descriptionEn:
      "Development of an intelligence core based on fuzzy logic for home automation using environmental variables.",
    stack: "JavaScript • MATLAB • Fuzzy Logic • Artificial Intelligence",
    icon: Cpu,
    details: {
      featuresEs: [
        "Diseño de algoritmos de inferencia difusa para toma de decisiones dinámicas.",
        "Desarrollo de lógica de control en JavaScript para prototipado rápido.",
        "Validación funcional del sistema mediante simulación en entornos controlados.",
        "Definición de funciones de membresía para variables de entrada/salida."
      ],
      featuresEn: [
        "Design of fuzzy inference algorithms for dynamic decision making.",
        "Control logic development in JavaScript for rapid prototyping.",
        "Functional system validation through simulation in controlled environments.",
        "Definition of membership functions for input/output variables."
      ],
      architectureEs: [
        "Integración Híbrida mediante lógica difusa y procesamiento en tiempo real.",
        "Modelado matemático en MATLAB para el ajuste de reglas de decisión.",
        "Implementación basada en reglas para garantizar la fiabilidad del sistema."
      ],
      architectureEn: [
        "Hybrid integration through fuzzy logic and real-time processing.",
        "Mathematical modeling in MATLAB for decision rule tuning.",
        "Rule-based implementation to ensure system reliability."
      ]
    }
  },
];