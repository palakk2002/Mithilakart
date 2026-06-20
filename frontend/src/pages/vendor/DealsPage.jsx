import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Camera, Mic, Scan, Star, Heart, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import useAccountStore from '../../store/useAccountStore';

const DealsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionTitle = location.state?.title || 'Deals for you';
  const { isDarkMode } = useAccountStore();
  
  const [wishlisted, setWishlisted] = useState({});

  // Data mapping for different sections
  const dealsData = {
    'Deals for you': [
      { id: 101, name: 'Samsung Galaxy S24 Ultra (Titanium Gray)', brand: 'SAMSUNG', price: '1,29,999', mrp: '1,34,999', discount: '52% off', rating: '4.8', reviews: '12k', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', label: 'Limited time deal' },
      { id: 102, name: 'Sony WH-1000XM5 Wireless Headphones', brand: 'SONY', price: '29,990', mrp: '34,990', discount: '15% off', rating: '4.9', reviews: '8k', image: 'https://images.unsplash.com/photo-1670057037305-64d84711833d?w=400', label: 'Limited time deal' },
      { id: 103, name: 'Apple iPhone 15 Pro (Natural Titanium)', brand: 'APPLE', price: '1,27,990', mrp: '1,34,900', discount: '5% off', rating: '4.7', reviews: '15k', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400', label: 'Limited time deal' },
      { id: 104, name: 'Dell XPS 13 Plus Laptop', brand: 'DELL', price: '1,45,990', mrp: '1,58,000', discount: '8% off', rating: '4.6', reviews: '2k', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', label: 'Limited time deal' },
      { id: 105, name: 'Apple Watch Ultra 2 (GPS + Cellular)', brand: 'APPLE', price: '89,900', mrp: '94,900', discount: '5% off', rating: '4.8', reviews: '1.5k', image: 'https://images.unsplash.com/photo-1695213601569-8088019316d3?w=400', label: 'Limited time deal' },
      { id: 106, name: 'Nikon Z8 Mirrorless Camera Body', brand: 'NIKON', price: '3,43,995', mrp: '3,65,000', discount: '6% off', rating: '4.9', reviews: '500', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', label: 'Limited time deal' },
    ],
    'Shoes & Handbags': [
      { id: 201, name: 'Nike Air Max Alpha Trainers', brand: 'NIKE', price: '7,495', mrp: '9,995', discount: '25% off', rating: '4.5', reviews: '3k', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', label: 'Limited time deal' },
      { id: 202, name: 'Adidas Ultraboost Light Shoes', brand: 'ADIDAS', price: '14,999', mrp: '18,999', discount: '21% off', rating: '4.7', reviews: '5k', image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400', label: 'Limited time deal' },
      { id: 203, name: 'Puma RS-X Reinvent Sneakers', brand: 'PUMA', price: '6,499', mrp: '8,999', discount: '27% off', rating: '4.4', reviews: '2k', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', label: 'Limited time deal' },
      { id: 204, name: 'Premium Leather Tote Bag', brand: 'LAVIE', price: '2,499', mrp: '4,999', discount: '50% off', rating: '4.3', reviews: '1k', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', label: 'Limited time deal' },
    ],
    'Recommended': [
      { id: 301, name: 'Logitech MX Master 3S Mouse', brand: 'LOGITECH', price: '9,495', mrp: '10,995', discount: '14% off', rating: '4.9', reviews: '1k', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400', label: 'Limited time deal' },
      { id: 302, name: 'Kindle Paperwhite (16 GB)', brand: 'AMAZON', price: '13,999', mrp: '14,999', discount: '7% off', rating: '4.8', reviews: '4k', image: 'https://images.unsplash.com/photo-1594980596277-536e4b966ab0?w=400', label: 'Limited time deal' },
      { id: 305, name: 'AirPods Pro (2nd Gen) with MagSafe', brand: 'APPLE', price: '24,900', mrp: '26,900', discount: '7% off', rating: '4.8', reviews: '45k', image: 'https://images.unsplash.com/photo-1588423770619-81bc09312a32?w=400', label: 'Limited time deal' },
    ],
    'Must-haves': [
      { id: 401, name: 'Samsung S24 Ultra', brand: 'SAMSUNG', price: '69,999', mrp: '79,999', discount: '12% off', rating: '4.7', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', label: 'Top Pick' },
      { id: 402, name: 'Asus Vivobook Laptop', brand: 'ASUS', price: '45,990', mrp: '55,000', discount: '16% off', rating: '4.5', reviews: '1k', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', label: 'Top Pick' },
      { id: 404, name: 'Gold Finish Pendant', brand: 'MITHILAKART', price: '3,499', mrp: '4,999', discount: '30% off', rating: '4.9', reviews: '800', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', label: 'Top Pick' },
      { id: 407, name: 'Noise Buds Wireless', brand: 'NOISE', price: '1,999', mrp: '2,999', discount: '33% off', rating: '4.4', reviews: '2k', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', label: 'Top Pick' },
    ]
  };

  const products = dealsData[sectionTitle] || dealsData['Deals for you'];

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, price: product.price, image: product.image });
    }
    localStorage.setItem('userCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlisted(prev => ({ ...prev, [id]: !prev[id] }));
    toast.success(wishlisted[id] ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen pb-20 transition-colors duration-500 bg-[#f8f9fa] text-slate-900"
    >
      {/* Premium Adaptive Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-md border-b p-3 transition-all ${isDarkMode ? 'bg-black/90 border-[var(--color-gold)]/20' : 'bg-white/90 border-gray-200 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={isDarkMode ? 'text-[var(--color-gold)]' : 'text-slate-800'}>
            <ArrowLeft size={24} />
          </button>
          <div className={`flex-1 flex items-center border rounded-xl px-4 py-2.5 transition-all ${isDarkMode ? 'bg-[#121212] border-[var(--color-gold)]/30' : 'bg-gray-100 border-gray-300'}`}>
             <Search size={18} className={isDarkMode ? 'text-[var(--color-gold)]' : 'text-gray-400'} />
             <input 
               type="text" 
               placeholder="Search items, brands, categories..."
               className={`bg-transparent border-none outline-none flex-1 px-3 text-sm font-bold placeholder:text-gray-500 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
             />
             <div className="flex items-center gap-3 text-gray-500">
                <Camera size={18} />
                <Mic size={18} />
                <Scan size={18} />
             </div>
          </div>
        </div>

        {/* Adaptive Page Title */}
        <div className="mt-4 px-1">
           <h1 className={`text-lg font-black uppercase tracking-[2px] ${isDarkMode ? 'text-[var(--color-gold)]' : 'text-slate-900'}`}>{sectionTitle}</h1>
           <div className={`w-10 h-1 mt-1 rounded-full ${isDarkMode ? 'bg-[var(--color-gold)] shadow-[0_0_10px_rgba(226,167,80,0.5)]' : 'bg-primary-dark shadow-sm'}`}></div>
        </div>
      </div>

      {/* Product List - Adaptive Grid */}
      <div className={`grid grid-cols-2 gap-px border-b ${isDarkMode ? 'bg-[var(--card-border)]/20 border-[var(--card-border)]/20' : 'bg-gray-200 border-gray-200'}`}>
         {products.map((product) => (
           <div 
             key={product.id} 
             onClick={() => navigate('/vendor/product-detail', { state: { product } })}
             className={`p-4 flex flex-col relative group border-[0.5px] transition-all ${isDarkMode ? 'bg-black border-[var(--card-border)]/10' : 'bg-white border-gray-100'}`}
           >
              {/* Adaptive Wishlist Button */}
              <button 
                onClick={(e) => toggleWishlist(product.id, e)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border shadow-lg active:scale-90 transition-all ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white/80 border-gray-100'}`}
              >
                 <Heart size={18} className={wishlisted[product.id] ? "fill-red-500 text-red-500" : (isDarkMode ? "text-white/60" : "text-gray-400")} />
              </button>

              {/* Adaptive Image Container */}
              <div className={`aspect-square w-full mb-4 flex items-center justify-center p-4 relative rounded-2xl border overflow-hidden transition-all ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-gray-50 border-gray-200/50'}`}>
                 <img src={product.image} alt={product.name} className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ${isDarkMode ? 'mix-blend-lighten' : ''}`} />
                 
                 {/* Adaptive Quick Add Button */}
                 <button 
                   onClick={(e) => handleAddToCart(product, e)}
                   className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all hover:scale-110 z-20 ${isDarkMode ? 'bg-[var(--color-gold)] shadow-[0_5px_15px_rgba(226,167,80,0.4)]' : 'bg-primary-dark text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]'}`}
                 >
                    <Plus size={24} className={isDarkMode ? "text-black" : "text-white"} />
                 </button>
              </div>

              {/* Info */}
              <div className="space-y-1.5 px-1">
                 <div className="flex items-center gap-2">
                    <span className="bg-[#cc0c39] text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-md">{product.discount}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[var(--color-gold)]' : 'text-primary-dark'}`}>{product.label}</span>
                 </div>

                 <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-black text-gray-500 mt-1 uppercase">₹</span>
                    <span className={`text-xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.price}</span>
                    <span className="text-[10px] text-gray-500 line-through font-bold">₹{product.mrp}</span>
                 </div>

                 <h3 className={`text-[12px] font-black line-clamp-2 leading-relaxed h-[36px] tracking-tight ${isDarkMode ? 'text-white/90' : 'text-slate-700'}`}>
                    {product.name}
                 </h3>

                 <button className={`text-[11px] font-black transition-colors uppercase tracking-widest mt-1 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-primary-dark hover:text-blue-700'}`}>
                    Shop {product.brand} deals
                 </button>

                 <div className={`flex items-center justify-between mt-2 pt-2 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-1">
                       <div className="flex gap-0.5">
                          {[1,2,3,4].map(i => <Star key={i} size={10} className={`${isDarkMode ? 'text-[var(--color-gold)] fill-[var(--color-gold)]' : 'text-orange-400 fill-orange-400'} shadow-sm`} />)}
                          <Star size={10} className="text-gray-300 fill-gray-300" />
                       </div>
                       <span className="text-[10px] text-gray-500 font-black">({product.reviews})</span>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </motion.div>
  );
};

export default DealsPage;

