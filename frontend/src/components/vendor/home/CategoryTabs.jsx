import React from 'react';

const CategoryTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="mt-4 pb-0">
      <div className="flex overflow-x-auto gap-6 px-6 no-scrollbar pt-14 pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.label;
          return (
            <div 
              key={idx} 
              onClick={() => onTabClick(tab.label)}
              className="flex flex-col items-center gap-2 min-w-[85px] cursor-pointer group relative"
            >
              {/* Background Capsule */}
              <div className={`relative w-[70px] h-[34px] rounded-full transition-all duration-300 ${
                isActive ? 'bg-[#2874f0]' : 'bg-blue-100/60'
              }`}>
                {isActive && <div className="absolute inset-0 bg-white/10 rounded-full" />}
              </div>

              {/* Circular Product Image */}
              {tab.img && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[85px] h-[85px] pointer-events-none z-20">
                  <img 
                    src={tab.img} 
                    alt={tab.label} 
                    className="w-full h-full object-contain transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]" 
                    loading="lazy"
                  />
                </div>
              )}

              {/* Label and Indicator */}
              <div className="flex flex-col items-center gap-1.5 mt-1">
                <span className={`text-[12px] font-bold tracking-tight transition-colors duration-300 ${
                  isActive ? 'text-[#2874f0]' : 'text-slate-600'
                }`}>
                  {tab.label}
                </span>
                {isActive && <div className="w-8 h-1 bg-[#2874f0] rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(CategoryTabs);
