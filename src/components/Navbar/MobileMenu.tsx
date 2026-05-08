"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { arrayCheck } from "@/utils";
import type { NavLink } from "@/types";
import type { Theme } from "@/types";
import { spring, buttonTap } from "@/lib/motion";
import { NavLinks } from "./NavLinks";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeHref: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  theme: Theme;
  onThemeToggle: () => void;
};

export function MobileMenu({
  isOpen,
  onClose,
  links,
  activeHref,
  onNavigate,
  theme,
  onThemeToggle,
}: MobileMenuProps) {
  if (!isOpen || typeof document === "undefined") return null;
  return createPortal(
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
        aria-label="Close menu"
      />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={spring.snappy}
        className="fixed right-4 top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-[70] lg:hidden w-auto min-w-[11rem] py-2 px-2 bg-card dark:bg-card shadow-soft dark:shadow-soft-dark border border-border rounded-2xl"
      >
        <div className="flex flex-col gap-0.5">
          {arrayCheck(links) && (
            <NavLinks
              links={links}
              activeHref={activeHref}
              onNavigate={(e, href) => {
                onNavigate(e, href);
                onClose();
              }}
              variant="mobile"
            />
          )}
          <div className="pt-2">
            <motion.button
              onClick={() => {
                onThemeToggle();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-foreground/90 hover:text-accent hover:bg-accent-soft-hover transition-colors touch-manipulation"
              whileTap={buttonTap}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i
                className={`${theme === "dark" ? "fas fa-sun" : "fas fa-moon"} text-base`}
                style={{ width: "18px", height: "18px" }}
                aria-hidden
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
}
