import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN = import.meta.env.VITE_API_TOKEN;
const instance = axios.create({
  baseURL: "https://api.themoviedb.org",
  params: {
    api_key: API_KEY,
    include_adult: false,
    language: "en-US",
    page: 1,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  },
});
const getTrendMovies = async () => {
  const { data } = await instance.get("/3/trending/movie/day");
  return data;
};
const getMovies = async (query) => {
  const { data } = await instance.get("/3/search/movie", {
    params: {
      query,
    },
  });

  return data;
};
const getMovieById = async (movie_id) => {
  const { data } = await instance.get(`/3/movie/${movie_id}`);
  return data;
};

const getMovieCredits = async (movie_id) => {
  const { data } = await instance.get(`/3/movie/${movie_id}/credits`);
  const result = data.cast;
  return result;
};
const getMovieReviews = async (movie_id) => {
  const { data } = await instance.get(`/3/movie/${movie_id}/reviews`);
  const result = data.results;
  return result;
};
const getMovieVideos = async (movie_id) => {
  const { data } = await instance.get(`/3/movie/${movie_id}/videos`);
  const result = data.results;

  return result;
};
export {
  getMovieVideos,
  getTrendMovies,
  getMovies,
  getMovieById,
  getMovieCredits,
  getMovieReviews,
};
