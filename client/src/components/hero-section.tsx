import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function HeroSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-float"
            data-testid="hero-title"
          >
            Hi, I'm <span className="text-gradient">Ron Religioso</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          <div className="typing-effect animate-typing" data-testid="hero-subtitle">
            Full Stack Developer & Software Engineer
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-x-4 animate-float"
        >
          <button
            className="gradient-purple-blue px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform animate-glow"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-view-work"
          >
            View My Work
          </button>
          <button
            className="glass px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
            onClick={() => alert("CV download coming soon! Contact me directly for now.")}
            data-testid="button-download-cv"
          >
            Download CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
