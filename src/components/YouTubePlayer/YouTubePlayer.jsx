import s from "./YouTubePlayer.module.css";
import ReactPlayer from "react-player/youtube";

const YouTubePlayer = ({ url }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${[url]}`;

  return (
    <div className={s.player}>
      <ReactPlayer url={videoUrl} loop={true} controls={true} />
    </div>
  );
};

export default YouTubePlayer;
