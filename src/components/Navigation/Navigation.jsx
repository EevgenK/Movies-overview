import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { nanoid } from "nanoid";
import s from "./Navigation.module.css";

const Navigation = ({ links, main }) => {
  const items = links.map((el) => {
    return (
      <li key={nanoid()} className={s.item}>
        <NavLink className={s.link} to={Object.values(el)[0]}>
          {el.icon} {Object.keys(el)[0]}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className={main && s.navigation}>
      <ul className={clsx(s.list, main && s.main)}>{items}</ul>
    </nav>
  );
};

export default Navigation;
