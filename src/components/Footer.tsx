import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative z-10 px-6 md:px-12 py-6 border-t border-white/5 bg-deep text-[9px] uppercase tracking-[0.2em] text-white/30 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="tracking-[0.3em] font-medium text-white/50">Noxen Digital Agency &copy; {new Date().getFullYear()} — Paris / London</div>

        <div className="flex gap-6 cursor-crosshair">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Behance</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-midnight border border-blue-500/50 shadow-[0_0_8px_#0055ff]"></div>
          <span>Système Opérationnel</span>
        </div>
      </div>
    </footer>
  );
}
