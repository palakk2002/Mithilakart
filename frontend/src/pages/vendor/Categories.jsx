import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Camera, ShoppingCart, ArrowLeft,
  ChevronRight, Star, Info, Bell, Zap, PlayCircle,
  LayoutGrid, User, Home, Smartphone, Truck, Heart, X, Star as StarIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { allCategoryProducts } from '../../data/categoryData';

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.category || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    setActiveSubcategory('All');
  }, [activeCategory]);

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
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleAddToCart = useCallback((product) => {
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
    cart.push({ ...product, cartId: Date.now(), qty: 1 });
    localStorage.setItem('userCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage(`Added ${product.name} to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const categories = useMemo(() => Object.keys(allCategoryProducts), []);

  const shopCategorySections = useMemo(() => [
    {
      title: 'Style & Beauty',
      items: [
        { label: 'Beauty & Care', categoryName: 'Beauty', image: allCategoryProducts['Beauty']?.[0]?.image || '' },
        { label: 'Fashion Apparel', categoryName: 'Fashion', image: allCategoryProducts['Fashion']?.[0]?.image || '' },
        { label: 'Fine Jewellery', categoryName: 'Jewellery', image: allCategoryProducts['Jewellery']?.[0]?.image || '' }
      ]
    },
    {
      title: 'Home & Play',
      items: [
        { label: 'Gifts & Festive', categoryName: 'Gifting', image: allCategoryProducts['Gifting']?.[0]?.image || '' },
        { label: 'Kids & Toys', categoryName: 'Toys', image: allCategoryProducts['Toys']?.[0]?.image || '' },
        { label: 'Stationery & Art', categoryName: 'Stationery', image: allCategoryProducts['Stationery']?.[0]?.image || '' }
      ]
    },
    {
      title: 'Gadgets & Power',
      items: [
        { label: 'Smart Tech', categoryName: 'Electronics', image: allCategoryProducts['Electronics']?.[0]?.image || '' },
        { label: 'Home Electrical', categoryName: 'Electrical', image: allCategoryProducts['Electrical']?.[0]?.image || '' }
      ]
    }
  ], []);

  const subcategoriesData = useMemo(() => ({
    'All': [
      { id: 'all-1', name: 'Best Sellers', icon: '🔥' },
      { id: 'all-2', name: 'New Arrivals', icon: '✨' },
      { id: 'all-3', name: 'Top Offers', icon: '🏷️' },
      { id: 'all-4', name: 'Trending Now', icon: '📈' },
    ],
    'Beauty': [
      { id: 'b-sub-1', name: 'Lip Care & Makeup', icon: '💄' },
      { id: 'b-sub-2', name: 'Hair Care', icon: '💆‍♀️' },
      { id: 'b-sub-3', name: 'Skin Care', icon: '🧴' },
    ],
    'Gifting': [
      { id: 'g-sub-1', name: 'Gift Boxes', icon: '🎁' },
      { id: 'g-sub-2', name: 'Home Decor', icon: '🏡' },
      { id: 'g-sub-3', name: 'Personalized', icon: '🎨' },
    ],
    'Electronics': [
      { id: 'e-sub-1', name: 'Smartphones', icon: '📱' },
      { id: 'e-sub-2', name: 'Audio', icon: '🎧' },
      { id: 'e-sub-3', name: 'Laptops & Accessories', icon: '💻' },
    ],
    'Jewellery': [
      { id: 'j-sub-1', name: 'Necklaces & Pendants', icon: '📿' },
      { id: 'j-sub-2', name: 'Earrings', icon: '💎' },
      { id: 'j-sub-3', name: 'Rings & Bracelets', icon: '💍' },
    ],
    'Toys': [
      { id: 't-sub-1', name: 'Building Blocks', icon: '🧱' },
      { id: 't-sub-2', name: 'Vehicles', icon: '🚗' },
      { id: 't-sub-3', name: 'Soft Toys', icon: '🧸' },
    ],
    'Stationery': [
      { id: 's-sub-1', name: 'Notebooks', icon: '📓' },
      { id: 's-sub-2', name: 'Pens & Markers', icon: '🖊️' },
      { id: 's-sub-3', name: 'Organizers', icon: '🗂️' },
    ]
  }), []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    Object.values(allCategoryProducts).forEach(categoryItems => {
      categoryItems.forEach(product => {
        if (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.shortDescription && product.shortDescription.toLowerCase().includes(query))
        ) {
          if (!results.find(p => p.id === product.id)) {
            results.push(product);
          }
        }
      });
    });
    return results;
  }, [searchQuery]);

  const filteredBySubcategoryProducts = useMemo(() => {
    const baseProducts = searchQuery.trim() ? filteredProducts : (allCategoryProducts[activeCategory] || []);
    if (activeSubcategory === 'All') return baseProducts;

    const sub = activeSubcategory.toLowerCase();
    return baseProducts.filter(p => {
      const name = p.name.toLowerCase();
      const desc = (p.shortDescription || '').toLowerCase();
      
      if (sub.includes('lip') || sub.includes('makeup')) {
        return name.includes('lip') || name.includes('mascara') || name.includes('makeup') || desc.includes('lip') || desc.includes('mascara') || desc.includes('makeup');
      }
      if (sub.includes('hair')) {
        return name.includes('shampoo') || name.includes('serum') || name.includes('mask') || name.includes('hair') || desc.includes('shampoo') || desc.includes('serum') || desc.includes('mask') || desc.includes('hair');
      }
      if (sub.includes('skin')) {
        return name.includes('serum') || name.includes('cream') || name.includes('face') || desc.includes('serum') || desc.includes('cream') || desc.includes('face');
      }
      if (sub.includes('phone') || sub.includes('smartphone')) {
        return name.includes('s24') || name.includes('phone') || desc.includes('s24') || desc.includes('phone');
      }
      if (sub.includes('audio')) {
        return name.includes('earbuds') || name.includes('headphone') || desc.includes('earbuds') || desc.includes('headphone');
      }
      if (sub.includes('laptop') || sub.includes('accessories')) {
        return name.includes('laptop') || name.includes('keyboard') || name.includes('mouse') || desc.includes('laptop') || desc.includes('keyboard') || desc.includes('mouse');
      }
      if (sub.includes('gift boxes') || sub.includes('gift')) {
        return name.includes('box') || name.includes('candle') || name.includes('spa') || desc.includes('box') || desc.includes('candle') || desc.includes('spa');
      }
      if (sub.includes('decor')) {
        return name.includes('plant') || name.includes('frame') || name.includes('candle') || desc.includes('plant') || desc.includes('frame') || desc.includes('candle');
      }
      if (sub.includes('personalized')) {
        return name.includes('frame') || name.includes('mug') || name.includes('wallet') || desc.includes('frame') || desc.includes('mug') || desc.includes('wallet');
      }
      if (sub.includes('necklace') || sub.includes('pendant')) {
        return name.includes('pendant') || name.includes('necklace') || desc.includes('pendant') || desc.includes('necklace');
      }
      if (sub.includes('earring')) {
        return name.includes('earring') || name.includes('stud') || desc.includes('earring') || desc.includes('stud');
      }
      if (sub.includes('ring') || sub.includes('bracelet')) {
        return name.includes('ring') || name.includes('bracelet') || name.includes('chain') || desc.includes('ring') || desc.includes('bracelet') || desc.includes('chain');
      }
      if (sub.includes('blocks') || sub.includes('bricks') || sub.includes('learning')) {
        return name.includes('blocks') || name.includes('bricks') || name.includes('puzzle') || desc.includes('blocks') || desc.includes('bricks') || desc.includes('puzzle');
      }
      if (sub.includes('vehicle')) {
        return name.includes('car') || name.includes('toy') || desc.includes('car') || desc.includes('toy');
      }
      if (sub.includes('soft')) {
        return name.includes('teddy') || name.includes('plush') || desc.includes('teddy') || desc.includes('plush');
      }
      if (sub.includes('notebook')) {
        return name.includes('notebook') || name.includes('sketchbook') || desc.includes('notebook') || desc.includes('sketchbook');
      }
      if (sub.includes('pen') || sub.includes('marker')) {
        return name.includes('pen') || name.includes('highlighter') || name.includes('marker') || desc.includes('pen') || desc.includes('highlighter') || desc.includes('marker');
      }
      if (sub.includes('organizer')) {
        return name.includes('organizer') || desc.includes('organizer');
      }
      return true;
    });
  }, [searchQuery, filteredProducts, activeCategory, activeSubcategory]);

  const currentProducts = useMemo(() => {
    return filteredBySubcategoryProducts;
  }, [filteredBySubcategoryProducts]);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans relative">
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#084224] text-white text-[11px] font-black px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Zap size={12} className="text-yellow-400 fill-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          {!isSearchVisible ? (
            <>
              <button onClick={() => {
                if (activeCategory !== 'All') {
                  setActiveCategory('All');
                } else {
                  navigate(-1);
                }
              }}>
                <ArrowLeft size={22} className="text-slate-800" />
              </button>
              <h1 className="text-[19px] font-bold text-slate-800 tracking-tight">Categories</h1>
            </>
          ) : (
            <div className="flex items-center gap-3 w-full animate-in slide-in-from-right duration-200">
              <button onClick={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}>
                <ArrowLeft size={22} className="text-[#084224]" />
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
              </div>
            </div>
          )}
        </div>

        {!isSearchVisible && (
          <div className="flex items-center gap-5 ml-4">
            <Search size={22} className="text-slate-800 cursor-pointer" onClick={() => setIsSearchVisible(true)} />
            <div onClick={() => navigate('/vendor/cart')} className="relative cursor-pointer">
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
        {!searchQuery.trim() && activeCategory !== 'All' && (
          <div className="w-[82px] bg-[#f3f4f6] border-r border-gray-200 overflow-y-auto no-scrollbar h-[calc(100vh-60px)] py-2">
            <div
              onClick={() => setActiveCategory('All')}
              className="py-3 px-1.5 flex flex-col items-center gap-1 cursor-pointer transition-all relative w-full"
            >
              <div className="w-[52px] h-[52px] rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-gray-200/60 active:scale-95">
                <LayoutGrid size={22} className="text-[#084224]" />
              </div>
              <span className="text-[9.5px] text-center leading-tight font-extrabold tracking-tight mt-1 text-slate-500">
                All Grid
              </span>
            </div>
            {categories.map((cat) => (
              cat !== 'All' && (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="py-3 px-1.5 flex flex-col items-center gap-1 cursor-pointer transition-all relative w-full"
                >
                  {activeCategory === cat && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#084224] rounded-r-md" />
                  )}
                  <div className={`w-[52px] h-[52px] rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border transition-all ${
                    activeCategory === cat ? 'scale-105 border-[#084224]/50 border-2' : 'border-gray-200/60'
                  }`}>
                    <img
                      src={allCategoryProducts[cat][0]?.image}
                      className="w-full h-full object-contain p-1.5"
                      alt={cat}
                    />
                  </div>
                  <span className={`text-[9.5px] text-center leading-tight font-extrabold tracking-tight mt-1 transition-colors ${
                    activeCategory === cat ? 'text-[#084224]' : 'text-slate-500'
                  }`}>
                    {cat}
                  </span>
                </div>
              )
            ))}
          </div>
        )}

        <div className={`flex-1 flex flex-col h-[calc(100vh-60px)] bg-white ${searchQuery.trim() ? 'w-full' : ''}`}>
          {activeCategory === 'All' && !searchQuery.trim() ? (
            <div className="flex-1 bg-[#f5f8fa] px-3 py-3 overflow-y-auto pb-32">
              {shopCategorySections.map((section, sIdx) => (
                <div key={sIdx} className="mb-6">
                  <h3 className="text-[13px] font-black text-slate-800 tracking-tight mb-2.5 pl-1 uppercase">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveCategory(item.categoryName)}
                        className="bg-white rounded-xl border border-[#e1eff9] p-2 flex flex-col justify-between shadow-[0_1px_5px_rgba(0,0,0,0.015)] active:scale-95 transition-all text-center cursor-pointer h-28 hover:shadow-md hover:border-blue-100"
                      >
                        <span className="text-[10px] font-bold text-slate-800 tracking-tight leading-tight block w-full mt-0.5 mb-1 px-0.5 line-clamp-1">
                          {item.label}
                        </span>
                        <div className="h-16 w-full rounded-lg overflow-hidden flex items-center justify-center bg-slate-50/50 p-1.5">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="w-full bg-[#e0f7fa] text-[#006064] text-[10.5px] font-black py-2.5 text-center mt-8 rounded-xl uppercase tracking-wider">
                FREE DELIVERY on orders above ₹99
              </div>
            </div>
          ) : (
            <>
              {!searchQuery.trim() && (
                <div className="flex overflow-x-auto w-full gap-2 px-3 py-2 bg-white border-b border-gray-100 no-scrollbar">
                  <button
                    onClick={() => setActiveSubcategory('All')}
                    className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                      activeSubcategory === 'All' ? 'bg-[#e8f5e9] text-[#084224] border-[#084224]/40' : 'bg-white text-slate-700 border-gray-200'
                    }`}
                  >
                    <span className="text-[10px]">🍎</span>
                    All
                  </button>
                  {(subcategoriesData[activeCategory] || []).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubcategory(sub.name)}
                      className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                        activeSubcategory === sub.name ? 'bg-[#e8f5e9] text-[#084224] border-[#084224]/40' : 'bg-white text-slate-700 border-gray-200'
                      }`}
                    >
                      <span className="text-[10px]">{sub.icon}</span>
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-3 pt-3 pb-32">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">
                    {searchQuery.trim() ? `Results for "${searchQuery}"` : `${activeCategory} - ${activeSubcategory}`}
                  </h2>
                  {!searchQuery.trim() && (
                    <span className="text-[10px] font-bold text-[#084224] bg-green-50 px-2 py-0.5 rounded border border-green-100">
                      {currentProducts.length} Items
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm flex flex-col p-2 relative h-full hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2 relative">
                          <img
                            src={product.image}
                            className="w-full h-full object-contain mix-blend-multiply cursor-pointer active:scale-98 transition-transform"
                            alt={product.name}
                            onClick={() => navigate('/vendor/product-detail', { state: { product } })}
                          />
                          <button
                            onClick={(e) => { e.stopPropagation(); handleWishlistClick(product); }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all hover:bg-white z-20"
                          >
                            <Heart
                              size={13}
                              className={`transition-all ${isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                            />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                            className="absolute bottom-1 right-1 w-7 h-7 bg-white border border-[#084224] text-[#084224] rounded-lg flex items-center justify-center shadow-sm font-bold text-[16px] active:scale-90 hover:bg-[#e8f5e9] transition-all z-20"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex flex-col flex-1 pt-1.5">
                          <div className="inline-block self-start bg-[#fff300] text-black text-[8px] font-black px-1 py-0.5 rounded-sm mb-1 uppercase tracking-wider leading-none">
                            {product.discount || 'Special Offer'}
                          </div>
                          <div className="flex items-baseline gap-1.5 mb-0.5">
                            <span className="text-[13px] font-black text-slate-900">₹{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-[10px] text-gray-400 line-through">₹{product.oldPrice}</span>
                            )}
                          </div>
                          <p className="text-[8px] font-black text-gray-400 tracking-wider uppercase mb-0.5">FRESHO!</p>
                          <h3
                            onClick={() => navigate('/vendor/product-detail', { state: { product } })}
                            className="text-[11px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[30px] mb-1.5 cursor-pointer hover:text-[#084224]"
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between border border-gray-150 rounded px-1.5 py-1 text-[9.5px] font-bold text-gray-500 bg-gray-50 mb-2 cursor-pointer select-none">
                            <span>{product.category === 'Jewellery' || product.category === 'Electronics' ? '1 unit' : '250 g'}</span>
                            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <div className="flex items-center gap-1.5 mt-auto text-[9.5px] font-black text-slate-500">
                            <Zap size={11} className="text-emerald-600 fill-emerald-600 animate-pulse" />
                            <span>10 mins</span>
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
                        className="mt-6 text-[#084224] font-black text-[14px] border border-[#084224] px-6 py-2 rounded-full active:scale-95 transition-transform"
                      >
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <div className="col-span-2 py-10 text-center text-gray-400 text-[12px] font-medium">
                      No products in this subcategory
                    </div>
                  )}
                </div>
                {!searchQuery.trim() && (
                  <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                      <Truck size={24} className="text-[#084224]" />
                    </div>
                    <p className="text-[12px] font-black text-slate-800 uppercase tracking-wider mb-1">Fastest Delivery</p>
                    <p className="text-[11px] text-gray-500">Across 20,000+ pincodes in India</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;


