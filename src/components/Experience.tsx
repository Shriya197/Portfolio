"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SECTION_MAX_WIDTH } from "@/lib/constants";
import type { ExperienceItem } from "@/types";
import {
  fadeInUp,
  fadeInLeft,
  fadeInScale,
  staggerSlow,
  bulletFadeIn,
  cardHover,
  cardTap,
} from "@/lib/motion";
import { experienceData } from "@/utils/data";

function ExperienceCard({
  item,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isCurrent = item.endDate === "Present";

  return (
    <div ref={ref} className="relative flex gap-3 md:gap-8">
      <div className="hidden md:flex flex-col items-end w-28 shrink-0 pt-1.5">
        <motion.span
          className="text-xs font-medium tabular-nums"
          style={{ color: "var(--muted)" }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
        >
          {item.startDate}
        </motion.span>
      </div>

      <div className="flex flex-col items-center shrink-0">
        <motion.div
          className="relative z-10 mt-1.5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInScale}
        >
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{
              background: isCurrent ? "var(--accent)" : "var(--card)",
              borderColor: "var(--accent)",
              boxShadow: isCurrent
                ? "0 0 10px rgba(var(--accent-rgb), 0.55)"
                : "none",
            }}
          />
          {isCurrent && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "rgba(var(--accent-rgb), 0.25)" }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            className="w-px mt-2 flex-1 origin-top"
            style={{ background: "var(--border)", minHeight: "3rem" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          />
        )}
      </div>

      <motion.div
        className="flex-1 mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        {isCurrent && (
          <motion.span
            className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border mb-3"
            style={{
              color: "var(--accent)",
              background: "rgba(var(--accent-rgb), 0.10)",
              borderColor: "rgba(var(--accent-rgb), 0.25)",
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            Current
          </motion.span>
        )}

        <motion.div
          className="rounded-2xl border p-5 md:p-6 cursor-default"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          whileHover={{
            ...cardHover,
            borderColor: "rgba(var(--accent-rgb), 0.35)",
          }}
          whileTap={cardTap}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 0 1px rgba(var(--accent-rgb), 0.12), 0 8px 32px -4px rgba(var(--accent-rgb), 0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "var(--border)";
          }}
        >
          {/* header */}
          <div className="mb-3">
            <h3
              className="text-base font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {item.institution}
            </h3>
            <p
              className="text-sm mt-0.5 font-medium"
              style={{ color: "var(--accent)" }}
            >
              {item.title}
            </p>
          </div>

          {/* meta */}
          <p
            className="text-xs tabular-nums mb-4"
            style={{ color: "var(--muted)" }}
          >
            {item.startDate} – {item.endDate}
          </p>

          {/* bullets */}
          {item.description && (
            <motion.ul
              className="space-y-2.5"
              variants={staggerSlow}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {item.description.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                  variants={bulletFadeIn}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      className={`w-full ${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 md:px-8`}
      id="experience"
    >
      <motion.div
        ref={headingRef}
        className="mb-16"
        initial="hidden"
        animate={headingInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <motion.span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
          style={{
            color: "var(--accent)",
            background: "rgba(var(--accent-rgb), 0.08)",
            borderColor: "rgba(var(--accent-rgb), 0.2)",
          }}
          variants={fadeInLeft}
        >
          CAREER
        </motion.span>
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          style={{ color: "var(--foreground)" }}
        >
          My Journey
        </h2>
      </motion.div>

      <div className="relative">
        {experienceData.map((item, index) => (
          <ExperienceCard
            key={`${item.institution}-${index}`}
            item={item}
            index={index}
            isLast={index === experienceData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
