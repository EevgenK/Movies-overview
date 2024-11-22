import { MdLocalMovies } from "react-icons/md";
import Navigation from "../Navigation/Navigation";
import { ImHome } from "react-icons/im";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import useLanguage from "../../hooks/useLanguage";
import locale from "./locale.json";
import s from "./Header.module.css";

const Header = () => {
  const { lang } = useLanguage();
  return (
    <header className={s.header}>
      <Navigation
        links={[
          { [locale.links[lang][0]]: "/", icon: <ImHome /> },
          { [locale.links[lang][1]]: "/movies", icon: <MdLocalMovies /> },
        ]}
        main={true}
      />
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
