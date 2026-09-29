import { Briefcase, Globe, Headset } from "lucide-react";

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

/**
 * La trayectoria sigue el CV de 2026 al pie de la letra: un reclutador los cruza, y
 * cualquier diferencia de puesto, fecha o cifra entre los dos se lee como invento.
 */
export const experience: ExperienceItem[] = [
  {
    id: "exp-voraa",
    titleEs: "Desarrolladora Full Stack",
    titleEn: "Full Stack Developer",
    companyEs: "Voraa",
    companyEn: "Voraa",
    periodEs: "Mayo 2026 – Actualidad · Aguascalientes, México",
    periodEn: "May 2026 – Present · Aguascalientes, Mexico",
    descriptionEs:
      "Única ingeniera del equipo, con la responsabilidad técnica de punta a punta: arquitectura, datos, despliegue y pruebas con usuarios. Desarrollé Voraa Lealtad, que está en producción con restaurantes.",
    descriptionEn:
      "Sole engineer on the team, owning the technical work end to end: architecture, data, deployment and user testing. I built Voraa Lealtad, live in production with restaurants.",
    stack: "TypeScript • Next.js • PostgreSQL • Supabase • Flutter • Apple Wallet • Google Wallet",
    icon: Briefcase,
    details: {
      featuresEs: [
        "Desarrollé Voraa Lealtad de extremo a extremo: alta autoservicio de restaurantes, registro de clientes por QR y teléfono, control de visitas y canje de recompensas, con operación por marca y sucursal.",
        "Integré Apple Wallet y Google Wallet con actualización de visitas; implementé PassKit, firma PKCS#7 y notificaciones APNs para los pases de Apple.",
        "Construí un motor de enriquecimiento de negocios con Google Places, Geocoding, OpenStreetMap y Serper, y ajusté la resolución de identidad para no fusionar establecimientos distintos.",
        "Mantuve la app Flutter, resolví fallos de compilación en iOS y Android y configuré CI móvil en Codemagic. Desarrollé el panel de restaurantes y convertí pruebas de usabilidad en mejoras responsive."
      ],
      featuresEn: [
        "Built Voraa Lealtad end to end: self-service restaurant onboarding, customer sign-up by QR and phone, visit tracking and reward redemption, operated per brand and location.",
        "Integrated Apple Wallet and Google Wallet with live visit updates; implemented PassKit, PKCS#7 signing and APNs notifications for Apple passes.",
        "Built a business enrichment engine with Google Places, Geocoding, OpenStreetMap and Serper, and tuned identity resolution so distinct places never get merged.",
        "Maintained the Flutter app, fixed iOS and Android build failures and set up mobile CI on Codemagic. Built the restaurant dashboard and turned usability tests into responsive improvements."
      ],
      architectureEs: [
        "Monorepo de tres servicios con Next.js, TypeScript y PostgreSQL/Supabase: 53 rutas de API, 18 migraciones y 1,284 pruebas automatizadas.",
        "Despliegues en Railway y Cloudflare.",
        "Autorización en servidor, políticas de acceso a nivel de fila (RLS), rate limiting y reCAPTCHA Enterprise.",
        "Corregí hallazgos de seguridad en Firebase y desarrollé la migración de datos a PostgreSQL."
      ],
      architectureEn: [
        "Three-service monorepo with Next.js, TypeScript and PostgreSQL/Supabase: 53 API routes, 18 migrations and 1,284 automated tests.",
        "Deployments on Railway and Cloudflare.",
        "Server-side authorization, row-level security (RLS) policies, rate limiting and reCAPTCHA Enterprise.",
        "Fixed security findings in Firebase and built the data migration to PostgreSQL."
      ]
    }
  },
  {
    id: "exp-i3",
    titleEs: "Desarrolladora de Software",
    titleEn: "Software Developer",
    companyEs: "i3 Solutions Inc.",
    companyEn: "i3 Solutions Inc.",
    periodEs: "Mayo 2026 – Actualidad · Canadá, remoto desde México",
    periodEn: "May 2026 – Present · Canada, remote from Mexico",
    descriptionEs:
      "Desarrollo y mantenimiento de Panacea, plataforma cliente-servidor con terminales en C# / WPF y .NET Framework y backend en Node.js con MongoDB, en colaboración con un equipo internacional.",
    descriptionEn:
      "Development and maintenance of Panacea, a client-server platform with C# / WPF and .NET Framework terminals and a Node.js backend on MongoDB, working with an international team.",
    stack: "C# • WPF • .NET Framework • Node.js • MongoDB • Docker",
    icon: Globe,
    details: {
      featuresEs: [
        "Resolví incidencias de cliente y servidor de reconexión, comunicación con Management Server, reinicio remoto y estados de carga de las terminales.",
        "Implementé y validé reintentos de conexión: cinco intentos cada cinco segundos, con pruebas de recuperación cuando el servidor vuelve a estar disponible.",
        "Trabajé en el módulo de facturación y el monitoreo de compras con PayPal, modificando controladores y el modelo de registro contable del backend."
      ],
      featuresEn: [
        "Resolved client and server issues around reconnection, Management Server communication, remote restart and terminal loading states.",
        "Implemented and validated connection retries: five attempts every five seconds, with recovery tests for when the server comes back.",
        "Worked on the billing module and PayPal purchase monitoring, changing controllers and the backend accounting record model."
      ],
      architectureEs: [
        "Solución de 77 proyectos .NET sobre entornos Windows y WSL, con MongoDB en Docker.",
        "Diagnósticos y evidencia de pruebas documentados en Jira; cambios mediante Git y pull requests."
      ],
      architectureEn: [
        "A 77-project .NET solution on Windows and WSL environments, with MongoDB in Docker.",
        "Diagnostics and test evidence documented in Jira; changes through Git and pull requests."
      ]
    }
  },
  {
    id: "exp-lemaboox",
    titleEs: "Desarrolladora Full Stack",
    titleEn: "Full Stack Developer",
    companyEs: "Lemaboox",
    companyEn: "Lemaboox",
    periodEs: "Agosto 2025 – Julio 2026 · Aguascalientes, México",
    periodEn: "August 2025 – July 2026 · Aguascalientes, Mexico",
    descriptionEs:
      "Residencia profesional (ago – dic 2025) y después desarrollo de software (dic 2025 – jul 2026). Diseñé y desarrollé una plataforma web desde el levantamiento de requerimientos hasta la entrega funcional.",
    descriptionEn:
      "Professional residency (Aug – Dec 2025), then software development (Dec 2025 – Jul 2026). I designed and built a web platform from requirements gathering to working delivery.",
    stack: "Angular • Node.js • Express • MySQL • RBAC",
    icon: Briefcase,
    details: {
      featuresEs: [
        "Diseñé y desarrollé una plataforma web con Angular, Node.js, Express y MySQL, desde el levantamiento de requerimientos hasta la entrega funcional.",
        "Implementé APIs REST, autenticación y autorización basada en roles (RBAC), además de dashboards administrativos responsivos.",
        "Coordiné requerimientos con las áreas involucradas para traducir procesos del negocio en funcionalidades."
      ],
      featuresEn: [
        "Designed and built a web platform with Angular, Node.js, Express and MySQL, from requirements gathering to working delivery.",
        "Implemented REST APIs, authentication and role-based access control (RBAC), plus responsive admin dashboards.",
        "Worked with the business areas involved to turn their processes into features."
      ],
      architectureEs: [
        "Esquemas relacionales diseñados a la medida y consultas optimizadas.",
        "Control de acceso por roles en el servidor."
      ],
      architectureEn: [
        "Custom relational schemas and optimized queries.",
        "Server-side role-based access control."
      ]
    }
  },
  {
    id: "exp-nrfm",
    titleEs: "Agente de Servicio al Cliente",
    titleEn: "Customer Service Agent",
    companyEs: "NRFM Finance Services",
    companyEn: "NRFM Finance Services",
    periodEs: "2022 – 2024",
    periodEn: "2022 – 2024",
    descriptionEs:
      "Gestioné operaciones financieras y validaciones digitales con información sensible, manteniendo exactitud en los registros y cumplimiento de los procesos de validación.",
    descriptionEn:
      "Handled financial operations and digital validations involving sensitive data, keeping records accurate and validation processes compliant.",
    stack: "Operaciones financieras • Validación de datos • Información sensible",
    icon: Headset
  }
];
