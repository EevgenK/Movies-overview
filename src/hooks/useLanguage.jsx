import { useContext } from "react";
import { languageContext } from "../context/LanguageProvider";

const useLanguage = () => {
  const { language } = useContext(languageContext);
  const langApi = Object.values(language).toString();
  const lang = Object.keys(language).toString();
  return { langApi, lang };
};

export default useLanguage;
