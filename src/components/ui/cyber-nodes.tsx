import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState } from "react";
import type { TimelineItem } from "./radial-orbital-timeline";

export default function CyberNodes({ timelineData }: { timelineData: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start top", "end bottom"]
  });

  const pathHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="relative w-full max-w-5xl mx-auto py-32 flex flex-col" ref={containerRef}>
      {/* Central Laser Line Background */}
      <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2 z-0"></div>
      
      {/* Active Laser Line */}
      <motion.div 
        className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-noxen md:-translate-x-1/2 z-10 origin-top shadow-[0_0_15px_#F6851F]"
        style={{ scaleY: pathHeight }}
      />
      
      {timelineData.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <NodeItem key={item.id} item={item} index={index} isEven={isEven} />
        );
      })}
    </div>
  );
}

function NodeItem({ item, index, isEven }: { item: TimelineItem; index: number; isEven: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 50%"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className={`relative w-full flex flex-col md:flex-row items-center mb-16 md:mb-32 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spacer for structural balance on Desktop */}
      <div className="hidden md:block md:w-1/2"></div>

      {/* Central Node Dot */}
      <div className="absolute left-[24px] md:left-1/2 w-4 h-4 md:-translate-x-1/2 bg-deep border-2 border-chrome/30 z-20 rotate-45 transform-gpu transition-all duration-500 overflow-hidden group-hover:border-noxen">
        <motion.div 
          className="absolute inset-0 bg-noxen shadow-[0_0_15px_#F6851F]" 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Connecting line to card on desktop */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[10%] h-[1px] bg-white/10 z-10 ${isEven ? 'right-[40%] origin-left' : 'left-[40%] origin-right'}`}>
        <motion.div 
          className="w-full h-full bg-noxen origin-left shadow-[0_0_10px_#F6851F]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-5/12 flex relative z-30 ${isEven ? 'md:justify-start pl-[60px] md:pl-0 md:mr-[10%]' : 'md:justify-end pr-[60px] md:pr-0 md:ml-[10%] pl-[60px]'}`}>
        <motion.div 
          style={{ scale }}
          className="relative group p-8 border border-white/10 bg-white/[0.01] backdrop-blur-md overflow-hidden hover:border-noxen/40 transition-all duration-500 w-full cursor-crosshair transform-gpu"
        >
          {/* Techy background patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-noxen/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 bg-noxen blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
          
          <div className="relative z-10 flex flex-col items-start gap-6">
             <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center p-3 border border-white/10 bg-black/40 text-chrome/70 group-hover:text-noxen group-hover:border-noxen/50 transition-colors duration-500 shadow-inner overflow-hidden relative">
                   <div className="absolute inset-0 bg-noxen/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                   <item.icon className="w-6 h-6 relative z-10 drop-shadow-[0_0_10px_rgba(246,133,31,0)] group-hover:drop-shadow-[0_0_10px_rgba(246,133,31,0.5)]" strokeWidth={1.2} />
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-chrome/50 group-hover:text-noxen transition-colors duration-500 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <span className="w-1.5 h-1.5 bg-noxen opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 rotate-45 shadow-[0_0_8px_#F6851F]" />
                  SYS_v.{index + 1}0
                </div>
             </div>
             
             <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-offwhite group-hover:text-white transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm font-light text-chrome/70 leading-relaxed group-hover:text-chrome transition-colors">
                  {item.content}
                </p>
             </div>
          </div>
          
          {/* Decorative Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/30 group-hover:border-noxen transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-chrome/30 group-hover:border-noxen transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-chrome/30 group-hover:border-noxen transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/30 group-hover:border-noxen transition-colors duration-300" />

          {/* Glitch line effect */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-noxen w-0 group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_12px_#F6851F]" />
        </motion.div>
      </div>
      
    </motion.div>
  );
}
