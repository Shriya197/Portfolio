"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { NavLink } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTION_MAX_WIDTH } from "@/lib/constants";
import { spring, slideInLeft, staggerContainer, buttonTap } from "@/lib/motion";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { theme, toggleTheme } = useTheme();
  const activeHref = useActiveSection(NAV_LINKS, mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={NAV_LINKS}
        activeHref={activeHref}
        onNavigate={handleSmoothScroll}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: scrollDirection === "down" ? "-100%" : "0", opacity: 1 }}
        transition={spring.smooth}
        className="fixed top-0 left-0 right-0 z-50 w-full py-3 px-4 lg:px-6 pt-[calc(0.75rem+env(safe-area-inset-top,0px))]"
      >
        <motion.div
          className={`w-full ${SECTION_MAX_WIDTH} mx-auto px-4 py-2.5 rounded-2xl border border-border bg-card/90 dark:bg-card/95 backdrop-blur-xl shadow-soft dark:shadow-soft-dark overflow-hidden`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center gap-2 min-w-0">
            <motion.div
              className="min-w-0 shrink-0 text-lg font-semibold tracking-tight text-foreground"
              variants={slideInLeft}
            >
              <Link
                href="/"
                className="hover:text-accent transition-all duration-200 ease-out"
              >
                Portfolio
              </Link>
            </motion.div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-accent-soft-hover transition-all duration-200 ease-out touch-manipulation shrink-0"
              variants={slideInLeft}
              whileTap={buttonTap}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <i className="fas fa-bars text-lg" aria-hidden />
            </motion.button>

            <motion.div
              className="hidden lg:flex lg:flex-row lg:items-center gap-0.5 min-w-0"
              variants={staggerContainer}
            >
              <NavLinks
                links={NAV_LINKS}
                activeHref={activeHref}
                onNavigate={handleSmoothScroll}
                variant="desktop"
              />
              <motion.button
                onClick={toggleTheme}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-foreground/90 hover:text-accent hover:bg-accent-soft-hover transition-all duration-200 ease-out ml-1 touch-manipulation"
                variants={slideInLeft}
                whileHover={{ scale: 1.04, rotate: 180, transition: spring.snappy }}
                whileTap={buttonTap}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <i
                  className={`${theme === "dark" ? "fas fa-sun" : "fas fa-moon"} text-base`}
                  style={{ width: "18px", height: "18px" }}
                  aria-hidden
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
