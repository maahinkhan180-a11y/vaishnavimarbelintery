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
} from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { navigate } from '@/lib/router';
import type { Category } from '@/types';
import { supabase } from '@/lib/supabase';
import { whatsappEnquiry } from '@/lib/whatsapp';

export function Header() {
  const { totalItems, setIsOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const quickLinks = [
    'All Tiles',
    'Floor Tiles',
    'Wall Tiles',
    'Bathroom Tiles',
    'Kitchen Tiles',
    'Living Room Tiles',
    'Outdoor Tiles',
    'Parking Tiles',
    'Ceramic Tiles',
    'Vitrified Tiles',
    'Other Tile Areas',
  ];

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
        return;
      }

      setCategories(data ?? []);
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const goTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search/${encodeURIComponent(query)}`);

    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const handleQuickLink = (label: string) => {
    if (label === 'All Tiles') {
      navigate('/products');
    } else {
      navigate(`/search/${encodeURIComponent(label)}`);
    }

    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#071522] text-white shadow-2xl">

      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <div className="w-full border-b border-white/10">

        <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">

          <div className="flex min-h-[76px] items-center gap-3">

            {/* =================================================
                MOBILE MENU
            ================================================= */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-white
                transition-all
                duration-300
                hover:bg-white/10
                hover:text-[#ff9d17]
                hover:scale-105
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


            {/* =================================================
                LOGO
            ================================================= */}
            <button
              type="button"
              onClick={() => goTo('/')}
              className="
                group
                flex
                shrink-0
                items-center
                gap-2.5
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-lg
                  bg-[#02080d]
                  shadow-lg
                  ring-1
                  ring-white/10
                  transition-all
                  duration-300
                  group-hover:ring-[#ff9d17]/60
                  group-hover:shadow-[0_0_20px_rgba(255,157,23,0.18)]
                "
              >
                <img
                  src="/logo.jpeg"
                  alt="Vaishnavi Marble"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              <div className="hidden sm:block text-left">

                <div
                  className="
                    whitespace-nowrap
                    text-[18px]
                    font-extrabold
                    leading-none
                    tracking-wide
                    text-white
                  "
                >
                  VAISHNAVI{' '}
                  <span className="text-[#ff9d17]">
                    MARBLE
                  </span>
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.28em]
                    text-white/50
                  "
                >
                  Tiles • Marble • Interiors
                </div>

              </div>
            </button>


            {/* =================================================
                MAIN NAVIGATION
            ================================================= */}
            <nav
              className="
                ml-3
                hidden
                flex-1
                items-center
                justify-center
                gap-0.5
                lg:flex
                xl:ml-5
              "
            >

              {/* HOME */}
              <button
                type="button"
                onClick={() => goTo('/')}
                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
                "
              >
                <Home
                  size={17}
                  className="
                    transition-transform
                    duration-300
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
                  group
                  flex
                  items-center
                  gap-1.5
                  rounded-md
                  bg-black
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#ff9d17]
                  hover:text-black
                  hover:-translate-y-0.5
                  xl:px-3
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
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
                "
              >
                Marble Statues
              </button>


              {/* TILES */}
              <button
                type="button"
                onClick={() => goTo('/category/tiles')}
                className="
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
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
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
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
                  hidden
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:block
                  xl:px-3
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
                  hidden
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:block
                  xl:px-3
                "
              >
                Bathroom Vanity
              </button>


              {/* BLOG */}
              <button
                type="button"
                onClick={() => goTo('/blog')}
                className="
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
                "
              >
                Blog
              </button>


              {/* CALCULATOR */}
              <button
                type="button"
                onClick={() => goTo('/calculator')}
                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  rounded-md
                  px-2.5
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  hover:-translate-y-0.5
                  xl:px-3
                "
              >
                <Calculator
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                  "
                />
                Calculator
              </button>

            </nav>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}
            <div
              className="
                ml-auto
                flex
                shrink-0
                items-center
                gap-1
                sm:gap-2
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
                      h-10
                      w-[170px]
                      rounded-sm
                      border
                      border-[#20364e]
                      bg-[#14263a]
                      pl-10
                      pr-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-400
                      transition-all
                      duration-300
                      focus:w-[210px]
                      focus:border-[#ff9d17]
                      focus:ring-1
                      focus:ring-[#ff9d17]
                      lg:w-[220px]
                    "
                  />

                  <Search
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      duration-300
                    "
                  />

                </div>
              </form>


              {/* WHATSAPP / MESSAGE */}
              <a
                href={whatsappEnquiry(
                  'I have a general enquiry about your products.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-[#ff9d17]
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-black
                  hover:text-[#25D366]
                "
              >
                <MessageCircle size={22} />
              </a>


              {/* CONTACT NUMBER */}
              <a
                href="tel:+919330300408"
                className="
                  hidden
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  rounded-lg
                  px-2
                  py-2
                  text-[12px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  lg:flex
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
                  group
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-white
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-black
                  hover:text-[#ff9d17]
                "
              >
                <ShoppingCart
                  size={23}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-rotate-6
                  "
                />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-5
                      min-w-5
                      animate-pulse
                      items-center
                      justify-center
                      rounded-full
                      bg-[#ff9d17]
                      px-1
                      text-[10px]
                      font-bold
                      text-black
                      shadow-lg
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
          SECOND CATEGORY NAVBAR
      ====================================================== */}
      <div className="hidden w-full border-t border-white/5 lg:block">

        <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-7">

          <div
            className="
              flex
              h-[64px]
              items-center
              justify-center
              gap-1
              overflow-hidden
              whitespace-nowrap
              bg-[#17263b]
            "
          >

            {quickLinks.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickLink(label)}
                className={`
                  group
                  flex
                  h-full
                  shrink-0
                  items-center
                  px-3
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-[#ff9d17]
                  xl:px-4
                  xl:text-sm
                  ${
                    index === 0
                      ? 'bg-black text-[#ff9d17]'
                      : ''
                  }
                `}
              >
                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                >
                  {label}
                </span>
              </button>
            ))}

            {/* MORE */}
            <button
              type="button"
              className="
                group
                flex
                h-full
                shrink-0
                items-center
                gap-1
                px-3
                text-xs
                font-bold
                text-white
                transition-all
                duration-300
                hover:bg-black
                hover:text-[#ff9d17]
                xl:px-4
                xl:text-sm
              "
            >
              <ChevronDown
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-180
                "
              />

              <span>More</span>
            </button>

          </div>
        </div>
      </div>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {mobileMenuOpen && (
        <div
          className="
            border-t
            border-white/10
            bg-[#071522]
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
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-[#20364e]
                  bg-[#14263a]
                  pl-10
                  pr-12
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-400
                  focus:border-[#ff9d17]
                  focus:ring-1
                  focus:ring-[#ff9d17]
                "
              />

              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <button
                type="submit"
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-r-lg
                  bg-[#ff9d17]
                  text-black
                  transition
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
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                gap-3
                bg-black
                px-5
                py-3.5
                text-left
                font-semibold
                text-white
                transition
                hover:bg-[#ff9d17]
                hover:text-black
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
              "
            >
              Blog
            </button>


            {/* CALCULATOR */}
            <button
              type="button"
              onClick={() => goTo('/calculator')}
              className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
              "
            >
              <Calculator size={19} />
              Calculator
            </button>


            {/* PHONE */}
            <a
              href="tel:+919330300408"
              className="
                flex
                items-center
                gap-3
                px-5
                py-3.5
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
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
                flex
                items-center
                gap-3
                px-5
                py-3.5
                font-semibold
                text-green-400
                transition
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
                flex
                w-full
                items-center
                justify-between
                px-5
                py-3.5
                text-left
                font-semibold
                transition
                hover:bg-black
                hover:text-[#ff9d17]
              "
            >
              <span className="flex items-center gap-3">
                <ShoppingCart size={19} />
                Cart
              </span>

              {totalItems > 0 && (
                <span
                  className="
                    rounded-full
                    bg-[#ff9d17]
                    px-2
                    py-0.5
                    text-xs
                    font-bold
                    text-black
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
  );
}
