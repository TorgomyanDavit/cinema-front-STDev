// import MovieList, { Movie } from "../../components/movieLists";
import ResponsiveDialog from "../../components/dialog";
import { Movie } from "../../components/movieLists";
import AdminMovieList from "../../components/movieLists/adminMovieList";
import { useLazyGetMoviesQuery } from "../../services/movies/moviesApi";
import { useDeleteRoomMutation, useGetCinemaRoomsQuery } from "../../services/room/roomApi";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./admin.scss";
import AlertResponseDialog from "../../components/SuccessPopUp";
import CreateRoom from "../../components/createRoom";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';


interface Room {
  id: number;
  name: string;
}

function CinemaAdmin() {
  const { data: roomsData, isLoading } = useGetCinemaRoomsQuery(null);
  const [getMoviesRoom, { data: movies }] = useLazyGetMoviesQuery();
  const [selectedRoomId, setSelectedRoom] = useState<number>(NaN);
  const [{success},SetSuccessCode] = useState({success:""})
  const [RoomID,SetRoomID] = useState<number>(NaN)

  const handleClick = (id: number) => {
    setSelectedRoom(id);
    getMoviesRoom(id);
  };

  const [deleteRoom] = useDeleteRoomMutation()
  const handleDeleteItem = async (mofifierid:Number) =>{
    await deleteRoom(mofifierid).unwrap().then((resp) => {
      SetSuccessCode({success:resp.message})
    })
  };

  const getSelectedRoom = (id: number) => {
    return selectedRoomId === id ? "selected-room" : "";
  };

  const getRoomNameAndId = (id: number) => {
    const data = roomsData?.data.find((room:Movie) => room.id === id)
    if(data) {
      return {
        roomName:data?.name,
        RoomID:data?.id
      }
    }

    return {}
  };

  if (isLoading) return <h1>Loading ...</h1>;
  return (
    <div className="admin_rooms_page">
      <h1 className="title">Admin panel for manage rooms and movies</h1>
      <div className="add_movies_and_rooms">
        <button onClick={() => SetRoomID(Infinity)} className="button">+ Add rooms</button>
      </div>
      <div className="rooms_list">
        {roomsData?.data.map(({ id, name }: Room) => (
          <div
            role="button"
            key={id}
            className={`room_link ${getSelectedRoom(id)}`}
            onClick={() => handleClick(id)}
          >
            {name}
            <div className="cardHeaderMode">
              <Tooltip title="Change">
                <IconButton onClick={() => {SetRoomID(id);}}> 
                  <ModeEditOutlineIcon/> 
                </IconButton>
              </Tooltip>
              <ResponsiveDialog
                uniqId={id} 
                icon={<DeleteIcon sx={{ color: "red" }}/>} 
                handleDeleteItem={handleDeleteItem}
              />
            </div>
          </div>
        ))}
      </div>

      {movies && <AdminMovieList
        movies={movies?.data} 
        nameAndId={getRoomNameAndId(selectedRoomId)}
      />}

      {!!RoomID &&
      <CreateRoom  
        SetMessage={SetSuccessCode}
        NewData={getRoomNameAndId(RoomID)}
        onClose={() => {SetRoomID(NaN)}}
      />}

      {!!success && <AlertResponseDialog
        successMessage={success} 
        CloseConfirmMessage={SetSuccessCode}
      />}

    </div>
  );
}

export default CinemaAdmin;