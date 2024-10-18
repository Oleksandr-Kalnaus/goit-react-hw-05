import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await apiRequests("details", 1, id);
        setMovie(movieData);
      } catch (err) {
        if (err.response) {
          setError(
            new Error(
              `Error ${err.response.status}: ${err.response.data.status_message}`
            )
          );
        } else if (err.request) {
          setError(
            new Error("No response from the server. Please try again later.")
          );
        } else {
          setError(new Error(err.message));
        }
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
      {movie.poster_path && (
        <img
          src={`${BASE_IMAGE_URL}${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      )}
      <p>Budget: {movie.budget}</p>
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
