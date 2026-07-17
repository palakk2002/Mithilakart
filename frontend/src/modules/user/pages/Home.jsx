import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, Gift, Monitor, Gem, Shirt, Gamepad2, BookOpen, Zap } from 'lucide-react';

// Import Home Components
import LazySection from '../components/vendor/home/LazySection';
import StillLookingSection from '../components/vendor/home/StillLookingSection';
import TopSelection from '../components/vendor/home/TopSelection';
import BrandsSpotlight from '../components/vendor/home/BrandsSpotlight';
import BestQuality from '../components/vendor/home/BestQuality';
import KeepShopping from '../components/vendor/home/KeepShopping';
import RatingSection from '../components/vendor/home/RatingSection';
import CategoryTabs from '../components/vendor/home/CategoryTabs';
import SubCategoryGrid from '../components/vendor/home/SubCategoryGrid';
import TrendingThisWeek from '../components/vendor/home/TrendingThisWeek';

// Import Existing Shared Components
import CategoryProductsSection from '../components/vendor/CategoryProductsSection';
import SaleBanner from '../components/vendor/SaleBanner';
import BannerCarousel from '../components/vendor/BannerCarousel';

// Import Assets
import SamsungS24 from '../../../assets/products/product01.jpg';
import EarbudsDeal from '../../../assets/products/product02.jpg';
import LorealShampoo from '../../../assets/products/product03.jpg';
import PlumShampoo from '../../../assets/products/product04.jpg';
import LipGloss from '../../../assets/products/product05.jpg';
import JewelleryImg from '../../../assets/products/product06.jpg';
import FashionHero from '../../../assets/products/product07.jpg';
import ElectronicsHero from '../../../assets/products/product08.jpg';
import MakeupHero from '../../../assets/products/product09.jpg';
import FashionTabProduct from '../../../assets/products/product10.jpg';
import ForYouProduct from '../../../assets/products/product11.webp';
import BeautyTab from '../../../assets/products/product12.jpg';
import ToysTab from '../../../assets/products/product13.jpg';
import StationeryTab from '../../../assets/products/product14.jpg';
import ClothesImg from '../../../assets/products/product15.webp';
import LipstickDeal from '../../../assets/products/product01.jpg';
import Suitcase from '../../../assets/products/product02.jpg';
import CardImg from '../../../assets/products/product03.jpg';
import FashionTabImg from '../../../assets/products/product04.jpg';

// Banner Assets
import FashionSaleBannerImg from '../../../assets/TopBanner/fashion_sale_banner.png';
import ImageBanner1 from '../../../assets/TopBanner/ImageBanner1.jpg';
import ImageBanner2 from '../../../assets/TopBanner/ImageBanner2.jpg';
import ImageBanner3 from '../../../assets/TopBanner/ImageBanner3.webp';
import ImageBanner4 from '../../../assets/TopBanner/ImageBanner4.jpg';

import useVendorStore from '../../../store/useVendorStore';

const Home = () => {
  const [activeTab, setActiveTab] = useState('You Buy');
  const navigate = useNavigate();
  const { selectedCategory, homeSections } = useVendorStore();

  const categoryBanners = useMemo(() => {
    const homeBanners = [
      { id: 1, image: ImageBanner1, title: 'Summer Sale' },
      { id: 2, image: ImageBanner2, title: 'New Arrivals' },
      { id: 3, image: ImageBanner3, title: 'Electronics Deal' },
      { id: 4, image: ImageBanner4, title: 'Grocery Offers' }
    ];

    return {
      'Home': homeBanners,
      'Toys': homeBanners,
      'Beauty': homeBanners,
      'Art. Jewellery': homeBanners,
      '1g Gold': homeBanners,
      'Cosmetics': homeBanners,
      'Fashion': homeBanners
    };
  }, []);

  const data = useMemo(() => ({
    ratings: [
      { name: 'SONATA...', fullName: 'SONATA NP7987YM06W So...', date: 'Delivered on Apr 13, 2026', img: JewelleryImg },
      { name: 'LAKME...', fullName: 'LAKME 9TO5 VITAMIN C+...', date: 'Delivered on Apr 10, 2026', img: MakeupHero }
    ],
    tabs: [
      { label: 'You Buy', img: ForYouProduct },
      { label: 'Stationery', img: StationeryTab },
      { label: 'Fashion', img: FashionTabProduct },
      { label: 'Beauty', img: BeautyTab },
      { label: 'Toys', img: ToysTab }
    ]
  }), []);

  const handleTabClick = useCallback((label) => {
    if (label === 'Toys') {
      navigate('/vendor/toys');
    } else {
      setActiveTab(label);
    }
  }, [navigate]);

  // Main 9 horizontal category tabs on top (restored and compact)
  const mainCategoriesList = [
    { label: 'You Buy', icon: <ShoppingBag size={11} className="text-[#6FAE4A]" />, path: '/home' },
    { label: 'Fashion', icon: <Shirt size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Fashion' },
    { label: 'Beauty', icon: <Sparkles size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Beauty' },
    { label: 'Electronics', icon: <Monitor size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Electronics' },
    { label: 'Jewellery', icon: <Gem size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Jewellery' },
    { label: 'Toys', icon: <Gamepad2 size={11} className="text-[#6FAE4A]" />, path: '/toys' },
    { label: 'Stationery', icon: <BookOpen size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Stationery' },
    { label: 'Gifting', icon: <Gift size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Gifting' },
    { label: 'Electrical', icon: <Zap size={11} className="text-[#6FAE4A]" />, path: '/category-products?category=Electrical' },
  ];

  return (
    <div
      className="min-h-screen pb-20 overflow-x-hidden bg-transparent text-primary-dark"
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
        contain: 'layout style'
      }}
    >
      {/* 1. TOP HORIZONTAL CATEGORY ROW (Super Compact & Scrollable with Gap-1) - Always Visible */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-3 pt-0.5 pb-1.5">
        {mainCategoriesList.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(cat.path)}
            className="w-[56px] h-[50px] flex-shrink-0 bg-[#FFF8EE] border border-[#EADCC9]/70 rounded-lg flex flex-col items-center justify-center gap-0.5 shadow-[0_1px_3px_rgba(63,42,32,0.01)] hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="w-5.5 h-5.5 rounded-full bg-[#6FAE4A]/10 flex items-center justify-center flex-shrink-0">
              {cat.icon}
            </div>
            <span className="text-[8.5px] font-black text-[#3F2A20] text-center leading-none truncate w-full px-0.5">
              {cat.label}
            </span>
          </div>
        ))}
      </div>

      {/* 2. PROMOTIONAL FASHION SALE BANNER (With Mithila Decorative Border) */}
      {(selectedCategory === 'You Buy' || selectedCategory === 'Home') && (
        <div className="px-3 py-1">
          <div 
            onClick={() => navigate('/category-products?category=Fashion')}
            className="w-full h-[185px] sm:h-[215px] md:h-[350px] rounded-2xl overflow-hidden shadow-xs cursor-pointer active:scale-99 transition-transform"
            style={{
              borderWidth: '10px',
              borderStyle: 'solid',
              borderImageSource: "url('/border_1-removebg-preview.png')",
              borderImageSlice: '24',
              borderImageRepeat: 'round',
              padding: '14px',
              backgroundColor: '#FFF8EE'
            }}
          >
            <img
              src={FashionSaleBannerImg}
              alt="Fashion Sale Special Offer"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      )}

      {/* 3. SHOP BY CATEGORIES SECTION */}
      {(selectedCategory === 'You Buy' || selectedCategory === 'Home') && (
        <div className="my-1">
          <SubCategoryGrid />
        </div>
      )}

      {/* 4. TRENDING THIS WEEK SECTION */}
      {(selectedCategory === 'You Buy' || selectedCategory === 'Home') && (
        <div className="my-1">
          <TrendingThisWeek />
        </div>
      )}

      {/* 4.5 KEEP SHOPPING FOR THIS SECTION */}
      {(selectedCategory === 'You Buy' || selectedCategory === 'Home') && (
        <div className="my-1">
          <KeepShopping />
        </div>
      )}

      {/* 5. RESTORED PREVIOUS SECTIONS */}
      {(selectedCategory === 'You Buy' || selectedCategory === 'Home') && (
        <>

          <div className="mb-6 md:mb-10">
            <LazySection height="350px">
              <BrandsSpotlight items={homeSections.brandsSpotlight} />
            </LazySection>
          </div>

          <div className="mb-6 md:mb-10">
            <LazySection height="400px">
              <TopSelection items={homeSections.topSelection} />
            </LazySection>
          </div>

          <div className="mb-6 md:mb-10">
            <LazySection height="500px">
              <BestQuality items={homeSections.bestQuality} />
            </LazySection>
          </div>

          <div className="mb-6 md:mb-10">
            <LazySection height="150px">
              <CategoryTabs
                tabs={data.tabs}
                activeTab={activeTab}
                onTabClick={handleTabClick}
              />
            </LazySection>
          </div>

          {/* Dynamic Products Section based on Bottom Tabs */}
          <div className="pb-20 mb-6 md:mb-10">
            <CategoryProductsSection selectedCategory={activeTab} />
          </div>
        </>
      )}

      {selectedCategory !== 'You Buy' && selectedCategory !== 'Home' && (
        <div className="py-4 mb-6 md:mb-10">
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-xl font-black text-[var(--card-text)]">{selectedCategory} Specials</h2>
            <div className="h-1 flex-1 bg-gray-100 mx-4 rounded-full" />
          </div>
          <CategoryProductsSection selectedCategory={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
