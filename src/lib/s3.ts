import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadBase64ToR2(base64String: string, folder: string = 'pages'): Promise<string> {
  const match = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  if (!match || match.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const filename = `${folder}/${crypto.randomBytes(16).toString('hex')}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: `image/${match[1]}`,
    CacheControl: 'public, max-age=31536000',
  });

  await s3Client.send(command);

  return `${process.env.S3_PUBLIC_URL}/${filename}`;
}
