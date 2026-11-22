"use client";

import toast from "react-hot-toast";
import { FaStar, FaCheck, FaTimes, FaInbox } from "react-icons/fa";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";

export default function AdminReviewsPage() {
  const { data: reviews = [], isLoading, refetch } = useGetReviewsQuery();

  const handleApprove = async (id, approved) => {
    try {
      await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      toast.success(approved ? "Approved" : "Rejected");
      refetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
          Reviews
        </h1>
        <p className="text-zinc-500 mt-2">
          Approve or reject customer reviews
        </p>
      </div>

      {isLoading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-16 text-center">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaInbox className="text-zinc-400" size={24} />
          </div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            No reviews yet
          </h3>
          <p className="text-zinc-500 mt-1">
            Customer reviews will appear here for approval
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {r.name}
                  </p>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={i < r.rating ? "" : "text-zinc-200 dark:text-zinc-700"}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    r.approved
                      ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                  }`}
                >
                  {r.approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                "{r.review}"
              </p>
              <div className="flex gap-2 mt-5">
                {!r.approved && (
                  <button
                    onClick={() => handleApprove(r.id, true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    <FaCheck size={11} /> Approve
                  </button>
                )}
                <button
                  onClick={() => handleApprove(r.id, false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 py-2 rounded-lg text-sm font-medium"
                >
                  <FaTimes size={11} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}