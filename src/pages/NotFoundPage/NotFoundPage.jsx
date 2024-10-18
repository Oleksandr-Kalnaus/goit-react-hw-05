import { Link } from "react-router-dom";
import "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404 - Not Found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;
