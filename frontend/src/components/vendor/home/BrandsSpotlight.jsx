import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandsSpotlight = ({ items }) => {
  const navigate = useNavigate();

  const handleBrandClick = useCallback((card) => {
    navigate('/vendor/product-detail', { 
      state: { 
        product: { 
          id: Math.random().toString(36).substr(2, 9),
          name: card.sub,
          brand: card.title,
          price: 1499,
          oldPrice: 2999,
          discount: '50% off',
          rating: 4.9,
          image: card.img,
          label: 'Sponsored'
        } 
      } 
    });
  }, [navigate]);

  return (
    <div className="px-2 mt-2 mb-1">
      <h2 className="text-slate-900 mb-2 px-0.5 text-[15px] font-black uppercase tracking-tight">
        Brands in Spotlight
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {items.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleBrandClick(card)}
            className="flex flex-col gap-1 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-[8px]">No Image</div>';
                }}
              />
              <div className="absolute top-1 right-1 bg-black/10 backdrop-blur-sm text-white text-[6px] px-1 py-0.5 rounded-sm font-bold border border-white/20">AD</div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#ff0000] text-white text-center py-0.5 text-[8.5px] font-black leading-tight">
                {card.title}
              </div>
            </div>
            <div className="text-center px-0.5">
              <p className="text-[9px] font-bold text-slate-800 leading-tight line-clamp-1">{card.sub}</p>
              <p className="text-[8px] font-medium text-gray-400 line-clamp-1">Sponsored</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(BrandsSpotlight);
