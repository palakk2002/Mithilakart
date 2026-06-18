import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const StillLookingSection = ({ items }) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback((item) => {
    // Generate or use existing ID
    const productId = item.id || Math.random().toString(36).substr(2, 9);

    // Map categories based on labels for demo purposes
    let category = 'Fashion';
    if (item.label.toLowerCase().includes('neck')) category = 'Jewellery';
    if (item.label.toLowerCase().includes('lips')) category = 'Beauty';
    if (item.label.toLowerCase().includes('shamp')) category = 'Beauty';

    navigate(`/vendor/continue-shopping/${productId}`, {
      state: {
        product: {
          id: productId,
          name: item.label,
          brand: 'Trending Now',
          price: 599,
          oldPrice: 1299,
          discount: '54% off',
          rating: 4.5,
          image: item.img,
          category: category,
          label: 'Limited time deal'
        }
      }
    });
  }, [navigate]);


  return (
    <div className="px-2 mt-1.5 mb-1">
      <div className="bg-[#2874f0] rounded-xl p-2 shadow-sm relative overflow-hidden">
        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(135deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)',
          backgroundSize: '12px 12px'
        }}></div>

        <h2 className="text-white text-[15px] font-black uppercase tracking-tight mb-2 pl-0.5 relative z-10">
          Still looking for these?
        </h2>

        <div className="flex overflow-x-auto w-full gap-1.5 pb-0.5 no-scrollbar snap-x relative z-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(item)}
              className="flex-shrink-0 bg-white rounded-lg p-1 w-[80px] shadow-sm flex flex-col gap-1 snap-start cursor-pointer active:scale-95 transition-transform"
            >
              <div className="aspect-square rounded-md overflow-hidden bg-white flex items-center justify-center p-1 border border-gray-50">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-contain mix-blend-multiply"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-[8px]">No Image</div>';
                  }}
                />
              </div>
              <div className="px-0.5">
                <p className="text-[9px] font-bold text-gray-600 leading-tight truncate">{item.label}</p>
                <p className="text-[8px] font-black text-[#2874f0] uppercase tracking-tighter mt-0.5">VIEW STORE</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-0.5" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(StillLookingSection);
