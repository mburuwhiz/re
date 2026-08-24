import { FlipbookViewer } from '@/components/flipbook-viewer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock function - will be replaced with actual API call
async function getDocument(slug: string) {
  // Strip .pdf extension if present
  const cleanSlug = slug.replace(/\.pdf$/, '');
  
  // Mock data for now
  const mockDocs: Record<string, any> = {
    'sample': {
      id: '1',
      title: 'Sample Brochure',
      slug: 'sample',
      pageCount: 8,
      pages: Array.from({ length: 8 }, (_, i) => `/api/placeholder/page-${i + 1}`),
    },
    'demo': {
      id: '2', 
      title: 'Demo Booklet',
      slug: 'demo',
      pageCount: 6,
      pages: Array.from({ length: 6 }, (_, i) => `/api/placeholder/page-${i + 1}`),
    },
  };
  
  return mockDocs[cleanSlug] || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocument(slug);
  if (!doc) return { title: 'Not Found' };
  return {
    title: `${doc.title} | FlipDocs`,
    description: `Read ${doc.title} - an interactive digital flipbook`,
  };
}

export default async function ViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDocument(slug);
  if (!doc) notFound();
  
  return <FlipbookViewer document={doc} />;
}
