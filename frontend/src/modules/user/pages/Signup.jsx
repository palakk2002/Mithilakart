import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[80vh] flex flex-col items-center pt-8 bg-white md:bg-gray-50">
      {/* Logo */}
      <Link to="/vendor/home" className="mb-6">
        <h1 className="text-3xl font-bold italic text-black">
          Mithila<span className="text-[#084224]">kart</span>
        </h1>
      </Link>

      {/* Signup Card */}
      <div className="w-full max-w-[350px] bg-white border border-gray-300 rounded-lg p-6 shadow-sm md:shadow-none">
        <h2 className="text-2xl font-medium mb-4">{t('auth.signupTitle')}</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">{t('auth.nameLabel')}</label>
            <input 
              type="text" 
              placeholder={t('auth.namePlaceholder')}
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-[#084224] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">{t('auth.mobileOrEmail')}</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-[#084224] outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold mb-1">{t('auth.passwordLabel')}</label>
            <input 
              type="password" 
              placeholder={t('auth.passwordPlaceholder')}
              className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-[#084224] outline-none transition-all"
            />
            <p className="text-[10px] mt-1 text-gray-600 italic">{t('auth.passwordHint')}</p>
          </div>

          <button 
            type="submit"
            className="w-full py-1.5 bg-[#084224] hover:bg-[#06331b] text-white rounded shadow-sm text-sm font-medium transition-colors cursor-pointer"
          >
            {t('auth.continue')}
          </button>
        </form>

        <p className="text-xs mt-6 text-gray-700 leading-tight">
          {t('auth.termsTextSignup')} <a href="#" className="text-[#084224] hover:underline">{t('auth.conditionsOfUse')}</a> {t('auth.and')} <a href="#" className="text-[#084224] hover:underline">{t('auth.privacyNotice')}</a>.
        </p>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs">
            {t('auth.alreadyHaveAccount')} <Link to="/vendor/login" className="text-[#084224] hover:underline">{t('auth.signIn')}</Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-10 py-6 border-t border-gray-200 w-full flex flex-col items-center bg-gray-50 md:bg-transparent">
        <div className="flex space-x-6 mb-2">
          <a href="#" className="text-xs text-[#084224] hover:underline">{t('auth.conditionsOfUse')}</a>
          <a href="#" className="text-xs text-[#084224] hover:underline">{t('auth.privacyNotice')}</a>
          <a href="#" className="text-xs text-[#084224] hover:underline">{t('auth.help')}</a>
        </div>
        <p className="text-[10px] text-gray-500">{t('auth.copyright')}</p>
      </div>
    </div>
  );
};

export default Signup;

