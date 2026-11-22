import { apiSlice } from "./apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createReview: builder.mutation({
      query: (data) => ({
        url: "reviews",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Review"],
    }),

    getAllReviews: builder.query({
  query: () => "reviews/all",
  providesTags: ["Review"],
}),

    getReviews: builder.query({
      query: () => "reviews",

      providesTags: ["Review"],
    }),

  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
} = reviewApi;