// src/components/Header.tsx
import { useEffect, useState } from 'react';
import {
  ShoppingCart, Menu, X, Search, Home, MessageCircle, Calculator, Phone,
  ChevronDown, ChevronRight,
} from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { navigate } from '@/lib/router';
import { whatsappEnquiry } from '@/lib/whatsapp';

/* ============================================================
   SECOND HEADER — QUICK LINKS
   ============================================================ */
const QUICK_LINKS = [
  'Tiles',
  'Living Room',
  'Outdoor',
  'Parking',
  'Ceramic',
  'Vitrified',
  'Wash Basin',
  'Kitchen Sink',
  'Glass Blocks',
];

/* Extra items shown under "More" dropdown */
const MORE_LINKS = [
  'Indian Marble',
  'Imported Marble',
  'White Marble',
  'Granite',
  'Marble Statues',
  'Marble Mandir',
  'Bathroom Vanity',
  'Western Toilet',
  'Indian Toilet',
  'Shower',
  'Faucet',
  'Wall Panels',
  'Fluted Panels',
  'Adhesives',
  'Grouts',
  'Waterproofing',
  'Tile Cleaners',
  'Porcelain Tiles',
  'Italian Tiles',
  'Spanish Tiles',
];

export function Header() {
  const { totalItems, setIsOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [moreOpen, setMoreOpen] = useState(false);

  /* Live clock */
  useEffect(() => {
    const t = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Body scroll lock when mobile menu opens */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const goTo = (path: string) => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return goTo('/products');
    setMobileMenuOpen(false);
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleQuickLink = (label: string) => {
    setMoreOpen(false);
    setMobileMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(label)}`);
  };

  return (
    <>
      {/* =====================================================
          LIVE INFO BAR — STICKY TOP
      ====================================================== */}
      <div className="sticky top-0 z-[70] w-full bg-[#071522] text-white">
        <div className="w-full overflow-hidden border-b border-white/10 bg-[#0b1d2d]">
          <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-7">
            <div className="flex h-9 items-center overflow-hidden">
              <div className="flex min-w-max animate-[marquee_45s_linear_infinite] items-center gap-4 whitespace-nowrap text-[10px] font-semibold sm:text-[11px] md:text-xs">
                <span className="font-extrabold text-[#ff9d17]">VAISHNAV MARBLE SHOP</span>
                <span className="text-white/30">•</span>
                <span className="text-cyan-300">Tiles</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-300">Sanitaryware</span>
                <span className="text-white/30">•</span>
                <span className="text-blue-300">Kitchen Sink</span>
                <span className="text-white/30">•</span>
                <span className="text-purple-300">Bathroom Vanity</span>
                <span className="text-white/30">•</span>
                <span className="text-yellow-300">Parking Tiles</span>
                <span className="text-white/30">•</span>
                <span className="text-pink-300">Marble &amp; Granite</span>
                <span className="mx-2 text-white/20">|</span>
                <span className="text-orange-300">Kajaria</span>
                <span className="text-white/30">•</span>
                <span className="text-green-300">Johnson</span>
                <span className="text-white/30">•</span>
                <span className="text-sky-300">Jaquar</span>
                <span className="text-white/30">•</span>
                <span className="text-violet-300">Fortiva</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-300">Somany</span>
                <span className="text-white/30">•</span>
                <span className="text-cyan-300">Vitero</span>
                <span className="text-white/30">•</span>
                <span className="text-pink-300">Sika</span>
                <span className="text-white/30">•</span>
                <span className="text-yellow-300">Hindware</span>
                <span className="text-white/30">•</span>
                <span className="text-rose-300">Parryware</span>
                <span className="text-white/30">•</span>
                <span className="text-amber-300">Varmora</span>
                <span className="text-white/30">•</span>
                <span className="text-blue-300">ROOF</span>
                <span className="text-white/30">•</span>
                <span className="text-lime-300">Nitco</span>
                <span className="text-white/30">•</span>
                <span className="text-purple-300">CERO</span>
                <span className="text-white/30">•</span>
                <span className="text-orange-300">Lemovia</span>
                <span className="text-white/30">•</span>
                <span className="text-fuchsia-300">Wonder Ceramic</span>
                <span className="mx-2 text-white/20">|</span>
                <span className="font-extrabold text-[#ff9d17]">Bajaj Finserv</span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-green-400">0 Down Payment*</span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-amber-300">Easy EMI Available</span>
                <span className="text-white/30">•</span>
                <span className="text-purple-300">Flexible EMI Options</span>
                <span className="text-white/30">•</span>
                <span className="text-cyan-300">UPI / Card / Bank EMI</span>
                <span className="mx-2 text-white/20">|</span>
                <span className="text-white">
                  📅 {currentDateTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-[#ff9d17]">
                  🕒 {currentDateTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
                <span className="mx-2 text-white/20">|</span>
                <span className="text-white">Premium Quality</span>
                <span className="text-white/30">•</span>
                <span className="text-[#ff9d17]">Latest Designs</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-300">Trusted Brands</span>
                <span className="text-white/30">•</span>
                <span className="text-cyan-300">Flexible Payment Options</span>
                <span className="text-white/30">•</span>
                <span className="text-white/50">*Subject to eligibility &amp; applicable terms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER — STICKY BELOW LIVE BAR
      ====================================================== */}
      <header className="sticky top-9 z-[65] w-full bg-[#071522] text-white shadow-2xl">
        <div className="w-full border-b border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">
            <div className="flex min-h-[76px] items-center gap-3">

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-[#ff9d17] lg:hidden"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
              </button>

              {/* LOGO */}
              <button
                type="button"
                onClick={() => goTo('/')}
                className="group flex shrink-0 items-center gap-2.5 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#02080d] shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-[#ff9d17]/60 group-hover:shadow-[0_0_20px_rgba(255,157,23,0.18)]">
                  <img
                    src="/logo.jpeg"
                    alt="Vaishnavi Marble"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="hidden text-left sm:block">
                  <div className="whitespace-nowrap text-[18px] font-extrabold leading-none tracking-wide text-white">
                    VAISHNAVI <span className="text-[#ff9d17]">MARBLE</span>
                  </div>
                  <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-white/50">
                    Tiles • Marble • Interiors
                  </div>
                </div>
              </button>

              {/* MAIN NAV */}
              <nav className="ml-3 hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:ml-5">
                <button
                  type="button"
                  onClick={() => goTo('/')}
                  className="group flex items-center gap-1.5 rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  <Home size={17} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/products')}
                  className="group flex items-center gap-1.5 rounded-md bg-black px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff9d17] hover:text-black xl:px-3"
                >
                  <span>All Products</span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/category/marble-statues')}
                  className="rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  Marble Statues
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/category/tiles')}
                  className="rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  Tiles
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/category/sanitaryware')}
                  className="rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  Sanitaryware
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/category/kitchen-sink')}
                  className="hidden rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:block xl:px-3"
                >
                  Kitchen Sink
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/category/bathroom-vanity')}
                  className="hidden rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:block xl:px-3"
                >
                  Bathroom Vanity
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/blog')}
                  className="rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  Blog
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/calculator')}
                  className="group flex items-center gap-1.5 rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-[#ff9d17] xl:px-3"
                >
                  <Calculator size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>Calculator</span>
                </button>
              </nav>

              {/* RIGHT SIDE */}
              <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">

                {/* SEARCH */}
                <form onSubmit={handleSearch} className="hidden md:block">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      aria-label="Search products"
                      className="h-10 w-[170px] rounded-sm border border-[#20364e] bg-[#14263a] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-400 transition-all duration-300 focus:w-[210px] focus:border-[#ff9d17] focus:ring-1 focus:ring-[#ff9d17] lg:w-[220px]"
                    />
                    <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </form>

                {/* WHATSAPP */}
                <a
                  href={whatsappEnquiry('I have a general enquiry about your products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#ff9d17] transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#25D366]"
                >
                  <MessageCircle size={22} />
                </a>

                {/* CONTACT NUMBER */}
                <a
                  href="tel:+919330300408"
                  className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-black hover:text-[#ff9d17] lg:flex"
                >
                  <Phone size={16} className="text-[#ff9d17]" />
                  <span>93303 00408</span>
                </a>

                {/* CART */}
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  aria-label="Open cart"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#ff9d17]"
                >
                  <ShoppingCart size={23} className="transition-transform duration-300 group-hover:-rotate-6" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pulse items-center justify-center rounded-full bg-[#ff9d17] px-1 text-[10px] font-bold text-black shadow-lg">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#071522] lg:hidden">

            {/* MOBILE SEARCH */}
            <form onSubmit={handleSearch} className="border-b border-white/10 p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-11 w-full rounded-lg border border-[#20364e] bg-[#14263a] pl-10 pr-12 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#ff9d17] focus:ring-1 focus:ring-[#ff9d17]"
                />
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <button
                  type="submit"
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-r-lg bg-[#ff9d17] text-black transition hover:bg-orange-500"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* MOBILE LINKS */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => goTo('/')}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <Home size={19} />
                Home
              </button>

              <button
                type="button"
                onClick={() => goTo('/products')}
                className="flex w-full items-center gap-3 bg-black px-5 py-3.5 text-left font-semibold text-white transition hover:bg-[#ff9d17] hover:text-black"
              >
                All Products
              </button>

              <button
                type="button"
                onClick={() => goTo('/category/marble-statues')}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span>Marble Statues</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => goTo('/category/tiles')}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span>Tiles</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => goTo('/category/sanitaryware')}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span>Sanitaryware</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => goTo('/category/kitchen-sink')}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span>Kitchen Sink</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => goTo('/category/bathroom-vanity')}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span>Bathroom Vanity</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => goTo('/blog')}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                Blog
              </button>

              <button
                type="button"
                onClick={() => goTo('/calculator')}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <Calculator size={19} />
                Calculator
              </button>

              <a
                href="tel:+919330300408"
                className="flex items-center gap-3 px-5 py-3.5 font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <Phone size={19} className="text-[#ff9d17]" />
                +91 93303 00408
              </a>

              <a
                href={whatsappEnquiry('I have a general enquiry about your products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 font-semibold text-green-400 transition hover:bg-black"
              >
                <MessageCircle size={19} />
                WhatsApp Enquiry
              </a>

              <button
                type="button"
                onClick={() => { setIsOpen(true); setMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={19} />
                  Cart
                </span>
                {totalItems > 0 && (
                  <span className="rounded-full bg-[#ff9d17] px-2 py-0.5 text-xs font-bold text-black">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          SECOND CATEGORY NAVBAR — QUICK LINKS (DESKTOP)
      ====================================================== */}
      <div className="relative z-[60] hidden w-full bg-[#071522] text-white lg:block">
        <div className="w-full border-t border-white/5">
          <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">
            <div className="flex h-[64px] items-center justify-center gap-1 overflow-visible whitespace-nowrap bg-[#17263b]">

              {QUICK_LINKS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickLink(label)}
                  className="group flex h-full shrink-0 items-center px-3 text-xs font-bold text-white transition-all duration-300 hover:bg-black hover:text-[#ff9d17] xl:px-4 xl:text-sm"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    {label}
                  </span>
                </button>
              ))}

              {/* MORE DROPDOWN */}
              <div
                className="relative h-full"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen((p) => !p)}
                  className={`group flex h-full shrink-0 items-center gap-1 px-3 text-xs font-bold text-white transition-all duration-300 xl:px-4 xl:text-sm ${
                    moreOpen
                      ? 'bg-[#ff9d17] text-black'
                      : 'hover:bg-black hover:text-[#ff9d17]'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full z-[70] w-[640px] max-w-[96vw] rounded-b-2xl border border-stone-200 bg-white p-5 text-stone-900 shadow-2xl">
                    <div className="mb-3 border-b border-stone-200 pb-2">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700">
                        More Categories
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                      {MORE_LINKS.map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleQuickLink(label)}
                          className="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[12.5px] font-medium text-stone-600 transition-colors hover:bg-[#ff9d17]/10 hover:text-[#ff9d17]"
                        >
                          <ChevronRight
                            size={12}
                            className="shrink-0 text-stone-300 group-hover:text-[#ff9d17]"
                          />
                          <span className="truncate">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
