import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const projects = [
  { id: 1, title: "AURA LUXURY", category: "Branding & Immersive", year: "2024", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "NEURAL FINTECH", category: "Web App", year: "2024", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "MAISON V", category: "E-Commerce", year: "2023", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "KINETIC", category: "Protocol Design", year: "2023", image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800" }
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="portfolio" 
      ref={containerRef} 
      className="relative z-10 w-full py-32 bg-deep border-t border-white/5"
    >
      <div className="max-w-[1024px] mx-auto px-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/5 bg-anthracite/20">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <a 
      ref={cardRef}
      href="#"
      className="group relative h-[450px] border-r border-b border-white/5 overflow-hidden flex flex-col justify-between p-8 hover:bg-white/5 transition-colors duration-500 cursor-crosshair"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="w-full h-[120%] absolute -top-[10%]"
          style={{ y: yParallax }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent group-hover:from-deep/60 transition-colors duration-500"></div>
      </div>
      
      <div className="relative z-10 flex justify-between items-start">
        <span className="font-sans text-chrome text-[10px] uppercase tracking-widest">
          0{idx + 1}
        </span>
        <span className="font-sans text-chrome/50 text-[10px] uppercase tracking-widest">
          {project.year}
        </span>
      </div>
      
      <div className="relative z-10 flex flex-col items-start">
        <span className="font-sans text-chrome text-[10px] uppercase tracking-widest mb-3">
          {project.category}
        </span>
        <h4 className="font-display text-3xl font-bold uppercase tracking-wide text-offwhite group-hover:text-white transition-colors duration-300 mb-4 group-hover:translate-x-2 transform-gpu">
          {project.title}
        </h4>
        <div className="w-8 h-[1px] bg-chrome group-hover:w-full transition-all duration-700 ease-in-out" />
      </div>
    </a>
  );
}
