import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative z-10 px-6 md:px-12 py-6 border-t border-white/5 bg-deep text-[9px] uppercase tracking-[0.2em] text-white/30 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="tracking-[0.3em] font-medium text-white/50">Noxen Digital Agency &copy; {new Date().getFullYear()} — Algérie | Blida</div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors block">Instagram</a>
          <a href="https://www.behance.net/noxen" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">Behance</a>
          <a href="https://www.linkedin.com/company/noxen-digial-agency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">LinkedIn</a>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-midnight border border-noxen shadow-[0_0_8px_#F6851F] animate-pulse"></div>
          <span>Système Opérationnel</span>
        </div>
      </div>
    </footer>
  );
}
