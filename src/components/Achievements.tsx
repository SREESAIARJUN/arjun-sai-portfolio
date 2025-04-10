
import React from "react";
import { Trophy, Award } from "lucide-react";

interface Achievement {
  title: string;
  event: string;
  year: string;
  icon: "trophy" | "award";
}

const Achievements = () => {
  const achievements: Achievement[] = [
    {
      title: "1st Place",
      event: "IBM CodeVerse Hackathon",
      year: "2024",
      icon: "trophy"
    },
    {
      title: "1st Place",
      event: "Paper Presentation (MBU)",
      year: "2023",
      icon: "award"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "trophy":
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case "award":
        return <Award className="h-6 w-6 text-portfolio-purple" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading mb-12">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="portfolio-card group hover:border-portfolio-purple/50 transition-all duration-300 flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mt-1 rounded-full p-2 bg-portfolio-purple/10 group-hover:bg-portfolio-purple/20 transition-colors">
                {getIcon(achievement.icon)}
              </div>
              <div>
                <h3 className="text-lg font-semibold group-hover:text-portfolio-purple transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-foreground">{achievement.event}</p>
                <p className="text-sm text-muted-foreground mt-1">{achievement.year}</p>
              </div>
            </div>
          ))}

          {/* Add more empty cards for future achievements */}
          <div className="portfolio-card border-dashed flex items-center justify-center p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-muted-foreground text-center">More achievements coming soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
