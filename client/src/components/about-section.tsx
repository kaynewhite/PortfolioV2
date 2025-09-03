import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { Monitor, Smartphone } from "lucide-react";
import profileImg from "../assets/images/me.jpg";

export default function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 ${isIntersecting ? "animate-fadeInUp" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-xl text-muted-foreground">
            Passionate developer with expertise across multiple technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`${isIntersecting ? "animate-slideInLeft" : "opacity-0 translate-x-[-50px]"} ${isIntersecting ? "animate-float" : ""}`}>
            <img 
              src={profileImg} 
              alt="Ron Religioso" 
              className="w-full max-w-md mx-auto rounded-2xl glass p-6"
            />
          </div>

          <div className={`${isIntersecting ? "animate-slideInRight" : "opacity-0 translate-x-[50px]"}`}>
            <h3 className="text-3xl font-bold mb-6">Building Digital Solutions</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I'm a passionate full-stack developer with expertise in web technologies, desktop applications, 
              and database management. My journey spans from creating responsive web applications to developing 
              complex desktop software.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={`glass p-6 rounded-xl ${isIntersecting ? "animate-fadeInUp" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
                <Monitor className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2">Web Development</h4>
                <p className="text-muted-foreground">Modern web applications</p>
              </div>

              <div className={`glass p-6 rounded-xl ${isIntersecting ? "animate-fadeInUp" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2">Desktop Apps</h4>
                <p className="text-muted-foreground">Cross-platform solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}