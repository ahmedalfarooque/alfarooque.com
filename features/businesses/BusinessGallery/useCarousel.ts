"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(itemCount: number, options: { autoSpeed?: number } = {}) {
  const [rotation, setRotationState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const pauseTemporarilyRef = useRef(false);
  const autoSpeed = options.autoSpeed ?? 0.0048;

  const setRotation = useCallback((value: number) => {
    rotationRef.current = value;
    setRotationState(value);
  }, []);

  const pauseTemporarily = useCallback(() => {
    pauseTemporarilyRef.current = true;
    setIsPaused(true);
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => {
      pauseTemporarilyRef.current = false;
      setIsPaused(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const tick = (time: number) => {
      const previous = lastTimeRef.current ?? time;
      const delta = Math.min(time - previous, 40);
      lastTimeRef.current = time;

      if (!isPaused && !draggingRef.current && itemCount > 1) {
        velocityRef.current = velocityRef.current * 0.94;
        setRotation(rotationRef.current - (delta * autoSpeed) + velocityRef.current);
      } else if (!draggingRef.current && Math.abs(velocityRef.current) > 0.01) {
        velocityRef.current = velocityRef.current * 0.92;
        setRotation(rotationRef.current + velocityRef.current);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };
    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    };
  }, [autoSpeed, isPaused, itemCount, setRotation]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    draggingRef.current = true;
    draggedRef.current = false;
    lastXRef.current = event.clientX;
    velocityRef.current = 0;
    pauseTemporarilyRef.current = false;
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - lastXRef.current;
    if (Math.abs(delta) > 2) draggedRef.current = true;
    lastXRef.current = event.clientX;
    velocityRef.current = delta * 0.11;
    setRotation(rotationRef.current + delta * 0.13);
  }, [setRotation]);

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    pauseTemporarily();
  }, [pauseTemporarily]);

  const onWheel = useCallback((event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const boost = Math.max(-0.18, Math.min(0.18, delta * -0.0022));
    velocityRef.current = velocityRef.current * 0.72 + boost;
    setRotation(rotationRef.current + delta * -0.006);
  }, [setRotation]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => {
    if (!pauseTemporarilyRef.current) setIsPaused(false);
  }, []);

  return {
    rotation,
    draggedRef,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onWheel },
    pause,
    resume
  };
}
