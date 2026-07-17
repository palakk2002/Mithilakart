import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import category images matching the mockup
import beautyCareImg from '../../../../../assets/categories/beauty_red_blossom.png';
import giftsHampersImg from '../../../../../assets/categories/gifts_green_package.png';
import smartGadgetsImg from '../../../../../assets/categories/smart_gadgets.png';
import artJewelleryImg from '../../../../../assets/categories/art_jewellery.png';
import toysGamesImg from '../../../../../assets/categories/toys_games.png';
import officeBooksImg from '../../../../../assets/products/product14.jpg';
import trendyFashionImg from '../../../../../assets/products/product10.jpg';
import electricalsImg from '../../../../../assets/products/product08.jpg';

const categoriesData = [
  { id: 1, name: 'Beauty & Care', img: beautyCareImg, path: '/category-products?category=Beauty' },
  { id: 2, name: 'Gifts & Hampers', img: giftsHampersImg, path: '/category-products?category=Gifting' },
  { id: 3, name: 'Smart Gadgets', img: smartGadgetsImg, path: '/category-products?category=Electronics' },
  { id: 4, name: 'Art Jewellery', img: artJewelleryImg, path: '/category-products?category=Jewellery' },
  { id: 5, name: 'Toys & Games', img: toysGamesImg, path: '/toys' },
  { id: 6, name: 'Office & Books', img: officeBooksImg, path: '/category-products?category=Stationery' },
  { id: 7, name: 'Trendy Fashion', img: trendyFashionImg, path: '/category-products?category=Fashion' },
  { id: 8, name: 'Electricals', img: electricalsImg, path: '/category-products?category=Electrical' },
];

// Reusing same Header Flower SVG style from Trending section
const HeaderFlower = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mx-1">
    <path d="M12 2C13.5 6.5 13.5 6.5 12 11C10.5 6.5 10.5 6.5 12 2Z" fill="#4B6C36" />
    <path d="M12 22C13.5 17.5 13.5 17.5 12 13C10.5 17.5 10.5 17.5 12 22Z" fill="#4B6C36" />
    <path d="M2 12C6.5 13.5 6.5 13.5 11 12C6.5 10.5 6.5 10.5 2 12Z" fill="#4B6C36" />
    <path d="M22 12C17.5 13.5 17.5 13.5 13 12C17.5 10.5 17.5 10.5 22 12Z" fill="#4B6C36" />
    <path d="M5.5 5.5C8.5 7.5 8.5 7.5 10 9C8.5 8.5 8.5 8.5 5.5 5.5Z" fill="#D35400" stroke="#D35400" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.5 5.5C15.5 7.5 15.5 7.5 14 9C15.5 8.5 15.5 8.5 18.5 5.5Z" fill="#D35400" stroke="#D35400" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5.5 18.5C8.5 16.5 8.5 16.5 10 15C8.5 15.5 8.5 15.5 5.5 18.5Z" fill="#D35400" stroke="#D35400" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.5 18.5C15.5 16.5 15.5 16.5 14 15C15.5 15.5 15.5 15.5 18.5 18.5Z" fill="#D35400" stroke="#D35400" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="#E67E22" />
    <circle cx="12" cy="12" r="1.2" fill="#FFF" />
  </svg>
);

const ViewAllIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-0.5 align-middle">
    <path d="M6 4L14 12L6 20" stroke="#4B6C36" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 4L21 12L13 20" stroke="#4B6C36" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
  </svg>
);

const KeepShopping = () => {
  const navigate = useNavigate();

  const handleCardClick = useCallback((item) => {
    navigate(item.path);
  }, [navigate]);

  return (
    <div className="py-2 px-3 w-full max-w-[1600px] mx-auto select-none">
      <div className="bg-[#FCF7EE] rounded-[20px] p-3 text-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] border border-[#F3E3CD]/60 font-raleway">
        
        {/* Section Header (Same style as Trending This Week) */}
        <div className="flex justify-between items-center mb-2.5 px-1">
          <div className="flex items-center">
            <HeaderFlower />
            <h3 className="text-[12px] md:text-sm font-black text-[#3C2415] uppercase tracking-wide font-montserrat">
              Keep shopping for this
            </h3>
            <HeaderFlower />
          </div>
          <button
            onClick={() => navigate('/categories')}
            className="text-[9.5px] md:text-xs font-bold text-[#4B6C36] hover:text-[#385227] flex items-center transition-colors duration-200"
          >
            View All
            <ViewAllIcon />
          </button>
        </div>

        {/* Horizontal Scrollable Row of Compact Category Cards */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {categoriesData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="flex-shrink-0 w-[100px] md:w-[125px] bg-white border border-[#E5D5C0]/65 rounded-[20px] p-2 flex flex-col items-center justify-between cursor-pointer hover:shadow-sm hover:border-[#6FAE4A]/40 transition-all duration-300 group"
            >
              {/* Category Image */}
              <div className="w-full aspect-square bg-[#FFFDFB] rounded-[15px] flex items-center justify-center p-1.5 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Category Name */}
              <span className="text-[9.5px] md:text-xs font-bold text-[#3C2415] text-center mt-1.5 leading-tight tracking-tight px-0.5 h-[28px] flex items-center justify-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default React.memo(KeepShopping);
