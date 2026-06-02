import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Wait slightly at 100% for aesthetic closure
          return 100;
        }
        // Random increments for a mechanical tech feel
        return prev + Math.floor(Math.random() * 12) + 3;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-deep flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-noxen/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 w-full max-w-md">
        
        {/* Core Animation Container */}
        <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
          
          {/* Outer Rotating Ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-chrome/10 border-t-noxen/60 border-b-noxen/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />

          {/* Inner Rotating Dashed Ring */}
          <motion.div 
            className="absolute inset-6 rounded-full border border-dashed border-chrome/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          />

          {/* Central Logo */}
          <motion.div
            className="relative z-10 h-20 flex items-center justify-center overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              filter: [
                "drop-shadow(0 0 0px #F6851F)", 
                "drop-shadow(0 0 20px rgba(246,133,31,0.6))", 
                "drop-shadow(0 0 0px #F6851F)"
              ] 
            }}
            transition={{ 
              scale: { duration: 1, ease: "easeOut" },
              opacity: { duration: 1 },
              filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img 
              src="/logo.svg" 
              alt="Noxen Logo" 
              className="h-full w-auto object-contain relative z-10"
            />
            
            {/* Tech Scanline Effect */}
            <motion.div 
              className="absolute left-0 right-0 h-[10%] bg-gradient-to-b from-transparent via-noxen to-transparent opacity-40 z-20 mix-blend-screen"
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Text */}
        <div className="font-display uppercase tracking-[0.4em] text-[10px] text-chrome mb-6 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-noxen animate-pulse shadow-[0_0_8px_#F6851F]"></span>
          Initialisation Système
        </div>

        {/* Futuristic Progress Bar */}
        <div className="w-64 h-[1px] bg-chrome/20 relative overflow-visible rounded-full">
          {/* Active Progress */}
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-noxen/20 to-noxen shadow-[0_0_15px_#F6851F]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "circOut", duration: 0.3 }}
          />
          {/* Glowing dot at the end of progress */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white,0_0_20px_#F6851F]"
            initial={{ left: "0%" }}
            animate={{ left: `calc(${progress}% - 4px)` }}
            transition={{ ease: "circOut", duration: 0.3 }}
          />
        </div>
        
        {/* Terminal/Data Readout Details */}
        <div className="flex justify-between w-64 mt-4 font-mono text-[10px] tracking-widest">
          <span className="text-chrome/40">SYS.BOOT.V3</span>
          <span className="text-noxen font-bold drop-shadow-[0_0_5px_rgba(246,133,31,0.5)]">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
