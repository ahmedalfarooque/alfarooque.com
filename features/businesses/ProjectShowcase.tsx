"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale, Project } from "@/types/content";

export function ProjectShowcase({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [active, setActive] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <>
      <div className="projectShowcaseGrid">
        {projects.map((project) => (
          <button className="projectGlassCard" type="button" key={project.id} onClick={() => setActive(project)}>
            <p className="eyebrow">{project.value}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <span>{project.location}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div className="projectViewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
            <button ref={closeRef} className="viewerControl viewerClose" type="button" onClick={() => setActive(null)} aria-label={locale === "ar" ? "إغلاق" : "Close"}>×</button>
            <motion.div className="projectViewerPanel" initial={{ opacity: 0, scale: 0.92, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 18 }} onClick={(event) => event.stopPropagation()}>
              <p className="eyebrow">{locale === "ar" ? "عارض المشروع" : "Project Viewer"}</p>
              <h2>{active.title}</h2>
              <dl>
                <div><dt>{locale === "ar" ? "نوع المشروع" : "Project Type"}</dt><dd>{active.value}</dd></div>
                <div><dt>{locale === "ar" ? "الوصف" : "Description"}</dt><dd>{active.story || active.summary}</dd></div>
                <div><dt>{locale === "ar" ? "المواد المستخدمة" : "Materials Used"}</dt><dd>{locale === "ar" ? "خشب معماري، قشرة، ألواح هندسية، وإكسسوارات تنفيذ" : "Architectural wood, veneer, engineered boards, and project hardware"}</dd></div>
                <div><dt>{locale === "ar" ? "الموقع" : "Location"}</dt><dd>{active.location}</dd></div>
                <div><dt>{locale === "ar" ? "سنة الإنجاز" : "Completion Year"}</dt><dd>{locale === "ar" ? "مرجع مشروع مكتمل" : "Completed project reference"}</dd></div>
              </dl>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
