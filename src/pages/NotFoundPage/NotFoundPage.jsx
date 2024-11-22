import { Link } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import locale from "./locale.json";
import useLanguage from "../../hooks/useLanguage";
const NotFoundPage = () => {
  const { lang } = useLanguage();
  return (
    <main className="container">
      <Notification>
        <h1>{locale.title[lang]}</h1>
        <p>
          {locale.message[lang][0]}{" "}
          <Link to="/">{locale.message[lang][1]}</Link>
          {locale.message[lang][2]}
        </p>
      </Notification>
    </main>
  );
};

export default NotFoundPage;
