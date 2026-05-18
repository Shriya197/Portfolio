"use client";

import { useMemo } from "react";
import { arrayCheck, heroSocialLinks, leetcodeIcon} from "@/utils";
import { motion } from "framer-motion";
import { spring, fadeInUp, fadeInUpStagger, staggerContainer, fadeInScale, iconButtonHover, iconButtonTap } from "@/lib/motion";
import { SECTION_MAX_WIDTH } from "@/lib/constants";
import Experience from "./Experience";
import Skills from "./Skills";
import { calculateExperience } from "@/lib/experience";

const Hero = () => {
  const socialButtons = heroSocialLinks.map((s) => ({
        href: s.link,
        iconClass: s.icon,
        label: s.label ?? s.name,
        customIcon:  s.link.includes("leetcode") ? leetcodeIcon : undefined
      }));
  

  const exp = calculateExperience(2,2022);

  return (
    <section className={`w-full ${SECTION_MAX_WIDTH} mx-auto mt-20 lg:mt-24 pt-8 pb-6 px-4 sm:px-6 md:px-8 box-border`} id="home">
      <motion.div
        className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-w-0 w-full"
        initial="hidden"
        animate="visible"
        variants={fadeInUpStagger}
      >
        <motion.div
          className="flex flex-col justify-center text-center  flex-1 min-w-0 w-full order-2 md:order-1 items-center "
          variants={staggerContainer}
        >
          <motion.span
  className="badge-accent inline-block w-fit text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border mx-auto md:mx-0"
  variants={fadeInUp}
>
            Frontend Focused Full Stack Developer
          </motion.span>
          <motion.h1
            className="text-display font-bold tracking-tight text-foreground mb-4 break-words effect-gradient-text"
            variants={fadeInUp}
          >
            Shriya Singh
          </motion.h1>
          <motion.p
            className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-4xl mx-auto"
            variants={fadeInUp}
          >
          Software engineer with {exp} years of experience specializing in React, Next.js, and Angular to build high-performance, scalable web applications. My expertise extends across the full stack using Node.js and MongoDB, allowing me to bridge the gap between complex backend logic and seamless user interfaces. Beyond writing code, 
          I am a continuous learner dedicated to mastering modern architectural patterns and evolving my technical skill set. I thrive on solving intricate problems and staying ahead of the curve in the ever-changing web ecosystem.          
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
                  className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-card border border-border/80 text-foreground/80 shadow-soft dark:shadow-soft-dark hover:text-accent hover:border-accent/50 dark:hover:border-accent/70 hover:bg-accent-soft-hover hover:shadow-glow-sm transition-all duration-200 ease-out"
                  variants={fadeInScale}
                  whileHover={iconButtonHover}
                  whileTap={iconButtonTap}
                  aria-label={btn.label}
                  title={btn.label}
                >
                  <span className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                    {btn.customIcon ?? <i className={`${btn.iconClass} text-xl`} aria-hidden />}
                  </span>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-medium text-foreground bg-card dark:bg-card border border-border rounded-lg shadow-soft dark:shadow-soft-dark whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {btn.label}
                  </span>
                </motion.a>
              ))}
          </motion.div>
        </motion.div>

      </motion.div>
      <motion.div
        className="mt-8 rounded-3xl bg-card/80 dark:bg-card/90 backdrop-blur-sm shadow-soft dark:shadow-soft-dark overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.smooth, delay: 0.1 }}
      >
        <div className="p-5 md:p-6">
          <Skills/>
        </div>
      </motion.div>
      <motion.div
        className="mt-8 rounded-3xl bg-card/80 dark:bg-card/90 backdrop-blur-sm shadow-soft dark:shadow-soft-dark overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.smooth, delay: 0.1 }}
      >
        <div className="p-5 md:p-6">
          <Experience/>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
