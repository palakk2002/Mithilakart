import React, { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, height = '200px', offset = '300px' }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: offset,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [offset]);

  // Once intersecting, we stay intersecting to avoid layout jumps
  useEffect(() => {
    // This is optional but ensures we don't keep the observer running if we already intersected
    // However, the above useEffect already handles the observer.
  }, [isIntersecting]);

  return (
    <div ref={sectionRef} style={{ minHeight: isIntersecting ? 'auto' : height }}>
      {isIntersecting ? children : null}
    </div>
  );
};

export default React.memo(LazySection);
