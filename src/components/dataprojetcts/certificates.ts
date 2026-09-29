// Fechas, emisores y códigos tomados de cada PDF (o de su página de verificación).
export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  area: "web" | "data" | "redes" | "sap";
  file: string | null;
  verify?: string;
};

export const certificates: Certificate[] = [
  { title: "CCNAv7: Enterprise Networking, Security and Automation", issuer: "Cisco", date: "Dic 2024", area: "redes", file: "/certificates/ccna_enterprise_networking.pdf" },
  { title: "CCNAv7: Switching, Routing and Wireless Essentials", issuer: "Cisco", date: "Ago 2024", area: "redes", file: "/certificates/ccna_switching_routing_wireless.pdf" },
  { title: "React Basics", issuer: "Meta · Coursera", date: "Feb 2025", area: "web", file: "/certificates/react.pdf", verify: "https://coursera.org/verify/BTPJSTGZJ8U6" },
  { title: "Django Web Framework", issuer: "Meta · Coursera", date: "Feb 2025", area: "web", file: "/certificates/django_coursera.pdf", verify: "https://coursera.org/verify/CQPLODRRH46E" },
  { title: "Software Development on SAP HANA", issuer: "SAP · Coursera", date: "Mar 2026", area: "sap", file: null, verify: "https://coursera.org/verify/CQVWE7LWLIHQ" },
  { title: "Learn SAP ABAP Fundamentals", issuer: "Board Infinity", date: "Abr 2026", area: "sap", file: null },
  { title: "Network Security", issuer: "Cisco", date: "Dic 2024", area: "redes", file: "/certificates/network_security.pdf" },
  { title: "Business Intelligence", issuer: "Great Learning", date: "Feb 2025", area: "data", file: "/certificates/business_intelligence.pdf", verify: "https://www.mygreatlearning.com/certificate/NJWVDCJD" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "Mar 2023", area: "redes", file: "/certificates/intro_cybersecurity.pdf" },
  { title: "Introduction to Data Science", issuer: "Cisco", date: "Abr 2023", area: "data", file: "/certificates/intro_data_science.pdf" },
  { title: "NDG Linux Unhatched", issuer: "Cisco / NDG", date: "Jun 2023", area: "redes", file: "/certificates/ndg_linux_unhatched.pdf" },
];
