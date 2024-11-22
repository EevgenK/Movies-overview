import { useParams } from "react-router-dom";
import { useCallback } from "react";

import { getMovieCredits } from "../../services/getApi";
import { defaultImg } from "../../services/defaultValues";
import Loader from "../Loader/Loader";
import useGetApiById from "../../hooks/useGetApiById";
import Notification from "../Notification/Notification";
import locale from "./locale.json";
import s from "./MovieCast.module.css";
import useLanguage from "../../hooks/useLanguage";

const MovieCast = () => {
  const { lang, langApi } = useLanguage();
  const { id } = useParams();
  const getCredits = useCallback(
    () => getMovieCredits(id, langApi),
    [id, langApi]
  );
  const { details, isLoading } = useGetApiById(getCredits, id);

  const items = !details.length ? (
    <Notification>
      <p>{locale.notification[lang]}</p>
    </Notification>
  ) : (
    details.map(({ id, profile_path, name, character }) => {
      return (
        <li className={s.item} key={id}>
          <img
            className={s.img}
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500${profile_path}.jpg`
                : defaultImg
            }
            alt={name}
          />
          <div className={s.wrapper}>
            <h4>{name}</h4>
            <p>
              {locale.character[lang]}: {character}
            </p>
          </div>
        </li>
      );
    })
  );

  return <ul className={s.list}>{isLoading ? <Loader /> : items}</ul>;
};

export default MovieCast;
