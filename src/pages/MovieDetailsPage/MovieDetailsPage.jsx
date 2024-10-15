import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import "./MovieDetailsPage.module.css";

function MovieDetailsPage({ match }) {
  const { id } = match.params;

  return (
    <div className="movie-details-page">
      <h1>Movie Details for {id}</h1>
      <MovieCast movieId={id} />
      <MovieReviews movieId={id} />
    </div>
  );
}

export default MovieDetailsPage;
