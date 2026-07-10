import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Import Assets (aligned with categories)
import SamsungS24 from '../../../../../assets/products/product01.jpg';
import EarbudsDeal from '../../../../../assets/products/product02.jpg';
import CardImg from '../../../../../assets/products/product03.jpg';
import LipGloss from '../../../../../assets/products/product05.jpg';
import JewelleryImg from '../../../../../assets/products/product06.jpg';
import ElectronicsHero from '../../../../../assets/products/product08.jpg';
import FashionTabProduct from '../../../../../assets/products/product10.jpg';
import BeautyTab from '../../../../../assets/products/product12.jpg';
import ToysTab from '../../../../../assets/products/product13.jpg';
import StationeryTab from '../../../../../assets/products/product14.jpg';

const row1Items = [
  { id: 1, key: 'beautyCare', img: BeautyTab, path: '/category-products?category=Beauty' },
  { id: 2, key: 'giftsHampers', img: CardImg, path: '/category-products?category=Gifting' },
  { id: 3, key: 'smartGadgets', img: SamsungS24, path: '/category-products?category=Electronics' },
  { id: 4, key: 'artJewellery', img: JewelleryImg, path: '/category-products?category=Jewellery' },
  { id: 5, key: 'toysGames', img: ToysTab, path: '/toys' },
];

const row2Items = [
  { id: 6, key: 'officeBooks', img: StationeryTab, path: '/category-products?category=Stationery' },
  { id: 7, key: 'trendyFashion', img: FashionTabProduct, path: '/category-products?category=Fashion' },
  { id: 8, key: 'electricals', img: ElectronicsHero, path: '/category-products?category=Electrical' },
  { id: 9, key: 'bestDeals', img: EarbudsDeal, path: '/all-offers' },
  { id: 10, key: 'lipCare', img: LipGloss, path: '/category-products?category=Beauty' },
];

const SubCategoryGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile view (Untouched layout, only hidden on desktop) */}
      <div className="bg-[#eaf5ee] py-2 px-2 overflow-x-auto no-scrollbar flex flex-col gap-1.5 md:hidden">
        {/* Row 1 */}
        <div className="flex gap-1.5">
          {row1Items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-between pt-1 pb-1 px-1 w-[76px] h-[90px] flex-shrink-0 bg-white border border-[#d0edd8] rounded-[10px] shadow-[0_1.5px_4px_rgba(0,0,0,0.02)] cursor-pointer active:scale-95 transition-transform"
            >
              <span className="px-0.5 text-[9px] font-black text-center text-[#084224] leading-tight tracking-tight h-[20px] flex items-center justify-center">
                {t('categories.' + item.key)}
              </span>
              <div className="w-[68px] h-[58px] rounded-[8px] overflow-hidden flex items-center justify-center">
                <img
                  src={item.img}
                  alt={t('categories.' + item.key)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-1.5">
          {row2Items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-between pt-1 pb-1 px-1 w-[76px] h-[90px] flex-shrink-0 bg-white border border-[#d0edd8] rounded-[10px] shadow-[0_1.5px_4px_rgba(0,0,0,0.02)] cursor-pointer active:scale-95 transition-transform"
            >
              <span className="px-0.5 text-[9px] font-black text-center text-[#084224] leading-tight tracking-tight h-[20px] flex items-center justify-center">
                {t('categories.' + item.key)}
              </span>
              <div className="w-[68px] h-[58px] rounded-[8px] overflow-hidden flex items-center justify-center">
                <img
                  src={item.img}
                  alt={t('categories.' + item.key)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view (Centered circular cards with text underneath) */}
      <div className="hidden md:block md:bg-white md:py-10 md:px-6 md:w-full md:max-w-[1600px] md:mx-auto">
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-x-8 gap-y-8 justify-items-center">
          {[...row1Items, ...row2Items].map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center cursor-pointer group active:scale-95 transition-all duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:border-green-100 transition-all duration-300 transform group-hover:-translate-y-1">
                <img 
                  src={item.img} 
                  alt={t('categories.' + item.key)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-[13px] font-black text-center text-slate-700 mt-4 leading-tight tracking-tight group-hover:text-[#084224] transition-colors max-w-[110px]">
                {t('categories.' + item.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategoryGrid;
