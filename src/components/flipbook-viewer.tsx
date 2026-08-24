'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Share2, X, Maximize, Minimize, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FlipbookViewerProps {
  document: {
    id: string;
    title: string;
    slug: string;
    pageCount: number;
    pages: string[];
  };
}

const PAGE_GRADIENTS = [
  'from-blue-50 to-blue-100',
  'from-emerald-50 to-emerald-100',
  'from-amber-50 to-amber-100',
  'from-rose-50 to-rose-100',
  'from-violet-50 to-violet-100',
  'from-cyan-50 to-cyan-100',
  'from-orange-50 to-orange-100',
  'from-pink-50 to-pink-100',
];

export function FlipbookViewer({ document }: FlipbookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [isFlippingNext, setIsFlippingNext] = useState(false);
  const [isFlippingPrev, setIsFlippingPrev] = useState(false);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => {
    resetControlsTimeout();
    window.addEventListener('mousemove', resetControlsTimeout);
    window.addEventListener('touchstart', resetControlsTimeout);
    return () => {
      window.removeEventListener('mousemove', resetControlsTimeout);
      window.removeEventListener('touchstart', resetControlsTimeout);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [resetControlsTimeout]);

  const goNext = useCallback(() => {
    if (isFlippingNext || isFlippingPrev) return;
    const step = isMobile ? 1 : 2;
    if (currentPage + step < document.pageCount) {
      if (!isMobile) {
        setIsFlippingNext(true);
        setTimeout(() => {
          setCurrentPage(p => Math.min(document.pageCount - 1, p + step));
          setIsFlippingNext(false);
        }, 600);
      } else {
        setCurrentPage(p => Math.min(document.pageCount - 1, p + step));
      }
    }
  }, [currentPage, document.pageCount, isMobile, isFlippingNext, isFlippingPrev]);

  const goPrev = useCallback(() => {
    if (isFlippingNext || isFlippingPrev) return;
    const step = isMobile ? 1 : 2;
    if (currentPage - step >= 0) {
      if (!isMobile) {
        setIsFlippingPrev(true);
        setTimeout(() => {
          setCurrentPage(p => Math.max(0, p - step));
          setIsFlippingPrev(false);
        }, 600);
      } else {
        setCurrentPage(p => Math.max(0, p - step));
      }
    }
  }, [currentPage, isMobile, isFlippingNext, isFlippingPrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape' && showShareModal) setShowShareModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, showShareModal]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    touchStartX.current = null;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const leftPageIndex = isMobile ? currentPage : Math.floor(currentPage / 2) * 2;
  const rightPageIndex = leftPageIndex + 1;

  // Sync currentPage down to even numbers on desktop
  useEffect(() => {
    if (!isMobile && currentPage % 2 !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [isMobile, currentPage]);

  const getPageGradient = (index: number) => {
    return PAGE_GRADIENTS[index % PAGE_GRADIENTS.length];
  };

  const renderPage = (index: number, isRight: boolean = false) => {
    if (index >= document.pageCount) return <div className="flex-1" />;
    
    return (
      <div 
        className={`flex-1 h-full flex flex-col items-center justify-center bg-gradient-to-br ${getPageGradient(index)} border shadow-sm relative overflow-hidden`}
        onClick={isRight ? goNext : goPrev}
      >
        <span className="text-8xl font-bold text-slate-800/20">{index + 1}</span>
        <div className="absolute bottom-4 text-sm font-medium text-slate-500">
          Page {index + 1}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="w-screen h-dvh bg-slate-900 flex items-center justify-center relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`fixed top-0 left-0 right-0 p-4 md:p-6 z-50 flex items-center justify-between transition-opacity duration-300 ${showControls || showShareModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="bg-black/60 backdrop-blur-md text-white rounded-full px-5 py-2.5 flex items-center shadow-lg">
          <h1 className="font-semibold truncate max-w-[150px] md:max-w-xs">{document.title}</h1>
        </div>
        
        <div className="bg-black/60 backdrop-blur-md text-white rounded-full px-5 py-2.5 font-medium shadow-lg text-sm md:text-base">
          {isMobile ? currentPage + 1 : `${leftPageIndex + 1}-${Math.min(rightPageIndex + 1, document.pageCount)}`} of {document.pageCount}
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-black/60 backdrop-blur-md rounded-full p-1.5 flex gap-1 shadow-lg text-white">
            <button onClick={toggleFullscreen} className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button onClick={() => setShowShareModal(true)} className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
              <Share2 size={20} />
            </button>
            <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl h-[70vh] md:h-[80vh] px-4 md:px-8 relative flex justify-center" style={{ perspective: '2000px' }}>
        {isMobile ? (
          <div className="w-full h-full bg-white rounded-lg shadow-2xl flex relative overflow-hidden">
             {renderPage(currentPage)}
          </div>
        ) : (
          <div className="w-full h-full flex relative rounded-lg shadow-2xl bg-white">
            <div className="flex-1 border-r border-slate-200 relative">
              {leftPageIndex >= 0 && renderPage(leftPageIndex, false)}
            </div>
            
            <div className="flex-1 relative">
              {rightPageIndex < document.pageCount && renderPage(rightPageIndex, true)}
            </div>

            {isFlippingNext && (
              <div 
                className="absolute right-0 top-0 w-1/2 h-full z-10 origin-left"
                style={{
                  transform: 'rotateY(-180deg)',
                  transition: 'transform 600ms ease-in-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                  {renderPage(leftPageIndex, true)}
                </div>
                <div className="absolute inset-0 bg-white border-l border-slate-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {renderPage(rightPageIndex, false)}
                </div>
              </div>
            )}
            
            {isFlippingPrev && (
              <div 
                className="absolute left-0 top-0 w-1/2 h-full z-10 origin-right"
                style={{
                  transform: 'rotateY(180deg)',
                  transition: 'transform 600ms ease-in-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                  {renderPage(rightPageIndex, false)}
                </div>
                <div className="absolute inset-0 bg-white border-r border-slate-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {renderPage(leftPageIndex, true)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showShareModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Share Document</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''} 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button 
                onClick={copyLink}
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                title="Copy Link"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            
            {copied && (
              <p className="text-center text-sm text-emerald-600 font-medium mb-0">Link copied to clipboard!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
