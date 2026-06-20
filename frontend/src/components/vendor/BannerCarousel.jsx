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
    <div ref={containerRef} className="relative w-full overflow-hidden px-3 py-2">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-lg border border-gray-100 bg-gray-50">
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
              fetchpriority="high"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Preload hidden images to keep them in browser cache */}
        <div className="hidden">
          {banners.map((b, i) => (
            <img key={i} src={b.image} alt="preload" />
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-2 flex justify-center gap-1.5">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-[#084224]' : 'w-1.5 bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>

  );
};

export default BannerCarousel;

