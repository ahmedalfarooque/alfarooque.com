import { BriefcaseBusiness, Calculator, Factory, Mail, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/features/contact/InquiryForm";
import { getContacts } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

const contactIcons = [BriefcaseBusiness, Factory, Calculator, Scale];

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const contacts = getContacts(locale);
  const primary = contacts.departments[0];

  return (
    <main className="container">
      <section className="hero contactHero">
        <div>
          <p className="eyebrow">{locale === "ar" ? "تواصل مؤسسي" : "Enterprise contact"}</p>
          <h1>{locale === "ar" ? "قنوات واضحة لكل استفسار وشراكة." : "Clear channels for every inquiry and partnership."}</h1>
          <p className="lead">
            {locale === "ar"
              ? "نموذج استفسار متقدم وبطاقات اتصال متعددة وواجهة واتساب جاهزة لتوجيه الطلب إلى القسم المناسب."
              : "An advanced inquiry form, multi-department contact cards, WhatsApp access, and map-ready support for enterprise communication."}
          </p>
          <div className="buttonRow">
            <a className="btn primary" href="https://wa.me/966563000051" target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a className="btn ghost" href={`tel:${primary.phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              {locale === "ar" ? "اتصال مباشر" : "Click to call"}
            </a>
          </div>
        </div>
        <InquiryForm contacts={contacts} />
      </section>

      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "المواقع والأقسام" : "Locations and departments"} title={locale === "ar" ? "نقاط اتصال واضحة لكل احتياج." : "Clear contact points for every need."} />
        <div className="grid two">
          {contacts.departments.map((department, index) => {
            const Icon = contactIcons[index] ?? BriefcaseBusiness;
            const callNumber = department.phone.replaceAll(" ", "");
            const whatsappNumber = callNumber.replace("+", "");
            return (
            <GlassCard className="contactCard" key={department.name}>
              <div className="contactCardHeader">
                <span className="contactIcon"><Icon size={22} /></span>
                <div>
                  <p className="eyebrow">{locale === "ar" ? "قسم الاتصال" : "Contact department"}</p>
                  <h3>{department.name}</h3>
                </div>
              </div>
              <p><MapPin size={17} /> {department.address}</p>
              <p><Phone size={17} /> <a href={`tel:${callNumber}`}>{department.phone}</a></p>
              <p><Mail size={17} /> <a href={`mailto:${department.email}`}>{department.email}</a></p>
              <div className="contactActions">
                <a className="btn ghost" href={`tel:${callNumber}`}>
                  <Phone size={16} />
                  {locale === "ar" ? "اتصال" : "Call"}
                </a>
                <a className="btn ghost" href={`mailto:${department.email}`}>
                  <Mail size={16} />
                  {locale === "ar" ? "بريد" : "Email"}
                </a>
                <a className="btn primary" href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="section grid two">
        <GlassCard className="mapPanel">
          <p className="eyebrow">{locale === "ar" ? "الخريطة" : "Map integration"}</p>
          <h2>{locale === "ar" ? "منطقة جاهزة لتضمين خرائط جوجل." : "Google Maps embed area ready for deployment."}</h2>
          <p>{locale === "ar" ? "يمكن ربط رابط الخريطة الدقيق عند توفيره." : "The exact approved map embed can be connected when the branch URL is available."}</p>
        </GlassCard>
        <GlassCard className="contactWidget">
          <MessageCircle size={28} />
          <h3>{locale === "ar" ? "استجابة أسرع عبر واتساب" : "Faster response through WhatsApp"}</h3>
          <p>{locale === "ar" ? "زر عائم وخيارات اتصال مباشرة تسهل بدء المحادثة من أي جهاز." : "A floating-ready contact action and direct links make it simple to start a conversation from any device."}</p>
          <a className="btn primary" href="https://wa.me/966563000051" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </GlassCard>
      </section>
    </main>
  );
}
