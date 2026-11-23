import { apiSlice } from "./apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public ke liye (sirf approved reviews)
    getReviews: builder.query({
      query: () => "reviews",
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    
    // Admin ke liye (saare reviews)
    getAllReviews: builder.query({
      query: () => "reviews/all",
      providesTags: ["Review"],
    }),
    approveReview: builder.mutation({
      query: ({ id, approved }) => ({
        url: `reviews/${id}/approve`,
        method: "PATCH",
        body: { approved },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useApproveReviewMutation,
} = reviewApi;