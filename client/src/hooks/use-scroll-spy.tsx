import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id,
            offsetTop: rect.top + window.scrollY,
            height: rect.height,
          };
        }
        return null;
      }).filter(Boolean);

      let current = "";
      const scrollY = window.scrollY + offset;

      for (const section of sections) {
        if (section && scrollY >= section.offsetTop) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
