import React from 'react';
import { DocumentCard } from '@/components/document-card';
import { GalleryHeader } from '@/components/gallery-header';
import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const documents = await prisma.document.findMany({
    where: { visibility: 'Public' },
    select: {
      id: true,
      title: true,
      slug: true,
      page_count: true,
      created_at: true,
      pages: true,
    },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GalleryHeader />

      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Document Gallery</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Explore our collection of published digital flipbooks, interactive documents, and magazines.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              slug={doc.slug}
              pageCount={doc.page_count}
              createdAt={doc.created_at.toISOString()}
              coverUrl={doc.pages?.[0] || 'https://placehold.co/600x800/png'}
            />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold opacity-80">
            <span className="text-lg">Whizpoint Flipbook</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Whizpoint Flipbook Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
