import { useEffect, useState } from "react";
import { arrayCheck } from "@/types";
import type { NavLink } from "@/types";
import { INTERSECTION_ROOT_MARGIN, INTERSECTION_THRESHOLD } from "@/lib/constants";

export function useActiveSection(
  links: NavLink[],
  mounted: boolean
): string {
  const [activeHref, setActiveHref] = useState<string>(
    links[0]?.href ?? "#home"
  );

  useEffect(() => {
    if (!mounted || !arrayCheck(links)) return;
    const sections = links
      .map((l) => l.href?.slice(1) ?? "")
      .filter(Boolean);
    const visibles: Record<string, number> = {};

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          visibles[`#${id}`] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        const best = Object.entries(visibles).reduce(
          (a, b) => (b[1] > a[1] ? b : a),
          ["#home", 0]
        );
        setActiveHref(best?.[0] ?? "#home");
      },
      {
        rootMargin: INTERSECTION_ROOT_MARGIN,
        threshold: [...INTERSECTION_THRESHOLD],
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        visibles[`#${id}`] = 0;
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [mounted, links]);

  return activeHref;
}
