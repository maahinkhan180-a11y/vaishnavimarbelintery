import { useEffect, useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { useRouter } from '@/lib/router';

import { AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { EnquiryPopup } from '@/components/EnquiryPopup';

import { HomePage } from "@/pages/HomePage";
import { CategoryPage } from '@/pages/CategoryPage';
import { ProductPage } from '@/pages/ProductPage';
import { CartPage } from '@/pages/CartPage';
import { SearchPage } from '@/pages/SearchPage';
import { AdminPage } from '@/pages/AdminPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogArticlePage } from '@/pages/BlogArticlePage';


function RouteRenderer() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;

    case 'category':
      return (
        <CategoryPage
          categorySlug={route.categorySlug}
        />
      );

    case 'subcategory':
      return (
        <CategoryPage
          categorySlug={route.categorySlug}
          subcategorySlug={route.subcategorySlug}
        />
      );

    case 'product':
      return (
        <ProductPage
          productSlug={route.productSlug}
        />
      );

    case 'cart':
      return <CartPage />;

    case 'search':
      return (
        <SearchPage
          query={route.query}
        />
      );

    case 'admin':
      return <AdminPage />;

    case 'blog':
      return <BlogPage />;

    case 'blogArticle':
      return (
        <BlogArticlePage
          slug={route.slug}
        />
      );

    default:
      return <HomePage />;
  }
}

function App() {
  const [databaseUnavailable, setDatabaseUnavailable] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then(response => setDatabaseUnavailable(!response.ok))
      .catch(error => {
        console.error('Could not check the database connection:', error);
        setDatabaseUnavailable(true);
      });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-stone-50">

          <Header />

          {databaseUnavailable && (
            <div role="status" className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-amber-800">
                <AlertCircle size={16} />
                <span>Database not connected. Configure the MySQL environment variables in Vercel Project Settings.</span>
              </div>
            </div>
          )}

          <main className="flex-1">
            <RouteRenderer />
          </main>

          <Footer />

          <CartDrawer />

          {/* Website opening enquiry popup */}
          <EnquiryPopup />

        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
