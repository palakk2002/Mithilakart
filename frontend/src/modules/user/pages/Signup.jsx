import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    // Mock signup - navigate to previous page or home
    const redirectTo = location.state?.from || '/home';
    const redirectState = location.state?.checkoutProduct ? { product: location.state.checkoutProduct } : undefined;
    navigate(redirectTo, { state: redirectState });
  };

  // Inline SVG pattern for background
  const backgroundPattern = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M10 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zm30 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zM25 45c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3zM45 15c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3z" fill="%23ffffff" fill-opacity="0.12" fill-rule="evenodd"/></svg>`;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#77eba3] to-[#42c585] relative overflow-hidden"
      style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #77eba3 0%, #42c585 100%), url('${backgroundPattern}')` }}
    >
      {/* Background organic elements */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0C35 25 15 35 0 50C15 65 35 75 50 100C65 75 85 65 100 50C85 35 65 25 50 0Z" fill="white" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-15 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80C40 80 60 60 80 20C60 20 40 40 20 80Z" fill="white" />
          <circle cx="50" cy="50" r="10" fill="white" />
        </svg>
      </div>

      {/* Top Header Row */}
      <div className="w-full max-w-[420px] flex items-center justify-between z-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-all"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logomith-removebg-preview.png" alt="Mithilakart" className="h-8 w-auto object-contain" />
          <span className="text-white font-bold tracking-wider text-sm">MITHILAKART</span>
        </div>
        <div className="w-9"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main card */}
      <div className="w-full max-w-[420px] bg-[#f2fff5] rounded-[32px] px-6 py-7 shadow-2xl border border-white/40 z-10 my-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#0a4a17]">
            {t('auth.signupTitle') || 'Sign up'}
          </h2>
          <p className="text-[#3b8a53] text-[13px] font-semibold mt-1">
            Fresh Food & Handcrafted Items Delivered
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
              {t('auth.nameLabel') || 'Full Name'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <User size={18} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.namePlaceholder') || 'Your name'}
                className="w-full pl-11 pr-4 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Email / Mobile Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
              {t('auth.mobileOrEmail') || 'Email / Mobile'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <Mail size={18} />
              </span>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="example@gmail.com or 9876543210"
                className="w-full pl-11 pr-4 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
              {t('auth.passwordLabel') || 'Password'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3b8a53] hover:text-[#0a4a17] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <Lock size={18} />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3b8a53] hover:text-[#0a4a17] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign up Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 mt-2 bg-[#0c5c20] hover:bg-[#073f15] text-white rounded-[16px] text-[15px] font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {t('auth.signupTitle') || 'Sign up'}
          </motion.button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-5 text-[12px] font-bold text-[#3b8a53]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0a4a17] hover:underline">
            Log in here!
          </Link>
        </div>
      </div>

      {/* Footer Logo & Styling */}
      <div className="flex flex-col items-center gap-1 my-3 z-10">
        <img 
          src="/mthibg.png" 
          alt="Mithilakart" 
          className="h-10 w-auto object-contain"
        />
        <div className="flex items-center text-[18px] font-bold text-white tracking-wide italic">
          <span className="opacity-90">Mithila</span><span className="text-[#073f15]">kart</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
