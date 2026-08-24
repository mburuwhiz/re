'use client'

import Link from 'next/link';
import { Book, ArrowRight } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  slug: string;
  coverUrl?: string;
  pageCount: number;
  createdAt: string;
  isPinned?: boolean;
}

export function DocumentCard({
  title,
  slug,
  coverUrl,
  pageCount,
  createdAt,
  isPinned,
}: DocumentCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Link
      href={`/${slug}`}
      className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`${title} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <Book className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium">{pageCount} pages</span>
          </div>
        )}
        {isPinned && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl-lg font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-900 truncate" title={title}>
          {title}
        </h3>
        <p className="text-sm text-slate-400 mt-1">{formattedDate}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
            {pageCount} pages
          </span>
          <span className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
            Read <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
