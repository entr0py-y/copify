export const dynamic = 'force-dynamic';
import { SendSection } from '@/components/SendSection';
import { ReceiveSection } from '@/components/ReceiveSection';

export default function Home() {
  return (
    <div className="main-layout">
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8rem 0 0',
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
            <span style={{ color: 'var(--accent-dim)' }}>Instantly.</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          className="container animate-fade-in delay-300"
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
