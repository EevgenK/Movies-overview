import { FaBackward, FaForward } from "react-icons/fa6";
import s from "./LoadMore.module.css";

const LoadMoreBtns = ({ setPage, pages: { total_pages }, page }) => {
  return (
    <div className={s.buttons}>
      <button
        disabled={page <= 1}
        className={s.btn}
        type="button"
        onClick={() => {
          page--;
          setPage(page);
        }}
      >
        <FaBackward />
      </button>
      <p className={s.pages}>More available pages: {total_pages - page}</p>
      <button
        disabled={page >= total_pages}
        className={s.btn}
        type="button"
        onClick={() => {
          page++;
          setPage(page);
        }}
      >
        <FaForward />
      </button>
    </div>
  );
};

export default LoadMoreBtns;
