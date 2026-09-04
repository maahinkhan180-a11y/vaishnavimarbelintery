import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { useRouter } from '@/lib/router';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HomePage } from '@/pages/HomePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ProductPage } from '@/pages/ProductPage';
import { CartPage } from '@/pages/CartPage';
import { SearchPage } from '@/pages/SearchPage';
import { AdminPage } from '@/pages/AdminPage';
import { AlertCircle } from 'lucide-react';

function RouteRenderer() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'category':
      return <CategoryPage categorySlug={route.categorySlug} />;
    case 'subcategory':
      return <CategoryPage categorySlug={route.categorySlug} subcategorySlug={route.subcategorySlug} />;
    case 'product':
      return <ProductPage productSlug={route.productSlug} />;
    case 'cart':
      return <CartPage />;
    case 'search':
      return <SearchPage query={route.query} />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Header />
          {!isSupabaseConfigured && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-amber-800">
                <AlertCircle size={16} />
                <span>Database not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Project Settings &gt; Environment Variables.</span>
              </div>
            </div>
          )}
          <main className="flex-1">
            <RouteRenderer />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
