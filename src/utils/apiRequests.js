import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const apiRequests = async (endpoint, page = 1, query = "") => {
  let url;

  if (endpoint === "trending") {
    url = `${BASE_URL}/trending/movie/day?language=en-US&page=${page}`;
  } else if (endpoint === "search") {
    url = `${BASE_URL}/search/movie?include_adult=true&language=en-US&page=${page}&query=${query}`;
  } else {
    throw new Error("Unknown endpoint");
  }

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDQ2ZWI1YjYyNTkxNzM5ZjIwZGU0MjY2OTk3OTU2NCIsIm5iZiI6MTcyOTE4OTY0Mi42NjE3MTksInN1YiI6IjY3MTE1NDc2YTJjZmUxMjVmYjk2MGExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-zGG2igUWzG6o9ozbbxQdADtUcSnfYv3We00TfEW_1w",
    },
  };

  try {
    const response = await axios.get(url, options);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      originalTitle: movie.original_title || "No title",
      popularity: movie.popularity,
      poster: movie.backdrop_path,
      dateOfRelease: movie.release_date,
      title: movie.title,
    }));
    const totalPages = response.data.total_pages;
    const totalResult = response.data.total_results;

    return { movies, totalPages, totalResult };
  } catch (error) {
    console.error("error: " + error);
    throw error;
  }
};

export default apiRequests;
