import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';

  const pageBg = isMithilakFlow 
    ? 'bg-gradient-to-b from-[#e0f2f1]/40 via-[#f2faf9] to-[#ffffff]' 
    : isFreshGroceryFlow 
      ? 'bg-gradient-to-b from-[#FFF0A0]/20 via-[#FFFDF3] to-[#FFF]' 
      : isQuickShopFlow 
        ? 'bg-gradient-to-b from-[#fff5f7] via-[#fffcfc] to-[#fff]' 
        : 'bg-gradient-to-b from-[#eaf5ee]/50 via-[#f7faf8] to-[#ffffff]';

  const textPrimary = isMithilakFlow 
    ? 'text-[#207C8A]' 
    : isFreshGroceryFlow 
      ? 'text-[#7A3E17]' 
      : isQuickShopFlow 
        ? 'text-[#F26522]' 
        : 'text-[#3E5A44]';

  const buttonBg = isMithilakFlow 
    ? 'bg-[#207C8A] hover:bg-[#1a6672]' 
    : isFreshGroceryFlow 
      ? 'bg-[#D9A21B] hover:bg-[#c49218] text-[#7A3E17]' 
      : isQuickShopFlow 
        ? 'bg-[#F26522] hover:bg-[#d9561b]' 
        : 'bg-[#3E5A44] hover:bg-[#2d4332]';

  const borderPrimary = isMithilakFlow 
    ? 'border-[#207C8A] text-[#207C8A] hover:bg-[#207C8A]/5' 
    : isFreshGroceryFlow 
      ? 'border-[#D9A21B] text-[#7A3E17] hover:bg-[#D9A21B]/5' 
      : isQuickShopFlow 
        ? 'border-[#F26522] text-[#F26522] hover:bg-[#F26522]/5' 
        : 'border-[#3E5A44] text-[#3E5A44] hover:bg-[#3E5A44]/5';

  return (
    <div className={`min-h-screen ${pageBg} flex items-center justify-center p-4`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-center"
      >
        <div className="relative flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className={`p-6 rounded-full bg-slate-50 border border-slate-100 ${textPrimary}`}
          >
            <Compass size={64} className="stroke-[1.5]" />
          </motion.div>
        </div>

        <h1 className="text-7xl font-black tracking-tighter text-slate-800 mb-2">404</h1>
        
        <h2 className={`text-lg font-black uppercase tracking-widest ${textPrimary} mb-4`}>
          Page Not Found
        </h2>
        
        <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-8 max-w-xs mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl border ${borderPrimary} font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm`}
          >
            <ArrowLeft size={14} />
            Back
          </button>
          
          <button
            onClick={() => navigate('/home')}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl ${buttonBg} text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md`}
          >
            <Home size={14} />
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
