"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200; // adjust orbit radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-offwhite bg-deep border-chrome";
      case "in-progress":
        return "text-deep bg-offwhite border-deep";
      case "pending":
        return "text-offwhite/50 bg-deep/40 border-chrome/50";
      default:
        return "text-offwhite/50 bg-deep/40 border-chrome/50";
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[500px]">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          { /* Center core */ }
          <div className="absolute w-16 h-16 rounded-full bg-chrome/10 animate-pulse-orbital flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-chrome/30 animate-ping-orbital opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-chrome/10 animate-ping-orbital opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-chrome/40 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-chrome/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node Aura */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse-orbital duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(176,176,176,0.15) 0%, rgba(176,176,176,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node Icon Circle */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-offwhite text-deep"
                      : isRelated
                      ? "bg-chrome/50 text-deep"
                      : "bg-deep text-chrome"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-offwhite shadow-lg shadow-offwhite/10"
                      : isRelated
                      ? "border-chrome animate-pulse-orbital"
                      : "border-chrome/30"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : ""}
                `}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </div>

                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] font-sans tracking-widest uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-offwhite scale-110" : "text-chrome/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-deep/95 backdrop-blur-md border border-chrome/20 shadow-xl overflow-visible z-[999]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-chrome/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0 h-4 text-[10px] rounded uppercase font-sans tracking-wider ${getStatusStyles(
                            item.status
                          )}`}
                          variant="outline"
                        >
                          {item.status === "completed"
                            ? "COMPLÉTÉ"
                            : item.status === "in-progress"
                            ? "EN COURS"
                            : "À VENIR"}
                        </Badge>
                        <span className="text-[10px] font-sans tracking-wide text-chrome/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-display tracking-tight text-offwhite mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-chrome/80 font-sans font-light">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-sans tracking-wider uppercase mb-1">
                          <span className="flex items-center text-chrome/60">
                            <Zap size={10} className="mr-1" />
                            Énergie
                          </span>
                          <span className="text-chrome/80">{item.energy}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-chrome transition-all duration-1000"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-chrome/50 mr-1" />
                            <h4 className="text-[9px] uppercase tracking-widest font-sans text-chrome/50">
                              Nœuds Connectés
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center h-5 px-2 py-0 text-[10px] rounded border border-white/10 bg-transparent hover:bg-white/5 text-chrome/80 hover:text-offwhite transition-all font-sans"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-chrome/40"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
