import { defaultImg } from "../../services/defaultValues";
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
        <p>{`User Scores: ${Math.round(vote_average * 10)}%`}</p>
        {overview && (
          <div>
            <h2>Overview</h2>
            <p>{overview}</p>
          </div>
        )}
        {!!budget && (
          <>
            <h3>Budget</h3>
            <p>
              {budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </>
        )}
        {!!genres.length && (
          <div>
            <h3>Genres</h3>
            <ul className={s.genres}>{items}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
