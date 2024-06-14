import { createSlice } from '@reduxjs/toolkit'
import { seatsApi } from '../../../services/seats/seatsApi'

type Seat = {
  id: number;
  RoomID: number;
  SeatNumber: number;
  Available: number;
}

type PayloadType = {
  data: Seat[];
  success: boolean;
};

export interface cinemaInterfaceType {
  seats:Seat[]
}

const initialState:cinemaInterfaceType = {
   seats:[]
}

const cinemaSlice = createSlice({
  name:'cinemaSlice',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addMatcher(seatsApi.endpoints.getRoomSeats.matchFulfilled,(state,{ payload }: { payload: PayloadType }) => {
      if(payload.success) {
        state.seats = payload.data
      }
    })
  }
})

export const { } = cinemaSlice.actions
export default cinemaSlice.reducer