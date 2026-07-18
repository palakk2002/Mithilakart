import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BannerCarousel = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = React.useRef(null);

  // Preload all banner images
  useEffect(() => {
    banners.forEach((banner) => {
      const img = new Image();
      img.src = banner.image;
    });
  }, [banners]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (banners.length <= 1 || !isVisible) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, banners.length, isVisible]);

  if (!banners || banners.length === 0) return null;

  return (
    <div ref={containerRef} className="relative w-full px-3 py-2">
      {/* Mobile view - Single Banner (Untouched layout, only hidden on desktop) */}
      <div className="md:hidden relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-lg border border-gray-100 bg-gray-50">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={banners[currentIndex]?.id || currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={banners[currentIndex]?.image}
              alt={banners[currentIndex]?.title || "Banner"}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop view - Premium Hero Section (Carousel + Sidebar Stack) */}
      <div className="hidden md:grid md:grid-cols-10 md:gap-6 md:max-w-[1600px] md:mx-auto">
        {/* Main Banner Carousel (70% width) */}
        <div className="md:col-span-7 relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg border border-gray-150 bg-gray-50 group">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={banners[currentIndex]?.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={banners[currentIndex]?.image}
                alt={banners[currentIndex]?.title || "Banner"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Premium Gradient Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#e2a750] font-bold text-sm uppercase tracking-widest mb-1 animate-pulse">Exclusive Deal</span>
                <h3 className="text-white text-3xl font-black tracking-tight drop-shadow-md mb-2">
                  {banners[currentIndex]?.title || "Mithilakart Special Deals"}
                </h3>
                <p className="text-white/80 text-sm font-medium max-w-md">
                  Shop high quality products directly from curated vendors at unbelievable discounts.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Controls */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors duration-300 opacity-0 group-hover:opacity-100 shadow-md"
          >
            &#10094;
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors duration-300 opacity-0 group-hover:opacity-100 shadow-md"
          >
            &#10095;
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-8 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Side Promos (30% width) */}
        <div className="md:col-span-3 flex flex-col gap-4 justify-between">
          {[1, 2].map((offset) => {
            const idx = (currentIndex + offset) % banners.length;
            const banner = banners[idx];
            if (!banner) return null;
            return (
              <div 
                key={offset} 
                onClick={() => setCurrentIndex(idx)}
                className="relative flex-1 aspect-[16/7] w-full overflow-hidden rounded-2xl shadow-md border border-gray-150 bg-gray-50 cursor-pointer group hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={banner.image}
                  alt={banner.title || "Promo"}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white text-base font-black tracking-tight leading-tight">
                    {banner.title || "Trending Promo"}
                  </h4>
                  <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider mt-1 flex items-center gap-1 group-hover:text-[#e2a750] transition-colors">
                    View Offer <span className="text-xs">&rarr;</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preload hidden images to keep them in browser cache */}
      <div className="hidden">
        {banners.map((b, i) => (
          <img key={i} src={b.image} alt="preload" />
        ))}
      </div>

      {/* Pagination Dots (Mobile only) */}
      <div className="mt-2 flex justify-center gap-1.5 md:hidden">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-[#3E5A44]' : 'w-1.5 bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>

  );
};

export default BannerCarousel;

