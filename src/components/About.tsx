import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const milestones = [
  { year: "Vision", text: "Nous croyons que l'interface est le nouveau lieu de culte des marques. Chaque interaction doit être un événement." },
  { year: "Method", text: "Design behavioriel couplé à une architecture full-stack robuste. Nous ne faisons pas de sites, nous forgeons des expériences." },
  { year: "Result", text: "Des métriques augmentées, un engagement sublimé, une identité ancrée dans l'avant-garde numérique." }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="vision" ref={containerRef} className="relative w-full py-40 bg-deep overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative flex flex-col items-center">
        
        <div className="mb-32 text-center w-full">
          <h2 className="font-display text-3xl md:text-5xl font-light uppercase tracking-widest text-offwhite">
            <span className="text-chrome/30 block mb-4 text-sm font-sans tracking-[0.3em]">Manifesto</span>
            L'Exclusivité <br className="hidden md:block"/> par le <span className="font-bold text-gradient-chrome">Code</span>
          </h2>
        </div>

        <div className="relative w-full mt-10 pl-8 md:pl-0">
          {/* Main Track line */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
          
          {/* Active Track line (progress) */}
          <motion.div 
            className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-chrome to-transparent -translate-x-1/2 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col gap-32">
            {milestones.map((item, i) => (
              <TimelineNode key={i} item={item} index={i} total={milestones.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ item, index, total, progress }: { item: any, index: number, total: number, progress: any }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { margin: "-20%", once: false });
  const isLeft = index % 2 === 0;

  // Typewriter effect state
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isInView) {
      let currentIndex = 0;
      const type = () => {
        if (currentIndex <= item.text.length) {
          setDisplayText(item.text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, 20); // typing speed
        }
      };
      type();
    } else {
      setDisplayText(""); // reset when out of view
    }
    return () => clearTimeout(timeout);
  }, [isInView, item.text]);

  return (
    <div ref={nodeRef} className={`relative flex items-center w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
      
      {/* Node Content */}
      <div className={`w-full md:w-[45%] flex flex-col ${isLeft ? "items-start md:items-end text-left md:text-right" : "items-start text-left"}`}>
        <motion.span 
          className="font-display font-medium text-chrome tracking-widest uppercase mb-4 text-xs"
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {item.year}
        </motion.span>
        
        <p className="font-sans font-light text-offwhite leading-relaxed text-sm md:text-base min-h-[80px]">
          {displayText}
          <motion.span 
            className="inline-block w-[6px] h-[1em] bg-chrome ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </p>
      </div>

      {/* Chrome Node Indicator */}
      <motion.div 
        className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-deep border-2 border-white/20 -translate-x-[7px] md:-translate-x-1/2 flex items-center justify-center z-10"
        initial={{ borderColor: "rgba(255,255,255,0.2)", scale: 1 }}
        animate={isInView ? { 
          borderColor: "rgba(224,224,224,1)", 
          boxShadow: "0 0 20px rgba(224,224,224,0.4)",
          scale: 1.2
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-chrome"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
        />
      </motion.div>
      
    </div>
  );
}
