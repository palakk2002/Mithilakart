import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, ArrowLeft, Trash2, Zap, ShieldCheck, MoreHorizontal
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

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceStr = String(item.price || '0').replace(/,/g, '');
    return acc + (Number(priceStr) || 0) * (item.qty || 1);
  }, 0);

  const shippingCost = cartItems.length > 0 ? 50 : 0;
  const grandTotal = totalPrice + shippingCost;

  const imageBgColors = ['bg-[#fdf3f0]', 'bg-[#f0fdf4]', 'bg-[#f5f0fd]', 'bg-[#f0f8fd]'];

  return (
    <div className="bg-[#f5f6f8] min-h-screen pb-32 font-sans flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-[100] bg-[#f5f6f8] px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} className="text-slate-800" />
        </button>
        <h1 className="text-[17px] font-black text-slate-800">Cart</h1>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <MoreHorizontal size={18} className="text-slate-800" />
        </button>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 px-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[26px] text-center py-20 px-6 shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
            <h2 className="text-[16px] font-black text-slate-800 mb-1">Your cart is empty!</h2>
            <p className="text-[13px] text-gray-500 mb-6 font-medium">Add items to it now.</p>
            <Link to="/vendor/home" className="inline-block bg-[#084224] text-white px-8 py-3 rounded-full font-black text-[13px] uppercase tracking-wider">
              Shop now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Items Container Card */}
            <div className="bg-white rounded-[26px] p-4 shadow-sm border border-gray-100/50 flex flex-col gap-5">
              {cartItems.map((item, idx) => (
                <div key={item.cartId} className="flex gap-4 items-center">
                  {/* Tinted Image Wrapper */}
                  <div className={`w-[85px] h-[85px] rounded-2xl flex items-center justify-center p-2 flex-shrink-0 ${imageBgColors[idx % imageBgColors.length]}`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-[14.5px] text-slate-800 font-medium leading-snug line-clamp-1">{item.name}</h3>
                      <button
                        onClick={() => handleRemove(item.cartId)}
                        className="text-gray-400 hover:text-red-500 active:scale-90 transition-colors p-0.5"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    
                    <p className="text-[12.5px] text-gray-500 font-medium mt-0.5">
                      {item.weight || '1 unit'}
                    </p>

                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[15.5px] font-bold text-slate-900">₹{item.price}</span>
                        {item.oldPrice && (
                          <span className="text-[12px] text-gray-400 line-through font-normal">₹{item.oldPrice}</span>
                        )}
                      </div>
                      
                      {/* Pill Qty Selector */}
                      <div className="flex items-center justify-between border border-gray-200 rounded-full px-2 py-1 w-[82px] h-[30px] bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="text-gray-400 font-extrabold text-[13px] px-1 active:scale-110"
                        >
                          -
                        </button>
                        <span className="text-[11.5px] font-black text-slate-800">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-[18px] h-[18px] rounded-full bg-[#084224] text-white flex items-center justify-center font-bold text-[12px] active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-[26px] p-4 shadow-sm border border-gray-100/50 space-y-3.5">
              <div className="flex justify-between text-[13px] font-bold text-gray-500">
                <span>Sub total</span>
                <span className="text-slate-800">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[13px] font-bold text-gray-500">
                <span>Shipping & tax</span>
                <span className="text-slate-800">₹{shippingCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-2" />
              <div className="flex justify-between text-[15px] font-black text-slate-900">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Checkout Button Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3.5 border-t border-gray-200 z-[110] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => navigate('/vendor/checkout')}
            className="w-full bg-[#084224] text-white py-3.5 rounded-[22px] font-black text-[13.5px] uppercase tracking-wider shadow-[0_4px_12px_rgba(8,66,36,0.2)] active:scale-98 transition-transform"
          >
            Checkout Now
          </button>
        </div>
      )}

      {/* Safe Payments Footer */}
      <div className="mt-8 px-6 py-6 flex flex-col items-center gap-2 text-gray-400 text-center pb-24">
        <div className="flex items-center gap-1.5 text-gray-400">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">100% Safe & Secure Payments</span>
        </div>
        <p className="text-[9px] leading-relaxed max-w-[240px]">
          Mithilakart Pay. Easy returns & refunds.
        </p>
      </div>
    </div>
  );
};

export default Cart;

