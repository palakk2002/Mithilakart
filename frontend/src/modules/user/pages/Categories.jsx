import React from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/vendor/CategoryCard';

// Import Assets (aligned with categories)
import SamsungS24 from '../../../assets/products/product01.jpg';
import EarbudsDeal from '../../../assets/products/product02.jpg';
import LorealShampoo from '../../../assets/products/product03.jpg';
import LipGloss from '../../../assets/products/product05.jpg';
import JewelleryImg from '../../../assets/products/product06.jpg';
import FashionHero from '../../../assets/products/product07.jpg';
import ElectronicsHero from '../../../assets/products/product08.jpg';
import MakeupHero from '../../../assets/products/product09.jpg';
import FashionTabProduct from '../../../assets/products/product10.jpg';
import BeautyTab from '../../../assets/products/product12.jpg';
import ToysTab from '../../../assets/products/product13.jpg';
import StationeryTab from '../../../assets/products/product14.jpg';
import prod4 from '../../../assets/products/product04.jpg';
import ClothesImg from '../../../assets/products/product15.webp';

const SECTIONS = [
  {
    title: 'Beauty & Grooming',
    items: [
      { name: 'Cosmetics', img: MakeupHero, path: '/vendor/category-products?category=Beauty' },
      { name: 'Skin Care', img: BeautyTab, path: '/vendor/category-products?category=Beauty' },
      { name: 'Hair Care', img: LorealShampoo, path: '/vendor/category-products?category=Beauty' },
      { name: 'Fragrances', img: LipGloss, path: '/vendor/category-products?category=Beauty' },
    ]
  },
  {
    title: 'Fashion & Jewellery',
    items: [
      { name: 'Ethnic Wear', img: FashionHero, path: '/vendor/category-products?category=Fashion' },
      { name: 'Modern Wear', img: FashionTabProduct, path: '/vendor/category-products?category=Fashion' },
      { name: 'Art. Jewellery', img: JewelleryImg, path: '/vendor/category-products?category=Jewellery' },
      { name: 'Bags & Wallets', img: FashionHero, path: '/vendor/category-products?category=Fashion' },
    ]
  },
  {
    title: 'Kids & Play',
    items: [
      { name: 'Soft Toys', img: ToysTab, path: '/vendor/toys' },
      { name: 'Board Games', img: ToysTab, path: '/vendor/toys' },
      { name: 'Learning', img: ToysTab, path: '/vendor/toys' },
      { name: 'Kids Wear', img: ClothesImg, path: '/vendor/toys' },
    ]
  },
  {
    title: 'Home & Stationery',
    items: [
      { name: 'Notebooks', img: StationeryTab, path: '/vendor/category-products?category=Stationery' },
      { name: 'Art & Craft', img: StationeryTab, path: '/vendor/category-products?category=Stationery' },
      { name: 'Office Supply', img: StationeryTab, path: '/vendor/category-products?category=Stationery' },
      { name: 'Gifts', img: LipGloss, path: '/vendor/category-products?category=Gifting' },
    ]
  },
  {
    title: 'Electronics & Gadgets',
    items: [
      { name: 'Smart Phones', img: SamsungS24, path: '/vendor/category-products?category=Electronics' },
      { name: 'Earbuds', img: EarbudsDeal, path: '/vendor/category-products?category=Electronics' },
      { name: 'Appliances', img: ElectronicsHero, path: '/vendor/category-products?category=Electronics' },
      { name: 'Smart Watches', img: SamsungS24, path: '/vendor/category-products?category=Electronics' },
    ]
  }
];

const QUICK_SHOP_CATEGORIES = [
  {
    title: 'Grocery',
    items: [
      { name: 'Fruits & Vegetables', img: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=150&auto=format&fit=crop&q=60' },
      { name: 'Atta, Rice & Dal', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&auto=format&fit=crop&q=60' },
      { name: 'Oil, Ghee & Masala', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=60' },
      { name: 'Dairy, Bread & Eggs', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&auto=format&fit=crop&q=60' },
      { name: 'Cereals & Dry Fruits', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=150&auto=format&fit=crop&q=60' },
      { name: 'Chicken, Meat & Fish', img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=150&auto=format&fit=crop&q=60' },
      { name: 'Instant & Frozen Food', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { name: 'Chips & Namkeens', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&auto=format&fit=crop&q=60' },
      { name: 'Ice Creams', img: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Drinks & Juices', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=60' },
      { name: 'Sweets & Chocolates', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=150&auto=format&fit=crop&q=60' },
      { name: 'Tea, Coffee & Milk Drinks', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=150&auto=format&fit=crop&q=60' },
      { name: 'Bakery & Biscuits', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=60' },
      { name: 'Sauces & Spreads', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=150&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Beauty & Personal Care',
    items: [
      { name: 'Bath, Body & Grooming', img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=150&auto=format&fit=crop&q=60' },
      { name: 'Baby Care', img: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=150&auto=format&fit=crop&q=60' },
      { name: 'Hair Care', img: 'https://images.unsplash.com/photo-1527799881376-127bb49c3038?w=150&auto=format&fit=crop&q=60' },
      { name: 'Healthcare & Pharma', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=150&auto=format&fit=crop&q=60' },
      { name: 'Wellness & Hygiene', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&auto=format&fit=crop&q=60' },
      { name: 'Beauty & Fragrances', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Household, Stationery & Lifestyle',
    items: [
      { name: 'Cleaning Essentials', img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=150&auto=format&fit=crop&q=60' },
      { name: 'Stationery Supplies', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=150&auto=format&fit=crop&q=60' },
      { name: 'Toys & Games', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=150&auto=format&fit=crop&q=60' },
      { name: 'Sports & Fitness', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=60' },
      { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=150&auto=format&fit=crop&q=60' },
      { name: 'Electricals & Tools', img: 'https://images.unsplash.com/photo-1524294078988-0f34149ed411?w=150&auto=format&fit=crop&q=60' },
      { name: 'Fashion Accessories', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Pet Supplies', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Mobiles & Electronics',
    items: [
      { name: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60' },
      { name: 'Electronics & Gadgets', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=60' },
      { name: 'Audio & Smart Watches', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150&auto=format&fit=crop&q=60' },
    ]
  }
];

const MITHILA_CATEGORIES = [
  {
    title: 'Mithila Specialities',
    items: [
      { name: 'Mithila Festival & Cultural', img: SamsungS24 },
      { name: 'Mithila Paridhan', img: EarbudsDeal },
      { name: 'Mithila Special Cuisines', img: LorealShampoo },
      { name: 'Mithila Lac Bangles', img: prod4 },
      { name: 'Mithila Handcrafted Items', img: LipGloss },
      { name: 'Mithila Pooja Needs', img: JewelleryImg },
      { name: 'Mithila Books & Panchang', img: FashionHero },
      { name: 'Mithila Achaar', img: ElectronicsHero }
    ]
  }
];


const Categories = () => {
  const navigate = useNavigate();
  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';

  const sectionsList = isMithilakFlow ? MITHILA_CATEGORIES : (isQuickShopFlow ? QUICK_SHOP_CATEGORIES : SECTIONS);
  const pageBg = isMithilakFlow ? 'bg-gradient-to-b from-[#f3e8ff]/60 via-[#faf5ff] to-[#f5f3ff]' : isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : (isQuickShopFlow ? 'bg-[#fff5f7]' : 'bg-[#eaf5ee]');
  const headerBg = isMithilakFlow ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]' : isFreshGroceryFlow ? 'bg-gradient-to-r from-[#F5B014] to-[#FFF0A0]' : (isQuickShopFlow ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f]' : 'bg-[#084224]');
  const textPrimary = isMithilakFlow ? 'text-[#7c3aed]' : isFreshGroceryFlow ? 'text-[#7A3E17]' : (isQuickShopFlow ? 'text-[#d6186d]' : 'text-[#084224]');

  return (
    <div className={`${pageBg} min-h-screen pb-24 font-sans text-slate-800`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${headerBg} px-4 py-3.5 flex items-center justify-between shadow-md transition-colors`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={`p-0.5 active:scale-95 transition-transform ${isFreshGroceryFlow ? 'text-black' : 'text-white'}`}>
            <ArrowLeft size={22} />
          </button>
          <h1 className={`text-[19px] font-black tracking-tight ${isFreshGroceryFlow ? 'text-black' : 'text-white'}`}>Categories</h1>
        </div>
        <button onClick={() => navigate('/vendor/search')} className={`p-1 active:scale-95 transition-transform ${isFreshGroceryFlow ? 'text-black' : 'text-white'}`}>
          <Search size={22} />
        </button>
      </div>

      {/* Sections and Grid (Mobile View) */}
      <div className="px-4 py-3 space-y-6 md:hidden">
        {sectionsList.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col">
            <h2 className="text-[16px] font-black text-slate-900 mb-3 tracking-tight pl-1">
              {section.title}
            </h2>
            <div className="flex overflow-x-auto no-scrollbar gap-3.5 pb-1">
              {section.items.map((item, idx) => {
                if (isQuickShopFlow || isMithilakFlow) {
                  return (
                    <CategoryCard
                      key={idx}
                      item={item}
                      onClick={() => {
                        if (isMithilakFlow) {
                          localStorage.setItem('isMithilakFlow', 'true');
                          localStorage.setItem('isQuickShopFlow', 'false');
                          navigate('/mithilak/category', { state: { category: item.name } });
                        } else {
                          localStorage.setItem('isQuickShopFlow', 'true');
                          localStorage.setItem('isMithilakFlow', 'false');
                          navigate(isFreshGroceryFlow ? '/fresh-grocery/category' : '/quick-shop/category', { state: { category: item.name } });
                        }
                      }}
                    />
                  );
                }
                return (
                  <div
                    key={idx}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center justify-between pt-2 pb-1.5 px-1.5 w-[88px] h-[106px] flex-shrink-0 bg-white border border-[#d0edd8] rounded-[14px] shadow-[0_1.5px_4px_rgba(0,0,0,0.02)] cursor-pointer active:scale-95 transition-transform"
                  >
                    <span className={`px-0.5 text-[10px] font-black text-center ${textPrimary} leading-tight tracking-tight h-[24px] flex items-center justify-center`}>
                      {item.name}
                    </span>
                    <div className="w-[76px] h-[66px] rounded-[10px] overflow-hidden flex items-center justify-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view (Copying the banner + white panel structure) */}
      <div className="hidden md:block md:max-w-6xl md:mx-auto md:px-4 md:py-8 space-y-10">
        {sectionsList.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col">
            {/* Header Banner */}
            <div className={`px-6 py-4 rounded-t-3xl flex items-center justify-between shadow-sm text-white ${headerBg}`}>
              <h2 className="text-[17px] font-black uppercase tracking-wider">
                {section.title}
              </h2>
            </div>

            {/* White container panel with rounded-b corners containing the cards */}
            <div className="bg-white border-x border-b border-slate-100 rounded-b-3xl p-6 shadow-md">
              <div className="grid grid-cols-4 gap-6">
                {section.items.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (isMithilakFlow) {
                          localStorage.setItem('isMithilakFlow', 'true');
                          localStorage.setItem('isQuickShopFlow', 'false');
                          navigate('/mithilak/category', { state: { category: item.name } });
                        } else if (isQuickShopFlow) {
                          localStorage.setItem('isQuickShopFlow', 'true');
                          localStorage.setItem('isMithilakFlow', 'false');
                          navigate(isFreshGroceryFlow ? '/fresh-grocery/category' : '/quick-shop/category', { state: { category: item.name } });
                        } else {
                          navigate(item.path);
                        }
                      }}
                      className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-transform w-[180px] mx-auto"
                    >
                      {/* Soft grey rounded image box */}
                      <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100/60 flex items-center justify-center p-5 group-hover:bg-slate-100/65 transition-colors duration-300">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Content placed below the image box */}
                      <div className="px-1 text-center">
                        <h3 className={`text-[13px] font-black text-slate-800 leading-tight group-hover:${textPrimary} transition-colors line-clamp-2`}>
                          {item.name}
                        </h3>
                        <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-wider">View Collection</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

