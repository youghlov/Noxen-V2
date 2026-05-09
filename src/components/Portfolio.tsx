import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageAutoSlider } from "./ui/image-auto-slider";

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="portfolio" 
      ref={containerRef} 
      className="relative z-10 w-full py-32 bg-deep border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-chrome mb-4 block">Archive</span>
            <h3 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-offwhite">
              Selected Works
            </h3>
          </div>
          <button className="px-6 py-2 border border-chrome text-[10px] uppercase tracking-widest hover:bg-offwhite hover:text-deep transition-all duration-300 mt-6 md:mt-0 magnetic">
            Voir Tout
          </button>
        </div>
      </div>
      
      <ImageAutoSlider />

    </section>
  );
}


