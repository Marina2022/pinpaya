import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next } from "react-i18next";
import cookies from "js-cookie";

i18n
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: cookies.get('i18nextLng') || 'en',
        debug: true,
        detection:{
            order: ['queryString','cookie'],
            cache:['cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n