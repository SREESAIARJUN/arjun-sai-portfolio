import React, { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import profile from "./profile.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const elements = container.querySelectorAll(".parallax-element");
      elements.forEach((el) => {
        const speedX = parseFloat((el as HTMLElement).dataset.speedX || "0");
        const speedY = parseFloat((el as HTMLElement).dataset.speedY || "0");

        (el as HTMLElement).style.transform = `translate(${x * speedX}px, ${y * speedY}px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-portfolio-purple/20 rounded-full filter blur-3xl parallax-element" data-speed-x="-20" data-speed-y="-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-portfolio-magenta/20 rounded-full filter blur-3xl parallax-element" data-speed-x="20" data-speed-y="10"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-portfolio-orange/20 rounded-full filter blur-3xl parallax-element" data-speed-x="15" data-speed-y="-15"></div>
      </div>

      {/* Hero content layout */}
      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side: Text */}
        <div className="text-center md:text-left flex-1 parallax-element" data-speed-x="-5" data-speed-y="5">
          <p className="text-portfolio-purple mb-4 font-medium">
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Kosinepalli <span className="text-portfolio-purple">Arjun Sai</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            AI/ML Engineer | B.Tech AI/ML @ Mohan Babu University | 
            Minor in AI @ IIT Ropar
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-portfolio-purple text-white font-medium inline-flex items-center gap-2 hover:bg-portfolio-purple/90 transition-colors"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-transparent border border-portfolio-purple text-portfolio-purple font-medium hover:bg-portfolio-purple/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right side: Profile Picture */}
        <div className="parallax-element" data-speed-x="5" data-speed-y="5">
          <img
            src={profile}
            alt="Profile"
            className="w-60 h-60 rounded-2xl object-cover border-4 border-portfolio-purple shadow-lg"
          />
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <button
          onClick={scrollToNextSection}
          className="p-2 rounded-full border border-portfolio-purple/30 text-portfolio-purple hover:bg-portfolio-purple/10 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
