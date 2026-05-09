import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";

const features = [
  { 
    id: "01",
    title: "Vision", 
    desc: "Nous croyons que l'interface est le nouveau lieu de culte des marques. Chaque interaction doit être un événement." 
  },
  { 
    id: "02",
    title: "Méthode", 
    desc: "Design behavioriel couplé à une architecture full-stack robuste. Nous ne faisons pas de sites, nous forgeons des expériences." 
  },
  { 
    id: "03",
    title: "Résultat", 
    desc: "Des métriques augmentées, un engagement sublimé, une identité ancrée dans l'avant-garde numérique." 
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="vision" ref={containerRef} className="relative w-full py-40 mb-20 bg-deep border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-chrome font-sans tracking-[0.3em] uppercase text-xs mb-6 block">Le Modèle Noxen</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-offwhite leading-[1.1]">
              L'Exigence <br className="hidden md:block"/> 
              <span className="text-chrome">par le Code</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-chrome/80">
            Une approche radicale qui fusionne ingénierie de précision et direction artistique d'avant-garde pour concevoir les standards de demain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className="bg-anthracite/30 border border-white/5 p-10 flex flex-col justify-between min-h-[320px] group hover:bg-white/5 transition-all duration-500"
            >
              <div className="font-sans text-xs text-chrome/50 tracking-widest">{feature.id}</div>
              
              <div>
                <h3 className="font-display text-2xl uppercase text-offwhite font-bold mb-6 group-hover:translate-x-2 transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-chrome group-hover:text-chrome/90 transition-colors">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
