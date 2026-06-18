import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import FlipFlops from '../../assets/products/product07.jpg';
import Tshirt from '../../assets/products/product05.jpg';
import Suitcase from '../../assets/products/product09.jpg';
import Balloons from '../../assets/products/product10.jpg';
import SplitAC from '../../assets/products/product08.jpg';
import TowerFan from '../../assets/products/product09.jpg';
import CookwareHero from '../../assets/products/product04.jpg';
import FashionHero from '../../assets/products/product06.jpg';
import TopSection2 from '../../assets/TopSection/TopSection2.jpg';

const AllOffers = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
      const totalCount = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const offers = [
    { img: FlipFlops, title: 'Women Casual Shoes', desc: 'New Collection' },
    { img: TopSection2, title: 'Men Shirts', desc: 'Special offer' },
    { img: Suitcase, title: 'Travel Suitcase', desc: 'New Collection' },
    { img: Balloons, title: 'Party Supplies', desc: 'New Collection' },
    { img: FashionHero, title: 'Designer Dresses', desc: 'Best Selling Products' },
    { img: CookwareHero, title: 'Cookware Sets', desc: 'Best Selling Products' },
    { img: SplitAC, title: 'Split AC', desc: 'Best Picks' },
    { img: TowerFan, title: 'Tower Fan', desc: 'Best Picks' }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-24 font-sans">
      {/* Header - Matching Category Search Style */}
      <div className="sticky top-0 z-50 bg-[#2874f0] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4 flex-1">
          {!isSearchVisible ? (
            <>
              <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform p-1">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-[19px] font-bold tracking-tight">All Offers</h1>
            </>
          ) : (
            <div className="flex items-center gap-3 w-full animate-in slide-in-from-right duration-200">
               <button onClick={() => {
                 setIsSearchVisible(false);
                 setSearchQuery('');
               }}>
                  <ArrowLeft size={24} className="text-white" />
               </button>
               <div className="flex-1 bg-white rounded-md px-3 py-1.5 flex items-center gap-2">
                  <Search size={18} className="text-gray-400" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search in offers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-[14px] w-full text-slate-800 placeholder:text-gray-400 font-medium"
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
              className="cursor-pointer active:scale-90 transition-transform" 
              onClick={() => setIsSearchVisible(true)}
            />
            <div 
              onClick={() => navigate('/vendor/cart')} 
              className="relative active:scale-95 transition-transform cursor-pointer"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff0000] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#2874f0]">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="px-5 py-5 bg-white border-b border-[#f0f0f0]">
        <h2 className="text-[16px] text-slate-900 font-bold tracking-tight">
          Top Selection <span className="text-[#878787] font-normal ml-1">({offers.length * 16} Results)</span>
        </h2>
      </div>

      {/* Products Grid - High Fidelity Borders & Spacing */}
      <div className="grid grid-cols-2 bg-white">
        {offers.map((offer, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center py-4 px-3 border-b border-[#f0f0f0] ${idx % 2 === 0 ? 'border-r' : ''} active:bg-gray-50 transition-colors cursor-pointer group`}
            onClick={() => navigate('/vendor/product-detail', { state: { product: { id: idx, name: offer.title, image: offer.img, price: '499', oldPrice: '999', discount: '50% off', brand: 'Top Selection' } } })}
          >
            <div className="h-[120px] mb-3 flex items-center justify-center w-full">
              <img 
                src={offer.img} 
                alt={offer.title} 
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="text-center space-y-0.5">
              <h3 className="text-[12px] text-[#212121] font-medium leading-tight">{offer.title}</h3>
              <p className="text-[11px] font-medium text-[#388e3c] tracking-tight">{offer.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges Footer */}
      <div className="mt-10 px-4 pb-10 flex justify-center gap-8 opacity-40 grayscale">
         <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-4" alt="assured" />
         <div className="h-4 w-[1px] bg-gray-300" />
         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Authentic Products</p>
      </div>
    </div>
  );
};

export default AllOffers;
