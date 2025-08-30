import { motion } from "framer-motion";
import { ExternalLink, Github, Play, Download } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: { name: string; color: string }[];
  type: "demo" | "download" | "play";
  github?: boolean;
}

const projects: Project[] = [
  {
    title: "RecipeHub",
    description: "A full-stack recipe sharing platform built with Python Flask, featuring user authentication and recipe management.",
    image: "/src/assets/images/login.jpg",
    tags: [
      { name: "Python Flask", color: "gradient-purple-blue" },
      { name: "Web", color: "gradient-cyan" },
    ],
    type: "demo",
    github: true,
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with React frontend and Express backend, featuring responsive design and smooth animations.",
    image: "/src/assets/images/portfolioCover.jpg",
    tags: [
      { name: "React", color: "gradient-purple-blue" },
      { name: "Express", color: "gradient-cyan" },
    ],
    type: "demo",
    github: true,
  },
  {
    title: "Bomberman Game",
    description: "Classic Bomberman game implementation in Java with OOP principles, featuring AI enemies and power-ups.",
    image: "/src/assets/images/bomberman.jpg",
    tags: [
      { name: "Java", color: "gradient-purple-blue" },
      { name: "Game", color: "gradient-cyan" },
    ],
    type: "play",
    github: true,
  },
  {
    title: "Platform Game",
    description: "2D platform game developed in Java with custom physics engine and level progression system.",
    image: "/src/assets/images/platformGame.png",
    tags: [
      { name: "Java", color: "gradient-purple-blue" },
      { name: "Game", color: "gradient-cyan" },
    ],
    type: "play",
    github: true,
  },
  {
    title: "QR Generator/Reader",
    description: "Desktop application for generating and reading QR codes, built with Java and Windows Forms integration.",
    image: "/src/assets/images/qr.jpg",
    tags: [
      { name: "Java", color: "gradient-purple-blue" },
      { name: "Windows Forms", color: "gradient-cyan" },
    ],
    type: "download",
    github: true,
  },
  {
    title: "Conway's Game of Life",
    description: "Interactive simulation of Conway's Game of Life with custom patterns and real-time visualization.",
    image: "/src/assets/images/conway.jpg",
    tags: [
      { name: "C#", color: "gradient-purple-blue" },
      { name: "Simulation", color: "gradient-cyan" },
    ],
    type: "download",
    github: true,
  },
];

export function ProjectsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const getActionButton = (project: Project) => {
    const baseClasses = "flex-1 py-2 rounded-lg text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2";
    
    switch (project.type) {
      case "demo":
        return (
          <button className={`${baseClasses} gradient-purple-blue`} data-testid={`button-demo-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <ExternalLink size={16} />
            Live Demo
          </button>
        );
      case "play":
        return (
          <button className={`${baseClasses} gradient-purple-blue`} data-testid={`button-play-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Play size={16} />
            Play Game
          </button>
        );
      case "download":
        return (
          <button className={`${baseClasses} gradient-purple-blue`} data-testid={`button-download-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Download size={16} />
            Download
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4" data-testid="projects-title">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="projects-subtitle">
            A showcase of my development work across different platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="project-card glass p-6 rounded-xl group"
              data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img
                src={project.image}
                alt={`${project.title} Interface`}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-transform group-hover:scale-105"
                data-testid={`project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              />
              
              <div className="mb-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tag.name}
                    className={`${tag.color} px-3 py-1 rounded-full text-xs mr-2`}
                    data-testid={`project-tag-${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-2" data-testid={`project-title-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4" data-testid={`project-description-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.description}
              </p>
              
              <div className="flex space-x-4">
                {getActionButton(project)}
                {project.github && (
                  <button
                    className="glass py-2 px-4 rounded-lg text-sm hover:scale-105 transition-transform"
                    data-testid={`button-github-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Github size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
