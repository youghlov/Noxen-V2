import { motion } from "motion/react";
import { useState } from "react";

export function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleFocus = (name: string) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const servicesOptions = [
    "Branding Tech",
    "Web Immersif",
    "Contenu Digital",
    "UI/UX Luxe"
  ];

  return (
    <section id="contact" className="relative w-full min-h-screen py-16 bg-deep flex items-center justify-center overflow-hidden">
      
      {/* Animated Subtle Grid Lines inside a Neural-like network */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
        {/* Animated moving scanline */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-light text-4xl md:text-5xl uppercase tracking-widest text-offwhite mb-4">
            Initier le <span className="font-bold text-gradient-chrome">Contact</span>
          </h2>
          <p className="font-sans text-chrome/60 text-sm">Prêt à dominer votre marché ? Parlez-nous de votre vision.</p>
        </div>

        <motion.form 
          className="glass-panel p-8 md:p-12 rounded-3xl relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-8">
            <InputField 
              name="name" 
              type="text" 
              label="Nom / Entreprise" 
              isFocused={focusedInput === 'name'} 
              onFocus={() => handleFocus('name')} 
              onBlur={handleBlur} 
            />
            <InputField 
              name="email" 
              type="email" 
              label="Email de contact" 
              isFocused={focusedInput === 'email'} 
              onFocus={() => handleFocus('email')} 
              onBlur={handleBlur} 
            />

            {/* Services Multi-Select */}
            <div className="flex flex-col gap-4">
              <label className="font-sans tracking-wider uppercase text-xs text-chrome/40">
                Services Requis
              </label>
              <div className="flex flex-wrap gap-2">
                {servicesOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 rounded-full border border-white/10 text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                      selectedServices.includes(service)
                        ? "bg-chrome text-deep border-chrome"
                        : "text-offwhite/70 hover:border-chrome/50 hover:text-offwhite"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full">
              <label 
                className={`absolute left-0 transition-all duration-300 font-sans tracking-wider uppercase text-xs pointer-events-none ${focusedInput === 'project' ? '-top-5 text-chrome' : 'top-2 text-chrome/40'}`}
              >
                Votre Projet
              </label>
              <textarea 
                rows={4}
                className="w-full bg-transparent border-b border-white/10 text-offwhite font-sans text-sm pb-2 pt-2 focus:outline-none resize-none"
                onFocus={() => handleFocus('project')}
                onBlur={handleBlur}
              />
              {/* Focus bottom line animation */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-chrome origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedInput === 'project' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <button className="w-full mt-4 py-4 border border-chrome/30 text-chrome font-sans uppercase tracking-[0.2em] text-xs hover:bg-offwhite hover:text-deep transition-all duration-300 magnetic rounded-full relative overflow-hidden group">
              <span className="relative z-10 transition-colors">Transmettre</span>
              <div className="absolute inset-0 bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function InputField({ name, type, label, isFocused, onFocus, onBlur }: { name: string, type: string, label: string, isFocused: boolean, onFocus: () => void, onBlur: () => void }) {
  return (
    <div className="relative w-full">
      <label 
        className={`absolute left-0 transition-all duration-300 font-sans tracking-wider uppercase text-xs pointer-events-none ${isFocused ? '-top-5 text-chrome' : 'top-2 text-chrome/40'}`}
      >
        {label}
      </label>
      <input 
        type={type} 
        className="w-full bg-transparent border-b border-white/10 text-offwhite font-sans text-sm pb-2 pt-2 focus:outline-none"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {/* Focus bottom line animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-chrome origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Subtle glow effect when focused */}
      {isFocused && (
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[10px] bg-blue-500/20 blur-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
