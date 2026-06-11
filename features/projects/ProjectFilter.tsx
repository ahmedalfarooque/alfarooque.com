"use client";

import Link from "next/link";
import { useState } from "react";
import { t } from "@/lib/labels";
import type { Locale, Project } from "@/types/content";

const categories = ["all", "wood", "paint", "auto", "salon"] as const;

export function ProjectFilter({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const labels = t(locale);
  const [active, setActive] = useState<(typeof categories)[number]>("all");
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <div className="filterBar" role="tablist" aria-label="Project filters">
        {categories.map((category) => (
          <button
            className={`filterChip ${active === category ? "active" : ""}`}
            key={category}
            onClick={() => setActive(category)}
            type="button"
          >
            {labels[category]}
          </button>
        ))}
      </div>
      <div className="projectList">
        {visible.map((project) => (
          <article className="glass projectRow" key={project.id}>
            <div>
              <p className="eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="projectMeta">
              <span>{project.location}</span>
              <strong>{project.value}</strong>
              <Link className="btn ghost" href={`/${locale}/projects/${project.id}`}>
                {labels.viewProject}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
