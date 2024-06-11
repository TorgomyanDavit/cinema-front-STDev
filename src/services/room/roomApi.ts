
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";




export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: ["roomTagType"],
  baseQuery: fetchBaseQuery({
    baseUrl:baseUrl,
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include"
  }),
  
  endpoints: (builder) => ({
    getCinemaRooms: builder.query({
      query: () => {
          return ({
            method: 'GET',
            url:`/room`   
          })
      },
      providesTags: ['roomTagType'],
    }),
  })
});

export const { 
  useGetCinemaRoomsQuery
} = roomApi;
