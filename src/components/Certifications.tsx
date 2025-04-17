
import React from "react";
import { CheckCircle } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

const Certifications = () => {
  const certifications: Certification[] = [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera",
      year: "2023"
    },
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera", 
      year: "2023"
    },
    {
      title: "DSA with Python",
      issuer: "Coding Ninjas", 
      year: "2022"
    },
    {
      title: "Google Data Analytics",
      issuer: "Google",
      year: "2023"
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Certifications</h2>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="portfolio-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-portfolio-purple flex-shrink-0 mt-1" />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                    <p className="text-sm text-portfolio-purple ml-2">{cert.year}</p>
                  </div>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
