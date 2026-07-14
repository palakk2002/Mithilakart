import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sendPhoneOtp, verifyPhoneOtp, sendEmailOtp, verifyEmailOtp } from '../services/authApi';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [useEmail, setUseEmail] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 60-second countdown timer for resending OTP
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    
    if (useEmail) {
      const trimmedEmail = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmedEmail) {
        setError('Email address is required');
        return;
      }
      if (!emailRegex.test(trimmedEmail)) {
        setError('Please enter a valid email address');
        return;
      }
      
      setIsSendingOtp(true);
      try {
        await sendEmailOtp(trimmedEmail);
        setOtpSent(true);
        setTimer(60);
        setSuccess('OTP sent successfully to your email');
      } catch (err) {
        setError(err.message || 'Failed to send OTP');
      } finally {
        setIsSendingOtp(false);
      }
    } else {
      if (!countryCode) {
        setError('Country code is required');
        return;
      }
      if (!/^\+?\d{1,4}$/.test(countryCode)) {
        setError('Invalid country code');
        return;
      }
      if (!phoneNumber) {
        setError('Phone number is required');
        return;
      }
      if (phoneNumber.length < 8 || phoneNumber.length > 11) {
        setError('Phone number must be between 8 and 11 digits');
        return;
      }
      
      setIsSendingOtp(true);
      try {
        await sendPhoneOtp(countryCode, phoneNumber);
        setOtpSent(true);
        setTimer(60);
        setSuccess('OTP sent successfully to your phone');
      } catch (err) {
        setError(err.message || 'Failed to send OTP');
      } finally {
        setIsSendingOtp(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');
    
    if (!name.trim()) {
      setError('Full Name is required');
      return;
    }
    if (!otp) {
      setError('OTP cannot be empty');
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      return;
    }
    
    setIsVerifyingOtp(true);
    try {
      let response;
      if (useEmail) {
        response = await verifyEmailOtp(email.trim(), otp);
      } else {
        response = await verifyPhoneOtp(countryCode, phoneNumber, otp);
      }
      
      if (response && response.success) {
        setSuccess('Account created successfully! Logging in...');
        localStorage.setItem('isAuthenticated', 'true');
        setTimeout(() => {
          const redirectTo = location.state?.from || '/home';
          const redirectState = location.state?.checkoutProduct ? { product: location.state.checkoutProduct } : undefined;
          navigate(redirectTo, { state: redirectState });
        }, 800);
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSendingOtp || isVerifyingOtp) return;
    if (!otpSent) {
      handleSendOtp();
    } else {
      handleVerifyOtp();
    }
  };

  const handleResendOtp = () => {
    if (timer > 0 || isSendingOtp || isVerifyingOtp) return;
    handleSendOtp();
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

        {/* Authentication Toggle */}
        <div className="flex bg-[#e8fced] p-1 rounded-2xl mb-5">
          <button
            type="button"
            disabled={isSendingOtp || isVerifyingOtp}
            onClick={() => {
              setUseEmail(false);
              setOtpSent(false);
              setError('');
              setSuccess('');
              setOtp('');
            }}
            className={`flex-1 py-2.5 text-center text-[12px] font-bold rounded-xl transition-all uppercase tracking-wider ${
              !useEmail 
                ? 'bg-[#0c5c20] text-white shadow-md' 
                : 'text-[#3b8a53] hover:text-[#0a4a17]'
            }`}
          >
            Continue with Phone
          </button>
          <button
            type="button"
            disabled={isSendingOtp || isVerifyingOtp}
            onClick={() => {
              setUseEmail(true);
              setOtpSent(false);
              setError('');
              setSuccess('');
              setOtp('');
            }}
            className={`flex-1 py-2.5 text-center text-[12px] font-bold rounded-xl transition-all uppercase tracking-wider ${
              useEmail 
                ? 'bg-[#0c5c20] text-white shadow-md' 
                : 'text-[#3b8a53] hover:text-[#0a4a17]'
            }`}
          >
            Continue with Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold p-3.5 rounded-2xl text-center uppercase tracking-wider">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 text-[11px] font-bold p-3.5 rounded-2xl text-center uppercase tracking-wider">
              {success}
            </div>
          )}

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
                disabled={isVerifyingOtp}
                required
              />
            </div>
          </div>

          {/* Email / Phone Field */}
          {!useEmail ? (
            <div>
              <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="w-[80px] relative">
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    placeholder="+91"
                    className="w-full px-3 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] focus:outline-none transition-all shadow-inner text-center"
                    disabled={otpSent || isSendingOtp || isVerifyingOtp}
                    required
                  />
                </div>
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                    disabled={otpSent || isSendingOtp || isVerifyingOtp}
                    required
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                  disabled={otpSent || isSendingOtp || isVerifyingOtp}
                  required
                />
              </div>
            </div>
          )}

          {/* OTP Field & Resend Timer */}
          {otpSent && (
            <div className="space-y-2">
              <div>
                <label className="block text-[12px] font-bold text-[#1f592c] mb-1 px-1 uppercase tracking-wider">
                  6-Digit OTP
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                    <MessageSquare size={18} />
                  </span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    maxLength={6}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner tracking-widest text-center"
                    disabled={isVerifyingOtp}
                    required
                  />
                </div>
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-[12px] font-bold px-1 text-[#3b8a53]">
                <span>OTP expires in: {timer}s</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isSendingOtp || isVerifyingOtp}
                  className={`text-[#0a4a17] hover:underline font-bold transition-all ${
                    timer > 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {/* Sign up Button / Send OTP */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={isSendingOtp || isVerifyingOtp}
            className="w-full py-3.5 mt-2 bg-[#0c5c20] hover:bg-[#073f15] text-white rounded-[16px] text-[15px] font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSendingOtp || isVerifyingOtp ? (
              <span>Processing...</span>
            ) : otpSent ? (
              <span>Verify OTP & Create Account</span>
            ) : (
              <span>Send OTP</span>
            )}
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
          className="h-44 w-auto object-contain"
        />
        <div className="flex items-center text-[18px] font-bold text-black tracking-wide italic">
          Mithilakart™
        </div>
      </div>
    </div>
  );
};

export default Signup;
