import { useEffect } from "react";
import { useBookMovieMutation, useGetRoomSeatsQuery } from "../../services/seats/seatsApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Seat, chooseSeats, clearSeats } from "../../store/slices/cinema/cinemaSlice";
import { selectBookdata, selectSeats } from "../../store/slices/cinema/selector";
import "./seats.scss";

interface MovieListProps {
    roomsName: string;
    RoomID:number;
    MovieID:number;
    movieNameAndDate:any;
}

type seatPayloadType = {
    SeatID: number;
    RoomID: number;
    MovieID: number;
    show_datetime:string;
    SeatNumber:number;
}

function Seats({ roomsName, RoomID, MovieID, movieNameAndDate }: MovieListProps) {
    const {movieName,show_datetime} = movieNameAndDate
    useGetRoomSeatsQuery({RoomID,show_datetime,MovieID},{refetchOnMountOrArgChange:true});
    const [bookMovie] = useBookMovieMutation()

    const seats = useAppSelector(selectSeats);
    const selectedSeat = useAppSelector(selectBookdata);
    const dispatch = useAppDispatch()
        
    const handleChooseSeat = (seatObj:seatPayloadType) => dispatch(chooseSeats(seatObj));
    const handleBookSeat = async () =>  await bookMovie(selectedSeat).unwrap();
    
    useEffect(() => {dispatch(clearSeats())},[])
    if(!seats) return null;
    return (
        <div className="seats-container">
            <h2>Movie in {roomsName}</h2>
            <h3>{movieName}</h3>

            <div className="seats_list">
                {seats.map(({id,SeatNumber,Available,selected}: Seat) => (
                    <button
                        onClick={() => handleChooseSeat({SeatID:id,RoomID,MovieID,show_datetime,SeatNumber})}
                        key={id}
                        className={`seat ${selected ? 'selected' : ''}`}
                        disabled={!Available}
                    >
                        {SeatNumber}
                    </button>
                ))}
            </div>

            <button className="book_button" onClick={handleBookSeat}>Book movie</button>
        </div>
    );
}

export default Seats;