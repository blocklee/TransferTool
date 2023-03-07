import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/translationEN.json';
import translationZH from './locales/translationZH.json';
// import translations from '@/locales/translations.json';

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    zh: {
        translation: translationZH,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
});

// i18n.use(initReactI18next).init({
//     resources: translations,
//     lng: 'en',
//     fallbackLng: 'en',
//     interpolation: {
//         escapeValue: false,
//     },
// });

export default i18n;




