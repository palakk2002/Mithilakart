import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Zap, 
  HelpCircle, 
  Mail, 
  ChevronRight, 
  Store, 
  Bell,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAccountStore from '../../../store/useAccountStore';
import { useTranslation } from 'react-i18next';

const VendorProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userProfile } = useAccountStore();

  const handleLogout = () => {
    localStorage.removeItem('userCart');
    localStorage.removeItem('userWishlist');
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAuthenticated');
    sessionStorage.clear();
    navigate('/vendor/login', { replace: true });
  };

  const profileOptions = [
    { label: t('profile.myOrders'), icon: <ShoppingBag size={18} />, path: '/profile/orders' },
    { label: t('profile.wishlist'), icon: <Heart size={18} />, path: '/profile/wishlist' },
    { label: t('profile.coupons'), icon: <Zap size={18} />, path: '/profile/coupons' },
    { label: t('profile.editProfile'), icon: <Mail size={18} />, path: '/profile/edit' },
    { label: t('profile.myAddresses'), icon: <Store size={18} />, path: '/profile/addresses' },
    { label: t('profile.notificationSettings'), icon: <Bell size={18} />, path: '/profile/notifications' },
    { label: t('profile.helpCenter'), icon: <HelpCircle size={18} />, path: '/profile/help-center' }
  ];

  return (
    <div className="bg-[#fbfcff] min-h-screen pb-24 font-sans text-slate-800">
      {/* Header Sticky */}
      <div className="sticky top-0 z-45 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-3">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.88 }}
          className="p-1 rounded-full hover:bg-slate-50 transition-colors"
          aria-label="Go back"
        >
          <ChevronRight size={22} className="text-slate-800 rotate-180" />
        </motion.button>
        <span className="text-[17px] font-black text-slate-800 tracking-tight">{t('profile.title')}</span>
      </div>

      {/* User Card */}
      <div className="px-4 pt-5">
        <div className="bg-gradient-to-br from-[#084224] to-[#042112] rounded-3xl p-6 text-white shadow-[0_8px_30px_rgba(8,66,36,0.15)] relative overflow-hidden border border-emerald-800/30">
          <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-[18px] font-black tracking-tight">{userProfile.name}</h1>
              <p className="text-[11px] font-medium text-emerald-100/80 mt-1 leading-normal">
                {userProfile.email || 'mithilakart.user@gmail.com'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-emerald-200/90 uppercase tracking-widest leading-none">Status</p>
              <p className="text-[13px] font-black text-yellow-400 mt-1 flex items-center gap-1.5">
                ★ PRIME MEMBER
              </p>
            </div>
            <button className="bg-white/15 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 px-4.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider">
              {t('profile.loyaltyPoints') || 'Points'}
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Stack List (Horizontal rows stacked vertically) */}
      <div className="px-4 pt-6">
        <div className="bg-white rounded-3xl border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
          <div className="divide-y divide-slate-100">
            {profileOptions.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => navigate(opt.path)}
                className="px-5 py-4.5 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer active:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#084224] flex items-center justify-center transition-colors group-hover:bg-[#084224] group-hover:text-white">
                    {opt.icon}
                  </div>
                  <span className="text-[13.5px] font-black text-slate-800 transition-colors group-hover:text-[#084224]">
                    {opt.label}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-350 transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 pt-6 pb-10">
        <motion.button
          onClick={handleLogout}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-white border border-rose-200 hover:border-rose-300 text-rose-600 hover:bg-rose-50/30 py-4 rounded-2xl font-black text-[13.5px] uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-2xs active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {t('profile.logout')}
        </motion.button>
      </div>
    </div>
  );
};

export default VendorProfile;
