import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import "./MovieCast.module.css";

function MovieCast() {
  const { id: movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await apiRequests("cast", 1, movieId);
        setCast(castData || []);
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
      <h2>Movie Cast</h2>
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
