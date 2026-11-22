"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useGetGalleryQuery } from "@/redux/api/galleryApi";
import { imageUrl } from "@/utils/imageUrl";

export default function GalleryPage() {
  const { data: items = [], isLoading } = useGetGalleryQuery();
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Our memories
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white">
            Gallery
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Glimpses from our journeys across Rajasthan
          </p>
        </div>

        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
                style={{ height: `${200 + (i % 3) * 100}px` }}
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">
            No photos yet. Check back soon!
          </p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(item)}
                className="mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={imageUrl(item.image)}
                  alt={item.title || "gallery"}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                {item.title && (
                  <p className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    {item.title}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white text-2xl bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center"
            >
              <FaTimes />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={imageUrl(selected.image)}
              alt={selected.title}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}