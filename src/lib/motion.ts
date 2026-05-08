export const spring = {
  gentle: { type: "spring" as const, stiffness: 260, damping: 26 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 28 },
  bouncy: { type: "spring" as const, stiffness: 320, damping: 22 },
  smooth: { type: "spring" as const, stiffness: 220, damping: 26 },
  slow: { type: "spring" as const, stiffness: 160, damping: 24 },
  quick: { type: "spring" as const, stiffness: 500, damping: 32 },
};

export const tween = {
  smooth: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as const },
  quick: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
};

export const fadeInUpStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.04,
    },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring.gentle,
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: spring.smooth,
  },
};

export const itemFadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.04,
    },
  },
};

export const buttonHover = { scale: 1.03, y: -2, transition: spring.snappy };
export const buttonTap = { scale: 0.98, transition: spring.quick };
export const iconButtonHover = { scale: 1.04, y: -2, transition: spring.snappy };
export const iconButtonTap = { scale: 0.97, transition: spring.quick };
export const cardHover = { y: -2, transition: spring.snappy };
export const cardTap = { scale: 0.995, transition: spring.quick };
export const pillHover = { y: -2, scale: 1.02, transition: spring.snappy };
export const pillTap = { scale: 0.98, transition: spring.quick };
