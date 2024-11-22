import { ImSearch } from "react-icons/im";
import { useState } from "react";
import useLanguage from "../../hooks/useLanguage";
import locale from "./locale.json";
import s from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");

  const onHandleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.input;
    onSubmit(value.trim());
    setSearch("");
  };

  return (
    <form onSubmit={onHandleSubmit} className={s.searchform}>
      <input
        value={search}
        onChange={onHandleChange}
        name="input"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder={locale.placeholder[lang]}
      />
      <button className={s.button} type="submit">
        <ImSearch className={s.icon} />
      </button>
    </form>
  );
};

export default SearchForm;
