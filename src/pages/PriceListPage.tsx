import { useState, useEffect } from 'react';
import { Search, FileText, MessageCircle, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import type { Product } from '@/types';
import { whatsappEnquiry } from '@/lib/whatsapp';

export function PriceListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('name')
      .then(({ data }) => {
        setProducts((data ?? []) as Product[]);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      (p.brand ?? '').toLowerCase().includes(q) ||
      (p.material ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[#ff9d17] font-semibold text-sm tracking-widest uppercase mb-2">
          Complete Catalog
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">Price List</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Browse through our entire product catalog with prices. Contact us for bulk/wholesale pricing.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, brand or material..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-300 bg-white text-stone-800 outline-none focus:border-[#ff9d17] focus:ring-2 focus:ring-[#ff9d17]/20"
          />
          <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={40} className="mx-auto text-stone-300 mb-3" />
            <p className="text-stone-500">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#071522] text-white">
                <tr>
                  <th className="text-left text-xs font-bold uppercase tracking-wider px-4 py-4">Product</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider px-4 py-4 hidden md:table-cell">Brand</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider px-4 py-4 hidden lg:table-cell">Material</th>
                  <th className="text-right text-xs font-bold uppercase tracking-wider px-4 py-4">MRP</th>
                  <th className="text-right text-xs font-bold uppercase tracking-wider px-4 py-4">Our Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-stone-50 cursor-pointer"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                          {p.image_url && (
                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-800 text-sm line-clamp-1">{p.name}</p>
                          <p className="text-xs text-stone-500 line-clamp-1">{p.size || p.design || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 hidden md:table-cell">{p.brand ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-stone-600 hidden lg:table-cell">{p.material ?? '—'}</td>
                    <td className="px-4 py-3 text-right text-sm text-stone-400 line-through">
                      {p.mrp > 0 ? `₹${p.mrp.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-stone-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-10 bg-[#071522] rounded-2xl p-8 md:p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Need Bulk or Wholesale Pricing?</h2>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Get special rates for large quantity purchases. Contact us for a personalized quote.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:+919330300408" className="inline-flex items-center gap-2 bg-[#ff9d17] text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
            <Phone size={18} /> Call Now
          </a>
          <a
            href={whatsappEnquiry('I would like to enquire about bulk/wholesale pricing.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
