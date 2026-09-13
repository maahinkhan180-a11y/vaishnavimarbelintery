import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Home,
  MessageCircle,
  Calculator,
  Phone,
  ChevronDown,
  ChevronRight,
  Gem,
  Grid3X3,
  Bath,
  UtensilsCrossed,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { navigate } from '@/lib/router';
import { whatsappEnquiry } from '@/lib/whatsapp';

export function Header() {
  const { totalItems, setIsOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<string | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);

  // =====================================================
  // LIVE DATE & TIME
  // =====================================================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =====================================================
  // NAVIGATION
  // =====================================================
  const goTo = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  // =====================================================
  // SEARCH
  // =====================================================
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      goTo('/products');
      return;
    }

    setMobileMenuOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  // =====================================================
  // CATEGORY MEGA MENU DATA
  // =====================================================
  const categoryImage = (name: string) =>
    `/assets/categories/${name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}.jpg`;

  const categoryMenus = [
    {
      name: 'Marble',
      icon: Gem,
      items: [
        'Indian Marble',
        'Imported Marble',
        'White Marble',
        'Black Marble',
        'Beige Marble',
        'Green Marble',
        'Marble Slabs',
        'Marble Tiles',
      ],
    },
    {
      name: 'Tiles',
      icon: Grid3X3,
      columns: [
        {
          title: 'Tiles By',
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
          title: 'Tiles Finish',
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
          title: 'Tiles Design',
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
          title: 'Tiles Type',
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
      ],
    },
    {
      name: 'Sanitaryware',
      icon: Bath,
      items: [
        'Western Toilet',
        'Indian Toilet',
        'Wash Basin',
        'Counter Basin',
        'Wall Hung',
        'One Piece',
        'Two Piece',
        'Urinal',
        'Cistern',
        'Bathroom Accessories',
      ],
    },
    {
      name: 'Kitchen',
      icon: UtensilsCrossed,
      items: [
        'Kitchen Sink',
        'Single Bowl Sink',
        'Double Bowl Sink',
        'Quartz Sink',
        'Stainless Steel Sink',
        'Kitchen Accessories',
      ],
    },
    {
      name: 'Bathroom',
      icon: Bath,
      items: [
        'Bathroom Vanity',
        'Vanity Basin',
        'Shower',
        'Faucet',
        'Mirror',
        'Bathroom Accessories',
      ],
    },
    {
      name: 'Other',
      icon: Building2,
      items: [
        'Marble Statues',
        'Granite',
        'Parking Tiles',
        'Wall Panels',
        'Fluted Panels',
      ],
    },
  ];

  const handleCategoryClick = (label: string) => {
    setActiveCategoryMenu(null);
    setOpenMobileCategory(null);
    setMobileMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(label)}`);
  };

  const handleCategoryParentClick = (name: string) => {
    const parentRoutes: Record<string, string> = {
      Marble: '/products?category=Marble',
      Tiles: '/category/tiles',
      Sanitaryware: '/category/sanitaryware',
      Kitchen: '/category/kitchen-sink',
      Bathroom: '/category/bathroom-vanity',
      Other: '/products?category=Other',
    };

    const path = parentRoutes[name];
    if (path) goTo(path);
  };

  return (
    <>
      {/* =====================================================
          LIVE INFO BAR
      ====================================================== */}
      <div className="sticky top-0 z-[60] w-full bg-[#071522] text-white">
        <div className="w-full overflow-hidden border-b border-white/10 bg-[#0b1d2d]">
          <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-7">
            <div className="flex h-9 items-center overflow-hidden">
              <div className="flex min-w-max animate-[marquee_45s_linear_infinite] items-center gap-4 whitespace-nowrap text-[10px] font-semibold sm:text-[11px] md:text-xs">

                <span className="font-extrabold text-[#ff9d17]">
                  VAISHNAV MARBLE SHOP
                </span>

                <span className="text-white/30">•</span>

                <span className="text-cyan-300">Tiles</span>

                <span className="text-white/30">•</span>

                <span className="text-emerald-300">
                  Sanitaryware
                </span>

                <span className="text-white/30">•</span>

                <span className="text-blue-300">
                  Kitchen Sink
                </span>

                <span className="text-white/30">•</span>

                <span className="text-purple-300">
                  Bathroom Vanity
                </span>

                <span className="text-white/30">•</span>

                <span className="text-yellow-300">
                  Parking Tiles
                </span>

                <span className="text-white/30">•</span>

                <span className="text-pink-300">
                  Marble &amp; Granite
                </span>

                <span className="mx-2 text-white/20">|</span>

                {/* TRUSTED BRANDS */}
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

                <span className="text-fuchsia-300">
                  Wonder Ceramic
                </span>

                <span className="mx-2 text-white/20">|</span>

                {/* BAJAJ FINSERV EMI */}
                <span className="font-extrabold text-[#ff9d17]">
                  Bajaj Finserv
                </span>

                <span className="text-white/30">•</span>

                <span className="font-bold text-green-400">
                  0 Down Payment*
                </span>

                <span className="text-white/30">•</span>

                <span className="font-bold text-amber-300">
                  Easy EMI Available
                </span>

                <span className="text-white/30">•</span>

                <span className="text-purple-300">
                  Flexible EMI Options
                </span>

                <span className="text-white/30">•</span>

                <span className="text-cyan-300">
                  UPI / Card / Bank EMI
                </span>

                <span className="mx-2 text-white/20">|</span>

                {/* DATE */}
                <span className="text-white">
                  📅{' '}
                  {currentDateTime.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>

                <span className="text-white/30">•</span>

                {/* LIVE TIME */}
                <span className="font-bold text-[#ff9d17]">
                  🕒{' '}
                  {currentDateTime.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </span>

                <span className="mx-2 text-white/20">|</span>

                <span className="text-white">
                  Premium Quality
                </span>

                <span className="text-white/30">•</span>

                <span className="text-[#ff9d17]">
                  Latest Designs
                </span>

                <span className="text-white/30">•</span>

                <span className="text-emerald-300">
                  Trusted Brands
                </span>

                <span className="text-white/30">•</span>

                <span className="text-cyan-300">
                  Flexible Payment Options
                </span>

                <span className="text-white/30">•</span>

                <span className="text-white/50">
                  *Subject to eligibility &amp; applicable terms
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <header className="sticky top-9 z-50 w-full bg-[#071522] text-white shadow-2xl">

        {/* =====================================================
            TOP HEADER
        ====================================================== */}
        <div className="w-full border-b border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">

            <div className="flex min-h-[76px] items-center gap-3">

              {/* MOBILE MENU */}
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen((prev) => !prev)
                }
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-lg text-white transition-all duration-300
                  hover:scale-105 hover:bg-white/10 hover:text-[#ff9d17]
                  lg:hidden
                "
                aria-label={
                  mobileMenuOpen
                    ? 'Close menu'
                    : 'Open menu'
                }
              >
                {mobileMenuOpen ? (
                  <X size={23} />
                ) : (
                  <Menu size={23} />
                )}
              </button>

              {/* LOGO */}
              <button
                type="button"
                onClick={() => goTo('/')}
                className="
                  group flex shrink-0 items-center gap-2.5
                  transition-all duration-300 hover:scale-[1.02]
                "
              >
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    overflow-hidden rounded-lg bg-[#02080d]
                    shadow-lg ring-1 ring-white/10
                    transition-all duration-300
                    group-hover:ring-[#ff9d17]/60
                    group-hover:shadow-[0_0_20px_rgba(255,157,23,0.18)]
                  "
                >
                  <img
                    src="/logo.jpeg"
                    alt="Vaishnavi Marble"
                    className="
                      h-full w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                <div className="hidden text-left sm:block">
                  <div
                    className="
                      whitespace-nowrap text-[18px]
                      font-extrabold leading-none tracking-wide text-white
                    "
                  >
                    VAISHNAVI{' '}
                    <span className="text-[#ff9d17]">
                      MARBLE
                    </span>
                  </div>

                  <div
                    className="
                      mt-1 text-[9px] font-medium uppercase
                      tracking-[0.28em] text-white/50
                    "
                  >
                    Tiles • Marble • Interiors
                  </div>
                </div>
              </button>

              {/* MAIN NAVIGATION */}
              <nav
                className="
                  ml-3 hidden flex-1 items-center justify-center
                  gap-0.5 lg:flex xl:ml-5
                "
              >
                {/* HOME */}
                <button
                  type="button"
                  onClick={() => goTo('/')}
                  className="
                    group flex items-center gap-1.5 rounded-md
                    px-2.5 py-2.5 text-[13px] font-semibold
                    text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  <Home
                    size={17}
                    className="
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />
                  <span>Home</span>
                </button>

                {/* ALL PRODUCTS */}
                <button
                  type="button"
                  onClick={() => goTo('/products')}
                  className="
                    group flex items-center gap-1.5 rounded-md
                    bg-black px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-[#ff9d17]
                    hover:text-black xl:px-3
                  "
                >
                  <span>All Products</span>
                </button>

                {/* MARBLE STATUES */}
                <button
                  type="button"
                  onClick={() =>
                    goTo('/category/marble-statues')
                  }
                  className="
                    rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  Marble Statues
                </button>

                {/* TILES */}
                <button
                  type="button"
                  onClick={() => goTo('/category/tiles')}
                  className="
                    rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  Tiles
                </button>

                {/* SANITARYWARE */}
                <button
                  type="button"
                  onClick={() =>
                    goTo('/category/sanitaryware')
                  }
                  className="
                    rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  Sanitaryware
                </button>

                {/* KITCHEN SINK */}
                <button
                  type="button"
                  onClick={() =>
                    goTo('/category/kitchen-sink')
                  }
                  className="
                    hidden rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:block xl:px-3
                  "
                >
                  Kitchen Sink
                </button>

                {/* BATHROOM VANITY */}
                <button
                  type="button"
                  onClick={() =>
                    goTo('/category/bathroom-vanity')
                  }
                  className="
                    hidden rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:block xl:px-3
                  "
                >
                  Bathroom Vanity
                </button>

                {/* BLOG */}
                <button
                  type="button"
                  onClick={() => goTo('/blog')}
                  className="
                    rounded-md px-2.5 py-2.5 text-[13px]
                    font-semibold text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  Blog
                </button>

                {/* CALCULATOR */}
                <button
                  type="button"
                  onClick={() => goTo('/calculator')}
                  className="
                    group flex items-center gap-1.5 rounded-md
                    px-2.5 py-2.5 text-[13px] font-semibold
                    text-white transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-black
                    hover:text-[#ff9d17] xl:px-3
                  "
                >
                  <Calculator
                    size={16}
                    className="
                      transition-transform duration-300
                      group-hover:rotate-12
                    "
                  />
                  Calculator
                </button>
              </nav>

              {/* RIGHT SIDE */}
              <div
                className="
                  ml-auto flex shrink-0 items-center
                  gap-1 sm:gap-2
                "
              >
                {/* SEARCH */}
                <form
                  onSubmit={handleSearch}
                  className="hidden md:block"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      placeholder="Search products..."
                      aria-label="Search products"
                      className="
                        h-10 w-[170px] rounded-sm border
                        border-[#20364e] bg-[#14263a] pl-10 pr-3
                        text-sm text-white outline-none
                        placeholder:text-slate-400 transition-all
                        duration-300 focus:w-[210px]
                        focus:border-[#ff9d17]
                        focus:ring-1 focus:ring-[#ff9d17]
                        lg:w-[220px]
                      "
                    />

                    <Search
                      size={17}
                      className="
                        absolute left-3 top-1/2
                        -translate-y-1/2 text-slate-400
                      "
                    />
                  </div>
                </form>

                {/* WHATSAPP */}
                <a
                  href={whatsappEnquiry(
                    'I have a general enquiry about your products.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-lg text-[#ff9d17] transition-all duration-300
                    hover:scale-110 hover:bg-black hover:text-[#25D366]
                  "
                >
                  <MessageCircle size={22} />
                </a>

                {/* CONTACT NUMBER */}
                <a
                  href="tel:+919330300408"
                  className="
                    hidden items-center gap-1.5 whitespace-nowrap
                    rounded-lg px-2 py-2 text-[12px] font-semibold
                    text-white transition-all duration-300
                    hover:bg-black hover:text-[#ff9d17] lg:flex
                  "
                >
                  <Phone
                    size={16}
                    className="text-[#ff9d17]"
                  />
                  <span>93303 00408</span>
                </a>

                {/* CART */}
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  aria-label="Open cart"
                  className="
                    group relative flex h-10 w-10 items-center
                    justify-center rounded-lg text-white
                    transition-all duration-300
                    hover:scale-110 hover:bg-black
                    hover:text-[#ff9d17]
                  "
                >
                  <ShoppingCart
                    size={23}
                    className="
                      transition-transform duration-300
                      group-hover:-rotate-6
                    "
                  />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute -right-1 -top-1 flex h-5 min-w-5
                        animate-pulse items-center justify-center
                        rounded-full bg-[#ff9d17] px-1 text-[10px]
                        font-bold text-black shadow-lg
                      "
                    >
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
          <div
            className="
              border-t border-white/10 bg-[#071522]
              lg:hidden
            "
          >
            {/* MOBILE SEARCH */}
            <form
              onSubmit={handleSearch}
              className="border-b border-white/10 p-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search products..."
                  className="
                    h-11 w-full rounded-lg border
                    border-[#20364e] bg-[#14263a]
                    pl-10 pr-12 text-sm text-white
                    outline-none placeholder:text-slate-400
                    focus:border-[#ff9d17]
                    focus:ring-1 focus:ring-[#ff9d17]
                  "
                />

                <Search
                  size={17}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2 text-slate-400
                  "
                />

                <button
                  type="submit"
                  className="
                    absolute right-0 top-0 flex h-11 w-11
                    items-center justify-center rounded-r-lg
                    bg-[#ff9d17] text-black transition
                    hover:bg-orange-500
                  "
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* MOBILE LINKS */}
            <div className="py-2">

              {/* HOME */}
              <button
                type="button"
                onClick={() => goTo('/')}
                className="
                  flex w-full items-center gap-3 px-5 py-3.5
                  text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <Home size={19} />
                Home
              </button>

              {/* ALL PRODUCTS */}
              <button
                type="button"
                onClick={() => goTo('/products')}
                className="
                  flex w-full items-center gap-3 bg-black
                  px-5 py-3.5 text-left font-semibold text-white
                  transition hover:bg-[#ff9d17] hover:text-black
                "
              >
                All Products
              </button>

              {/* MARBLE */}
              <button
                type="button"
                onClick={() =>
                  goTo('/category/marble-statues')
                }
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span>Marble Statues</span>
                <span>›</span>
              </button>

              {/* TILES */}
              <button
                type="button"
                onClick={() => goTo('/category/tiles')}
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span>Tiles</span>
                <span>›</span>
              </button>

              {/* SANITARYWARE */}
              <button
                type="button"
                onClick={() =>
                  goTo('/category/sanitaryware')
                }
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span>Sanitaryware</span>
                <span>›</span>
              </button>

              {/* KITCHEN SINK */}
              <button
                type="button"
                onClick={() =>
                  goTo('/category/kitchen-sink')
                }
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span>Kitchen Sink</span>
                <span>›</span>
              </button>

              {/* BATHROOM VANITY */}
              <button
                type="button"
                onClick={() =>
                  goTo('/category/bathroom-vanity')
                }
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span>Bathroom Vanity</span>
                <span>›</span>
              </button>

              {/* BLOG */}
              <button
                type="button"
                onClick={() => goTo('/blog')}
                className="
                  flex w-full items-center gap-3 px-5 py-3.5
                  text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                Blog
              </button>

              {/* CALCULATOR */}
              <button
                type="button"
                onClick={() => goTo('/calculator')}
                className="
                  flex w-full items-center gap-3 px-5 py-3.5
                  text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <Calculator size={19} />
                Calculator
              </button>

              {/* PHONE */}
              <a
                href="tel:+919330300408"
                className="
                  flex items-center gap-3 px-5 py-3.5
                  font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <Phone
                  size={19}
                  className="text-[#ff9d17]"
                />
                +91 93303 00408
              </a>

              {/* WHATSAPP */}
              <a
                href={whatsappEnquiry(
                  'I have a general enquiry about your products.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-3 px-5 py-3.5
                  font-semibold text-green-400 transition
                  hover:bg-black
                "
              >
                <MessageCircle size={19} />
                WhatsApp Enquiry
              </a>

              {/* CART */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="
                  flex w-full items-center justify-between
                  px-5 py-3.5 text-left font-semibold transition
                  hover:bg-black hover:text-[#ff9d17]
                "
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={19} />
                  Cart
                </span>

                {totalItems > 0 && (
                  <span
                    className="
                      rounded-full bg-[#ff9d17] px-2 py-0.5
                      text-xs font-bold text-black
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          SECOND CATEGORY NAVBAR — PREMIUM IMAGE MEGA MENU
      ====================================================== */}
      <div
        className="relative z-40 w-full border-t border-white/10 bg-[#17263b] text-white"
        onMouseLeave={() => setActiveCategoryMenu(null)}
      >
        <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-7">

          {/* DESKTOP SUB HEADER */}
          <div className="hidden h-[62px] items-center justify-center gap-1 lg:flex">
            {categoryMenus.map((menu) => {
              const Icon = menu.icon;
              const hasColumns = 'columns' in menu;

              return (
                <div
                  key={menu.name}
                  className="relative h-full"
                  onMouseEnter={() => setActiveCategoryMenu(menu.name)}
                >
                  <button
                    type="button"
                    onClick={() => handleCategoryParentClick(menu.name)}
                    className={`group flex h-full items-center gap-1.5 px-3 text-xs font-bold transition-all duration-200 xl:px-4 xl:text-sm ${
                      activeCategoryMenu === menu.name
                        ? 'bg-[#ff9d17] text-black'
                        : 'text-white hover:bg-black hover:text-[#ff9d17]'
                    }`}
                  >
                    <Icon size={17} />
                    <span>{menu.name}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeCategoryMenu === menu.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* MARBLE / SANITARYWARE / KITCHEN / BATHROOM / OTHER */}
                  {!hasColumns && (
                    <div
                      className={`absolute left-0 top-[62px] w-[760px] rounded-b-2xl border border-stone-200 bg-white p-5 text-stone-900 shadow-2xl transition-all duration-200 ${
                        activeCategoryMenu === menu.name
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
                        <div>
                          <h3 className="text-lg font-extrabold">
                            {menu.name}
                          </h3>
                          <p className="text-xs text-stone-500">
                            Explore our {menu.name.toLowerCase()} collection
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCategoryParentClick(menu.name)}
                          className="rounded-lg bg-stone-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-[#ff9d17] hover:text-black"
                        >
                          View All
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        {menu.items?.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleCategoryClick(item)}
                            className="group overflow-hidden rounded-xl border border-stone-200 bg-stone-50 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9d17] hover:bg-white hover:shadow-lg"
                          >
                            <div className="relative h-24 overflow-hidden bg-stone-100">
                              <img
                                src={categoryImage(item)}
                                alt={item}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(event) => {
                                  event.currentTarget.style.display = 'none';
                                  const fallback = event.currentTarget.parentElement?.querySelector(
                                    '[data-image-fallback]'
                                  ) as HTMLElement | null;
                                  if (fallback) fallback.classList.remove('hidden');
                                }}
                              />
                              <div
                                data-image-fallback
                                className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400"
                              >
                                <ImageIcon size={28} />
                              </div>
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
                                <span className="text-[10px] font-semibold text-white">
                                  Explore
                                </span>
                              </div>
                            </div>

                            <div className="flex min-h-10 items-center justify-between gap-1 px-2.5 py-2">
                              <span className="text-xs font-bold text-stone-700 group-hover:text-black">
                                {item}
                              </span>
                              <ChevronRight
                                size={14}
                                className="shrink-0 text-stone-400 group-hover:text-[#ff9d17]"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TILES 4-COLUMN MEGA MENU */}
                  {hasColumns && (
                    <div
                      className={`absolute left-1/2 top-[62px] w-[1180px] max-w-[96vw] -translate-x-1/2 rounded-b-2xl border border-stone-200 bg-white p-5 text-stone-900 shadow-2xl transition-all duration-200 ${
                        activeCategoryMenu === menu.name
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
                        <div>
                          <h3 className="text-lg font-extrabold">
                            Tiles Collection
                          </h3>
                          <p className="text-xs text-stone-500">
                            Shop tiles by application, finish, design and type
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCategoryParentClick('Tiles')}
                          className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#ff9d17] hover:text-black"
                        >
                          View All Tiles
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-5">
                        {menu.columns?.map((column) => (
                          <div key={column.title} className="min-w-0">
                            <div className="mb-3 flex items-center gap-2 border-b border-stone-200 pb-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                                <Grid3X3 size={14} />
                              </div>
                              <h4 className="text-sm font-extrabold">
                                {column.title}
                              </h4>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {column.items.map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => handleCategoryClick(item)}
                                  className="group overflow-hidden rounded-lg border border-stone-200 bg-stone-50 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff9d17] hover:bg-white hover:shadow-md"
                                >
                                  <div className="relative h-16 overflow-hidden bg-stone-100">
                                    <img
                                      src={categoryImage(item)}
                                      alt={item}
                                      loading="lazy"
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                        const fallback = event.currentTarget.parentElement?.querySelector(
                                          '[data-image-fallback]'
                                        ) as HTMLElement | null;
                                        if (fallback) fallback.classList.remove('hidden');
                                      }}
                                    />
                                    <div
                                      data-image-fallback
                                      className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400"
                                    >
                                      <ImageIcon size={21} />
                                    </div>
                                  </div>

                                  <div className="flex min-h-9 items-center gap-1 px-2 py-1.5">
                                    <span className="line-clamp-2 flex-1 text-[10px] font-bold leading-tight text-stone-700 group-hover:text-black">
                                      {item}
                                    </span>
                                    <ChevronRight
                                      size={12}
                                      className="shrink-0 text-stone-400 group-hover:text-[#ff9d17]"
                                    />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE SUB HEADER */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
              {categoryMenus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <button
                    key={menu.name}
                    type="button"
                    onClick={() =>
                      setOpenMobileCategory(
                        openMobileCategory === menu.name ? null : menu.name
                      )
                    }
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                      openMobileCategory === menu.name
                        ? 'bg-[#ff9d17] text-black'
                        : 'bg-white/5 text-white hover:bg-black'
                    }`}
                  >
                    <Icon size={15} />
                    {menu.name}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${
                        openMobileCategory === menu.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {categoryMenus.map((menu) => {
              if (openMobileCategory !== menu.name) return null;

              const Icon = menu.icon;
              const isTiles = 'columns' in menu;

              return (
                <div
                  key={menu.name}
                  className="border-t border-white/10 bg-[#0b1d2d] p-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                      <Icon size={18} className="text-[#ff9d17]" />
                      {menu.name}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCategoryParentClick(menu.name)}
                      className="rounded-lg bg-[#ff9d17] px-3 py-1.5 text-[10px] font-extrabold text-black"
                    >
                      View All
                    </button>
                  </div>

                  {isTiles ? (
                    <div className="space-y-4">
                      {menu.columns?.map((column) => (
                        <div key={column.title}>
                          <h4 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#ff9d17]">
                            {column.title}
                          </h4>

                          <div className="grid grid-cols-2 gap-2">
                            {column.items.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handleCategoryClick(item)}
                                className="flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 text-left"
                              >
                                <img
                                  src={categoryImage(item)}
                                  alt={item}
                                  loading="lazy"
                                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                                  onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                  }}
                                />
                                <span className="text-[11px] font-semibold text-white">
                                  {item}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {menu.items?.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleCategoryClick(item)}
                          className="overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left"
                        >
                          <img
                            src={categoryImage(item)}
                            alt={item}
                            loading="lazy"
                            className="h-20 w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />

                          <div className="flex items-center justify-between gap-1 px-2 py-2">
                            <span className="text-[11px] font-semibold text-white">
                              {item}
                            </span>
                            <ChevronRight
                              size={13}
                              className="shrink-0 text-[#ff9d17]"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>    </>
  );
}
