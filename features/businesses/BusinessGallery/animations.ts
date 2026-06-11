export const carouselMotion = {
  modal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  viewer: {
    initial: { opacity: 0, scale: 0.88, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: 18 },
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
  }
} as const;
