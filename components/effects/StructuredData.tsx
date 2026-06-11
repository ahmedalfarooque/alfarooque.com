import { getBusinesses, getContacts } from "@/lib/content";
import type { Locale } from "@/types/content";

export function StructuredData({ locale }: { locale: Locale }) {
  const businesses = getBusinesses(locale);
  const contacts = getContacts(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ar" ? "الفاروق القابضة" : "Alfarooque Holding",
    url: "https://www.alfarooque.com",
    logo: "https://www.alfarooque.com/images/alfarooque-logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: contacts.departments[0].address,
      addressCountry: "SA"
    },
    department: businesses.map((business) => ({
      "@type": "Organization",
      name: business.name,
      description: business.summary
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
