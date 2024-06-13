import { useLazyGetMoviesQuery } from "../../services/movies/moviesApi";
import { useGetCinemaRoomsQuery } from "../../services/room/roomApi"
import"./rooms.scss"
import { useState } from "react";

interface Item {
  id: number;
  name: string;
}

function Rooms() {
  const { data,isLoading } = useGetCinemaRoomsQuery(null)
  const [getMoviesRoom,{data:movies}] = useLazyGetMoviesQuery();
  const [selectedRoom, setSelectedRoom] = useState<number>(NaN);

  const handleClick = async (id:number) => { 
    setSelectedRoom(selectedRoom)
    getMoviesRoom(id)
  };

  
  const getSelectedRoom = async (id:number) => { 
    return selectedRoom === id ? 'selected-room' : ''
  };


  console.log(movies,"movies") 
  if(isLoading) return <h1>Loading ...</h1>
  return (
    <div className="rooms_page">
    <h1 className="title">Cinema Rooms</h1>
    <div className="rooms_list">
      {data?.data.map(({ id, name }: Item) => (
        <button key={id} className={`room_link ${getSelectedRoom(id)}`} onClick={() => handleClick(id)}>
          {name}
        </button>
      ))}
    </div>
  </div>
  )
}

export default Rooms