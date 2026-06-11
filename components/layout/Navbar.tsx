"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/config/navigation";
import { getBusinesses } from "@/lib/content";
import { oppositeLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { acquireOverlayLock, overlayIsLocked, releaseOverlayLock } from "@/lib/overlayLock";

export function Navbar({ locale }: { locale: Locale }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const businesses = getBusinesses(locale);
  const items = navItems(locale);
  const nextLocale = oppositeLocale(locale);
  const switchedPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
  const drawerLockId = "mobile-navigation-drawer";
  const openDrawer = () => {
    if (!acquireOverlayLock(drawerLockId)) return;
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    releaseOverlayLock(drawerLockId);
  };

  useEffect(() => {
    return () => releaseOverlayLock(drawerLockId);
  }, []);

  return (
    <>
      <header className="navbar glass" onMouseLeave={() => setMegaOpen(false)}>
        <Link className="brand" href={`/${locale}`}>
          <Image src="/images/alfarooque-logo.png" width={42} height={42} alt="" priority />
          <span>{locale === "ar" ? "الفاروق القابضة" : "Alfarooque Holding"}</span>
        </Link>
        <nav className="desktopNav" aria-label="Main navigation">
          {items.map((item) =>
            item.mega ? (
              <button key={item.href} className="navItem" onMouseEnter={() => { if (!overlayIsLocked()) setMegaOpen(true); }} onFocus={() => { if (!overlayIsLocked()) setMegaOpen(true); }}>
                {item.label}
              </button>
            ) : (
              <Link key={item.href} className="navItem" href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="navActions">
          <ThemeToggle />
          <Link className="btn ghost" href={switchedPath}>
            {locale === "ar" ? "English" : "العربية"}
          </Link>
          <button className="mobileButton" aria-label="Open navigation" onClick={openDrawer}>
            <Menu size={20} />
          </button>
        </div>
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              className="megaMenu glass"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {businesses.map((business) => (
                <Link className="megaCard" href={`/${locale}/businesses/${business.slug}`} key={business.slug}>
                  <Image src={business.image} width={72} height={72} alt="" />
                  <span>{business.name}</span>
                </Link>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.button
              className="drawerOverlay"
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.aside
              className="mobileDrawer glass"
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
            >
              <button className="mobileButton" aria-label="Close navigation" onClick={closeDrawer}>
                <X size={20} />
              </button>
              {items.map((item) => (
                <Link key={item.href} className="navItem" href={item.href} onClick={closeDrawer}>
                  {item.label}
                </Link>
              ))}
              <Link className="btn ghost" href={switchedPath} onClick={closeDrawer}>
                {locale === "ar" ? "English" : "العربية"}
              </Link>
              <ThemeToggle />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
