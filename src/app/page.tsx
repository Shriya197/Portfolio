"use client";

import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useRef } from "react";
import { spring } from "@/lib/motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import { SECTION_MAX_WIDTH } from "@/lib/constants";

export default function Home() {
  const homeRef = useRef(null);

  return (
    <>
      <motion.section
        ref={homeRef}
        id="home"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.smooth}
      >
        <Hero />
      </motion.section>

      {/* ── Skills ── */}
      <section id="skills" className={`w-full ${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-28`}>
        <motion.div
          className="rounded-3xl bg-card/80 dark:bg-card/90 backdrop-blur-sm shadow-soft dark:shadow-soft-dark overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-6 md:p-10">
            <Skills />
          </div>
        </motion.div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className={`w-full ${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-28`}>
        <motion.div
          className="rounded-3xl bg-card/80 dark:bg-card/90 backdrop-blur-sm shadow-soft dark:shadow-soft-dark overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-6 md:p-10">
          <Experience />
          </div>
        </motion.div>
      </section>
    </>
  );
}