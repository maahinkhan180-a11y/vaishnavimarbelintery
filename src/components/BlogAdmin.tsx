import { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BlogArticle } from '@/types';

const emptyArticle = { title: '', slug: '', excerpt: '', content: '', category: 'Inspiration', featured_image_url: '', author: 'Vaishnavi Marble', tags: '', is_published: false };

type ArticleForm = typeof emptyArticle;

export function BlogAdmin() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [form, setForm] = useState<ArticleForm>(emptyArticle);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    const { data } = await supabase.from('blog_articles').select('*').order('published_at', { ascending: false });
    setArticles((data ?? []) as BlogArticle[]);
  };

  useEffect(() => { loadArticles(); }, []);

  const openForm = (article?: BlogArticle) => {
    if (article) {
      setEditingId(article.id);
      setForm({ title: article.title, slug: article.slug, excerpt: article.excerpt, content: article.content, category: article.category, featured_image_url: article.featured_image_url ?? '', author: article.author, tags: article.tags.join(', '), is_published: article.is_published });
    } else {
      setEditingId(null);
      setForm(emptyArticle);
    }
    setError(null);
    setShowForm(true);
  };

  const saveArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean), featured_image_url: form.featured_image_url || null, updated_at: new Date().toISOString() };
    const result = editingId ? await supabase.from('blog_articles').update(payload).eq('id', editingId) : await supabase.from('blog_articles').insert(payload);
    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }
    setShowForm(false);
    setSaving(false);
    await loadArticles();
  };

  const removeArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await supabase.from('blog_articles').delete().eq('id', id);
    await loadArticles();
  };

  const update = (field: keyof ArticleForm, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4"><div><p className="text-sm text-stone-500">{articles.length} articles</p><p className="text-xs text-stone-400">Create guides, ideas and product stories for your customers.</p></div><button onClick={() => openForm()} className="flex items-center gap-1.5 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-[#ff9d17] hover:text-black"><Plus size={16} /> Add Blog Post</button></div>
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden"><div className="divide-y divide-stone-100">{articles.map(article => <div key={article.id} className="px-4 py-4 flex items-center gap-3"><div className="w-16 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">{article.featured_image_url && <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />}</div><div className="flex-1 min-w-0"><h3 className="font-semibold text-stone-800 truncate">{article.title}</h3><p className="text-xs text-stone-500">{article.category} · {article.is_published ? 'Published' : 'Draft'}</p></div><button onClick={() => openForm(article)} className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"><Pencil size={16} /></button><button onClick={() => removeArticle(article.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></div>)}{articles.length === 0 && <p className="text-center text-stone-400 py-12">No blog posts yet.</p>}</div></div>

      {showForm && <div className="fixed inset-0 z-[70] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} /><div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between"><h2 className="text-lg font-bold text-stone-800">{editingId ? 'Edit Blog Post' : 'Add Blog Post'}</h2><button onClick={() => setShowForm(false)}><X size={22} /></button></div><form onSubmit={saveArticle} className="p-6 space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="text-sm font-medium text-stone-700">Title<input required value={form.title} onChange={e => update('title', e.target.value)} className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="text-sm font-medium text-stone-700">Category<input required value={form.category} onChange={e => update('category', e.target.value)} className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label></div><label className="block text-sm font-medium text-stone-700">Slug<input value={form.slug} onChange={e => update('slug', e.target.value)} placeholder="auto-generated" className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="block text-sm font-medium text-stone-700">Featured Image URL<input type="url" value={form.featured_image_url} onChange={e => update('featured_image_url', e.target.value)} className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="block text-sm font-medium text-stone-700">Short Excerpt<textarea required rows={2} value={form.excerpt} onChange={e => update('excerpt', e.target.value)} className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="block text-sm font-medium text-stone-700">Article Content<textarea required rows={8} value={form.content} onChange={e => update('content', e.target.value)} className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="block text-sm font-medium text-stone-700">Tags<input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="marble, bathroom, design" className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-lg" /></label><label className="flex items-center gap-2 text-sm font-medium text-stone-700"><input type="checkbox" checked={form.is_published} onChange={e => update('is_published', e.target.checked)} /> Publish this article</label>{error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}<button disabled={saving} type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#ff9d17] hover:text-black disabled:opacity-50 flex items-center justify-center gap-2"><Save size={17} /> {saving ? 'Saving...' : 'Save Blog Post'}</button></form></div></div>}
    </div>
  );
}
