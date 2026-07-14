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
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('userWishlist');
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAuthenticated');
    sessionStorage.clear();
    navigate('/home', { replace: true });
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: '/profile' } });
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
              <h1 className="text-[18px] font-black tracking-tight">
                {isAuthenticated ? userProfile.name : 'Guest User'}
              </h1>
              <p className="text-[11px] font-medium text-emerald-100/80 mt-1 leading-normal">
                {isAuthenticated ? (userProfile.email || 'mithilakart.user@gmail.com') : 'Please login to access all features'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-emerald-200/90 uppercase tracking-widest leading-none">Status</p>
              <p className="text-[13px] font-black text-yellow-400 mt-1 flex items-center gap-1.5">
                {isAuthenticated ? '★ PRIME MEMBER' : 'GUEST'}
              </p>
            </div>
            {isAuthenticated && (
              <button className="bg-white/15 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 px-4.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {t('profile.loyaltyPoints') || 'Points'}
              </button>
            )}
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
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(opt.path);
                  } else {
                    navigate('/login', { state: { from: '/profile' } });
                  }
                }}
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

      {/* Bottom Footer Section (FAQs, Terms, Privacy, Logout, Socials, Logo, Version) */}
      <div className="px-6 pt-6 pb-12 flex flex-col gap-6 select-none bg-white border-t border-slate-105 mt-6">
        {/* Link List */}
        <div className="flex flex-col gap-4 text-[14px] font-bold text-gray-500 pl-2">
          <div onClick={() => navigate('/profile/help-center')} className="cursor-pointer active:text-[#084224] transition-colors">
            FAQs
          </div>
          <div onClick={() => navigate('/terms')} className="cursor-pointer active:text-[#084224] transition-colors">
            Terms & Conditions
          </div>
          <div onClick={() => navigate('/privacy')} className="cursor-pointer active:text-[#084224] transition-colors">
            Privacy Policy
          </div>
        </div>

        {/* Centered Login / Logout */}
        <div className="flex justify-center mt-2">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-[#084224] hover:text-[#06331b] font-black text-[15px] flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              Log Out
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="text-[#084224] hover:text-[#06331b] font-black text-[15px] flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              Login
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-5 mt-2">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] transition-transform hover:scale-105 active:scale-90 shadow-2xs"
          >
            <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FF0000] transition-transform hover:scale-105 active:scale-90 shadow-2xs"
          >
            <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-90 shadow-2xs"
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            }}
          >
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* X */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-black transition-transform hover:scale-105 active:scale-90 shadow-2xs"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/9118001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#25D366] transition-transform hover:scale-105 active:scale-90 shadow-2xs"
          >
            <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        {/* Logo Branding */}
        <div className="flex flex-col items-center justify-center gap-0 mt-3">
          <img
            src="/logomith-removebg-preview.png"
            alt="Mithilakart Logo"
            className="h-28 w-auto object-contain"
          />
          <span className="text-[18px] font-black text-slate-800 tracking-wider mt-[-2px]">
            Mithilakart™
          </span>
        </div>

        {/* App Version */}
        <div className="text-[11px] font-bold text-gray-450 text-center tracking-wide mt-2">
          v1.0.0 (build 1)-p1
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
