import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "../src/components/Hero";
import AboutPage from "../src/components/About";
import ExperiencePage from "../src/components/Experiences";
import ProjectsPage from "../src/components/Projects";
import SkillsPage from "../src/components/Skills";
import ContactPage from "../src/components/Contact";

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
    <div className="relative min-h-screen overflow-x-hidden bg-[#07070c] text-slate-100">
      {/* Fondo decorativo global */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-140px] top-8 h-80 w-80 rounded-full bg-fuchsia-400/12 blur-3xl" />
        <div className="absolute right-[-100px] top-24 h-96 w-96 rounded-full bg-violet-400/12 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-pink-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[90rem] flex-col">
        <Navbar language={language} setLanguage={setLanguage} />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route
              path="/experience"
              element={<ExperiencePage language={language} />}
            />
            <Route
              path="/projects"
              element={<ProjectsPage language={language} />}
            />
            <Route path="/skills" element={<SkillsPage language={language} />} />
            <Route
              path="/contact"
              element={<ContactPage language={language} />}
            />
          </Routes>
        </main>

        <Footer language={language} />
      </div>
    </div>
  );
}