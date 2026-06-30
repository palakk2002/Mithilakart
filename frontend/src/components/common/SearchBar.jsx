import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Camera, Mic, ScanLine, Home, ChevronDown, Zap } from 'lucide-react';

/**
 * SearchBar — Address selector (top) + Search input (bottom)
 * Styled exactly like the reference image
 */
const SearchBar = ({ selectedAddress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const isMithilakActive = location.pathname.includes('/mithilak');
  const isFreshGroceryActive = location.pathname.includes('/fresh-grocery');
  const hideAddressRow = isMithilakActive || isFreshGroceryActive;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) navigate(`/vendor/search?q=${encodeURIComponent(query.trim())}`);
  };

  const displayAddress = selectedAddress?.address
    ? selectedAddress.address.slice(0, 30) + '...'
    : 'Sarvanad nagar ,near pearl girl...';

  return (
    <div className="px-2 pb-1.5 md:px-3 md:pb-2 flex flex-col gap-1.5 md:gap-2">

      {/* ── Delivery Address Field (Flipkart Style) ── */}
      {!hideAddressRow && (
        <div className="flex items-center justify-between py-0.5 md:py-1 text-slate-800">
          <Link
            to="/vendor/profile/addresses"
            className="flex items-center gap-1 md:gap-1.5 bg-white/30 px-2 py-1 md:px-3 md:py-1.5 rounded-lg min-w-0 transition-colors hover:bg-white/50"
          >
            <Home size={14} strokeWidth={2.5} className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-primary-dark flex-shrink-0 fill-primary-dark/20" />
            <span className="text-[10px] md:text-[11px] font-black text-primary-dark tracking-tight">HOME</span>
            <span className="text-[10px] md:text-[11px] text-primary-dark font-medium truncate max-w-[120px] md:max-w-[170px]">
              {displayAddress}
            </span>
            <ChevronDown size={12} strokeWidth={3} className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] text-primary-dark flex-shrink-0" />
          </Link>

          {/* Energy/Lightning Pill */}
          <div className="flex items-center gap-0.5 md:gap-1 bg-white px-1.5 py-0.2 md:px-2 md:py-0.5 rounded-full shadow-xs border border-primary-green">
            <Zap size={12} className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] text-amber-500 fill-amber-500" />
            <span className="text-[10px] md:text-[11px] font-extrabold text-primary-dark">3</span>
          </div>
        </div>
      )}

      {/* ── Search + Scan Field ── */}
      <div className="flex items-center gap-1.5 md:gap-2">
        <motion.form
          onSubmit={handleSubmit}
          animate={{ scale: searchFocused ? 1.005 : 1 }}
          className="flex-1 flex items-center gap-1.5 md:gap-2 bg-white rounded-xl px-2.5 py-1.5 md:px-3 md:py-2 border border-gray-100 shadow-xs"
        >
          <Search size={16} strokeWidth={2.5} className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-gray-400 flex-shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-[12px] md:text-[13px] placeholder:text-gray-400 text-gray-800 font-semibold min-w-0"
          />
          <Camera size={18} strokeWidth={2.2} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          <Mic size={18} strokeWidth={2.2} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
        </motion.form>

        <motion.button
          whileTap={{ scale: 0.92 }}
          className="p-2 md:p-2.5 bg-white rounded-xl flex-shrink-0 shadow-xs"
        >
          <ScanLine size={18} strokeWidth={2.2} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-primary-dark" />
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
