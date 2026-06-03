import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export interface BentoItem {
    title: string;
    description: string;
    icon: ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden transition-all duration-500",
                        "border border-white/10 bg-white/[0.01]",
                        "hover:border-noxen/40",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        item.hasPersistentHover ? "shadow-[0_0_20px_rgba(246,133,31,0.15)] -translate-y-1 border-noxen/30" : ""
                    )}
                >
                    {/* Techy background patterns consistent with Noxen identity */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,133,31,0.05)_1px,transparent_1px)] bg-[length:4px_4px]" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-noxen blur-[80px] opacity-20 pointer-events-none" />
                    </div>

                    <div className="relative flex flex-col h-full space-y-6">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 bg-black/40 text-chrome group-hover:text-noxen group-hover:border-noxen/30 transition-all duration-500 shadow-inner overflow-hidden relative">
                                <div className="absolute inset-0 bg-noxen/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(246,133,31,0.5)]">
                                    {item.icon}
                                </div>
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm border",
                                        "bg-white/5 border-white/10 text-chrome/70",
                                        "transition-all duration-500 group-hover:bg-noxen/10 group-hover:text-noxen group-hover:border-noxen/30"
                                    )}
                                >
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-noxen/50 group-hover:bg-noxen group-hover:shadow-[0_0_8px_#F6851F] mr-2 -translate-y-px transition-all duration-500" />
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3 flex-grow">
                            <h3 className="font-display font-bold uppercase tracking-tight text-offwhite text-xl group-hover:text-white transition-colors duration-300 flex items-center">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-3 font-mono text-xs tracking-widest text-chrome/50 font-normal">
                                        [{item.meta}]
                                    </span>
                                )}
                            </h3>
                            <p className="font-sans text-sm text-chrome/70 font-light leading-relaxed group-hover:text-chrome transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                            <div className="flex items-center gap-2 text-xs font-sans text-chrome/50">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded bg-white/5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/10 group-hover:text-chrome"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-noxen opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                {item.cta || "Découvrir"}
                                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                        </div>
                    </div>

                    {/* Glitch line effect */}
                    <div className="absolute bottom-0 left-0 h-px bg-noxen w-0 group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_12px_#F6851F]" />
                    
                    {/* Decorative Corner brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chrome/20 group-hover:border-noxen/50 transition-colors duration-500" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-chrome/20 group-hover:border-noxen/50 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-chrome/20 group-hover:border-noxen/50 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome/20 group-hover:border-noxen/50 transition-colors duration-500" />
                </div>
            ))}
        </div>
    );
}

export { BentoGrid };
