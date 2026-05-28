"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SECTION_MAX_WIDTH } from "@/lib/constants";
import { fadeInUp, fadeInLeft } from "@/lib/motion";

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const resumePath = "https://drive.google.com/file/d/1-IKKpaXp4Etopka3j4KUCX84Khe2evyZ/view?usp=sharing";
export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className={`w-full ${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 md:px-8 pb-20`}
      id="contact"
    >
      <motion.div
        ref={ref}
        className="rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(var(--accent-rgb), 0.3)";
          el.style.boxShadow = "0 0 0 1px rgba(var(--accent-rgb), 0.08), 0 8px 32px -4px rgba(var(--accent-rgb), 0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >

        <motion.div className="flex flex-col gap-2" variants={fadeInLeft}>
          <motion.span
            className="inline-block w-fit text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border mb-1"
            style={{
              color: "var(--accent)",
              background: "rgba(var(--accent-rgb), 0.10)",
              borderColor: "rgba(var(--accent-rgb), 0.25)",
            }}
          >
            Available
          </motion.span>
          <h2
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Get in touch
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "var(--muted)" }}
          >
            Open to full-time opportunities. If you're hiring or have a role
            that fits, I'd love to connect.
          </p>
        </motion.div>


        <motion.div
          className="flex items-center gap-3 shrink-0"
          variants={fadeInUp}
        >
          {/* Send email  */}
          <a
            href="mailto:shriyasingh.work@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              color: "var(--background)",
              background: "var(--accent)",
              boxShadow: "0 0 18px -4px rgba(var(--accent-rgb), 0.55)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--accent-hover)";
              el.style.boxShadow = "0 0 24px -4px rgba(var(--accent-rgb), 0.75)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--accent)";
              el.style.boxShadow = "0 0 18px -4px rgba(var(--accent-rgb), 0.55)";
              el.style.transform = "translateY(0)";
            }}
          >
            Send email
          </a>

          {/* View resume */}
          <a
            href= {resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200"
            style={{
              color: "var(--foreground)",
              borderColor: "var(--border)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(var(--accent-rgb), 0.4)";
              el.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--foreground)";
            }}
          >
            View resume
          </a>

          {/* Download resume icon button */}
          <a
            href={resumePath}
            download
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200"
            style={{
              color: "var(--muted)",
              borderColor: "var(--border)",
              background: "transparent",
            }}
            aria-label="Download resume"
            title="Download resume"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(var(--accent-rgb), 0.4)";
              el.style.color = "var(--accent)";
              el.style.boxShadow = "0 0 10px -2px rgba(var(--accent-rgb), 0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--muted)";
              el.style.boxShadow = "none";
            }}
          >
            <DownloadIcon />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}