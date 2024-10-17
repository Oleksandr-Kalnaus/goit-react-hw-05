import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import "./MovieDetailsPage.module.css";
import apiRequests from "../../utils/apiRequests";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movie = await apiRequests(`movie/${id}`);
        setMovie(movie);
      } catch (err) {
        setError(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-page">
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <MovieCast movieId={id} />
      <MovieReviews movieId={id} />
    </div>
  );
}

export default MovieDetailsPage;
