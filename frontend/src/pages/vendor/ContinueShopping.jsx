import React, { useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { allCategoryProducts } from '../../data/categoryData';

const ContinueShopping = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState('Trending');

  // Get product from state or find in data
  const clickedProduct = useMemo(() => {
    if (state?.product) return state.product;
    
    // Search in all categories if not in state
    for (const cat in allCategoryProducts) {
      const p = allCategoryProducts[cat].find(item => item.id === productId);
      if (p) return p;
    }
    
    // Fallback product if not found
    return {
      id: productId,
      name: 'Premium Product',
      category: 'Fashion',
      price: 1299,
      oldPrice: 2499,
      discount: '48% OFF',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400',
      brand: 'Drasert'
    };
  }, [productId, state]);

  // Get another related product for the "Recently Viewed" section
  const relatedRecentlyViewed = useMemo(() => {
    const categoryProducts = allCategoryProducts[clickedProduct.category] || allCategoryProducts['For You'];
    return categoryProducts.find(p => p.id !== clickedProduct.id) || categoryProducts[0];
  }, [clickedProduct]);

  // Similar products for the bottom section
  const similarProducts = useMemo(() => {
    let products = allCategoryProducts[clickedProduct.category] || allCategoryProducts['For You'];
    products = products.filter(p => p.id !== clickedProduct.id);

    // Apply filter logic
    if (activeFilter === 'High rated') {
      return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
    }
    if (activeFilter === 'Best seller') {
      return [...products].reverse().slice(0, 10);
    }
    if (activeFilter === 'Brand name') {
      return [...products].sort((a, b) => (a.brand || '').localeCompare(b.brand || '')).slice(0, 10);
    }
    
    return products.slice(0, 10);
  }, [clickedProduct, activeFilter]);

  const filters = ['Trending', 'High rated', 'Best seller', 'Brand name', 'Color'];

  const handleProductClick = (product) => {
    navigate('/vendor/product-detail', { state: { product } });
  };

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="text-[16px] font-bold text-gray-800 tracking-tight">Continue Your Shopping</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <Search size={20} className="text-gray-600" />
          <div className="relative">
            <ShoppingCart size={20} className="text-gray-600" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#cc0c39] text-white text-[9px] font-black px-1 py-0.5 rounded-full border border-white">
              9
            </span>
          </div>
        </div>
      </header>

      <div className="px-3 py-4">
        {/* Section 1: Recently Viewed */}
        <div className="mb-5">
          <h2 className="text-[18px] font-bold text-gray-900 mb-2 tracking-tight">Recently Viewed</h2>

          <div className="grid grid-cols-2 gap-2.5">
            {[clickedProduct, relatedRecentlyViewed].map((product, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <div className="absolute top-1 left-1 bg-black/70 text-white text-[7px] font-black px-1 py-0.5 rounded-none tracking-tighter">
                      LAST VIEWED
                    </div>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-none mb-0.5">{product.brand || 'Lounge Dreams'}</p>
                  <h3 className="text-[11px] font-medium text-gray-800 line-clamp-1 leading-tight mb-0.5">{product.name}</h3>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-[9px] text-gray-400 line-through">₹{product.oldPrice}</span>
                    <span className="text-[12px] font-black text-gray-900">₹{product.price}</span>
                    <span className="text-[9px] font-bold text-green-600">{product.discount || '50% off'}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center gap-0.5 bg-green-600 px-1 py-0.5 rounded-none h-3.5">
                      <span className="text-[8px] font-black text-white">4.2</span>
                      <Star size={6} fill="white" className="text-white" />
                    </div>
                    <span className="text-[8px] text-gray-400 font-bold">(2,450)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Section 2: Similar Products + Filters */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">Similar Products</h2>
          </div>


          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-3 px-3">
            {filters.map((filter, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#2874f0] border-[#2874f0] text-white shadow-md scale-105' 
                    : 'bg-white border-gray-200 text-gray-600 shadow-sm'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Horizontal Similar Product List */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar -mx-3 px-3 pb-4">
          {similarProducts.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 w-[135px] bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-1.5">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tight mb-0.5 leading-none">{product.brand || 'Adam Phillip'}</p>
                <h3 className="text-[10px] font-medium text-gray-800 line-clamp-1 mb-0.5 leading-tight">{product.name}</h3>
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-[8px] text-gray-400 line-through">₹{product.oldPrice}</span>
                  <span className="text-[12px] font-black text-gray-900">₹{product.price}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] font-bold text-green-600">{product.discount}</span>
                </div>
                <div className="flex flex-col gap-0 mt-1">
                  <p className="text-[8px] font-bold text-slate-500 flex items-center gap-0.5">
                    Or Pay ₹{Math.round(product.price * 0.95)} <span className="bg-yellow-400 text-[7px] px-0.5 rounded-none text-white leading-none">★</span> 28
                  </p>
                  <p className="text-[8px] font-black text-[#2874f0] uppercase tracking-tighter mt-0.5">FREE DELIVERY</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-2" />
        </div>

        {/* Section 4: Explore Similar Trends */}
        <div className="mt-8 mb-6">
          <h2 className="text-[18px] font-bold text-gray-900 mb-3 tracking-tight">Explore Similar Trends</h2>
          
          {/* Trend Hashtags */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 -mx-3 px-3">
            {['#Gingham', '#Oversized', '#SummerStripe', '#RetroCheck', '#PastelMix'].map((trend, idx) => (
              <button 
                key={idx}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-bold border ${
                  idx === 0 ? 'bg-[#f0f5ff] border-[#2874f0] text-[#2874f0]' : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {trend}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-3 px-3 pb-4">
            {similarProducts.slice(2, 7).map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-[145px] bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mb-0.5">{product.brand || 'CHIMPAAANZEE'}</p>
                  <h3 className="text-[11px] font-medium text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] text-gray-400 line-through">₹{product.oldPrice}</span>
                    <span className="text-[13px] font-black text-gray-900">₹{product.price}</span>
                    <span className="text-[10px] font-bold text-green-600">{product.discount}</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-500 flex items-center gap-0.5">
                    Or Pay ₹{Math.round(product.price * 0.9)} <span className="bg-yellow-400 text-[7px] px-0.5 rounded-none text-white">★</span> 40
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Bought Together */}
        <div className="mt-4 mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">Bought Together</h2>
            <button className="text-[11px] font-bold text-[#2874f0] border border-gray-200 px-3 py-1 rounded-sm shadow-sm">
              View all
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-3 px-3 pb-4">
            {similarProducts.slice(4, 9).map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-[150px] bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-0.5">{product.brand || 'hitarth fashion'}</p>
                  <h3 className="text-[12px] font-medium text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-gray-400 line-through">₹{product.oldPrice}</span>
                    <span className="text-[14px] font-black text-gray-900">₹{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold text-green-600">{product.discount}</span>
                    {Math.random() > 0.5 && (
                      <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-2.5 object-contain" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map(s => <Star key={s} size={10} fill="#16a34a" className="text-green-600" />)}
                      <Star size={10} fill="#d1d5db" className="text-gray-300" />
                    </div>
                    <span className="text-[10px] text-gray-400">(92)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Section 6: You May Also Want to Shop for */}
        <div className="mt-4 mb-12">
          <h2 className="text-[18px] font-bold text-gray-900 mb-4 tracking-tight px-0.5">You May Also Want to Shop for</h2>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-3 px-3">
            {[
              { name: "Women's Flats", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Women's Trousers", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Women's Jeans", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Women's Kurtas", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Accessories", img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=200&h=200" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-[120px] bg-white rounded-sm border border-gray-100 shadow-sm p-2 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-full aspect-square bg-gray-50 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-gray-700 text-center line-clamp-1">{item.name}</span>
              </div>
            ))}
            <div className="flex-shrink-0 w-2" />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ContinueShopping;

