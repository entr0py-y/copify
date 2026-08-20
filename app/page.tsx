export const dynamic = 'force-dynamic';
import { HomeClient } from '@/components/HomeClient';

export default function Home() {
  return (
    <div className="main-layout">
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // Increased top padding to prevent lamp overlap on mobile
          padding: '12rem 0 0',
        }}
      >
        {/* Hero */}
        <div
          className="container animate-fade-in delay-200"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="heading-editorial">
            Move text between devices.
            <br />
            <span style={{ color: 'var(--accent-dim)', textShadow: 'none' }}>Instantly.</span>
          </h2>
        </div>

        {/* Dynamic Responsive Layout */}
        <HomeClient />
      </main>

      <footer
        className="animate-fade-in delay-400"
        style={{
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          className="text-mono"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
          }}
        >
          No Login Required.
        </p>
      </footer>
    </div>
  );
}
