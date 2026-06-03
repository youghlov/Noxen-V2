import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { BentoGrid, type BentoItem } from "./ui/bento-grid";
import { Sparkles, Lightbulb, Minimize2, Eye, Globe, User } from "lucide-react";

const bentoItems: BentoItem[] = [
  {
    title: "Créativité",
    meta: "Axe 1",
    description: "Idéation hors des sentiers battus pour concevoir des identités uniques et mémorables.",
    icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
    status: "Actif",
    tags: ["Visuel", "Identité"],
    colSpan: 1,
  },
  {
    title: "Innovation Tech",
    meta: "Axe 2",
    description: "Exploration technologique continue pour repousser les limites du possible en digital.",
    icon: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
    status: "En cours",
    tags: ["Tech", "Web3"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Excellence Visuelle",
    meta: "Axe 4",
    description: "Direction artistique haut de gamme avec une obsession pour les détails parfaits.",
    icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
    tags: ["DA", "Luxe"],
    colSpan: 2,
  },
  {
    title: "Minimalisme",
    meta: "Axe 3",
    description: "Épuration du design pour ne garder que l'essentiel et sublimer l'expérience.",
    icon: <Minimize2 className="w-5 h-5" strokeWidth={1.5} />,
    status: "Actif",
    tags: ["Design", "Épuré"],
    colSpan: 1,
  },
  {
    title: "Culture Digitale",
    meta: "Axe 5",
    description: "Compréhension profonde des codes et des usages d'internet et des réseaux.",
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    status: "Analysé",
    tags: ["Social", "Tendances"],
    colSpan: 1,
  },
  {
    title: "Expérience Utilisateur",
    meta: "Axe 6",
    description: "Parcours utilisateur fluide, intuitif et sans friction pour maximiser la conversion.",
    icon: <User className="w-5 h-5" strokeWidth={1.5} />,
    status: "Optimisé",
    tags: ["UX/UI", "Conversion"],
    colSpan: 2,
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="vision" ref={containerRef} className="relative w-full py-24 bg-deep border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-chrome font-sans tracking-[0.3em] uppercase text-xs mb-6 block">Le Modèle Noxen</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-offwhite leading-[1.1]">
              Créer l’impact <br className="hidden md:block"/> 
              <span className="text-noxen drop-shadow-[0_0_15px_rgba(246,133,31,0.3)]">digital</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-chrome/80">
            Créer des expériences digitales premium qui fusionnent créativité, culture et technologie afin d’aider les marques modernes à se démarquer.
          </p>
        </div>

        {/* Bento Grid Section */}
        <div className="relative w-full mt-12">
          <BentoGrid items={bentoItems} />
        </div>

      </div>
    </section>
  );
}
