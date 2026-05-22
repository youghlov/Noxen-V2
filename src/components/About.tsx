import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import RadialOrbitalTimeline, { TimelineItem } from "./ui/radial-orbital-timeline";
import { Sparkles, Lightbulb, Minimize2, Eye, Globe, User } from "lucide-react";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Créativité",
    date: "Axe 1",
    content: "Idéation hors des sentiers battus pour concevoir des identités uniques et mémorables.",
    category: "Visuel",
    icon: Sparkles,
    relatedIds: [2, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Innovation",
    date: "Axe 2",
    content: "Exploration technologique continue pour repousser les limites du possible en digital.",
    category: "Tech",
    icon: Lightbulb,
    relatedIds: [1, 5],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Minimalisme",
    date: "Axe 3",
    content: "Épuration du design pour ne garder que l'essentiel et sublimer l'expérience.",
    category: "Design",
    icon: Minimize2,
    relatedIds: [4, 6],
    status: "completed",
    energy: 85,
  },
  {
    id: 4,
    title: "Excellence visuelle",
    date: "Axe 4",
    content: "Direction artistique haut de gamme avec une obsession pour les détails parfaits.",
    category: "Visuel",
    icon: Eye,
    relatedIds: [1, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 5,
    title: "Culture digitale",
    date: "Axe 5",
    content: "Compréhension profonde des codes et des usages d'internet et des réseaux.",
    category: "Culture",
    icon: Globe,
    relatedIds: [2, 6],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 6,
    title: "Expérience utilisateur",
    date: "Axe 6",
    content: "Parcours utilisateur fluide, intuitif et sans friction pour maximiser la conversion.",
    category: "Design",
    icon: User,
    relatedIds: [3, 5],
    status: "completed",
    energy: 90,
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="vision" ref={containerRef} className="relative w-full py-16 bg-deep border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-chrome font-sans tracking-[0.3em] uppercase text-xs mb-6 block">Le Modèle Noxen</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-offwhite leading-[1.1]">
              Créer l’impact <br className="hidden md:block"/> 
              <span className="text-chrome">digital</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-chrome/80">
            Créer des expériences digitales premium qui fusionnent créativité, culture et technologie afin d’aider les marques modernes à se démarquer.
          </p>
        </div>

        {/* Timeline Effect Section */}
        <div className="relative flex min-h-[600px] w-full items-center justify-center py-20">
          <RadialOrbitalTimeline timelineData={timelineData} />
          <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

      </div>
    </section>
  );
}
