
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";




export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: ["roomTagType"],
  baseQuery: fetchBaseQuery({
    baseUrl:`${baseUrl}/api`,
    prepareHeaders: (headers) => {
      return headers;
    }
  }),
  
  endpoints: (builder) => ({
    getCinemaRooms: builder.query({
      query: () => {
          return ({
            method: 'GET',
            url:`/rooms`   
          })
      },
      providesTags: ['roomTagType'],
    }),

    deleteRoom: builder.mutation({
      query: (id:Number) => {
        return {
          method:"DELETE",
          url: `/rooms/${id}`,
        }
      },
      invalidatesTags: ["roomTagType"],
    }),

    editeRoom: builder.mutation({
      query: (formData) => {
        return {
          method: 'POST',
          url:'/rooms',
          body:formData
        }
      },
      invalidatesTags: ['roomTagType']
    }),

    createRoom: builder.mutation({
      query: (formData) => {
        return {
          method: 'PUT',
          url:'/rooms',
          body:formData
        }
      },
      invalidatesTags: ['roomTagType']
    })
  })
});

export const { 
  useGetCinemaRoomsQuery,
  useDeleteRoomMutation,
  useCreateRoomMutation,
  useEditeRoomMutation
} = roomApi;
