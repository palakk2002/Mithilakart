import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  User,
  Home as HomeIcon,
  LayoutGrid,
} from 'lucide-react';

import MainSidebar from '../components/common/MainSidebar';
import HeaderTop from '../components/common/HeaderTop';
import HeaderTabs from '../components/common/HeaderTabs';
import SearchBar from '../components/common/SearchBar';
import CategoryNavbar from '../components/common/CategoryNavbar';
import useAccountStore from '../store/useAccountStore';
import useVendorStore from '../store/useVendorStore';

const VendorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { savedAddresses, selectedAddressId, isDarkMode } = useAccountStore();
  const { selectedCategory, setSelectedCategory } = useVendorStore();
  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

  /* ── Cart count listener ── */
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
        const total = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
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
    location.pathname.includes('wishlist');

  const hideHeader = isImmersivePage;
  const hideFooter  = isImmersivePage && !location.pathname.includes('all-offers');

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-slate-900">
      {/* Drawer Sidebar */}
      <MainSidebar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* ── Sticky Header ── */}
      {!hideHeader && (
        <motion.header
          animate={{
            boxShadow: scrolled
              ? '0 2px 12px rgba(0,0,0,0.10)'
              : '0 1px 0px rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.22 }}
          className="sticky top-0 z-50 bg-primary-green pb-0"
        >
          {/* Row 0: Top Header Tabs (Mithilakart, 8 Mins, Travel, Grocery) */}
          <HeaderTabs />

          {/* Row 3 : Search + QR */}
          {!location.pathname.includes('quick-shop') && (
            <SearchBar selectedAddress={selectedAddress} />
          )}

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
          <div className="container mx-auto flex h-full">
            <main className="flex-1 min-w-0 pb-16">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      {/* Mobile-First Bottom Navbar (Fixed) */}
      {!hideFooter && (
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-50 transition-colors duration-300 ${isDarkMode ? 'bg-black border-[var(--color-gold)]/20 text-[var(--color-gold)] shadow-[0_-2px_20px_rgba(212,175,55,0.1)]' : 'bg-white border-gray-200 text-slate-900 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'}`}>
        <Link to="/home" className={`flex flex-col items-center transition-transform active:scale-90`}>
          <HomeIcon size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/home' ? 'font-black' : 'font-medium'}`}>Home</span>
          {location.pathname === '/home' && <div className="w-1 h-1 bg-current rounded-full mt-0.5 animate-pulse" />}
        </Link>
        <Link 
          to="/categories"
          className={`flex flex-col items-center transition-transform active:scale-90 ${location.pathname === '/categories' ? 'text-primary-dark' : ''}`}
        >
          <LayoutGrid size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/categories' ? 'font-black' : 'font-medium'}`}>Categories</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center transition-transform active:scale-90`}>
          <div className="relative">
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className={`absolute -top-1 -right-1.5 text-[8px] font-black px-1 rounded-full border shadow-sm ${isDarkMode ? 'bg-[var(--color-gold)] text-black border-black' : 'bg-[#cc0c39] text-white border-white'}`}>{cartCount}</span>
          </div>
          <span className={`text-[10px] ${location.pathname === '/cart' ? 'font-black' : 'font-medium'}`}>Cart</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center transition-transform active:scale-90`}>
          <User size={22} strokeWidth={1.5} />
          <span className={`text-[10px] ${location.pathname === '/profile' ? 'font-black' : 'font-medium'}`}>You</span>
        </Link>
      </nav>
      )}
    </div>
  );
};

export default VendorLayout;
