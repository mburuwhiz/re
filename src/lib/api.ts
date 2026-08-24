import { AuthResponse, Admin, Document, DocumentCreatePayload, PublicDocument, ViewerDocument } from '@/lib/types';

const API_BASE = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('flipbook_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('flipbook_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('flipbook_token');
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }
    return res.json();
  }

  // Auth
  login(email: string, password: string) {
    return this.fetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  getMe() {
    return this.fetch<Admin>('/auth/me');
  }

  // Documents (Admin)
  getDocuments(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    const query = searchParams.toString();
    return this.fetch<{ documents: Document[]; total: number; page: number }>(
      `/documents${query ? `?${query}` : ''}`
    );
  }

  createDocument(payload: DocumentCreatePayload) {
    return this.fetch<{ id: string; slug: string }>('/documents', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  deleteDocument(id: string) {
    return this.fetch<{ deleted: boolean }>(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  getPresignedUrls(fileNames: string[], prefix: string) {
    return this.fetch<{ urls: { fileName: string; uploadUrl: string; publicUrl: string }[]; prefix: string }>(
      '/upload/presign',
      { method: 'POST', body: JSON.stringify({ fileNames, prefix }) }
    );
  }

  // Public
  getPublicDocuments() {
    return this.fetch<{ pinned: PublicDocument[]; public: PublicDocument[] }>('/public/documents');
  }

  getDocumentBySlug(slug: string) {
    return this.fetch<ViewerDocument>(`/public/documents/${slug}`);
  }
}

export const api = new ApiClient();
