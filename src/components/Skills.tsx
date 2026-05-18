"use client";

import { useRef } from "react";
import { arrayCheck, skillCategories } from "@/utils";
import { motion, useInView } from "framer-motion";
import { fadeInUp, fadeInLeft, staggerSlow, bulletFadeIn } from "@/lib/motion";

const CategoryBadge = ({ title }: { title: string }) => (
  <motion.span
    className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border mb-4"
    style={{
      color: "var(--accent)",
      background: "rgba(var(--accent-rgb), 0.10)",
      borderColor: "rgba(var(--accent-rgb), 0.25)",
    }}
    variants={fadeInLeft}
  >
    {title}
  </motion.span>
);

const SkillBlock = ({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border p-5 md:p-6"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(var(--accent-rgb), 0.35)";
        el.style.boxShadow =
          "0 0 0 1px rgba(var(--accent-rgb), 0.12), 0 8px 32px -4px rgba(var(--accent-rgb), 0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      <CategoryBadge title={title} />

      <motion.ul
        className="flex flex-wrap gap-2"
        variants={staggerSlow}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {arrayCheck(items) &&
          items.map((name, i) => (
            <motion.li
              key={`${title}-${i}`}
              variants={bulletFadeIn}
              className="list-none"
            >
              <span
                className="skill-pill inline-block px-3 py-1.5 rounded-lg text-sm font-medium cursor-default select-none"
                style={{
                  color: "var(--muted)",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  transition:
                    "color 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.color = "var(--accent)";
                  el.style.borderColor = "rgba(var(--accent-rgb), 0.45)";
                  el.style.backgroundColor = "rgba(var(--accent-rgb), 0.06)";
                  el.style.boxShadow =
                    "0 0 10px -2px rgba(var(--accent-rgb), 0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.color = "var(--muted)";
                  el.style.borderColor = "var(--border)";
                  el.style.backgroundColor = "transparent";
                  el.style.boxShadow = "none";
                }}
              >
                {name}
              </span>
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      className="mb-6"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
        SKILLS
      </motion.span>
      <h3
        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        style={{ color: "var(--foreground)" }}
      >
        Technologies & Strength
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arrayCheck(skillCategories) &&
          skillCategories.map((category, i) => (
            <SkillBlock
              key={category.title}
              title={category?.title ?? ""}
              items={category?.items ?? []}
              index={i}
            />
          ))}
      </div>
    </motion.section>
  );
};

export default Skills;
