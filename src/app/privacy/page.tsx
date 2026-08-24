import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Whizpoint Flipbook',
  description: 'Privacy Policy and Data Protection guidelines for Whizpoint Flipbook.',
};

export default function PrivacyPage() {
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
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="mb-12 border-b border-slate-100 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-500 text-lg">Last updated: August 2026</p>
          </div>

          <div className="prose prose-slate prose-blue max-w-none">
            <p className="text-lg leading-relaxed text-slate-600 mb-8">
              At Whizpoint Flipbook, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our digital publishing platform.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us, or otherwise contact us.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6">
              <li><strong className="text-slate-800">Personal Information:</strong> Name, email address, and authentication credentials (such as Google OAuth IDs if you choose to sign in with Google).</li>
              <li><strong className="text-slate-800">Uploaded Data:</strong> PDF documents, images, and branding assets you upload to generate flipbooks.</li>
              <li><strong className="text-slate-800">Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the platform, such as your IP address, browser type, and operating system, to ensure the security and performance of our infrastructure.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and your consent.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6">
              <li>To facilitate account creation and logon processes, including Google single sign-on (SSO) authentication.</li>
              <li>To host, process, and deliver your digital flipbooks across the internet.</li>
              <li>To send you important administrative information, such as email verifications and password resets.</li>
              <li>To enforce our terms, conditions, and policies, particularly regarding the 5-day expiration limit for free-tier documents.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">3. Google OAuth & Third-Party Authentication</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              If you choose to register or log in using your Google account, we collect your name, email address, and Google ID provided by Google. We use this information strictly to authenticate your identity and provision your Whizpoint Flipbook account. We do not access your Google Drive, Gmail, or any other sensitive personal data from your Google account. You may revoke our access to your Google account at any time through your Google Security settings.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">4. Data Sharing and Disclosure</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              We use third-party service providers (such as Cloudflare R2 for asset storage and Neon PostgreSQL for database management) to help us operate our business and the platform. These third parties have access to your personal data only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">5. Data Retention and Security</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please remember that we cannot guarantee that the internet itself is 100% secure. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Documents uploaded by free-tier users are subject to automatic deletion after 5 days. Once deleted, they cannot be recovered. We retain your account information for as long as your account remains active.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">6. Your Privacy Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Depending on your location, you may have certain rights regarding your personal information, including the right to request access, correction, or deletion of your data. To exercise these rights, or to completely delete your Whizpoint Flipbook account and all associated data, please contact our privacy team.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">7. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              If you have questions or comments about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 inline-block">
              <p className="font-semibold text-slate-900">Whizpoint Privacy Team</p>
              <a href="mailto:privacy@whizpoint.app" className="text-blue-600 hover:text-blue-700 font-medium">privacy@whizpoint.app</a>
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
