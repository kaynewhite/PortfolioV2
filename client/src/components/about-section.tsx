import { motion } from "framer-motion";
import { Code, Monitor } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="about" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4" data-testid="about-title">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="about-subtitle">
            Passionate developer with expertise across multiple technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="animate-float"
          >
            <img
              src="/src/assets/images/me.jpg"
              alt="Ron Religioso"
              className="rounded-xl glass p-4 w-full h-auto"
              data-testid="about-image"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6" data-testid="about-heading">
              Building Digital Solutions
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6" data-testid="about-description">
              I'm a passionate full-stack developer with expertise in web technologies, desktop applications, and database management. 
              My journey spans from creating responsive web applications to developing complex desktop software.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass p-4 rounded-lg"
                data-testid="card-web-development"
              >
                <Code className="text-primary text-2xl mb-2" />
                <h4 className="font-semibold">Web Development</h4>
                <p className="text-sm text-muted-foreground">Modern web applications</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="glass p-4 rounded-lg"
                data-testid="card-desktop-apps"
              >
                <Monitor className="text-accent text-2xl mb-2" />
                <h4 className="font-semibold">Desktop Apps</h4>
                <p className="text-sm text-muted-foreground">Cross-platform solutions</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
