import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor trail
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.5 });

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
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-chrome rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-chrome/50 pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
          borderWidth: isHovering ? "0px" : "1px",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
