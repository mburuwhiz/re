export interface Document {
  id: string;
  title: string;
  slug: string;
  pageCount: number;
  coverUrl: string;
  visibility: 'public' | 'pinned' | 'unlisted';
  expiryDate: string | null;
  r2Prefix: string;
  totalSizeBytes: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentCreatePayload {
  title: string;
  slug: string;
  pageCount: number;
  coverUrl: string;
  visibility: 'public' | 'pinned' | 'unlisted';
  expiryPreset: '3d' | '1m' | '1y' | 'never';
  r2Prefix: string;
  totalSizeBytes: number;
}

export interface PublicDocument {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  pageCount: number;
  createdAt: string;
}

export interface ViewerDocument {
  id: string;
  title: string;
  slug: string;
  pageCount: number;
  pages: string[];
}

export interface Admin {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
}
