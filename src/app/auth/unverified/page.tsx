'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

function UnverifiedContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const [loading, setLoading] = useState(false);
  const [emailToResend, setEmailToResend] = useState(initialEmail);
  const [showEdit, setShowEdit] = useState(!initialEmail);

  const handleResend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!emailToResend) {
      toast.error('Please enter an email address');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToResend }),
      });
      
      if (res.ok) {
        toast.success('Verification email sent! Check your inbox.');
        setShowEdit(false);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to send email');
      }
    } catch (error) {
      toast.error('An error occurred while sending the email.');
    } finally {
      setLoading(false);
    }
  };

  const getEmailProviderLink = (email: string) => {
    if (email.includes('@gmail.com')) return 'https://mail.google.com/';
    if (email.includes('@yahoo.com')) return 'https://mail.yahoo.com/';
    if (email.includes('@outlook.com') || email.includes('@hotmail.com')) return 'https://outlook.live.com/';
    return `mailto:${email}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify your account</h2>
        
        {!showEdit ? (
          <>
            <p className="text-slate-500 mb-6 leading-relaxed">
              We sent a verification link to <span className="font-semibold text-slate-800">{emailToResend}</span>. Please check your inbox and verify your email to log in.
            </p>
            
            <div className="space-y-3">
              <a 
                href={getEmailProviderLink(emailToResend)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Open Email App
              </a>
              
              <button 
                onClick={() => handleResend()}
                disabled={loading}
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Wrong email address?{' '}
                <button onClick={() => setShowEdit(true)} className="text-blue-600 font-semibold hover:underline">
                  Change Email
                </button>
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handleResend} className="text-left mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Enter correct email</label>
            <input 
              type="email" 
              value={emailToResend} 
              onChange={(e) => setEmailToResend(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Sending...' : 'Send Verification Link'}
            </button>
            {initialEmail && (
              <button 
                type="button"
                onClick={() => setShowEdit(false)}
                className="w-full mt-3 py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        )}
        
        <div className="mt-6">
          <Link href="/auth/login" className="text-sm font-medium text-slate-400 hover:text-slate-600">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UnverifiedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
      <UnverifiedContent />
    </Suspense>
  );
}
