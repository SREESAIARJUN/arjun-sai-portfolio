import React, { useState } from "react";
import {
  Github,
  ExternalLink,
  ChevronRight,
  Brain,
  BookOpen,
  Medal,
  MonitorSmartphone,
  HeartPulse,
  UserCheck,
  Activity,
  Code,
  Bot,
} from "lucide-react";

// Image imports (same folder as this file)
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import img7 from "./7.png";
import img8 from "./8.png";
import img9 from "./9.png";
import img10 from "./10.png";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  repo?: string;
  image: string;
  icon: React.ReactNode;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "DTCC T+1 Sentinel",
      description:
        "AI risk model for trades that combines XGBoost and Isolation Forest to detect anomalous trading patterns and potential risks in financial transactions.",
      technologies: ["Python", "XGBoost", "Isolation Forest", "Streamlit", "Pandas"],
      github: "https://github.com/SREESAIARJUN/dtcc-trade-risk",
      live: "https://dtcc-trade-risk.streamlit.app/",
      image: img1,
      icon: <Medal className="h-6 w-6" />,
    },
    {
      title: "FIR LegalMate",
      description:
        "GenAI-powered FIR drafting tool using NLP and Streamlit that assists in creating properly formatted legal documents based on user input and legal requirements.",
      technologies: ["NLP", "Streamlit", "GenAI", "PyTorch", "Transformers"],
      github: "https://github.com/SREESAIARJUN/FIR-LegalMate",
      live: "https://firlegalmate.streamlit.app/",
      image: img2,
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "20-20-20 Rule Eye Care Reminder",
      description:
        "A smart application that implements the 20-20-20 rule to reduce eye strain, reminding users to take breaks while working on digital screens.",
      technologies: ["Python", "Tkinter", "Notification System", "Health Tech"],
      github: "https://github.com/SREESAIARJUN/20-20-20-Rule-reminder",
      image: img3,
      icon: <MonitorSmartphone className="h-6 w-6" />,
    },
    {
      title: "Pneumonia Detection",
      description:
        "CNN model deployed on Hugging Face that analyzes chest X-rays to detect pneumonia with high accuracy, providing a valuable diagnostic tool for healthcare professionals.",
      technologies: ["CNN", "Hugging Face", "TensorFlow", "Medical Imaging", "Deep Learning"],
      github: "",
      repo: "https://huggingface.co/sreesaiarjun/Pneumonia-Detection-using-CNN/tree/main",
      live: "https://huggingface.co/spaces/sreesaiarjun/Pneumonia-Detection-using-CNN",
      image: img4,
      icon: <HeartPulse className="h-6 w-6" />,
    },
    {
      title: "Mechanical Engine Part Classifier",
      description:
        "AI-powered system that automatically classifies mechanical engine components using computer vision and deep learning techniques.",
      technologies: ["Computer Vision", "CNN", "Streamlit", "TensorFlow", "Image Processing"],
      github:
        "https://github.com/SREESAIARJUN/Automatic-Classification-of-Mechanical-Components-of-Engines",
      live: "https://automatic-classification-of-mechanical-components-of-engines.streamlit.app/",
      image: img5,
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "AI Mental Health Support Chatbot",
      description:
        "Empathetic AI chatbot designed to provide mental health support, resources, and guidance to users in need of emotional assistance.",
      technologies: ["NLP", "GenAI", "Streamlit", "Mental Health", "Chatbot"],
      github: "https://github.com/SREESAIARJUN/mental-health-support",
      live: "https://aimentalhealthsupport.streamlit.app/",
      image: img6,
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Attendance Management System",
      description:
        "Streamlined attendance tracking system for educational institutions that simplifies the process of recording and analyzing student attendance data.",
      technologies: ["Python", "Streamlit", "Database Management", "Data Visualization"],
      github: "https://github.com/SREESAIARJUN/Attendance-management-system",
      live: "https://attendance-management-system-arjun.streamlit.app/",
      image: img7,
      icon: <UserCheck className="h-6 w-6" />,
    },
    {
      title: "Kidney Stone Detection (CNN-LSTM)",
      description:
        "Hybrid CNN-LSTM model for accurate detection of kidney stones from medical images, providing a reliable diagnostic aid for urologists.",
      technologies: ["CNN", "LSTM", "Medical Imaging", "Deep Learning", "Streamlit"],
      github: "https://github.com/SREESAIARJUN/Kidney-stone-detection-using-cnn-lstm",
      live: "https://kidney-stone-detection-using-cnn-lstm.streamlit.app/",
      image: img8,
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: "Web Tech Tutorials",
      description:
        "Comprehensive collection of web development tutorials covering HTML, CSS, JavaScript, and modern web technologies for beginners and intermediate developers.",
      technologies: ["HTML", "CSS", "JavaScript", "Web Development", "Educational"],
      github: "https://github.com/SREESAIARJUN/WT-Tutorials",
      live: "https://sreesaiarjun.github.io/WT-Tutorials/",
      image: img9,
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "MaverickBot – Smart AI Assistant",
      description:
        "Versatile AI assistant that leverages natural language processing to help users with information retrieval, task automation, and personalized assistance.",
      technologies: ["NLP", "GenAI", "Streamlit", "Conversational AI", "Python"],
      github: "https://github.com/SREESAIARJUN/maverickbot",
      live: "https://maverickbot.streamlit.app/",
      image: img10,
      icon: <Bot className="h-6 w-6" />,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 4, projects.length));
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={index}
              className="project-card overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden h-44 md:h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          aria-label="GitHub repository"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.repo && !project.github && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          aria-label="Repository"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-muted flex-shrink-0 text-portfolio-purple">
                    {project.icon}
                  </div>
                  <h3 className="text-lg font-bold line-clamp-1">{project.title}</h3>
                </div>

                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  {(project.github || project.repo) && (
                    <a
                      href={project.github || project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-portfolio-purple hover:underline"
                    >
                      View Code <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-portfolio-purple hover:underline"
                    >
                      Live Demo <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-full bg-portfolio-purple text-white hover:bg-opacity-90 transition-all"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
