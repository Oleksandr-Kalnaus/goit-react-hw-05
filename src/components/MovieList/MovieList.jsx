import "./MovieList.module.css";

function MovieList() {
  // Example list of movies
  const movies = [
    { id: 1, title: "Inception" },
    { id: 2, title: "The Dark Knight" },
    { id: 3, title: "Interstellar" },
  ];

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

export default MovieList;
