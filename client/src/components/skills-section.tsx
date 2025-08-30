import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Web Development",
    icon: "💻",
    skills: [
      { name: "HTML", percentage: 95 },
      { name: "CSS", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
    ],
    gradient: "gradient-purple-blue",
  },
  {
    title: "Backend",
    icon: "🐍",
    skills: [
      { name: "Python Flask", percentage: 88 },
    ],
    gradient: "gradient-cyan",
  },
  {
    title: "Desktop Development",
    icon: "☕",
    skills: [
      { name: "Java (OOP)", percentage: 82 },
      { name: "C# (OOP)", percentage: 80 },
    ],
    gradient: "gradient-purple-blue",
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "SQL", percentage: 85 },
    ],
    gradient: "gradient-cyan",
  },
];

export function SkillsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => {
        skillCategories.forEach((category, categoryIndex) => {
          category.skills.forEach((skill, skillIndex) => {
            setTimeout(() => {
              setAnimatedSkills(prev => new Set(prev.add(`${categoryIndex}-${skillIndex}`)));
            }, (categoryIndex * 200) + (skillIndex * 100));
          });
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [hasIntersected]);

  return (
    <section id="skills" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4" data-testid="skills-title">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="skills-subtitle">
            My technical expertise across different domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass p-6 rounded-xl"
              data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-3xl mb-4" data-testid={`skill-icon-${categoryIndex}`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4" data-testid={`skill-title-${categoryIndex}`}>
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillKey);
                  
                  return (
                    <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm">{skill.percentage}%</span>
                      </div>
                      <div className="bg-secondary rounded-full h-2">
                        <motion.div
                          className={`skill-bar ${category.gradient} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: isAnimated ? `${skill.percentage}%` : 0 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          data-testid={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
