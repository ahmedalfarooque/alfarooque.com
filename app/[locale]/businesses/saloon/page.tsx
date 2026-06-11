import { BusinessDetailPage } from "@/features/businesses/BusinessDetailPage";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BusinessDetailPage locale={(isLocale(locale) ? locale : "en") as Locale} slug="saloon" />;
}
