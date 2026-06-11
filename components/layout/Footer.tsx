import Link from "next/link";
import { getBusinesses, getContacts } from "@/lib/content";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  const businesses = getBusinesses(locale);
  const contacts = getContacts(locale);
  const links = [
    { href: `/${locale}/about`, label: locale === "ar" ? "عن القابضة" : "About Holding" },
    { href: `/${locale}/businesses`, label: locale === "ar" ? "الأعمال" : "Businesses" },
    { href: `/${locale}/projects`, label: locale === "ar" ? "المشاريع" : "Projects" },
    { href: `/${locale}/gallery`, label: locale === "ar" ? "المعرض" : "Gallery" },
    { href: `/${locale}/contact`, label: locale === "ar" ? "تواصل" : "Contact" }
  ];

  return (
    <footer className="footer glass">
      <div className="footerBrand">
        <strong>{locale === "ar" ? "الفاروق القابضة" : "Alfarooque Holding"}</strong>
        <p>{locale === "ar" ? "شركة سعودية خاصة تجمع التصنيع والتجزئة ونمط الحياة والسيارات تحت معيار واحد." : "A Saudi private holding company uniting manufacturing, retail, lifestyle, and automotive ventures under one operating standard."}</p>
      </div>
      <div>
        <h3>{locale === "ar" ? "روابط سريعة" : "Quick links"}</h3>
        {links.map((link) => (
          <p key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </p>
        ))}
      </div>
      <div>
        <h3>{locale === "ar" ? "الأعمال" : "Businesses"}</h3>
        {businesses.map((business) => (
          <p key={business.slug}>
            <Link href={`/${locale}/businesses/${business.slug}`}>{business.name}</Link>
          </p>
        ))}
      </div>
      <div>
        <h3>{locale === "ar" ? "التواصل" : "Contact"}</h3>
        <p>{contacts.departments[0].address}</p>
        <p>{contacts.departments[0].phone}</p>
        <p>{contacts.departments[0].email}</p>
        <div className="socialRow" aria-label="Social links">
          <span>in</span>
          <span>ig</span>
          <span>x</span>
        </div>
      </div>
    </footer>
  );
}
