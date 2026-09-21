import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0A0A] text-[#E5DFD3] text-center">
      <h2 className="text-4xl font-mono text-[#BFA678] font-bold mb-2">404</h2>
      <p className="text-[#888888] mb-6 text-base">Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-[#BFA678] text-[#0A0A0A] font-mono text-xs uppercase font-bold rounded-full hover:bg-[#BFA678]/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
