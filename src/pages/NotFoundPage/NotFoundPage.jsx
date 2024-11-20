import { Link } from "react-router-dom";
import Notification from "../../components/Notification/Notification";

const NotFoundPage = () => {
  return (
    <main className="container">
      <Notification>
        <h1>NOT FOUND PAGE</h1>
        <p>
          Follow this <Link to="/">link</Link> please
        </p>
      </Notification>
    </main>
  );
};

export default NotFoundPage;
