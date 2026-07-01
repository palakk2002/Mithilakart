import React from 'react';
import { useNavigate } from 'react-router-dom';
import useVendorStore from '../../../store/useVendorStore';

import BeautyImg from '../../../assets/products/product12.jpg';
import GiftingImg from '../../../assets/products/product10.jpg';
import ElectronicsImg from '../../../assets/products/product08.jpg';
import JewelleryImg from '../../../assets/products/product06.jpg';
import ToysImg from '../../../assets/products/product13.jpg';
import StationeryImg from '../../../assets/products/product14.jpg';
import FashionImg from '../../../assets/products/product15.webp';
import ElectricalImg from '../../../assets/products/product13.jpg';

const GRID_ITEMS = [
  {
    label: 'Beauty & Care',
    categoryName: 'Beauty',
    image: BeautyImg,
  },
  {
    label: 'Gifts & Festive',
    categoryName: 'Gifting',
    image: GiftingImg,
  },
  {
    label: 'Smart Tech',
    categoryName: 'Electronics',
    image: ElectronicsImg,
  },
  {
    label: 'Fine Jewellery',
    categoryName: 'Jewellery',
    image: JewelleryImg,
  },
  {
    label: 'Kids & Toys',
    categoryName: 'Toys',
    image: ToysImg,
  },
  {
    label: 'Stationery & Art',
    categoryName: 'Stationery',
    image: StationeryImg,
  },
  {
    label: 'Fashion Apparel',
    categoryName: 'Fashion',
    image: FashionImg,
  },
  {
    label: 'Home Electrical',
    categoryName: 'Electrical',
    image: ElectricalImg,
  },
];

const GridCategories = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useVendorStore();

  const handleSelect = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate('/vendor/categories', { state: { category: categoryName } });
  };

  return (
    <div className="bg-[#f0f7fe] py-3.5 border-b border-[#e1eff9]">
      <div className="px-4 mb-2 flex items-center justify-between">
        <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-tight">Shop By Category</h2>
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {GRID_ITEMS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(item.categoryName)}
            className="w-[96px] h-[124px] bg-white rounded-[18px] border border-[#e1eff9] p-1.5 flex flex-col items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02)] active:scale-95 transition-transform text-center cursor-pointer flex-shrink-0"
          >
            <span className="text-[10px] font-black text-slate-800 leading-tight block w-full mt-0.5 mb-1 px-0.5 truncate">
              {item.label}
            </span>
            <div className="w-[82px] h-[82px] rounded-lg overflow-hidden flex items-center justify-center mb-0.5 bg-slate-50/30">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GridCategories;
