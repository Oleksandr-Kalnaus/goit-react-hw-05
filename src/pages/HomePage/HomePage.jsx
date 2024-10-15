import MovieList from "../../components/MovieList/MovieList";
import "./HomePage.module.css";

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to the Movie App</h1>
      <MovieList />
    </div>
  );
}

export default HomePage;
