import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageAutoSlider } from "./ui/image-auto-slider";

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="projets" 
      ref={containerRef} 
      className="relative z-10 w-full py-16 bg-deep border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-chrome mb-4 block">Projets</span>
            <h3 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-offwhite max-w-2xl">
              Des Identités Pensées<br className="hidden md:block" /> <span className="text-noxen drop-shadow-[0_0_15px_rgba(246,133,31,0.5)]">Pour Demain.</span>
            </h3>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-chrome/80 mt-6 md:mt-0 text-left md:text-right">
            Chaque projet est conçu comme une expérience visuelle immersive mêlant créativité, stratégie et innovation.
          </p>
        </div>
      </div>
      
      <ImageAutoSlider />

    </section>
  );
}


