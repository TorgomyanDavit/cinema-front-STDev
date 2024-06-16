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
import CreateMovie from "../createMovie";


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
  nameAndId: {roomName:string,RoomID:number};
}

function AdminMovieList({ movies, nameAndId }: MovieListProps) {
  const {roomName,RoomID} = nameAndId
  const [{success},SetSuccessCode] = useState({success:""})
  const [movieId,SetMovieId] = useState<number>(NaN)

  const [deleteMovie] = useDeleteMovieMutation()
  const handleDeleteItem = async (mofifierid:Number) =>{
    await deleteMovie(mofifierid).unwrap().then((resp) => {
      SetSuccessCode({success:resp.message})
    })
  };

  const getCurrentMovie = (id: number) => {
    const movie = movies?.find((movie: Movie) => movie.id === id);
    return movie
  };

  return (
    <div className="movies_list">
      <h2>Change or add movies in {roomName}</h2>
      <div className="add_movies_and_rooms">
        <button onClick={() => SetMovieId(Infinity)} className="button">+ Add movies</button>
      </div>

      {movies.map(({ id, title, poster_url, show_datetime, duration, Available }) => {
          return (
            <div key={id} className="movie_item">
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
                  <IconButton onClick={() => {SetMovieId(id);}}> 
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

      {!!movieId &&
      <CreateMovie  
        RoomID={RoomID}
        SetMessage={SetSuccessCode}
        NewData={getCurrentMovie(movieId)}
        onClose={() => {SetMovieId(NaN)}}
      />}

      
      {!!success && <AlertResponseDialog
        successMessage={success} 
        CloseConfirmMessage={SetSuccessCode}
      />}

    </div>
  );
}

export default AdminMovieList;
