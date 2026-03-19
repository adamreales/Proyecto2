import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import cat from "./locales/cat.json";

const STORAGE_KEY = "appLanguage";
const supportedLanguages = ["es", "en", "cat"];

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem(STORAGE_KEY);

  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase();

  if (browserLanguage.startsWith("ca")) {
    return "cat";
  }

  if (browserLanguage.startsWith("en")) {
    return "en";
  }

  return "es";
};

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    cat: { translation: cat },
  },
  lng: getInitialLanguage(),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = language;
});

document.documentElement.lang = i18n.language;

export const availableLanguages = supportedLanguages;
export default i18n;