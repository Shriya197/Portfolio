import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(t);
    }
  }, []);
};
