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
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";
import type { Category, Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { whatsappEnquiry } from "@/lib/whatsapp";

type HeroSlide =
  | {
      type: "emi";
      image: string;
    }
  | {
      type: "image";
      image: string;
      title: string;
      subtitle: string;
      cta: string;
      link: string;
    };

const HERO_SLIDES: HeroSlide[] = [
  {
    type: "emi",
    image: "/EMI_OFFER.png",
  },
  {
    type: "image",
    image:
      "https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Premium Marble & Tiles",
    subtitle:
      "Premium quality marble, tiles and surfaces for beautiful spaces.",
    cta: "Shop Marble",
    link: "/category/marble-granite",
  },
  {
    type: "image",
    image:
      "https://images.pexels.com/photos/6969861/pexels-photo-6969861.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Designer Kitchen & Bath Tiles",
    subtitle:
      "Modern designs and premium finishes for your kitchen and bathroom.",
    cta: "Explore Tiles",
    link: "/category/tiles",
  },
  {
    type: "image",
    image:
      "https://images.pexels.com/photos/10410101/pexels-photo-10410101.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Marble, Granite & Sanitaryware",
    subtitle:
      "Complete solutions for residential and commercial projects.",
    cta: "View Products",
    link: "/products",
  },
  {
    type: "image",
    image:
      "https://images.pexels.com/photos/4249687/pexels-photo-4249687.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Marble Statues & Mandirs",
    subtitle:
      "Beautifully crafted marble statues and spiritual décor.",
    cta: "Shop Statues",
    link: "/category/marble-statues",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // PRELOAD HERO IMAGES
  // =========================================================
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  // =========================================================
  // AUTO SLIDER
  // =========================================================
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide(
        (previous) => (previous + 1) % HERO_SLIDES.length
      );
    }, 10000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // =========================================================
  // LOAD HOME DATA
  // =========================================================
  const loadHomeData = useCallback(async () => {
    setLoading(true);

    try {
      const [categoriesResponse, productsResponse] =
        await Promise.all([
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

      if (categoriesResponse.error) {
        console.error(
          "Categories loading error:",
          categoriesResponse.error
        );
        setCategories([]);
      } else {
        setCategories(categoriesResponse.data ?? []);
      }

      if (productsResponse.error) {
        console.error(
          "Products loading error:",
          productsResponse.error
        );
        setFeaturedProducts([]);
      } else {
        setFeaturedProducts(productsResponse.data ?? []);
      }
    } catch (error) {
      console.error("Home page data error:", error);

      setCategories([]);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  // =========================================================
  // SLIDER CONTROLS
  // =========================================================
  const previousSlide = () => {
    setCurrentSlide(
      (previous) =>
        (previous - 1 + HERO_SLIDES.length) %
        HERO_SLIDES.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      (previous) => (previous + 1) % HERO_SLIDES.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = HERO_SLIDES[currentSlide];

  // =========================================================
  // CATEGORY LINK
  // =========================================================
  const getCategoryLink = (category: Category) => {
    const categoryWithSlug = category as Category & {
      slug?: string | null;
    };

    const slug =
      categoryWithSlug.slug?.trim() ||
      String(category.name)
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    return `/category/${slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* =====================================================
          HERO / CAROUSEL
      ====================================================== */}
      <section className="relative w-full h-[280px] sm:h-[330px] md:h-[400px] lg:h-[460px] overflow-hidden bg-white">
        {slide.type === "emi" ? (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <img
              src={slide.image}
              alt="Special EMI Offer"
              className="w-full h-full object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-white">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl">
                    {slide.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate(slide.link)}
                    className="mt-6 inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors"
                  >
                    {slide.cta}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Previous */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-stone-800 transition-colors z-20"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-stone-800 transition-colors z-20"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200">
            <div className="flex items-center gap-3 py-5 px-3">
              <Truck className="text-stone-700 shrink-0" size={24} />
              <div>
                <p className="font-semibold text-stone-800 text-sm">
                  Fast Delivery
                </p>
                <p className="text-xs text-stone-500">
                  Reliable shipping
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 px-3">
              <ShieldCheck
                className="text-stone-700 shrink-0"
                size={24}
              />
              <div>
                <p className="font-semibold text-stone-800 text-sm">
                  Quality Assured
                </p>
                <p className="text-xs text-stone-500">
                  Premium products
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 px-3">
              <Award className="text-stone-700 shrink-0" size={24} />
              <div>
                <p className="font-semibold text-stone-800 text-sm">
                  Trusted Service
                </p>
                <p className="text-xs text-stone-500">
                  Years of experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 px-3">
              <Headphones
                className="text-stone-700 shrink-0"
                size={24}
              />
              <div>
                <p className="font-semibold text-stone-800 text-sm">
                  Expert Support
                </p>
                <p className="text-xs text-stone-500">
                  We are here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="py-12 sm:py-16 bg-stone-50">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                Explore
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-stone-900">
                Shop by Category
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-stone-700 hover:text-stone-900"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-40 bg-stone-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                const categoryData = category as Category & {
                  image_url?: string | null;
                };

                const categoryImage =
                  categoryData.image_url || null;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      navigate(getCategoryLink(category))
                    }
                    className="group text-left"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-white border border-stone-200">
                      {categoryImage ? (
                        <img
                          src={categoryImage}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    <h3 className="mt-3 font-semibold text-stone-800 text-sm group-hover:text-stone-600 transition-colors">
                      {category.name}
                    </h3>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-stone-500">
              No categories available.
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="sm:hidden mt-6 mx-auto flex items-center gap-1 text-sm font-semibold text-stone-700"
          >
            View All Categories
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                Our Collection
              </p>

              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-stone-900">
                Featured Products
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-stone-700 hover:text-stone-900"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-stone-100 rounded-xl animate-pulse"
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
            <div className="text-center py-12 bg-stone-50 rounded-xl">
              <p className="text-stone-500">
                No featured products available.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="sm:hidden mt-6 mx-auto flex items-center gap-1 text-sm font-semibold text-stone-700"
          >
            View All Products
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =====================================================
          ABOUT / OWNER
      ====================================================== */}
      <section className="py-12 sm:py-16 bg-stone-50">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden bg-white border border-stone-200">
              <img
                src="/onwer.png"
                alt="Owner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                About Us
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                Your Trusted Marble & Tiles Partner
              </h2>

              <p className="mt-5 text-stone-600 leading-relaxed">
                We provide premium marble, granite, tiles,
                sanitaryware, kitchen sinks, bathroom vanities
                and other products for homes, offices and
                commercial projects.
              </p>

              <p className="mt-4 text-stone-600 leading-relaxed">
                Our focus is on quality products, reliable
                service and helping customers choose the right
                solution for their space.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-stone-800 transition-colors"
                >
                  Learn More
                  <ArrowRight size={18} />
                </button>

                <a
                  href={whatsappEnquiry(
                    "Hello, I would like to know more about your marble, tiles and sanitaryware products."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BULK / WHOLESALE CTA
      ====================================================== */}
      <section className="py-12 sm:py-16 bg-stone-900 text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
                For Builders & Businesses
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Need Bulk or Wholesale Supply?
              </h2>

              <p className="mt-3 text-stone-300 max-w-2xl">
                Contact us for project requirements, bulk orders,
                wholesale pricing and product availability.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappEnquiry(
                  "Hello, I need information about bulk/wholesale marble, tiles and sanitaryware supply."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>

              <a
                href="tel:+919330300408"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
