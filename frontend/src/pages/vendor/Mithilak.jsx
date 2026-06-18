import React from 'react';
import { useNavigate } from 'react-router-dom';

const MITHILA_CATEGORIES = [
  {
    name: 'Mithila Festival & Cultural',
    img: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Paridhan',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Special Cuisines',
    img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Lac Bangles',
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Handcrafted Items',
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Pooja Needs',
    img: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Books & Panchang',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=60'
  },
  {
    name: 'Mithila Achaar',
    img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60'
  }
];

const Mithilak = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen px-3 py-6 select-none">
      {/* Page Title Header */}
      <div className="mb-6 px-1">
        <h2 className="text-[17px] font-bold text-gray-900 tracking-tight leading-none mb-1">
          Mithila Specialities
        </h2>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
          Handpicked cultural products of Mithila
        </p>
      </div>

      {/* 4-Column Category Grid with Circular Icons */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2.5 p-2 rounded-2xl bg-gray-50/40 border border-gray-100/30">
        {MITHILA_CATEGORIES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/quick-shop/category', { state: { category: item.name } })}
            className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
          >
            {/* Circular Image wrapper */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200/80 shadow-xs flex items-center justify-center bg-white">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Category label text */}
            <span className="text-[10.5px] font-bold text-gray-700 mt-2.5 text-center leading-tight min-h-[32px] line-clamp-2 px-0.5">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mithilak;
