import { RootState } from "../../store";

export const selectSeats = (state:RootState) => state.cinemaSlice.seats;
