import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experiences";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export type Language = "es" | "en";

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage === "en" ? "en" : "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <div className="min-h-screen bg-[#09090f] text-slate-100 overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.16),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_25%),radial-gradient(circle_at_30%_80%,_rgba(217,70,239,0.10),_transparent_20%),linear-gradient(to_bottom,#09090f,#0f1020,#09090f)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <Navbar language={language} setLanguage={setLanguage} />

      <main className="max-w-6xl mx-auto px-6">
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}