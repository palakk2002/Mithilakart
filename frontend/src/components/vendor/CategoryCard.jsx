import React from 'react';

const CategoryCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="col-span-1 bg-[#F5F5F5] rounded-[16px] h-[125px] flex flex-col items-center justify-between overflow-hidden cursor-pointer active:scale-98 transition-transform select-none p-2 shadow-2xs"
    >
      {/* Category Title */}
      <div className="w-full text-center pt-1">
        <span className="text-[12px] font-semibold text-gray-800 leading-[1.25] tracking-tight line-clamp-2 block px-1">
          {item.name}
        </span>
      </div>

      {/* Category Image */}
      <div className="w-full h-[68%] flex items-center justify-center p-1.5 mt-auto">
        <img
          src={item.img}
          alt={item.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
