import { useCallback } from "react";
import { getMovieReviews } from "../../services/getApi";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { defaultImg } from "../../services/defaultValues";
import useGetApiById from "../../hooks/useGetApiById";
import Notification from "../Notification/Notification";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { id } = useParams();
  const getCredits = useCallback(() => getMovieReviews(id), [id]);
  const { details, isLoading } = useGetApiById(getCredits, id);

  const items = !details.length ? (
    <Notification>
      <p>We don`t have any reviews on this movie</p>
    </Notification>
  ) : (
    details.map(({ id, author_details, author, content }) => {
      return (
        <li className={s.item} key={id}>
          <div className={s.wrapper}>
            <img
              className={s.img}
              src={
                author_details.avatar_path
                  ? `https://image.tmdb.org/t/p/w500${author_details.avatar_path}.jpg`
                  : defaultImg
              }
              alt={author}
            />
            <h4>{author}</h4>
          </div>
          <p className={s.comment}>&quot;{content}&quot;</p>
        </li>
      );
    })
  );
  return <ul className={s.list}>{isLoading ? <Loader /> : items}</ul>;
};

export default MovieReviews;
