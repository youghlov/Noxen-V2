import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Wait a bit after reaching 100%
          return 100;
        }
        // Random increments for a more organic feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-deep flex flex-col items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        clipPath: "circle(150% at 50% 50%)",
        transition: { duration: 1, ease: "easeInOut" }
      }}
      animate={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Minimalist Logo Animation */}
        <motion.div 
          className="w-16 h-16 mb-12 flex items-center justify-center overflow-visible"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="w-16 h-16 text-offwhite">
            <motion.path 
              d="M5 21V3l14 18V3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </motion.div>

        {/* Text */}
        <div className="font-display uppercase tracking-[0.3em] text-xs text-chrome/50 mb-4">
          Initiating sequence
        </div>

        {/* Futuristic Progress Bar */}
        <div className="w-64 h-[2px] bg-anthracite relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-chrome shadow-[0_0_10px_rgba(224,224,224,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "circOut", duration: 0.2 }}
          />
        </div>
        
        {/* Number */}
        <div className="mt-4 font-display font-light text-sm tracking-widest text-offwhite w-12 text-center">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </motion.div>
  );
}
