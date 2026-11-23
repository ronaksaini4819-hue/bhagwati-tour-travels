// "use client";

// import toast from "react-hot-toast";
// import { FaStar, FaCheck, FaTimes, FaInbox } from "react-icons/fa";
// import { useGetReviewsQuery } from "@/redux/api/reviewApi";

// export default function AdminReviewsPage() {
//   const { data: reviews = [], isLoading, refetch } = useGetReviewsQuery();

//   const handleApprove = async (id, approved) => {
//     try {
//       await fetch(`https://bhagwati-tour-travels.onrender.com/api/reviews/${id}/approve`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ approved }),
//       });
//       toast.success(approved ? "Approved" : "Rejected");
//       refetch();
//     } catch {
//       toast.error("Failed");
//     }
//   };

//   return (
//     <div className="p-6 md:p-10">
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
//           Reviews
//         </h1>
//         <p className="text-zinc-500 mt-2">
//           Approve or reject customer reviews
//         </p>
//       </div>

//       {isLoading ? (
//         <p className="text-zinc-500">Loading...</p>
//       ) : reviews.length === 0 ? (
//         <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-16 text-center">
//           <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaInbox className="text-zinc-400" size={24} />
//           </div>
//           <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
//             No reviews yet
//           </h3>
//           <p className="text-zinc-500 mt-1">
//             Customer reviews will appear here for approval
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-5">
//           {reviews.map((r) => (
//             <div
//               key={r.id}
//               className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 hover:shadow-md transition"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="font-bold text-zinc-900 dark:text-white">
//                     {r.name}
//                   </p>
//                   <div className="flex text-amber-400 mt-1">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         size={12}
//                         className={i < r.rating ? "" : "text-zinc-200 dark:text-zinc-700"}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <span
//                   className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                     r.approved
//                       ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
//                       : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
//                   }`}
//                 >
//                   {r.approved ? "Approved" : "Pending"}
//                 </span>
//               </div>
//               <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                 "{r.review}"
//               </p>
//               <div className="flex gap-2 mt-5">
//                 {!r.approved && (
//                   <button
//                     onClick={() => handleApprove(r.id, true)}
//                     className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
//                   >
//                     <FaCheck size={11} /> Approve
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleApprove(r.id, false)}
//                   className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 py-2 rounded-lg text-sm font-medium"
//                 >
//                   <FaTimes size={11} /> Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaStar, FaUser, FaQuoteLeft } from "react-icons/fa";
import {
  useGetReviewsQuery,
  useCreateReviewMutation,
} from "@/redux/api/reviewApi";

export default function ReviewsPage() {
  const { data: reviews = [], isLoading } = useGetReviewsQuery();
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    review: "",
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(form).unwrap();
      toast.success("Review submitted! It will appear after admin approval.");
      setForm({ name: "", rating: 5, review: "" });
    } catch (err) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
            What our travellers say
          </h1>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
            Real experiences from real people who travelled with Bhagwati Tour & Travels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left: Review List */}
          <div className="lg:col-span-2 space-y-6">
            {isLoading ? (
              <p className="text-zinc-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-10 text-center border border-zinc-100 dark:border-zinc-800">
                <p className="text-zinc-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative"
                >
                  <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-orange-100 dark:text-orange-500/10" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">
                        {r.name}
                      </h3>
                      <div className="flex text-amber-400 text-sm mt-1">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar
                            key={idx}
                            className={idx < r.rating ? "" : "text-zinc-300 dark:text-zinc-700"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">
                    "{r.review}"
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Right: Write a Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Write a Review
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Rating
                  </label>
                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleChange("rating", star)}
                        className={`transition ${
                          star <= form.rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-700"
                        }`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Your Experience
                  </label>
                  <textarea
                    value={form.review}
                    onChange={(e) => handleChange("review", e.target.value)}
                    required
                    rows={4}
                    placeholder="Tell us about your trip..."
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}