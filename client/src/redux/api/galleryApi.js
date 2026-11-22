import { apiSlice } from "./apiSlice";

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => "gallery",
      providesTags: ["Gallery"],
    }),
    createGallery: builder.mutation({
      query: (formData) => ({
        url: "gallery",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),
    updateGallery: builder.mutation({
      query: ({ id, formData }) => ({
        url: `gallery/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApi;