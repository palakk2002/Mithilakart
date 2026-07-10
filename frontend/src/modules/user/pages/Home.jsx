import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
import ImageBanner1 from '../../../assets/TopBanner/ImageBanner1.jpg';
import ImageBanner2 from '../../../assets/TopBanner/ImageBanner2.jpg';
import ImageBanner3 from '../../../assets/TopBanner/ImageBanner3.webp';
import ImageBanner4 from '../../../assets/TopBanner/ImageBanner4.jpg';

import useVendorStore from '../../../store/useVendorStore';

const Home = () => {
  const [activeTab, setActiveTab] = useState('For You');
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
      { label: 'For You', img: ForYouProduct },
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

  return (
    <div
      className="bg-[var(--card-bg)] min-h-screen pb-4 overflow-x-hidden"
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
        contain: 'layout style'
      }}
    >
      {/* 🔴 REDESIGNED PROMOTIONAL AREA */}
      <div className="flex flex-col bg-primary-green">
        {(selectedCategory === 'For You' || selectedCategory === 'Home') && <SaleBanner />}
      </div>

      {/* Banner Carousel */}
      <div className="bg-white pb-2">
        <BannerCarousel banners={categoryBanners[selectedCategory] || categoryBanners['Home']} />
      </div>

      {/* SubCategory Showcase Grid (Directly below Banner) */}
      {(selectedCategory === 'For You' || selectedCategory === 'Home') && (
        <div className="md:mb-12">
          <SubCategoryGrid />
        </div>
      )}

      {selectedCategory !== 'For You' && selectedCategory !== 'Home' && (
        <div className="py-4 md:mb-12">
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-xl font-black text-[var(--card-text)]">{selectedCategory} Specials</h2>
            <div className="h-1 flex-1 bg-gray-100 mx-4 rounded-full" />
          </div>
          <CategoryProductsSection selectedCategory={selectedCategory} />
        </div>
      )}

      {(selectedCategory === 'For You' || selectedCategory === 'Home') && (
        <>
          <div className="md:mb-12">
            <LazySection height="240px">
              <StillLookingSection items={homeSections.stillLooking} />
            </LazySection>
          </div>

          <div className="md:mb-12">
            <LazySection height="350px">
              <BrandsSpotlight items={homeSections.brandsSpotlight} />
            </LazySection>
          </div>

          <div className="md:mb-12">
            <LazySection height="400px">
              <TopSelection items={homeSections.topSelection} />
            </LazySection>
          </div>

          <div className="md:mb-12">
            <LazySection height="250px">
              <KeepShopping items={homeSections.keepShopping} />
            </LazySection>
          </div>

          <div className="md:mb-12">
            <LazySection height="500px">
              <BestQuality items={homeSections.bestQuality} />
            </LazySection>
          </div>

          <div className="md:mb-12">
            <LazySection height="150px">
              <CategoryTabs
                tabs={data.tabs}
                activeTab={activeTab}
                onTabClick={handleTabClick}
              />
            </LazySection>
          </div>

          {/* Dynamic Products Section based on Bottom Tabs */}
          <div className="pb-20 md:mb-12">
            <CategoryProductsSection selectedCategory={activeTab} />
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Home);
