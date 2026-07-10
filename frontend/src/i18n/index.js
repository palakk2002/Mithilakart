import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common.json';
import commonHi from './locales/hi/common.json';
import commonMai from './locales/mai/common.json';

const resources = {
  en: { common: commonEn },
  hi: { common: commonHi },
  mai: { common: commonMai }
};

const savedLanguage = localStorage.getItem('user_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
