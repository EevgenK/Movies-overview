import { ImSearch } from "react-icons/im";
import { useState } from "react";
import s from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
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
        placeholder="Search movies"
      />
      <button className={s.button} type="submit">
        <ImSearch className={s.icon} />
      </button>
    </form>
  );
};

export default SearchForm;
