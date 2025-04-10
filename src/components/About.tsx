
import React from "react";
import { User, BookOpen, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Introduction */}
          <div className="portfolio-card animate-fade-in-up">
            <User className="w-10 h-10 text-portfolio-purple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Who I Am</h3>
            <p className="text-muted-foreground mb-4">
              I'm an aspiring AI/ML Engineer with hands-on experience in LLMs, NLP, and anomaly detection. Currently in my final year of B.Tech in AI/ML at Mohan Babu University with a CGPA of 9.82.
            </p>
            <p className="text-muted-foreground">
              I've also completed a Minor in AI from IIT Ropar, which allowed me to gain deeper insights into advanced AI concepts and research methodologies.
            </p>
          </div>

          {/* Column 2: Technical Strengths */}
          <div className="portfolio-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <BookOpen className="w-10 h-10 text-portfolio-purple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Technical Proficiency</h3>
            <p className="text-muted-foreground mb-4">
              Strong in Python, TensorFlow, Scikit-learn, Hugging Face, and Streamlit with a focus on practical implementation and deployment.
            </p>
            <p className="text-muted-foreground">
              I've developed real-world AI solutions across various domains including finance, legal tech, and healthcare, focusing on creating models that deliver tangible value.
            </p>
          </div>

          {/* Column 3: Passion & Goals */}
          <div className="portfolio-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Lightbulb className="w-10 h-10 text-portfolio-purple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Passion & Vision</h3>
            <p className="text-muted-foreground mb-4">
              Passionate about building real-world AI solutions with a focus on deployment and practical applications that solve meaningful problems.
            </p>
            <p className="text-muted-foreground">
              My goal is to bridge the gap between cutting-edge AI research and practical applications, creating AI systems that are not just technically impressive but also valuable in real-world contexts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
