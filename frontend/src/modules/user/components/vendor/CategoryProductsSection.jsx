import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Heart, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allCategoryProducts } from '../../../../data/categoryData';

const ProductCard = React.memo(({ product, onProductClick, onAddToCart }) => {
  // Use a stable pseudo-random number based on the product ID for the rating count
  const ratingCount = useMemo(() => {
    const idNum = typeof product.id === 'string' ? product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : product.id;
    return (idNum % 450) + 50;
  }, [product.id]);

  return (
    <div
      className="flex flex-col cursor-pointer group w-full md:w-[240px] md:flex-shrink-0"
      onClick={() => onProductClick(product)}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="200"
          height="200"
        />

        {/* Rating Badge on Image */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm border border-gray-100">
          <span className="text-[10px] font-bold text-slate-800">{product.rating || '4.1'}</span>
          <Star size={8} fill="currentColor" className="text-green-600" />
          <div className="w-[1px] h-2 bg-gray-300 mx-0.5" />
          <span className="text-[9px] font-medium text-gray-500">({ratingCount})</span>
        </div>
      </div>

      <div className="pt-2 px-0.5">
        <h3 className="text-[12px] font-medium text-slate-700 line-clamp-1 leading-tight">
          <span className="font-bold text-slate-900">{product.brand || 'Drasert'}</span> {product.name}
        </h3>

        <div className="mt-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[13px] font-black text-slate-900">₹{product.price}</span>
            <span className="text-[10px] text-gray-400 line-through font-medium">MRP ₹{product.oldPrice || '1,999'}</span>
            <span className="border border-[#e47911] text-[#e47911] text-[8px] px-1 py-0.2 rounded-full font-bold uppercase tracking-tight">
              {Math.round(((parseInt((product.oldPrice || '1999').toString().replace(/,/g, '')) - parseInt(product.price?.toString().replace(/,/g, ''))) / parseInt((product.oldPrice || '1999').toString().replace(/,/g, ''))) * 100)}% OFF
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#084224] tracking-tight">
            ₹{Math.round(product.price * 0.9)} with UPI offer + more
          </p>
        </div>
      </div>
    </div>
  );
});

const CategoryProductsSection = ({ selectedCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [displayCount, setDisplayCount] = useState(6);
  const navigate = useNavigate();
  const loaderRef = React.useRef(null);

  const allProducts = useMemo(() => allCategoryProducts[selectedCategory] || [], [selectedCategory]);
  const products = useMemo(() => allProducts.slice(0, displayCount), [allProducts, displayCount]);

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
    const existing = cart.find(item => item.id === product.id || item.name === product.name);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1, image: product.image, price: product.price });
    }
    localStorage.setItem('userCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage('Item added to cart');
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const handleProductClick = useCallback((product) => {
    navigate('/vendor/product-detail', {
      state: {
        product: {
          ...product,
          off: product.discount,
          label: 'Limited time deal',
          brand: 'Brand',
          reviews: '1,200',
          delivery: 'Tomorrow'
        }
      }
    });
  }, [navigate]);

  useEffect(() => {
    setIsVisible(false);
    setDisplayCount(6);
    if (selectedCategory) {
      const timer = setTimeout(() => setIsVisible(true), 30);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);

  // Observer for batch rendering - increased rootMargin for smoother slow scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && displayCount < allProducts.length) {
          setDisplayCount(prev => prev + 6);
        }
      },
      { threshold: 0.01, rootMargin: '400px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, allProducts.length]);

  if (!selectedCategory) return null;

  return (
    <div id="category-products-section" className="py-2 px-3 bg-white mt-0 transition-all duration-300 relative md:max-w-[1600px] md:mx-auto md:py-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-green-400" />
          <span className="font-bold text-sm tracking-wide whitespace-nowrap">{toastMessage}</span>
        </div>
      )}

      {allProducts.length === 0 ? (
        <div className="py-10 text-center text-gray-400 font-bold italic">
          More products coming soon...
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-2 md:flex md:flex-wrap md:justify-center xl:justify-between md:gap-x-8 md:gap-y-10 md:max-w-[1600px] md:mx-auto gap-x-3 gap-y-6 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {/* Intersection Trigger */}
          <div ref={loaderRef} className="h-20 w-full" />
        </>
      )}
    </div>
  );
};

export default React.memo(CategoryProductsSection);

