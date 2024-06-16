
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";




export const seatsApi = createApi({
  reducerPath: "seatsApi",
  tagTypes: ["seatsTagType"],
  baseQuery: fetchBaseQuery({
    baseUrl:`${baseUrl}/api`,
    prepareHeaders: (headers) => {
      return headers;
    }
  }),
  
  endpoints: (builder) => ({
    getRoomSeats: builder.query({
      query: ({RoomID,show_datetime}) => {
          return ({
            method: 'GET',
            url:`/seats/${RoomID}/${show_datetime}`   
          })
      },
      providesTags: ['seatsTagType'],
    }),
    
    bookMovie: builder.mutation({
      query: (selectedSeat) => {
        return {
          method: 'POST',
          url: '/booking',
          body: selectedSeat,
        }
      },
      invalidatesTags: ['seatsTagType']
    })
  })
});

export const { 
  useGetRoomSeatsQuery,
  useBookMovieMutation
} = seatsApi;
