import { useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if we are hovering over clickable elements
      if (
        (e.target as HTMLElement).tagName.toLowerCase() === "button" ||
        (e.target as HTMLElement).tagName.toLowerCase() === "a" ||
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("a") || 
        (e.target as HTMLElement).classList.contains("magnetic")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${isHovering ? "drop-shadow-[0_0_12px_rgba(246,133,31,0.9)]" : "drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"}`}
        style={{ 
          transform: `translate(-5px, -5px) ${isHovering ? "scale(1.2) rotate(-5deg)" : "scale(1)"}`,
          transformOrigin: "5px 5px"
        }}
      >
        <path 
          d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" 
          fill={isHovering ? "#F6851F" : "#ffffff"} 
          stroke={isHovering ? "#F6851F" : "#ffffff"} 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
