"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/effects/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="themeToggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
