import React from 'react';

const CategoryTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="mt-4 pb-0 md:max-w-[1600px] md:mx-auto">
      <div className="flex overflow-x-auto gap-6 px-6 no-scrollbar pt-14 pb-4 md:justify-center md:gap-16 md:overflow-x-visible md:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.label;
          return (
            <div 
              key={idx} 
              onClick={() => onTabClick(tab.label)}
              className="flex flex-col items-center gap-2 min-w-[85px] md:min-w-[110px] cursor-pointer group relative"
            >
              {/* Background Capsule */}
              <div className={`relative w-[70px] h-[34px] md:w-[90px] md:h-[40px] rounded-full transition-all duration-300 ${
                isActive ? 'bg-[#084224]' : 'bg-[#084224]/10 hover:bg-[#084224]/20'
              }`}>
                {isActive && <div className="absolute inset-0 bg-white/10 rounded-full" />}
              </div>

              {/* Circular Product Image */}
              {tab.img && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[85px] h-[85px] md:w-[105px] md:h-[105px] md:-top-14 pointer-events-none z-20">
                  <img 
                    src={tab.img} 
                    alt={tab.label} 
                    className="w-full h-full object-cover rounded-full border-2 border-white shadow-md bg-white transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg" 
                    loading="lazy"
                  />
                </div>
              )}

              {/* Label and Indicator */}
              <div className="flex flex-col items-center gap-1.5 mt-1">
                <span className={`text-[12px] md:text-[14px] font-bold tracking-tight transition-colors duration-300 ${
                  isActive ? 'text-[#084224]' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {tab.label}
                </span>
                {isActive && <div className="w-8 h-1 bg-[#084224] rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(CategoryTabs);


