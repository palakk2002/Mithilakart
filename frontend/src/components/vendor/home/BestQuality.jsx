import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BestQuality = ({ items }) => {
  const navigate = useNavigate();

  const handleProductClick = useCallback((product) => {
    navigate('/vendor/product-detail', {
      state: {
        product: {
          id: Math.random().toString(36).substr(2, 9),
          name: product.name,
          brand: 'Premium Quality',
          price: 2499,
          oldPrice: 4999,
          discount: '50% off',
          rating: 4.7,
          image: product.img,
          label: 'Assured'
        }
      }
    });
  }, [navigate]);

  return (
    <div className="px-2 mt-2 mb-1">
      <div className="bg-[#2874f0] rounded-xl p-2 shadow-md">
        
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-2 px-0.5">
          <h2 className="text-white text-[16px] font-bold uppercase tracking-tight">
            Best quality
          </h2>
          <button
            onClick={() => navigate('/vendor/all-offers')}
            className="bg-white text-black p-1 rounded-lg shadow-sm active:scale-90 transition-all"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Compact 2×2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {items.map((product, idx) => (
            <div
              key={idx}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-lg p-1.5 shadow-sm flex flex-col gap-1 group cursor-pointer active:scale-95 transition-all"
            >
              <div className="aspect-square rounded-md overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No Image</div>';
                  }}
                />
              </div>
              <div className="px-0.5">
                <p className="text-[9px] font-bold text-gray-400 truncate">{product.name}</p>
                <p className="text-[11px] font-bold text-slate-900 leading-none mt-0.5">{product.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BestQuality);
