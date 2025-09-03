import HeroSection from "../components/hero-section";
import Navigation from "../components/navigation";
import AboutSection from "../components/about-section";
import SkillsSection from "../components/skills-section";
import ProjectsSection from "../components/projects-section";
import ContactSection from "../components/contact-section";
import BackgroundParticles from "../components/background-particles";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundParticles />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}