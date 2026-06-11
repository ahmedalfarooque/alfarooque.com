"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { carouselMotion } from "./animations";
import { getGalleryMeta } from "./galleryData";
import type { GalleryItem, Locale } from "@/types/content";

export function FullscreenViewer({
  items,
  activeIndex,
  locale,
  onClose,
  onPrevious,
  onNext
}: {
  items: GalleryItem[];
  activeIndex: number | null;
  locale: Locale;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const selected = activeIndex === null ? null : items[activeIndex];
  const isRtl = locale === "ar";

  const previous = useCallback(() => {
    if (isRtl) onNext();
    else onPrevious();
  }, [isRtl, onNext, onPrevious]);

  const next = useCallback(() => {
    if (isRtl) onPrevious();
    else onNext();
  }, [isRtl, onNext, onPrevious]);

  useEffect(() => {
    if (activeIndex === null) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLElement>(".viewerControl"));
        if (!controls.length) return;
        const current = document.activeElement as HTMLElement | null;
        const currentIndex = current ? controls.indexOf(current) : -1;
        if (event.shiftKey && currentIndex <= 0) {
          event.preventDefault();
          controls[controls.length - 1].focus();
        } else if (!event.shiftKey && currentIndex === controls.length - 1) {
          event.preventDefault();
          controls[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, next, onClose, previous]);

  if (!selected || activeIndex === null) return null;
  const meta = getGalleryMeta(selected, locale, activeIndex, items.length);
  const preloadPrevious = items[(activeIndex - 1 + items.length) % items.length];
  const preloadNext = items[(activeIndex + 1) % items.length];

  const onTouchEnd = (clientX: number) => {
    if (touchStart.current === null) return;
    const distance = clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 44) return;
    if (distance > 0) previous();
    else next();
  };

  return (
    <AnimatePresence>
      <motion.div className="portfolioViewer" {...carouselMotion.modal} role="dialog" aria-modal="true" aria-label={meta.title} onClick={onClose}>
        <button ref={closeRef} className="viewerControl viewerClose" type="button" onClick={onClose} aria-label={locale === "ar" ? "إغلاق" : "Close"}>×</button>
        <button className="viewerControl viewerPrev" type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label={locale === "ar" ? "السابق" : "Previous"}>‹</button>
        <motion.div
          className="portfolioViewerFrame"
          {...carouselMotion.viewer}
          onClick={(event) => event.stopPropagation()}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
        >
          <Image src={selected.image} width={1800} height={1200} alt={selected.title} priority sizes="(max-width: 640px) 94vw, 70vw" />
          <div className="portfolioViewerMeta">
            <div>
              <h3>{meta.title}</h3>
              <p>{meta.category}</p>
              <p>{meta.projectType}</p>
              <span>{meta.location}</span>
            </div>
            <div>
              <p>{meta.description}</p>
              {meta.finish ? <p>{locale === "ar" ? "التشطيب المتاح: " : "Available Finish: "}{meta.finish}</p> : null}
              {meta.application ? <p>{locale === "ar" ? "نوع التطبيق: " : "Application Type: "}{meta.application}</p> : null}
              <strong>{meta.counter}</strong>
            </div>
          </div>
          <Image src={preloadPrevious.image} width={1} height={1} alt="" aria-hidden="true" className="viewerPreload" />
          <Image src={preloadNext.image} width={1} height={1} alt="" aria-hidden="true" className="viewerPreload" />
        </motion.div>
        <button className="viewerControl viewerNext" type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label={locale === "ar" ? "التالي" : "Next"}>›</button>
      </motion.div>
    </AnimatePresence>
  );
}
