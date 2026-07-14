import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  User,
  Home as HomeIcon,
  LayoutGrid,
  ChevronRight,
} from 'lucide-react';

import MainSidebar from '../components/common/MainSidebar';
import HeaderTop from '../components/common/HeaderTop';
import HeaderTabs from '../components/common/HeaderTabs';
import SearchBar from '../components/common/SearchBar';
import CategoryNavbar from '../components/common/CategoryNavbar';
import LanguageSelector from '../components/common/LanguageSelector';
import useAccountStore from '../../../store/useAccountStore';
import useVendorStore from '../../../store/useVendorStore';
import { useTranslation } from 'react-i18next';
import { parsePrice, formatPrice } from '../../../shared/utils/priceFormatter';
import Footer from '../../../shared/components/Footer';

const getMithilakartHeaderBg = (category) => {
  switch (category) {
    case 'Beauty':
      return 'bg-[#F9A8D4]'; // Soft Rose Pink
    case 'Gifting':
      return 'bg-[#D8B4FE]'; // Soft Purple
    case 'Electronics':
      return 'bg-[#93C5FD]'; // Soft Blue
    case 'Jewellery':
      return 'bg-[#FDBA74]'; // Soft Orange/Peach
    case 'Toys':
      return 'bg-[#99F6E4]'; // Soft Teal
    case 'Stationery':
      return 'bg-[#C7D2FE]'; // Soft Indigo
    case 'Fashion':
      return 'bg-[#FCA5A5]'; // Soft Red
    case 'Electrical':
      return 'bg-[#FEF08A]'; // Soft Yellow
    case 'You Buy':
    default:
      return 'bg-primary-green'; // Default Green (Mithilakart default brand color)
  }
};

const VendorLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const { savedAddresses, selectedAddressId, isDarkMode } = useAccountStore();
  const { selectedCategory, setSelectedCategory } = useVendorStore();
  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

  /* ── Cart listener ── */
  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
        setCartItems(cart);
        const total = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        setCartCount(total);
      } catch {
        setCartItems([]);
        setCartCount(0);
      }
    };
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  /* ── Scroll shadow listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isImmersivePage =
    location.pathname.includes('categories') ||
    location.pathname.includes('category-products') ||
    location.pathname.includes('product-detail') ||
    location.pathname.includes('continue-shopping') ||
    location.pathname.includes('all-offers') ||
    location.pathname.includes('cart') ||
    location.pathname.includes('/profile') ||
    location.pathname.includes('/deals') ||
    location.pathname.includes('/search') ||
    location.pathname.includes('/category') ||
    location.pathname.includes('wishlist');

  const hideHeader = isImmersivePage;
  const hideFooter  = isImmersivePage && !location.pathname.includes('all-offers') && !location.pathname.includes('categories');

  const isCartOrCheckoutPage = location.pathname.includes('/cart') || location.pathname.includes('/checkout');
  const cartTotalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const cartTotalPrice = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * parsePrice(item.qty || 1);
  }, 0);
  const isDarkHeader = (
    localStorage.getItem('isMithilakFlow') === 'true' || 
    location.pathname.includes('/mithilak') || 
    (location.pathname.includes('/quick-shop') && !location.pathname.includes('/fresh-grocery')) ||
    (!location.pathname.includes('/quick-shop') && !location.pathname.includes('/fresh-grocery') && (selectedCategory === 'You Buy' || selectedCategory === 'Home' || !selectedCategory))
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-slate-900">
      {/* Drawer Sidebar */}
      <MainSidebar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Desktop Header */}
      {!hideHeader && (
        <div className={`hidden md:flex items-center justify-between px-8 py-2.5 border-b border-gray-200/80 sticky top-0 z-50 shadow-sm transition-colors duration-300 ${
          (localStorage.getItem('isMithilakFlow') === 'true' || location.pathname.includes('/mithilak'))
            ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white'
            : location.pathname.includes('/fresh-grocery')
              ? 'bg-gradient-to-r from-[#F5B014] to-[#FFF0A0] text-slate-800'
              : location.pathname.includes('/quick-shop')
                ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f] text-white'
                : `${getMithilakartHeaderBg(selectedCategory)} ${
                    selectedCategory === 'You Buy' || selectedCategory === 'Home' || !selectedCategory
                      ? 'text-white'
                      : 'text-slate-800'
                  }`
        }`}>
          <div className="flex items-center gap-8 max-w-[1600px] mx-auto w-full">
            <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl font-black tracking-tight">Mithilakart</span>
            </Link>

            {/* Desktop Header Flow Tabs */}
            <div className="w-[360px] flex-shrink-0 scale-95 origin-left">
              <HeaderTabs />
            </div>

            <nav className="flex items-center gap-3 ml-4">
              <Link to="/home" className={`text-[14px] font-black px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isDarkHeader ? 'hover:bg-white/10 text-white/90 hover:text-white' : 'hover:bg-black/5 text-slate-700 hover:text-[#084224]'
              }`}>{t('nav.home')}</Link>
              <Link to="/categories" className={`text-[14px] font-black px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isDarkHeader ? 'hover:bg-white/10 text-white/90 hover:text-white' : 'hover:bg-black/5 text-slate-700 hover:text-[#084224]'
              }`}>{t('nav.categories')}</Link>
              <Link to="/cart" className={`text-[14px] font-black px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                isDarkHeader ? 'hover:bg-white/10 text-white/90 hover:text-white' : 'hover:bg-black/5 text-slate-700 hover:text-[#084224]'
              }`}>
                <span>{t('nav.cart')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isDarkHeader ? 'bg-white text-slate-900' : 'bg-[#084224] text-white'
                }`}>{cartCount}</span>
              </Link>
              <Link to="/profile" className={`text-[14px] font-black px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isDarkHeader ? 'hover:bg-white/10 text-white/90 hover:text-white' : 'hover:bg-black/5 text-slate-700 hover:text-[#084224]'
              }`}>Profile</Link>
            </nav>

            <div className="ml-auto flex items-center gap-6">
              <LanguageSelector isDarkHeader={isDarkHeader} />
              <div className="text-sm font-semibold flex items-center gap-1 opacity-90">
                <span>📍 {t('nav.deliverTo')}</span>
                <span className="font-bold truncate max-w-[200px]">{selectedAddress?.name || 'Indrapuri Colony, Indore'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      {!hideHeader && (
        <motion.header
          animate={{
            boxShadow: scrolled
              ? '0 2px 12px rgba(0,0,0,0.10)'
              : '0 1px 0px rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.22 }}
          className={`md:hidden sticky top-0 z-50 pb-0 transition-colors duration-300 ${
            (localStorage.getItem('isMithilakFlow') === 'true' || location.pathname.includes('/mithilak'))
              ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]'
              : location.pathname.includes('/fresh-grocery')
                ? 'bg-gradient-to-r from-[#F5B014] to-[#FFF0A0]'
                : location.pathname.includes('/quick-shop')
                  ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f]'
                  : getMithilakartHeaderBg(selectedCategory)
          }`}
        >
          {/* Row 0: Top Header Tabs (Mithilakart, 8 Mins, Travel, Grocery) */}
          <HeaderTabs />

          {/* Row 3 : Search + QR */}
          <SearchBar selectedAddress={selectedAddress} />

          {/* Row 4 : Category strip */}
          {!location.pathname.includes('quick-shop') &&
           !location.pathname.includes('fresh-grocery') &&
           !location.pathname.includes('mithilak') && (
            <CategoryNavbar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </motion.header>
      )}

      {/* SaleBanner is now rendered inside Home.jsx or specifically based on visibility store */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-8 xl:px-12 flex h-full">
            <main className="flex-1 min-w-0 pb-16">
              <Outlet />
            </main>
          </div>
        </div>
        {!location.pathname.includes('/profile') && <Footer />}
      </div>

      {/* Mobile-First Bottom Navbar (Fixed) */}
      {!hideFooter && (
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-50 transition-colors duration-300 ${isDarkMode ? 'bg-black border-[var(--color-gold)]/20 text-[var(--color-gold)] shadow-[0_-2px_20px_rgba(212,175,55,0.1)]' : 'bg-white border-gray-200 text-slate-900 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'}`}>
        <Link 
          to="/home" 
          onClick={() => {
            localStorage.setItem('isQuickShopFlow', 'false');
            localStorage.setItem('isMithilakFlow', 'false');
            localStorage.setItem('isFreshGroceryFlow', 'false');
          }}
          className={`flex flex-col items-center transition-transform active:scale-90`}
        >
          <HomeIcon size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/home' ? 'font-black' : 'font-medium'}`}>{t('nav.home')}</span>
          {location.pathname === '/home' && <div className="w-1 h-1 bg-current rounded-full mt-0.5 animate-pulse" />}
        </Link>
        <Link 
          to="/categories"
          className={`flex flex-col items-center transition-transform active:scale-90 ${
            location.pathname === '/categories' 
              ? (localStorage.getItem('isMithilakFlow') === 'true' 
                  ? 'text-[#7c3aed]' 
                  : (localStorage.getItem('isQuickShopFlow') === 'true' 
                      ? 'text-[#d6186d]' 
                      : 'text-primary-dark')) 
              : ''
          }`}
        >
          <LayoutGrid size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/categories' ? 'font-black' : 'font-medium'}`}>{t('nav.categories')}</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center transition-transform active:scale-90`}>
          <div className="relative">
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className={`absolute -top-1 -right-1.5 text-[8px] font-black px-1 rounded-full border shadow-sm ${isDarkMode ? 'bg-[var(--color-gold)] text-black border-black' : 'bg-[#cc0c39] text-white border-white'}`}>{cartCount}</span>
          </div>
          <span className={`text-[10px] ${location.pathname === '/cart' ? 'font-black' : 'font-medium'}`}>{t('nav.cart')}</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center transition-transform active:scale-90`}>
          <User size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/profile' ? 'font-black' : 'font-medium'}`}>{t('nav.you')}</span>
        </Link>
      </nav>
      )}

      {/* Floating Cart Pill (Shows on all pages when cart has items, except cart/checkout page) */}
      {!isCartOrCheckoutPage && cartTotalItems > 0 && (
        <div 
          onClick={() => navigate('/vendor/cart')}
          className={`fixed bottom-[76px] left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-[380px] md:px-6 md:py-4 md:rounded-2xl z-[1000] rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.15)] text-white cursor-pointer active:scale-[0.98] transition-all duration-300 animate-in slide-in-from-bottom-6 ${
            localStorage.getItem('isFreshGroceryFlow') === 'true'
              ? 'bg-gradient-to-r from-[#7A3E17] to-[#b45309] hover:brightness-110'
              : localStorage.getItem('isMithilakFlow') === 'true'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:brightness-110'
                  : localStorage.getItem('isQuickShopFlow') === 'true'
                    ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f] hover:brightness-110'
                  : 'bg-[#084224] hover:bg-[#06331b]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-[13.5px] font-black leading-none">
                {cartTotalItems} {cartTotalItems === 1 ? t('cart.item') : t('cart.items')}
              </p>
              <p className="text-[11.5px] font-bold text-white/85 mt-0.5">
                {formatPrice(cartTotalPrice)}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors duration-300 ${
            localStorage.getItem('isQuickShopFlow') === 'true'
              ? 'bg-white text-[#d6186d]'
              : 'bg-white/20 text-white'
          }`}>
            <span>{t('nav.viewCart')}</span>
            <ChevronRight size={13} strokeWidth={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorLayout;
