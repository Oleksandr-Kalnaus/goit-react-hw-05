import "./MovieList.module.css";

function MovieList({ movies = [] }) {
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
              alt={movie.title}
            />
            {movie.title} (Released: {movie.dateOfRelease})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
