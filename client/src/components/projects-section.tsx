import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { Button } from "./ui/button";
import { ExternalLink, Folder } from "lucide-react";

// Import project images
import loginImg from "../assets/images/login.jpg";
import bombermanImg from "../assets/images/bomberman.jpg";
import platformGameImg from "../assets/images/platformGame.png";
import qrImg from "../assets/images/qr.jpg";
import conwayImg from "../assets/images/conway.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
}

export default function ProjectsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const projects: Project[] = [
    {
      id: "recipehub",
      title: "RecipeHub",
      description: "A full-stack recipe sharing platform built with Python Flask, featuring user authentication and recipe management.",
      image: loginImg,
      tags: ["Python Flask", "Web"],
    },
    {
      id: "bomberman",
      title: "Bomberman Game",
      description: "Classic Bomberman game implementation in Java with OOP principles, featuring AI enemies and power-ups.",
      image: bombermanImg,
      tags: ["Java", "Game"],
    },
    {
      id: "platform-game",
      title: "Platform Game",
      description: "2D platform game developed in Java with custom physics engine and level progression system.",
      image: platformGameImg,
      tags: ["Java", "Game"],
    },
    {
      id: "qr-generator",
      title: "QR Generator/Reader",
      description: "Desktop application for generating and reading QR codes, built with Java and Windows Forms integration.",
      image: qrImg,
      tags: ["Java", "Windows Forms"],
    },
    {
      id: "conway-game",
      title: "Conway's Game of Life",
      description: "Interactive simulation of Conway's Game of Life with custom patterns and real-time visualization.",
      image: conwayImg,
      tags: ["C#", "Simulation"],
    },
  ];

  return (
    <section id="projects" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 ${isIntersecting ? "animate-fadeInUp" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">Featured Projects</h2>
          <p className="text-xl text-muted-foreground">
            A showcase of my development work across different platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`glass rounded-2xl p-6 transition-all duration-300 hover:scale-105 project-card ${
                isIntersecting ? "animate-fadeInUp" : "opacity-0 translate-y-[50px]"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300"
              />
              
              <div className="mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gradient text-white text-xs px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient hover:scale-105 transition-transform">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {project.tags.includes("Game") ? "Play Game" : 
                   project.tags.includes("Windows Forms") || project.tags.includes("Simulation") ? "Download" : 
                   "Live Demo"}
                </Button>
                <Button variant="outline" size="icon" className="glass hover:scale-105 transition-transform">
                  <Folder className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}