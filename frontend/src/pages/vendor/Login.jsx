import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [useEmail, setUseEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - navigate to home
    navigate('/vendor/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Blue Header with Logo */}
      <div className="bg-[#2874F0] px-4 py-4 flex items-center justify-between shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="text-white active:scale-90 transition-transform"
        >
          <X size={24} strokeWidth={2.5} />
        </button>
        
        <div className="flex items-center gap-2">
          <img 
            src="/mithilakartbglogo.png" 
            alt="Mithilakart" 
            className="h-14 w-auto object-contain brightness-0 invert"
          />
        </div>
        
        <div className="w-6"></div> {/* Spacer for centering */}
      </div>

      {/* Login Form Content */}
      <div className="flex-1 px-6 pt-8 pb-6">
        <h1 className="text-[20px] font-bold text-slate-900 mb-8">
          Log in to check your Cart
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number / Email Input */}
          <div>
            <label className="block text-[13px] font-medium text-gray-600 mb-2">
              {useEmail ? 'Email' : 'Phone Number'}
            </label>
            <div className="relative">
              {!useEmail && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-600 font-medium pointer-events-none">
                  +91
                </span>
              )}
              <input
                type={useEmail ? 'email' : 'tel'}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={useEmail ? 'Enter your email' : ''}
                className={`w-full ${!useEmail ? 'pl-16' : 'pl-4'} pr-4 py-3 border-2 border-[#2874F0] rounded-sm text-[15px] font-medium text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2874F0] focus:ring-2 focus:ring-[#2874F0]/20 transition-all`}
                required
                maxLength={useEmail ? undefined : 10}
                pattern={useEmail ? undefined : '[0-9]*'}
              />
            </div>
          </div>

          {/* Use Email/Phone Toggle */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setUseEmail(!useEmail)}
              className="text-[13px] font-bold text-[#2874F0] hover:underline"
            >
              {useEmail ? 'Use Phone Number' : 'Use Email-ID'}
            </button>
          </div>

          {/* Terms and Conditions - Moved here */}
          <p className="text-[10px] text-gray-400 leading-relaxed">
            By continuing, you confirm that you are above 18 years of age, and you agree to the Mithilakart's{' '}
            <Link to="/vendor/terms" className="text-[#2874F0] hover:underline">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link to="/vendor/privacy" className="text-[#2874F0] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>

      {/* Fixed Bottom Continue Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.98 }}
          disabled={!phoneNumber}
          className={`w-full py-4 rounded-sm text-[15px] font-bold uppercase tracking-wide transition-all ${
            phoneNumber
              ? 'bg-[#2874F0] text-white shadow-md active:shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
