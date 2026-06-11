"use client";

import { motion } from "framer-motion";

export function GlassCard({
  children,
  className = "",
  style
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`glass card ${className}`}
      style={style}
      whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
