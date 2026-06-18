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
    <div className="px-3 pt-3 pb-2 grid grid-cols-4 gap-2">
      {/* ── Tab 1: Mithilakart (Active by default, inactive when on Quick Shop / Mithilak) ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[56px] cursor-pointer transition-colors duration-200 ${
          isMithilakartActive
            ? 'bg-[#FFE500] text-[#1A0FAF] border-yellow-300'
            : 'bg-white text-[#1A0FAF] border-gray-100'
        }`}
      >
        <div className="w-[26px] h-[26px] overflow-hidden flex items-center justify-start">
          <img
            src="/mithilakartbglogo.png"
            alt="Icon"
            className="h-7 min-w-[70px] object-cover object-left"
          />
        </div>
        <span className="font-extrabold text-[10px] italic tracking-tight leading-none mb-0.5">
          Mithilakart
        </span>
      </motion.div>

      {/* ── Tab 2: Quick Shop (Active on /quick-shop, inactive by default) ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/quick-shop')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[56px] cursor-pointer transition-colors duration-200 ${
          isQuickShopActive
            ? 'bg-[#D1127A] text-white border-[#D1127A]'
            : 'bg-white text-gray-800 border-gray-100'
        }`}
      >
        <div
          className={`text-[12px] font-black w-[26px] h-[26px] rounded-lg flex items-center justify-center shadow-xs transition-colors duration-200 ${
            isQuickShopActive ? 'bg-white text-[#D1127A]' : 'bg-[#D1127A] text-white'
          }`}
        >
          8
        </div>
        <span
          className={`text-[10px] font-extrabold tracking-tight leading-none mb-0.5 whitespace-nowrap transition-colors duration-200 ${
            isQuickShopActive ? 'text-white' : 'text-gray-700'
          }`}
        >
          Quick Shop
        </span>
      </motion.div>

      {/* ── Tab 3: Mithilak ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/mithilak')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[56px] cursor-pointer transition-colors duration-200 ${
          isMithilakActive
            ? 'bg-[#FF5630] text-white border-[#FF5630]'
            : 'bg-white text-[#FF5630] border-gray-100'
        }`}
      >
        <div className="flex-1 flex items-center justify-center">
          <Plane size={22} className={isMithilakActive ? "text-white" : "text-[#FF5630] fill-[#FF5630]/20"} />
        </div>
        <span className={`text-[10px] font-extrabold tracking-tight leading-none mb-0.5 transition-colors duration-200 ${
          isMithilakActive ? 'text-white' : 'text-gray-700'
        }`}>
          Mithilak
        </span>
      </motion.div>

      {/* ── Tab 4: Fresh/Grocery ── */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/fresh-grocery')}
        className={`flex flex-col items-center justify-between py-1 rounded-lg shadow-xs border h-[56px] cursor-pointer transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'bg-[#1FA54E] text-white border-[#1FA54E]'
            : 'bg-white text-gray-800 border-gray-100'
        }`}
      >
        <span className={`text-[8.5px] font-extrabold px-1 rounded-sm leading-none border mt-0.5 transition-colors duration-200 ${
          isFreshGroceryActive
            ? 'text-white bg-emerald-700/40 border-emerald-500/30'
            : 'text-emerald-700 bg-emerald-50 border-emerald-200'
        }`}>
          Xtra Saver
        </span>
        <span className={`text-[9.5px] font-extrabold tracking-tight leading-none mb-0.5 whitespace-nowrap transition-colors duration-200 ${
          isFreshGroceryActive ? 'text-white' : 'text-gray-700'
        }`}>
          Fresh/Grocery
        </span>
      </motion.div>
    </div>
  );
};

export default HeaderTabs;
