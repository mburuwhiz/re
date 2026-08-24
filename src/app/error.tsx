'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-sans relative overflow-hidden">
      
      <div className="z-10 text-center space-y-6 max-w-2xl px-6">
        <h1 className="text-8xl md:text-9xl font-black text-red-500 drop-shadow-sm">
          500
        </h1>
        <div className="h-1 w-full bg-slate-200 rounded-full mx-auto max-w-xs"></div>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.1em] text-slate-800">
          Something Went Wrong
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
          An unexpected error occurred while processing your request. Please try again or return to the homepage.
        </p>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-left text-sm text-red-600 font-mono overflow-auto max-w-full">
          {error.message || "Unknown error"}
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="px-8 py-4 bg-blue-600 text-white font-bold tracking-wide rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold tracking-wide rounded-xl hover:bg-slate-50 hover:shadow-lg transition-all duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
      
    </div>
  );
}
