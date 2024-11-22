import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Notification from "../../components/Notification/Notification";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import useLoaderAndError from "../../hooks/useLoaderAndError";
import { getMovies } from "../../services/getApi";
import LoadMoreBtns from "../../components/LoadMore/LoadMore";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const { error, setError, isLoading, setIsLoading } = useLoaderAndError();
  const [searchMoviesList, setSearchMoviesList] = useSearchParams();
  const search = searchMoviesList.get("search") ?? "";
  const page = searchMoviesList.get("page") ?? "1";
  useEffect(() => {
    if (!search) return;

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { results, total_pages, total_results } = await getMovies(
          search,
          page
        );
        if (!results.length) {
          toast.error(
            "Unfortunately,  there`s no movies on your request. Please try another request"
          );
        } else {
          setFilms((prevFilms) => [...prevFilms, ...results]);
          setTotalPages({ total_pages, total_results });
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
  }, [search, page, setError, setIsLoading]);

  const onHandleSearch = (query) => {
    setSearchMoviesList("");
    if (!query) {
      toast.error("Sorry, the search-bar can't be empty! Please, try again.");
      return;
    }
    setFilms([]);
    setSearchMoviesList({
      search: [query],
      page: 1,
    });
  };
  const handleSetPage = (page) => {
    console.log(page);
    setFilms([]);
    setSearchMoviesList({
      search: [searchMoviesList.get("search")],
      page,
    });
  };
  return (
    <main className="container">
      <div className={s.wrap}>
        <SearchForm onSubmit={onHandleSearch} />
        {!!totalPages.total_results && (
          <h4>
            Total result of request <span>&quot;{search}&quot;</span> is{" "}
            {totalPages.total_results}.
          </h4>
        )}
      </div>
      {!!films.length && (
        <LoadMoreBtns page={page} pages={totalPages} setPage={handleSetPage} />
      )}
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
