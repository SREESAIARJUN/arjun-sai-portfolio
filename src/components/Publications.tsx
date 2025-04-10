
import React from "react";
import { BookOpen, FileText, FileCode } from "lucide-react";

const Publications = () => {
  const publications = [
    {
      title: "CNN-LSTM for Kidney Stone Detection",
      venue: "IECOM 2025",
      type: "paper",
      description: "A hybrid CNN-LSTM architecture for accurate detection and classification of kidney stones from medical imaging data."
    },
    {
      title: "Automated Legal Advisory with Gemini API",
      venue: "IECOM 2025",
      type: "paper",
      description: "Implementation of an automated legal advisory system leveraging the Gemini API for NLP tasks."
    },
    {
      title: "AI Lip Sync & Dubbing",
      venue: "Patent Filed",
      type: "patent",
      description: "A novel AI-based approach for automatic lip synchronization and dubbing in video content across multiple languages."
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "paper":
        return <FileText className="h-8 w-8 text-portfolio-purple" />;
      case "patent":
        return <FileCode className="h-8 w-8 text-portfolio-orange" />;
      default:
        return <BookOpen className="h-8 w-8 text-portfolio-purple" />;
    }
  };

  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Publications & Patent</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <div 
              key={index} 
              className="portfolio-card group hover:bg-card/80 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getIcon(pub.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-portfolio-purple transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-portfolio-purple mt-1 mb-3">
                    {pub.venue}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {pub.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
