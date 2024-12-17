import { useContext, useState } from "react";
import s from "./LanguageSwitcher.module.css";
import locale from "./locale.json";
import { languageContext } from "../../context/LanguageProvider";
import useLanguage from "../../hooks/useLanguage";

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(useLanguage().lang);
  const { lang, setLanguage } = useContext(languageContext);
  const onHandleChange = (e) => {
    switch (e.target.value) {
      case "uk":
        setLanguage({ ua: "uk-UA" });
        break;
      case "en":
        setLanguage({ en: "en-Us" });
        break;
      default:
        break;
    }
  };

  return (
    <select className={s.lang} onChange={onHandleChange}>
      <option value={locale.value[currentLang]}>
        {locale.language[currentLang]}
      </option>
      <option value={currentLang === "ua" ? "en" : "uk"}>
        {currentLang === "ua" ? "EN" : "UA"}
      </option>
    </select>
  );
};

export default LanguageSwitcher;
