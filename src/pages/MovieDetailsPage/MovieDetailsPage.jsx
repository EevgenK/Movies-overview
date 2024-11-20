import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { getMovieById, getMovieVideos } from "../../services/getApi";
import MovieCard from "../../components/MovieCard/MovieCard";
import getBackGround from "../../services/getBackGround";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import Navigation from "../../components/Navigation/Navigation";

import { PiApplePodcastsLogoFill } from "react-icons/pi";
import { MdOutlineRateReview } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";

import s from "./MovieDetailsPage.module.css";
import YouTubePlayer from "../../components/YouTubePlayer/YouTubePlayer";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    if (!id) return;
    const getMoviesDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieById(id);
        const style = getBackGround(data.backdrop_path);
        setMovie({ ...data, backdrop_path: style });
      } catch (err) {
        console.error(err.message);
        toast.error("Something went wrong! Please try again later");
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesDetails();
  }, [id, setIsLoading]);

  useEffect(() => {
    if (!id) return;
    const getVideoUrl = async () => {
      try {
        const results = await getMovieVideos(id);
        const url = results.find((el) => el.type === "Teaser");

        setVideoUrl(url.key);
      } catch (err) {
        console.error(err.message);
      }
    };
    getVideoUrl();
  }, [id]);

  const goBack = useCallback(() => navigate(backLink.current), [navigate]);

  return (
    <main className="container">
      <button onClick={goBack} className={s.button}>
        go back
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <>
            <div className={s.box} style={movie?.backdrop_path}>
              <MovieCard items={movie} />
              {videoUrl && (
                <YouTubePlayer className={s.player} url={videoUrl} />
              )}
              <div className={s.additional}>
                <Navigation
                  links={[
                    {
                      cast: "cast",
                      icon: <PiApplePodcastsLogoFill className={s.icon} />,
                    },
                    {
                      reviews: "reviews",
                      icon: <MdOutlineRateReview className={s.icon} />,
                    },
                    {
                      "more teasers": "videos",
                      icon: <RiVideoFill className={s.icon} />,
                    },
                  ]}
                />
              </div>
            </div>

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </>
        )
      )}
    </main>
  );
};

export default MovieDetailsPage;
