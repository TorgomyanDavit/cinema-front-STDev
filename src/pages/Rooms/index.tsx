import MovieList, { Movie } from "../../components/movieLists";
import Seats from "../../components/seats";
import { useLazyGetMoviesQuery } from "../../services/movies/moviesApi";
import { useGetCinemaRoomsQuery } from "../../services/room/roomApi";
import "./rooms.scss";
import { useState } from "react";

interface Room {
  id: number;
  name: string;
}

function Rooms() {
  const { data: roomsData, isLoading } = useGetCinemaRoomsQuery(null);
  const [getMoviesRoom, { data: movies }] = useLazyGetMoviesQuery();
  const [selectedRoom, setSelectedRoom] = useState<number>(NaN);
  const [moviesId, setMoviesId] = useState<number | null>(null);


  const handleClick = (id: number) => {
    setSelectedRoom(id);
    getMoviesRoom(id);
  };

  const getSelectedRoom = (id: number) => {
    return selectedRoom === id ? "selected-room" : "";
  };

  const ChooseMovieId = (id: number) => {
    setMoviesId(id);
  };

  const getRoomName = (id: number) => {
    return roomsData?.data.find((room:Movie) => room.id === id)?.name
  };

  const getMovieName = (id: number) => {
    return movies?.data.find((movie:Movie) => movie.id === id)?.title
  };

  console.log(roomsData, "roomsData");
  console.log(movies, "movies");

  if (isLoading) return <h1>Loading ...</h1>;
  return (
    <div className="rooms_page">
      <h1 className="title">Cinema Rooms</h1>
      <div className="rooms_list">
        {roomsData?.data.map(({ id, name }: Room) => (
          <button
            key={id}
            className={`room_link ${getSelectedRoom(id)}`}
            onClick={() => handleClick(id)}
          >
            {name}
          </button>
        ))}
      </div>

      {movies && !moviesId && <MovieList 
        chooseMovieSeats={ChooseMovieId} 
        movies={movies?.data} 
        roomName={getRoomName(selectedRoom)}
      />}

      {moviesId && 
        <Seats 
          movieName={getMovieName(moviesId)}
          roomId={selectedRoom}
          roomsName={getRoomName(selectedRoom)}
        />
      }

    </div>
  );
}

export default Rooms;
