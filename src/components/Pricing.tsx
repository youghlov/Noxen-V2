import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "NOXEN START",
    basePrice: 23000,
    features: [
      "Suivi Facebook & Instagram",
      "8 publications par mois",
      "Création graphique incluse",
      "Rédaction des publications",
      "Calendrier éditorial mensuel",
      "Rapport mensuel de performance",
    ],
    highlighted: false,
  },
  {
    name: "NOXEN GROWTH",
    badge: "⭐",
    basePrice: 35000,
    features: [
      "Suivi Facebook, Instagram & TikTok",
      "16 publications par mois",
      "4 Reels vidéos par mois",
      "Création graphique premium",
      "Rédaction optimisée des contenus",
      "Calendrier éditorial stratégique",
      "Rapport détaillé de performance",
    ],
    highlighted: true,
  },
  {
    name: "NOXEN ELITE",
    basePrice: 67000,
    features: [
      "Suivi Facebook, Instagram, TikTok & LinkedIn",
      "20 publications par mois",
      "6 Reels vidéos par mois",
      "Création graphique avancée",
      "Stratégie de contenu personnalisée",
      "Rapport KPI avancé",
      "Réunion stratégique mensuelle",
      "Suivi des campagnes publicitaires (budget publicitaire non inclus)",
    ],
    highlighted: false,
  }
];

export function Pricing() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative w-full py-24 bg-deep/95 text-white border-t border-white/5 overflow-hidden">
       {/* Background ambient lighting */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-noxen/5 via-transparent to-transparent opacity-60 pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
          <div className="text-center mb-12 flex flex-col items-center">
            <motion.h3 
              className="font-sans text-chrome uppercase tracking-[0.2em] text-xs font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Nos Offres Réseaux Sociaux
            </motion.h3>
            <motion.h2 
              className="font-display text-4xl md:text-5xl uppercase tracking-tighter font-light leading-tight mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Forfaits <span className="font-bold text-noxen drop-shadow-[0_0_15px_rgba(246,133,31,0.3)]">Mensuels</span>
            </motion.h2>
          </div>

          {/* Billing Cycle Toggle */}
          <motion.div 
            className="flex justify-center mb-16 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 md:gap-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 ${!isAnnual ? 'bg-noxen text-deep font-bold shadow-[0_0_15px_rgba(246,133,31,0.5)]' : 'text-chrome hover:text-white'}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 md:px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-noxen text-deep font-bold shadow-[0_0_15px_rgba(246,133,31,0.5)]' : 'text-chrome hover:text-white'}`}
              >
                Annuel
                <span className={`text-[9px] px-2 py-0.5 rounded-full border ${isAnnual ? 'border-deep/30 bg-deep/10' : 'border-noxen/50 text-noxen bg-noxen/10 shadow-[0_0_8px_rgba(246,133,31,0.2)]'}`}>-30%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:items-stretch">
            {pricingTiers.map((tier, index) => (
               <PricingCard key={index} tier={tier} index={index} isInView={isInView} isAnnual={isAnnual} />
            ))}
          </div>
       </div>
    </section>
  );
}

function PricingCard({ tier, index, isInView, isAnnual }: { tier: any, index: number, isInView: boolean, isAnnual: boolean }) {
  const currentPrice = isAnnual ? tier.basePrice * 0.7 : tier.basePrice;
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(currentPrice).replace(',', ' ');
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group flex flex-col p-8 md:p-10 border overflow-hidden backdrop-blur-md transition-all duration-500
        ${tier.highlighted 
          ? "border-noxen/50 bg-noxen/5 shadow-[0_0_30px_rgba(246,133,31,0.15)] scale-100 lg:scale-105 z-20" 
          : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02] z-10"
        }
      `}
    >
       {/* Tech grid background pattern */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
       
       {tier.highlighted && (
         <div className="absolute -top-24 -right-24 w-48 h-48 bg-noxen blur-[100px] opacity-40 pointer-events-none" />
       )}

       <div className="relative z-10 mb-8 border-b border-white/10 pb-8 flex-grow-0">
          <div className="flex items-center gap-2 mb-4">
             <h3 className={`font-display text-2xl font-bold uppercase tracking-tight ${tier.highlighted ? "text-noxen drop-shadow-[0_0_10px_rgba(246,133,31,0.4)]" : "text-offwhite"}`}>
               {tier.name}
             </h3>
             {tier.badge && (
               <span className="text-xl animate-pulse-orbital">{tier.badge}</span>
             )}
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl font-light text-white">
                {formattedPrice} DA
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-chrome">
                / mois
              </span>
            </div>
            <div className="h-4">
              <span className={`font-sans text-[10px] uppercase tracking-widest transition-opacity duration-300 ${isAnnual ? 'opacity-100 text-noxen' : 'opacity-0'}`}>
                Facturé annuellement
              </span>
            </div>
          </div>
       </div>

       <div className="relative z-10 flex-grow">
         <ul className="flex flex-col gap-4">
           {tier.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-4 font-sans text-sm font-light text-chrome transition-colors group-hover:text-chrome/90">
                 <div className={`mt-1 rounded-full p-0.5 ${tier.highlighted ? "bg-noxen/20 text-noxen shadow-[0_0_8px_rgba(246,133,31,0.4)]" : "bg-white/10 text-white/70"}`}>
                   <Check className="w-3 h-3" strokeWidth={3} />
                 </div>
                 <span className="leading-relaxed">{feature}</span>
              </li>
           ))}
         </ul>
       </div>
       
       {/* Decorative corner accents */}
       <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300 ${tier.highlighted ? 'border-noxen' : 'border-chrome/30 group-hover:border-chrome/60'}`} />
       <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${tier.highlighted ? 'border-noxen' : 'border-chrome/30 group-hover:border-chrome/60'}`} />
       <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${tier.highlighted ? 'border-noxen' : 'border-chrome/30 group-hover:border-chrome/60'}`} />
       <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300 ${tier.highlighted ? 'border-noxen' : 'border-chrome/30 group-hover:border-chrome/60'}`} />
    </motion.div>
  );
}
