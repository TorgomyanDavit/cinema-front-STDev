
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";


export const moviesApi = createApi({
  reducerPath: "moviesApi",
  tagTypes: ["moviesTagType"],
  baseQuery: fetchBaseQuery({
    baseUrl:`${baseUrl}/api`,
    prepareHeaders: (headers) => {
      return headers;
    }
  }),
  
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (id:number) => {
          debugger
          return ({
            method: 'GET',
            url:`/movies/${id}`   
          })
      },
      providesTags: ['moviesTagType'],
    }),
  })
});

export const { 
  useLazyGetMoviesQuery
} = moviesApi;
