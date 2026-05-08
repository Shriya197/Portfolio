"use client";

import { motion } from "framer-motion";
import type { NavLink } from "@/types";
import { arrayCheck } from "@/types";
import { slideInLeft, buttonHover, buttonTap } from "@/lib/motion";

const navLinkClass = (isActive: boolean, variant: "mobile" | "desktop") =>
  `rounded-xl text-sm font-medium transition-all duration-200 ease-out ${
    isActive ? "text-accent" : "text-foreground/90 hover:text-accent hover:bg-accent-soft-hover"
  } ${variant === "mobile" ? "py-3 px-3" : "px-3 py-2"}`;

type NavLinksProps = {
  links: NavLink[];
  activeHref: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  variant: "mobile" | "desktop";
};

export function NavLinks({ links, activeHref, onNavigate, variant }: NavLinksProps) {
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
            className={navLinkClass(isActive, variant)}
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
