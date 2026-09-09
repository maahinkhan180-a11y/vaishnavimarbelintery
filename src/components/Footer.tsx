import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  Calculator,
  ArrowRight,
  ChevronDown,
  Send,
  ExternalLink,
  MapPinned,
} from 'lucide-react';

import { navigate } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types';
import { whatsappEnquiry } from '@/lib/whatsapp';

const FOOTER_GROUPS = [
  {
    title: 'Tiles by Space',
    items: [
      'Floor Tiles',
      'Wall Tiles',
      'Bathroom Tiles',
      'Kitchen Tiles',
      'Living Room Tiles',
      'Outdoor Tiles',
      'Parking Tiles',
      'Bedroom Tiles',
      'Elevation Tiles',
      'Balcony Tiles',
      'Pooja Room Tiles',
      'Stair Tiles',
    ],
  },
  {
    title: 'Tiles by Finish',
    items: [
      'Anti Skid Tiles',
      'Glossy Tiles',
      'Polished Tiles',
      'Matt Tiles',
      'Carving Tiles',
      'Metallic Tiles',
      'Rustic Tiles',
      'Lappato Tiles',
      'Satin Tiles',
      'Hi-Gloss Tiles',
      'Wall Panels',
      'Fluted Panels',
    ],
  },
  {
    title: 'Tiles by Design',
    items: [
      '3D Tiles',
      'Wooden Tiles',
      'Marble Tiles',
      'Texture Tiles',
      'Mosaic Tiles',
      'Granite Tiles',
      'Stone Tiles',
      'Pattern Tiles',
      'Geometric Tiles',
      'Cement Tiles',
      'Travertine Tiles',
      'Terrazzo Tiles',
    ],
  },
  {
    title: 'Tiles by Type',
    items: [
      'Vitrified Tiles',
      'Ceramic Tiles',
      'Porcelain Tiles',
      'Designer Tiles',
      'Digital Tiles',
      'Glazed Tiles',
      'Cool Tiles',
      'Printed Tiles',
      'Nano Tiles',
      'Imported Tiles',
      'Italian Tiles',
      'Spanish Tiles',
    ],
  },
];

const INSTAGRAM_URL =
  'https://www.instagram.com/vaishnavimarble/';

const GOOGLE_BUSINESS_URL =
  'https://share.google/NwdYRdK6JAvO8rkJk';

const TREXOLYTE_URL =
  'https://www.trexolytetech.in/#home';

const MAP_URL =
  'https://www.google.com/maps?q=Krishnapur%20Taruliya%20Main%20Road%20near%20Chanchal%20Kumari%20Girls%20High%20School%20Sonartari%20Apartment%20New%20Town%20Kolkata%20700102&output=embed';

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    city: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Contact form initially collapsed
  const [contactOpen, setContactOpen] = useState(false);

  // Footer groups mobile accordion
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('display_order')
      .then(({ data }) => {
        setCategories(data ?? []);
      });
  }, []);

  const handleCallback = (event: React.FormEvent) => {
    event.preventDefault();

    const message = `
Hello Vaishnavi Marble,

I would like to request a callback.

Name: ${form.name}
Mobile: ${form.mobile}
City: ${form.city}
    `.trim();

    setSubmitted(true);

    window.open(
      whatsappEnquiry(message),
      '_blank',
      'noopener,noreferrer'
    );

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        mobile: '',
        city: '',
      });
    }, 3000);
  };

  return (
    <footer className="relative bg-[#071522] text-slate-300 mt-16 overflow-hidden">

      {/* =====================================================
          TRUST FEATURES
      ====================================================== */}
      <section className="border-y border-slate-700/60 bg-[#102236]">
        <div className="max-w-7xl mx-auto px-4 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            {
              icon: ShieldCheck,
              title: 'Secure Packaging',
              text: 'Safe & damage-proof',
            },
            {
              icon: Truck,
              title: 'Fast Delivery',
              text: 'Pan-India shipping',
            },
            {
              icon: RefreshCw,
              title: 'Easy Returns',
              text: '7-day return policy',
            },
            {
              icon: Headphones,
              title: 'Customer Support',
              text: 'Mon-Sat, 9am-7pm',
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex items-center gap-3 animate-[fadeInUp_0.6s_ease-out]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#172b41] border border-slate-700 flex items-center justify-center group-hover:border-[#ff9d17] group-hover:bg-[#ff9d17]/10 transition-all duration-300">
                  <Icon
                    className="text-[#ff9d17] group-hover:scale-110 transition-transform duration-300"
                    size={25}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>


      {/* =====================================================
          PART 1 — CONTACT + ADDRESS + MAP
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8">

          {/* CONTACT INFORMATION */}
          <div className="rounded-2xl border border-slate-700/70 bg-[#0b1c2c] p-6 md:p-8 shadow-xl">

            <div className="mb-7">
              <span className="inline-flex items-center gap-2 text-[#ff9d17] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-7 h-px bg-[#ff9d17]" />
                Contact Us
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
                Let's Talk About
                <span className="text-[#ff9d17]"> Your Space</span>
              </h2>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Visit our showroom or contact our team for tiles,
                marble, granite, sanitaryware, kitchen sinks and
                complete surface solutions.
              </p>
            </div>


            {/* ADDRESS 1 */}
            <div className="group flex gap-4 p-4 rounded-xl bg-[#102438] border border-slate-700/60 hover:border-[#ff9d17]/50 transition-all duration-300 mb-4">

              <div className="w-11 h-11 shrink-0 rounded-lg bg-[#ff9d17]/10 flex items-center justify-center">
                <MapPin
                  size={21}
                  className="text-[#ff9d17]"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Showroom Address
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Krishnapur Taruliya Main Road,
                  near Chanchal Kumari Girls High School,
                  Sonartari Apartment,
                  P.S. New Town,
                  Kolkata - 700102
                </p>
              </div>

            </div>


            {/* ADDRESS 2 */}
            <div className="group flex gap-4 p-4 rounded-xl bg-[#102438] border border-slate-700/60 hover:border-[#ff9d17]/50 transition-all duration-300 mb-5">

              <div className="w-11 h-11 shrink-0 rounded-lg bg-[#ff9d17]/10 flex items-center justify-center">
                <MapPinned
                  size={21}
                  className="text-[#ff9d17]"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Location
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Omathati, Kashinathpur,
                  Bishnupur, ON 211 Road,
                  to Patharghata,
                  Newtown, Kolkata,
                  West Bengal - 700135
                </p>
              </div>

            </div>


            {/* CONTACT DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <a
                href="tel:+919330300408"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#102438] hover:bg-[#172d43] transition-all group"
              >
                <Phone
                  size={18}
                  className="text-[#ff9d17] group-hover:scale-110 transition-transform"
                />

                <span className="text-sm text-slate-300">
                  +91 93303 00408
                </span>
              </a>

              <a
                href="tel:+919836344786"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#102438] hover:bg-[#172d43] transition-all group"
              >
                <Phone
                  size={18}
                  className="text-[#ff9d17] group-hover:scale-110 transition-transform"
                />

                <span className="text-sm text-slate-300">
                  +91 98363 44786
                </span>
              </a>

              <a
                href="mailto:marblevaishnavi@gmail.com"
                className="sm:col-span-2 flex items-center gap-3 p-3 rounded-lg bg-[#102438] hover:bg-[#172d43] transition-all group"
              >
                <Mail
                  size={18}
                  className="text-[#ff9d17] group-hover:scale-110 transition-transform"
                />

                <span className="text-sm text-slate-300">
                  marblevaishnavi@gmail.com
                </span>
              </a>

            </div>


            {/* TIMING */}
            <div className="flex items-center gap-3 mt-4 text-sm text-slate-400">
              <Clock
                size={18}
                className="text-[#ff9d17]"
              />

              <span>
                9:30 AM - 7:30 PM
                <span className="text-slate-500">
                  {' '}• Sunday Open
                </span>
              </span>
            </div>


            {/* SOCIAL + GOOGLE BUSINESS */}
            <div className="flex flex-wrap items-center gap-3 mt-7 pt-6 border-t border-slate-700">

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[#102438] border border-slate-700 hover:border-[#ff9d17] hover:bg-[#ff9d17]/10 transition-all"
              >
                <Instagram
                  size={18}
                  className="text-[#ff9d17] group-hover:scale-110 transition-transform"
                />

                <span className="text-sm text-white">
                  @vaishnavimarble
                </span>

                <ExternalLink
                  size={12}
                  className="text-slate-500"
                />
              </a>


              {/* Google Business */}
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[#102438] border border-slate-700 hover:border-[#ff9d17] hover:bg-[#ff9d17]/10 transition-all"
              >

                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-xs">
                  <span className="text-[#4285F4]">
                    G
                  </span>
                </div>

                <span className="text-sm text-white">
                  Google Business
                </span>

                <ExternalLink
                  size={12}
                  className="text-slate-500"
                />

              </a>

            </div>

          </div>


          {/* =================================================
              MAP
          ================================================== */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 bg-[#0b1c2c] min-h-[520px] shadow-xl">

            <div className="absolute top-5 left-5 z-10 bg-[#071522]/95 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-3 shadow-xl">

              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-[#ff9d17]"
                />

                <span className="font-semibold text-white text-sm">
                  Visit Us
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                Krishnapur Taruliya, Kolkata
              </p>

            </div>

            <iframe
              title="Vaishnavi Marble showroom location"
              src={MAP_URL}
              className="w-full h-full min-h-[520px] border-0"
              loading="lazy"
              allowFullScreen
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PART 2 — SHOP + QUICK LINKS + CONTACT FORM
      ====================================================== */}
      <section className="border-t border-slate-700/70 bg-[#081a29]">

        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.8fr_0.9fr] gap-10">


            {/* BRAND */}
            <div>

              <div className="flex items-center gap-3 mb-5">

                <img
                  src="/logo.jpeg"
                  alt="Vaishnavi Marble"
                  className="w-12 h-12 rounded-xl object-cover"
                />

                <h3 className="text-white font-bold text-xl tracking-wide">
                  VAISHNAVI{' '}
                  <span className="text-[#ff9d17]">
                    MARBLE
                  </span>
                </h3>

              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Premium marble, granite, tiles, sanitaryware,
                kitchen sinks, bathroom vanities and complete
                interior surface solutions.
              </p>


              {/* SOCIAL */}
              <div className="flex items-center gap-3 mt-6">

                {[
                  {
                    label: 'Facebook',
                    Icon: Facebook,
                    href: 'https://facebook.com/vaishnavimarble',
                  },
                  {
                    label: 'Instagram',
                    Icon: Instagram,
                    href: INSTAGRAM_URL,
                  },
                  {
                    label: 'YouTube',
                    Icon: Youtube,
                    href: 'https://youtube.com/@vaishnavimarble',
                  },
                ].map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-[#102438] border border-slate-700 text-white flex items-center justify-center hover:bg-[#ff9d17] hover:text-black hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}


                <a
                  href={whatsappEnquiry(
                    'I have a general enquiry about your products.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#102438] border border-slate-700 text-white flex items-center justify-center hover:bg-green-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                </a>

              </div>

            </div>


            {/* SHOP */}
            <div>

              <h4 className="text-white font-semibold mb-4">
                Shop & Explore
              </h4>

              <div className="space-y-2">

                <button
                  onClick={() => navigate('/')}
                  className="block text-sm text-slate-400 hover:text-[#ff9d17] hover:translate-x-1 transition-all"
                >
                  Home
                </button>

                {categories.slice(0, 7).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      navigate(`/category/${cat.slug}`)
                    }
                    className="block text-sm text-slate-400 hover:text-[#ff9d17] hover:translate-x-1 transition-all"
                  >
                    {cat.name}
                  </button>
                ))}

                <button
                  onClick={() => navigate('/blog')}
                  className="block text-sm text-slate-400 hover:text-[#ff9d17] hover:translate-x-1 transition-all"
                >
                  Inspiration & Blog
                </button>

              </div>

            </div>


            {/* CONTACT FORM */}
            <div>

              <button
                type="button"
                onClick={() =>
                  setContactOpen(!contactOpen)
                }
                className="w-full flex items-center justify-between p-4 rounded-xl bg-[#102438] border border-slate-700 hover:border-[#ff9d17] transition-all group"
              >

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-[#ff9d17]/10 flex items-center justify-center">
                    <Send
                      size={18}
                      className="text-[#ff9d17] group-hover:translate-x-1 transition-transform"
                    />
                  </div>

                  <div className="text-left">
                    <h4 className="text-white font-semibold">
                      Contact Us
                    </h4>

                    <p className="text-xs text-slate-400">
                      Send your enquiry on WhatsApp
                    </p>
                  </div>

                </div>

                <ChevronDown
                  size={20}
                  className={`text-[#ff9d17] transition-transform duration-300 ${
                    contactOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />

              </button>


              {/* EXPANDING FORM */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  contactOpen
                    ? 'grid-rows-[1fr] opacity-100 mt-4'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >

                <div className="overflow-hidden">

                  <form
                    onSubmit={handleCallback}
                    className="space-y-3 p-5 rounded-xl bg-[#0d2032] border border-slate-700"
                  >

                    <input
                      required
                      value={form.name}
                      onChange={e =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      placeholder="Your Name"
                      className="w-full bg-white text-slate-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]"
                    />

                    <input
                      required
                      type="tel"
                      value={form.mobile}
                      onChange={e =>
                        setForm({
                          ...form,
                          mobile: e.target.value,
                        })
                      }
                      placeholder="Mobile Number"
                      className="w-full bg-white text-slate-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]"
                    />

                    <input
                      required
                      value={form.city}
                      onChange={e =>
                        setForm({
                          ...form,
                          city: e.target.value,
                        })
                      }
                      placeholder="City"
                      className="w-full bg-white text-slate-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]"
                    />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#ff9d17] text-black py-3 rounded-lg font-bold text-sm hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <MessageCircle size={17} />

                      {submitted
                        ? 'Opening WhatsApp...'
                        : 'Send Enquiry'}

                      {!submitted && (
                        <ArrowRight size={16} />
                      )}
                    </button>

                  </form>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              TILE GROUPS
          ================================================== */}
          <div className="mt-12 pt-10 border-t border-slate-700/70">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {FOOTER_GROUPS.map(group => (
                <div key={group.title}>

                  <button
                    onClick={() =>
                      setOpenGroup(
                        openGroup === group.title
                          ? null
                          : group.title
                      )
                    }
                    className="w-full flex items-center justify-between lg:cursor-default"
                  >

                    <h4 className="text-white font-semibold text-sm">
                      {group.title}
                    </h4>

                    <ChevronDown
                      size={16}
                      className={`lg:hidden text-[#ff9d17] transition-transform ${
                        openGroup === group.title
                          ? 'rotate-180'
                          : ''
                      }`}
                    />

                  </button>

                  <div
                    className={`mt-4 space-y-2 ${
                      openGroup === group.title
                        ? 'block'
                        : 'hidden lg:block'
                    }`}
                  >

                    {group.items.map(item => (
                      <button
                        key={item}
                        onClick={() =>
                          navigate(
                            `/search/${encodeURIComponent(
                              item
                            )}`
                          )
                        }
                        className="block text-left text-xs text-slate-500 hover:text-[#ff9d17] hover:translate-x-1 transition-all"
                      >
                        {item}
                      </button>
                    ))}

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="border-t border-slate-700/70 bg-[#050f18]">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} Vaishnavi Marble.
            All rights reserved.
          </span>


          <span className="text-xs text-slate-500 flex items-center gap-1">
            Premium surfaces for beautiful spaces
            <ArrowRight size={13} />
          </span>


          {/* CREATED BY */}
          <a
            href={TREXOLYTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xs flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors"
          >

            <span>
              Created by
            </span>

            <span className="font-semibold text-slate-300 group-hover:text-[#ff9d17] transition-colors">
              Trexolyte Tech & IT Solutions
            </span>

            <ExternalLink
              size={11}
              className="group-hover:text-[#ff9d17] transition-colors"
            />

          </a>

        </div>

      </div>


      {/* =====================================================
          ANIMATION
      ====================================================== */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </footer>
  );
}
