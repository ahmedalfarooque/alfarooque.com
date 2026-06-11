import { Building2, Car, Paintbrush, Scissors } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/effects/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { t } from "@/lib/labels";
import type { Business, Locale } from "@/types/content";

const icons = [Building2, Paintbrush, Scissors, Car];

export function BusinessGrid({ businesses, locale }: { businesses: Business[]; locale: Locale }) {
  const labels = t(locale);
  return (
    <div className="grid four">
      {businesses.map((business, index) => {
        const Icon = icons[index] ?? Building2;
        return (
          <Reveal key={business.slug} delay={index * 0.05}>
            <GlassCard className="businessCard" style={{ backgroundImage: `url(${business.image})` }}>
              <Icon size={28} />
              <p className="eyebrow">{business.category}</p>
              <h3>{business.name}</h3>
              <p>{business.summary}</p>
              <Link className="btn ghost" href={`/${locale}/businesses/${business.slug}`}>
                {labels.exploreBusiness}
              </Link>
            </GlassCard>
          </Reveal>
        );
      })}
    </div>
  );
}
