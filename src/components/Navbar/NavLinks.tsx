"use client";

import { motion } from "framer-motion";
import type { NavLink } from "@/types";
import { arrayCheck } from "@/types";
import { slideInLeft, buttonHover, buttonTap } from "@/lib/motion";

type NavLinksProps = {
  links: NavLink[];
  activeHref: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  variant: "mobile" | "desktop";
};

export function NavLinks({
  links,
  activeHref,
  onNavigate,
  variant,
}: NavLinksProps) {
  if (!arrayCheck(links)) return null;
  return (
    <>
      {links.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-xl text-sm font-medium transition-all duration-200 ease-out nav-link ${
              isActive ? "nav-link--active" : ""
            } ${variant === "mobile" ? "py-3 px-3" : "px-3 py-2"}`}
            variants={variant === "desktop" ? slideInLeft : undefined}
            whileHover={variant === "desktop" ? buttonHover : undefined}
            whileTap={buttonTap}
          >
            {link.label}
          </motion.a>
        );
      })}
    </>
  );
}
