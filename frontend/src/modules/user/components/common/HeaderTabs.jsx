import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeaderTabs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isQuickShopActive = location.pathname.includes('/quick-shop') && !isMithilakFlow;
  const isMithilakActive = location.pathname.includes('/mithilak') || (location.pathname.includes('/quick-shop') && isMithilakFlow);
  const isFreshGroceryActive = location.pathname.includes('/fresh-grocery');
  const isMithilakartActive = !isQuickShopActive && !isMithilakActive && !isFreshGroceryActive;

  const isHeaderLight = isMithilakartActive || isFreshGroceryActive;

  const handleTabClick = (path, isQuick) => {
    localStorage.setItem('isQuickShopFlow', isQuick ? 'true' : 'false');
    if (path === '/mithilak') {
      localStorage.setItem('isMithilakFlow', 'true');
    } else {
      localStorage.setItem('isMithilakFlow', 'false');
    }
    if (path === '/fresh-grocery') {
      localStorage.setItem('isFreshGroceryFlow', 'true');
    } else {
      localStorage.setItem('isFreshGroceryFlow', 'false');
    }
    navigate(path);
  };

  return (
    <div className="px-2 pt-1.5 pb-1 md:px-4 md:pt-4 md:pb-2.5 grid grid-cols-4 gap-1.5 md:gap-3">
      {/* ── Tab 1: Mithilakart ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/home', false)}
        className={`flex flex-col items-center justify-center py-1 md:py-1.5 rounded-lg border h-[42px] md:h-[60px] gap-0.5 md:gap-1.5 cursor-pointer transition-all duration-300 ${
          isMithilakartActive
            ? 'bg-[#052b17] text-white border-[#052b17] shadow-md scale-102 z-10'
            : isFreshGroceryActive
              ? 'bg-white/35 text-[#7A3E17]/85 border-white/15 hover:bg-white/45'
              : isHeaderLight
                ? 'bg-black/5 text-[#084224]/80 border-black/5 hover:bg-black/10'
                : 'bg-white/15 text-white/90 border-white/10 hover:bg-white/25'
        }`}
      >
        <div className="w-[32px] h-[14px] md:w-[48px] md:h-[22px] flex items-center justify-center">
          <img
            src="/mthibg.png"
            alt="Icon"
            className={`h-full w-full object-contain transition-all duration-300 ${
              isMithilakartActive 
                ? 'brightness-0 invert' 
                : isFreshGroceryActive 
                  ? 'brightness-0' 
                  : isHeaderLight 
                    ? 'brightness-50' 
                    : 'brightness-0 invert'
            }`}
          />
        </div>
        <span className={`font-extrabold text-[11px] md:text-[14px] italic tracking-tight leading-none mb-0.5 transition-colors duration-300 ${
          isMithilakartActive 
            ? 'text-white' 
            : isFreshGroceryActive
              ? 'text-[#7A3E17]/85'
              : isHeaderLight 
                ? 'text-[#084224]/80' 
                : 'text-white'
        }`}>
          {t('home.title')}
        </span>
      </motion.div>

      {/* ── Tab 2: Quick Shop ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/quick-shop', true)}
        className={`flex flex-col items-center justify-center py-1 md:py-1.5 rounded-lg border h-[42px] md:h-[60px] gap-0.5 md:gap-1.5 cursor-pointer transition-all duration-300 ${
          isQuickShopActive
            ? 'bg-white text-[#d6186d] border-white shadow-md scale-102 z-10'
            : isFreshGroceryActive
              ? 'bg-white/35 text-[#7A3E17]/85 border-white/15 hover:bg-white/45'
              : isMithilakartActive
                ? 'bg-[#084224]/12 text-[#084224]/90 border-[#084224]/15 hover:bg-[#084224]/20'
                : isHeaderLight
                  ? 'bg-black/5 text-[#d6186d]/85 border-black/5 hover:bg-black/10'
                  : 'bg-white/15 text-white/90 border-white/10 hover:bg-white/25'
        }`}
      >
        <div
          className={`w-[16px] h-[16px] md:w-[26px] md:h-[26px] rounded-full flex items-center justify-center shadow-xs transition-all duration-300 ${
            isQuickShopActive 
              ? 'bg-[#d6186d] text-white' 
              : isFreshGroceryActive
                ? 'bg-[#7A3E17]/15 text-[#7A3E17]'
                : isMithilakartActive
                  ? 'bg-[#084224]/15 text-[#084224]'
                  : isHeaderLight
                    ? 'bg-[#d6186d]/15 text-[#d6186d]'
                    : 'bg-white text-[#d6186d]'
          }`}
        >
          <Zap size={10} className="fill-current w-[10px] h-[10px] md:w-[13px] md:h-[13px]" />
        </div>
        <span
          className={`text-[11px] md:text-[14px] font-extrabold tracking-tight leading-none mb-0.5 whitespace-nowrap transition-colors duration-300 ${
            isQuickShopActive 
              ? 'text-[#d6186d]' 
              : isFreshGroceryActive
                ? 'text-[#7A3E17]/85'
                : isMithilakartActive
                  ? 'text-[#084224]/85'
                  : isHeaderLight 
                    ? 'text-[#d6186d]/85' 
                    : 'text-white'
          }`}
        >
          {t('nav.quickShop')}
        </span>
      </motion.div>

      {/* ── Tab 3: Mithilak ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/mithilak', false)}
        className={`flex flex-col items-center justify-center py-1 md:py-1.5 rounded-lg border h-[42px] md:h-[60px] gap-0.5 md:gap-1.5 cursor-pointer transition-all duration-300 ${
          isMithilakActive
            ? 'bg-white text-[#7c3aed] border-white shadow-md scale-102 z-10'
            : isFreshGroceryActive
              ? 'bg-white/35 text-[#7A3E17]/85 border-white/15 hover:bg-white/45'
              : isMithilakartActive
                ? 'bg-[#084224]/12 text-[#084224]/90 border-[#084224]/15 hover:bg-[#084224]/20'
                : isHeaderLight
                  ? 'bg-black/5 text-[#7c3aed]/80 border-black/5 hover:bg-black/10'
                  : 'bg-white/15 text-white/90 border-white/10 hover:bg-white/25'
        }`}
      >
        <div className="flex items-center justify-center">
          <Plane 
            size={22} 
            className={`w-[14px] h-[14px] md:w-[22px] md:h-[22px] transition-all duration-300 ${
              isMithilakActive 
                ? "text-[#7c3aed] fill-[#7c3aed]/20" 
                : isFreshGroceryActive
                  ? "text-[#7A3E17]/85"
                  : isMithilakartActive
                    ? "text-[#084224]/85"
                    : isHeaderLight 
                      ? "text-[#7c3aed]" 
                      : "text-white"
            }`} 
          />
        </div>
        <span className={`text-[11px] md:text-[14px] font-extrabold tracking-tight leading-none mb-0.5 transition-colors duration-300 ${
          isMithilakActive 
            ? 'text-[#7c3aed]' 
            : isFreshGroceryActive
              ? 'text-[#7A3E17]/85'
              : isMithilakartActive
                ? 'text-[#084224]/85'
                : isHeaderLight 
                  ? 'text-[#7c3aed]/80' 
                  : 'text-white'
        }`}>
          {t('nav.mithilak')}
        </span>
      </motion.div>

      {/* ── Tab 4: Fresh/Grocery ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/fresh-grocery', true)}
        className={`flex flex-col items-center justify-center py-0.5 md:py-1 rounded-lg border h-[42px] md:h-[60px] cursor-pointer transition-all duration-300 ${
          isFreshGroceryActive
            ? 'bg-white text-[#7A3E17] border-white shadow-md scale-102 z-10'
            : isMithilakartActive
              ? 'bg-[#084224]/12 text-[#084224]/90 border-[#084224]/15 hover:bg-[#084224]/20'
              : isHeaderLight
                ? 'bg-black/5 text-[#7A3E17]/85 border-black/5 hover:bg-black/10'
                : 'bg-white/15 text-white/90 border-white/10 hover:bg-white/25'
        }`}
      >
        <span className={`text-[10px] md:text-[13.5px] font-extrabold tracking-tight leading-tight text-center px-0.5 transition-colors duration-300 flex flex-col items-center justify-center ${
          isFreshGroceryActive 
            ? 'text-[#7A3E17]' 
            : isMithilakartActive
              ? 'text-[#084224]/85'
              : isHeaderLight
                ? 'text-[#7A3E17]'
                : 'text-white'
        }`}>
          {t('nav.groceriesAndFresh').split(' ').map((word, idx) => (
            <span key={idx} className="block leading-none">{word}</span>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default HeaderTabs;
