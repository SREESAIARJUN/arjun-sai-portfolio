
import React from "react";
import { Github, Linkedin, Mail, ExternalLink, Phone } from "lucide-react";

const Footer = () => {
  // Placeholder social links - update these with actual links
  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/SREESAIARJUN", 
      icon: <Github className="h-5 w-5" /> 
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/arjunsai", 
      icon: <Linkedin className="h-5 w-5" /> 
    },
    { 
      name: "Email", 
      url: "mailto:sreesaiarjunwork@gmail.com", 
      icon: <Mail className="h-5 w-5" /> 
    },
    {
      name: "Phone",
      url: "tel:+917013889449",
      icon: <Phone className="h-5 w-5" />
    }
  ];

  return (
    <footer id="contact" className="bg-card py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Feel free to reach out if you're looking for an AI/ML engineer, have a question, or just want to connect.
            </p>
            
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-portfolio-purple hover:text-white transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:sreesaiarjunwork@gmail.com" 
                className="inline-flex items-center text-portfolio-purple hover:underline"
              >
                <Mail className="mr-2 h-4 w-4" /> sreesaiarjunwork@gmail.com
              </a>
              <a 
                href="tel:+917013889449" 
                className="inline-flex items-center text-portfolio-purple hover:underline"
              >
                <Phone className="mr-2 h-4 w-4" /> +917013889449
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#publications" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-muted-foreground hover:text-portfolio-purple transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kosinepalli Arjun Sai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
