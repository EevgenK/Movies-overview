import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoaderAndError from "../../hooks/useLoaderAndError";
import { getTrendMovies } from "../../services/getApi";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import Notification from "../../components/Notification/Notification";

import useLanguage from "../../hooks/useLanguage";
import s from "./HomePage.module.css";
import locale from "./locale.json";

const HomePage = () => {
  const { langApi, lang } = useLanguage();
  const [films, setFilms] = useState([]);
  const { error, setError, isLoading, setIsLoading } = useLoaderAndError();
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results } = await getTrendMovies(langApi);
        setFilms(results);
      } catch (err) {
        setError(true);
        console.error(err.message);
        toast.error(locale.message[lang]);
      } finally {
        setIsLoading(false);
      }
    };
    getPopularMovies();
  }, [lang, langApi, setError, setIsLoading]);
  return (
    <main className="container">
      <h1 className={s.title}>{locale.title[lang]}</h1>
      {error && (
        <Notification>
          <p>{locale.message[lang]}</p>
        </Notification>
      )}
      {isLoading ? <Loader /> : films.length && <MovieList items={films} />}
    </main>
  );
};

export default HomePage;
