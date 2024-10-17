import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "./../../components/SearchBar/SearchBar";
import apiRequests from "../../utils/apiRequests";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (query) => {
    try {
      const { movies } = await apiRequests("search", 1, query);
      setMovies(movies);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="moviespage">
      <SearchBar onSubmit={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
