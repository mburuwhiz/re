import FlipbookViewer from '@/components/flipbook-viewer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import prisma from '@/lib/db';

// Fetch document from database
async function getDocument(slug: string) {
  try {
    const document = await prisma.document.findUnique({
      where: { slug }
    });
    
    if (!document) return null;
    
    // Map to FlipbookViewer expected props
    return {
      id: document.id,
      title: document.title,
      slug: document.slug,
      pageCount: document.page_count,
      pages: document.pages,
      logoUrl: document.logo_url
    };
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocument(slug);
  
  if (!doc) return { title: 'Not Found | Whizpoint Flipbook' };
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://api.whizpoint.app';
  const docUrl = `${baseUrl}/${doc.slug}`;
  const ogImage = (doc.pages && doc.pages.length > 0) ? doc.pages[0] : `${baseUrl}/og.jpg`;
  const description = `Read ${doc.title} on Whizpoint Flipbook. Swipe or scroll to explore this ${doc.pageCount}-page interactive digital document.`;

  return {
    title: `${doc.title} | Whizpoint Flipbook`,
    description: description,
    alternates: {
      canonical: docUrl,
    },
    openGraph: {
      title: `${doc.title} | Whizpoint Flipbook`,
      description: description,
      url: docUrl,
      siteName: 'Whizpoint Flipbook',
      images: [
        {
          url: ogImage,
          width: 800,
          height: 1131, // A4 ratio
          alt: `${doc.title} Cover`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} | Whizpoint Flipbook`,
      description: description,
      site: '@whizpoint',
      images: [ogImage],
    },
  };
}

export default async function ViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  


  const doc = await getDocument(slug);
  if (!doc) notFound();
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://api.whizpoint.app';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": doc.title,
    "url": `${baseUrl}/${doc.slug}`,
    "image": (doc.pages && doc.pages.length > 0) ? doc.pages[0] : `${baseUrl}/og.jpg`,
    "numberOfPages": doc.pageCount,
    "publisher": {
      "@type": "Organization",
      "name": "Whizpoint Flipbook"
    }
  };
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FlipbookViewer doc={doc} />
    </>
  );
}
