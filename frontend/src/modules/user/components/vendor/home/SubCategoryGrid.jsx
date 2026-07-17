import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import category illustrations
import beautyCareImg from '../../../../../assets/categories/beauty_red_blossom.png';
import giftsHampersImg from '../../../../../assets/categories/gifts_green_package.png';
import smartGadgetsImg from '../../../../../assets/categories/smart_gadgets.png';
import artJewelleryImg from '../../../../../assets/categories/art_jewellery.png';
import toysGamesImg from '../../../../../assets/categories/toys_games.png';
import officeBooksImg from '../../../../../assets/products/product14.jpg';
import trendyFashionImg from '../../../../../assets/products/product10.jpg';
import electricalsImg from '../../../../../assets/products/product08.jpg';

const categoryItemsTop = [
  { id: 1, name: 'Beauty & Care', img: beautyCareImg, path: '/category-products?category=Beauty' },
  { id: 2, name: 'Gifts & Hampers', img: giftsHampersImg, path: '/category-products?category=Gifting' },
  { id: 3, name: 'Smart Gadgets', img: smartGadgetsImg, path: '/category-products?category=Electronics' },
  { id: 4, name: 'Art Jewellery', img: artJewelleryImg, path: '/category-products?category=Jewellery' },
];

const categoryItemsBottom = [
  { id: 5, name: 'Toys & Games', path: '/toys' },
  { id: 6, name: 'Office & Books', path: '/category-products?category=Stationery' },
  { id: 7, name: 'Trendy Fashion', path: '/category-products?category=Fashion' },
  { id: 8, name: 'Electricals', path: '/category-products?category=Electrical' },
];

const SubCategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-3 w-full max-w-[1600px] mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[15px] font-black text-[#3F2A20] tracking-tight">
          Shop by Categories
        </h2>
        <span
          onClick={() => navigate('/categories')}
          className="text-xs font-bold text-[#6FAE4A] hover:text-[#528C32] cursor-pointer hover:underline transition-colors"
        >
          View All
        </span>
      </div>

      {/* Top Row: Arched Cards (4 Columns) */}
      <div className="grid grid-cols-4 gap-2 md:gap-6 justify-items-center mb-3">
        {categoryItemsTop.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full flex flex-col items-center cursor-pointer group"
          >
            {/* Arched Card containing both text (top) and image (bottom) (Compact version) */}
            <div className="w-full aspect-[1/1.12] bg-white border border-[#EADCC9]/60 rounded-t-full rounded-b-[20px] overflow-hidden flex flex-col items-center justify-between p-1.5 md:p-3 shadow-[0_4px_10px_rgba(61,35,20,0.02)] group-hover:shadow-[0_8px_20px_rgba(61,35,20,0.08)] group-hover:border-[#6FAE4A]/40 transition-all duration-300 transform">
              {/* Category Label at top */}
              <span className="text-[9.2px] sm:text-xs md:text-sm font-black text-[#3F2A20] text-center mt-2 px-0.5 leading-tight tracking-tight h-[20px] flex items-center justify-center">
                {item.name}
              </span>
              
              {/* Category Image at bottom */}
              <div className="w-[82%] aspect-square rounded-[14px] overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 mb-1 relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row: Text-only Pills (4 Columns) */}
      <div className="grid grid-cols-4 gap-2 md:gap-6 justify-items-center">
        {categoryItemsBottom.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full bg-[#FFF8EE] border border-[#EADCC9]/50 rounded-xl py-2 px-1 text-center cursor-pointer hover:border-[#6FAE4A]/40 hover:bg-white active:scale-98 transition-all duration-200"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-black text-[#3F2A20]/90 leading-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryGrid;
