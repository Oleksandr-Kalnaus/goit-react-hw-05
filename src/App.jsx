import { Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "modern-normalize";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" element={HomePage} />
          <Route path="/movies" element={MoviesPage} />
          <Route path="/movie/:id" element={MovieDetailsPage} />
          <Route element={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
