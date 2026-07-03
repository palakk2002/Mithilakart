import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, ChevronRight, CheckCircle, Info, Trash2,
  ArrowLeft, ShieldCheck, MapPin, Truck, Star, Heart, Zap, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';
  const primaryBg = isMithilakFlow ? 'bg-[#7c3aed] hover:bg-[#6d28d9]' : (isFreshGroceryFlow ? 'bg-[#7A3E17] hover:bg-[#653313]' : (isQuickShopFlow ? 'bg-[#d6186d] hover:bg-[#b5125b]' : 'bg-[#084224] hover:bg-[#06331b]'));
  const primaryText = isMithilakFlow ? 'text-[#7c3aed]' : (isFreshGroceryFlow ? 'text-[#7A3E17]' : (isQuickShopFlow ? 'text-[#d6186d]' : 'text-[#084224]'));
  const shopNowLink = isMithilakFlow ? '/mithilak' : (isFreshGroceryFlow ? '/fresh-grocery' : (isQuickShopFlow ? '/quick-shop' : '/vendor/home'));

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('userCart') || '[]');
      setCartItems(items);
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  const handleRemove = (cartId) => {
    const updated = cartItems.filter(item => item.cartId !== cartId);
    setCartItems(updated);
    localStorage.setItem('userCart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (cartId, delta) => {
    const updated = cartItems.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, (item.qty || 1) + delta);
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('userCart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceStr = String(item.price || '0').replace(/,/g, '');
    return acc + (Number(priceStr) || 0) * (item.qty || 1);
  }, 0);

  const totalOldPrice = cartItems.reduce((acc, item) => {
    const priceStr = String(item.oldPrice || '0').replace(/,/g, '');
    return acc + (Number(priceStr) || 0) * (item.qty || 1);
  }, 0);

  const savings = totalOldPrice - totalPrice;
  const shippingCost = totalPrice > 500 ? 0 : 39;

  return (
    <div className={`min-h-screen pb-32 font-sans text-slate-800 flex flex-col transition-colors duration-300 ${
      isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : 'bg-[#f0f3f6]'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-[100] px-4 py-3 flex items-center justify-between transition-colors duration-300 ${
        isFreshGroceryFlow ? 'bg-[#FFF0A0]' : 'bg-[#f0f3f6]'
      }`}>
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-800 active:scale-95 transition-transform border border-slate-100/50"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="text-[17px] font-black text-slate-800 tracking-tight">Cart</h1>
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100/50 font-bold select-none cursor-pointer">
          •••
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cartItems.length === 0 ? "flex-1 flex flex-col justify-center px-4 mt-2" : "px-4 mt-2"}>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[28px] text-center py-20 px-6 flex flex-col items-center justify-center shadow-sm border border-slate-100/50 animate-in fade-in duration-300">
            {/* Custom Empty Cart Illustration */}
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
              {/* Floating Sparkles */}
              <path d="M40 85h6v-6h2v6h6v2h-6v6h-2v-6h-6v-2z" fill="#9ca3af" />
              <path d="M80 35h4v-4h2v4h4v2h-4v4h-2v-4h-4v-2z" fill="#9ca3af" />
              <path d="M150 100h4v-4h2v4h4v2h-4v4h-2v-4h-4v-2z" fill="#9ca3af" />
              <path d="M60 145h4v-4h2v4h4v2h-4v4h-2v-4h-4v-2z" fill="#9ca3af" />

              {/* Speed Lines */}
              <line x1="45" y1="90" x2="65" y2="90" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="55" y1="102" x2="70" y2="102" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="114" x2="62" y2="114" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />

              {/* Cart Frame */}
              <path d="M57 90h15l15 45h35l14-30H79" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Cart Grid */}
              <line x1="88" y1="95" x2="88" y2="135" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="102" y1="95" x2="102" y2="135" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="116" y1="95" x2="116" y2="135" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="82" y1="105" x2="124" y2="105" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="85" y1="120" x2="128" y2="120" stroke="#f3f4f6" strokeWidth="2" />

              {/* Wheels */}
              <circle cx="86" cy="144" r="9" fill="#fecaca" stroke="#374151" strokeWidth="2" />
              <circle cx="86" cy="144" r="3" fill="#374151" />
              <circle cx="120" cy="144" r="9" fill="#fecaca" stroke="#374151" strokeWidth="2" />
              <circle cx="120" cy="144" r="3" fill="#374151" />

              {/* Plus Badge */}
              <circle cx="132" cy="94" r="13" fill="#bfdbfe" />
              <path d="M129 94h6M132 91v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Typography */}
            <h2 className="text-[16px] font-black text-slate-800 tracking-tight">
              Ohhh... Your cart is empty
            </h2>
            <p className="text-[13px] text-slate-400 font-bold mt-1.5 mb-8">
              but it doesn't have to be.
            </p>
            
            {/* Action Button */}
            <Link to={shopNowLink} className={`inline-block ${primaryBg} text-white px-12 py-3 rounded-full font-black uppercase text-[12px] shadow-md tracking-wider active:scale-95 transition-transform`}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:max-w-6xl md:mx-auto md:px-4 md:py-6">
            {/* Left Column (Items & Address) */}
            <div className="md:col-span-2 space-y-4">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border border-slate-100/50 shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Deliver to Home</p>
                  <p className="text-[12px] text-slate-500 font-medium truncate mt-1">83 Kishan Pura Mataji Mandir, Sector N...</p>
                </div>
                <button className={`${primaryText} text-[11px] font-black uppercase tracking-wider border border-slate-100 hover:bg-slate-50 px-4 py-2 rounded-full active:scale-95 transition-transform`}>
                  Change
                </button>
              </div>

              {/* Populated Items Card */}
              <div className="bg-white rounded-[28px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-slate-100/50 space-y-5">
                {cartItems.map((item, idx) => (
                  <div key={item.cartId} className="flex flex-col">
                    {idx > 0 && <div className="h-[1px] bg-slate-100 mb-5" />}
                    <div className="flex gap-4 items-center relative">
                      {/* Item Image Box */}
                      <div className="w-[84px] h-[84px] rounded-[18px] bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h3 className="text-[13.5px] font-black text-slate-800 truncate leading-snug">{item.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">{item.brand || 'Premium Brand'}</p>
                        <p className="text-[15px] font-black text-slate-900 mt-1">₹{item.price}</p>
                        
                        {/* Quantity Pill Capsule */}
                        <div className="flex items-center gap-3 border border-slate-150 rounded-full px-2.5 py-1 w-fit mt-2 bg-white select-none">
                          <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="text-slate-400 hover:text-slate-700 active:scale-90 transition-transform font-bold text-[14px] px-1"
                          >
                            —
                          </button>
                          <span className="text-[11px] font-black text-slate-800 min-w-[12px] text-center">
                            {item.qty || 1}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className={`${primaryBg} text-white rounded-full w-5 h-5 flex items-center justify-center active:scale-90 transition-transform font-black text-[12px] leading-none`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Delete Action */}
                      <button 
                        onClick={() => handleRemove(item.cartId)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-rose-600 hover:text-rose-800 p-2 rounded-full hover:bg-rose-50/50 active:scale-90 transition-transform"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (Summary & Desktop Action) */}
            <div className="md:col-span-1 space-y-4">
              {/* Pricing Summary Card */}
              <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-slate-100/50 space-y-3.5">
                <div className="flex justify-between items-center text-[13px] text-slate-500 font-bold">
                  <span>Sub total</span>
                  <span className="text-slate-800 font-black">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-slate-500 font-bold">
                  <span>Shipping & tax</span>
                  <span className="text-slate-800 font-black">
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                
                <div className="border-t border-dashed border-slate-200 my-2" />

                <div className="flex justify-between items-center text-[15px] font-black text-slate-800">
                  <span>Total</span>
                  <span className="text-[18px] text-slate-900">₹{(totalPrice + shippingCost).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Desktop Checkout button */}
              <button 
                onClick={() => navigate('/vendor/checkout')}
                className={`hidden md:flex w-full ${primaryBg} text-white font-black py-4 rounded-full active:scale-[0.98] transition-all items-center justify-center text-[14px] shadow-md cursor-pointer`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-3 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-100 px-5 py-3.5 flex items-center justify-between z-50 shadow-[0_10px_30px_rgba(8,66,36,0.08)] rounded-[24px] md:hidden">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Amount</span>
            <span className="text-[18px] font-black text-slate-905 leading-none mt-1">₹{(totalPrice + shippingCost).toLocaleString('en-IN')}</span>
          </div>
          <button 
            onClick={() => navigate('/vendor/checkout', { state: { product: cartItems[0] } })}
            className={`${primaryBg} text-white rounded-full px-8 py-3.5 font-black uppercase text-[12px] tracking-widest shadow-[0_4px_16px_rgba(8,66,36,0.22)] active:scale-95 transition-transform`}
          >
            Checkout Now
          </button>
        </div>
      )}

      {/* Safe Payments Footer */}
      <div className="mt-8 px-6 py-6 flex flex-col items-center gap-3 text-slate-400/80">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className={`${primaryText}/70`} />
          <span className="text-[11px] font-black uppercase tracking-wider">100% Safe Payments</span>
        </div>
        <p className="text-[10px] text-center leading-relaxed font-bold">
          Mithilakart Pay. Secure transactions. Easy Returns.
        </p>
      </div>
    </div>
  );
};

export default Cart;
