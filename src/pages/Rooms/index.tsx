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
  const [selectedRoomId, setSelectedRoom] = useState<number>(NaN);
  const [MovieID, setMovieID] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedRoom(id);
    getMoviesRoom(id);
    setMovieID(NaN)
  };

  const getSelectedRoom = (id: number) => {
    return selectedRoomId === id ? "selected-room" : "";
  };

  const ChooseMovieId = (id: number) => {
    setMovieID(id);
  };

  const getRoomName = (id: number) => {
    return roomsData?.data.find((room:Movie) => room.id === id)?.name
  };

  const getMovieNameAndTime = (id: number) => {
    const movie = movies?.data.find((movie: Movie) => movie.id === id);
    return {
      title:movie.title,
      show_datetime:movie.show_datetime
    }
  };

  // console.log(roomsData, "roomsData");
  // console.log(movies, "movies");

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

      {movies && !MovieID && <MovieList 
        chooseMovieSeats={ChooseMovieId} 
        movies={movies?.data} 
        roomName={getRoomName(selectedRoomId)}
      />}

      {!!MovieID && 
        <Seats 
          MovieID={MovieID}
          movieNameAndDate={getMovieNameAndTime(MovieID)}
          RoomID={selectedRoomId}
          roomsName={getRoomName(selectedRoomId)}
        />
      }

    </div>
  );
}

export default Rooms;