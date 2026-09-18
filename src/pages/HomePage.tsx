import { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Star,
  TrendingUp,
  Package,
  Award,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Truck,
  ShieldCheck,
  Headphones,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import type { Category, Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { whatsappEnquiry } from '@/lib/whatsapp';

const HERO_SLIDES = [
  {
    image:
      'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Premium Marble & Tiles',
    subtitle: 'Exquisite craftsmanship for your dream home',
    cta: 'Shop Marble Statues',
    link: '/category/marble-statues',
  },
  {
    image:
      'https://images.pexels.com/photos/6969861/pexels-photo-6969861.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Designer Kitchen & Bath Tiles',
    subtitle: 'Transform your spaces with style',
    cta: 'Explore Tiles',
    link: '/category/tiles',
  },
  {
    image:
      'https://images.pexels.com/photos/10410101/pexels-photo-10410101.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Marble, Granite & Sanitaryware',
    subtitle: "Kolkata’s leading destination for quality",
    cta: 'View All Products',
    link: '/category/marble-granite',
  },
  {
    image:
      'https://images.pexels.com/photos/4249687/pexels-photo-4249687.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    title: 'Marble Statues & Mandirs',
    subtitle: 'Handcrafted with devotion and precision',
    cta: 'Shop Statues',
    link: '/category/marble-statues',
  },
];

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    Promise.all([
      supabase
        .from('categories')
        .select('*')
        .order('display_order'),

      supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('display_order')
        .limit(8),
    ]).then(([catRes, prodRes]) => {
      setCategories(catRes.data ?? []);
      setFeaturedProducts(prodRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % HERO_SLIDES.length
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + HERO_SLIDES.length) %
        HERO_SLIDES.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-white">

      {/* =====================================================
          HERO SLIDER
      ====================================================== */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-black">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">

                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                  {slide.title}
                </h2>

                <p className="text-lg text-slate-200 mb-6">
                  {slide.subtitle}
                </p>

                <button
                  onClick={() => navigate(slide.link)}
                  className="bg-[#ff9d17] text-black px-6 py-3 rounded-sm font-bold hover:bg-white transition-colors inline-flex items-center gap-2"
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          </div>
        ))}

        {/* Previous Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-[#ff9d17] text-white rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-[#ff9d17] text-white rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-[#ff9d17] w-8'
                  : 'bg-white/50 w-2.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="flex items-center gap-3">
            <Truck
              className="text-[#ff9d17]"
              size={28}
            />
            <div>
              <p className="text-sm font-semibold text-stone-800">
                Fast Delivery
              </p>
              <p className="text-xs text-stone-500">
                Pan-India shipping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck
              className="text-[#ff9d17]"
              size={28}
            />
            <div>
              <p className="text-sm font-semibold text-stone-800">
                Secure Packaging
              </p>
              <p className="text-xs text-stone-500">
                Safe & damage-proof
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones
              className="text-[#ff9d17]"
              size={28}
            />
            <div>
              <p className="text-sm font-semibold text-stone-800">
                Customer Support
              </p>
              <p className="text-xs text-stone-500">
                Mon-Sat, 9am-7pm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award
              className="text-[#ff9d17]"
              size={28}
            />
            <div>
              <p className="text-sm font-semibold text-stone-800">
                Premium Quality
              </p>
              <p className="text-xs text-stone-500">
                Trusted by thousands
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-14">

        <div className="text-center mb-10">

          <p className="text-[#ff9d17] font-semibold text-sm tracking-wider uppercase mb-1">
            Our Collection
          </p>

          <h2 className="text-3xl font-bold text-stone-800">
            Shop by Category
          </h2>

          <div className="w-16 h-1 bg-[#ff9d17] mx-auto mt-3 rounded-full" />

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                navigate(`/category/${cat.slug}`)
              }
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 hover:shadow-xl transition-all"
            >
              {cat.image_url && (
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                <h3 className="text-white font-semibold text-xs">
                  {cat.name}
                </h3>
              </div>

            </button>
          ))}

        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}
      <section className="bg-stone-50 py-14">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-10">

            <p className="text-[#ff9d17] font-semibold text-sm tracking-wider uppercase mb-1">
              Handpicked for you
            </p>

            <h2 className="text-3xl font-bold text-stone-800">
              Featured Products
            </h2>

            <div className="w-16 h-1 bg-[#ff9d17] mx-auto mt-3 rounded-full" />

          </div>

          {loading ? (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-stone-200 animate-pulse aspect-[3/4]"
                />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          MEET THE OWNER - PREMIUM SECTION
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl">

          {/* Decorative Background */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff9d17]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#ff9d17]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 items-stretch">

            {/* =================================================
                OWNER IMAGE
            ================================================== */}
            <div className="relative min-h-[430px] md:min-h-[570px] bg-gradient-to-br from-stone-100 via-white to-stone-200 flex items-center justify-center p-5 sm:p-7 md:p-10">

              {/* Orange decorative border */}
              <div className="absolute top-5 left-5 w-20 h-20 border-t-4 border-l-4 border-[#ff9d17] rounded-tl-2xl opacity-80" />

              <div className="absolute bottom-5 right-5 w-20 h-20 border-b-4 border-r-4 border-[#ff9d17] rounded-br-2xl opacity-80" />

              {/* Image Frame */}
              <div className="relative w-full h-full min-h-[390px] md:min-h-[510px] rounded-2xl overflow-hidden border border-white shadow-xl bg-white flex items-center justify-center">

                <img
                  src="/onwer.png"
                  alt="Owner of Vaishnavi Marble"
                  className="w-full h-full object-contain"
                />

                {/* Image Bottom Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap shadow-lg">
                  VAISHNAVI MARBLE
                </div>

              </div>

            </div>

            {/* =================================================
                OWNER CONTENT
            ================================================== */}
            <div className="relative flex flex-col justify-center p-7 sm:p-10 md:p-12 lg:p-16">

              {/* Section Label */}
              <div className="mb-5">

                <span className="inline-flex items-center gap-2 text-[#ff9d17] font-bold text-sm tracking-[0.18em] uppercase">

                  <span className="w-9 h-[2px] bg-[#ff9d17]" />

                  Meet the Owner

                </span>

              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight mb-5">

                Welcome to

                <span className="block text-[#ff9d17] mt-1">
                  Vaishnavi Marble
                </span>

              </h2>

              {/* Decorative Line */}
              <div className="flex items-center gap-2 mb-7">

                <span className="w-14 h-1 bg-[#ff9d17] rounded-full" />

                <span className="w-2 h-1 bg-[#ff9d17]/40 rounded-full" />

                <span className="w-2 h-1 bg-[#ff9d17]/20 rounded-full" />

              </div>

              {/* Description */}
              <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-5">
                At Vaishnavi Marble, we bring you the finest
                selection of marble, tiles, sanitaryware, and
                handcrafted marble statues. With years of experience
                in the industry, we take pride in offering premium
                quality products at the best prices across Kolkata.
              </p>

              <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-7">
                Our commitment to excellence and customer
                satisfaction has made us a trusted name for
                homeowners, builders, and interior designers alike.
                Visit our showroom to explore our exclusive collection.
              </p>

              {/* =================================================
                  IMPRESSIVE HIGHLIGHT
              ================================================== */}
              <div className="relative border-l-4 border-[#ff9d17] bg-gradient-to-r from-[#ff9d17]/10 to-transparent rounded-r-xl px-5 py-4 mb-8">

                <div className="absolute -left-[9px] top-5 w-3 h-3 rounded-full bg-[#ff9d17] ring-4 ring-[#ff9d17]/20" />

                <p className="text-stone-900 font-bold text-base md:text-lg italic leading-relaxed">
                  “Quality you can trust. Designs you will love.”
                </p>

                <p className="text-stone-500 text-sm mt-2 font-medium">
                  — Vaishnavi Marble
                </p>

              </div>

              {/* =================================================
                  BUTTONS
              ================================================== */}
              <div className="flex flex-wrap gap-3">

                <a
                  href="tel:+919330300408"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#ff9d17] hover:text-black transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Phone size={18} />
                  Call Us
                </a>

                <a
                  href={whatsappEnquiry(
                    'I would like to know more about your products.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-stone-300 bg-white text-stone-800 px-6 py-3.5 rounded-xl font-semibold hover:border-[#ff9d17] hover:bg-[#ff9d17]/10 transition-all duration-300"
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
      <section className="max-w-7xl mx-auto px-4 py-14">

        <div className="relative overflow-hidden bg-black rounded-2xl p-10 md:p-16 text-center text-white">

          {/* Decorative Orange Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff9d17]/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ff9d17]/10 rounded-full blur-3xl" />

          <div className="relative">

            <p className="text-[#ff9d17] text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Business Enquiry
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Need Bulk or Wholesale Enquiry?
            </h2>

            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get special pricing on bulk orders. Contact our team
              for personalized quotes on large quantity purchases.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">

              <a
                href="tel:+919330300408"
                className="inline-flex items-center gap-2 bg-[#ff9d17] text-black px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
              >
                <Phone size={18} />
                Call +91 93303 00408
              </a>

              <a
                href={whatsappEnquiry(
                  'I would like to enquire about bulk/wholesale pricing.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
