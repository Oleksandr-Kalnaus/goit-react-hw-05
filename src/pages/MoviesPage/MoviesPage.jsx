import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster, toast } from "react-hot-toast";
import { TbCameraSearch } from "react-icons/tb";
import apiRequests from "../../utils/apiRequests";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    try {
      const { movies } = await apiRequests("search", 1, query);
      setMovies(movies);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ query: newQuery });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("You must enter text to search for movies");
      return;
    }
    handleSearch(query);
  };

  return (
    <div className="moviespage">
      <div className={css.searchBox}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button className={css.button} type="submit">
            <TbCameraSearch className={css.icon} />
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </form>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
