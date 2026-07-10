import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

import prod1 from '../../../assets/products/product01.jpg';
import prod2 from '../../../assets/products/product02.jpg';
import prod3 from '../../../assets/products/product03.jpg';
import prod4 from '../../../assets/products/product04.jpg';
import prod5 from '../../../assets/products/product05.jpg';
import prod6 from '../../../assets/products/product06.jpg';
import prod7 from '../../../assets/products/product07.jpg';
import prod8 from '../../../assets/products/product08.jpg';
import prod9 from '../../../assets/products/product09.jpg';
import prod10 from '../../../assets/products/product10.jpg';
import prod11 from '../../../assets/products/product11.webp';
import prod12 from '../../../assets/products/product12.jpg';

const MITHILA_CATEGORIES = [
  {
    name: 'Mithila Festival & Cultural',
    img: prod1
  },
  {
    name: 'Mithila Paridhan',
    img: prod2
  },
  {
    name: 'Mithila Special Cuisines',
    img: prod3
  },
  {
    name: 'Mithila Lac Bangles',
    img: prod4
  },
  {
    name: 'Mithila Handcrafted Items',
    img: prod5
  },
  {
    name: 'Mithila Pooja Needs',
    img: prod6
  },
  {
    name: 'Mithila Books & Panchang',
    img: prod7
  },
  {
    name: 'Mithila Achaar',
    img: prod8
  }
];

const MITHILA_DEALS = [
  {
    id: 'm1',
    name: 'Handmade Madhubani Painting (Framed)',
    img: prod9,
    price: 850,
    oldPrice: 999,
    discount: '15% OFF',
    rating: 4.8,
    weight: '1 Unit'
  },
  {
    id: 'm2',
    name: 'Mithila Handmade Lac Bangles (Set of 4)',
    img: prod10,
    price: 350,
    oldPrice: 450,
    discount: '22% OFF',
    rating: 4.6,
    weight: 'Set of 4'
  },
  {
    id: 'm3',
    name: 'Traditional Mithila Mango Achaar (500g)',
    img: prod11,
    price: 180,
    oldPrice: 200,
    discount: '10% OFF',
    rating: 4.9,
    weight: '500g'
  },
  {
    id: 'm4',
    name: 'Mithila Bhagalpuri Silk Saree',
    img: prod12,
    price: 2400,
    oldPrice: 2999,
    discount: '20% OFF',
    rating: 4.7,
    weight: '1 Saree'
  }
];

const Mithilak = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-gradient-to-b from-[#f3e8ff]/60 via-[#faf5ff] to-[#f5f3ff] min-h-screen px-3 py-6 select-none pb-24">
      {/* Page Title Header */}
      <div className="mb-6 px-1 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight leading-none mb-1">
            Mithila Specialities
          </h2>
          <p className="text-[10px] text-purple-500 font-bold tracking-widest uppercase">
            Handpicked cultural products of Mithila
          </p>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-sm flex items-center justify-between border border-purple-400/20">
        <div className="z-10 flex-1 max-w-[65%]">
          <span className="bg-purple-800/40 border border-purple-400/30 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md leading-none uppercase tracking-wider">
            Mithila Utsav
          </span>
          <h3 className="text-[14px] font-black mt-2 leading-tight tracking-tight">Authentic Mithila Artistry</h3>
          <p className="text-[9.5px] text-purple-100 font-medium mt-1">Flat 20% OFF on Paintings & Crafts</p>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/10 relative overflow-hidden backdrop-blur-xs">
          <span className="text-[12px] font-black text-purple-200">20% OFF</span>
        </div>
      </div>

      {/* Category Grid (Mobile View) */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2.5 p-2 rounded-2xl bg-white/60 border border-purple-100/30 md:hidden">
        {MITHILA_CATEGORIES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              localStorage.setItem('isMithilakFlow', 'true');
              localStorage.setItem('isQuickShopFlow', 'false');
              navigate('/mithilak/category', { state: { category: item.name } });
            }}
            className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform w-20"
          >
            {/* Category Image Wrapper with soft purple background */}
            <div className="w-16 h-16 rounded-[22px] bg-[#f3e8ff] overflow-hidden flex items-center justify-center p-2.5">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
            
            {/* Category label text */}
            <span className="text-[11px] font-medium text-center text-gray-800 mt-2 leading-tight tracking-tight line-clamp-2 h-[32px] w-full flex items-start justify-center">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Category Grid (Desktop View - copy style & structure of large square cards) */}
      <div className="hidden md:block md:max-w-[1600px] md:mx-auto md:w-full md:px-4 md:mb-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md">
          <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-8 gap-y-8 justify-items-center">
            {MITHILA_CATEGORIES.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  localStorage.setItem('isMithilakFlow', 'true');
                  localStorage.setItem('isQuickShopFlow', 'false');
                  navigate('/mithilak/category', { state: { category: item.name } });
                }}
                className="flex flex-col items-center gap-3.5 cursor-pointer group active:scale-95 transition-transform w-full max-w-[160px] mx-auto"
              >
                {/* Soft purple rounded image container box */}
                <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-[#f3e8ff] border border-purple-100/30 flex items-center justify-center p-0 group-hover:bg-[#ebdcfc] transition-colors duration-300">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <span className="text-[13px] font-black text-center text-slate-800 leading-tight tracking-tight mt-1 group-hover:text-purple-600 transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section: Today's special deals ── */}
      <div className="mt-8 mb-6 md:max-w-[1600px] md:mx-auto md:w-full md:px-4">
        <div className="flex items-center justify-between mb-4 pl-1">
          <div className="flex flex-col">
            <h2 className="text-[16px] font-black text-gray-900 leading-none">Today's Special Deals</h2>
            <span className="text-[10px] text-purple-500 font-bold tracking-wide uppercase mt-1">Super savers of Mithila</span>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3 px-0.5 md:hidden">
          {MITHILA_DEALS.map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => {
                localStorage.setItem('isMithilakFlow', 'true');
                localStorage.setItem('isQuickShopFlow', 'false');
                navigate('/vendor/product-detail', { state: { product: { ...prod, image: prod.img, qty: 1 } } });
              }}
              className="min-w-[130px] max-w-[130px] bg-white border border-purple-100/30 rounded-2xl p-2.5 flex flex-col relative shadow-[0_2px_8px_rgba(124,58,237,0.03)] cursor-pointer active:scale-[0.99] transition-all"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-[#7c3aed] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none">
                ↓ {prod.discount}
              </div>
              
              {/* Product Image */}
              <div className="h-20 flex items-center justify-center my-3.5">
                <img src={prod.img} alt={prod.name} className="max-h-full object-contain mix-blend-multiply rounded-lg" />
              </div>
              
              {/* Rating and Add Button */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center bg-purple-50 text-purple-800 border border-purple-100/50 px-1 py-0.5 rounded-md text-[8.5px] font-black leading-none">
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
                    triggerToast(`${prod.name} added to cart!`);
                  }}
                  className="px-3 py-0.5 border border-[#7c3aed] bg-white rounded-lg text-[#7c3aed] text-[9.5px] font-black tracking-wider uppercase cursor-pointer active:scale-90 transition-transform shadow-3xs hover:bg-purple-50/30"
                >
                  ADD
                </button>
              </div>

              <div>
                <span className="text-[12px] font-black text-gray-900 line-clamp-2 leading-tight tracking-tight h-[32px]">
                  {prod.name}
                </span>
                <span className="text-[9.5px] font-bold text-gray-400 block mt-1">
                  {prod.weight}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-[13px] font-black text-gray-950">₹{prod.price}</span>
                {prod.oldPrice && (
                  <span className="text-[10px] text-gray-400 line-through">₹{prod.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-6">
          {MITHILA_DEALS.map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => {
                localStorage.setItem('isMithilakFlow', 'true');
                localStorage.setItem('isQuickShopFlow', 'false');
                navigate('/vendor/product-detail', { state: { product: { ...prod, image: prod.img, qty: 1 } } });
              }}
              className="bg-white border border-purple-100/30 rounded-2xl p-4 flex flex-col justify-between relative shadow-[0_2px_8px_rgba(124,58,237,0.03)] cursor-pointer active:scale-[0.99] transition-all group"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-[#7c3aed] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none">
                ↓ {prod.discount}
              </div>
              
              {/* Product Image */}
              <div className="h-28 flex items-center justify-center my-4 animate-in fade-in duration-300">
                <img src={prod.img} alt={prod.name} className="max-h-full object-contain mix-blend-multiply rounded-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              
              {/* Rating and Add Button */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center bg-purple-50 text-purple-800 border border-purple-100/50 px-2 py-0.5 rounded-md text-[9px] font-black leading-none">
                  {prod.rating} <Star size={7} fill="currentColor" className="ml-0.5" />
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
                    triggerToast(`${prod.name} added to cart!`);
                  }}
                  className="px-4 py-1 border border-[#7c3aed] bg-white rounded-lg text-[#7c3aed] text-[10px] font-black tracking-wider uppercase cursor-pointer active:scale-90 transition-transform shadow-3xs hover:bg-purple-50"
                >
                  ADD
                </button>
              </div>

              <div>
                <span className="text-[13px] font-black text-gray-900 line-clamp-2 leading-tight tracking-tight h-[36px]">
                  {prod.name}
                </span>
                <span className="text-[10px] font-bold text-gray-400 block mt-1.5">
                  {prod.weight}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mt-3">
                <span className="text-[14px] font-black text-gray-950">₹{prod.price}</span>
                {prod.oldPrice && (
                  <span className="text-[11px] text-gray-400 line-through">₹{prod.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-6 py-3 rounded-full text-[13px] font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Mithilak;
