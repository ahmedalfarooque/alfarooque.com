"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Gem, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyContent, Locale } from "@/types/content";

const icons = [Building2, ShieldCheck, Network, Gem];

export function HomeHero({ company, locale }: { company: CompanyContent; locale: Locale }) {
  const slides = company.heroSlides ?? [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[active] ?? {
    title: company.hero.title,
    description: company.hero.body,
    image: "/images/home/slide-1.webp"
  };

  return (
    <section className="premiumHero">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="heroSlideBg"
          style={{ "--hero-image": `url(${slide.image})` } as React.CSSProperties}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </AnimatePresence>
      <motion.div className="heroGlass glass" initial={{ opacity: 0, scale: 0.82, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>
        <div className="heroCopy">
          <p className="eyebrow">{company.hero.eyebrow}</p>
          <AnimatePresence mode="wait">
            <motion.div key={slide.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55 }}>
              <h1 className="gradientTitle">{highlightHeroTitle(slide.title)}</h1>
              <p className="lead">{slide.description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="buttonRow">
            <Link className="btn primary" href={`/${locale}/businesses`}>
              {locale === "ar" ? "استكشف المجموعة" : "Explore the group"}
              <ArrowRight size={18} />
            </Link>
            <Link className="btn ghost" href={`/${locale}/contact`}>
              {locale === "ar" ? "ابدأ استفسارك" : "Start an inquiry"}
            </Link>
          </div>
          <div className="slideDots" aria-label="Hero slides">
            {slides.map((item, index) => (
              <button className={index === active ? "active" : ""} key={item.title} onClick={() => setActive(index)} aria-label={`Slide ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="corporateOrb" aria-hidden="true">
          <div className="liquidShape" />
          {icons.map((Icon, index) => (
            <motion.div className={`floatIcon floatIcon${index + 1}`} key={index} animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}>
              <Icon size={22} />
            </motion.div>
          ))}
          <div className="orbRing ringA" />
          <div className="orbRing ringB" />
        </div>
      </motion.div>
    </section>
  );
}

function highlightHeroTitle(title: string) {
  const match = title.match(/(Since 1980|منذ عام 1980)/);
  if (!match) return title;
  const [highlight] = match;
  const parts = title.split(highlight);
  return (
    <>
      {parts[0]}
      <span>{highlight}</span>
      {parts[1]}
    </>
  );
}
