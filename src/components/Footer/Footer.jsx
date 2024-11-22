import Logo from "../Logo/Logo";
import s from "./Footer.module.css";
import { IoArrowUpCircle } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Logo />
      <p className={s.author}>&copy; MOVIES-OVERVIEW made by K.E. on REACT</p>
      <a className={s.up} href="#">
        <IoArrowUpCircle className={s.icon} />
      </a>
    </footer>
  );
};

export default Footer;
