import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Award,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import type { Category, Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { whatsappEnquiry } from "@/lib/whatsapp";

const HERO_SLIDES = [
  {
    isFullBanner: true,
    image: "/EMI_OFFER.png",
    title: "",
    subtitle: "",
    cta: "",
    link: "",
  },
  {
    isFullBanner: false,
    image:
      "https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Premium Marble & Tiles",
    subtitle:
      "Discover premium quality marble, tiles and natural stone for beautiful spaces.",
    cta: "Shop Marble Statues",
    link: "/category/marble-statues",
  },
  {
    isFullBanner: false,
    image:
      "https://images.pexels.com/photos/6969861/pexels-photo-6969861.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Designer Kitchen & Bath Tiles",
    subtitle:
      "Transform your kitchen and bathroom with elegant designer tiles.",
    cta: "Explore Tiles",
    link: "/category/tiles",
  },
  {
    isFullBanner: false,
    image:
      "https://images.pexels.com/photos/10410101/pexels-photo-10410101.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Marble, Granite & Sanitaryware",
    subtitle:
      "Everything you need for premium residential and commercial projects.",
    cta: "View All Products",
    link: "/category/marble-granite",
  },
  {
    isFullBanner: false,
    image:
      "https://images.pexels.com/photos/4249687/pexels-photo-4249687.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Marble Statues & Mandirs",
    subtitle:
      "Beautifully crafted marble statues and divine mandir collections.",
    cta: "Shop Statues",
    link: "/category/marble-statues",
  },
];

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "Premium Quality",
    text: "Quality products",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    text: "Across India",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Products",
    text: "Reliable quality",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    text: "We're here to help",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /*
   * Load categories and featured products
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryResult, productResult] = await Promise.all([
          supabase
            .from("categories")
            .select("*")
            .order("name", { ascending: true }),

          supabase
            .from("products")
            .select("*")
            .eq("featured", true)
            .limit(8),
        ]);

        if (!categoryResult.error && categoryResult.data) {
          setCategories(categoryResult.data);
        }

        if (!productResult.error && productResult.data) {
          setFeaturedProducts(productResult.data);
        }
      } catch (error) {
        console.error("Homepage data loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /*
   * Auto slide change - 10 seconds
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, []);

  /*
   * Preload hero images
   */
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  }, []);

  const handleWhatsApp = () => {
    whatsappEnquiry(
      "Hello, I am interested in Vaishnavi Marble products."
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* =========================================================
          HERO CAROUSEL
      ========================================================= */}
      <section className="relative w-full h-[280px] sm:h-[330px] md:h-[400px] lg:h-[460px] overflow-hidden bg-white">

        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive
                  ? "opacity-100 z-[1]"
                  : "opacity-0 pointer-events-none z-0"
              }`}
            >

              {/* =====================================================
                  EMI FULL PNG SLIDE
                  IMPORTANT: object-contain prevents cropping
              ===================================================== */}
              {slide.isFullBanner ? (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <img
                    src="/EMI_OFFER.png"
                    alt="EMI Offer"
                    className="w-full h-full object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              ) : (
                <>
                  {/* Normal carousel image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

                  {/* Text */}
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-2xl text-white">

                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                        {slide.title}
                      </h1>

                      <p className="text-base sm:text-lg md:text-xl text-white/90 mb-7 max-w-xl">
                        {slide.subtitle}
                      </p>

                      <button
                        onClick={() => navigate(slide.link)}
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5" />
                      </button>

                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Previous button */}
        <button
          type="button"
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">

            {TRUST_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 py-5 px-3 sm:px-6"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-7 h-7 text-gray-800" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Explore
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Shop By Category
              </h2>
            </div>

            <button
              onClick={() => navigate("/categories")}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:underline"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-48 rounded-xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    navigate(`/category/${category.slug}`)
                  }
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all text-left"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
                      {category.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-gray-500 group-hover:text-gray-900">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              ))}

            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No categories available.
            </div>
          )}

          <button
            onClick={() => navigate("/categories")}
            className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 font-semibold"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Our Collection
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:underline"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          ) : (
            <div className="text-center py-12 border rounded-xl">
              <p className="text-gray-500">
                Featured products will appear here.
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/products")}
            className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 font-semibold"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </section>

      {/* =========================================================
          OWNER / ABOUT SECTION
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div className="rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/onwer.png"
                alt="Vaishnavi Marble"
                className="w-full h-[350px] sm:h-[450px] object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                About Vaishnavi Marble
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                Quality That Builds Beautiful Spaces
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                We provide a wide range of marble, granite, tiles,
                sanitaryware, kitchen sinks, bathroom vanities and
                other products for residential and commercial spaces.
              </p>

              <p className="text-gray-600 leading-relaxed mb-7">
                Our focus is on quality products, reliable service
                and helping customers find the right solution for
                their projects.
              </p>

              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                Know More
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          BULK / WHOLESALE CTA
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                For Business
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bulk & Wholesale Enquiries
              </h2>

              <p className="text-gray-300 leading-relaxed max-w-xl">
                Planning a residential, commercial or large-scale
                project? Contact us for bulk requirements and
                customised product enquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:justify-end gap-3">

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </button>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
