import { useContext } from "react";
import s from "./LanguageSwitcher.module.css";
import { languageContext } from "../../context/LanguageProvider";

const LanguageSwitcher = () => {
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
    console.log(e.target.value);
  };
  return (
    <select className={s.lang} onChange={onHandleChange}>
      <option value="en">English</option>
      <option value="uk">Ukranian</option>
    </select>
  );
};

export default LanguageSwitcher;
