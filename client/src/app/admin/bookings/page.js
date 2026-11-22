"use client";

import toast from "react-hot-toast";
import { FaPhone, FaTrash, FaCheck, FaClock, FaInbox } from "react-icons/fa";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";

export default function AdminBookingsPage() {
  const { data: bookings = [], isLoading } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const updateStatus = async (id, status) => {
    try {
      await updateBooking({ id, data: { status } }).unwrap();
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await deleteBooking(id).unwrap();
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
          Bookings
        </h1>
        <p className="text-zinc-500 mt-2">
          Manage incoming customer booking requests
        </p>
      </div>

      {isLoading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-16 text-center">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaInbox className="text-zinc-400" size={24} />
          </div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            No bookings yet
          </h3>
          <p className="text-zinc-500 mt-1">
            New booking requests will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Customer
                    </p>
                    <p className="font-bold text-zinc-900 dark:text-white mt-1">
                      {b.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Phone
                    </p>
                    <a
                      href={`tel:${b.phone}`}
                      className="font-medium text-orange-500 hover:underline flex items-center gap-1.5 mt-1 text-sm"
                    >
                      <FaPhone size={11} /> {b.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Route
                    </p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                      {b.pickup} → {b.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Date / Time
                    </p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                      {b.date} • {b.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      b.status === "Pending"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        : b.status === "Confirmed"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {b.status === "Pending" ? <FaClock size={10} /> : <FaCheck size={10} />}
                    {b.status}
                  </span>

                  {b.status !== "Confirmed" && (
                    <button
                      onClick={() => updateStatus(b.id, "Confirmed")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== "Pending" && (
                    <button
                      onClick={() => updateStatus(b.id, "Pending")}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      Pending
                    </button>
                  )}
                  <button
                    onClick={() => remove(b.id)}
                    className="bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 p-2 rounded-lg transition"
                  >
                    <FaTrash size={11} />
                  </button>
                </div>
              </div>

              {b.message && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1">
                    Message
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {b.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}