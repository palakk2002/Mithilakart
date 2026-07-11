import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Camera, Mic, ScanLine, Home, ChevronDown, Zap } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

/**
 * SearchBar — Address selector (top) + Search input (bottom)
 * Styled exactly like the reference image
 */
const SearchBar = ({ selectedAddress }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const isMithilakActive = location.pathname.includes('/mithilak');
  const isFreshGroceryActive = location.pathname.includes('/fresh-grocery');
  const hideAddressRow = isMithilakActive || isFreshGroceryActive;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const displayAddress = selectedAddress?.address
    ? selectedAddress.address.slice(0, 30) + '...'
    : 'Sarvanad nagar ,near pe...';

  return (
    <div className="px-2 pb-2 md:px-4 md:pb-3 flex flex-col gap-1 md:gap-3">

      {/* ── Delivery Address Field ── */}
      {!hideAddressRow && (
        <div className="flex items-center justify-between py-0.5 md:py-2 text-slate-800">
          <Link
            to="/profile/addresses"
            className={`flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1.5 rounded-lg min-w-0 transition-colors ${
              isFreshGroceryActive
                ? 'bg-[#FFF0A0] border border-[#7A3E17]/35 hover:bg-[#FFF5B8]'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          >
            <Home size={14} strokeWidth={2.5} className={`w-[11px] h-[11px] md:w-[14px] md:h-[14px] flex-shrink-0 fill-current ${
              isFreshGroceryActive ? 'text-black fill-black/10' : 'text-primary-dark fill-primary-dark/20'
            }`} />
            <span className={`text-[9px] md:text-[11px] font-black tracking-tight ${isFreshGroceryActive ? 'text-black' : 'text-primary-dark'}`}>{t('nav.home').toUpperCase()}</span>
            <span className={`text-[9px] md:text-[11px] font-medium truncate max-w-[130px] md:max-w-[170px] ${isFreshGroceryActive ? 'text-slate-800' : 'text-primary-dark'}`}>
              {displayAddress}
            </span>
            <ChevronDown size={12} strokeWidth={3} className={`w-[9px] h-[9px] md:w-[12px] md:h-[12px] flex-shrink-0 ${isFreshGroceryActive ? 'text-[#7A3E17]' : 'text-primary-dark'}`} />
          </Link>

          {/* Energy/Lightning Pill or 8 Min Badge */}
          <div className="flex items-center gap-1">
            <LanguageSelector isDarkHeader={false} />
            {isFreshGroceryActive ? (
              <div className="flex items-center gap-1 bg-[#7A3E17] text-white px-2 py-0.5 rounded-lg shadow-sm border border-[#7A3E17]">
                <span className="text-[12px] md:text-[14px] font-black leading-none">8</span>
                <span className="text-[8px] md:text-[9px] font-bold leading-none text-white/90">min</span>
              </div>
            ) : (
              <div className="flex items-center gap-0.5 md:gap-1 bg-white px-1 py-0 md:px-2 md:py-0.5 rounded-full shadow-xs border border-primary-green">
                <Zap size={12} className="w-[9px] h-[9px] md:w-[12px] md:h-[12px] text-amber-500 fill-amber-500" />
                <span className="text-[9px] md:text-[11px] font-extrabold text-primary-dark">3</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Search + Scan Field ── */}
      <div className="flex items-center gap-1 md:gap-2">
        <motion.form
          onSubmit={handleSubmit}
          animate={{ scale: searchFocused ? 1.005 : 1 }}
          className={`flex-1 flex items-center gap-1.5 md:gap-3 rounded-xl px-2.5 py-1 md:px-4 md:py-2.5 border shadow-xs transition-colors duration-200 ${
            isFreshGroceryActive
              ? 'bg-[#FFF9DB] border-[#7A3E17] text-[#7A3E17]'
              : 'bg-white border-gray-100 text-gray-800'
          }`}
        >
          <Search size={16} strokeWidth={2.5} className={`w-[13px] h-[13px] md:w-[16px] md:h-[16px] flex-shrink-0 ${isFreshGroceryActive ? 'text-[#7A3E17]' : 'text-gray-400'}`} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (!location.pathname.includes('/search')) {
                navigate('/search');
              }
            }}
            placeholder={isFreshGroceryActive ? t('nav.searchInGrocery') : t('nav.searchPlaceholder')}
            className={`flex-1 bg-transparent outline-none text-[11px] md:text-[13px] font-semibold min-w-0 ${
              isFreshGroceryActive
                ? 'text-[#7A3E17] placeholder:text-[#7A3E17]/65'
                : 'text-gray-800 placeholder:text-gray-400'
            }`}
          />
          {!isFreshGroceryActive && (
            <Camera size={18} strokeWidth={2.2} className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          )}
          <Mic size={18} strokeWidth={2.2} className={`w-[14px] h-[14px] md:w-[18px] md:h-[18px] cursor-pointer hover:text-opacity-80 transition-colors ${
            isFreshGroceryActive ? 'text-[#7A3E17]' : 'text-gray-400 hover:text-gray-600'
          }`} />
        </motion.form>

        <motion.button
          whileTap={{ scale: 0.92 }}
          className={`p-1.5 md:p-3 rounded-xl flex-shrink-0 shadow-xs border transition-colors duration-200 ${
            isFreshGroceryActive ? 'bg-[#FFF9DB] border-[#7A3E17] text-[#7A3E17]' : 'bg-white border-transparent text-primary-dark'
          }`}
        >
          <ScanLine size={18} strokeWidth={2.2} className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-current" />
        </motion.button>

        {isFreshGroceryActive && (
          <LanguageSelector isDarkHeader={false} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
