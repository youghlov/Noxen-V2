import { motion, useInView } from "motion/react";
import { useRef, MouseEvent } from "react";
import { Fingerprint, Cuboid, Sparkles, LayoutTemplate } from "lucide-react";

const services = [
  {
    Icon: Fingerprint,
    title: "Branding Tech",
    desc: "Identités visuelles générées et optimisées pour le digital. Systèmes de design évolutifs.",
  },
  {
    Icon: Cuboid,
    title: "Web Immersif",
    desc: "Expériences Awwwards-winning avec WebGL, Three.js et animations GSAP fluides.",
  },
  {
    Icon: Sparkles,
    title: "Contenu Digital",
    desc: "Production visuelle premium, motion design 3D et assets IA créatifs.",
  },
  {
    Icon: LayoutTemplate,
    title: "UI/UX Luxe",
    desc: "Interfaces minimalistes, parcours utilisateurs millimétrés et design behavioriel.",
  }
];

export function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="relative w-full min-h-screen py-16 bg-deep text-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-midnight rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h3 
              className="font-sans text-chrome uppercase tracking-[0.2em] text-xs font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Notre Expertise
            </motion.h3>
            <motion.h2 
              className="font-display text-4xl md:text-6xl uppercase tracking-tighter font-light leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Créativité<br /><span className="font-bold text-gradient-chrome">Augmentée</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-chrome/70 max-w-sm font-sans font-light text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nous fusionnons direction artistique luxe et technologies de pointe pour créer des écosystèmes digitaux exclusifs.
          </motion.p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/5 bg-anthracite/50 backdrop-blur-md">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, isInView }: { service: any, index: number, isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Custom simple tilt effect using Framer Motion
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Light effect tracking cursor
    const light = cardRef.current.querySelector('.card-light') as HTMLElement;
    if (light) {
      light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05) 0%, transparent 50%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const light = cardRef.current.querySelector('.card-light') as HTMLElement;
    if (light) {
      light.style.background = 'transparent';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative group h-[300px]"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="magnetic w-full h-full p-8 border-r border-b border-white/5 bg-transparent hover:bg-white/5 transition-colors duration-500 ease-out flex flex-col justify-between overflow-hidden z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hover Light specific effect */}
        <div className="card-light absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen" />
        
        <div className="flex flex-col transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <div className="text-chrome/50 group-hover:text-chrome transition-colors duration-500 mb-6 block">
            <service.Icon className="w-8 h-8" strokeWidth={1} />
          </div>
          <h3 className="font-display text-lg font-bold uppercase mb-2 text-offwhite group-hover:text-white transition-colors duration-500">
            {service.title}
          </h3>
          <div className="w-8 h-[1px] bg-chrome group-hover:w-full transition-all duration-500" />
        </div>

        <div className="transform-gpu mt-4" style={{ transform: 'translateZ(50px)' }}>
          <p className="font-sans text-sm text-chrome/60 max-w-sm transition-all duration-500">
            {service.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
