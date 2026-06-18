import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ArrowLeft, Search, ShoppingCart, Star, Heart, Send,
  Share2, ChevronRight, X, MapPin, Truck, RotateCcw, IndianRupee
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAccountStore from '../../store/useAccountStore';

// Import Assets
import PlumShampoo from '../../assets/products/product05.jpg';
import FashionHero from '../../assets/products/product06.jpg';
import LorealShampoo from '../../assets/products/product07.jpg';
import EarbudsDeal from '../../assets/products/product03.jpg';
import Tshirt from '../../assets/products/product05.jpg';
import FlipFlops from '../../assets/products/product07.jpg';
import Suitcase from '../../assets/products/product09.jpg';
import TopSection1 from '../../assets/TopSection/TopSection1.jpg';
import Balloons from '../../assets/products/product10.jpg';
import SplitAC from '../../assets/products/product08.jpg';
import TowerFan from '../../assets/products/product09.jpg';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('S');
  const { wishlist, addToWishlist, removeFromWishlist } = useAccountStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [isReturnExpanded, setIsReturnExpanded] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [showSupportInfo, setShowSupportInfo] = useState(false);
  const [isSupportExpanded, setIsSupportExpanded] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(true);
  const [isAllDetailsOpen, setIsAllDetailsOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('Specifications');
  const [activePaymentTab, setActivePaymentTab] = useState('COD');
  const [touchStart, setTouchStart] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientY);
  const handleTouchMove = (e, setExpanded, isExpanded) => {
    const touchDown = e.targetTouches[0].clientY;
    if (touchStart - touchDown > 50 && !isExpanded) {
      setExpanded(true);
    }
    if (touchDown - touchStart > 100 && isExpanded) {
      setExpanded(false);
    }
  };

  const product = useMemo(() => location.state?.product || {
    id: '1',
    brand: 'Lounge Dreams',
    name: 'Women Boxy Fit Checked Casual Shirt',
    price: 1559,
    oldPrice: 2999,
    discount: '48% off',
    rating: 4.2,
    ratingCount: 4,
    image: PlumShampoo,
    category: 'Fashion'
  }, [location.state]);

  const detailsData = useMemo(() => ({
    highlights: [
      { label: 'Pack of', value: product.pack || '1' },
      { label: 'Fabric', value: product.fabric || 'Wool Blend' },
      { label: 'Sleeve', value: product.sleeve || 'Full Sleeve' },
      { label: 'Pattern', value: product.pattern || 'Checkered' },
      { label: 'Collar', value: product.collar || 'Spread' },
      { label: 'Color', value: product.color || 'Pink' }
    ],
    specs: [
      { label: 'Brand', value: product.brand },
      { label: 'Size', value: product.size || 'M' },
      { label: 'Fit', value: product.fit || 'Regular' },
      { label: 'Fabric Care', value: 'Machine wash as per tag' },
      { label: 'Suitable For', value: 'Western Wear' },
      { label: 'Hem', value: 'Curved' }
    ]
  }), [product]);

  const images = [product.image, product.image, product.image];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if product is in wishlist using global store
    setIsWishlisted(wishlist.some(item => item.id === product.id));

    // Update cart count
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
      const total = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, [product, wishlist]);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const slide = Math.round(scrollLeft / width);
    setCurrentSlide(slide);
  };

  const toggleWishlist = useCallback(() => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setToastMessage('Removed from Wishlist');
    } else {
      addToWishlist(product);
      setToastMessage('Added to Wishlist');
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [product, isWishlisted, addToWishlist, removeFromWishlist]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ₹${product.price} (${product.discount})`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData);
        setToastMessage('Shared successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage('Link copied to clipboard!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Try clipboard as final fallback
        try {
          await navigator.clipboard.writeText(window.location.href);
          setToastMessage('Link copied to clipboard!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        } catch (clipboardError) {
          setToastMessage('Unable to share');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      }
    }
  };

  const handleAddToCart = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
    cart.push({ ...product, cartId: Date.now(), qty: 1 });
    localStorage.setItem('userCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage('Added to cart');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [product]);

  const handleBuyNow = useCallback(() => {
    navigate('/vendor/checkout', { state: { product } });
  }, [product, navigate]);

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-900">
      {/* Top Header - Search Style - Compact */}
      <div className="sticky top-0 z-50 bg-white px-3 py-1.5 flex items-center gap-2.5 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-slate-800 p-1">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 bg-white border border-[#2874f0] rounded-sm px-2.5 py-1.5 flex items-center gap-2">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for products" 
            className="bg-transparent outline-none text-[13px] w-full placeholder:text-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/vendor/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
          />
        </div>
        <div 
          onClick={() => navigate('/vendor/cart')} 
          className="relative p-1 active:scale-95 transition-transform cursor-pointer"
        >
          <ShoppingCart size={22} className="text-slate-800" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#cc0c39] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white leading-none">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Product Image Carousel - Cover Style */}
      <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
        <div 
          className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={handleScroll}
        >
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative">
              <img src={img} alt={product.name} className="w-full h-full object-cover" />
              
              {/* Highlight Overlay on Second Slide */}
              {idx === 1 && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] p-5 flex flex-col justify-start pt-10 text-white z-10">
                  <h2 className="text-[20px] font-black mb-4 drop-shadow-md uppercase tracking-tight">Key Highlights</h2>
                  
                  <div className="space-y-2.5 max-h-[70%] overflow-hidden">
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">Fit</p>
                      <p className="text-[15px] font-black drop-shadow-sm">{product.fit || 'Boxy'}</p>
                    </div>
                    <div className="w-8 h-[1px] bg-white/30" />
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">Collar</p>
                      <p className="text-[15px] font-black drop-shadow-sm">{product.collar || 'Spread'}</p>
                    </div>
                    <div className="w-8 h-[1px] bg-white/30" />
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">Fabric</p>
                      <p className="text-[15px] font-black drop-shadow-sm">{product.fabric || 'Wool Blend'}</p>
                    </div>
                    <div className="w-8 h-[1px] bg-white/30" />
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">Pattern</p>
                      <p className="text-[15px] font-black drop-shadow-sm">{product.pattern || 'Checkered'}</p>
                    </div>
                    <div className="w-8 h-[1px] bg-white/30" />
                    <div>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">Occasion</p>
                      <p className="text-[15px] font-black drop-shadow-sm">Casual</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Wishlist & Share Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-3 z-10">
          <button 
            onClick={toggleWishlist}
            className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
          >
            <Heart size={18} className={isWishlisted ? "text-red-500 fill-red-500" : "text-slate-700"} />
          </button>
          <button 
            onClick={handleShare}
            className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
          >
            <Send size={16} className="text-slate-700" />
          </button>
        </div>

        {/* Rating Badge - Compact */}
        <div className="absolute bottom-4 left-3 bg-white/90 px-1.5 py-0.5 rounded-sm border border-gray-200 flex items-center gap-1 shadow-sm z-10">
          <div className="flex items-center gap-0.5">
            <span className="text-[11px] font-bold text-slate-800">{product.rating}</span>
            <Star size={8} fill="#15803d" className="text-green-700" />
          </div>
          <div className="w-[1px] h-2.5 bg-gray-300 mx-0.5" />
          <span className="text-[10px] font-medium text-slate-500">{product.ratingCount}</span>
        </div>

        {/* Carousel Indicator Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-10">
          <div 
            className="h-full bg-slate-800 transition-all duration-300 ease-out" 
            style={{ width: `${(1 / images.length) * 100}%`, transform: `translateX(${currentSlide * 100}%)` }}
          />
        </div>
      </div>


      {/* Product Title & Price Section */}
      <div className="px-3 py-3">
        <h1 className="text-[16px] font-medium text-slate-800 leading-tight mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-600 font-bold text-[16px]">
            <span className="text-[14px] mr-0.5">↓</span>
            <span>48%</span>
          </div>
          <span className="text-[16px] text-gray-400 line-through">₹{product.oldPrice}</span>
          <span className="text-[22px] font-black text-slate-900">₹{product.price}</span>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="px-3 mb-4">
        <h3 className="text-[15px] font-black uppercase tracking-tight text-slate-900 mb-3">Delivery details</h3>
        <div className="space-y-0.5">
          {/* Address */}
          <div className="bg-white border border-gray-100 rounded-t-lg p-2.5 flex items-center gap-3">
            <div className="bg-gray-50 p-1.5 rounded-md">
              <MapPin size={18} className="text-slate-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black text-slate-800 uppercase tracking-tight">HOME <span className="font-medium text-gray-500 normal-case">83 kishan pura mataji mandir, sector n...</span></p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          
          {/* Date */}
          <div className="bg-white border border-gray-100 p-2.5 flex items-center gap-3">
            <div className="bg-gray-50 p-1.5 rounded-md">
              <Truck size={18} className="text-slate-700" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-slate-800">Delivery by 16 May, Sat</p>
              <p className="text-[10px] text-orange-600 font-bold">Order in 00h 00m 14s</p>
            </div>
          </div>

          {/* Seller */}
          <div className="bg-white border border-gray-100 rounded-b-lg p-2.5 flex items-center gap-3">
            <div className="bg-gray-50 p-1.5 rounded-md">
              <div className="w-[18px] h-[18px] border-2 border-slate-700 rounded-[2px]" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-slate-600">Fulfilled by <span className="font-bold text-slate-800 text-[12px]">Lounge Dreams</span></p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold text-slate-600 bg-gray-100 px-1 py-0.5 rounded-sm">3.2 ★</span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-[10px] text-slate-500 font-medium">4 years with Mithilakart</span>
              </div>
              <button className="text-[11px] font-bold text-[#2874f0] mt-1 underline underline-offset-2">See other sellers</button>
            </div>
        </div>
      </div>
    </div>

      {/* Service Icons Row */}
      <div className="px-3 py-4 flex justify-around items-center border-t border-gray-50 bg-gray-50/30">
        <div 
          onClick={() => setShowReturnPolicy(true)}
          className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <RotateCcw size={20} className="text-[#2874f0]" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">10-Day<br/>Return ›</span>
        </div>
        <div 
          onClick={() => setShowPaymentOptions(true)}
          className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <IndianRupee size={20} className="text-[#2874f0]" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Cash on<br/>Delivery ›</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          onClick={() => setShowSupportInfo(true)}
        >
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <span className="text-[#2874f0] font-black text-[10px]">24x7</span>
          </div>
          <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Customer<br/>support ›</span>
        </div>
      </div>

      <div className="h-1.5 bg-gray-50" />

      {/* Similar Products */}
      <div className="py-3 border-t border-gray-100">
        <div className="flex justify-between items-center px-3 mb-3">
          <h3 className="text-[15px] font-bold uppercase tracking-tight text-slate-900">Similar Products</h3>
          <button className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex gap-4 px-3 overflow-x-auto no-scrollbar pb-3">
          {[
            { img: TopSection1, name: 'Checked Cotton Shirt', brand: 'Fashion Hub', price: 899, oldPrice: 1999 },
            { img: FlipFlops, name: 'Casual Flip Flops', brand: 'Drasert', price: 1299, oldPrice: 2499 },
            { img: Suitcase, name: 'Premium Suitcase', brand: 'Lounge Dreams', price: 1599, oldPrice: 2999 }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate('/vendor/product-detail', { state: { product: { ...item, image: item.img, rating: 4.1, discount: '55% OFF' } } })}
              className="flex-shrink-0 w-[130px] bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <div className="aspect-[4/5] relative">
                <img src={item.img} className="w-full h-full object-cover" alt="similar" />
                <div className="absolute bottom-1.5 left-1.5 bg-white/95 px-1 py-0.5 rounded-sm flex items-center gap-0.5 border border-gray-50 shadow-sm">
                  <span className="text-[9px] font-bold">4.1</span>
                  <Star size={7} fill="#15803d" className="text-green-700" />
                </div>
              </div>
              <div className="p-2">
                <h4 className="text-[10px] font-bold text-slate-800 line-clamp-1 mb-1 uppercase tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[10px] font-black text-green-600">55% OFF</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[9px] text-gray-400 line-through">₹1,999</span>
                  <span className="text-[12px] font-black">₹899</span>
                </div>
                <p className="text-[9px] text-blue-600 font-bold mt-1">₹799 <span className="font-medium text-gray-400 text-[8px]">with UPI</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Highlights */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div 
          onClick={() => setIsHighlightsOpen(!isHighlightsOpen)}
          className="flex justify-between items-center cursor-pointer group"
        >
          <h3 className="text-[15px] font-black uppercase tracking-tight text-slate-900 group-active:scale-[0.98] transition-transform">Product highlights</h3>
          <ChevronRight 
            size={18} 
            className={`text-gray-400 transition-transform duration-300 ${isHighlightsOpen ? '-rotate-90' : 'rotate-90'}`} 
          />
        </div>
        
        {isHighlightsOpen && (
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {detailsData.highlights.map((item, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-2">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-[13px] font-black text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Details */}
      <div className="border-t border-gray-100">
        <div 
          onClick={() => setIsAllDetailsOpen(!isAllDetailsOpen)}
          className="px-3 py-3 flex justify-between items-center cursor-pointer group"
        >
          <div>
            <h3 className="text-[15px] font-black uppercase tracking-tight text-slate-900 group-active:scale-[0.98] transition-transform">All details</h3>
            <p className="text-[11px] text-gray-500">Features, description and more</p>
          </div>
          <div className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center">
            <ChevronRight 
              size={18} 
              className={`text-gray-400 transition-transform duration-300 ${isAllDetailsOpen ? '-rotate-90' : 'rotate-90'}`} 
            />
          </div>
        </div>

        {isAllDetailsOpen && (
          <div className="px-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
              {['Specifications', 'Description', 'Manufacturer info'].map(tab => (
                <button
                  key={tab}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetailTab(tab);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition-all ${
                    activeDetailTab === tab 
                    ? 'bg-[#212121] text-white border-[#212121]' 
                    : 'bg-white text-slate-600 border-gray-200 active:scale-95'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeDetailTab === 'Specifications' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 mb-3 tracking-tight uppercase">General</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {detailsData.specs.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-50 pb-2">
                        <p className="text-[10px] font-bold text-gray-400 mb-0.5">{item.label}</p>
                        <p className="text-[12px] font-black text-slate-800 tracking-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-b border-gray-50 pb-4">
                    <p className="text-[10px] font-bold text-gray-400 mb-1">Other Details</p>
                    <p className="text-[12px] font-medium text-slate-700 leading-relaxed">
                      Oversized shirt in crisp cotton poplin. Dropped shoulders, long sleeves with buttoned cuffs.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="flex items-center gap-1.5 px-5 py-1.5 border border-gray-200 rounded-full text-[12px] font-bold text-slate-800 active:scale-95 transition-transform">
                    See more <ChevronRight size={16} className="rotate-90 text-gray-400" />
                  </button>
                </div>
              </div>
            )}
            
            {activeDetailTab === 'Description' && (
              <div className="text-[12px] text-slate-600 leading-relaxed">
                Premium wool blend shirt with a modern boxy fit. Features a classic spread collar and checkered pattern. Perfect for seasonal transitions.
              </div>
            )}

            {activeDetailTab === 'Manufacturer info' && (
              <div className="text-[12px] text-slate-600 leading-relaxed">
                Manufactured by Lounge Dreams Clothing Pvt Ltd. Made in India.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-1.5 bg-gray-50" />

      {/* Bought Together */}
      <div className="py-4 mb-8">
        <div className="flex justify-between items-center px-3 mb-4">
          <h3 className="text-[15px] font-bold uppercase tracking-tight text-slate-900">Bought Together</h3>
          <button 
            onClick={() => navigate('/vendor/all-offers')}
            className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex gap-4 px-3 overflow-x-auto no-scrollbar pb-4">
          {[
            { img: Balloons, name: 'Party Pack', price: 299, oldPrice: 599 },
            { img: SplitAC, name: 'Samsung AC', price: 34999, oldPrice: 45999 },
            { img: TowerFan, name: 'Tower Fan', price: 2499, oldPrice: 4999 }
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigate('/vendor/product-detail', { state: { product: { ...item, image: item.img, rating: 4.3, discount: '60% off' } } })}
              className="flex-shrink-0 w-[145px] bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <div className="aspect-[4/5] bg-gray-50">
                <img src={item.img} className="w-full h-full object-cover" alt="bought" />
              </div>
              <div className="p-2">
                <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1 mb-1 tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[14px] font-black">₹{item.price}</span>
                  <span className="text-[10px] font-black text-green-600">60% off</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4].map(s => <Star key={s} size={9} fill="#16a34a" className="text-green-600" />)}
                  <span className="text-[9px] ml-1 text-slate-400 font-bold">(1.2k)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easy Returns Policy Bottom Sheet */}
      {showReturnPolicy && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => {
              setShowReturnPolicy(false);
              setIsReturnExpanded(false);
            }}
          />
          
          {/* Sheet */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e, setIsReturnExpanded, isReturnExpanded)}
            className={`relative w-full max-w-md bg-white transition-all duration-500 ease-out flex flex-col ${
              isReturnExpanded ? 'h-[95vh] rounded-t-3xl shadow-2xl' : 'max-h-[85vh] rounded-t-2xl'
            } overflow-hidden animate-in slide-in-from-bottom`}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-2 pb-1 bg-white">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-[#e0f2fe] px-4 py-3 flex items-center gap-4 border-b border-blue-100 z-10">
              <button onClick={() => {
                setShowReturnPolicy(false);
                setIsReturnExpanded(false);
              }} className="text-slate-800">
                <X size={24} />
              </button>
              <h2 className="text-[18px] font-bold text-slate-800">Easy Returns Policy</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-10">
              {/* Type Icons */}
              <div className="flex justify-between items-center mb-10 px-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gray-50 rounded-sm flex items-center justify-center relative">
                    <div className="w-10 h-10 border-2 border-[#2874f0] rounded-sm flex items-center justify-center">
                      <RotateCcw size={20} className="text-[#2874f0]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">Replacement</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gray-50 rounded-sm flex items-center justify-center relative">
                    <div className="w-10 h-10 border-2 border-[#2874f0] rounded-sm flex items-center justify-center">
                      <IndianRupee size={20} className="text-[#2874f0]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">Refund</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-gray-50 rounded-sm flex items-center justify-center relative">
                    <div className="w-10 h-10 border-2 border-[#2874f0] rounded-sm flex items-center justify-center">
                      <Share2 size={20} className="text-[#2874f0] rotate-90" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">Exchange</span>
                </div>
              </div>

              {/* Conditions List */}
              <div className="mb-10">
                <h3 className="text-[17px] font-black text-slate-900 mb-6">What are the conditions for return?</h3>
                <div className="space-y-5">
                  {[
                    'Received damaged product',
                    'Received defective product',
                    'Received wrong product',
                    'Did not like the product'
                  ].map(text => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-5 h-5 border border-green-500 rounded-sm flex items-center justify-center">
                        <span className="text-green-500 text-[12px] font-bold">✓</span>
                      </div>
                      <span className="text-[15px] font-bold text-slate-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to place section */}
              <div>
                <h3 className="text-[17px] font-black text-slate-900 mb-8">How to place a return?</h3>
                
                <div className="space-y-12 pl-4 border-l-2 border-dashed border-gray-200 ml-2">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-[26px] top-0 w-4 h-4 bg-white border-2 border-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-[15px] font-black text-slate-800 mb-2">Select issue</h4>
                        <p className="text-[14px] font-medium text-gray-500 mb-1">• Go to My Orders &gt; Order Details</p>
                        <p className="text-[14px] font-medium text-gray-500">• Return &gt; Select Issue</p>
                      </div>
                      <div className="w-20 h-16 bg-gray-50 rounded-sm flex flex-col items-center justify-center relative border border-gray-100">
                        <div className="w-10 h-10 border border-gray-300 rounded-sm flex items-center justify-center">
                          <span className="text-[8px] font-bold text-gray-400 absolute top-1 right-1">Return</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-[26px] top-0 w-4 h-4 bg-white border-2 border-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-[15px] font-black text-slate-800 mb-2">Get an approval</h4>
                        <p className="text-[14px] font-medium text-gray-500 leading-relaxed">• Seller will approve based on<br/>condition</p>
                      </div>
                      <div className="w-20 h-16 bg-gray-50 rounded-sm flex items-center justify-center relative border border-gray-100">
                         <div className="w-10 h-10 bg-slate-200 rounded-full" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-[26px] top-0 w-4 h-4 bg-white border-2 border-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-[15px] font-black text-slate-800 mb-2">Product will be picked up</h4>
                        <p className="text-[14px] font-medium text-gray-500 leading-relaxed">• Product must be in original<br/>condition with tags and packaging</p>
                      </div>
                      <div className="w-20 h-16 bg-gray-50 rounded-sm flex items-center justify-center relative border border-gray-100">
                        <Truck size={30} className="text-gray-300" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options Bottom Sheet */}
      {showPaymentOptions && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => {
              setShowPaymentOptions(false);
              setIsPaymentExpanded(false);
            }}
          />
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e, setIsPaymentExpanded, isPaymentExpanded)}
            className={`relative w-full max-w-md bg-white transition-all duration-500 ease-out flex flex-col ${
              isPaymentExpanded ? 'h-[95vh] rounded-t-3xl shadow-2xl' : 'max-h-[85vh] rounded-t-2xl'
            } overflow-hidden animate-in slide-in-from-bottom`}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-2 pb-1 bg-white cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-white px-4 py-2.5 flex items-center gap-4 border-b border-gray-100 z-10">
              <button onClick={() => {
                setShowPaymentOptions(false);
                setIsPaymentExpanded(false);
              }} className="text-slate-800">
                <X size={24} />
              </button>
              <h2 className="text-[18px] font-bold text-slate-800">Payments Options</h2>
            </div>

            {/* Tab Switched */}
            <div className="sticky top-[53px] bg-white flex border-b border-gray-100 z-10">
              <button 
                onClick={() => setActivePaymentTab('COD')}
                className={`flex-1 flex flex-col items-center py-4 gap-1 relative transition-colors ${activePaymentTab === 'COD' ? 'text-[#2874f0]' : 'text-gray-400'}`}
              >
                <IndianRupee size={22} className={activePaymentTab === 'COD' ? 'text-[#2874f0]' : 'text-gray-400'} />
                <span className="text-[13px] font-bold">COD</span>
                {activePaymentTab === 'COD' && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2874f0]" />}
              </button>
              <button 
                onClick={() => setActivePaymentTab('UPI')}
                className={`flex-1 flex flex-col items-center py-4 gap-1 relative transition-colors ${activePaymentTab === 'UPI' ? 'text-[#2874f0]' : 'text-gray-400'}`}
              >
                <div className="w-5 h-7 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold">UPI</span>
                {activePaymentTab === 'UPI' && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2874f0]" />}
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {activePaymentTab === 'COD' ? (
                <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
                  Available. Select Cash on Delivery (CoD) payment option while placing the order and later, pay in cash at the time of actual delivery of product. No advance payment needed.
                </p>
              ) : (
                <div className="space-y-6">
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
                    Provide your UPI ID to process the payment. No extra charges on this transaction.
                  </p>
                  {isPaymentExpanded && (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
                        <p className="text-[13px] text-blue-800 font-bold mb-1">Instant Refund Policy</p>
                        <p className="text-[12px] text-blue-600">UPI payments are eligible for instant refunds upon cancellation.</p>
                      </div>
                      <div className="border border-gray-100 rounded-sm p-4">
                        <p className="text-[13px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Secure Payment</p>
                        <div className="flex gap-4">
                          <div className="w-12 h-8 bg-gray-50 rounded-sm border border-gray-200" />
                          <div className="w-12 h-8 bg-gray-50 rounded-sm border border-gray-200" />
                          <div className="w-12 h-8 bg-gray-50 rounded-sm border border-gray-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}

      {/* Customer Support Bottom Sheet */}
      {showSupportInfo && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => {
              setShowSupportInfo(false);
              setIsSupportExpanded(false);
            }}
          />
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e, setIsSupportExpanded, isSupportExpanded)}
            className={`relative w-full max-w-md bg-white transition-all duration-500 ease-out flex flex-col ${
              isSupportExpanded ? 'h-[95vh] rounded-t-3xl shadow-2xl' : 'max-h-[85vh] rounded-t-2xl'
            } overflow-hidden animate-in slide-in-from-bottom`}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-2 pb-1 bg-white">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-white px-4 py-3.5 flex items-center justify-between border-b border-gray-100 z-10">
              <h2 className="text-[18px] font-bold text-slate-800">24x7 Customer Support</h2>
              <button onClick={() => {
                setShowSupportInfo(false);
                setIsSupportExpanded(false);
              }} className="text-slate-800">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <p className="text-[15px] text-slate-700 font-medium leading-relaxed mb-6">
                Mithilakart Help Centre offers quick support for order tracking, returns, refunds, and delivery updates. Find more information on Mithilakart Plus, payments, and shopping here. Access support via guided topics, customer care number, or chat with a support executive. Find Help Centre in "My Account" on mobile app or in the main menu on the desktop app.
              </p>
              
              {isSupportExpanded && (
                <div className="space-y-6 animate-in fade-in duration-700">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-sm active:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <Send size={22} className="text-[#2874f0]" />
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">Chat with us</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-sm active:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <Star size={22} className="text-[#2874f0]" />
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">Help Center</span>
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-l-4 border-[#2874f0] rounded-r-sm">
                    <p className="text-[12px] font-bold text-slate-500 uppercase mb-3 tracking-wider">Common Topics</p>
                    <ul className="space-y-4">
                      {['Track Order', 'Refund Status', 'Cancel Items'].map(item => (
                        <li key={item} className="flex items-center justify-between text-[15px] font-bold text-slate-700">
                          {item} <ChevronRight size={18} className="text-gray-400" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 flex gap-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-white border border-gray-200 text-slate-800 font-bold py-3.5 rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Add to cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-[#ffc107] text-slate-900 font-black py-3.5 rounded-sm active:scale-[0.98] transition-all flex items-center justify-center"
        >
          Buy at ₹{product.price}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-6 py-3 rounded-sm text-[14px] font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
