import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let currentSection = sectionIds[0] ?? "";
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          continue;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}
