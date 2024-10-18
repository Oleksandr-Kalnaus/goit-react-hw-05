import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import "./MovieReviews.module.css";

function MovieReviews() {
  const { id: movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await apiRequests("reviews", 1, movieId);
        console.log(reviewsData);
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="movie-reviews">
      <h2>Movie Reviews</h2>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default MovieReviews;
