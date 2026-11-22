import { apiSlice } from "./apiSlice";

export const placeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaces: builder.query({
      query: () => "places",
      providesTags: ["Place"],
    }),
    createPlace: builder.mutation({
      query: (formData) => ({
        url: "places",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Place"],
    }),
    updatePlace: builder.mutation({
      query: ({ id, formData }) => ({
        url: `places/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Place"],
    }),
    deletePlace: builder.mutation({
      query: (id) => ({
        url: `places/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Place"],
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} = placeApi;