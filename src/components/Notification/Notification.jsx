import { FaSadTear } from "react-icons/fa";
import s from "./Notification.module.css";

const Notification = ({ children }) => {
  return (
    <div className={s.notification}>
      <FaSadTear className={s.icon} />
      {children}
    </div>
  );
};

export default Notification;
