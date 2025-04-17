
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Publications from "../components/Publications";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Certifications from "../components/Certifications";
import Footer from "../components/Footer";
import AnimatedCursor from "../components/AnimatedCursor";
import ChatBot from "../components/ChatBot";

const Index = () => {
  useEffect(() => {
    // Update the page title
    document.title = "Kosinepalli Arjun Sai | AI/ML Portfolio";
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatedCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Achievements />
      <Certifications />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
