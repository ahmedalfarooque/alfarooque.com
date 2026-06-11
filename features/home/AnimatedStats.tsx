"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedStats({ stats }: { stats: Array<{ value: string; label: string }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <div className="stats premiumStats" ref={ref}>
      {stats.map((stat, index) => (
        <motion.div className="glass card stat" key={stat.label} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: index * 0.08 }}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
