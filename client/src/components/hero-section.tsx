import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack Developer & Software Engineer";

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const typeChar = () => {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1));
          index++;
          setTimeout(typeChar, 100);
        }
      };
      typeChar();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    window.open("/api/cv/download", "_blank");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center max-w-4xl px-8 animate-fadeInUp animate-float">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          Hi, I'm <span className="text-gradient">Ron Religioso</span>
        </h1>
        
        <div className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <span className="typing-text">{displayText}</span>
        </div>
        
        <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-fadeInUp" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <Button 
            onClick={scrollToProjects}
            className="bg-gradient hover:scale-105 transition-transform animate-glow px-8 py-3"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            View My Work
          </Button>
          <Button 
            variant="outline" 
            onClick={downloadCV}
            className="glass hover:scale-105 transition-transform px-8 py-3"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
}