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
import YouTubePlayer from "../../components/YouTubePlayer/YouTubePlayer";

import useLanguage from "../../hooks/useLanguage";
import locale from "./locale.json";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { langApi, lang } = useLanguage();
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
        const data = await getMovieById(id, langApi);
        const style = getBackGround(data.backdrop_path);
        setMovie({ ...data, backdrop_path: style });
      } catch (err) {
        console.error(err.message);
        toast.error(locale.message[lang]);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesDetails();
  }, [id, lang, langApi, setIsLoading]);

  useEffect(() => {
    if (!id) return;
    const getVideoUrl = async () => {
      try {
        const results = await getMovieVideos(id, langApi);
        const url = results.find(
          (el) => el.type === "Teaser" || el.type === "Trailer"
        );

        setVideoUrl(url?.key);
      } catch (err) {
        console.error(err.message);
      }
    };
    getVideoUrl();
  }, [id, langApi]);

  const goBack = useCallback(() => navigate(backLink.current), [navigate]);

  return (
    <main className="container">
      <button onClick={goBack} className={s.button}>
        {locale.button[lang]}
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
                      [locale.links[lang][0]]: "cast",
                      icon: <PiApplePodcastsLogoFill className={s.icon} />,
                    },
                    {
                      [locale.links[lang][1]]: "reviews",
                      icon: <MdOutlineRateReview className={s.icon} />,
                    },
                    ...(videoUrl
                      ? [
                          {
                            [locale.links[lang][2]]: "videos",
                            icon: <RiVideoFill className={s.icon} />,
                          },
                        ]
                      : []),
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
