import dayjs from "dayjs";
import "./movieList.scss";
export interface Movie {
  id: number;
  title: string;
  poster_url: string;
  show_datetime: string;
  duration: string;
  Available:number;
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
      {movies.map(({ id, title, poster_url, show_datetime, duration, Available }) => {
        if(Available) {
          return (
            <div key={id} className="movie_item" onClick={() => chooseMovieSeats(id)}>
              <h3>{title}</h3>
              <img src={poster_url} alt={title} className="movie_poster" />
              <p className="showtime">
                Showtime: {dayjs(show_datetime).format('MMMM Do YYYY, HH:mm')}
              </p>
              <p className="duration">
                Duration: {duration}
              </p>
            </div>
          )
        };
      })}
    </div>
  );
}

export default MovieList;
