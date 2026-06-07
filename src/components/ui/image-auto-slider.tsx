import React from 'react';

export const ImageAutoSlider = () => {
  // Project data for the infinite scroll
  const projects = [
    {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      title: "FinTrack UI",
      category: "Dashboard Design"
    },
    {
      url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
      title: "Archetype Site",
      category: "Creative Portfolio"
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      title: "Lumina Labs",
      category: "Visual Identity"
    },
    {
      url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
      title: "Nexus Brand",
      category: "Media Strategy"
    },
    {
      url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
      title: "EcoSphere",
      category: "Web Immersif"
    },
    {
      url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
      title: "Stellar App",
      category: "Digital Product"
    },
    {
      url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
      title: "Mirage Studio",
      category: "Brand Identity"
    },
    {
      url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
      title: "Aura Platform",
      category: "UI/UX Luxe"
    }
  ];

  return (
    <div className="w-full relative py-10 flex overflow-x-hidden group">
      {/* Gradient masks for seamless edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-deep to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
        {/* First instance */}
        <div className="flex gap-6 pr-6">
          {projects.map((project, index) => (
            <div
              key={`first-${index}`}
              className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 group/card overflow-hidden border border-white/10 hover:border-noxen/50 transition-all duration-500 rounded-lg bg-black box-border hover:shadow-[0_0_30px_rgba(246,133,31,0.15)] cursor-pointer"
            >
               <img 
                 src={project.url} 
                 alt={project.title} 
                 className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity duration-500 pointer-events-none" />
               
               <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 pointer-events-none">
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
               <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4 pointer-events-none" />
               <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4 pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* Second instance for seamless loop */}
        <div className="flex gap-6 pr-6">
          {projects.map((project, index) => (
            <div
              key={`second-${index}`}
              className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 group/card overflow-hidden border border-white/10 hover:border-noxen/50 transition-all duration-500 rounded-lg bg-black box-border hover:shadow-[0_0_30px_rgba(246,133,31,0.15)] cursor-pointer"
            >
               <img 
                 src={project.url} 
                 alt={project.title} 
                 className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity duration-500 pointer-events-none" />
               
               <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 pointer-events-none">
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
               <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4 pointer-events-none" />
               <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/10 group-hover/card:border-noxen/50 transition-colors duration-500 z-20 m-4 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
