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

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-left 30s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease, border-color 0.6s ease;
          will-change: transform, filter;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1) grayscale(0) !important;
          border-color: rgba(255, 255, 255, 0.2);
          z-index: 20;
        }
      `}</style>
      
      <div className="w-full relative overflow-hidden flex items-center justify-center py-10">
        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedProjects.map((project, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-64 h-80 md:w-80 md:h-[400px] border border-white/5 overflow-hidden relative group"
                >
                  <img
                    src={project.url}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h4 className="text-offwhite font-display text-lg font-bold uppercase tracking-wider mb-1">
                      {project.title}
                    </h4>
                    <span className="text-[10px] text-chrome/60 uppercase tracking-[0.2em] font-sans">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
