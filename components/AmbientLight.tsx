'use client';

import { useEffect, useRef } from 'react';

/**
 * AmbientLight - Interactive Pendant Light
 * - The entire lamp (cord, shade, bulb) and light cone move as one solid object.
 * - Single, smooth, stable downward cone of light (no multiple beams).
 * - Sways subtly based on mouse or gyroscope.
 */
export function AmbientLight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    let targetRot = 0;
    let currentRot = 0;
    
    // Max rotation in degrees
    const maxRotation = 4; 

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor position: -1 (left) to 1 (right)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      // Invert x so that moving left swings the bottom left
      targetRot = -x * maxRotation;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let gamma = e.gamma || 0;
      if (gamma > 45) gamma = 45;
      if (gamma < -45) gamma = -45;
      
      const x = gamma / 45; 
      // Invert x so tilting left swings the bottom left
      targetRot = -x * maxRotation;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    } else {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    let rafId: number;
    const animate = () => {
      // Spring/Damping interpolation for physical inertia
      currentRot += (targetRot - currentRot) * 0.04;
      
      if (containerRef.current) {
        // Rotate the entire assembly from the very top (ceiling)
        containerRef.current.style.transform = `rotate(${currentRot}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      else window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0, // Behind UI
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* ── ENTIRE LAMP ASSEMBLY (Swings as one object) ── */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── 1. RAYS / LIGHT FUNNEL ── */}
        {/* Single smooth cone originating exactly from the bulb */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '100vw',
            height: '100vh',
            transform: 'translateX(-50%)',
            // Moderate blur to keep it perfectly soft and atmospheric
            filter: 'blur(10px)',
            opacity: 0.9,
            // Single, smooth continuous cone from 155deg to 205deg
            background: `conic-gradient(at 50% 144px, 
              transparent 0deg,
              transparent 155deg,
              rgba(255, 255, 255, 0.15) 180deg,
              transparent 205deg,
              transparent 360deg
            )`,
            // Falloff mask so it fades vertically before hitting the cards
            WebkitMaskImage: 'radial-gradient(circle at 50% 144px, black 0%, rgba(0,0,0,0.5) 15%, transparent 40%)',
            maskImage: 'radial-gradient(circle at 50% 144px, black 0%, rgba(0,0,0,0.5) 15%, transparent 40%)',
          }}
        />

        {/* ── 2. CORE BLOOM ── */}
        <div 
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '40vw',
            height: '40vh',
            transform: 'translateX(-50%)',
            // Ultra-soft local glow around the bulb - INCREASED GLOW
            background: 'radial-gradient(circle at 50% 144px, rgba(255, 255, 255, 0.08) 0%, transparent 30%)',
          }}
        />

        {/* ── 3. PHYSICAL LAMP FIXTURE ── */}
        <svg 
          width="200" 
          height="160" 
          viewBox="0 0 200 160" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            zIndex: 2, 
            overflow: 'visible' 
          }}
        >
          <defs>
            <linearGradient id="shade-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
            
            <radialGradient id="shade-inner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="90%" stopColor="#050505" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
            
            <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
              {/* Increased bulb blur deviation for stronger physical glow */}
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cord */}
          <path d="M 100,-20 L 100,95" stroke="#111" strokeWidth="2.5" />

          {/* Outer Shade */}
          <path 
            d="M 92,95 
               Q 100,90 108,95 
               C 112,110 142,135 155,145 
               L 45,145 
               C 58,135 88,110 92,95 Z" 
            fill="url(#shade-outer)" 
            stroke="rgba(255,255,255,0.06)" 
            strokeWidth="0.5" 
          />
          
          {/* Inner Shade Opening (underside) */}
          <ellipse cx="100" cy="145" rx="55" ry="7" fill="url(#shade-inner)" />

          {/* Front Rim Highlight */}
          <path 
            d="M 45,145 A 55,7 0 0,0 155,145" 
            fill="none" 
            stroke="rgba(255,255,255,0.04)" 
            strokeWidth="1" 
          />

          {/* Bulb */}
          <circle cx="100" cy="144" r="4.5" fill="#ffffff" filter="url(#bulb-glow)" />
          <circle cx="100" cy="144" r="2" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
