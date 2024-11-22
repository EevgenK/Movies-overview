import { FaBackward, FaForward } from "react-icons/fa6";
import useLanguage from "../../hooks/useLanguage";
import locale from "./locale.json";
import s from "./LoadMore.module.css";

const LoadMoreBtns = ({ setPage, pages: { total_pages }, page }) => {
  const { lang } = useLanguage();
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
      {total_pages > page && (
        <p className={s.pages}>
          {locale.paragraph[lang]} {total_pages - page}
        </p>
      )}
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
