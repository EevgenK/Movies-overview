import { useParams } from "react-router-dom";
import s from "./YouTubePlayer.module.css";
import ReactPlayer from "react-player/youtube";
import { useCallback } from "react";
import { getMovieVideos } from "../../services/getApi";
import useGetApiById from "../../hooks/useGetApiById";
const YouTubePlayer = () => {
  //   const { id } = useParams();
  //   const getVideos = useCallback(() => getMovieVideos(id), [id]);
  //   const { details, isLoading } = useGetApiById(getVideos, id);
  //   console.log(details);
  const videoUrl = `https://www.youtube.com/watch?v=${"8Lld3U0sVho"}`;
  // edit
  return (
    <div className={s.player}>
      <ReactPlayer url={videoUrl} />
    </div>

    // <div>
    //   <iframe
    //     className={s.player}
    //     src={videoUrl}
    //     allow="autoplay; encrypted-media"
    //     allowFullScreen
    //     title="YouTube Video"
    //   ></iframe>
    // </div>
  );
};

export default YouTubePlayer;
