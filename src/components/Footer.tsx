import { Heart } from "lucide-react";
import type { Language } from "../App";

interface FooterProps {
  language: Language;
}

const content = {
  es: {
    built: "Construido con",
    rights: "Todos los derechos reservados.",
  },
  en: {
    built: "Built with",
    rights: "All rights reserved.",
  },
};

export default function Footer({ language }: FooterProps) {
  const t = content[language];

  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-transparent to-black/30 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center text-sm text-slate-400">

        <p className="flex items-center justify-center gap-2 text-slate-400">
          © 2026 <span className="text-white font-semibold">Anahí Lozano</span>
          <Heart className="h-4 w-4 text-pink-400 opacity-80" />
        </p>

        <p className="mt-3">
          {t.built}{" "}
          <span className="text-fuchsia-300 font-medium">
            React
          </span>
          ,{" "}
          <span className="text-fuchsia-300 font-medium">
            TypeScript
          </span>{" "}
          &{" "}
          <span className="text-fuchsia-300 font-medium">
            Tailwind CSS
          </span>
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {t.rights}
        </p>

      </div>
    </footer>
  );
}