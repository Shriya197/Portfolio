"use client";


import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useRef } from "react";
import { spring } from "@/lib/motion";



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
    </>
  );
}