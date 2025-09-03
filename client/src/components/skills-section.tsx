import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { useState, useEffect } from "react";
import { Globe, Database, Coffee, Code } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setAnimateProgress(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  const skillCategories: SkillCategory[] = [
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Web Development",
      skills: [
        { name: "HTML", percentage: 95 },
        { name: "CSS", percentage: 90 },
        { name: "JavaScript", percentage: 85 },
      ],
    },
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: "Backend",
      skills: [
        { name: "Python Flask", percentage: 88 },
      ],
    },
    {
      icon: <Coffee className="h-12 w-12 text-primary" />,
      title: "Desktop Development",
      skills: [
        { name: "Java (OOP)", percentage: 82 },
        { name: "C# (OOP)", percentage: 80 },
      ],
    },
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: "Database",
      skills: [
        { name: "SQL", percentage: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 ${isIntersecting ? "animate-fadeInUp" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground">
            My technical expertise across different domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`glass p-8 rounded-2xl ${isIntersecting ? "animate-fadeInUp" : "opacity-0 translate-y-[50px]"}`}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="mb-6">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-6">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient transition-all duration-1500 ease-out"
                        style={{
                          width: animateProgress ? `${skill.percentage}%` : "0%",
                          transitionDelay: `${(categoryIndex * 100) + (skillIndex * 100)}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}