'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-sans relative overflow-hidden">
      
      <div className="z-10 text-center space-y-6 max-w-2xl px-6">
        <h1 className="text-8xl md:text-9xl font-black text-blue-600 drop-shadow-sm">
          404
        </h1>
        <div className="h-1 w-full bg-slate-200 rounded-full mx-auto max-w-xs"></div>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.1em] text-slate-800">
          Page Not Found
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
          We couldn't find the page or document you're looking for. It may have been moved, deleted, or you may have mistyped the URL.
        </p>
        
        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold tracking-wide rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
      
    </div>
  );
}
