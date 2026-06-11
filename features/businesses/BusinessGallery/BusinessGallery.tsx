"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GalleryCard } from "./GalleryCard";
import { galleryHeading } from "./galleryData";
import { useCarousel } from "./useCarousel";
import type { GalleryItem, Locale } from "@/types/content";

const FullscreenViewer = dynamic(
  () => import("./FullscreenViewer").then((module) => module.FullscreenViewer),
  { ssr: false }
);

export type BusinessGalleryVariant = "rotunda" | "dramatic-rotunda" | "auto-rotunda" | "drag" | "momentum" | "photographer" | "auto-portfolio";

export function BusinessGallery({
  items,
  locale,
  variant = "rotunda",
  heading = "visual"
}: {
  items: GalleryItem[];
  locale: Locale;
  variant?: BusinessGalleryVariant;
  heading?: "portfolio" | "visual";
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [railStep, setRailStep] = useState(204);
  const { rotation, draggedRef, handlers, pause, resume } = useCarousel(items.length, { autoSpeed: variant === "auto-rotunda" ? 0.005 : undefined });
  const headingText = galleryHeading(locale, heading);
  const isRail = variant === "drag" || variant === "momentum" || variant === "photographer" || variant === "auto-portfolio";
  const isSeamlessRail = isRail;
  const railCycleWidth = isSeamlessRail ? items.length * railStep : 0;
  const railSpeed = railCycleWidth > 0 ? railCycleWidth / 360 : 0;
  const railItems = useMemo(() => {
    if (!isRail) return [];
    return isSeamlessRail ? [...items, ...items, ...items] : [...items, ...items];
  }, [isRail, isSeamlessRail, items]);
  const railOffset = isSeamlessRail && railCycleWidth > 0
    ? -railCycleWidth + (((rotation * railSpeed) % railCycleWidth) + railCycleWidth) % railCycleWidth
    : rotation * railSpeed;

  useEffect(() => {
    if (!isSeamlessRail) return;
    const updateStep = () => {
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth <= 1040;
      if (variant === "momentum") {
        setRailStep(isMobile ? 166 : isTablet ? 232 : 290);
      } else if (variant === "drag") {
        setRailStep(isMobile ? 146 : isTablet ? 226 : 272);
      } else {
        setRailStep(isMobile ? 164 : isTablet ? 184 : 204);
      }
    };
    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, [isSeamlessRail, variant]);

  const openImage = useCallback((index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    pause();
    setActiveIndex(index);
  }, [draggedRef, pause]);

  const close = useCallback(() => {
    setActiveIndex(null);
    resume();
  }, [resume]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => current === null ? current : (current - 1 + items.length) % items.length);
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => current === null ? current : (current + 1) % items.length);
  }, [items.length]);

  return (
    <div className={`businessCarouselShell galleryVariant-${variant}`}>
      <div className="businessCarouselHeader">
        <p>{headingText.eyebrow}</p>
        <h2>{headingText.title}</h2>
      </div>

      {isRail ? (
        <div
          className="businessRailStage"
          aria-label={locale === "ar" ? "معرض أعمال بالسحب" : "Draggable business gallery"}
          {...handlers}
        >
          <div
            className="businessRailTrack"
            style={{ transform: `translate3d(${railOffset}px, 0, 0)` }}
          >
            {railItems.map((item, index) => {
              const sourceIndex = index % items.length;
              return (
                <button
                  className="railGalleryCard"
                  type="button"
                  onClick={() => openImage(sourceIndex)}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onFocus={pause}
                  onBlur={resume}
                  key={`${item.title}-${index}`}
                  aria-label={item.title}
                >
                  <Image src={item.image} width={720} height={960} alt={item.title} loading={index < 8 ? "eager" : "lazy"} sizes="(max-width: 640px) 140px, (max-width: 1040px) 160px, 180px" />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="businessCarouselStage"
          aria-label={locale === "ar" ? "معرض أعمال ثلاثي الأبعاد" : "3D business portfolio gallery"}
          {...handlers}
        >
          <div className="carouselGlow carouselGlowA" />
          <div className="carouselGlow carouselGlowB" />
          <div className="carouselRing">
            {items.map((item, index) => (
              <GalleryCard
                item={item}
                index={index}
                total={items.length}
                rotation={rotation}
                onOpen={() => openImage(index)}
                onHoverStart={pause}
                onHoverEnd={resume}
                softScale={variant === "auto-rotunda"}
                key={`${item.title}-${item.image}`}
              />
            ))}
          </div>
        </div>
      )}

      {activeIndex !== null ? <FullscreenViewer items={items} activeIndex={activeIndex} locale={locale} onClose={close} onPrevious={showPrevious} onNext={showNext} /> : null}
    </div>
  );
}
