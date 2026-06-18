import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Camera, ShoppingCart, ArrowLeft,
  ChevronRight, Star, Info, Bell, Zap, PlayCircle,
  LayoutGrid, User, Home, Smartphone, Truck, Heart, X, Star as StarIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allCategoryProducts } from '../../data/categoryData';

const Categories = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('For You');
  const [cartCount, setCartCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
      const total = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const handleWishlistClick = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
    const isInWishlist = savedWishlist.some(item => item.id === product.id);

    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = savedWishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...savedWishlist, product];
    }

    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);

    // Dispatch event for other components to update
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const categories = useMemo(() => Object.keys(allCategoryProducts), []);

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    // Search across all categories
    const results = [];
    Object.values(allCategoryProducts).forEach(categoryItems => {
      categoryItems.forEach(product => {
        if (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.shortDescription && product.shortDescription.toLowerCase().includes(query))
        ) {
          // Avoid duplicates if a product is in multiple categories (though not the case here)
          if (!results.find(p => p.id === product.id)) {
            results.push(product);
          }
        }
      });
    });
    return results;
  }, [searchQuery]);

  const currentProducts = useMemo(() => {
    if (searchQuery.trim()) return filteredProducts;
    return allCategoryProducts[activeCategory] || [];
  }, [activeCategory, searchQuery, filteredProducts]);

  const launches = [
    { id: 1, name: 'Ai+ Nova 2 series', status: 'NOTIFY ME', color: 'bg-emerald-700', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Samsung Mini-LED', status: 'SALE IS LIVE!', color: 'bg-emerald-700', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Braun by Gillette', status: 'BUY NOW', color: 'bg-emerald-700', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'CMF Watch 3 Pro', status: '', color: '', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80' },
    { id: 5, name: 'Ai+ Pulse Tab', status: '', color: '', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=200&q=80' },
    { id: 6, name: 'OPPO F33 Series 5G', status: 'BUY NOW', color: 'bg-emerald-700', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          {!isSearchVisible ? (
            <>
              <button onClick={() => navigate(-1)}>
                <ArrowLeft size={22} className="text-slate-800" />
              </button>
              <h1 className="text-[19px] font-medium text-slate-800">All Categories</h1>
            </>
          ) : (
            <div className="flex items-center gap-3 w-full animate-in slide-in-from-right duration-200">
              <button onClick={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}>
                <ArrowLeft size={22} className="text-[#2874f0]" />
              </button>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-100">
                <Search size={18} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search in Categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[14px] w-full placeholder:text-gray-400 font-medium"
                />
                {searchQuery && (
                  <X
                    size={18}
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {!isSearchVisible && (
          <div className="flex items-center gap-5 ml-4">
            <Search
              size={22}
              className="text-slate-800 cursor-pointer active:scale-90 transition-transform"
              onClick={() => setIsSearchVisible(true)}
            />
            <div
              onClick={() => navigate('/vendor/cart')}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={22} className="text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#cc0c39] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fixed (Hidden during search results) */}
        {!searchQuery.trim() && (
          <div className="w-[90px] bg-[#f8f9fb] border-r border-gray-100 overflow-y-auto no-scrollbar h-[calc(100vh-60px)]">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-4 px-2 flex flex-col items-center gap-2 cursor-pointer transition-all relative ${activeCategory === cat ? 'bg-white' : 'bg-transparent'
                  }`}
              >
                {activeCategory === cat && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2874f0] rounded-r-full" />
                )}
                <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-transform ${activeCategory === cat ? 'scale-110 shadow-sm border-2 border-[#2874f0]/20' : 'scale-100'}`}>
                  <img
                    src={allCategoryProducts[cat][0]?.image}
                    className="w-full h-full object-cover mix-blend-multiply p-1"
                    alt={cat}
                  />
                </div>
                <span className={`text-[10px] text-center leading-tight font-bold transition-colors ${activeCategory === cat ? 'text-[#2874f0]' : 'text-slate-500'
                  }`}>
                  {cat}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Right Content - Scrollable */}
        <div className={`flex-1 overflow-y-auto pb-32 h-[calc(100vh-60px)] px-4 pt-4 bg-white ${searchQuery.trim() ? 'w-full' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[17px] font-black text-slate-900 tracking-tight">
              {searchQuery.trim() ? `Results for "${searchQuery}"` : `${activeCategory} Collections`}
            </h2>
            {!searchQuery.trim() && (
              <span className="text-[11px] font-bold text-[#2874f0] bg-blue-50 px-2 py-1 rounded">View All</span>
            )}
          </div>

          {/* Dynamic Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-transform animate-in fade-in zoom-in duration-300"
                >
                  <div
                    className="aspect-square bg-gray-50 p-3 relative cursor-pointer active:scale-[0.98]"
                    onClick={() => navigate('/vendor/product-detail', { state: { product } })}
                  >
                    <img
                      src={product.image}
                      className="w-full h-full object-contain mix-blend-multiply pointer-events-none"
                      alt={product.name}
                    />
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleWishlistClick(product);
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleWishlistClick(product);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all hover:bg-white cursor-pointer z-20"
                    >
                      <Heart
                        size={14}
                        className={`transition-all ${isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                      />
                    </div>
                  </div>
                  <div
                    className="p-3 cursor-pointer active:bg-gray-50"
                    onClick={() => navigate('/vendor/product-detail', { state: { product } })}
                  >
                    <h3 className="text-[13px] font-medium text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center bg-green-700 text-white px-1 py-0.5 rounded-sm text-[9px] font-black">
                        {product.rating} <StarIcon size={8} fill="white" className="ml-0.5" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">(5k+)</span>
                      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-3 ml-auto" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-black text-slate-900">₹{product.price}</span>
                      <span className="text-[11px] text-gray-400 line-through">₹{product.oldPrice}</span>
                      <span className="text-[11px] font-black text-green-600">{product.discount}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : searchQuery.trim() ? (
              <div className="col-span-2 py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                  <Search size={24} className="text-gray-300" />
                </div>
                <p className="text-slate-900 font-black text-[18px]">No products found</p>
                <p className="text-gray-400 text-[13px] mt-2">Try searching for different keywords or categories</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-[#2874f0] font-black text-[14px] border border-[#2874f0] px-6 py-2 rounded-full active:scale-95 transition-transform"
                >
                  Clear Search
                </button>
              </div>
            ) : null}
          </div>

          {/* Extra Section for "For You" (Hidden during search) */}
          {!searchQuery.trim() && activeCategory === 'For You' && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-[15px] font-black text-slate-900 mb-4">New & Upcoming Launches</h3>
              <div className="grid grid-cols-3 gap-3">
                {launches.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="aspect-square bg-[#f0f5ff] rounded-xl overflow-hidden relative p-2">
                      <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt="launch" />
                      {item.status && (
                        <div className={`absolute bottom-0 left-0 right-0 ${item.color} text-white text-[7px] font-black py-1 text-center uppercase tracking-tighter`}>
                          {item.status}
                        </div>
                      )}
                    </div>
                    <p className="text-[9px] font-bold text-slate-600 leading-tight text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Banner */}
          {!searchQuery.trim() && (
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                <Truck size={24} className="text-[#2874f0]" />
              </div>
              <p className="text-[12px] font-black text-slate-800 uppercase tracking-wider mb-1">Fastest Delivery</p>
              <p className="text-[11px] text-gray-500">Across 20,000+ pincodes in India</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
