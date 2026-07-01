import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Custom SVG icons — pixel-perfect Flipkart style
   Each returns a <svg> at the given size
───────────────────────────────────────────── */
const IconForYou = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconFashion = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
  </svg>
);

const IconBeauty = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6l1 7H8L9 3z"/>
    <path d="M8 10v9a1 1 0 001 1h6a1 1 0 001-1v-9"/>
    <path d="M10 3V2M14 3V2"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
  </svg>
);

const IconElectronics = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const IconJewellery = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 13L2 9z"/>
    <path d="M11 3L8 9l4 13 4-13-3-6"/>
    <line x1="2" y1="9" x2="22" y2="9"/>
  </svg>
);

const IconToys = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <path d="M12 6V4M8 4h8"/>
    <circle cx="8.5" cy="12" r="1.5"/>
    <circle cx="15.5" cy="12" r="1.5"/>
    <line x1="12" y1="10" x2="12" y2="14"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
);

const IconStationery = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
    <path d="M5 19h14"/>
    <path d="M9 19v-4h6v4"/>
  </svg>
);

const IconGifting = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconElectrical = ({ size = 24, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Category list — project ki actual categories
───────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'for-you',     label: 'All',         Svg: IconForYou     },
  { id: 'beauty',      label: 'Beauty',      Svg: IconBeauty     },
  { id: 'gifting',     label: 'Gifting',     Svg: IconGifting    },
  { id: 'electronics', label: 'Electronics', Svg: IconElectronics},
  { id: 'jewellery',   label: 'Jewellery',   Svg: IconJewellery  },
  { id: 'toys',        label: 'Toys',        Svg: IconToys       },
  { id: 'stationery',  label: 'Stationery',  Svg: IconStationery },
  { id: 'fashion',     label: 'Fashion',     Svg: IconFashion    },
  { id: 'electrical',  label: 'Electrical',  Svg: IconElectrical },
];

const CategoryNavbar = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (cat) => {
    setSelectedCategory(cat.label);
    if (cat.id === 'toys') {
      navigate('/vendor/toys');
      return;
    }
    if (cat.id === 'beauty') {
      navigate('/vendor/beauty');
      return;
    }
    if (!location.pathname.includes('/vendor/home')) {
      navigate('/vendor/home');
    }
  };

  return (
    <div
      className="flex items-center overflow-x-auto no-scrollbar bg-primary-green p-2 gap-1.5 border-b border-black/5"
      role="navigation"
      aria-label="Product categories"
    >
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.label;

        return (
          <motion.button
            key={cat.id}
            onClick={() => handleSelect(cat)}
            whileTap={{ scale: 0.94 }}
            animate={{
              backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
              boxShadow: isActive ? '0px 2px 6px rgba(0, 0, 0, 0.05)' : '0px 0px 0px rgba(0, 0, 0, 0)',
            }}
            transition={{ duration: 0.2 }}
            className="w-[62px] h-[62px] flex flex-col items-center justify-center flex-shrink-0 rounded-[16px] focus:outline-none relative cursor-pointer"
            aria-pressed={isActive}
            aria-label={cat.label}
          >
            {/* SVG Icon */}
            <motion.div
              animate={{ color: isActive ? '#084224' : '#1e293b' }}
              transition={{ duration: 0.18 }}
              className="mb-0.5 leading-none flex items-center justify-center"
            >
              <cat.Svg size={20} active={isActive} />
            </motion.div>

            {/* Label */}
            <motion.span
              animate={{
                color: isActive ? '#084224' : '#1e293b',
              }}
              transition={{ duration: 0.18 }}
              className="text-[10px] font-black tracking-tight whitespace-nowrap leading-tight"
            >
              {cat.label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryNavbar;
