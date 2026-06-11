import { Building2, Car, Paintbrush, Scissors } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/effects/Reveal";
import type { Business, Locale } from "@/types/content";

const icons = [Building2, Paintbrush, Scissors, Car];

export function BusinessList({ businesses, locale }: { businesses: Business[]; locale: Locale }) {
  return (
    <div className="businessList">
      {businesses.map((business, index) => {
        const Icon = icons[index] ?? Building2;
        return (
          <Reveal key={business.slug} delay={index * 0.04}>
            <article className="glass businessListItem">
              <div className="businessIcon">
                <Icon size={24} />
              </div>
              <div>
                <p className="eyebrow">{business.category}</p>
                <h3>{business.name}</h3>
                <p>{business.summary}</p>
              </div>
              <Link className="btn ghost" href={`/${locale}/businesses/${business.slug}`}>
                {locale === "ar" ? "اعرف المزيد" : "Learn more"}
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
