import { Link } from "react-router-dom";
import "./MovieList.module.css";

function MovieList({ movies = [] }) {
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
