import React from 'react';

const CategoryCard = ({ item, onClick }) => {
  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';
  const cardBg = isMithilakFlow
    ? 'bg-[#ede9fe]'
    : isFreshGroceryFlow
      ? 'bg-[#FFF0A0] border border-[#7A3E17]/20 shadow-2xs'
      : 'bg-[#fdebf3]';

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform select-none w-20"
    >
      {/* Category Image Wrapper with soft background */}
      <div className={`w-16 h-16 rounded-[22px] ${cardBg} overflow-hidden flex items-center justify-center p-2.5`}>
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>

      {/* Category Title */}
      <span className="text-[11px] font-medium text-center text-gray-800 mt-2 leading-tight tracking-tight line-clamp-2 h-[32px] w-full flex items-start justify-center">
        {item.name}
      </span>
    </div>
  );
};

export default CategoryCard;

