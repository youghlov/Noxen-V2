import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

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
        className="absolute inset-0 bg-texture z-0 pointer-events-none"
        style={{ y: yBg }}
      >
        {/* Cinematic reflections / lighting gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0A1428_0%,transparent_70%)] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-chrome opacity-5 blur-[120px] rounded-full rotate-12"></div>
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
        {/* Logo / Shape */}
        <motion.div 
          className="mb-12 w-24 h-24 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0 border-[0.5px] border-chrome/40"
            animate={{ rotate: 360, borderRadius: ["0%", "50%", "25%", "0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 border-[0.5px] border-chrome/20"
            animate={{ rotate: -360, borderRadius: ["50%", "0%", "50%", "50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="font-display font-medium text-xl tracking-[0.4em] text-offwhite ml-2">
            N
          </h2>
        </motion.div>

        {/* Title */}
        <motion.div
          variants={textRevealContainer}
          initial="hidden"
          animate="visible"
          className="overflow-hidden flex flex-wrap justify-center font-display font-black text-[15vw] md:text-[110px] leading-[0.9] tracking-tighter uppercase max-w-[90vw]"
        >
          {Array.from("Digital Experiences").map((letter, index) => (
            <motion.span 
              variants={textRevealChild} 
              key={`w1_${index}`}
              className={letter === " " ? "w-6 md:w-10" : "text-offwhite relative group"}
            >
              {letter}
            </motion.span>
          ))}
          <div className="w-full h-2 md:h-4" /> {/* Line Break */}
          {Array.from("Premium").map((letter, index) => (
             <motion.span 
             variants={textRevealChild} 
             key={`w2_${index}`}
             className="text-gradient-chrome"
           >
             {letter}
           </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 max-w-xl text-chrome text-sm leading-relaxed tracking-wide font-light"
        >
          Branding, design, contenu digital, et web immersif. Production visuelle tech-assistée pour l'avant-garde.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-16"
        >
          <MagneticButton>
            <div className="group relative">
               <div className="absolute inset-0 bg-midnight blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <button className="magnetic relative px-10 py-4 bg-offwhite text-deep text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4 transition-transform duration-300">
                 <span className="relative z-10 flex items-center gap-2">
                   Découvrir l'Agence
                   <motion.span
                     animate={{ x: [0, 5, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                   >
                     →
                   </motion.span>
                 </span>
               </button>
             </div>
          </MagneticButton>
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

// Magnetic Button Wrapper
function MagneticButton({ children }: { children: React.ReactElement }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
