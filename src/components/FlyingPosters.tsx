import React, { useRef, useEffect, useCallback } from 'react';
import './FlyingPosters.css';

export interface FlyingPostersProps {
  items?: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FlyingPosters: React.FC<FlyingPostersProps> = ({
  items = [],
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollY = useRef(0);
  const targetY = useRef(0);
  const isDown = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  const ease = 0.06;
  const ITEM_H = 360;
  const GAP = 24;
  const STRIDE = ITEM_H + GAP;

  // duplicate items for seamless looping
  const loop = items.length > 0 ? [...items, ...items, ...items] : [];

  const update = useCallback(() => {
    scrollY.current += (targetY.current - scrollY.current) * ease;

    const track = trackRef.current;
    if (track) {
      const totalH = items.length * STRIDE;
      // wrap around
      if (scrollY.current > totalH) {
        scrollY.current -= totalH;
        targetY.current -= totalH;
      } else if (scrollY.current < 0) {
        scrollY.current += totalH;
        targetY.current += totalH;
      }
      track.style.transform = `translateX(-50%) translateY(${-scrollY.current}px)`;

      // apply perspective distortion to each card
      const cards = track.querySelectorAll<HTMLDivElement>('.fp-card');
      const containerH = containerRef.current?.clientHeight ?? 500;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const parentRect = containerRef.current?.getBoundingClientRect();
        if (!parentRect) return;
        const relY = rect.top - parentRect.top + rect.height / 2 - containerH / 2;
        const norm = relY / (containerH * 0.6);
        const rotateX = norm * 18;
        const scale = 1 - Math.abs(norm) * 0.12;
        const opacity = 1 - Math.abs(norm) * 0.4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(0.2, opacity));
      });
    }

    rafRef.current = requestAnimationFrame(update);
  }, [items.length, ease, STRIDE]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    targetY.current += e.deltaY * 0.6;
  }, []);

  const onMouseDown = useCallback((e: MouseEvent) => {
    isDown.current = true;
    startY.current = e.clientY;
    startScroll.current = targetY.current;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDown.current) return;
    const dy = startY.current - e.clientY;
    targetY.current = startScroll.current + dy * 1.2;
  }, []);

  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onWheel, onMouseDown, onMouseMove, onMouseUp]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`posters-container ${className}`}
      style={style}
    >
      <div ref={trackRef} className="posters-track">
        {loop.map((src, i) => (
          <div key={i} className="fp-card">
            <img src={src} alt="" draggable={false} />
            <div className="fp-shimmer" />
          </div>
        ))}
      </div>
      <div className="posters-vignette" />
    </div>
  );
};

export default FlyingPosters;
