"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { arrayCheck, heroSocialLinks, leetcodeIcon } from "@/utils";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  iconButtonHover,
  iconButtonTap,
} from "@/lib/motion";
import { SECTION_MAX_WIDTH } from "@/lib/constants";
import { calculateExperience } from "@/lib/experience";
import SkillSphere from "./SkillSphere";

const Hero = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const socialButtons = useMemo(
    () =>
      heroSocialLinks.map((s) => ({
        href: s.link,
        iconClass: s.icon,
        label: s.label ?? s.name,
        customIcon: s.link.includes("leetcode") ? leetcodeIcon : undefined,
      })),
    [],
  );

  const exp = calculateExperience(2, 2022);

  const accentRgb = isDark ? "94,234,212" : "13,148,136";

  return (
    <>
      <section
        className="relative w-full flex flex-col"
        style={{
          minHeight: "100dvh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: isDark
              ? `radial-gradient(ellipse 55% 60% at 68% 50%, rgba(94,234,212,0.055) 0%, transparent 70%),
                 radial-gradient(ellipse 40% 50% at 30% 50%, rgba(129,140,248,0.04) 0%, transparent 65%)`
              : `radial-gradient(ellipse 55% 60% at 68% 50%, rgba(13,148,136,0.06) 0%, transparent 70%),
                 radial-gradient(ellipse 40% 50% at 30% 50%, rgba(99,102,241,0.04) 0%, transparent 65%)`,
          }}
        />

        <div
          className={`relative flex-1 flex items-center w-full ${SECTION_MAX_WIDTH} mx-auto px-6 sm:px-10 md:px-14`}
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center py-24 md:py-0">
            <motion.div
              className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                className="badge-accent inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border"
                variants={fadeInUp}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isDark ? "#5eead4" : "#0d9488",
                    boxShadow: `0 0 6px rgba(${accentRgb}, 0.8)`,
                    display: "inline-block",
                    animation: "glow-pulse 2s ease-in-out infinite",
                  }}
                />
                Frontend Focused Full Stack Developer
              </motion.span>

              <motion.h1
                className="text-display font-bold tracking-tight mb-5 break-words effect-gradient-text"
                variants={fadeInUp}
              >
                Shriya Singh
              </motion.h1>

              <motion.p
                className="text-sm font-medium mb-3 tracking-wide"
                style={{
                  color: `rgba(${accentRgb}, 0.8)`,
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
                variants={fadeInUp}
              >
                {exp} years of production experience
              </motion.p>

              <motion.p
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--muted)" }}
                variants={fadeInUp}
              >
                I build high-performance, scalable web applications and bridge
                complex backend logic with seamless user interfaces, shipping
                products that are fast, accessible, and delightful to use.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 justify-center md:justify-start"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {arrayCheck(socialButtons) &&
                  socialButtons.map((btn) => (
                    <motion.a
                      key={btn.href}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-card border border-border/80 text-foreground/80 shadow-soft dark:shadow-soft-dark hover:text-accent hover:border-accent/50 hover:bg-accent-soft-hover hover:shadow-glow-sm transition-all duration-200 ease-out"
                      variants={fadeInScale}
                      whileHover={iconButtonHover}
                      whileTap={iconButtonTap}
                      aria-label={btn.label}
                      title={btn.label}
                    >
                      <span className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                        {btn.customIcon ?? (
                          <i
                            className={`${btn.iconClass} text-xl`}
                            aria-hidden
                          />
                        )}
                      </span>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-medium text-foreground bg-card border border-border rounded-lg shadow-soft whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                        {btn.label}
                      </span>
                    </motion.a>
                  ))}
              </motion.div>

              <motion.div
                className="hidden md:flex items-center gap-2 mt-12"
                style={{ color: `rgba(${accentRgb}, 0.4)` }}
                variants={fadeInUp}
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="14"
                    height="24"
                    rx="7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <motion.rect
                    x="6.5"
                    y="5"
                    width="3"
                    height="5"
                    rx="1.5"
                    fill="currentColor"
                    animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}
                >
                  scroll
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: [0.34, 1.12, 0.64, 1],
                delay: 0.2,
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: -60,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(${accentRgb}, ${isDark ? 0.1 : 0.07}) 0%, transparent 65%)`,
                    pointerEvents: "none",
                    filter: "blur(20px)",
                  }}
                />
                <SkillSphere />
              </div>
            </motion.div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: `linear-gradient(to bottom, transparent, var(--background))`,
            pointerEvents: "none",
          }}
        />
      </section>
    </>
  );
};

export default Hero;
