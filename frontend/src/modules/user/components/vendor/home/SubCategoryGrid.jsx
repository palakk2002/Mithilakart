import React from 'react';
import { useTranslation } from 'react-i18next';

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
  { id: 1, key: 'beautyCare', img: BeautyTab },
  { id: 2, key: 'giftsHampers', img: CardImg },
  { id: 3, key: 'smartGadgets', img: SamsungS24 },
  { id: 4, key: 'artJewellery', img: JewelleryImg },
  { id: 5, key: 'toysGames', img: ToysTab },
];

const row2Items = [
  { id: 6, key: 'officeBooks', img: StationeryTab },
  { id: 7, key: 'trendyFashion', img: FashionTabProduct },
  { id: 8, key: 'electricals', img: ElectronicsHero },
  { id: 9, key: 'bestDeals', img: EarbudsDeal },
  { id: 10, key: 'lipCare', img: LipGloss },
];

const SubCategoryGrid = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Mobile view (Untouched layout, only hidden on desktop) */}
      <div className="bg-[#eaf5ee] py-4 px-3.5 overflow-x-auto no-scrollbar flex flex-col gap-2.5 md:hidden">
        {/* Row 1 */}
        <div className="flex gap-2.5">
          {row1Items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between pt-2 pb-1.5 px-1.5 w-[88px] h-[106px] flex-shrink-0 bg-white border border-[#d0edd8] rounded-[14px] shadow-[0_1.5px_4px_rgba(0,0,0,0.02)]"
            >
              <span className="px-0.5 text-[10px] font-black text-center text-[#084224] leading-tight tracking-tight h-[24px] flex items-center justify-center">
                {t('categories.' + item.key)}
              </span>
              <div className="w-[76px] h-[66px] rounded-[10px] overflow-hidden flex items-center justify-center">
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
        <div className="flex gap-2.5">
          {row2Items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between pt-2 pb-1.5 px-1.5 w-[88px] h-[106px] flex-shrink-0 bg-white border border-[#d0edd8] rounded-[14px] shadow-[0_1.5px_4px_rgba(0,0,0,0.02)]"
            >
              <span className="px-0.5 text-[10px] font-black text-center text-[#084224] leading-tight tracking-tight h-[24px] flex items-center justify-center">
                {t('categories.' + item.key)}
              </span>
              <div className="w-[76px] h-[66px] rounded-[10px] overflow-hidden flex items-center justify-center">
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
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-8 md:bg-white md:py-8 md:px-4 md:w-full md:max-w-6xl md:mx-auto">
        {/* Row 1 */}
        <div className="flex justify-center gap-12 w-full flex-wrap">
          {row1Items.map((item) => (
            <div key={item.id} className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform">
              <div className="w-[150px] h-[150px] rounded-[24px] overflow-hidden flex items-center justify-center bg-gray-50 border border-slate-100/50 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img src={item.img} alt={t('categories.' + item.key)} className="w-full h-full object-cover" />
              </div>
              <span className="text-[13px] font-black text-center text-slate-800 mt-3.5 leading-tight tracking-tight hover:text-[#084224] transition-colors">
                {t('categories.' + item.key)}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-12 w-full flex-wrap">
          {row2Items.map((item) => (
            <div key={item.id} className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform">
              <div className="w-[150px] h-[150px] rounded-[24px] overflow-hidden flex items-center justify-center bg-gray-50 border border-slate-100/50 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img src={item.img} alt={t('categories.' + item.key)} className="w-full h-full object-cover" />
              </div>
              <span className="text-[13px] font-black text-center text-slate-800 mt-3.5 leading-tight tracking-tight hover:text-[#084224] transition-colors">
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
