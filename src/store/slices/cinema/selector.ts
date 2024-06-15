import { RootState } from "../../store";

export const selectSeats = (state:RootState) => state.cinemaSlice.seats;
export const selectBookdata = (state:RootState) => state.cinemaSlice.forBookdata;

