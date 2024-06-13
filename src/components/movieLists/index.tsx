import "./movieList.scss";

interface Movie {
  id: number;
  title: string;
  poster_url: string;
  show_datetime: string;
  duration: string;
}

interface MovieListProps {
  movies: Movie[];
  roomName: string;
  chooseMovieSeats: (id: number) => any;
}

function MovieList({ movies, roomName, chooseMovieSeats }: MovieListProps) {
  return (
    <div className="movies_list">
      <h2>Movies in {roomName}</h2>
      {movies.map(({ id, title, poster_url, show_datetime, duration }) => (
        <div key={id} className="movie_item" onClick={() => chooseMovieSeats(id)}>
          <h3>{title}</h3>
          <img src={poster_url} alt={title} className="movie_poster" />
          <p className="showtime">
            Showtime: {new Date(show_datetime).toLocaleString()}
          </p>
          <p className="duration">
            Duration: {duration}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
