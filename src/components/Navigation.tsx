import { motion } from "motion/react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Accueil", href: "#" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projets", href: "#projets" },
  { name: "Vision", href: "#vision" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-[50] flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-500 ${
          scrolled ? "bg-deep/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="font-display font-bold tracking-[0.4em] uppercase text-xl text-offwhite flex items-center gap-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="w-7 h-7 text-offwhite">
            <path d="M5 21V3l14 18V3" />
          </svg>
          <span className="hidden sm:inline">Noxen</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium items-center">
          {navItems.map((item, i) => (
            <a 
              key={i} 
              href={item.href}
              className={`relative group font-sans ${i === 0 ? "text-offwhite border-b border-offwhite pb-1" : "text-offwhite/40 hover:text-offwhite transition-colors"}`}
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 border border-chrome text-[10px] uppercase tracking-widest hover:bg-offwhite hover:text-deep transition-all duration-300 ml-4 magnetic">
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-[6px] w-8 magnetic z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div 
            className="w-full h-[1px] bg-white origin-right"
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 5 : 0 }}
          />
          <motion.div 
            className="w-full h-[1px] bg-white"
            animate={{ opacity: isOpen ? 0 : 1 }}
          />
          <motion.div 
            className="w-full h-[1px] bg-white origin-right"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? -5 : 0 }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        className="fixed inset-0 bg-deep z-[40] flex flex-col items-center justify-center pointer-events-none"
        initial={{ clipPath: "circle(0% at 100% 0)" }}
        animate={{ clipPath: isOpen ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-display font-light text-3xl tracking-wide uppercase text-offwhite hover:text-chrome transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: isOpen ? 0.3 + i * 0.1 : 0 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
