import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  ChevronDown, 
  SlidersHorizontal, 
  Search,
  ShoppingCart,
  ArrowLeft,
  LayoutGrid,
  Menu,
  MapPin,
  Bell
} from 'lucide-react';

import JewelleryImg from '../../assets/products/product12.jpg';
import MakeupHero from '../../assets/products/product08.jpg';
import SamsungS24 from '../../assets/products/product01.jpg';
import EarbudsDeal from '../../assets/products/product03.jpg';

// Import Beauty/Jewellery assets
import BeautyJewel1 from '../../assets/Beauty/BeautyJewel1.jpg';
import BeautyJewel2 from '../../assets/Beauty/BeautyJewel2.jpg';
import BeautyJewel3 from '../../assets/Beauty/BeautyJewel3.jpg';
import BeautyJewel4 from '../../assets/Beauty/BeautyJewel4.jpg';
import BeautyJewel5 from '../../assets/Beauty/BeautyJewel5.jpg';
import BeautyJewel6 from '../../assets/Beauty/BeautyJewel6.jpg';

const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'Jewellery';
  const [activeSort, setActiveSort] = useState('Popularity');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
      const totalCount = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Multi-category product data with verified assets
  const categoryData = {
    'Jewellery': [
      {
        id: 1,
        brand: 'MODERN MINIMAL',
        name: 'Sleek Geometric Pendant',
        price: '4,499',
        oldPrice: '7,999',
        off: '43% off',
        rating: '4.9',
        reviews: '2,450',
        delivery: 'Tomorrow',
        image: BeautyJewel1,
        bestseller: true
      },
      {
        id: 2,
        brand: 'FANCY CHIC',
        name: 'Dainty Serenity Drops',
        price: '2,199',
        oldPrice: '4,500',
        off: '51% off',
        rating: '4.7',
        reviews: '1,120',
        delivery: 'Tomorrow',
        image: BeautyJewel2,
      },
      {
        id: 3,
        brand: 'CONTEMPORARY',
        name: 'Elegance Infinity Band',
        price: '3,299',
        oldPrice: '5,999',
        off: '45% off',
        rating: '4.8',
        reviews: '3,890',
        delivery: 'Tomorrow',
        image: BeautyJewel3,
      },
      {
        id: 4,
        brand: 'URBAN LUXE',
        name: 'Regal Strand Necklace',
        price: '8,990',
        oldPrice: '12,000',
        off: '25% off',
        rating: '4.9',
        reviews: '560',
        delivery: 'Tomorrow',
        image: BeautyJewel4,
      },
      {
        id: 5,
        brand: 'PURE SILHOUETTE',
        name: 'Slender Wristlet Set',
        price: '6,499',
        oldPrice: '9,999',
        off: '35% off',
        rating: '4.8',
        reviews: '890',
        delivery: 'Tomorrow',
        image: BeautyJewel5,
      },
      {
        id: 6,
        brand: 'MODERNIST',
        name: 'Abstract Nova Studs',
        price: '1,599',
        oldPrice: '2,999',
        off: '46% off',
        rating: '4.6',
        reviews: '420',
        delivery: 'Tomorrow',
        image: BeautyJewel6,
      },
      {
        id: 7,
        brand: 'NOIR LUXE',
        name: 'Midnight Solitaire Band',
        price: '12,499',
        oldPrice: '18,000',
        off: '30% off',
        rating: '4.9',
        reviews: '120',
        delivery: 'Tomorrow',
        image: BeautyJewel1,
      },
      {
        id: 8,
        brand: 'ETHEREAL',
        name: 'Lunar Glow Pendant',
        price: '5,299',
        oldPrice: '7,500',
        off: '29% off',
        rating: '4.7',
        reviews: '2,100',
        delivery: 'Tomorrow',
        image: BeautyJewel2,
      }
    ],
    'Electronics': [
      {
        id: 101,
        brand: 'SAMSUNG',
        name: 'Galaxy S24 5G (Cobalt Violet)',
        price: '46,999',
        oldPrice: '74,999',
        off: '37% off',
        rating: '4.6',
        reviews: '61,382',
        delivery: 'Tomorrow',
        image: SamsungS24,
        bestseller: true
      },
      {
        id: 102,
        brand: 'NOISE',
        name: 'Buds VS102 Wireless Earbuds',
        price: '1,299',
        oldPrice: '2,999',
        off: '56% off',
        rating: '4.2',
        reviews: '12,120',
        delivery: 'Tomorrow',
        image: EarbudsDeal,
      },
      {
        id: 103,
        brand: 'APPLE',
        name: 'AirPods Pro (2nd Gen)',
        price: '24,900',
        oldPrice: '26,900',
        off: '7% off',
        rating: '4.8',
        reviews: '45,210',
        delivery: 'Tomorrow',
        image: EarbudsDeal,
      },
      {
        id: 104,
        brand: 'SONY',
        name: 'WH-1000XM5 Headphones',
        price: '29,990',
        oldPrice: '34,990',
        off: '14% off',
        rating: '4.7',
        reviews: '8,920',
        delivery: 'Tomorrow',
        image: EarbudsDeal,
      },
      {
        id: 105,
        brand: 'BOAT',
        name: 'Airdopes 141',
        price: '1,499',
        oldPrice: '4,490',
        off: '66% off',
        rating: '4.1',
        reviews: '150k+',
        delivery: 'Tomorrow',
        image: EarbudsDeal,
      }
    ],
    'Beauty': [
      {
        id: 201,
        brand: 'PLUM',
        name: 'Luxury Skincare Gift Set',
        price: '1,249',
        oldPrice: '1,999',
        off: '37% off',
        rating: '4.8',
        reviews: '15,450',
        delivery: 'Tomorrow',
        image: MakeupHero,
        bestseller: true
      },
      {
        id: 202,
        brand: 'MAYBELLINE',
        name: 'SuperStay Matte Ink Liquid Lipstick',
        price: '549',
        oldPrice: '699',
        off: '21% off',
        rating: '4.5',
        reviews: '89,120',
        delivery: 'Tomorrow',
        image: MakeupHero,
      }
    ]
  };

  const products = categoryData[category] || categoryData['Jewellery'];

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/,/g, ''));
    const priceB = parseInt(b.price.replace(/,/g, ''));
    if (activeSort === 'Price: Low to High') return priceA - priceB;
    if (activeSort === 'Price: High to Low') return priceB - priceA;
    if (activeSort === 'Customer Rating') return parseFloat(b.rating) - parseFloat(a.rating);
    return 0; // Popularity (Default)
  });

  const trendingData = {
    'Jewellery': [
      { id: 501, name: 'Chic Choker', price: '1,299', off: '60% off', image: BeautyJewel3 },
      { id: 502, name: 'Golden Hoops', price: '899', off: '45% off', image: BeautyJewel4 },
      { id: 503, name: 'Celestial Ring', price: '1,499', off: '30% off', image: BeautyJewel5 },
      { id: 504, name: 'Urban Cuff', price: '2,100', off: '20% off', image: BeautyJewel6 }
    ],
    'Electronics': [
      { id: 601, name: 'Smart Watch', price: '3,499', off: '40% off', image: SamsungS24 },
      { id: 602, name: 'Wireless Headphones', price: '4,999', off: '50% off', image: EarbudsDeal },
      { id: 603, name: 'Power Bank', price: '1,299', off: '35% off', image: EarbudsDeal },
      { id: 604, name: 'Bluetooth Speaker', price: '2,100', off: '25% off', image: EarbudsDeal }
    ],
    'Beauty': [
      { id: 701, name: 'Face Wash', price: '299', off: '10% off', image: MakeupHero },
      { id: 702, name: 'Body Lotion', price: '499', off: '15% off', image: MakeupHero },
      { id: 703, name: 'Lip Balm', price: '199', off: '5% off', image: MakeupHero },
      { id: 704, name: 'Hair Serum', price: '699', off: '20% off', image: MakeupHero }
    ]
  };

  const trendingItems = trendingData[category] || trendingData['Jewellery'];

  return (
    <div className="bg-gray-50 min-h-screen text-slate-900 transition-colors duration-300 pb-10 font-sans">
      {/* ── Dynamic Category Header ── */}
      <div className="sticky top-0 z-[100] bg-[#2874F0] text-white">
        {/* Row 1: Back + Title + Actions */}
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/vendor/home" className="p-1 active:scale-90 transition-transform">
              <ArrowLeft size={22} strokeWidth={2.5} />
            </Link>
            <h1 className="text-[17px] font-bold tracking-tight">{category}</h1>
          </div>
          
          <div className="flex items-center gap-1">
            <Link to="/vendor/search" className="p-2">
              <Search size={20} strokeWidth={2} />
            </Link>
            <Link to="/vendor/cart" className="relative p-2 active:scale-90 transition-transform">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-black min-w-[14px] h-3.5 rounded-full flex items-center justify-center border border-[#2874F0] shadow-sm">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Row 2: Sort & Filter Bar (Compact) */}
        <div className="flex items-center border-t border-white/10 bg-[#2874F0]">
          <button 
            onClick={() => setShowSortModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-bold uppercase tracking-wide active:bg-white/10"
          >
            Sort <ChevronDown size={14} strokeWidth={2.5} />
          </button>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-bold uppercase tracking-wide active:bg-white/10"
          >
            <SlidersHorizontal size={14} strokeWidth={2.5} /> Filter
          </button>
        </div>
      </div>

      {/* ── Category Hero Info ── */}
      <div className="px-4 py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tight leading-none">{category}</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Curated collection for you</p>
        </div>
        <div className="flex -space-x-2">
           <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-[#2874F0]">NEW</div>
           <div className="w-8 h-8 rounded-full border-2 border-white bg-green-50 flex items-center justify-center text-[10px] font-bold text-[#388e3c]">SALE</div>
        </div>
      </div>

      {/* 🔶 Main Product Grid (Top Part) */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {sortedProducts.slice(0, 4).map((product) => (
          <Link to="/vendor/product-detail" state={{ product }} key={product.id} className="flex flex-col group active:scale-[0.98] transition-transform">
              <div className="relative aspect-[3/4] bg-[var(--card-border)] rounded-xl border border-transparent overflow-hidden mb-2 group-hover:border-[#2874F0]/30 transition-all shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-100 product-img-blend`} 
                />
              
              {/* Heart Icon */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-black/10 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-red-500 transition-all">
                <Heart size={16} />
              </button>

              {/* Bestseller Tag */}
              {product.bestseller && (
                <div className="absolute top-0 left-0 bg-[#008c7a] text-white text-[8px] font-black px-2 py-1 rounded-br-lg uppercase tracking-wider shadow-lg">
                  Bestseller
                </div>
              )}

              {/* Rating Mini Tag */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-black text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-md">
                {product.rating} <Star size={8} fill="currentColor" className="text-green-700" /> <span className="text-gray-400 font-bold border-l border-gray-300 pl-1">{product.reviews}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="px-0.5 mt-1">
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-tight line-clamp-1">{product.brand}</h3>
              <p className="text-[10px] font-medium text-slate-900 line-clamp-1 leading-tight mt-0.5">{product.name}</p>
              
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-[12px] font-black text-slate-900">₹{product.price}</span>
                <span className="text-[9px] text-slate-400 line-through tracking-tighter">₹{product.oldPrice}</span>
                <span className="text-[9px] font-bold text-[#388e3c] tracking-tighter">{product.off}</span>
              </div>

              <div className="mt-0.5 flex items-center gap-1">
                <span className="text-[8px] font-medium text-slate-400">Delivery by</span>
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tighter">{product.delivery}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔶 Horizontal Trends Section (Slider as requested) */}
      <div className="my-2 py-4 bg-[var(--card-border)]/30 border-y border-[var(--card-border)]">
        <div className="px-4 flex items-center gap-2 mb-3">
          <span className="bg-[#008c7a] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Trending</span>
          <h2 className="text-[13px] font-black text-[var(--card-text)] uppercase tracking-tight">Hot and latest for you</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar pb-2">
          {trendingItems.map((item) => (
            <Link to="/vendor/product-detail" state={{ product: item }} key={item.id} className="block w-[110px] flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 p-1.5 group active:scale-95 transition-all shadow-sm">
              <div className="aspect-square rounded-md overflow-hidden mb-1.5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 product-img-blend" />
              </div>
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-tight line-clamp-1">{item.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-black text-slate-900">₹{item.price}</span>
                <span className="text-[8px] font-bold text-[#388e3c]">{item.off}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 🔶 Main Product Grid (Bottom Part) */}
      <div className="px-4 py-2 mt-4">
        <h2 className="text-[13px] font-black text-[var(--card-text)] uppercase tracking-tight">For You</h2>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {sortedProducts.slice(4).map((product) => (
          <Link to="/vendor/product-detail" state={{ product }} key={product.id} className="flex flex-col group active:scale-[0.98] transition-transform">
              <div className="relative aspect-[3/4] bg-[var(--card-border)] rounded-xl border border-transparent overflow-hidden mb-2 group-hover:border-[#2874F0]/30 transition-all shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-100 product-img-blend`} 
                />
              
              {/* Heart Icon */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-black/10 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-red-500 transition-all">
                <Heart size={16} />
              </button>

              {/* Bestseller Tag */}
              {product.bestseller && (
                <div className="absolute top-0 left-0 bg-[#008c7a] text-white text-[8px] font-black px-2 py-1 rounded-br-lg uppercase tracking-wider shadow-lg">
                  Bestseller
                </div>
              )}

              {/* Rating Mini Tag */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-black text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-md">
                {product.rating} <Star size={8} fill="currentColor" className="text-green-700" /> <span className="text-gray-400 font-bold border-l border-gray-300 pl-1">{product.reviews}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="px-0.5 mt-1">
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-tight line-clamp-1">{product.brand}</h3>
              <p className="text-[10px] font-medium text-slate-900 line-clamp-1 leading-tight mt-0.5">{product.name}</p>
              
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-[12px] font-black text-slate-900">₹{product.price}</span>
                <span className="text-[9px] text-slate-400 line-through tracking-tighter">₹{product.oldPrice}</span>
                <span className="text-[9px] font-bold text-[#388e3c] tracking-tighter">{product.off}</span>
              </div>

              <div className="mt-0.5 flex items-center gap-1">
                <span className="text-[8px] font-medium text-slate-400">Delivery by</span>
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tighter">{product.delivery}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔶 Sort Modal (Bottom Sheet) */}
      {showSortModal && (
        <div className="fixed inset-0 z-[200] flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSortModal(false)}></div>
          <div className="relative w-full bg-[#111111] rounded-t-2xl border-t border-[#2874F0]/20 p-6 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-6"></div>
            <h2 className="text-sm font-black text-[#2874F0] uppercase tracking-widest mb-6">Sort By</h2>
            <div className="space-y-4">
              {['Popularity', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'].map((option) => (
                <button 
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setShowSortModal(false);
                  }}
                  className={`w-full flex items-center justify-between text-sm font-bold py-2 ${activeSort === option ? 'text-white' : 'text-gray-500'}`}
                >
                  {option}
                  {activeSort === option && <div className="w-2 h-2 bg-[#2874F0] rounded-full shadow-[0_0_8px_#2874F0]"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔶 Filter Modal (Full Screen Overlay) */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[200] bg-black animate-in fade-in duration-200">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-900 flex justify-between items-center">
              <h2 className="text-sm font-black text-[#2874F0] uppercase tracking-widest">Filters</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-white">✕</button>
            </div>
            <div className="flex-1 p-6 space-y-8">
              <div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg text-xs font-bold text-white">Min: ₹0</div>
                  <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg text-xs font-bold text-white">Max: ₹50,000+</div>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Availability</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-5 bg-[#2874F0] rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-black rounded-full"></div>
                  </div>
                  <span className="text-sm font-bold text-white">Express Delivery Only</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-900 flex gap-4">
              <button onClick={() => setShowFilterModal(false)} className="flex-1 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Clear All</button>
              <button onClick={() => setShowFilterModal(false)} className="flex-[2] py-4 bg-[#2874F0] text-black text-[11px] font-black uppercase tracking-widest rounded-lg">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
