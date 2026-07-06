import React from 'react';
import { ArrowLeft, Ticket, Copy, Zap, Clock } from 'lucide-react';
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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[var(--card-bg)] min-h-screen text-[var(--card-text)]"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--card-bg)]/90 backdrop-blur-md border-b border-[var(--card-border)] p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="hover:text-[var(--color-gold)] transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">My Coupons</h1>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {coupons.map((coupon, idx) => (
          <div key={idx} className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-black/20 border-2 border-dashed border-[var(--card-border)] rounded-2xl p-6 relative z-10 group-hover:border-[var(--color-gold)]/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[var(--color-gold)]/10 rounded-xl text-[var(--color-gold)]">
                   <Ticket size={24} />
                </div>
                <div className="text-right">
                   <h2 className="text-2xl font-black text-[var(--color-gold)] italic leading-none mb-1">{coupon.discount}</h2>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[var(--card-sub)]">Min Order {coupon.minOrder}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-black tracking-tight mb-1">{coupon.desc}</h3>
                  <div className="flex items-center gap-1 text-[var(--card-sub)]">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{coupon.expiry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-black/40 border border-[var(--card-border)] rounded-xl py-3 px-4 flex items-center justify-between group-hover:border-[var(--color-gold)]/30 transition-all">
                    <span className="text-xs font-black uppercase tracking-[3px] text-[var(--color-gold)]">{coupon.code}</span>
                    <Copy size={16} className="text-[var(--card-sub)] cursor-pointer hover:text-[var(--color-gold)] transition-colors" />
                  </div>
                  <button className="bg-[var(--color-gold)] text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all">Apply</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {coupons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center text-[var(--color-gold)]">
                <Ticket size={40} />
             </div>
             <h3 className="text-lg font-black uppercase tracking-widest">No Active Coupons</h3>
             <p className="text-sm text-[var(--card-sub)] font-bold max-w-xs">Don't worry, keep shopping and check back soon for exclusive deals!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Coupons;
