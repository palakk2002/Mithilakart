import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const KeepShopping = ({ items }) => {
  const navigate = useNavigate();

  const handleItemClick = useCallback((item) => {
    navigate('/vendor/product-detail', {
      state: {
        product: {
          id: Math.random().toString(36).substr(2, 9),
          name: item.label,
          brand: 'Recent Search',
          price: 1299,
          oldPrice: 2499,
          discount: '48% off',
          rating: 4.6,
          image: item.img,
          label: 'Continue Shopping'
        }
      }
    });
  }, [navigate]);

  return (
    <div className="px-3 mt-4">
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 shadow-sm border border-white">
        <h2 className="text-slate-800 mb-3" style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '18px', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
          Keep shopping for these
        </h2>
        <div className="flex overflow-x-auto gap-3 no-scrollbar pb-1 touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleItemClick(item)}
              className="bg-white rounded-xl overflow-hidden min-w-[110px] w-[110px] shadow-sm flex flex-col active:scale-95 cursor-pointer transition-transform"
            >
              <div className="aspect-square bg-white flex items-center justify-center p-2">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-contain mix-blend-multiply"
                  loading="lazy"
                  width="110"
                  height="110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110"%3E%3Crect fill="%23f3f4f6" width="110" height="110"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-2 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-500 leading-tight truncate uppercase tracking-tight">{item.label}</p>
                <p className="text-[11px] font-bold text-[#2874f0] uppercase tracking-wider mt-0.5">View More</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(KeepShopping);
