// src/components/Header.tsx
import { useEffect, useState } from 'react';
import {
  ShoppingCart, Menu, X, Search, Home, MessageCircle, Calculator, Phone,
  ChevronDown, ChevronRight, Grid3X3, Gem, Bath, UtensilsCrossed, Building2,
  Image as ImageIcon, Info, Tag, Video, FileText, Mail, Layers, Square,
  Warehouse, Sparkles,
} from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { navigate } from '@/lib/router';
import { whatsappEnquiry } from '@/lib/whatsapp';

/* ============================================================
   MAIN NAV LINKS
   ============================================================ */
const MAIN_NAV = [
  { label: 'Home',       path: '/',           icon: Home },
  { label: 'About',      path: '/about',      icon: Info },
  { label: 'Products',   path: '/products',   icon: Tag },
  { label: 'Price List', path: '/price-list', icon: FileText },
  { label: 'Videos',     path: '/videos',     icon: Video },
  { label: 'Blog',       path: '/blog',       icon: FileText },
  { label: 'Contact',    path: '/contact',    icon: Mail },
];

/* ============================================================
   MEGA MENU DATA
   ============================================================ */
type MegaColumn = { title: string; items: string[] };
type MegaMenu = {
  name: string;
  icon: typeof Gem;
  route?: string;
  columns: MegaColumn[];
};

const MEGA_MENUS: MegaMenu[] = [
  {
    name: 'Tiles',
    icon: Grid3X3,
    route: '/category/tiles',
    columns: [
      {
        title: 'Tiles By',
        items: [
          'Floor Tiles', 'Wall Tiles', 'Bathroom Tiles', 'Kitchen Tiles',
          'Living Room Tiles', 'Outdoor Tiles', 'Parking Tiles', 'Bedroom Tiles',
          'Elevation Tiles', 'Balcony Tiles', 'Stair Tiles', 'Pooja Room Tiles',
        ],
      },
      {
        title: 'Tiles Finish',
        items: [
          'Anti Skid Tiles', 'Glossy Tiles', 'Polished Tiles', 'Matt Tiles',
          'Carving Tiles', 'Metallic Tiles', 'Rustic Tiles', 'Lappato Tiles',
          'Satin Tiles', 'Hi-Gloss Tiles', 'Wall Panels', 'Fluted Panels',
        ],
      },
      {
        title: 'Tiles Design',
        items: [
          '3D Tiles', 'Wooden Tiles', 'Marble Tiles', 'Texture Tiles',
          'Mosaic Tiles', 'Granite Tiles', 'Stone Tiles', 'Pattern Tiles',
          'Geometric Tiles', 'Cement Tiles', 'Travertine Tiles', 'Terrazzo Tiles',
        ],
      },
      {
        title: 'Tiles Type',
        items: [
          'Vitrified Tiles', 'Ceramic Tiles', 'Porcelain Tiles', 'Designer Tiles',
          'Digital Tiles', 'Glazed Tiles', 'Cool Tiles', 'Printed Tiles',
          'Nano Tiles', 'Imported Tiles', 'Italian Tiles', 'Spanish Tiles',
        ],
      },
    ],
  },
  {
    name: 'Living Room',
    icon: Layers,
    route: '/products?category=Living Room',
    columns: [
      {
        title: 'Living Room Tiles',
        items: [
          'Large Format Tiles', 'Wooden Finish Tiles', 'Marble Look Tiles',
          'Glossy Floor Tiles', 'Matt Floor Tiles', 'Anti Skid Tiles',
        ],
      },
      {
        title: 'Living Room Walls',
        items: [
          '3D Wall Tiles', 'Wall Panels', 'Fluted Panels',
          'Texture Tiles', 'Highlighters', 'Mosaic Tiles',
        ],
      },
    ],
  },
  {
    name: 'Outdoor',
    icon: Square,
    route: '/products?category=Outdoor',
    columns: [
      {
        title: 'Outdoor Tiles',
        items: [
          'Parking Tiles', 'Anti Skid Tiles', 'Rustic Tiles',
          'Cement Tiles', 'Stone Look Tiles', 'Terrace Tiles',
        ],
      },
      {
        title: 'Outdoor Flooring',
        items: [
          'Vitrified Parking Tiles', 'Granite Flooring', 'Natural Stone',
          'Paver Blocks', 'Kerbstones', 'Cobblestones',
        ],
      },
    ],
  },
  {
    name: 'Parking',
    icon: Warehouse,
    route: '/products?category=Parking',
    columns: [
      {
        title: 'Parking Tiles',
        items: [
          'Anti Skid Parking Tiles', 'Heavy Duty Tiles', 'Vitrified Parking Tiles',
          'Full Body Vitrified', 'Rustic Parking Tiles', 'Cement Parking Tiles',
        ],
      },
      {
        title: 'Parking Accessories',
        items: [
          'Car Parking Tiles', 'Paver Blocks', 'Kerbstones',
          'Driveway Tiles', 'Outdoor Steps', 'Threshold Tiles',
        ],
      },
    ],
  },
  {
    name: 'Ceramic',
    icon: Sparkles,
    route: '/products?category=Ceramic',
    columns: [
      {
        title: 'Ceramic Tiles',
        items: [
          'Ceramic Wall Tiles', 'Ceramic Floor Tiles', 'Ceramic Bathroom Tiles',
          'Ceramic Kitchen Tiles', 'Glazed Ceramic Tiles', 'Digital Ceramic Tiles',
        ],
      },
      {
        title: 'Ceramic Sanitaryware',
        items: [
          'Wash Basin', 'Counter Basin', 'Wall Hung Basin',
          'Pedestal Basin', 'Table Top Basin', 'Vanity Basin',
        ],
      },
    ],
  },
  {
    name: 'Vitrified',
    icon: Gem,
    route: '/products?category=Vitrified',
    columns: [
      {
        title: 'Vitrified Tiles',
        items: [
          'Double Charge Vitrified', 'Full Body Vitrified', 'Glazed Vitrified Tiles',
          'Polished Vitrified', 'Matt Vitrified', 'Rustic Vitrified',
        ],
      },
      {
        title: 'Vitrified Slabs',
        items: [
          '800x800 Vitrified', '600x1200 Vitrified', '800x1600 Vitrified',
          '1200x1200 Vitrified', '1200x2400 Vitrified', 'Large Format Slabs',
        ],
      },
    ],
  },
  {
    name: 'Wash Basin',
    icon: Bath,
    route: '/products?category=Wash Basin',
    columns: [
      {
        title: 'Wash Basin',
        items: [
          'Wall Hung Basin', 'Counter Basin', 'Pedestal Basin',
          'Table Top Basin', 'Vanity Basin', 'Corner Basin',
        ],
      },
      {
        title: 'Basin Accessories',
        items: [
          'Basin Faucet', 'Basin Mirror', 'Basin Cabinet',
          'Waste Coupling', 'Bottle Trap', 'Angle Valve',
        ],
      },
    ],
  },
  {
    name: 'Kitchen Sink',
    icon: UtensilsCrossed,
    route: '/category/kitchen-sink',
    columns: [
      {
        title: 'Kitchen Sink',
        items: [
          'Single Bowl Sink', 'Double Bowl Sink', 'Triple Bowl Sink',
          'Quartz Sink', 'Stainless Steel Sink', 'Handmade Sink',
        ],
      },
      {
        title: 'Kitchen Accessories',
        items: [
          'Kitchen Faucet', 'Drain Board', 'Waste Coupling',
          'Soap Dispenser', 'Chopping Board', 'Sink Strainer',
        ],
      },
    ],
  },
  {
    name: 'Glass Blocks',
    icon: ImageIcon,
    route: '/products?category=Glass Blocks',
    columns: [
      {
        title: 'Glass Blocks',
        items: [
          'Clear Glass Blocks', 'Textured Glass Blocks', 'Colored Glass Blocks',
          'Wave Glass Blocks', 'Frosted Glass Blocks', 'Decorative Glass Blocks',
        ],
      },
      {
        title: 'Glass Applications',
        items: [
          'Bathroom Glass Blocks', 'Kitchen Glass Blocks', 'Partition Glass Blocks',
          'Staircase Glass Blocks', 'Facade Glass Blocks', 'Wall Glass Blocks',
        ],
      },
    ],
  },
  {
    name: 'More',
    icon: Building2,
    route: '/products',
    columns: [
      {
        title: 'Marble & Stone',
        items: [
          'Indian Marble', 'Imported Marble', 'White Marble',
          'Granite', 'Marble Statues', 'Marble Mandir',
        ],
      },
      {
        title: 'Bathroom',
        items: [
          'Western Toilet', 'Indian Toilet', 'Bathroom Vanity',
          'Shower', 'Faucet', 'Bathroom Mirror',
        ],
      },
      {
        title: 'Building Material',
        items: [
          'Wall Panels', 'Fluted Panels', 'Adhesives',
          'Grouts', 'Waterproofing', 'Tile Cleaners',
        ],
      },
    ],
  },
];

/* ============================================================
   CATEGORY IMAGE RESOLVER
   Sized Pexels URLs — same format as product images in DB
   (?auto=compress&cs=tinysrgb&w=&h=&fit=crop)
   ============================================================ */

const px = (id: number, w = 600, h = 400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

// Exact-name overrides (checked first) — pulled from your product DB seeds
const EXACT_IMAGES: Record<string, number> = {
  'Indian Marble':          35587787,
  'Imported Marble':        37431602,
  'White Marble':           35587787,
  'Black Marble':           18362066,
  'Beige Marble':           37431602,
  'Green Marble':           18382817,
  'Granite':                18362066,
  'Marble Statues':         35587787,
  'Marble Mandir':          37431602,
  'Marble Fireplace':       18362066,
  'Radha Krishna Statue':   35587787,
  'Sita Rama Statue':       18382817,
  'Goddess Lakshmi Statue': 15164157,
  'Maa Kali Statue':        35446433,
  'Sai Baba Statue':        35558431,
};

// Keyword → Pexels photo ID (first match wins)
const KEYWORD_IMAGES: Array<{ match: RegExp; id: number }> = [
  // Statue / deity first (very specific)
  { match: /krishna|radha|ram|sita|lakshmi|kali|sai|deity|murti|statue/i, id: 35587787 },
  // Pooja / temple
  { match: /pooja|temple|mandir/i,                                          id: 37431602 },
  // Bathroom / sanitaryware
  { match: /bathroom|toilet|urinal|cistern|western|indian toilet/i,          id: 1457842  },
  { match: /wash basin|basin|vanity|counter basin|wall hung|pedestal|table top|corner/i, id: 6588597 },
  { match: /sink|kitchen faucet|faucet|drain|strainer/i,                     id: 2724749  },
  { match: /shower|mirror|accessor/i,                                        id: 342800   },
  // Kitchen
  { match: /kitchen/i,                                                       id: 2724749  },
  // Living spaces
  { match: /living room|large format|living/i,                               id: 1571460  },
  { match: /bedroom/i,                                                       id: 1643383  },
  // Floors / walls
  { match: /floor|flooring/i,                                                id: 276724   },
  { match: /wall tile|wall panel|fluted|highlight/i,                         id: 1918291  },
  // Outdoor / parking
  { match: /outdoor|terrace|balcony|elevation|stair/i,                       id: 2098424  },
  { match: /parking|driveway|paver|cobble|kerb|heavy duty/i,                 id: 267151   },
  // Materials / finishes
  { match: /marble|granite|stone|travertine|terrazzo|rustic/i,               id: 37431602 },
  { match: /wooden|wood/i,                                                   id: 276724   },
  { match: /glass/i,                                                         id: 342800   },
  { match: /3d|mosaic|geometric|pattern|texture|cement/i,                    id: 1918291  },
  { match: /glossy|polished|matt|matte|satin|metallic|hi-gloss|lappato|carving/i, id: 276724 },
  // Types
  { match: /vitrified|ceramic|porcelain|designer|digital|glazed|nano|printed|cool/i, id: 276724 },
  { match: /imported|italian|spanish/i,                                      id: 37431602 },
  // Building material
  { match: /adhesive|grout|waterproof|cleaner|sika/i,                        id: 2098424  },
];

const FALLBACK_IMAGE = px(1571460);

const categoryImage = (name: string): string => {
  if (EXACT_IMAGES[name]) return px(EXACT_IMAGES[name]);
  for (const { match, id } of KEYWORD_IMAGES) {
    if (match.test(name)) return px(id);
  }
  return FALLBACK_IMAGE;
};

/* ============================================================
   HEADER COMPONENT
   ============================================================ */
export function Header() {
  const { totalItems, setIsOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [openMobileMega, setOpenMobileMega] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  /* Live clock */
  useEffect(() => {
    const t = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    const locked = mobileMenuOpen || !!lightbox;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, lightbox]);

  /* Esc closes lightbox */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goTo = (path: string) => {
    setMobileMenuOpen(false);
    setActiveMega(null);
    setOpenMobileMega(null);
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return goTo('/products');
    setMobileMenuOpen(false);
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleMegaItemClick = (label: string) => {
    setActiveMega(null);
    setOpenMobileMega(null);
    setMobileMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(label)}`);
  };

  return (
    <>
      {/* ======================== LIVE MARQUEE ======================== */}
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
                <span className="text-emerald-300">Somany</span>
                <span className="text-white/30">•</span>
                <span className="text-yellow-300">Hindware</span>
                <span className="text-white/30">•</span>
                <span className="text-rose-300">Parryware</span>
                <span className="mx-2 text-white/20">|</span>
                <span className="font-extrabold text-[#ff9d17]">Bajaj Finserv</span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-green-400">0 Down Payment*</span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-amber-300">Easy EMI Available</span>
                <span className="mx-2 text-white/20">|</span>
                <span className="text-white">
                  📅 {currentDateTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-white/30">•</span>
                <span className="font-bold text-[#ff9d17]">
                  🕒 {currentDateTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== MAIN HEADER ======================== */}
      <header className="sticky top-9 z-[65] w-full bg-[#071522] text-white shadow-2xl">
        <div className="w-full border-b border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">
            <div className="flex min-h-[76px] items-center gap-3">

              {/* MOBILE MENU */}
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
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#02080d] shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-[#ff9d17]/60">
                  <img src="/logo.jpeg" alt="Vaishnavi Marble" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                {MAIN_NAV.map((item) => {
                  const Icon = item.icon;
                  const isProducts = item.label === 'Products';
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => goTo(item.path)}
                      className={`group flex items-center gap-1.5 rounded-md px-2.5 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 xl:px-3 ${
                        isProducts
                          ? 'bg-black text-white hover:bg-[#ff9d17] hover:text-black'
                          : 'text-white hover:bg-black hover:text-[#ff9d17]'
                      }`}
                    >
                      <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
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
                <form onSubmit={handleSearch} className="hidden md:block">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="h-10 w-[170px] rounded-sm border border-[#20364e] bg-[#14263a] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-400 transition-all duration-300 focus:w-[210px] focus:border-[#ff9d17] focus:ring-1 focus:ring-[#ff9d17] lg:w-[220px]"
                    />
                    <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </form>

                <a
                  href={whatsappEnquiry('I have a general enquiry about your products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#ff9d17] transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#25D366]"
                >
                  <MessageCircle size={22} />
                </a>

                <a
                  href="tel:+919330300408"
                  className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-black hover:text-[#ff9d17] lg:flex"
                >
                  <Phone size={16} className="text-[#ff9d17]" />
                  <span>93303 00408</span>
                </a>

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
      </header>

      {/* ======================== SECOND HEADER — MEGA MENU (DESKTOP) ======================== */}
      <div
        className="relative z-[60] hidden w-full border-b border-white/10 bg-[#17263b] text-white lg:block"
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-7">
          <div className="flex h-[58px] items-center justify-center gap-0.5">
            {MEGA_MENUS.map((menu) => {
              const Icon = menu.icon;
              const isActive = activeMega === menu.name;
              const colCount = menu.columns.length;
              const gridCols = colCount === 4 ? 'grid-cols-4' : colCount === 3 ? 'grid-cols-3' : 'grid-cols-2';
              const dropWidth = colCount === 4 ? 'w-[1180px]' : colCount === 3 ? 'w-[920px]' : 'w-[720px]';

              return (
                <div
                  key={menu.name}
                  className="relative h-full"
                  onMouseEnter={() => setActiveMega(menu.name)}
                >
                  <button
                    type="button"
                    onClick={() => menu.route && goTo(menu.route)}
                    className={`group flex h-full items-center gap-1.5 px-3 text-xs font-bold transition-all duration-200 xl:px-4 xl:text-[13px] ${
                      isActive
                        ? 'bg-[#ff9d17] text-black'
                        : 'text-white hover:bg-black hover:text-[#ff9d17]'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{menu.name}</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                  </button>

                  {/* MEGA DROPDOWN */}
                  <div
                    className={`absolute left-1/2 top-full z-[60] ${dropWidth} max-w-[96vw] -translate-x-1/2 rounded-b-2xl border border-stone-200 bg-white p-5 text-stone-900 shadow-2xl transition-all duration-200 ${
                      isActive
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-2 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff9d17]/15 text-[#ff9d17]">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold">{menu.name}</h3>
                          <p className="text-xs text-stone-500">
                            Explore our {menu.name.toLowerCase()} collection
                          </p>
                        </div>
                      </div>
                      {menu.route && (
                        <button
                          type="button"
                          onClick={() => goTo(menu.route!)}
                          className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#ff9d17] hover:text-black"
                        >
                          View All →
                        </button>
                      )}
                    </div>

                    <div className={`grid gap-5 ${gridCols}`}>
                      {menu.columns.map((col) => (
                        <div key={col.title} className="min-w-0">
                          <div className="mb-3 flex items-center gap-2 border-b border-stone-200 pb-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-100">
                              <Grid3X3 size={12} />
                            </div>
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
                              {col.title}
                            </h4>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {col.items.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handleMegaItemClick(item)}
                                className="group overflow-hidden rounded-lg border border-stone-200 bg-stone-50 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff9d17] hover:bg-white hover:shadow-md"
                              >
                                <div
                                  className="relative h-16 cursor-zoom-in overflow-hidden bg-stone-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLightbox({ src: categoryImage(item), label: item });
                                  }}
                                  title="Click to view larger image"
                                >
                                  <img
                                    src={categoryImage(item)}
                                    alt={item}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fb = e.currentTarget.parentElement?.querySelector('[data-fb]') as HTMLElement | null;
                                      if (fb) fb.classList.remove('hidden');
                                    }}
                                  />
                                  <div
                                    data-fb
                                    className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400"
                                  >
                                    <ImageIcon size={20} />
                                  </div>
                                </div>
                                <div className="flex min-h-9 items-center gap-1 px-2 py-1.5">
                                  <span className="line-clamp-2 flex-1 text-[10.5px] font-bold leading-tight text-stone-700 group-hover:text-black">
                                    {item}
                                  </span>
                                  <ChevronRight size={12} className="shrink-0 text-stone-400 group-hover:text-[#ff9d17]" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================== MOBILE MENU DRAWER ======================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-md overflow-y-auto bg-[#071522] text-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#071522] px-4 py-3">
              <span className="text-sm font-extrabold tracking-wider text-[#ff9d17]">MENU</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search */}
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
                <button type="submit" className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-r-lg bg-[#ff9d17] text-black transition hover:bg-orange-500">
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Quick links */}
            <div className="py-2">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goTo(item.path)}
                    className="flex w-full items-center gap-3 px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mega accordion */}
            <div className="border-t border-white/10">
              <div className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-widest text-[#ff9d17]">
                Shop by Category
              </div>

              {MEGA_MENUS.map((menu) => {
                const Icon = menu.icon;
                const open = openMobileMega === menu.name;
                return (
                  <div key={menu.name} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenMobileMega(open ? null : menu.name)}
                      className={`flex w-full items-center justify-between px-5 py-3.5 text-left font-semibold transition ${
                        open ? 'bg-black text-[#ff9d17]' : 'hover:bg-black hover:text-[#ff9d17]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={18} />
                        {menu.name}
                      </span>
                      <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>

                    {open && (
                      <div className="bg-[#0b1d2d] px-4 py-3">
                        {menu.route && (
                          <button
                            type="button"
                            onClick={() => goTo(menu.route!)}
                            className="mb-3 w-full rounded-lg bg-[#ff9d17] px-3 py-2 text-xs font-extrabold text-black"
                          >
                            View All {menu.name} →
                          </button>
                        )}
                        <div className="space-y-4">
                          {menu.columns.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#ff9d17]">
                                {col.title}
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {col.items.map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => handleMegaItemClick(item)}
                                    className="flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 text-left"
                                  >
                                    <img
                                      src={categoryImage(item)}
                                      alt={item}
                                      loading="lazy"
                                      className="h-10 w-10 shrink-0 rounded-md object-cover"
                                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                    <span className="text-[10.5px] font-semibold leading-tight text-white">
                                      {item}
                                    </span>
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

            {/* Footer actions */}
            <div className="border-t border-white/10 py-2">
              <button
                type="button"
                onClick={() => goTo('/calculator')}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left font-semibold transition hover:bg-black hover:text-[#ff9d17]"
              >
                <Calculator size={18} />
                Tile Calculator
              </button>
              <a href="tel:+919330300408" className="flex items-center gap-3 px-5 py-3.5 font-semibold transition hover:bg-black hover:text-[#ff9d17]">
                <Phone size={18} className="text-[#ff9d17]" />
                +91 93303 00408
              </a>
              <a
                href={whatsappEnquiry('I have a general enquiry about your products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 font-semibold text-green-400 transition hover:bg-black"
              >
                <MessageCircle size={18} />
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
        </div>
      )}

      {/* ======================== LIGHTBOX POPUP ======================== */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff9d17] hover:text-black"
            aria-label="Close image"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="max-h-[75vh] w-full bg-stone-100 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f5f5f4"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="%2378716c" text-anchor="middle" dy=".3em">Image not available</text></svg>';
              }}
            />
            <div className="flex items-center justify-between gap-3 bg-[#071522] px-5 py-3 text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#ff9d17]">Category Preview</p>
                <p className="text-sm font-bold">{lightbox.label}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const label = lightbox.label;
                  setLightbox(null);
                  handleMegaItemClick(label);
                }}
                className="rounded-lg bg-[#ff9d17] px-4 py-2 text-xs font-extrabold text-black transition hover:bg-white"
              >
                Shop Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
