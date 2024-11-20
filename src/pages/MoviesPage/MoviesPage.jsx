import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Notification from "../../components/Notification/Notification";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import useLoaderAndError from "../../hooks/useLoaderAndError";
import { getMovies } from "../../services/getApi";

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const { error, setError, isLoading, setIsLoading } = useLoaderAndError();
  const [searchMoviesList, setSearchMoviesList] = useSearchParams();
  const search = searchMoviesList.get("search") ?? "";

  useEffect(() => {
    if (!search) return;
    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results } = await getMovies(search);
        if (!results.length) {
          toast.error(
            "Unfortunately,  there`s no movies on your request. Please try another request"
          );
        } else {
          setFilms(results);
        }
      } catch (err) {
        setError(true);
        console.error(err.message);
        toast.error("Something went wrong! Please try again later");
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [search, setError, setIsLoading]);

  const onHandleSearch = (query) => {
    setSearchMoviesList("");
    if (query === "") {
      toast.error("Sorry, the search-bar can't be empty! Please, try again.");
      return;
    }
    setSearchMoviesList({ search: [query] });
  };
  return (
    <main className="container">
      <SearchForm onSubmit={onHandleSearch} />
      {error && (
        <Notification>
          <p>Something went wrong! Please try again later</p>
        </Notification>
      )}
      {isLoading ? <Loader /> : !!films.length && <MovieList items={films} />}
    </main>
  );
};

export default MoviesPage;
