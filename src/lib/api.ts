const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-domain.com/api';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getCategories: (slug?: string) => {
    const params = new URLSearchParams();
    if (slug) params.set('slug', slug);
    return apiFetch<any>(`/categories${params.toString() ? `?${params.toString()}` : ''}`);
  },
  getSubcategoriesByCategoryId: (categoryId: string | number) =>
    apiFetch<any>(`/subcategories?category_id=${encodeURIComponent(String(categoryId))}`),
  getProducts: (params: Record<string, string | number | boolean | undefined> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, String(value));
      }
    });
    return apiFetch<any>(`/products${query.toString() ? `?${query.toString()}` : ''}`);
  },
  getFeaturedProducts: () => apiFetch<any>('/products?featured=true&limit=8'),
  getProductBySlug: (slug: string) => apiFetch<any>(`/products/${encodeURIComponent(slug)}`),
  searchProducts: (query: string) => apiFetch<any>(`/products/search?q=${encodeURIComponent(query)}`),
  login: (email: string, password: string) =>
    apiFetch<any>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  admin: {
    getCatalog: () => apiFetch<any>('/admin/catalog'),
    createProduct: (payload: any) => apiFetch<any>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
    updateProduct: (id: string, payload: any) => apiFetch<any>(`/admin/products/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
    deleteProduct: (id: string) => apiFetch<any>(`/admin/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
  },
};
