"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { t } from "@/lib/labels";
import type { GalleryItem, Locale } from "@/types/content";

const categories = ["all", "wood", "paint", "auto", "salon"] as const;

export function GalleryExperience({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const labels = t(locale);
  const [active, setActive] = useState<(typeof categories)[number]>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const visible = active === "all" ? items : items.filter((item) => item.category === active);

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
          <button className="glass masonryItem" key={item.title} onClick={() => setSelected(item)} type="button">
            <Image src={item.image} width={720} height={520} alt={item.title} />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div className="drawerOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="glass card" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} style={{ width: "min(980px, 92vw)", margin: "7vh auto" }}>
            <Image src={selected.image} width={1200} height={760} alt={selected.title} style={{ width: "100%", height: "auto", borderRadius: 30 }} />
              <h3>{selected.title}</h3>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
