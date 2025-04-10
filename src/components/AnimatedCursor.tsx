
import React, { useEffect, useState } from "react";

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target instanceof HTMLElement && 
          (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button'))) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Only add the animated cursor on non-touch devices
    if (!("ontouchstart" in window)) {
      addEventListeners();
    }
    
    return () => {
      removeEventListeners();
    };
  }, []);

  // Don't render the cursor on touch devices
  if ("ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : ""} ${
          linkHovered ? "scale-150" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "24px",
          height: "24px",
          backgroundColor: "#ffffff",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`fixed pointer-events-none z-50 rounded-full bg-portfolio-purple/30 transition-all duration-300 ease-out ${
          hidden ? "opacity-0" : "opacity-80"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: linkHovered ? "60px" : "40px",
          height: linkHovered ? "60px" : "40px",
          transform: "translate(-50%, -50%)",
          transitionDelay: "0.05s",
        }}
      />
    </>
  );
};

export default AnimatedCursor;
