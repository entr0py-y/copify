'use client';
import { useState } from 'react';
import { SendSection } from './SendSection';
import { ReceiveSection } from './ReceiveSection';
import { ActionSlider } from './ActionSlider';

export function HomeClient() {
  const [mobileView, setMobileView] = useState<'home' | 'send' | 'receive'>('home');

  return (
    <>
      {/* ── DESKTOP LAYOUT (Unchanged) ── */}
      <div
        className="desktop-only container animate-fade-in delay-300"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        <SendSection />
        <ReceiveSection />
      </div>

      {/* ── MOBILE LAYOUT (New Redesign) ── */}
      <div
        className="mobile-only container animate-fade-in delay-300"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        {mobileView === 'home' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem', // Increased gap for the sliders
              alignItems: 'center',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <ActionSlider 
              direction="ltr" 
              label="Send Text" 
              onComplete={() => setMobileView('send')} 
            />
            
            <ActionSlider 
              direction="rtl" 
              label="Receive Text" 
              onComplete={() => setMobileView('receive')} 
            />
          </div>
        )}

        {mobileView === 'send' && (
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setMobileView('home')}
              className="mobile-back-btn text-mono"
            >
              &larr; Back
            </button>
            <SendSection minimalMobile={true} />
          </div>
        )}

        {mobileView === 'receive' && (
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setMobileView('home')}
              className="mobile-back-btn text-mono"
            >
              &larr; Back
            </button>
            <ReceiveSection minimalMobile={true} />
          </div>
        )}
      </div>
    </>
  );
}
