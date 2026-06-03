import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Identité Visuelle - Nova",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Application Mobile - FitLife",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Site Web E-commerce",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Campagne Social Media",
    category: "Direction Artistique",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Refonte Logotype - Zenith",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Dashboard Analytique",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  }
];

export function BehanceGallery() {
  return (
    <section className="relative w-full py-24 bg-deep overflow-hidden border-t border-white/5">
       <div className="max-w-[1200px] mx-auto px-6 relative z-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-noxen mb-4 block font-mono">
              <span className="inline-block w-1.5 h-1.5 bg-noxen rounded-full animate-pulse shadow-[0_0_8px_#F6851F] mr-2"></span>
              Portfolio
            </span>
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-offwhite">
              Nos Réalisations
            </h3>
          </div>
          <a 
            href="https://www.behance.net/oussama-boumerzoug" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-chrome hover:text-noxen transition-colors group pb-2 border-b border-transparent hover:border-noxen/50"
          >
            Explorer le portfolio Behance
            <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform drop-shadow-[0_0_5px_rgba(246,133,31,0)] group-hover:drop-shadow-[0_0_5px_rgba(246,133,31,0.5)]" />
          </a>
       </div>

       <div className="w-full relative flex overflow-x-hidden group">
         {/* Gradient masks for seamless edges */}
         <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-deep to-transparent z-10 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-deep to-transparent z-10 pointer-events-none" />

         <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
           {/* First instance */}
           <div className="flex gap-6 pr-6">
             {projects.map((project, index) => (
               <a
                 key={`first-${index}`}
                 href="https://www.behance.net/oussama-boumerzoug"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 group/card overflow-hidden border border-white/10 hover:border-noxen/50 transition-all duration-500 rounded-lg bg-black box-border hover:shadow-[0_0_30px_rgba(246,133,31,0.15)]"
               >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-noxen mb-2 block opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_5px_rgba(246,133,31,0.5)]">
                      {project.category}
                    </span>
                    <h4 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-1">
                      {project.title}
                    </h4>
                  </div>

                  {/* Top right decorative glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-noxen blur-[60px] opacity-0 group-hover/card:opacity-20 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Decorative Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4" />
               </a>
             ))}
           </div>
           
           {/* Second instance for seamless loop */}
           <div className="flex gap-6 pr-6">
             {projects.map((project, index) => (
               <a
                 key={`second-${index}`}
                 href="https://www.behance.net/oussama-boumerzoug"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 group/card overflow-hidden border border-white/10 hover:border-noxen/50 transition-all duration-500 rounded-lg bg-black box-border hover:shadow-[0_0_30px_rgba(246,133,31,0.15)]"
               >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-noxen mb-2 block opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_5px_rgba(246,133,31,0.5)]">
                      {project.category}
                    </span>
                    <h4 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-1">
                      {project.title}
                    </h4>
                  </div>

                  {/* Top right decorative glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-noxen blur-[60px] opacity-0 group-hover/card:opacity-20 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Decorative Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4" />
               </a>
             ))}
           </div>
         </div>
       </div>
    </section>
  );
}
