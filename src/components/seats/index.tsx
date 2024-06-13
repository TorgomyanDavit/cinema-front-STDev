import { useGetRoomSeatsQuery } from "../../services/seats/seatsApi";
import "./seats.scss";

interface MovieListProps {
  moviesName: string;
  roomId:number
}

function Seats({ moviesName, roomId }: MovieListProps) {
    const { data: seatsData, isLoading } = useGetRoomSeatsQuery(roomId);

    console.log(seatsData?.data)
    if(isLoading) return null;
    return (
        <div className="movies_list">
            <h2>Movies in {moviesName}</h2>
        </div>
    );
}

export default Seats;