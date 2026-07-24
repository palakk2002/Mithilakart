import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productBelongsToTab } from '../../../../shared/utils/marketplaceHelpers';
import { getProductImage, handleImageError } from '../../../../shared/utils/imageUtils';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();

  const getDeliveryBadge = () => {
    if (product.listings && product.listings.length > 0) {
      const quickListing = product.listings.find(
        (l) => l.tab === 'quick_shop' || l.tab === 'groceries_fresh'
      );
      if (quickListing) {
        return `${quickListing.quickDeliveryTime || 20} Min`;
      }
      const standardListing = product.listings.find(
        (l) => l.tab === 'mithilakart' || l.tab === 'mithilak'
      );
      if (standardListing) {
        return `Estimated Delivery ${standardListing.deliveryTime || '3 Days'}`;
      }
    }

    if (product.tab === 'quick_shop' || product.tab === 'groceries_fresh') {
      return `${product.quickDeliveryTime || 20} Min`;
    }
    if (product.tab === 'mithilakart' || product.tab === 'mithilak') {
      return `Estimated Delivery ${product.deliveryTime || '3 Days'}`;
    }

    if (productBelongsToTab(product, 'groceries_fresh')) {
      return '25 Min';
    }
    if (productBelongsToTab(product, 'quick_shop')) {
      return '20 Min';
    }
    if (productBelongsToTab(product, 'mithilak')) {
      return 'Estimated Delivery 3 Days';
    }
    if (productBelongsToTab(product, 'mithilakart')) {
      return 'Estimated Delivery 5 Days';
    }

    return null;
  };

  const deliveryBadge = getDeliveryBadge();

  const isOutOfStock = product.stock === 0 || product.isOutOfStock === true || product.status === 'Out of Stock' || product.outOfStock === true;

  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border border-slate-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-white p-2 md:p-4">
        {deliveryBadge && !isOutOfStock && (
          <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-bold tracking-wide shadow-sm ${
            deliveryBadge.includes('Min') 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white'
          }`}>
            {deliveryBadge}
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-bold tracking-wide shadow-sm bg-red-600 text-white uppercase">
            Out of Stock
          </span>
        )}
        <img
          src={getProductImage(product.image || product.img)}
          alt={product.title || product.name}
          onError={handleImageError}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-2 right-2 p-1.5 md:top-3 md:right-3 md:p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-300 hover:text-red-500 transition-colors shadow-sm">
          <Heart size={15} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
      <div className="p-2 md:p-3 flex flex-col flex-1">
        <h3 className="text-[11px] md:text-sm font-medium text-slate-800 line-clamp-2 leading-snug min-h-[30px] md:min-h-[40px]" title={product.title || product.name}>
          {product.title || product.name}
        </h3>

        <div className="mt-1 md:mt-2 flex items-center gap-1.5">
          <div className="bg-[#e47911] text-white text-[8px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded flex items-center font-bold">
            {product.rating || "4.2"} ★
          </div>
          <span className="text-slate-400 text-[10px] md:text-xs font-medium">({product.reviews || "120"})</span>
        </div>

        <div className="mt-1.5 md:mt-3 flex flex-col">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="text-xs md:text-base font-bold text-slate-900">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-[10px] md:text-xs text-slate-400 line-through">{t('product.mrp')} ₹{product.oldPrice}</span>
            )}
            {product.oldPrice && (
              <span className="border border-[#e47911] text-[#e47911] text-[8px] md:text-[9px] px-1 md:px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tight">
                {Math.round(((parseInt(product.oldPrice?.toString().replace(/,/g, '')) - parseInt(product.price?.toString().replace(/,/g, ''))) / parseInt(product.oldPrice?.toString().replace(/,/g, ''))) * 100)}% {t('product.off')}
              </span>
            )}
          </div>
          {deliveryBadge ? (
            <p className="text-[9px] md:text-[10px] text-slate-600 mt-0.5 md:mt-1 flex items-center gap-1 font-semibold">
              <span className="text-blue-500 font-bold">✓</span> {deliveryBadge}
            </p>
          ) : (
            <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 md:mt-1 flex items-center gap-1">
              <span className="text-[#e47911] font-bold">Prime</span> {t('product.deliveryTomorrow')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
