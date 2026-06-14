import Link from "next/link";
import { getContacts } from "@/lib/content";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  const contacts = getContacts(locale);
  const links = [
    { href: `/${locale}`, label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: `/${locale}/about`, label: locale === "ar" ? "من نحن" : "About" },
    { href: `/${locale}/services`, label: locale === "ar" ? "الخدمات" : "Services" },
    { href: `/${locale}/gallery`, label: locale === "ar" ? "المعرض" : "Gallery" },
    { href: `/${locale}/contact`, label: locale === "ar" ? "تواصل معنا" : "Contact" }
  ];

  const services = [
    { href: `/${locale}/services#wood-works`, label: locale === "ar" ? "أعمال الخشب" : "Wood Works" },
    { href: `/${locale}/services#steel-works`, label: locale === "ar" ? "أعمال الفولاذ" : "Steel Works" },
    { href: `/${locale}/services#aluminium-works`, label: locale === "ar" ? "أعمال الألمنيوم" : "Aluminium Works" }
  ];

  return (
    <footer className="footer glass">
      <div className="footerBrand">
        <strong>{locale === "ar" ? "الفاروق للتصنيع" : "Alfarooque Manufacturing"}</strong>
        <p>{locale === "ar" ? "شركة سعودية متخصصة في أعمال الخشب والفولاذ والألمنيوم بدقة صناعية وجودة معمارية." : "A Saudi company specialising in wood, steel, and aluminium works with industrial precision and architectural quality."}</p>
        <p className="closingLine" style={{ marginTop: 8 }}>Excellent Service • Superior Quality • Reasonable Cost</p>
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
        <h3>{locale === "ar" ? "خدماتنا" : "Services"}</h3>
        {services.map((service) => (
          <p key={service.href}>
            <Link href={service.href}>{service.label}</Link>
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
