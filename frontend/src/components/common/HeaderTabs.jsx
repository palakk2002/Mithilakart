import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const HeaderTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isQuickShopActive = location.pathname.includes('/quick-shop') && !isMithilakFlow;
  const isMithilakActive = location.pathname.includes('/mithilak') || (location.pathname.includes('/quick-shop') && isMithilakFlow);
  const isFreshGroceryActive = location.pathname.includes('/fresh-grocery');
  const isMithilakartActive = !isQuickShopActive && !isMithilakActive && !isFreshGroceryActive;

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
    <div className="px-3 pt-2 pb-1.5 md:px-4 md:pt-4 md:pb-2.5 grid grid-cols-4 gap-2 md:gap-3">
      {/* ── Tab 1: Mithilakart (Active by default, inactive when on Quick Shop / Mithilak) ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/home', false)}
        className={`flex flex-col items-center justify-between py-1.5 rounded-lg shadow-xs border h-[50px] md:h-[60px] cursor-pointer transition-colors duration-200 ${
          isMithilakartActive
            ? 'bg-primary-dark text-white border-primary-dark'
            : isFreshGroceryActive
              ? 'bg-white text-primary-dark border-[#7A3E17]/20 shadow-xs'
              : 'bg-white/50 text-primary-dark border-primary-dark/10'
        }`}
      >
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] overflow-hidden flex items-center justify-start">
          <img
            src="/mithilakartbglogo.png"
            alt="Icon"
            className="h-5 min-w-[50px] md:h-7 md:min-w-[70px] object-cover object-left"
          />
        </div>
        <span className="font-extrabold text-[9px] md:text-[10px] italic tracking-tight leading-none mb-0.5">
          Mithilakart
        </span>
      </motion.div>

      {/* ── Tab 2: Quick Shop (Active on /quick-shop, inactive by default) ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/quick-shop', true)}
        className={`flex flex-col items-center justify-between py-1.5 rounded-lg shadow-xs border h-[50px] md:h-[60px] cursor-pointer transition-colors duration-200 ${
          isQuickShopActive
            ? 'bg-[#d6186d] text-white border-[#d6186d]'
            : isFreshGroceryActive
              ? 'bg-white text-primary-dark border-[#7A3E17]/20 shadow-xs'
              : 'bg-white/50 text-primary-dark border-primary-dark/10'
        }`}
      >
        <div
          className={`text-[10px] md:text-[12px] font-black w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-lg flex items-center justify-center shadow-xs transition-colors duration-200 ${
            isQuickShopActive ? 'bg-white text-[#d6186d]' : 'bg-[#d6186d] text-white'
          }`}
        >
          8
        </div>
        <span
          className={`text-[9px] md:text-[10px] font-extrabold tracking-tight leading-none mb-0.5 whitespace-nowrap transition-colors duration-200 ${
            isQuickShopActive ? 'text-white' : 'text-primary-dark/80'
          }`}
        >
          Quick Shop
        </span>
      </motion.div>

      {/* ── Tab 3: Mithilak ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/mithilak', false)}
        className={`flex flex-col items-center justify-between py-1.5 rounded-lg shadow-xs border h-[50px] md:h-[60px] cursor-pointer transition-colors duration-200 ${
          isMithilakActive
            ? 'bg-[#7c3aed] text-white border-[#7c3aed]'
            : isFreshGroceryActive
              ? 'bg-white text-[#7c3aed] border-[#7A3E17]/20 shadow-xs'
              : 'bg-white/50 text-[#7c3aed] border-primary-dark/10'
        }`}
      >
        <div className="flex-1 flex items-center justify-center">
          <Plane size={22} className={`w-[18px] h-[18px] md:w-[22px] md:h-[22px] ${isMithilakActive ? "text-white" : "text-[#7c3aed] fill-[#7c3aed]/20"}`} />
        </div>
        <span className={`text-[9px] md:text-[10px] font-extrabold tracking-tight leading-none mb-0.5 transition-colors duration-200 ${
          isMithilakActive ? 'text-white' : 'text-primary-dark/80'
        }`}>
          Mithilak
        </span>
      </motion.div>

      {/* ── Tab 4: Fresh/Grocery ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick('/fresh-grocery', true)}
        className={`flex flex-col items-center justify-center py-1 rounded-lg shadow-xs border h-[50px] md:h-[60px] cursor-pointer transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'bg-[#7A3E17] text-white border-[#7A3E17]'
            : 'bg-white/90 text-[#7A3E17] border-[#7A3E17]/25'
        }`}
      >
        <span className={`text-[8px] md:text-[9.5px] font-black italic tracking-tight leading-none transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'text-amber-300'
            : 'text-[#7A3E17]/85'
        }`}>
          Xtra Saver
        </span>
        <span className={`text-[10px] md:text-[11px] font-black tracking-tight leading-none mt-0.5 whitespace-nowrap transition-colors duration-200 ${
          isFreshGroceryActive ? 'text-white' : 'text-[#7A3E17]'
        }`}>
          Grocery
        </span>
      </motion.div>
    </div>
  );
};

export default HeaderTabs;
