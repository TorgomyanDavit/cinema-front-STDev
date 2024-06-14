import { useGetRoomSeatsQuery } from "../../services/seats/seatsApi";
import { useAppSelector } from "../../store/hooks";
import { selectSeats } from "../../store/slices/cinema/selector";
import "./seats.scss";

interface MovieListProps {
    roomsName: string;
    roomId:number;
    movieName:string
}

function Seats({ roomsName, roomId, movieName }: MovieListProps) {
    useGetRoomSeatsQuery(roomId);
    const seats = useAppSelector(selectSeats);


    console.log(seats,"seats")
    if(seats) return null;
    return (
        <div className="movies_list">
            <h2>Movie in {roomsName}</h2>
            <h3>{movieName}</h3>

        </div>
    );
}

export default Seats;