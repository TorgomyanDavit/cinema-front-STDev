import { createSlice } from '@reduxjs/toolkit';
import { seatsApi } from '../../../services/seats/seatsApi';

export type Seat = {
  selected: boolean;
  id: number;
  RoomID: number;
  SeatNumber: number;
  Available: number;
};

type PayloadType = {
  data: Seat[];
  success: boolean;
};

export interface CinemaInterfaceType {
  seats: Seat[];
  forBookdata: {
    RoomID: number;
    MovieID: number;
    selectedSeats: number[];
    show_datetime:string;
    SeatNumber:number;
  } | null;
}

const initialState: CinemaInterfaceType = {
  seats: [],
  forBookdata: null,
};

const cinemaSlice = createSlice({
  name: 'cinemaSlice',
  initialState,
  reducers: {
    chooseSeats: (state, { payload }) => {
      const { SeatID, RoomID, MovieID, show_datetime, SeatNumber } = payload;
      state.seats = state.seats.map((seat: Seat) => {
        if (seat.id === SeatID) {
          seat.selected = !seat.selected;
        }
        return seat;
      });
    
      const selectedSeats = state.seats.filter(seat => seat.selected).map(seat => seat.id);
      state.forBookdata = {
        RoomID,
        MovieID,
        SeatNumber,
        selectedSeats,
        show_datetime
      };

    },

    clearSeats: (state) => {
      state.seats = state.seats.map((seat: Seat) => ({
        ...seat,
        selected: false,
      }));
      state.forBookdata = null;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(seatsApi.endpoints.getRoomSeats.matchFulfilled, (state, { payload }: { payload: PayloadType }) => {
      if (payload.success) {
        state.seats = payload.data.map(seat => ({ ...seat, selected: false }));
      }
    });
  },
});

export const { chooseSeats, clearSeats } = cinemaSlice.actions;
export default cinemaSlice.reducer;
