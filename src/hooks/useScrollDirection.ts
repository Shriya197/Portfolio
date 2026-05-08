import { useCallback, useEffect, useRef, useState } from "react";
import type { ScrollDirection } from "@/types";

export function useScrollDirection(): ScrollDirection {
  const lastScrollY = useRef(0);
  const [direction, setDirection] = useState<ScrollDirection>("top");

  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    if (current === 0) setDirection("top");
    else if (current > lastScrollY.current) setDirection("down");
    else setDirection("up");
    lastScrollY.current = current;
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return direction;
}
