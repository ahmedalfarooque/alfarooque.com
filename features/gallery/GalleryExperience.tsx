"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { t } from "@/lib/labels";
import { acquireOverlayLock, releaseOverlayLock } from "@/lib/overlayLock";
import type { GalleryItem, Locale } from "@/types/content";

const categories = ["all", "wood", "paint", "auto", "salon"] as const;

export function GalleryExperience({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const labels = t(locale);
  const [active, setActive] = useState<(typeof categories)[number]>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const visible = active === "all" ? items : items.filter((item) => item.category === active);
  const lockId = "main-gallery-lightbox";
  const openSelected = (item: GalleryItem) => {
    if (!acquireOverlayLock(lockId)) return;
    setSelected(item);
  };
  const closeSelected = () => {
    setSelected(null);
    releaseOverlayLock(lockId);
  };

  useEffect(() => {
    if (!selected) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSelected();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  useEffect(() => {
    return () => releaseOverlayLock(lockId);
  }, []);

  return (
    <>
      <div className="filterBar">
        {categories.map((category) => (
          <button className={`filterChip ${active === category ? "active" : ""}`} key={category} onClick={() => setActive(category)}>
            {labels[category]}
          </button>
        ))}
      </div>
      <div className="galleryGrid">
        {visible.map((item) => (
          <button className="glass masonryItem" key={item.title} onClick={() => openSelected(item)} type="button">
            <Image src={item.image} width={720} height={520} alt={item.title} />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div className="galleryLightboxOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSelected} role="dialog" aria-modal="true" aria-label={selected.title}>
            <motion.div className="glass card galleryLightboxPanel" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(event) => event.stopPropagation()}>
              <button className="viewerControl viewerClose" type="button" onClick={closeSelected} aria-label={locale === "ar" ? "إغلاق" : "Close"}>×</button>
              <Image src={selected.image} width={1200} height={760} alt={selected.title} />
              <h3>{selected.title}</h3>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
