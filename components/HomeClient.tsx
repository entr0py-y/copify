'use client';
import { useState } from 'react';
import { SendSection } from './SendSection';
import { ReceiveSection } from './ReceiveSection';

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
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <button
              onClick={() => setMobileView('send')}
              className="mobile-nav-btn text-mono"
            >
              Send Text
            </button>
            <button
              onClick={() => setMobileView('receive')}
              className="mobile-nav-btn text-mono"
            >
              Receive Text
            </button>
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
