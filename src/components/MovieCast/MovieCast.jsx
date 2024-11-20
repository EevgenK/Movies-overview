import { useParams } from "react-router-dom";
import { useCallback } from "react";

import { getMovieCredits } from "../../services/getApi";
import { defaultImg } from "../../services/defaultValues";
import Loader from "../Loader/Loader";
import useGetApiById from "../../hooks/useGetApiById";
import Notification from "../Notification/Notification";

import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { id } = useParams();
  const getCredits = useCallback(() => getMovieCredits(id), [id]);
  const { details, isLoading } = useGetApiById(getCredits, id);

  const items = !details.length ? (
    <Notification>
      <p>We don`t have any information about the cast of this movie</p>
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
            <p>Character: {character}</p>
          </div>
        </li>
      );
    })
  );

  return <ul className={s.list}>{isLoading ? <Loader /> : items}</ul>;
};

export default MovieCast;
