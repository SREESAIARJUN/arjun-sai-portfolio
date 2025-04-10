
import React, { useState } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  image: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "DTCC T+1 Sentinel",
      description: "AI risk model for trades that combines XGBoost and Isolation Forest to detect anomalous trading patterns and potential risks in financial transactions.",
      technologies: ["Python", "XGBoost", "Isolation Forest", "Streamlit", "Pandas"],
      github: "https://github.com/SREESAIARJUN/dtcc-trade-risk",
      live: "https://dtcc-trade-risk.streamlit.app/",
      image: "https://via.placeholder.com/640x360/1A1F2C/FFFFFF?text=DTCC+T%2B1+Sentinel" // Placeholder image
    },
    {
      title: "FIR LegalMate",
      description: "GenAI-powered FIR drafting tool using NLP and Streamlit that assists in creating properly formatted legal documents based on user input and legal requirements.",
      technologies: ["NLP", "Streamlit", "GenAI", "PyTorch", "Transformers"],
      github: "https://github.com/SREESAIARJUN/FIR-LegalMate",
      live: "https://firlegalmate.streamlit.app/",
      image: "https://via.placeholder.com/640x360/1A1F2C/FFFFFF?text=FIR+LegalMate" // Placeholder image
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card overflow-hidden rounded-xl bg-card border border-border"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project image */}
              <div className="relative overflow-hidden h-48 md:h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-portfolio-purple hover:underline"
                  >
                    View Code <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-portfolio-purple hover:underline"
                  >
                    Live Demo <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
