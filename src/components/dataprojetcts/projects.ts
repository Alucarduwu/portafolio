import allofme1 from "../../assets/projects/allofme/1.png";
import allofme2 from "../../assets/projects/allofme/2.png";
import allofme3 from "../../assets/projects/allofme/3.png";
import allofme4 from "../../assets/projects/allofme/4.png";
import allofme5 from "../../assets/projects/allofme/5.png";
import allofme6 from "../../assets/projects/allofme/6.png";
import allofme7 from "../../assets/projects/allofme/7.png";
import allofme8 from "../../assets/projects/allofme/8.png";
import allofme9 from "../../assets/projects/allofme/9.png";

/* BUSKQ */
import buskq1 from "../../assets/projects/buskq/busqueda.png";
import buskq2 from "../../assets/projects/buskq/categorias.png";
import buskq3 from "../../assets/projects/buskq/dash.png";
import buskq4 from "../../assets/projects/buskq/image.png";
import buskq6 from "../../assets/projects/buskq/imag.png";
import buskq5 from "../../assets/projects/buskq/iniciop.png";

/* LENGUAJE DE SEÑAS */
import senas1 from "../../assets/projects/lenguajesenas/1.png";
import senas2 from "../../assets/projects/lenguajesenas/2.png";
import senasExpo from "../../assets/projects/lenguajesenas/expo.png";
import senasFigma from "../../assets/projects/lenguajesenas/figma.png";
import senasFigma2 from "../../assets/projects/lenguajesenas/figma2.png";
import senasFigma3 from "../../assets/projects/lenguajesenas/figma3.png";
import senasFirebase from "../../assets/projects/lenguajesenas/firebase.png";
import senasImage from "../../assets/projects/lenguajesenas/image.png";

/* SNACKIFY */
import snack1 from "../../assets/projects/snackify/1.png";
import snack2 from "../../assets/projects/snackify/2.png";
import snack3 from "../../assets/projects/snackify/3.png";
import snack4 from "../../assets/projects/snackify/4.png";
import snack5 from "../../assets/projects/snackify/5.png";
import snack6 from "../../assets/projects/snackify/image.png";

export const projects = [
  {
    titleEs: "App móvil de gestión personal",
    titleEn: "Personal Management Mobile App",
    stack: "Kotlin • Jetpack Compose • MVVM",

    descriptionEs:
      "Aplicación móvil enfocada en la gestión personal y organización diaria. Incluye módulos para finanzas, seguimiento de tareas, planeación semanal o mensual, control de metas y listas personalizadas.",

    descriptionEn:
      "Mobile application focused on personal management and daily organization including finance tracking, tasks, goals and personal lists.",

    images: [
      allofme1,
      allofme2,
      allofme3,
      allofme4,
      allofme5,
      allofme6,
      allofme7,
      allofme8,
      allofme9,
    ],

    github: "https://github.com/Alucarduwu/Allfome",
    demo: "",
  },

  {
    titleEs: "Directorio empresarial Buskq",
    titleEn: "Buskq Business Directory",
    stack: "Angular • Node.js • MySQL",

    descriptionEs:
      "Directorio empresarial desarrollado como proyecto full stack para la gestión y búsqueda de empresas locales con panel administrativo y estructura de categorías.",

    descriptionEn:
      "Full stack business directory developed for searching and managing local companies with categories and admin dashboard.",

    images: [buskq1, buskq2, buskq3, buskq4, buskq5,buskq6],

    github: "",
    demo: "",
  },

  {
    titleEs: "Sistema Snackify",
    titleEn: "Snackify Management System",
    stack: "Astro • TypeScript • Tailwind",

    descriptionEs:
      "Sistema web para gestión de pedidos y productos con panel administrativo desarrollado con Astro.",

    descriptionEn:
      "Web system for order and product management with an admin panel built using Astro.",

    images: [snack1, snack2, snack3, snack4, snack5, snack6],

    github: "https://github.com/Alucarduwu/Snackify",
    demo: "",
  },

  {
    titleEs: "Traductor de lenguaje de señas",
    titleEn: "Sign Language Translator Prototype",
    stack: "React Native • Firebase • Computer Vision",

    descriptionEs:
      "Prototipo de investigación enfocado en la traducción de lenguaje de señas mediante visión por computadora y procesamiento de gestos.",

    descriptionEn:
      "Research prototype exploring sign language translation using computer vision and gesture recognition.",

    images: [
      senas1,
      senas2,
      senasExpo,
      senasFigma,
      senasFigma2,
      senasFigma3,
      senasFirebase,
      senasImage,
    ],

    github: "https://github.com/Alucarduwu/signfinal",
    demo: "",
  },

  {
    titleEs: "Portafolio de desarrolladora",
    titleEn: "Developer Portfolio",
    stack: "React • TypeScript • Tailwind • Framer Motion",

    descriptionEs:
      "Portafolio personal diseñado para mostrar proyectos, habilidades técnicas y experiencia profesional.",

    descriptionEn:
      "Personal portfolio designed to showcase projects, technical skills and development experience.",

    images: ["/images/portfolio.png"],

    github: "https://github.com/Alucarduwu/portafolio",
    demo: "",
  },
];