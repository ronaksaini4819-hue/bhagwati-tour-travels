"use client";

import Link from "next/link";
import {
  FaCalendarCheck,
  FaStar,
  FaMapMarkedAlt,
  FaImages,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { useGetBookingsQuery } from "@/redux/api/bookingApi";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";
import { useGetPlacesQuery } from "@/redux/api/placeApi";
import { useGetGalleryQuery } from "@/redux/api/galleryApi";

export default function AdminDashboard() {
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: reviews = [] } = useGetReviewsQuery();
  const { data: places = [] } = useGetPlacesQuery();
  const { data: gallery = [] } = useGetGalleryQuery();

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: <FaCalendarCheck />,
      gradient: "from-blue-500 to-indigo-500",
      href: "/admin/bookings",
    },
    {
      label: "Reviews",
      value: reviews.length,
      icon: <FaStar />,
      gradient: "from-amber-500 to-orange-500",
      href: "/admin/reviews",
    },
    {
      label: "Places",
      value: places.length,
      icon: <FaMapMarkedAlt />,
      gradient: "from-emerald-500 to-teal-500",
      href: "/admin/places",
    },
    {
      label: "Gallery Images",
      value: gallery.length,
      icon: <FaImages />,
      gradient: "from-purple-500 to-pink-500",
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
          Dashboard
        </h1>
        <p className="text-zinc-500 mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center shadow-lg`}
              >
                {s.icon}
              </div>
              <FaArrowRight className="text-zinc-300 dark:text-zinc-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-4xl font-bold text-zinc-900 dark:text-white">
              {s.value}
            </p>
            <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Recent Bookings
            </h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              Latest customer requests
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1"
          >
            View all <FaArrowRight size={12} />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaClock className="text-zinc-400" size={24} />
            </div>
            <p className="text-zinc-500">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-left text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Trip Type</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 6).map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                      {b.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {b.phone}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {b.tripType}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {b.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          b.status === "Pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                            : b.status === "Confirmed"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}