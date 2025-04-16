import React from "react";
import { Code, Server, Database, Cloud, Brain } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code className="h-5 w-5" />,
      skills: ["Python (Expert)", "Mojo (Familiar)", "SQL", "HTML/CSS", "Java (Intermediate)", "C++ (Beginner)"]
    },
    {
      title: "AI/ML",
      icon: <Brain className="h-5 w-5" />,
      skills: ["LLMs", "RAG", "CNNs", "Time-Series", "XAI", "Prompt Engineering", "NLP", "Computer Vision"]
    },
    {
      title: "Frameworks",
      icon: <Server className="h-5 w-5" />,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Streamlit", "Gradio", "FastAPI", "Hugging Face", "Keras"]
    },
    {
      title: "Cloud",
      icon: <Cloud className="h-5 w-5" />,
      skills: ["AWS SageMaker", "Google Cloud", "Azure ML", "Docker", "MLflow"]
    },
    {
      title: "Data",
      icon: <Database className="h-5 w-5" />,
      skills: ["Vector DBs", "Graph DBs (Familiar)", "Pandas", "NumPy", "Matplotlib", "Seaborn"]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Skills</h2>

        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-portfolio-purple/10 text-portfolio-purple">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="skill-tag group bg-card hover:bg-portfolio-purple hover:text-white transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
