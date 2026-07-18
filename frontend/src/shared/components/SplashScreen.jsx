import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2.4 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2400);

    // Call onComplete after 2.9 seconds (allowing 500ms for fade out transition)
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#000000] overflow-hidden transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full h-full">
        {/* Background/fallback under the image */}
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Animated Splash Image */}
        <img
          src="/splashmithi.jpg"
          alt="Mithilakart Splash"
          className="w-full h-full object-cover animate-splash-zoom relative z-10"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
