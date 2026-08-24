'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span>FlipDocs</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#gallery" className="hover:text-blue-600 transition-colors">Gallery</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          </nav>
          <Link href="/admin/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
            Admin
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-100/30 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 animate-fade-in-up">
              Your Print Spreads,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Now Interactive</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-100">
              Transform A3 booklet print-spreads into stunning digital flipbooks. Share with a link, read on any device.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-200">
              <Link href="/admin/login" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
                Get Started
              </Link>
              <a href="#gallery" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-colors">
                Explore Gallery
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative perspective-1000 animate-fade-in-up delay-300">
            {/* Pure CSS 3D Book Mockup */}
            <div className="relative w-full aspect-[4/3] transform-gpu -rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out preserve-3d shadow-2xl rounded-sm group">
              <div className="absolute inset-0 flex">
                {/* Left Page */}
                <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-200 border border-slate-300 rounded-l-sm flex items-center justify-center shadow-[inset_-5px_0_15px_rgba(0,0,0,0.05)] overflow-hidden relative">
                   <div className="w-2/3 h-4/5 border border-slate-200 bg-white/50 flex flex-col justify-center items-center p-4 relative z-10">
                      <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600">
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                         </svg>
                      </div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                   </div>
                   <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent"></div>
                </div>
                {/* Right Page */}
                <div className="flex-1 bg-white border border-slate-200 border-l-slate-300 rounded-r-sm flex flex-col p-6 shadow-[inset_5px_0_15px_rgba(0,0,0,0.02)] relative">
                   <div className="h-8 w-1/2 bg-slate-100 rounded mb-6"></div>
                   <div className="space-y-3 mb-8">
                     <div className="h-2 w-full bg-slate-100 rounded"></div>
                     <div className="h-2 w-full bg-slate-100 rounded"></div>
                     <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
                   </div>
                   <div className="flex gap-4">
                     <div className="w-1/2 aspect-square bg-slate-50 rounded border border-slate-100"></div>
                     <div className="w-1/2 aspect-square bg-slate-50 rounded border border-slate-100"></div>
                   </div>
                   <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent"></div>
                </div>
              </div>
              {/* Book shadow */}
              <div className="absolute -bottom-8 left-10 right-10 h-8 bg-black/10 blur-xl rounded-full transform-gpu rotate-x-90 -translate-z-6 group-hover:bg-black/5 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0-init">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Why FlipDocs?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to deliver a premium reading experience without the overhead of complex hosting.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-on-scroll opacity-0-init delay-100">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-amber-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Browser-Powered</h3>
              <p className="text-slate-600 leading-relaxed">PDFs are processed entirely in your browser. Zero server load, instant results, maximum privacy.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-on-scroll opacity-0-init delay-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Share Like a PDF</h3>
              <p className="text-slate-600 leading-relaxed">Custom URLs that look like PDF links but deliver an app-like interactive reading experience.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-on-scroll opacity-0-init delay-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 border border-emerald-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Auto-Expiry</h3>
              <p className="text-slate-600 leading-relaxed">Set documents to self-destruct automatically. Storage stays clean, costs stay low, data stays secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 animate-on-scroll opacity-0-init">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Document Gallery</h2>
              <p className="text-lg text-slate-500">Explore featured digital publications.</p>
            </div>
            <Link href="/gallery" className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={item} className={`group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0-init`} style={{ animationDelay: `${(index % 3) * 100}ms` }}>
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
                    <div className="h-5 w-1/4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded mb-6"></div>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                    Read Document <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
              View All Documents →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span>FlipDocs</span>
          </div>
          <p className="text-slate-500 text-sm">
            Built with FlipDocs · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
