"use client";

import { motion } from "framer-motion";
import { useGetPlacesQuery } from "@/redux/api/placeApi";
import { imageUrl } from "@/utils/imageUrl";

export default function Places() {
  const { data: places = [], isLoading } = useGetPlacesQuery();

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Explore Jaipur
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white">
            Popular Places
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Discover the Pink City's most iconic destinations with our expert
            guides.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : places.length === 0 ? (
          <p className="text-center text-zinc-500 py-10">
            No places added yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={imageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    Jaipur, Rajasthan
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}