"use client";

import { useEffect } from "react";

export function BackgroundSystem() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${Math.round((event.clientX / window.innerWidth) * 100)}%`);
      document.documentElement.style.setProperty("--my", `${Math.round((event.clientY / window.innerHeight) * 100)}%`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="meshBackground" aria-hidden="true" />
      <div className="proceduralPattern" aria-hidden="true" />
      <div className="ambientLayer" aria-hidden="true">
        <span className="bubble bubbleOne" />
        <span className="bubble bubbleTwo" />
        <span className="bubble bubbleThree" />
        <span className="liquidBlob blobOne" />
        <span className="liquidBlob blobTwo" />
        <span className="floatingRing ringOne" />
        <span className="floatingRing ringTwo" />
        <span className="lightStreak streakOne" />
        <span className="lightStreak streakTwo" />
        <span className="particleField" />
      </div>
    </>
  );
}
