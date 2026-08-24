import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { uploadBase64ToR2 } from '@/lib/s3';

export async function POST(req: Request) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { image, folder } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const url = await uploadBase64ToR2(image, folder || 'misc');
    
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
