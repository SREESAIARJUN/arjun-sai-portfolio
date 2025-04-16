
import React, { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import profile from "./profile.jpg";
import FuturisticBackground from "./FuturisticBackground";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
    >
      {/* 3D Animated Background */}
      <FuturisticBackground />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />

      {/* Hero content layout */}
      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side: Text */}
        <div className="text-center md:text-left flex-1">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-portfolio-purple via-portfolio-magenta to-portfolio-orange blur-lg opacity-50"></div>
            <p className="relative bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-portfolio-purple font-medium">
              Hello, I'm
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-portfolio-purple via-portfolio-magenta to-portfolio-orange">
            Kosinepalli <span>Arjun Sai</span>
          </h1>

          <div className="relative mb-8">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl backdrop-blur-sm bg-background/50 p-4 rounded-lg border border-portfolio-purple/20">
              AI/ML Engineer | B.Tech AI/ML @ Mohan Babu University | 
              Minor in AI @ IIT Ropar
            </p>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-portfolio-purple to-portfolio-orange opacity-20 blur-sm rounded-lg -z-10"></div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="group relative px-6 py-3 rounded-full bg-portfolio-purple overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple via-portfolio-magenta to-portfolio-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-medium inline-flex items-center gap-2">
                View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="relative px-6 py-3 rounded-full overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple to-portfolio-orange opacity-20"></div>
              <span className="relative text-portfolio-purple font-medium group-hover:text-white transition-colors">
                Contact Me
              </span>
            </a>
          </div>
        </div>

        {/* Right side: Profile Picture with futuristic frame */}
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-portfolio-purple to-portfolio-orange rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
          <div className="relative">
            <img
              src={profile}
              alt="Profile"
              className="w-60 h-60 rounded-2xl object-cover border-2 border-portfolio-purple/50 shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-portfolio-purple/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator with enhanced animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <button
          onClick={scrollToNextSection}
          className="relative p-2 rounded-full border border-portfolio-purple/30 text-portfolio-purple hover:bg-portfolio-purple/10 transition-colors group"
          aria-label="Scroll down"
        >
          <div className="absolute inset-0 bg-portfolio-purple/5 rounded-full animate-ping"></div>
          <ChevronDown size={20} className="animate-bounce group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
