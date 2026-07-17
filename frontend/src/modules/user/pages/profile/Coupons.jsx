import React from 'react';
import { ArrowLeft, Ticket, Copy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Coupons = () => {
  const navigate = useNavigate();

  const coupons = [
    {
      code: 'MITHILAKART50',
      discount: '50% OFF',
      desc: 'On your first jewelry purchase',
      minOrder: '₹999',
      expiry: 'Ends in 2 days'
    },
    {
      code: 'GOLD20',
      discount: '₹200 OFF',
      desc: 'Exclusive discount for premium members',
      minOrder: '₹4,999',
      expiry: 'Valid till 30 May'
    }
  ];

  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';

  const pageBg = isMithilakFlow ? 'bg-gradient-to-b from-[#f3e8ff]/60 via-[#faf5ff] to-[#f5f3ff]' : isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : (isQuickShopFlow ? 'bg-[#fff5f7]' : 'bg-bg-cream');
  const headerBg = isMithilakFlow ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]' : isFreshGroceryFlow ? 'bg-[#FFF0A0]' : (isQuickShopFlow ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f]' : 'bg-[#FCF7EE] border-b border-[#F3E3CD]/60');
  const headerTextColor = (isMithilakFlow || isQuickShopFlow) ? 'text-white' : (isFreshGroceryFlow ? 'text-black' : 'text-[#3C2415]');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${pageBg} min-h-screen text-slate-900 relative transition-colors duration-300`}
    >
      {/* Global Repeating Mithila Art Page Background Texture */}
      {!(isMithilakFlow || isQuickShopFlow || isFreshGroceryFlow) && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-repeat opacity-[0.03] select-none"
          style={{
            backgroundImage: "url('/Screenshot 2026-07-17 130906.png')",
            backgroundSize: '360px',
          }}
        />
      )}

      {/* Header (Matching App Theme) */}
      <div className={`sticky top-0 z-50 p-4 flex items-center gap-4 shadow-sm relative z-10 transition-colors duration-300 ${headerBg}`}>
        <button onClick={() => navigate(-1)} className={`hover:opacity-85 transition-opacity ${headerTextColor}`}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={`text-lg font-bold tracking-wider ${headerTextColor}`}>My Coupons</h1>
      </div>

      <div className="container mx-auto px-4 py-6 w-full space-y-6 relative z-10">
        {coupons.map((coupon, idx) => (
          <div key={idx} className="relative group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6FAE4A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="border-2 border-dashed border-[#6FAE4A]/20 rounded-2xl p-6 relative z-10 group-hover:border-[#6FAE4A]/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#e8fced] rounded-xl text-[#6FAE4A]">
                   <Ticket size={24} />
                </div>
                <div className="text-right">
                   <h2 className="text-2xl font-black text-[#6FAE4A] italic leading-none mb-1">{coupon.discount}</h2>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Min Order {coupon.minOrder}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 tracking-tight mb-1">{coupon.desc}</h3>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{coupon.expiry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#e8fced] border border-[#6FAE4A]/10 rounded-xl py-3 px-4 flex items-center justify-between group-hover:border-[#6FAE4A]/30 transition-all">
                    <span className="text-xs font-black uppercase tracking-[3px] text-[#6FAE4A]">{coupon.code}</span>
                    <Copy size={16} className="text-[#6FAE4A]/70 cursor-pointer hover:text-[#6FAE4A] transition-colors" />
                  </div>
                  <button className="bg-[#6FAE4A] text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#06331b] active:scale-95 transition-all">Apply</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {coupons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-[#e8fced] rounded-full flex items-center justify-center text-[#6FAE4A]">
                <Ticket size={40} />
             </div>
             <h3 className="text-lg font-black uppercase tracking-widest text-[#6FAE4A]">No Active Coupons</h3>
             <p className="text-sm text-gray-500 font-bold max-w-xs">Don't worry, keep shopping and check back soon for exclusive deals!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Coupons;
