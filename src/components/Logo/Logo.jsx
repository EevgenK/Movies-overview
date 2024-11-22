import { Link } from "react-router-dom";
import s from "./Logo.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";
const Logo = () => {
  return (
    <Link to="/">
      <div className={s.wrap}>
        <BiSolidCameraMovie className={s.logo} />
      </div>
    </Link>
  );
};

export default Logo;
