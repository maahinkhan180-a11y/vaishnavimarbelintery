import type { BlogArticle, Category, Product, Subcategory } from '@/types';

export type CatalogTable = 'categories' | 'subcategories' | 'products';
export type CatalogRecord = Category | Subcategory | Product;
export type CatalogFilters = Record<string, string | number | boolean | undefined>;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);
  return result;
}

function queryString(filters: CatalogFilters) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== '') query.set(key, String(value));
  }
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export function getCatalog<T extends CatalogRecord>(table: CatalogTable, filters: CatalogFilters = {}) {
  return request<T[]>(`/api/catalog/${table}${queryString(filters)}`);
}

export function createCatalogRecord(table: CatalogTable, values: Record<string, unknown>) {
  return request<{ id: string }>(`/api/catalog/${table}`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateCatalogRecord(table: CatalogTable, id: string, values: Record<string, unknown>) {
  return request<{ success: boolean }>(`/api/catalog/${table}`, {
    method: 'PUT',
    body: JSON.stringify({ ...values, id }),
  });
}

export function deleteCatalogRecord(table: CatalogTable, id: string) {
  return request<{ success: boolean }>(`/api/catalog/${table}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

export function getBlogArticles(filters: CatalogFilters = {}) {
  return request<BlogArticle[]>(`/api/blog${queryString(filters)}`);
}

export function saveBlogArticle(values: Record<string, unknown>, id?: string) {
  return request<{ id?: string; success?: boolean }>('/api/blog', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify(id ? { ...values, id } : values),
  });
}

export function deleteBlogArticle(id: string) {
  return request<{ success: boolean }>('/api/blog', {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}
