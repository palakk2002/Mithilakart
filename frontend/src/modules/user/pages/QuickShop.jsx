import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Search, Mic, Star } from 'lucide-react';
import { formatPrice } from '../../../shared/utils/priceFormatter';
import CategoryCard from '../components/vendor/CategoryCard';
import closedShutter from '../../../assets/closed_shutter.png';

// Import Assets (aligned with categories)
import SamsungS24 from '../../../assets/products/product01.jpg';
import EarbudsDeal from '../../../assets/products/product02.jpg';
import LorealShampoo from '../../../assets/products/product03.jpg';
import PlumShampoo from '../../../assets/products/product04.jpg';
import LipGloss from '../../../assets/products/product05.jpg';
import JewelleryImg from '../../../assets/products/product06.jpg';
import FashionHero from '../../../assets/products/product07.jpg';
import ElectronicsHero from '../../../assets/products/product08.jpg';
import MakeupHero from '../../../assets/products/product09.jpg';
import FashionTabProduct from '../../../assets/products/product10.jpg';
import ForYouProduct from '../../../assets/products/product11.webp';
import BeautyTab from '../../../assets/products/product12.jpg';
import ToysTab from '../../../assets/products/product13.jpg';
import StationeryTab from '../../../assets/products/product14.jpg';
import ClothesImg from '../../../assets/products/product15.webp';

const SPECIAL_DEALS_TABS = [
  {
    id: 'juices',
    name: 'Juices and more',
    img: ForYouProduct,
    products: [
      { id: 'sd1', name: 'Slice Mango Drink', img: ForYouProduct, discount: '16%', rating: '4.2', weight: '600 ml', oldPrice: 38, price: 32, xtraPrice: 30 },
      { id: 'sd2', name: 'Maaza Mango Drink Original Fl...', img: ForYouProduct, discount: '6%', rating: '4.3', weight: '600 ml', oldPrice: 35, price: 33, xtraPrice: 31 },
      { id: 'sd3', name: 'FROOTI Mango Drink', img: ForYouProduct, discount: '39%', rating: '4.3', weight: '2000 ml', oldPrice: 122, price: 75, xtraPrice: 71 }
    ]
  },
  {
    id: 'skincare',
    name: 'Skin care and haircare',
    img: LorealShampoo,
    products: [
      { id: 'sh1', name: 'L\'Oréal Hyaluron Shampoo', img: LorealShampoo, discount: '10%', rating: '4.4', weight: '200 ml', oldPrice: 230, price: 207, xtraPrice: 195 },
      { id: 'sh2', name: 'Nivea Body Lotion Milk', img: LipGloss, discount: '15%', rating: '4.5', weight: '400 ml', oldPrice: 399, price: 339, xtraPrice: 310 }
    ]
  },
  {
    id: 'toys',
    name: 'Toys and games',
    img: ToysTab,
    products: [
      { id: 'ty1', name: 'Premium Teddy Bear Large', img: ToysTab, discount: '25%', rating: '4.6', weight: '1 Unit', oldPrice: 999, price: 749, xtraPrice: 699 }
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery',
    img: BeautyTab,
    products: [
      { id: 'gr1', name: 'Fortune Basmati Rice', img: BeautyTab, discount: '20%', rating: '4.3', weight: '1 kg', oldPrice: 145, price: 115, xtraPrice: 105 }
    ]
  }
];


const CATEGORIES_DATA = [
  {
    title: 'Grocery',
    items: [
      { name: 'Fruits & Vegetables', img: BeautyTab },
      { name: 'Atta, Rice & Dal', img: ForYouProduct },
      { name: 'Oil, Ghee & Masala', img: LorealShampoo },
      { name: 'Dairy, Bread & Eggs', img: FashionTabProduct },
      { name: 'Cereals & Dry Fruits', img: PlumShampoo },
      { name: 'Chicken, Meat & Fish', img: ElectronicsHero },
      { name: 'Instant & Frozen Food', img: EarbudsDeal },
    ]
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { name: 'Chips & Namkeens', img: EarbudsDeal },
      { name: 'Ice Creams', img: LipGloss },
      { name: 'Drinks & Juices', img: ForYouProduct },
      { name: 'Sweets & Chocolates', img: LorealShampoo },
      { name: 'Tea, Coffee & Milk Drinks', img: FashionTabProduct },
      { name: 'Bakery & Biscuits', img: PlumShampoo },
      { name: 'Sauces & Spreads', img: LipGloss },
    ]
  },
  {
    title: 'Beauty & Personal Care',
    items: [
      { name: 'Bath, Body & Grooming', img: LorealShampoo },
      { name: 'Baby Care', img: ToysTab },
      { name: 'Hair Care', img: PlumShampoo },
      { name: 'Healthcare & Pharma', img: MakeupHero },
      { name: 'Wellness & Hygiene', img: BeautyTab },
      { name: 'Beauty & Fragrances', img: LipGloss },
    ]
  },
  {
    title: 'Household, Stationery & Lifestyle',
    items: [
      { name: 'Cleaning Essentials', img: LorealShampoo },
      { name: 'Stationery Supplies', img: StationeryTab },
      { name: 'Toys & Games', img: ToysTab },
      { name: 'Sports & Fitness', img: ClothesImg },
      { name: 'Home & Kitchen', img: FashionTabProduct },
      { name: 'Electricals & Tools', img: ElectronicsHero },
      { name: 'Fashion Accessories', img: FashionHero },
      { name: 'Pet Supplies', img: ToysTab },
    ]
  },
  {
    title: 'Mobiles & Electronics',
    items: [
      { name: 'Mobiles', img: SamsungS24 },
      { name: 'Electronics & Gadgets', img: ElectronicsHero },
      { name: 'Audio & Smart Watches', img: EarbudsDeal },
    ]
  }
];

const QuickShop = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('For You');

  const isClosed = React.useMemo(() => {
    const force = localStorage.getItem('forceShopClosed');
    if (force === 'true') return true;
    if (force === 'false') return false;
    
    const now = new Date();
    const hours = now.getHours();
    return hours >= 0 && hours < 6;
  }, []);

  const [activeSpecialTab, setActiveSpecialTab] = React.useState('juices');
  const [cartItems, setCartItems] = React.useState([]);

  const updateCartState = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
      setCartItems(cart);
    } catch {
      setCartItems([]);
    }
  };

  React.useEffect(() => {
    updateCartState();
    window.addEventListener('cartUpdated', updateCartState);
    return () => window.removeEventListener('cartUpdated', updateCartState);
  }, []);

  const filteredSections = React.useMemo(() => {
    const tab = activeTab.toLowerCase();
    if (tab === 'for you' || tab === 'more') {
      return CATEGORIES_DATA;
    }
    return CATEGORIES_DATA.filter(section => {
      const title = section.title.toLowerCase();
      if (tab === 'fresh') {
        return title.includes('grocery');
      }
      if (tab === 'grocery') {
        return title.includes('grocery') || title.includes('snacks');
      }
      if (tab === 'electronics') {
        return title.includes('electronics') || title.includes('mobile');
      }
      if (tab === 'beauty') {
        return title.includes('beauty') || title.includes('personal care');
      }
      return true;
    });
  }, [activeTab]);

  const isFreshGrocery = window.location.pathname.includes('/fresh-grocery');
  
  const cartTotalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const cartTotalPrice = cartItems.reduce((acc, item) => {
    const priceStr = String(item.price || '0').replace(/,/g, '');
    return acc + (Number(priceStr) || 0) * (item.qty || 1);
  }, 0);

  return (
    <div className={`min-h-screen px-3 py-4 pb-24 transition-colors duration-300 ${
      isFreshGrocery
        ? 'bg-gradient-to-b from-[#FFF0A0]/45 via-[#FFFDF3] to-[#FFF]'
        : 'bg-gradient-to-b from-[#ffe5ec]/60 via-[#fff5f7] to-[#eaf5ee]'
    }`}>
      {isClosed && (
        <div className="relative w-full rounded-[28px] overflow-hidden bg-gradient-to-b from-[#0b0c1e] via-[#151833] to-[#251b45] p-6 text-center mb-6 shadow-2xl border border-white/5 flex flex-col items-center min-h-[480px]">
          {/* Night Sky Background Components */}
          {/* Glowing Radial Moon Backdrop */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
          
          {/* Clouds Layer - Behind Moon */}
          <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden select-none">
            <svg className="absolute -top-5 -left-10 w-64 h-32 text-purple-300/40 animate-cloud-slow" fill="currentColor" viewBox="0 0 100 100">
              <path d="M10 50 C20 40, 40 40, 50 50 C60 40, 80 40, 90 50 C95 55, 95 65, 90 70 C80 80, 20 80, 10 70 C5 65, 5 55, 10 50 Z" />
            </svg>
            <svg className="absolute bottom-5 -right-10 w-72 h-36 text-blue-300/30 animate-cloud-slower" fill="currentColor" viewBox="0 0 100 100">
              <path d="M10 50 C20 40, 40 40, 50 50 C60 40, 80 40, 90 50 C95 55, 95 65, 90 70 C80 80, 20 80, 10 70 C5 65, 5 55, 10 50 Z" />
            </svg>
          </div>

          {/* Twinkling Stars */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Small Stars */}
            <div className="absolute top-8 left-[15%] w-1 h-1 bg-white rounded-full animate-twinkle-s1" />
            <div className="absolute top-24 left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-s2" />
            <div className="absolute top-44 left-[12%] w-1 h-1 bg-white rounded-full animate-twinkle-s3" />
            <div className="absolute top-16 left-[65%] w-1 h-1 bg-white rounded-full animate-twinkle-s4" />
            <div className="absolute top-36 left-[72%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-s5" />
            <div className="absolute bottom-32 left-[22%] w-1 h-1 bg-white rounded-full animate-twinkle-s2" />
            <div className="absolute bottom-40 right-[15%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-s4" />
            <div className="absolute top-[48%] left-[48%] w-1 h-1 bg-white rounded-full animate-twinkle-s3" />
            
            {/* Larger 4-Point Stars */}
            <svg className="absolute top-12 right-[25%] w-3.5 h-3.5 text-amber-100/80 animate-twinkle-s3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
            <svg className="absolute top-40 left-[25%] w-4 h-4 text-amber-200/90 animate-twinkle-s1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
            <svg className="absolute bottom-[40%] left-[45%] w-3 h-3 text-white/70 animate-twinkle-s5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
            <svg className="absolute top-[50%] right-[10%] w-3 h-3 text-amber-100/80 animate-twinkle-s2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
            <svg className="absolute top-[28%] left-[8%] w-3.5 h-3.5 text-amber-150/90 animate-twinkle-s4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
          </div>

          {/* Floating Clouds Layer - Foreground / Midground (Positioned in lower half) */}
          <div className="absolute top-[40%] inset-x-0 h-36 pointer-events-none overflow-hidden select-none z-10 opacity-80">
            <svg className="absolute top-0 -left-12 w-64 h-24 text-purple-900/40 blur-[1px]" fill="currentColor" viewBox="0 0 100 100">
              <path d="M10 60 C20 45, 45 45, 55 60 C65 45, 85 45, 95 60 C100 65, 100 75, 95 85 C85 95, 15 95, 5 85 C0 75, 0 65, 5 60 Z" />
            </svg>
            <svg className="absolute top-4 -right-10 w-72 h-28 text-indigo-900/50 blur-[2px]" fill="currentColor" viewBox="0 0 100 100">
              <path d="M10 60 C20 45, 45 45, 55 60 C65 45, 85 45, 95 60 C100 65, 100 75, 95 85 C85 95, 15 95, 5 85 C0 75, 0 65, 5 60 Z" />
            </svg>
            <svg className="absolute top-12 left-10 w-80 h-28 text-[#1c143c]/85" fill="currentColor" viewBox="0 0 100 100">
              <path d="M10 60 C20 45, 45 45, 55 60 C65 45, 85 45, 95 60 C100 65, 100 75, 95 85 C85 95, 15 95, 5 85 C0 75, 0 65, 5 60 Z" />
            </svg>
          </div>

          {/* Crescent Moon Container */}
          <div className="relative z-20 flex items-center justify-center pt-4 mb-5">
            <div className="relative">
              {/* Moon Glow effect */}
              <div className="absolute inset-0 bg-yellow-250/20 rounded-full blur-2xl scale-150 animate-glow-pulse" />
              {/* Golden Symmetrical Crescent Arc Moon SVG */}
              <svg className="w-24 h-24 relative" viewBox="0 0 100 100" fill="currentColor">
                <defs>
                  <linearGradient id="moonArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fffbeb" />
                    <stop offset="35%" stopColor="#fef08a" />
                    <stop offset="70%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  {/* Intense inner shadow/depth filter */}
                  <filter id="moonGlowShadow">
                    <feDropShadow dx="-1" dy="1" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.8" />
                  </filter>
                </defs>
                {/* A beautifully thick, clean, tilted crescent arc path */}
                <path 
                  d="M 68 18 
                     A 34 34 0 1 0 74 76 
                     A 30 30 0 1 1 68 18 Z" 
                  fill="url(#moonArcGrad)" 
                  filter="url(#moonGlowShadow)"
                  className="drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                />
              </svg>
            </div>
          </div>

          {/* Header text exactly like reference */}
          <div className="relative z-20 space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white font-montserrat">
              Closed for the day!
            </h2>
            <p className="text-[13px] font-medium text-slate-200/90 px-4">
              Our quick shop is currently closed.
            </p>
            <p className="text-[13px] font-medium text-slate-200/90">
              We'll be back at <span className="text-yellow-400 font-extrabold text-sm">6:00 AM</span>
            </p>
          </div>

          {/* Separate Premium Dark Alarm Countdown Card at the bottom */}
          <div className="relative z-20 w-full max-w-[340px] bg-[#0c0d21]/80 backdrop-blur-md rounded-3xl border border-white/5 p-5 shadow-2xl flex flex-col items-center gap-3.5 mt-auto">
            <div className="w-full flex items-center justify-center gap-4 py-2 px-1">
              {/* Sleeping/Alarm Clock Icon on the left */}
              <div className="flex-shrink-0 text-indigo-400">
                <svg className="w-14 h-14 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l1.414-1.414M5.636 18.364l-1.414 1.414M20.5 12h1M2.5 12h1M12 2.5v1M12 20.5v1" />
                </svg>
              </div>

              {/* Digital countdown timer on the right */}
              <div className="flex flex-col items-start gap-0.5">
                <div className="text-[11px] font-bold text-slate-400 tracking-wide">We open in</div>
                {(() => {
                  const [timeLeft, setTimeLeft] = React.useState({ h: '00', m: '00', s: '00' });
                  React.useEffect(() => {
                    const calculateTimeLeft = () => {
                      const now = new Date();
                      let target = new Date();
                      target.setHours(6, 0, 0, 0);
                      if (now.getHours() >= 6) {
                        target.setDate(target.getDate() + 1);
                      }
                      const diff = target.getTime() - now.getTime();
                      if (diff <= 0) {
                        return { h: '00', m: '00', s: '00' };
                      }
                      const hrs = Math.floor(diff / (1000 * 60 * 60));
                      const mins = Math.floor((diff / (1000 * 60)) % 60);
                      const secs = Math.floor((diff / 1000) % 60);
                      return {
                        h: String(hrs).padStart(2, '0'),
                        m: String(mins).padStart(2, '0'),
                        s: String(secs).padStart(2, '0')
                      };
                    };
                    setTimeLeft(calculateTimeLeft());
                    const timer = setInterval(() => {
                      setTimeLeft(calculateTimeLeft());
                    }, 1000);
                    return () => clearInterval(timer);
                  }, []);
                  return (
                    <div className="flex flex-col items-start">
                      <div className="font-mono text-2xl font-black text-white tracking-wide">
                        {timeLeft.h} : {timeLeft.m} : {timeLeft.s}
                      </div>
                      <div className="flex items-center gap-2.5 text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                        <span>Hours</span>
                        <span>Minutes</span>
                        <span>Seconds</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Thanks for your patience tagline */}
            <div className="w-full border-t border-white/5 pt-2.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400/90">
              <span className="text-yellow-400">✦</span>
              <span>Thanks for your patience!</span>
            </div>
          </div>
        </div>
      )}

      <div className={isClosed ? "filter grayscale opacity-65 pointer-events-none select-none" : ""}>

      {/* Location Picker Bar */}
      {!isFreshGrocery && (
        <div 
          onClick={() => navigate('/profile/addresses')}
          className="flex items-center justify-between gap-2 mb-4 bg-white/60 p-2.5 rounded-2xl border border-pink-100/30 cursor-pointer active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white flex-shrink-0">
              <MapPin size={11} />
            </div>
            <div className="text-[11.5px] font-bold text-slate-800 truncate leading-snug">
              <span className="font-black uppercase text-[10px] tracking-tight mr-1 text-slate-500">HOME</span>
              Sarvanad nagar, near pe...
            </div>
            <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
          </div>
          <div className="bg-[#d6186d] text-white px-2.5 py-1 rounded-xl flex items-center gap-0.5 flex-shrink-0 shadow-xs">
            <span className="text-[13px] font-black">8</span>
            <span className="text-[8px] font-black uppercase tracking-wider">min</span>
          </div>
        </div>
      )}

      {/* Search in QuickShop Input Bar */}
      {!isFreshGrocery && (
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#d6186d]" />
          </div>
          <input 
            type="text" 
            placeholder="Search in QuickShop" 
            onFocus={() => navigate('/search')}
            className="w-full bg-white border-2 border-[#ffb3c6]/40 focus:border-[#d6186d] rounded-2xl pl-10 pr-10 py-2.5 text-[13px] font-medium text-slate-800 placeholder:text-slate-455 outline-none shadow-xs transition-colors"
          />
          <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
            <Mic size={16} className="text-slate-555" />
          </div>
        </div>
      )}

      {/* Subcategory Tabs Header Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 pb-2 mb-4 no-scrollbar border-b border-slate-100/50">
        {['For You', 'Fresh', 'Grocery', 'Electronics', 'Beauty', 'More'].map((tab, idx) => {
          const isActive = activeTab === tab;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 pb-1 text-[12.5px] font-black tracking-tight cursor-pointer transition-colors relative ${
                isActive 
                  ? (isFreshGrocery ? 'text-[#7A3E17]' : 'text-[#d6186d]') 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                  isFreshGrocery ? 'bg-[#7A3E17]' : 'bg-[#d6186d]'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Live Deals banner card */}
      {isFreshGrocery ? (
        <div className="bg-gradient-to-r from-[#FFFEE5] to-[#E5F7EB] rounded-[24px] p-4 text-emerald-950 shadow-md border border-[#7A3E17]/10 mb-6 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1.5 flex-1 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-extrabold text-[#7A3E17] italic">✦ XtraSaver ✦</span>
            </div>
            <h3 className="text-[20px] font-black tracking-tight text-emerald-800 leading-tight">
              XtraSaver
            </h3>
            <p className="text-[12px] font-bold text-[#7A3E17] leading-snug">
              Shop for ₹699, <br />
              <span className="text-emerald-700">unlock lowest prices!</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="bg-white border border-[#7A3E17]/20 p-2 rounded-xl shadow-xs flex flex-col items-center justify-center">
              <span className="text-[7.5px] text-slate-500 font-bold uppercase">1 KG</span>
              <span className="text-[12px] font-black text-emerald-700">₹57</span>
              <span className="text-[7.5px] text-slate-400 line-through">₹178</span>
              <span className="text-[7.5px] bg-emerald-100 text-emerald-800 px-1 rounded-sm font-bold mt-0.5">Shop for ₹699</span>
            </div>
            <span className="text-[8px] text-[#7A3E17] font-semibold italic">Look for this price</span>
          </div>
        </div>
      ) : (
        <>
          {/* EARLY BIRD DEALS (Mobile View) */}
          <div className="bg-gradient-to-br from-[#ff2a5f] to-[#ff7e5f] rounded-[24px] p-4 text-white shadow-lg space-y-4 mb-6 relative overflow-hidden md:hidden">
          {/* Background blobs for premium look */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400/30 rounded-full blur-xl pointer-events-none" />

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-red-500 text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm leading-none">GOAT SALE</span>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider leading-none">EARLY BIRD DEALS</span>
              </div>
              <h3 className="text-[19px] font-black tracking-tight mt-1.5 leading-none">LIVE NOW</h3>
            </div>
            <button className="bg-white text-[#d6186d] text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform">
              Explore more
            </button>
          </div>

          {/* Sponsors details */}
          <div className="bg-white/10 rounded-xl px-3 py-2 flex items-center justify-between gap-1 text-[8px] font-black uppercase tracking-wider text-white/80">
            <span>Title Sponsors</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-white leading-none">Intel CORE</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-white leading-none">AI NOVA</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-white leading-none">RILMA</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-white leading-none">boAt</span>
          </div>

          {/* Horizontal scrollable products row */}
          <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar">
            {/* Product 1 */}
            <div 
              onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd1', name: "L'Oréal Paris Hyaluron Shampoo", price: 225, oldPrice: 230, image: LorealShampoo, rating: '4.3', label: 'Assured', brand: 'L\'Oréal' } } })}
              className="min-w-[125px] bg-white rounded-2xl p-2 flex flex-col justify-between text-slate-800 shadow-sm relative cursor-pointer active:scale-95 transition-transform"
            >
              <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                ↓ 2%
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                  cart.push({ name: "L'Oréal Paris Hyaluron Shampoo", price: 225, oldPrice: 230, image: LorealShampoo, cartId: Date.now(), qty: 1 });
                  localStorage.setItem('userCart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cartUpdated'));
                }}
                className="w-[20px] h-[20px] absolute top-2 right-2 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[12px] font-black cursor-pointer active:scale-90 transition-transform z-20"
              >
                +
              </div>
              <div className="h-16 flex items-center justify-center my-3.5">
                <img src={LorealShampoo} className="h-full object-contain mix-blend-multiply" alt="shampoo" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">200 ml</span>
                  <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                    4.3 <Star size={6} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <h4 className="text-[10px] font-black leading-tight text-slate-800 line-clamp-2 h-7">L'Oréal Paris Hyaluron...</h4>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-[10px] text-slate-400 line-through">₹230</span>
                  <span className="text-[12px] font-black text-slate-900">₹225</span>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div 
              onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd2', name: "Wellcore Micronised Creatine Monohydrate", price: 530, oldPrice: 699, image: PlumShampoo, rating: '4.3', label: 'Assured', brand: 'Wellcore' } } })}
              className="min-w-[125px] bg-white rounded-2xl p-2 flex flex-col justify-between text-slate-800 shadow-sm relative cursor-pointer active:scale-95 transition-transform"
            >
              <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                ↓ 24% <span className="bg-slate-800/20 px-0.5 rounded-sm">AD</span>
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                  cart.push({ name: "Wellcore Micronised Creatine Monohydrate", price: 530, oldPrice: 699, image: PlumShampoo, cartId: Date.now(), qty: 1 });
                  localStorage.setItem('userCart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cartUpdated'));
                }}
                className="w-[20px] h-[20px] absolute top-2 right-2 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[12px] font-black cursor-pointer active:scale-90 transition-transform z-20"
              >
                +
              </div>
              <div className="h-16 flex items-center justify-center my-3.5">
                <img src={PlumShampoo} className="h-full object-contain mix-blend-multiply" alt="serum" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">122 g</span>
                  <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                    4.3 <Star size={6} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <h4 className="text-[10px] font-black leading-tight text-slate-800 line-clamp-2 h-7">Wellcore Micronised ...</h4>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-[10px] text-slate-400 line-through">₹699</span>
                  <span className="text-[12px] font-black text-slate-900">₹530</span>
                </div>
                <div className="mt-1 bg-amber-550/20 px-1 py-0.5 rounded text-[8px] font-bold text-amber-800 leading-none text-center">
                  ₹400 with UPI offer
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div 
              onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd3', name: "Pilgrim 10% Vitamin C Face Serum", price: 202, oldPrice: 249, image: LipGloss, rating: '4.1', label: 'Assured', brand: 'Pilgrim' } } })}
              className="min-w-[125px] bg-white rounded-2xl p-2 flex flex-col justify-between text-slate-800 shadow-sm relative cursor-pointer active:scale-95 transition-transform"
            >
              <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                ↓ 19%
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                  cart.push({ name: "Pilgrim 10% Vitamin C Face Serum", price: 202, oldPrice: 249, image: LipGloss, cartId: Date.now(), qty: 1 });
                  localStorage.setItem('userCart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cartUpdated'));
                }}
                className="w-[20px] h-[20px] absolute top-2 right-2 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[12px] font-black cursor-pointer active:scale-90 transition-transform z-20"
              >
                +
              </div>
              <div className="h-16 flex items-center justify-center my-3.5">
                <img src={LipGloss} className="h-full object-contain mix-blend-multiply" alt="oil" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">10 ml</span>
                  <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                    4.1 <Star size={6} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <h4 className="text-[10px] font-black leading-tight text-slate-800 line-clamp-2 h-7">Pilgrim 10%...</h4>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-[10px] text-slate-400 line-through">₹249</span>
                  <span className="text-[12px] font-black text-slate-900">₹202</span>
                </div>
                <div className="mt-1 bg-yellow-100 text-yellow-800 border border-yellow-250 px-1 py-0.5 rounded text-[8px] font-black flex justify-between items-center cursor-pointer leading-none">
                  <span>₹191 XtraSaver</span>
                  <span>&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EARLY BIRD DEALS (Desktop View - copy style & structure of Best Deals on Furniture) */}
        <div className="hidden md:block md:max-w-6xl md:mx-auto md:mb-6">
          {/* Banner Header */}
          <div className="bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f] text-white px-6 py-4 rounded-t-3xl flex justify-between items-center shadow-sm">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-red-500 text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm leading-none">GOAT SALE</span>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider leading-none">EARLY BIRD DEALS</span>
              </div>
              <h3 className="text-[19px] font-black tracking-tight mt-1.5 leading-none">LIVE NOW</h3>
            </div>
            <button className="bg-white text-[#d6186d] text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform">
              Explore more
            </button>
          </div>

          {/* Sponsors strip inside desktop layout */}
          <div className="bg-gradient-to-r from-[#b5125b] to-[#c2410c] px-6 py-2.5 flex items-center gap-4 text-[10px] font-black uppercase tracking-wider text-white/80">
            <span>Title Sponsors</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white leading-none">Intel CORE</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white leading-none">AI NOVA</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white leading-none">RILMA</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white leading-none">boAt</span>
          </div>

          {/* White container panel containing the cards */}
          <div className="bg-white border-x border-b border-slate-100 rounded-b-3xl p-6 shadow-md">
            <div className="grid grid-cols-3 gap-6">
              {/* Product 1 */}
              <div 
                onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd1', name: "L'Oréal Paris Hyaluron Shampoo", price: 225, oldPrice: 230, image: LorealShampoo, rating: '4.3', label: 'Assured', brand: 'L\'Oréal' } } })}
                className="flex flex-col gap-3.5 cursor-pointer group active:scale-95 transition-transform relative"
              >
                <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                  ↓ 2%
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                    cart.push({ name: "L'Oréal Paris Hyaluron Shampoo", price: 225, oldPrice: 230, image: LorealShampoo, cartId: Date.now(), qty: 1 });
                    localStorage.setItem('userCart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('cartUpdated'));
                  }}
                  className="w-[28px] h-[28px] absolute top-3 right-3 z-10 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[15px] font-black cursor-pointer active:scale-90 transition-transform"
                >
                  +
                </div>
                {/* Soft grey rounded image container box */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-5 group-hover:bg-slate-100/60 transition-colors duration-300">
                  <img
                    src={LorealShampoo}
                    alt="shampoo"
                    className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Content placed below the image box */}
                <div className="px-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8.5px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold leading-none">200 ml</span>
                    <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                      4.3 <Star size={6} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                  <h3 className="text-[13px] font-black text-slate-800 leading-snug group-hover:text-[#d6186d] transition-colors">L'Oréal Paris Hyaluron Shampoo</h3>
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-[11px] text-slate-400 line-through">₹230</span>
                    <span className="text-[13px] font-black text-slate-900">₹225</span>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div 
                onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd2', name: "Wellcore Micronised Creatine Monohydrate", price: 530, oldPrice: 699, image: PlumShampoo, rating: '4.3', label: 'Assured', brand: 'Wellcore' } } })}
                className="flex flex-col gap-3.5 cursor-pointer group active:scale-95 transition-transform relative"
              >
                <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                  ↓ 24% <span className="bg-slate-800/20 px-0.5 rounded-sm ml-0.5">AD</span>
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                    cart.push({ name: "Wellcore Micronised Creatine Monohydrate", price: 530, oldPrice: 699, image: PlumShampoo, cartId: Date.now(), qty: 1 });
                    localStorage.setItem('userCart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('cartUpdated'));
                  }}
                  className="w-[28px] h-[28px] absolute top-3 right-3 z-10 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[15px] font-black cursor-pointer active:scale-90 transition-transform"
                >
                  +
                </div>
                {/* Soft grey rounded image container box */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-5 group-hover:bg-slate-100/60 transition-colors duration-300">
                  <img
                    src={PlumShampoo}
                    alt="creatine"
                    className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Content placed below the image box */}
                <div className="px-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">122 g</span>
                    <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                      4.3 <Star size={6} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                  <h3 className="text-[13px] font-black text-slate-800 leading-snug group-hover:text-[#d6186d] transition-colors">Wellcore Micronised Creatine</h3>
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-[11px] text-slate-400 line-through">₹699</span>
                    <span className="text-[13px] font-black text-slate-900">₹530</span>
                  </div>
                  <div className="mt-2 bg-amber-550/10 px-2 py-1 rounded text-[10px] font-bold text-amber-800 w-fit">
                    ₹400 with UPI offer
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div 
                onClick={() => navigate('/vendor/product-detail', { state: { product: { id: 'sd3', name: "Pilgrim 10% Vitamin C Face Serum", price: 202, oldPrice: 249, image: LipGloss, rating: '4.1', label: 'Assured', brand: 'Pilgrim' } } })}
                className="flex flex-col gap-3.5 cursor-pointer group active:scale-95 transition-transform relative"
              >
                <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 leading-none">
                  ↓ 19%
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                    cart.push({ name: "Pilgrim 10% Vitamin C Face Serum", price: 202, oldPrice: 249, image: LipGloss, cartId: Date.now(), qty: 1 });
                    localStorage.setItem('userCart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('cartUpdated'));
                  }}
                  className="w-[28px] h-[28px] absolute top-3 right-3 z-10 border border-[#d6186d]/20 bg-pink-50 rounded-full flex items-center justify-center text-[#d6186d] text-[15px] font-black cursor-pointer active:scale-90 transition-transform"
                >
                  +
                </div>
                {/* Soft grey rounded image container box */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-5 group-hover:bg-slate-100/60 transition-colors duration-300">
                  <img
                    src={LipGloss}
                    alt="serum"
                    className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Content placed below the image box */}
                <div className="px-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">10 ml</span>
                    <div className="flex items-center bg-emerald-100 text-emerald-800 px-1 rounded-sm text-[8px] font-black leading-none">
                      4.1 <Star size={6} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                  <h3 className="text-[13px] font-black text-slate-800 leading-snug group-hover:text-[#d6186d] transition-colors">Pilgrim 10% Face Serum</h3>
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-[11px] text-slate-400 line-through">₹249</span>
                    <span className="text-[13px] font-black text-slate-900">₹202</span>
                  </div>
                  <div className="mt-2 bg-yellow-100 text-yellow-800 border border-yellow-250 px-2 py-0.5 rounded text-[10px] font-black flex justify-between items-center w-fit">
                    <span>₹191 XtraSaver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}

      {/* Location reminder banner matching screenshot exactly */}
      <div className="mb-6 bg-rose-50/40 border border-rose-100/60 rounded-xl p-3 flex justify-between items-center cursor-pointer shadow-2xs hover:bg-rose-50/70 transition-colors">
        <span className="text-[11px] font-semibold text-rose-900 leading-snug">
          Share your location to access QuickShop & explore offers trending in your area.
        </span>
        <svg className="w-4 h-4 text-rose-800 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Today's special deals section */}
      <div className={`p-4 rounded-3xl mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.015)] transition-colors duration-200 md:max-w-[1600px] md:mx-auto md:w-full md:p-6 ${
        isFreshGrocery ? 'bg-[#FFF0A0]/40 border border-[#7A3E17]/10' : 'bg-[#fbe8f3]'
      }`}>
        <h2 className="text-[17px] font-black text-slate-800 mb-4 pl-1">
          Today's special deals
        </h2>

        {/* Sub-tabs List */}
        <div className="flex overflow-x-auto gap-4 mb-5 no-scrollbar md:justify-center md:gap-14 md:overflow-x-visible">
          {SPECIAL_DEALS_TABS.map((tab) => {
            const isSelected = activeSpecialTab === tab.id;
            return (
              <div 
                key={tab.id} 
                onClick={() => setActiveSpecialTab(tab.id)} 
                className="flex flex-col items-center cursor-pointer flex-shrink-0 w-[72px] md:w-[110px] group"
              >
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-full overflow-hidden flex items-center justify-center p-0.5 transition-all duration-300 ${
                  isSelected 
                    ? (isFreshGrocery ? 'bg-[#FFF0A0] shadow-xs md:ring-2 md:ring-offset-2 md:ring-[#7A3E17]' : 'bg-[#ffd3e8] shadow-sm scale-105 md:ring-2 md:ring-offset-2 md:ring-[#d6186d]')
                    : 'bg-white hover:scale-105 shadow-xs'
                }`}>
                  <img src={tab.img} alt={tab.name} className="w-full h-full rounded-2xl md:rounded-full object-cover" />
                </div>
                <span className={`text-[9px] md:text-[12px] font-black text-center mt-2 leading-tight line-clamp-2 h-[24px] md:h-auto md:max-w-[100px] transition-colors ${
                  isSelected 
                    ? (isFreshGrocery ? 'text-[#7A3E17]' : 'text-[#d6186d]') 
                    : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {tab.name}
                </span>
                {isSelected && (
                  <div className={`w-8 md:w-12 h-[2.5px] md:h-[3px] rounded-full mt-1.5 md:mt-2 ${
                    isFreshGrocery ? 'bg-[#7A3E17]' : 'bg-[#d6186d]'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Products Row */}
        <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-x-visible mb-4">
          {(SPECIAL_DEALS_TABS.find(t => t.id === activeSpecialTab)?.products || []).map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => {
                localStorage.setItem('isQuickShopFlow', 'true');
                navigate('/vendor/product-detail', { state: { product: { ...prod, image: prod.img, qty: 1 } } });
              }}
              className="min-w-[130px] bg-white rounded-2xl p-1.5 md:p-2.5 flex flex-col justify-between relative shadow-xs cursor-pointer active:scale-[0.99] transition-transform"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-[#008542] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none">
                ↓ {prod.discount}
              </div>
              
              {/* Product Image */}
              <div className="h-16 md:h-20 flex items-center justify-center my-2 md:my-3.5">
                <img src={prod.img} alt={prod.name} className="max-h-full object-contain mix-blend-multiply" />
              </div>
              
              {/* Rating and Add Button */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center bg-emerald-50 text-emerald-800 border border-emerald-100 px-1 py-0.5 rounded-md text-[8.5px] font-black leading-none">
                  {prod.rating} <Star size={6} fill="currentColor" className="ml-0.5" />
                </div>
                {/* Add Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                    cart.push({ name: prod.name, price: prod.price, oldPrice: prod.oldPrice, image: prod.img, cartId: Date.now(), qty: 1 });
                    localStorage.setItem('userCart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('cartUpdated'));
                  }}
                  className={`px-3.5 py-1 border rounded-lg text-[10px] font-black tracking-wider uppercase cursor-pointer active:scale-90 transition-transform shadow-3xs hover:bg-opacity-5 bg-white ${
                    isFreshGrocery 
                      ? 'border-[#7A3E17] text-[#7A3E17] hover:bg-[#7A3E17]' 
                      : 'border-[#d6186d] text-[#d6186d] hover:bg-pink-50'
                  }`}
                >
                  ADD
                </button>
              </div>

              <div>
                <span className="text-[8.5px] bg-slate-100 text-slate-555 px-1.5 py-0.5 rounded font-bold leading-none">{prod.weight}</span>
                <h4 className="text-[10px] font-black leading-tight text-slate-800 mt-1.5 line-clamp-2 h-7">{prod.name}</h4>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-[9px] text-slate-400 line-through">{formatPrice(prod.oldPrice)}</span>
                  <span className="text-[11.5px] font-black text-slate-900">{formatPrice(prod.price)}</span>
                </div>
                
                {/* XtraSaver */}
                <div className="mt-2 bg-yellow-100 text-yellow-900 border border-yellow-200/50 px-2 py-1 rounded-lg text-[8.5px] font-black flex justify-between items-center cursor-pointer leading-none">
                  <span>🔒 {formatPrice(prod.xtraPrice)} XtraSaver</span>
                  <span className="text-[7px] text-yellow-755 font-bold">&gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Products Button */}
        <button 
          onClick={() => {
            const selectedTabObj = SPECIAL_DEALS_TABS.find(t => t.id === activeSpecialTab);
            if (selectedTabObj) {
              navigate(isFreshGrocery ? '/fresh-grocery/category' : '/quick-shop/category', { state: { category: selectedTabObj.name } });
            }
          }}
          className={`w-full bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-black py-2.5 rounded-2xl flex items-center justify-center gap-1 border active:scale-[0.99] transition-transform shadow-3xs md:max-w-xs md:mx-auto ${
            isFreshGrocery ? 'border-[#7A3E17]/20' : 'border-pink-200/20'
          }`}
        >
          View more products <ChevronRight size={14} className="text-slate-450" />
        </button>
      </div>

      {/* Existing category sections (Mobile View) */}
      <div className="md:hidden">
        {filteredSections.map((section, sIdx) => (
          <div key={sIdx} className="mb-8">
            <h2 className="text-[15px] font-bold text-gray-900 mb-3 tracking-tight pl-1">
              {section.title}
            </h2>
            <div className="grid grid-cols-4 gap-2 justify-items-center">
              {section.items.map((item, itemIdx) => (
                <CategoryCard
                  key={itemIdx}
                  item={item}
                  onClick={() => {
                    localStorage.setItem('isQuickShopFlow', 'true');
                    navigate(isFreshGrocery ? '/fresh-grocery/category' : '/quick-shop/category', { state: { category: item.name } });
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Existing category sections (Desktop View - copy style & structure of Categories banner + white panel) */}
      <div className="hidden md:block md:max-w-[1600px] md:mx-auto md:px-4 md:py-6 space-y-8">
        {filteredSections.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col">
            {/* Header Banner */}
            <div className={`px-6 py-3.5 rounded-t-3xl flex items-center justify-between shadow-sm text-white ${
              isFreshGrocery ? 'bg-[#7A3E17]' : 'bg-[#d6186d]'
            }`}>
              <h2 className="text-[15px] font-black uppercase tracking-wider">
                {section.title}
              </h2>
            </div>
 
            {/* White container panel containing the category cards */}
            <div className="bg-white border-x border-b border-slate-100 rounded-b-3xl p-6 shadow-md">
              <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-8 gap-y-8 justify-items-center">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    onClick={() => {
                      localStorage.setItem('isQuickShopFlow', 'true');
                      navigate(isFreshGrocery ? '/fresh-grocery/category' : '/quick-shop/category', { state: { category: item.name } });
                    }}
                    className="flex flex-col items-center gap-3.5 cursor-pointer group active:scale-95 transition-transform w-full max-w-[160px]"
                  >
                    {/* Soft grey rounded image container box */}
                    <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-0 group-hover:bg-slate-100/65 transition-colors duration-300">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[13px] font-black text-center text-slate-800 leading-tight tracking-tight mt-1 group-hover:text-[#d6186d] transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
};

export default QuickShop;
