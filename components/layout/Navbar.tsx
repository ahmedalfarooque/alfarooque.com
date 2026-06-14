"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/config/navigation";
import { oppositeLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { acquireOverlayLock, releaseOverlayLock } from "@/lib/overlayLock";

export function Navbar({ locale }: { locale: Locale }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
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
      <header className="navbar glass">
        <Link className="brand" href={`/${locale}`}>
          <Image src="/images/alfarooque-logo.png" width={42} height={42} alt="" priority />
          <span>{locale === "ar" ? "الفاروق للتصنيع" : "Alfarooque Manufacturing"}</span>
        </Link>
        <nav className="desktopNav" aria-label="Main navigation">
          {items.map((item) => (
            <Link key={item.href} className="navItem" href={item.href}>
              {item.label}
            </Link>
          ))}
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
