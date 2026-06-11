"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    async function setup() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const items = gsap.utils.toArray<HTMLElement>(".card, .imagePanel, .masonryItem");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 22, opacity: 0.86 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%" }
          }
        );
      });
      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    void setup();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
