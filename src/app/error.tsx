'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0A0A] text-[#E5DFD3] text-center">
      <h2 className="text-2xl font-mono text-[#BFA678] font-bold mb-4">Something went wrong!</h2>
      <p className="text-[#888888] max-w-md mb-6 text-sm">{error?.message || 'An unexpected runtime error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-[#BFA678] text-[#0A0A0A] font-mono text-xs uppercase font-bold rounded-full hover:bg-[#BFA678]/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
