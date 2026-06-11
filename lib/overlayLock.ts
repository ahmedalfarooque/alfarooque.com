"use client";

let activeOverlayId: string | null = null;
let scrollY = 0;
let previousBodyOverflow = "";
let previousBodyPosition = "";
let previousBodyTop = "";
let previousBodyWidth = "";
let previousHtmlOverflow = "";

export function acquireOverlayLock(id: string) {
  if (typeof document === "undefined") {
    return true;
  }

  if (activeOverlayId && activeOverlayId !== id) {
    return false;
  }

  if (activeOverlayId === id) {
    return true;
  }

  activeOverlayId = id;
  scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  previousBodyOverflow = document.body.style.overflow;
  previousBodyPosition = document.body.style.position;
  previousBodyTop = document.body.style.top;
  previousBodyWidth = document.body.style.width;
  previousHtmlOverflow = document.documentElement.style.overflow;

  document.documentElement.style.overflow = "hidden";
  document.documentElement.classList.add("is-overlay-open");
  document.body.classList.add("is-overlay-open");
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  return true;
}

export function releaseOverlayLock(id: string) {
  if (typeof document === "undefined" || activeOverlayId !== id) {
    return;
  }

  activeOverlayId = null;
  document.documentElement.style.overflow = previousHtmlOverflow;
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.position = previousBodyPosition;
  document.body.style.top = previousBodyTop;
  document.body.style.width = previousBodyWidth;
  document.documentElement.classList.remove("is-overlay-open");
  document.body.classList.remove("is-overlay-open");
  window.scrollTo(0, scrollY);
}

export function overlayIsLocked() {
  return Boolean(activeOverlayId);
}
