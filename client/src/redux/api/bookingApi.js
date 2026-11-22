import { apiSlice } from "./apiSlice";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createBooking: builder.mutation({
      query: (data) => ({
        url: "bookings",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Booking"],
    }),

    getBookings: builder.query({
      query: () => "bookings",

      providesTags: ["Booking"],
    }),

    updateBooking: builder.mutation({
    query: ({ id, data }) => ({
        url: `bookings/${id}`,
        method: "PATCH",
        body: data,
    }),
    invalidatesTags: ["Booking"],
}),

deleteBooking: builder.mutation({
    query: (id) => ({
        url: `bookings/${id}`,
        method: "DELETE",
    }),
    invalidatesTags: ["Booking"],
}),

  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
useDeleteBookingMutation,
} = bookingApi;