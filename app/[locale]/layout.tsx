import { notFound } from "next/navigation";
import { BackgroundSystem } from "@/components/effects/BackgroundSystem";
import { ScrollEffects } from "@/components/effects/ScrollEffects";
import { StructuredData } from "@/components/effects/StructuredData";
import { ThemeProvider } from "@/components/effects/ThemeProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { directionFor, isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <div className="siteShell" lang={locale} dir={directionFor(locale)}>
      <ThemeProvider>
        <StructuredData locale={locale} />
        <BackgroundSystem />
        <ScrollEffects />
        <Navbar locale={locale} />
        {children}
        <Footer locale={locale} />
      </ThemeProvider>
    </div>
  );
}
