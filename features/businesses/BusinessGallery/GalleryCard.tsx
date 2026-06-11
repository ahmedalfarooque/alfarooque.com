"use client";

import Image from "next/image";
import type { GalleryItem } from "@/types/content";

function normalizeAngle(angle: number) {
  return ((angle + 540) % 360) - 180;
}

export function GalleryCard({
  item,
  index,
  total,
  rotation,
  onOpen,
  onHoverStart,
  onHoverEnd,
  softScale = false
}: {
  item: GalleryItem;
  index: number;
  total: number;
  rotation: number;
  onOpen: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  softScale?: boolean;
}) {
  const angle = (360 / total) * index + rotation;
  const normalized = normalizeAngle(angle);
  const closeness = Math.max(0, (Math.cos((normalized * Math.PI) / 180) + 1) / 2);
  const opacity = Math.max(0.16, 0.22 + closeness * 0.78);
  const scale = softScale ? 0.88 + closeness * 0.12 : 0.68 + closeness * 0.32;
  const blur = softScale ? 0 : closeness < 0.28 ? 1.2 : 0;

  return (
    <button
      className="carouselCard"
      type="button"
      onClick={onOpen}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      aria-label={item.title}
      style={{
        transform: `translate3d(-50%, -50%, 0) rotateY(${angle}deg) translateZ(var(--carousel-depth)) scale(${scale})`,
        opacity,
        zIndex: Math.round(closeness * 1000),
        filter: `blur(${blur}px) brightness(${softScale ? 0.86 + closeness * 0.18 : 0.72 + closeness * 0.33}) saturate(${0.9 + closeness * 0.16})`
      }}
    >
      <Image src={item.image} width={620} height={780} alt={item.title} loading={index < 8 ? "eager" : "lazy"} sizes="(max-width: 640px) 140px, (max-width: 1040px) 180px, 240px" />
    </button>
  );
}
