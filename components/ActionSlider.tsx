'use client';
import { useRef, useState } from 'react';

interface ActionSliderProps {
  direction: 'ltr' | 'rtl';
  label: string;
  onComplete: () => void;
}

export function ActionSlider({ direction, label, onComplete }: ActionSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const dragState = useRef({
    startX: 0,
    currentX: 0,
    trackWidth: 0,
    active: false,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted || !trackRef.current || !handleRef.current) return;
    
    handleRef.current.setPointerCapture(e.pointerId);
    
    setIsDragging(true);
    dragState.current.active = true;
    dragState.current.startX = e.clientX;
    dragState.current.currentX = 0;
    
    // Subtract 48 (the handle width) so it stops exactly at the edge
    dragState.current.trackWidth = trackRef.current.getBoundingClientRect().width - 48;
    
    handleRef.current.style.transition = 'none';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.active || !handleRef.current) return;
    
    const deltaX = e.clientX - dragState.current.startX;
    let clampedX = 0;
    
    if (direction === 'ltr') {
      clampedX = Math.max(0, Math.min(deltaX, dragState.current.trackWidth));
    } else {
      clampedX = Math.min(0, Math.max(deltaX, -dragState.current.trackWidth));
    }
    
    dragState.current.currentX = clampedX;
    handleRef.current.style.transform = `translateX(${clampedX}px)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.active || !handleRef.current) return;
    
    handleRef.current.releasePointerCapture(e.pointerId);
    dragState.current.active = false;
    setIsDragging(false);
    
    const progress = Math.abs(dragState.current.currentX) / dragState.current.trackWidth;
    
    if (progress > 0.8) {
      setIsCompleted(true);
      handleRef.current.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
      handleRef.current.style.transform = `translateX(${direction === 'ltr' ? dragState.current.trackWidth : -dragState.current.trackWidth}px)`;
      
      setTimeout(() => {
        onComplete();
        // Reset state after a short delay so if user comes back it's ready
        setTimeout(() => {
            if (handleRef.current) {
                handleRef.current.style.transition = 'none';
                handleRef.current.style.transform = `translateX(0px)`;
                setIsCompleted(false);
            }
        }, 300);
      }, 300);
    } else {
      handleRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      handleRef.current.style.transform = `translateX(0px)`;
      dragState.current.currentX = 0;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '320px' }}>
      
      {direction === 'rtl' && (
        <span 
          className="text-mono" 
          style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.1em', 
            color: 'var(--accent)', 
            opacity: isDragging ? 1 : 0.7, 
            transition: 'opacity 0.2s',
            flexShrink: 0
          }}
        >
          {label}
        </span>
      )}

      {/* Track Container */}
      <div 
        ref={trackRef}
        style={{ 
          flex: 1, 
          height: '48px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          touchAction: 'none'
        }}
      >
        {/* Visible 1px Track */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '1px',
            background: isDragging ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
            transition: 'background 0.3s ease',
            pointerEvents: 'none'
          }}
        />
        
        {/* Handle Wrapper */}
        <div
          ref={handleRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'absolute',
            left: direction === 'ltr' ? 0 : 'auto',
            right: direction === 'rtl' ? 0 : 'auto',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            touchAction: 'none',
            zIndex: 10,
            transform: 'translateX(0px)',
          }}
        >
          {/* Visible Bead */}
          <div 
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: isDragging ? '#ffffff' : '#b3b3b3',
              transition: 'background 0.2s ease, transform 0.2s ease',
              transform: isDragging ? 'scale(1.2)' : 'scale(1)',
              boxShadow: isDragging ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
            }}
          />
        </div>
      </div>

      {direction === 'ltr' && (
        <span 
          className="text-mono" 
          style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.1em', 
            color: 'var(--accent)', 
            opacity: isDragging ? 1 : 0.7, 
            transition: 'opacity 0.2s',
            flexShrink: 0
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
