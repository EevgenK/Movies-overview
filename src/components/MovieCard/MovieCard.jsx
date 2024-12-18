import useLanguage from "../../hooks/useLanguage";
import { defaultImg } from "../../services/defaultValues";
import locale from "./locale.json";
import s from "./MovieCard.module.css";

const MovieCard = ({
  items: {
    poster_path,
    budget,
    title,
    overview,
    vote_average,
    genres,
    release_date,
  },
}) => {
  const { lang } = useLanguage();
  const items = genres.map(({ id, name }) => <li key={id}>{name}</li>);
  const year = new Date(release_date).getFullYear();
  return (
    <div className={s.wrapper}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}.jpg`
            : defaultImg
        }
        alt={title}
        className={s.img}
      />
      <div className={s.card}>
        <h1>
          {title} {release_date && `(${year})`}
        </h1>
        <p>{`${locale.user_scores[lang]}: ${Math.round(
          vote_average * 10
        )}%`}</p>
        {overview && (
          <div>
            <h2>{locale.overview[lang]}:</h2>
            <p>{overview}</p>
          </div>
        )}
        {!!budget && (
          <>
            <h3>{locale.budget[lang]}:</h3>
            <p>
              {budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </>
        )}
        {!!release_date && (
          <>
            <h3>{locale.release[lang]}:</h3>
            <p>{release_date}</p>
          </>
        )}
        {!!genres.length && (
          <div>
            <h3>{locale.genres[lang]}:</h3>
            <ul className={s.genres}>{items}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
