import { useEffect, useState } from "react";
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const DEFAULT_POSTER_URL = "/src/img/poster.jpg";

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

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  return (
    <div className={css.movieDetailsPage}>
      <div className={css.movieDetails}>
        <div className={css.posterBox}>
          <button className={css.goBackBtn} onClick={() => navigate(-1)}>
            Go back
          </button>
          <img
            className={css.poster}
            src={
              movie.poster_path
                ? `${BASE_IMAGE_URL}${movie.poster_path}`
                : DEFAULT_POSTER_URL
            }
            alt={`${movie.title} Poster`}
            onError={(e) => (e.target.src = DEFAULT_POSTER_URL)}
          />
        </div>

        <div className={css.dataBox}>
          <h1 className={css.heading}>{movie.title}</h1>
          <p className={css.dataText}>Budget: {movie.budget}</p>
          <p className={css.dataText}>Status: {movie.status}</p>
          <p className={css.dataText}>Rating: {movie.vote_average}</p>
          <p className={css.overview}>Overview: {movie.overview}</p>
        </div>
      </div>

      <nav className={css.linkBox}>
        <Link
          className={css.link}
          to="cast"
          state={{ from: location.state?.from }}
        >
          Cast
        </Link>
        <Link
          className={css.link}
          to="reviews"
          state={{ from: location.state?.from }}
        >
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
