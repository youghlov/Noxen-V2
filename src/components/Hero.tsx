import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Hexagon, Layers, Aperture, Code } from "lucide-react";

const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.5 * i },
  }),
};

const textRevealChild = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Texture & Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none bg-deep"
        style={{ y: yBg }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          {/* Futuristic Digital Network requested by user */}
          <source src="https://videos.pexels.com/video-files/30767274/13161041_1920_1080_30fps.mp4" type="video/mp4" />
        </video>

        {/* Cinematic reflections / lighting gradients */}
        <div className="absolute inset-0 bg-deep/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0A1428_0%,transparent_70%)] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-chrome opacity-10 blur-[120px] rounded-full rotate-12"></div>
      </motion.div>

      {/* Floating Particles (Low density) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-chrome/30 to-offwhite/10 blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -Math.random() * 150 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6 text-center"
        style={{ opacity: opacityText }}
      >
        {/* Title */}
        <motion.div
           variants={textRevealContainer}
           initial="hidden"
           animate="visible"
           className="flex flex-col items-center justify-center font-display font-black text-[10vw] md:text-[90px] leading-[0.9] tracking-tighter uppercase max-w-[90vw] glitch-text gap-2 md:gap-0"
         >
           <div className="flex flex-wrap justify-center">
             {Array.from("L'expérience").map((letter, index) => (
               <motion.span 
                 variants={textRevealChild} 
                 key={`w0_${index}`}
                 className={letter === " " || letter === "'" ? "w-4 md:w-6 flex-shrink-0" : "text-offwhite relative group"}
               >
                 {letter}
               </motion.span>
             ))}
           </div>
           
           <div className="flex flex-wrap justify-center">
             {Array.from("digitale").map((letter, index) => (
               <motion.span 
                 variants={textRevealChild} 
                 key={`w1_${index}`}
                 className={letter === " " ? "w-6 md:w-8 flex-shrink-0" : "text-offwhite relative group"}
               >
                 {letter}
               </motion.span>
             ))}
           </div>
           
           <div className="flex flex-wrap justify-center">
             {Array.from("Premium").map((letter, index) => (
               <motion.span 
                 variants={textRevealChild} 
                 key={`w2_${index}`}
                 className="text-noxen drop-shadow-[0_0_15px_rgba(246,133,31,0.5)]"
               >
                 {letter}
               </motion.span>
             ))}
           </div>
         </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 max-w-xl text-chrome text-sm leading-relaxed tracking-wide font-light"
        >
          Branding, design, contenu digital, et web immersif. Production visuelle tech-assistée pour l'avant-garde.
        </motion.p>

        {/* Services Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12"
        >
          {/* Branding */}
          <div className="flex flex-col items-center gap-4 group cursor-crosshair">
             <div className="w-16 h-16 border border-white/10 group-hover:border-noxen/50 flex items-center justify-center bg-anthracite/10 backdrop-blur-md transition-all duration-500">
               <Hexagon className="w-6 h-6 text-chrome group-hover:text-noxen transition-colors duration-500" strokeWidth={1} />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-chrome/60 group-hover:text-noxen font-sans transition-colors duration-500">Branding</span>
          </div>
          {/* Design UI/UX */}
          <div className="flex flex-col items-center gap-4 group cursor-crosshair">
             <div className="w-16 h-16 border border-white/10 group-hover:border-noxen/50 flex items-center justify-center bg-anthracite/10 backdrop-blur-md transition-all duration-500">
               <Layers className="w-6 h-6 text-chrome group-hover:text-noxen transition-colors duration-500" strokeWidth={1} />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-chrome/60 group-hover:text-noxen font-sans transition-colors duration-500">UI/UX Luxe</span>
          </div>
          {/* Contenu Digital */}
          <div className="flex flex-col items-center gap-4 group cursor-crosshair">
             <div className="w-16 h-16 border border-white/10 group-hover:border-noxen/50 flex items-center justify-center bg-anthracite/10 backdrop-blur-md transition-all duration-500">
               <Aperture className="w-6 h-6 text-chrome group-hover:text-noxen transition-colors duration-500" strokeWidth={1} />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-chrome/60 group-hover:text-noxen font-sans transition-colors duration-500">Contenu</span>
          </div>
          {/* Web Immersif */}
          <div className="flex flex-col items-center gap-4 group cursor-crosshair">
             <div className="w-16 h-16 border border-white/10 group-hover:border-noxen/50 flex items-center justify-center bg-anthracite/10 backdrop-blur-md transition-all duration-500">
               <Code className="w-6 h-6 text-chrome group-hover:text-noxen transition-colors duration-500" strokeWidth={1} />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-chrome/60 group-hover:text-noxen font-sans transition-colors duration-500">Immersif</span>
          </div>
        </motion.div>

      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-chrome">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-chrome to-transparent" />
      </motion.div>

    </section>
  );
}
