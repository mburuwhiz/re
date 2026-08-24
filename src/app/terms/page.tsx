import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Whizpoint Flipbook',
  description: 'Terms of Service and User Agreement for Whizpoint Flipbook.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Whizpoint Flipbook Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-xl tracking-tight">Whizpoint Flipbook</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="mb-12 border-b border-slate-100 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-500 text-lg">Last updated: August 2026</p>
          </div>

          <div className="prose prose-slate prose-blue max-w-none">
            <p className="text-lg leading-relaxed text-slate-600 mb-8">
              Welcome to Whizpoint Flipbook. Please read these Terms of Service ("Terms") carefully before using our platform. By accessing or using Whizpoint Flipbook, you agree to be bound by these Terms and our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              By registering for, accessing, or using the Whizpoint Flipbook service, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you are accepting these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these terms and conditions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whizpoint Flipbook provides a digital publishing platform that allows users to upload, host, share, and track digital flipbooks and documents. We reserve the right to modify, suspend, or discontinue any part of the service at any time with or without notice.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">3. User Accounts and Security</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6">
              <li>You must provide accurate and complete registration information when creating an account.</li>
              <li>You are strictly responsible for maintaining the confidentiality of your account credentials, including your password and OAuth sessions.</li>
              <li>You must immediately notify Whizpoint Flipbook of any unauthorized use of your account or any other breach of security.</li>
              <li>We are not liable for any loss or damage arising from your failure to protect your login information.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">4. User Content and Conduct</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              You retain all ownership rights to the documents, PDFs, logos, and images you upload ("User Content"). However, by uploading content, you grant Whizpoint Flipbook a worldwide, non-exclusive, royalty-free license to host, store, and display your content strictly for the purpose of providing the service to you and your designated audience.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              You agree NOT to use the service to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6">
              <li>Upload any content that is illegal, defamatory, harassing, or violates the intellectual property rights of others.</li>
              <li>Distribute malware, viruses, or any malicious code.</li>
              <li>Attempt to bypass or manipulate our storage limits, document expiration policies, or billing systems.</li>
              <li>Engage in automated scraping or bulk downloading of hosted documents without written permission.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">5. Free Tier and Document Expiry</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whizpoint Flipbook offers a free tier for users. Documents uploaded under the free tier are subject to a strict 5-day expiration policy. Once a document expires, it will be automatically hidden from public view and may be permanently deleted from our servers to free up storage space. Whizpoint Flipbook is not responsible for the loss of data resulting from this automated expiration process.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">6. Termination</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We reserve the right to suspend or terminate your account and access to the service at our sole discretion, without prior notice, if you violate these Terms, engage in illegal activities, or for any other reason we deem necessary to protect our platform and users.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">7. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              To the maximum extent permitted by law, Whizpoint Flipbook and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use or inability to use the service. The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">8. Contact Information</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              If you have any questions or concerns regarding these Terms of Service, please contact our legal team at:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 inline-block">
              <p className="font-semibold text-slate-900">Whizpoint Legal</p>
              <a href="mailto:legal@whizpoint.app" className="text-blue-600 hover:text-blue-700 font-medium">legal@whizpoint.app</a>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Whizpoint Flipbook. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
