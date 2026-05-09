import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

const projects = [
  { id: 1, title: "AURA LUXURY", client: "Automotive", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800", color: "#0A1428" },
  { id: 2, title: "NEURAL FINTECH", client: "Banking App", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", color: "#111" },
  { id: 3, title: "Maison V", client: "Fashion E-com", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800", color: "#1A1A1A" },
  { id: 4, title: "KINETIC", client: "Web3 Protocol", image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800", color: "#0A0A0A" }
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projets" ref={containerRef} className="relative w-full py-32 bg-deep overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h3 className="font-display text-5xl md:text-8xl tracking-tighter uppercase font-bold text-transparent" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
          Selected Works
        </h3>
      </div>

      {/* Infinite Horizontal Carousel area (simulated via scroll-linked transform for simplicity in integration, with drag capabilities inside) */}
      <div className="relative h-[600px] w-full flex items-center">
        <motion.div 
          className="flex gap-12 sm:gap-24 px-12 md:px-[20vw] items-center cursor-grab active:cursor-grabbing w-max isolate"
          style={{ x: xOffset }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.1}
        >
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              className="relative w-[280px] h-[500px] sm:w-[360px] sm:h-[600px] flex-shrink-0 group magnetic"
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
            >
              <div 
                className="absolute inset-0 bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col justify-end overflow-hidden" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Mockup Container */}
                <motion.div 
                  className="absolute top-10 left-6 right-6 bottom-32 rounded-xl overflow-hidden shadow-2xl z-10 origin-bottom"
                  animate={{ 
                    rotateY: [0, -10, 0, 10, 0],
                    rotateX: [0, 5, 0, 5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 15 + idx * 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformStyle: 'preserve-3d', __transformPerspective: 1000 } as any}
                >
                  {/* Phone frame simulation */}
                  <div className="absolute inset-0 border-[6px] border-anthracite rounded-xl z-20 pointer-events-none mix-blend-overlay" />
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover scale-110"
                    layoutId={`image-${project.id}`}
                  />
                  {/* Glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-30 pointer-events-none" />
                </motion.div>

                {/* Info Text */}
                <div className="relative z-20 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
                  <motion.p layoutId={`client-${project.id}`} className="font-sans text-xs tracking-[0.2em] uppercase text-chrome/60 mb-2">
                    {project.client}
                  </motion.p>
                  <motion.h4 layoutId={`title-${project.id}`} className="font-display text-2xl font-semibold uppercase tracking-wider text-offwhite">
                    {project.title}
                  </motion.h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox with Warp transition */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            <button 
              className="absolute top-8 right-8 text-white font-sans text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-deep transition-colors z-50 magnetic"
              onClick={() => setSelectedId(null)}
            >
              Fermer
            </button>

            <motion.div 
              className="relative w-[90vw] h-[80vh] md:w-[70vw] rounded-2xl overflow-hidden flex"
              layoutId={`card-container-${selectedProject.id}`}
              style={{ backgroundColor: selectedProject.color }}
            >
              <div className="flex-1 relative h-full">
                 <motion.img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    layoutId={`image-${selectedProject.id}`}
                  />
              </div>
              <div className="w-[400px] p-12 flex flex-col justify-center border-l border-white/5 hidden md:flex">
                  <motion.p layoutId={`client-${selectedProject.id}`} className="font-sans text-xs tracking-[0.2em] uppercase text-chrome/60 mb-4">
                    {selectedProject.client}
                  </motion.p>
                  <motion.h4 layoutId={`title-${selectedProject.id}`} className="font-display text-4xl font-semibold uppercase tracking-wider text-offwhite mb-8">
                    {selectedProject.title}
                  </motion.h4>
                  <p className="font-sans text-sm font-light text-chrome/80 leading-relaxed mb-8">
                    Déploiement d'une architecture full-stack avec rendu web immersif. Optimisation des performances à 60fps et design system complet.
                  </p>
                  <a href="#" className="font-sans text-xs tracking-widest uppercase border-b border-chrome pb-1 self-start hover:text-white transition-colors">
                    Voir l'étude de cas
                  </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}
