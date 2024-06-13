import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";

import CinemaSliceReducer from "./slices/cinema/cinemaSlice";
import { roomApi } from '../services/room/roomApi';
import { moviesApi } from '../services/movies/moviesApi';
import { seatsApi } from '../services/seats/seatsApi';


export const store:any = configureStore({
  reducer: {
    cinemaSlice:CinemaSliceReducer,

    [roomApi.reducerPath]: roomApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [seatsApi.reducerPath]: seatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      roomApi.middleware,
      moviesApi.middleware,
      seatsApi.middleware,
    ),
  },
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);