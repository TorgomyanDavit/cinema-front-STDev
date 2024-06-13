
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
      query: (roomId:number) => {
          return ({
            method: 'GET',
            url:`/seats/${roomId}`   
          })
      },
      providesTags: ['seatsTagType'],
    })
  })
});

export const { 
  useGetRoomSeatsQuery
} = seatsApi;
