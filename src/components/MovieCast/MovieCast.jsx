import { useEffect, useState } from "react";
import apiRequests from "../../utils/apiRequests";
import "./MovieCast.module.css";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const { cast } = await apiRequests(`movie/${movieId}/credits`);
        setCast(cast);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="movie-cast">
      <h1>Movie Cast</h1>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
