import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Zap, 
  HelpCircle, 
  Mail, 
  ChevronRight, 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Store, 
  ArrowRight,
  Star,
  Globe,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAccountStore from '../../store/useAccountStore';

// Import local assets for recently viewed products
import TshirtImg from '../../assets/products/product03.jpg';
import ElectronicsImg from '../../assets/products/product08.jpg';
import FashionImg from '../../assets/products/product01.jpg';
import JewelleryImg from '../../assets/products/product12.jpg';
import ShoesImg from '../../assets/products/product07.jpg';

const VendorProfile = () => {
  const navigate = useNavigate();
  const { userProfile } = useAccountStore();

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('userCart');
    localStorage.removeItem('userWishlist');
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAuthenticated');
    
    // Clear any session storage
    sessionStorage.clear();
    
    // Navigate to login page
    navigate('/vendor/login', { replace: true });
  };

  const quickActions = [
    { label: 'Orders', icon: <ShoppingBag size={20} className="text-primary-dark" />, path: '/vendor/profile/orders' },
    { label: 'Wishlist', icon: <Heart size={20} className="text-primary-dark" />, path: '/vendor/profile/wishlist' },
    { label: 'Coupons', icon: <Zap size={20} className="text-primary-dark" />, path: '/vendor/profile/coupons' },
    { label: 'Help Center', icon: <HelpCircle size={20} className="text-primary-dark" />, path: '/vendor/profile/help-center' }
  ];

  const financeOptions = [
    { title: 'Mithilakart Personal Loan', sub: 'Instant Cash upto ₹10,00,000', icon: <Smartphone size={20} className="text-primary-dark" /> },
    { title: 'Mithilakart EMI', sub: 'No Cost EMI* | Unlock ₹1 lakh', icon: <CreditCard size={20} className="text-primary-dark" /> },
    { title: 'Apply Now for Mithilakart SBI Credit Card', sub: 'ZERO JOINING FEE | 5% Cashback', icon: <Wallet size={20} className="text-primary-dark" /> }
  ];

  const recentlyViewed = [
    { name: "Women's T-sh...", img: TshirtImg },
    { name: "Mouse", img: ElectronicsImg },
    { name: "Kids' Camisole...", img: FashionImg },
    { name: "Pendant", img: JewelleryImg }
  ];

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-24 font-sans text-slate-900">
      {/* Back Button Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-3 py-3 flex items-center gap-3">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.88 }}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ChevronRight size={22} strokeWidth={2.5} className="text-gray-700 rotate-180" />
        </motion.button>
        <span className="text-[16px] font-black text-slate-800">My Profile</span>
      </div>
      {/* Top Header Card */}
      <div className="px-3 pt-4">
        <div className="bg-gradient-to-br from-[#f0f5ff] to-white rounded-xl p-5 border border-blue-50 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h1 className="text-[20px] font-black text-slate-900">{userProfile.name}</h1>
                 <p className="text-[12px] font-bold text-slate-500 mt-2 leading-relaxed max-w-[200px]">
                   Get Early Access to sale on 8th May,<br/>
                   15% discount with bank offers and more.
                 </p>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2 py-1.5 rounded-full border border-yellow-100 shadow-sm">
                 <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-black text-[12px]">P</div>
                 <span className="text-[14px] font-black">0</span>
              </div>
           </div>
           <button className="bg-black text-white px-6 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-widest shadow-lg">
              Explore <span className="text-blue-400">BLACK</span>
           </button>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="px-3 pt-4">
         <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, idx) => (
               <div 
                key={idx}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-lg p-4 flex items-center gap-4 border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
               >
                  <div className="p-2 bg-gray-50 rounded-full">{action.icon}</div>
                  <span className="text-[14px] font-black text-slate-700">{action.label}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Email Update Banner */}
      <div className="px-3 pt-4">
         <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Mail size={32} className="text-yellow-500 opacity-20" />
                  <Mail size={24} className="text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
               </div>
               <div>
                  <h3 className="text-[14px] font-black text-slate-800 flex items-center gap-2">
                    Add/Verify your Email <div className="w-1.5 h-1.5 bg-pink-600 rounded-full" />
                  </h3>
                  <p className="text-[11px] text-gray-500 font-bold mt-1">Get latest updates of your orders</p>
               </div>
            </div>
            <button className="bg-primary-dark text-white px-5 py-2 rounded-lg text-[13px] font-black shadow-lg shadow-blue-100">
               Update
            </button>
         </div>
      </div>

      {/* Finance Options Section */}
      <div className="bg-white mt-4 border-t border-b border-gray-100">
         <div className="px-4 py-4 border-b border-gray-50">
            <h2 className="text-[16px] font-black text-slate-900">Finance Options</h2>
         </div>
         <div className="divide-y divide-gray-50">
            {financeOptions.map((opt, idx) => (
               <div key={idx} className="px-4 py-4 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary-dark">
                        {opt.icon}
                     </div>
                     <div>
                        <h4 className="text-[14px] font-black text-slate-800">{opt.title}</h4>
                        <p className="text-[11px] text-gray-400 font-bold mt-0.5">{opt.sub}</p>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
               </div>
            ))}
         </div>
      </div>

      {/* Finance On UPI */}
      <div className="bg-white mt-3 border-t border-b border-gray-100">
         <div className="px-4 py-4 flex items-center justify-between active:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary-dark">
                  <Smartphone size={20} />
               </div>
               <div>
                  <h4 className="text-[15px] font-black text-slate-800">Finance On UPI</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[12px] font-bold text-gray-500">superCard | Buy Now Pay later in 3</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-bold mt-1 italic">Enjoy 3% cashback | Activate Fk UPI and pay in 3 months</p>
               </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
         </div>
      </div>

      {/* Recently Viewed Stores */}
      <div className="bg-white mt-3 py-4 border-t border-b border-gray-100">
         <h2 className="text-[16px] font-black text-slate-900 px-4 mb-4">Recently Viewed Stores</h2>
         <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {recentlyViewed.map((store, idx) => (
               <div key={idx} className="flex-shrink-0 w-32 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="aspect-square bg-gray-50 p-2">
                     <img src={store.img} className="w-full h-full object-contain rounded-lg" alt={store.name} />
                  </div>
                  <div className="p-2">
                     <p className="text-[11px] font-bold text-slate-700 text-center truncate">{store.name}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Help India Make Good Choices (Rating Card) */}
      <div className="bg-white mt-3 py-4 border-t border-b border-gray-100">
         <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-[16px] font-black text-slate-900">Help India make good choices</h2>
            <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
               <ArrowRight size={18} />
            </button>
         </div>
         <div className="px-4">
            <div className="bg-gray-50 rounded-2xl p-4 flex gap-4 border border-gray-100 relative overflow-hidden">
               <div className="w-16 h-16 bg-white rounded-xl p-2 flex-shrink-0 shadow-sm">
                  <img src={ShoesImg} className="w-full h-full object-contain" alt="product" />
               </div>
               <div className="flex-1">
                  <h4 className="text-[14px] font-black text-slate-800">WALKAROO Men Casual</h4>
                  <p className="text-[11px] text-gray-400 font-bold mt-1">Delivered on May 05, 2026</p>
                  <div className="flex items-center gap-3 mt-3">
                     <span className="text-[12px] font-bold text-gray-500">Rate this product</span>
                     <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="text-gray-300" />)}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white mt-3 py-6 px-4 border-t border-b border-gray-100">
         <h2 className="text-[16px] font-black text-slate-900 mb-4">Try Mithilakart in your language</h2>
         <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {['हिंदी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ'].map((lang, idx) => (
               <button key={idx} className="px-6 py-2 rounded-full border border-gray-200 text-[13px] font-bold text-slate-700 active:bg-primary-light active:border-blue-200 transition-colors">
                  {lang}
               </button>
            ))}
            <button className="text-primary-dark font-black text-[13px] whitespace-nowrap ml-2">+8 more</button>
         </div>
      </div>

      {/* Account Settings List */}
      <div className="bg-white mt-3 border-t border-b border-gray-100 mb-10">
         <div className="px-4 py-4 border-b border-gray-50">
            <h2 className="text-[16px] font-black text-slate-900">Account Settings</h2>
         </div>
         <div className="divide-y divide-gray-50">
            {[
               { title: 'Mithilakart Plus', icon: <Zap size={18} className="text-primary-dark" /> },
               { title: 'Edit Profile', icon: <Mail size={18} className="text-primary-dark" /> },
               { title: 'Saved Addresses', icon: <Store size={18} className="text-primary-dark" /> },
               { title: 'Notification Settings', icon: <Bell size={18} className="text-primary-dark" /> }
            ].map((setting, idx) => (
               <div key={idx} className="px-4 py-4 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-4">
                     {setting.icon}
                     <span className="text-[14px] font-bold text-slate-700">{setting.title}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
               </div>
            ))}
         </div>
      </div>

      {/* Logout Button */}
      <div className="px-3 pb-6">
         <motion.button
            onClick={handleLogout}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white border-2 border-[#084224] text-[#084224] py-4 rounded-xl font-black text-[15px] uppercase tracking-wider shadow-sm hover:bg-primary-light active:bg-primary-green/20 transition-colors flex items-center justify-center gap-3"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
         </motion.button>
      </div>
    </div>
  );
};

export default VendorProfile;


