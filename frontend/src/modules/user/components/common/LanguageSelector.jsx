import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mai', name: 'मैथिली' },
  { code: 'bn', name: 'বাংলা' }
];

const LanguageSelector = ({ isDarkHeader = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code) => {
    // TODO:
    // Replace frontend JSON translations with backend language API.
    i18n.changeLanguage(code);
    localStorage.setItem('user_language', code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all duration-300 ${
          isDarkHeader
            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            : 'bg-white text-slate-800 border-gray-200 shadow-xs hover:bg-gray-50'
        }`}
      >
        <Globe size={14} className={isDarkHeader ? 'text-white' : 'text-slate-500'} />
        <span>{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-32 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors duration-200 ${
                    i18n.language === lang.code
                      ? 'bg-emerald-550/10 text-emerald-800 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang.name}</span>
                  {i18n.language === lang.code && <Check size={12} className="text-emerald-800 stroke-[3px]" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
