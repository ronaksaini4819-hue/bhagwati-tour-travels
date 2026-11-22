"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall, MdVerified } from "react-icons/md";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";
import { useGetPlacesQuery } from "@/redux/api/placeApi";
import { imageUrl } from "@/utils/imageUrl";

export default function Hero() {
  const { data: settings } = useGetSettingsQuery();
  const { data: places = [] } = useGetPlacesQuery();

  const [current, setCurrent] = useState(0);

  // Build slides — use place images, or fallback to hero.jpg
  const slides =
    places.length > 0
      ? places.map((p) => imageUrl(p.image))
      : ["/hero.jpg"];

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Safety: if slides change and current is out of range, reset
  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  const phone = settings?.phone || "+91 9799727454";
  const whatsappRaw = settings?.whatsapp || "919799727454";
  const whatsapp = whatsappRaw.replace(/\D/g, "");
  const tagline =
    settings?.tagline || "Jaipur Local • Outstation • Airport Pickup";

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* ===== Background Slideshow ===== */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={slides[current]}
          alt={`slide-${current}`}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ===== Content ===== */}
      <div className="relative z-10 min-h-[92vh] flex items-center justify-center px-5 py-20">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8"
          >
            <MdVerified className="text-orange-400" />
            Trusted by 5000+ happy travellers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
          >
            Ride with{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Bhagwati
            </span>
            <br />
            Travel in style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto leading-relaxed"
          >
            {tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="group bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all"
            >
              <FaWhatsapp size={22} />
              WhatsApp Us
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-zinc-900 text-white px-7 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all"
            >
              <MdCall size={22} />
              Call Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* ===== Dot Indicators ===== */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-10 bg-orange-500"
                  : "w-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}