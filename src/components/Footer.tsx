import { Heart, Sparkles, Gamepad2 } from "lucide-react";
import type { Language } from "../App";

interface FooterProps {
  language: Language;
}

const content = {
  es: {
    built: "Construido con",
    rights: "Todos los derechos reservados.",
    panel: "System Status",
  },
  en: {
    built: "Built with",
    rights: "All rights reserved.",
    panel: "System Status",
  },
};

export default function Footer({ language }: FooterProps) {
  const t = content[language];

  return (
    <footer className="mt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="rpg-window console-shell arcade-corners pixel-console">

          <div className="rpg-window__bar console-topbar">
            <div className="rpg-window__title console-brand">{t.panel}</div>

            <div className="rpg-window__dots console-leds">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="p-6 text-center">

            {/* pacman row */}
            <div className="flex justify-center mb-4">
              <div className="pacman-row">
                <span className="pacman" />
                <span className="pacdot" />
                <span className="pacdot" />
                <span className="pacdot" />
                <span className="power-pellet" />
                <span className="arcade-ghost arcade-ghost--violet" />
              </div>
            </div>

            <p className="flex items-center justify-center gap-2 text-sm text-slate-300">
              © 2026

              <span className="font-semibold text-white">
                Anahí Lozano
              </span>

              <Heart className="h-4 w-4 text-pink-400 opacity-80" />
            </p>

            <div className="game-divider my-4" />

            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-300">
              {t.built}

              <span className="game-chip">React</span>
              <span className="game-chip">TypeScript</span>
              <span className="game-chip">Tailwind</span>
            </p>

            <p className="mt-3 text-xs text-slate-500">
              {t.rights}
            </p>

            <div className="mt-4 flex justify-center gap-3 flex-wrap">

              <span className="game-chip flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-fuchsia-200" />
                Portfolio v1.0
              </span>

              <span className="game-chip flex items-center gap-2">
                <Gamepad2 className="h-3 w-3 text-violet-200" />
                Retro UI
              </span>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}