
import React from "react";
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "STEM LLM Intern",
      company: "Outlier AI",
      period: "Jan 2024 - Present",
      description: [
        "Fine-tuned domain-specific LLMs with a focus on financial data and analysis",
        "Improved model accuracy by +15% through custom training techniques and data augmentation",
        "Implemented RAG architectures to enhance model contextual understanding and domain knowledge",
        "Collaborated with cross-functional teams to integrate AI solutions into existing workflows"
      ]
    },
    {
      title: "IEEE AI Lead",
      company: "Mohan Babu University",
      period: "Aug 2022 - Present",
      description: [
        "Conducted workshops on machine learning fundamentals, deep learning, and NLP for students",
        "Mentored junior students on AI projects and research initiatives",
        "Led ML projects focusing on computer vision and natural language processing",
        "Organized AI competitions and hackathons to foster innovation and practical learning"
      ]
    },
    {
      title: "Participant",
      company: "Amazon ML Summer School",
      period: "Summer 2024",
      description: [
        "Completed intensive training on neural networks and generative AI",
        "Engaged in hands-on projects applying deep learning techniques to real-world problems",
        "Participated in workshops led by Amazon ML scientists and engineers",
        "Collaborated with peers on team-based ML challenges and competitions"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Experience</h2>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <div key={index} className="timeline-item animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="hidden md:block text-portfolio-purple">•</div>
                <h4 className="text-lg font-medium text-portfolio-purple">{experience.company}</h4>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{experience.period}</span>
              </div>
              
              <ul className="space-y-2">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-portfolio-purple mt-2 mr-2"></span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
