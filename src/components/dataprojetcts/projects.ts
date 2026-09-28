import allofme1 from "../../assets/projects/allofme/1.png";
import allofme2 from "../../assets/projects/allofme/2.png";
import allofme3 from "../../assets/projects/allofme/3.png";
import allofme4 from "../../assets/projects/allofme/4.png";
import allofme5 from "../../assets/projects/allofme/5.png";
import allofme6 from "../../assets/projects/allofme/6.png";
import allofme7 from "../../assets/projects/allofme/7.png";
import allofme8 from "../../assets/projects/allofme/8.png";
import allofme9 from "../../assets/projects/allofme/9.png";

import buskq1 from "../../assets/projects/buskq/busqueda.png";
import buskq2 from "../../assets/projects/buskq/categorias.png";
import buskq3 from "../../assets/projects/buskq/dash.png";
import buskq4 from "../../assets/projects/buskq/image.png";
import buskq6 from "../../assets/projects/buskq/imag.png";
import buskq5 from "../../assets/projects/buskq/iniciop.png";

import senas1 from "../../assets/projects/lenguajesenas/1.png";
import senas2 from "../../assets/projects/lenguajesenas/2.png";
import senasExpo from "../../assets/projects/lenguajesenas/expo.png";
import senasFigma from "../../assets/projects/lenguajesenas/figma.png";
import senasFigma2 from "../../assets/projects/lenguajesenas/figma2.png";
import senasFigma3 from "../../assets/projects/lenguajesenas/figma3.png";
import senasFirebase from "../../assets/projects/lenguajesenas/firebase.png";
import senasImage from "../../assets/projects/lenguajesenas/image.png";

import snack1 from "../../assets/projects/snackify/1.png";
import snack2 from "../../assets/projects/snackify/2.png";
import snack3 from "../../assets/projects/snackify/3.png";
import snack4 from "../../assets/projects/snackify/4.png";
import snack5 from "../../assets/projects/snackify/5.png";
import snack6 from "../../assets/projects/snackify/image.png";

import voraa1 from "../../assets/projects/voraa/1.png";
import voraa2 from "../../assets/projects/voraa/2.png";

export const projects = [
  {
    titleEs: "Voraa · Plataforma de lealtad para restaurantes",
    titleEn: "Voraa · Loyalty Platform for Restaurants",
    stack: "TypeScript • React • Next.js • PostgreSQL • Apple Wallet • Google Wallet",
    descriptionEs: "Producto en producción. Un restaurante crea su programa de lealtad en un minuto, y sus clientes reciben una tarjeta digital en Apple Wallet o Google Wallet que se actualiza sola con cada visita.",
    descriptionEn: "Live in production. A restaurant sets up its loyalty program in a minute, and its customers get a digital card in Apple Wallet or Google Wallet that updates itself on every visit.",
    problemEs: "Las tarjetas de sellos de papel se pierden y no dejan datos: el restaurante no sabe quién vuelve, ni cuándo, ni por qué deja de venir.",
    problemEn: "Paper stamp cards get lost and leave no data: the restaurant can't tell who comes back, when, or why they stop coming.",
    solutionEs: "Tarjetas en la cartera del teléfono, un portal donde el dueño arma su programa sin ayuda, una caja para que el personal selle con el escáner y un panel con el embudo de clientes y reportes automáticos.",
    solutionEn: "Cards in the phone's wallet, a portal where owners build their program on their own, a till app so staff stamp with a scanner, and a dashboard with the customer funnel and automated reports.",
    features_es: [
      "Pases de Apple y Google Wallet que se actualizan en tiempo real",
      "Portal de socios con acceso por WhatsApp, sin contraseñas",
      "Caja (PWA) con escáner para sellar desde el mostrador",
      "Panel de métricas: embudo, periodos de prueba y reportes semanales",
      "Más de 1,200 pruebas automatizadas"
    ],
    features_en: [
      "Apple and Google Wallet passes that update in real time",
      "Partner portal with WhatsApp sign-in, no passwords",
      "Till app (PWA) with a scanner to stamp at the counter",
      "Metrics dashboard: funnel, trial periods and weekly reports",
      "Over 1,200 automated tests"
    ],
    images: [voraa1, voraa2],
    github: "",
    demo: "https://voraa.io/restaurantes/",
    category: "empresarial"
  },
  {
    titleEs: "App móvil de gestión personal",
    titleEn: "Personal Management Mobile App",
    stack: "Kotlin • Jetpack Compose • MVVM",
    descriptionEs: "Aplicación móvil enfocada en la gestión personal y organización diaria. Incluye módulos para finanzas, seguimiento de tareas, planeación semanal o mensual, control de metas y listas personalizadas.",
    descriptionEn: "Mobile application focused on personal management and daily organization including finance tracking, tasks, goals and personal lists.",
    problemEs: "Falta de una herramienta integrada para gestionar finanzas y tareas de forma offline y privada.",
    problemEn: "Lack of an integrated tool to manage finances and tasks offline and privately.",
    solutionEs: "Desarrollo nativo en Kotlin con Room para persistencia local y arquitectura MVVM para escalabilidad.",
    solutionEn: "Native development in Kotlin with Room for local persistence and MVVM architecture for scalability.",
    features_es: ["Control de presupuestos", "Gestión de tareas", "Modo offline", "Persistencia segura"],
    features_en: ["Budget control", "Task management", "Offline mode", "Secure persistence"],
    images: [allofme1, allofme2, allofme3, allofme4, allofme5, allofme6, allofme7, allofme8, allofme9],
    github: "https://github.com/Alucarduwu/Allfome",
    demo: "",
    category: "completo"
  },
  {
    titleEs: "Directorio empresarial Buskq",
    titleEn: "Buskq Business Directory",
    stack: "Angular • Node.js • MySQL",
    descriptionEs: "Directorio empresarial desarrollado como proyecto full stack para la gestión y búsqueda de empresas locales con panel administrativo y estructura de categorías.",
    descriptionEn: "Full stack business directory developed for searching and managing local companies with categories and admin dashboard.",
    problemEs: "Dificultad para localizar negocios locales digitalmente en áreas de rápido crecimiento.",
    problemEn: "Difficulty locating local businesses digitally in fast-growing areas.",
    solutionEs: "Plataforma web con búsqueda geo-espacial y CRUD administrativo robusto.",
    solutionEn: "Web platform with geospatial search and robust administrative CRUD.",
    features_es: ["Búsqueda predictiva", "Filtros por categorías", "Panel de administración", "SEO optimizado"],
    features_en: ["Predictive search", "Category filters", "Admin panel", "SEO optimized"],
    images: [buskq1, buskq2, buskq3, buskq4, buskq5, buskq6],
    github: "",
    demo: "",
    category: "empresarial"
  },
  {
    titleEs: "Sistema Snackify",
    titleEn: "Snackify Management System",
    stack: "Astro • TypeScript • Tailwind",
    descriptionEs: "Sistema web para gestión de pedidos y productos con panel administrativo desarrollado con Astro.",
    descriptionEn: "Web system for order and product management with an admin panel built using Astro.",
    problemEs: "Lentitud en la carga de catálogos de productos en redes móviles.",
    problemEn: "Slow loading of product catalogs on mobile networks.",
    solutionEs: "Uso de Astro para renderizado estático y componentes rápidos sin JavaScript innecesario.",
    solutionEn: "Using Astro for static rendering and fast components without unnecessary JavaScript.",
    features_es: ["Carga ultra-rápida", "Gestión de inventario", "Estructura modular", "Responsive design"],
    features_en: ["Ultra-fast loading", "Inventory management", "Modular structure", "Responsive design"],
    images: [snack1, snack2, snack3, snack4, snack5, snack6],
    github: "https://github.com/Alucarduwu/Snackify",
    demo: "",
    category: "empresarial"
  },
  {
    titleEs: "Traductor de lenguaje de señas",
    titleEn: "Sign Language Translator Prototype",
    stack: "React Native • Firebase • Computer Vision",
    descriptionEs: "Prototipo de investigación enfocado en la traducción de lenguaje de señas mediante visión por computadora y procesamiento de gestos.",
    descriptionEn: "Research prototype exploring sign language translation using computer vision and gesture recognition.",
    problemEs: "Brecha de comunicación para personas con discapacidad auditiva en entornos digitales.",
    problemEn: "Communication gap for hearing-impaired people in digital environments.",
    solutionEs: "Integración de modelos de visión en tiempo real con React Native y Firebase.",
    solutionEn: "Integration of real-time vision models with React Native and Firebase.",
    features_es: ["Detección de puntos de mano", "Traducción en tiempo real", "Integración Firebase", "Prototipo escalable"],
    features_en: ["Hand point detection", "Real-time translation", "Firebase integration", "Scalable prototype"],
    images: [senas1, senas2, senasExpo, senasFigma, senasFigma2, senasFigma3, senasFirebase, senasImage],
    github: "https://github.com/Alucarduwu/signfinal",
    demo: "",
    category: "prototipo"
  },
  {
    titleEs: "Portafolio de desarrolladora",
    titleEn: "Developer Portfolio",
    stack: "React • TypeScript • Tailwind • Framer Motion",
    descriptionEs: "Portafolio personal diseñado para mostrar proyectos, habilidades técnicas y experiencia profesional.",
    descriptionEn: "Personal portfolio designed to showcase projects, technical skills and development experience.",
    images: ["/images/portfolio.png"],
    github: "https://github.com/Alucarduwu/portafolio",
    demo: "https://portafolioanahi.vercel.app/",
    category: "front"
  },
  {
    titleEs: "Portafolio Interactivo de Desarrolladora",
    titleEn: "Interactive Developer Portfolio",
    stack: "React • Framer Motion • Three.js",
    descriptionEs: "Versión interactiva y dinámica del portafolio personal, con enfoque en animaciones avanzadas y experiencia de usuario inmersiva.",
    descriptionEn: "Interactive and dynamic version of the personal portfolio, focusing on advanced animations and immersive user experience.",
    images: ["/images/portfolio_interactive.png"],
    github: "https://github.com/Alucarduwu/Portafolio2styles",
    demo: "https://porfolio-six-smoky.vercel.app/",
    category: "front"
  },
];