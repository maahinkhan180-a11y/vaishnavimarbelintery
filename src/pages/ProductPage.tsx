import { useState, useEffect } from 'react';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  ChevronRight,
  Zap,
  MessageCircle,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import type { Product, Subcategory, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { whatsappProductOrder } from '@/lib/whatsapp';

export function ProductPage({ productSlug }: { productSlug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    setAddedToCart(false);

    supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .maybeSingle()
      .then(async ({ data }) => {
        if (!data) {
          setLoading(false);
          return;
        }

        setProduct(data);

        const { data: sub } = await supabase
          .from('subcategories')
          .select('*')
          .eq('id', data.subcategory_id)
          .maybeSingle();

        if (sub) {
          setSubcategory(sub);

          const { data: cat } = await supabase
            .from('categories')
            .select('*')
            .eq('id', sub.category_id)
            .maybeSingle();

          setCategory(cat);

          const { data: related } = await supabase
            .from('products')
            .select('*')
            .eq('subcategory_id', sub.id)
            .neq('id', data.id)
            .order('display_order')
            .limit(4);

          setRelatedProducts(related ?? []);
        }

        setLoading(false);
      });
  }, [productSlug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    const coverage = getCoveragePerBox(product.coverage_per_box);
    const sizeData = parseSize(product.size);
    const piecesPerBox = Number(product.pieces_per_box) || 0;

    let priceText = `Rs. ${product.price.toLocaleString('en-IN')} / Box`;

    if (coverage > 0) {
      const pricePerSqFt = product.price / coverage;

      priceText =
        `Rs. ${pricePerSqFt.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} / Sq. Ft.`;
    } else if (sizeData && piecesPerBox > 0) {
      const sqFtPerPiece = calculateSqFtPerPiece(
        sizeData.width,
        sizeData.height
      );

      const sqFtPerBox = sqFtPerPiece * piecesPerBox;

      if (sqFtPerBox > 0) {
        const pricePerSqFt = product.price / sqFtPerBox;

        priceText =
          `Rs. ${pricePerSqFt.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} / Sq. Ft.`;
      }
    }

    window.open(
      whatsappProductOrder(product.name, priceText, quantity),
      '_blank'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            Product Not Found
          </h1>

          <p className="text-stone-500 mb-6">
            The product you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const discount =
    product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : 0;

  /*
   * ==========================================
   * SQUARE FEET CALCULATION
   * ==========================================
   *
   * Priority:
   * 1. coverage_per_box থাকলে সেটি ব্যবহার করবে
   * 2. না থাকলে size + pieces_per_box দিয়ে calculate করবে
   *
   * Example:
   * 100 x 200 mm
   * 10 pieces
   * Price ₹500
   *
   * 1 piece = 0.2153 Sq.Ft.
   * 10 pieces = 2.153 Sq.Ft.
   * ₹500 / 2.153 = ₹232.23 / Sq.Ft.
   */

  const coverageFromDatabase = getCoveragePerBox(
    product.coverage_per_box
  );

  const sizeData = parseSize(product.size);
  const piecesPerBox = Number(product.pieces_per_box) || 0;

  let sqFtPerPiece = 0;
  let sqFtPerBox = coverageFromDatabase;

  if (sizeData) {
    sqFtPerPiece = calculateSqFtPerPiece(
      sizeData.width,
      sizeData.height
    );
  }

  if (sqFtPerBox <= 0 && sqFtPerPiece > 0 && piecesPerBox > 0) {
    sqFtPerBox = sqFtPerPiece * piecesPerBox;
  }

  const hasSqFtRate = sqFtPerBox > 0;

  const pricePerSqFt = hasSqFtRate
    ? product.price / sqFtPerBox
    : 0;

  const mrpPerSqFt =
    hasSqFtRate && product.mrp > 0
      ? product.mrp / sqFtPerBox
      : 0;

  const totalSqFt = hasSqFtRate
    ? sqFtPerBox * quantity
    : 0;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-sm text-stone-500 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-stone-900"
          >
            Home
          </button>

          <ChevronRight size={15} />

          {category && (
            <>
              <span>{category.name}</span>
              <ChevronRight size={15} />
            </>
          )}

          {subcategory && (
            <>
              <span>{subcategory.name}</span>
              <ChevronRight size={15} />
            </>
          )}

          <span className="text-stone-900 font-medium">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200">
              <div className="aspect-square">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Brand */}
            {product.brand && (
              <p className="text-sm uppercase tracking-wider text-stone-500 font-medium mb-2">
                {product.brand}
              </p>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className={
                      star <= Math.round(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-stone-300'
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-stone-500">
                {product.rating || 0} rating
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {hasSqFtRate ? (
                <>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-bold text-stone-900">
                      Rs.{' '}
                      {pricePerSqFt.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>

                    <span className="text-base font-semibold text-stone-500">
                      / Sq. Ft.
                    </span>

                    {product.mrp > product.price && (
                      <span className="text-lg text-stone-400 line-through">
                        Rs.{' '}
                        {mrpPerSqFt.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        {' / Sq. Ft.'}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="text-sm font-semibold text-green-600">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-stone-500">
                      Inclusive of all taxes
                    </p>

                    <p className="text-sm font-medium text-stone-700">
                      1 Box = {sqFtPerBox.toFixed(2)} Sq. Ft.
                    </p>

                    {piecesPerBox > 0 && (
                      <p className="text-sm text-stone-500">
                        {piecesPerBox} Pieces / Box
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-bold text-stone-900">
                      Rs. {product.price.toLocaleString('en-IN')}
                    </span>

                    <span className="text-base font-semibold text-stone-500">
                      / Box
                    </span>

                    {product.mrp > product.price && (
                      <span className="text-lg text-stone-400 line-through">
                        Rs. {product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="text-sm font-semibold text-green-600">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-stone-500 mt-2">
                    Inclusive of all taxes
                  </p>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Product basic information */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.size && (
                <div className="bg-white rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500 mb-1">
                    Size
                  </p>
                  <p className="font-medium text-stone-900">
                    {product.size}
                  </p>
                </div>
              )}

              {product.thickness && (
                <div className="bg-white rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500 mb-1">
                    Thickness
                  </p>
                  <p className="font-medium text-stone-900">
                    {product.thickness}
                  </p>
                </div>
              )}

              {product.finish && (
                <div className="bg-white rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500 mb-1">
                    Finish
                  </p>
                  <p className="font-medium text-stone-900">
                    {product.finish}
                  </p>
                </div>
              )}

              {product.color && (
                <div className="bg-white rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500 mb-1">
                    Color
                  </p>
                  <p className="font-medium text-stone-900">
                    {product.color}
                  </p>
                </div>
              )}
            </div>

            {/* Sq Ft Calculation */}
            {hasSqFtRate && (
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Zap
                      size={18}
                      className="text-stone-700"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-900">
                      Square Feet Calculation
                    </h3>

                    <p className="text-sm text-stone-600 mt-1">
                      {product.size || 'Size'} × {piecesPerBox || '-'} pieces
                      {sqFtPerBox > 0 &&
                        ` = ${sqFtPerBox.toFixed(2)} Sq. Ft. / Box`}
                    </p>

                    <p className="text-sm font-medium text-stone-800 mt-1">
                      Rate: Rs.{' '}
                      {pricePerSqFt.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      / Sq. Ft.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-stone-700">
                Quantity:
              </span>

              <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="p-3 hover:bg-stone-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4 font-medium min-w-[50px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-stone-100"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <span className="text-sm text-stone-500">
                Box{quantity > 1 ? 'es' : ''}
              </span>
            </div>

            {/* Total */}
            {hasSqFtRate && (
              <div className="flex items-center justify-between bg-white border border-stone-200 rounded-xl px-4 py-3 mb-6">
                <span className="text-sm text-stone-600">
                  Total Area
                </span>

                <span className="font-bold text-stone-900">
                  {totalSqFt.toFixed(2)} Sq. Ft.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 border border-stone-900 text-stone-900 rounded-lg font-semibold hover:bg-stone-100 transition"
                >
                  {addedToCart ? (
                    <>
                      <Check size={19} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={19} />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition"
                >
                  <Zap size={19} />
                  Buy Now
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <MessageCircle size={20} />
                Order on WhatsApp
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Truck
                  size={20}
                  className="text-stone-700 mt-0.5"
                />
                <div>
                  <p className="font-medium text-stone-900 text-sm">
                    Fast Delivery
                  </p>
                  <p className="text-xs text-stone-500">
                    Reliable delivery service
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="text-stone-700 mt-0.5"
                />
                <div>
                  <p className="font-medium text-stone-900 text-sm">
                    Quality Assured
                  </p>
                  <p className="text-xs text-stone-500">
                    Premium quality products
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw
                  size={20}
                  className="text-stone-700 mt-0.5"
                />
                <div>
                  <p className="font-medium text-stone-900 text-sm">
                    Easy Support
                  </p>
                  <p className="text-xs text-stone-500">
                    Helpful customer service
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headphones
                  size={20}
                  className="text-stone-700 mt-0.5"
                />
                <div>
                  <p className="font-medium text-stone-900 text-sm">
                    Customer Support
                  </p>
                  <p className="text-xs text-stone-500">
                    Contact us anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {(product.specs ||
              product.suitable_for ||
              product.design ||
              product.coverage_per_box ||
              product.pieces_per_box) && (
              <div className="mt-10 border-t border-stone-200 pt-8">
                <h2 className="text-xl font-bold text-stone-900 mb-5">
                  Specifications
                </h2>

                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {product.size && (
                    <SpecRow label="Size" value={product.size} />
                  )}

                  {product.thickness && (
                    <SpecRow
                      label="Thickness"
                      value={String(product.thickness)}
                    />
                  )}

                  {product.finish && (
                    <SpecRow
                      label="Finish"
                      value={product.finish}
                    />
                  )}

                  {product.color && (
                    <SpecRow
                      label="Color"
                      value={product.color}
                    />
                  )}

                  {product.design && (
                    <SpecRow
                      label="Design"
                      value={product.design}
                    />
                  )}

                  {product.coverage_per_box && (
                    <SpecRow
                      label="Coverage / Box"
                      value={`${sqFtPerBox.toFixed(2)} Sq. Ft.`}
                    />
                  )}

                  {product.pieces_per_box && (
                    <SpecRow
                      label="Pieces / Box"
                      value={String(product.pieces_per_box)}
                    />
                  )}

                  {product.suitable_for && (
                    <SpecRow
                      label="Suitable For"
                      value={product.suitable_for}
                    />
                  )}

                  {product.specs &&
                    typeof product.specs === 'object' &&
                    Object.entries(product.specs).map(
                      ([key, value]) => (
                        <SpecRow
                          key={key}
                          label={formatSpecName(key)}
                          value={String(value)}
                        />
                      )
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                Related Products
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                You may also like these products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ==========================================
   HELPER FUNCTIONS
   ========================================== */

function parseSize(
  size: unknown
): { width: number; height: number } | null {
  if (!size) return null;

  const text = String(size)
    .toLowerCase()
    .replace(/mm/g, '')
    .replace(/×/g, 'x')
    .replace(/\*/g, 'x')
    .trim();

  const match = text.match(
    /([\d.]+)\s*x\s*([\d.]+)/
  );

  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  return {
    width,
    height,
  };
}

function calculateSqFtPerPiece(
  widthMm: number,
  heightMm: number
): number {
  const widthMeter = widthMm / 1000;
  const heightMeter = heightMm / 1000;

  const areaSqMeter = widthMeter * heightMeter;

  return areaSqMeter * 10.7639;
}

function getCoveragePerBox(
  value: unknown
): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (!value) return 0;

  const parsed = parseFloat(
    String(value).replace(/,/g, '')
  );

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatSpecName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-3">
      <span className="text-sm text-stone-500">
        {label}
      </span>

      <span className="text-sm font-medium text-stone-900 text-right">
        {value}
      </span>
    </div>
  );
}
