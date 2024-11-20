import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoaderAndError from "../../hooks/useLoaderAndError";
import { getTrendMovies } from "../../services/getApi";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import Notification from "../../components/Notification/Notification";

import s from "./HomePage.module.css";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const { error, setError, isLoading, setIsLoading } = useLoaderAndError();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results } = await getTrendMovies();
        setFilms(results);
      } catch (err) {
        setError(true);
        console.error(err.message);
        toast.error("Something went wrong! Please try again later");
      } finally {
        setIsLoading(false);
      }
    };
    getPopularMovies();
  }, [setError, setIsLoading]);
  return (
    <main className="container">
      <h1 className={s.title}>Trending today</h1>
      {error && (
        <Notification>
          <p>Something went wrong! Please try again later</p>
        </Notification>
      )}
      {isLoading ? <Loader /> : films.length && <MovieList items={films} />}
    </main>
  );
};

export default HomePage;
