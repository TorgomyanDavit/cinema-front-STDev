import "./movieList.scss";
import moment from 'moment'; 
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveDialog from "../dialog";
import { useDeleteMovieMutation } from "../../services/movies/moviesApi";
import { useState } from "react";
import AlertResponseDialog from "../SuccessPopUp";


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

function AdminMovieList({ movies, roomName, chooseMovieSeats }: MovieListProps) {
  const [{success},SetSuccessCode] = useState({success:""})

  const [deleteMovie] = useDeleteMovieMutation()
  const handleDeleteItem = async (mofifierid:Number) =>{
      await deleteMovie(mofifierid).unwrap().then((resp) => {
        debugger
        SetSuccessCode({success:resp.message})
      })
  };

  return (
    <div className="movies_list">
      <h2>Change or add movies in {roomName}</h2>
      <button className="LinkTo_anotherPage" onClick={() => SetOpenCreeatePopUp(true)}>+ Ավելացնել</button>
      {/* <button className="LinkTo_anotherPage" onClick={() => SetOpenCreeatePopUp(true)}>+ Ավելացնել</button> */}
      
      {movies.map(({ id, title, poster_url, show_datetime, duration, Available }) => {
        console.log(show_datetime,"show_datetime")
          return (
            <div key={id} className="movie_item" onClick={() => chooseMovieSeats(id)}>
              <h3>{title}</h3>
              <img src={poster_url} alt={title} className="movie_poster" />
              <p className="showtime">
                Showtime: {moment(show_datetime).format('MMMM Do YYYY, h:mm A')}
              </p>
              <p className="duration">
                Duration: {duration}
              </p>
              <div className="cardHeaderMode">
                <Tooltip title="Change">
                  {/* <IconButton onClick={() => {setAlbomId(id)}}>  */}
                  <IconButton> 
                    <ModeEditOutlineIcon/> 
                  </IconButton>
                </Tooltip>
                <ResponsiveDialog
                  uniqId={id} 
                  icon={<DeleteIcon sx={{ color: "red" }}/>} 
                  handleDeleteItem={handleDeleteItem}
                />
              </div>


              {!Available && <div className="shadow_disabled">Movie Expaird</div>}  
            </div>
          )
      })}

      {!!success && <AlertResponseDialog
        successMessage={success} 
        CloseConfirmMessage={SetSuccessCode}
      />}
    </div>
  );
}

export default AdminMovieList;
