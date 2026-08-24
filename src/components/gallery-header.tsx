'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function GalleryHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50 flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-2 text-slate-900">
        <img src="/logo.png" alt="Whizpoint Flipbook Logo" className="w-8 h-8 rounded-lg object-contain" />
        <span className="font-bold text-lg hidden sm:block">Whizpoint Flipbook</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
          Home
        </Link>
        <Link href="/gallery" className="text-blue-600 transition-colors">
          Gallery
        </Link>
        <Link href="/auth/login" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
          Sign In
        </Link>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <Link href="/auth/login" className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors">
          Sign In
        </Link>
        <button 
          className="p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg px-6 py-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium">Home</Link>
          <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 font-medium">Gallery</Link>
        </div>
      )}
    </header>
  );
}
