import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-slate-50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, slate-900 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="z-10 text-center">
        <h1 className="text-9xl font-bold text-slate-200">404</h1>
        <h2 className="text-3xl font-semibold text-slate-800 mt-4 mb-2">Document Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          This document may have expired or doesn't exist.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
