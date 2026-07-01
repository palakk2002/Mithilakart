import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, ChevronRight, CheckCircle, Info, Trash2,
  ArrowLeft, ShieldCheck, MapPin, Truck, Star, Heart, Zap, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  const handleSetQuantity = (cartId, qty) => {
    const updated = cartItems.map(item => {
      if (item.cartId === cartId) {
        return { ...item, qty: parseInt(qty) };
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

  return (
    <div className="bg-gray-100 min-h-screen pb-32 font-sans">
      {/* Top Header */}
      <div className="sticky top-0 z-[100] bg-[#084224] text-white px-4 py-3.5 flex items-center gap-4 shadow-md">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[18px] font-medium">My Cart</h1>
      </div>

      {/* Delivery Address Section */}
      <div className="bg-white px-4 py-3 flex items-start justify-between border-b border-gray-100 shadow-sm">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[13px] text-gray-800">Deliver to: <span className="font-bold">Mukesh Jino... , 450116</span></span>
            <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-sm">Home</span>
          </div>
          <p className="text-[12px] text-gray-500 truncate">83 kishan pura mataji mandir, sector no. 5 new ...</p>
        </div>
        <button className="text-[#084224] text-[13px] font-bold border border-gray-200 px-4 py-1.5 rounded-sm active:bg-gray-50">
          Change
        </button>
      </div>

      {/* Cart Items */}
      <div className="mt-2 space-y-2">
        {cartItems.length === 0 ? (
          <div className="bg-white text-center py-20 px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
            <h2 className="text-[16px] font-bold text-slate-800 mb-1">Your cart is empty!</h2>
            <p className="text-[13px] text-gray-500 mb-6">Add items to it now.</p>
            <Link to="/vendor/home" className="bg-[#084224] text-white px-8 py-2.5 rounded-sm font-bold text-[14px]">
              Shop now
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.cartId} className="bg-white shadow-sm">
                {/* Product Info */}
                <div className="p-4 flex gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 border border-gray-100 rounded-sm p-1 flex items-center justify-center bg-white">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    {/* Qty Dropdown */}
                    <div className="relative">
                      <select
                        value={item.qty || 1}
                        onChange={(e) => handleSetQuantity(item.cartId, e.target.value)}
                        className="appearance-none border border-gray-200 rounded-sm pl-2 pr-6 py-1 text-[12px] font-bold bg-white focus:outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                          <option key={n} value={n}>Qty: {n}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] text-slate-800 font-medium line-clamp-1 mb-0.5">{item.name}</h3>
                    <p className="text-[11px] text-gray-400 mb-2 uppercase">{item.brand || 'Premium Quality'}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center bg-green-700 text-white px-1 py-0.5 rounded-sm text-[10px] font-bold">
                        <span>4.5</span>
                        <Star size={8} fill="white" className="ml-0.5" />
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">(5,960)</span>
                      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-3.5 ml-1" />
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[14px] font-bold text-green-700">↓ 52%</span>
                      <span className="text-[13px] text-gray-400 line-through">₹{item.oldPrice || '1,299'}</span>
                      <span className="text-[16px] font-bold text-slate-900">₹{item.price}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[#084224] italic font-black text-[12px]">WOW!</span>
                        <span className="text-[12px] text-[#084224] font-bold">Buy at ₹{Math.floor(item.price * 0.92)}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">+ ₹19 Protect Promise Fee <Info size={10} className="inline ml-0.5" /></p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] text-gray-800">Or Pay ₹{Math.floor(item.price * 0.85)} +</span>
                        <div className="flex items-center bg-yellow-400 rounded-full px-1 py-0.5">
                          <Zap size={8} fill="white" className="text-white" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">23</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 py-3 border-t border-gray-50">
                    <Truck size={16} className="text-gray-400" />
                    <p className="text-[12px] text-gray-800"><span className="italic font-black text-[10px] uppercase tracking-tighter mr-1">Express</span> Delivery in 2 days, Fri</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => handleRemove(item.cartId)}
                    className="flex-1 py-3.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-600 active:bg-gray-50 border-r border-gray-100"
                  >
                    <Trash2 size={16} className="text-gray-400" /> Remove
                  </button>
                  <button className="flex-1 py-3.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-600 active:bg-gray-50 border-r border-gray-100">
                    <Heart size={16} className="text-gray-400" /> Save for later
                  </button>
                  <button className="flex-1 py-3.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-600 active:bg-gray-50">
                    <Zap size={16} className="text-gray-400" /> Buy this now
                  </button>
                </div>
              </div>
            ))}

            {/* Price Details Section */}
            <div className="bg-white mt-2 p-4 pb-8 shadow-sm">
              <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-tight mb-4">Price Details</h2>
              <div className="space-y-4 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-slate-700">Price ({cartItems.length} items)</span>
                  <span className="text-slate-800">₹{totalOldPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Discount</span>
                  <span className="text-green-700">- ₹{savings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Delivery Charges</span>
                  <span className="text-green-700 font-medium">FREE Delivery</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-dashed border-gray-200">
                  <span className="text-[16px] font-bold text-slate-900">Total Amount</span>
                  <span className="text-[16px] font-bold text-slate-900">₹{(totalPrice).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-[14px] font-bold text-green-700">You will save ₹{savings.toLocaleString('en-IN')} on this order</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-[200] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          {/* Savings Banner */}
          <div className="bg-[#f1f9f5] px-4 py-2 flex items-center gap-2 border-b border-[#e6f3ec]">
            <div className="bg-green-600 rounded-full p-0.5 flex items-center justify-center">
              <CheckCircle size={10} className="text-white" />
            </div>
            <p className="text-[11px] font-medium text-green-800">You'll save ₹{savings.toLocaleString('en-IN')} on this order!</p>
          </div>

          <div className="px-4 py-2.5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[12px] text-gray-400 line-through">₹{totalOldPrice.toLocaleString('en-IN')}</span>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                <Info size={14} className="text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => navigate('/vendor/checkout')}
              className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-black uppercase text-[14px] shadow-lg active:scale-95 transition-transform"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Safe Payments Footer */}
      <div className="mt-6 px-6 py-8 flex flex-col items-center gap-4 text-gray-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} />
          <span className="text-[12px] font-bold uppercase tracking-widest">100% Safe and Secure Payments</span>
        </div>
        <p className="text-[10px] text-center leading-relaxed">
          Mithilakart Trust Pay. 100% Payment Protection. Easy Returns.
        </p>
      </div>
    </div>
  );
};

export default Cart;

