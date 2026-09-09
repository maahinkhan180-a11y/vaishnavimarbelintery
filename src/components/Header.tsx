import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, Home, MessageCircle, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { navigate } from '@/lib/router';
import type { Category } from '@/types';
import { supabase } from '@/lib/supabase';
import { whatsappEnquiry } from '@/lib/whatsapp';

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('display_order')
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white hover:text-blue-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 font-bold text-lg text-white hover:text-blue-200 transition-colors"
            >
              <img src="/logo.jpeg" alt="Vaishnavi Marble" className="w-10 h-10 rounded-lg object-cover" />
              <span className="hidden sm:inline">Vaishnavi Marble</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded font-medium text-sm transition-colors flex items-center gap-1"
            >
              <Home size={16} /> Home
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded font-medium text-sm transition-colors"
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => navigate('/blog')}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded font-medium text-sm transition-colors"
            >
              Blog
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-40 lg:w-56 pl-9 pr-3 py-2 text-sm bg-blue-700 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-blue-600 border border-blue-600"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
              </div>
            </form>
            <a
              href={whatsappEnquiry('I have a general enquiry about your products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-blue-700"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-white hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-blue-700"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-blue-700 bg-blue-900">
            <form onSubmit={handleSearch} className="p-3 border-b border-blue-700">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-blue-700 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
              </div>
            </form>
            <div className="py-2">
              <button
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
              >
                <Home size={18} /> Home
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { navigate(`/category/${cat.slug}`); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-blue-700 font-medium transition-colors"
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => { navigate('/blog'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-blue-700 font-medium transition-colors"
              >
                Blog
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
