import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopSelection = ({ items }) => {
  const navigate = useNavigate();

  const handleProductClick = useCallback((product) => {
    navigate('/vendor/product-detail', {
      state: {
        product: {
          id: Math.random().toString(36).substr(2, 9),
          name: product.name,
          brand: 'Top Selection',
          price: 999,
          oldPrice: 1999,
          discount: '50% off',
          rating: 4.8,
          image: product.img,
          label: 'Top Selection'
        }
      }
    });
  }, [navigate]);

  return (
    <>
      {/* Mobile view (Untouched layout, only hidden on desktop) */}
      <div className="px-3 mt-3 mb-2 md:hidden">
        <div className="bg-gradient-to-br from-[#0a3a21] to-[#041a0f] rounded-[28px] p-4.5 shadow-[0_12px_32px_rgba(8,66,36,0.12)] border border-emerald-900/30">
          {/* Compact Header */}
          <div className="flex justify-between items-center mb-3.5 px-1">
            <h2 className="text-white text-[15px] font-black uppercase tracking-[0.18em]">
              Top Selection
            </h2>
            <button
              onClick={() => navigate('/vendor/all-offers')}
              className="bg-white/95 backdrop-blur-md text-[#084224] p-1.5 rounded-full shadow-sm active:scale-90 transition-transform flex items-center justify-center"
            >
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Compact 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {items.map((product, idx) => (
              <div
                key={idx}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-[20px] p-2 shadow-sm flex flex-col justify-between gap-2 group cursor-pointer active:scale-[0.97] transition-all border border-slate-100/50"
              >
                <div className="aspect-square rounded-[14px] overflow-hidden bg-slate-50 border border-slate-100/80 flex items-center justify-center p-2 relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No Image</div>';
                    }}
                  />
                </div>
                <div className="px-1 pb-1">
                  <p className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider truncate leading-none">{product.name}</p>
                  <p className="text-[12px] font-black text-slate-800 leading-snug mt-1">{product.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view (Green/Emerald theme mimicking the "Trending Gadgets & Appliances" structure) */}
      <div className="hidden md:block md:max-w-6xl md:mx-auto md:px-2 md:mt-6">
        {/* Banner Header with background color and rounded-t corners */}
        <div className="bg-[#084224] text-white px-6 py-4 rounded-t-3xl flex items-center justify-between shadow-sm">
          <h2 className="text-[17px] font-black uppercase tracking-wider">
            Top Selection
          </h2>
          <button
            onClick={() => navigate('/vendor/all-offers')}
            className="bg-white/95 backdrop-blur-md text-[#084224] p-1.5 rounded-full shadow-sm active:scale-90 transition-transform flex items-center justify-center"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>

        {/* White container panel with rounded-b corners containing the cards */}
        <div className="bg-white border-x border-b border-slate-100 rounded-b-3xl p-6 shadow-md">
          <div className="grid grid-cols-4 gap-6">
            {items.map((product, idx) => (
              <div
                key={idx}
                onClick={() => handleProductClick(product)}
                className="flex flex-col gap-3.5 cursor-pointer group active:scale-95 transition-transform"
              >
                {/* Soft grey rounded image container box */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-5 group-hover:bg-slate-100/60 transition-colors duration-300">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content placed below the image box */}
                <div className="px-1">
                  <h3 className="text-[13px] font-black text-slate-800 leading-snug group-hover:text-[#084224] transition-colors">{product.name}</h3>
                  <p className="text-[12px] font-black text-[#084224] mt-1 uppercase tracking-wider">{product.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TopSelection);
