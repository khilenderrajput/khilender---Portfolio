'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0A0A0A', color: '#E5DFD3', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#BFA678', marginBottom: '1rem' }}>Application Error</h2>
        <p style={{ color: '#888888', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          {error?.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#BFA678',
            color: '#0A0A0A',
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
