import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const HeaderTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isQuickShopActive = location.pathname.includes('/quick-shop');
  const isMithilakActive = location.pathname.includes('/mithilak');
  const isFreshGroceryActive = location.pathname.includes('/fresh-grocery');
  const isMithilakartActive = !isQuickShopActive && !isMithilakActive && !isFreshGroceryActive;

  return (
    <div className="px-2 pt-1.5 pb-1 md:px-3 md:pt-3 md:pb-2 grid grid-cols-4 gap-1.5 md:gap-2">
      {/* ── Tab 1: Mithilakart (Active by default, inactive when on Quick Shop / Mithilak) ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[46px] md:h-[56px] cursor-pointer transition-colors duration-200 ${
          isMithilakartActive
            ? 'bg-primary-dark text-white border-primary-dark'
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
        onClick={() => navigate('/quick-shop')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[46px] md:h-[56px] cursor-pointer transition-colors duration-200 ${
          isQuickShopActive
            ? 'bg-accent-orange text-white border-accent-orange'
            : 'bg-white/50 text-primary-dark border-primary-dark/10'
        }`}
      >
        <div
          className={`text-[10px] md:text-[12px] font-black w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-lg flex items-center justify-center shadow-xs transition-colors duration-200 ${
            isQuickShopActive ? 'bg-white text-accent-orange' : 'bg-accent-orange text-white'
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
        onClick={() => navigate('/mithilak')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[46px] md:h-[56px] cursor-pointer transition-colors duration-200 ${
          isMithilakActive
            ? 'bg-red-600 text-white border-red-600'
            : 'bg-white/50 text-red-600 border-primary-dark/10'
        }`}
      >
        <div className="flex-1 flex items-center justify-center">
          <Plane size={22} className={`w-[18px] h-[18px] md:w-[22px] md:h-[22px] ${isMithilakActive ? "text-white" : "text-red-600 fill-red-600/20"}`} />
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
        onClick={() => navigate('/fresh-grocery')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[46px] md:h-[56px] cursor-pointer transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'bg-emerald-700 text-white border-emerald-700'
            : 'bg-white/50 text-emerald-700 border-primary-dark/10'
        }`}
      >
        <span className={`text-[7.5px] md:text-[8.5px] font-extrabold px-1 rounded-sm leading-none border mt-0.5 transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'text-white bg-emerald-800/40 border-emerald-600/30'
            : 'text-emerald-700 bg-emerald-50 border-emerald-200'
        }`}>
          Xtra Saver
        </span>
        <span className={`text-[8.5px] md:text-[9.5px] font-extrabold tracking-tight leading-none mb-0.5 whitespace-nowrap transition-colors duration-200 ${
          isFreshGroceryActive ? 'text-white' : 'text-primary-dark/80'
        }`}>
          Fresh/Grocery
        </span>
      </motion.div>
    </div>
  );
};

export default HeaderTabs;
