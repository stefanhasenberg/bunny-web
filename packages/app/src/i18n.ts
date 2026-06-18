import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import commonDE from './locales/de/common.json';
import commonEN from './locales/en/common.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      de: {
        common: commonDE
      },
      en: {
        common: commonEN
      }
    },
    fallbackLng: "de",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ['path'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
      cookieMinutes: 10,
      cookieDomain: 'localhost',
      cookieOptions: { path: '/', sameSite: 'strict' }
    }
  });