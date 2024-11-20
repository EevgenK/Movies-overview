import { useCallback } from "react";
import { getMovieVideos } from "../../services/getApi";
import useGetApiById from "../../hooks/useGetApiById";
import { useParams } from "react-router-dom";
import s from "./MovieTeasers.module.css";
import YouTubePlayer from "../YouTubePlayer/YouTubePlayer";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
const MovieTeasers = () => {
  const { id } = useParams();
  const getVideos = useCallback(() => getMovieVideos(id), [id]);
  const { details, isLoading } = useGetApiById(getVideos, id);

  const teasers = details
    .filter((el) => el.type === "Teaser")
    .map((el) => {
      return <li key={el.id}>{!!el.key && <YouTubePlayer url={el.key} />}</li>;
    })
    .reverse();
  if (!teasers.length)
    return (
      <Notification>
        <p>We don`t have any teasers on this movie</p>
      </Notification>
    );
  return <ul className={s.movies}>{isLoading ? <Loader /> : teasers}</ul>;
};

export default MovieTeasers;
