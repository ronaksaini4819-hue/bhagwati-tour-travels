"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCar,
  FaUsers,
  FaMapMarkedAlt,
  FaAward,
  FaCheckCircle,
  FaArrowRight,
  FaPhoneAlt,
  FaWhatsapp,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";

const stats = [
  { value: "10+", label: "Years Experience", icon: <FaAward /> },
  { value: "5000+", label: "Happy Travellers", icon: <FaUsers /> },
  { value: "50+", label: "Cities Covered", icon: <FaMapMarkedAlt /> },
  { value: "4.9", label: "Average Rating", icon: <FaStar /> },
];

const values = [
  {
    icon: <FaShieldAlt size={24} />,
    title: "Safety First",
    desc: "Verified drivers, sanitized vehicles, and strict safety protocols on every single ride.",
  },
  {
    icon: <FaClock size={24} />,
    title: "Punctual Always",
    desc: "We value your time. On-time pickups and drops, guaranteed — even at 3 AM.",
  },
  {
    icon: <FaHeart size={24} />,
    title: "Made with Love",
    desc: "Every journey is crafted with the warmth of Rajasthani hospitality — Padharo Mhare Desh.",
  },
  {
    icon: <FaCheckCircle size={24} />,
    title: "Transparent Pricing",
    desc: "No hidden charges, no surprises. What you see is exactly what you pay.",
  },
];

const milestones = [
  { year: "2014", title: "Our Journey Began", desc: "Started with a single car and a big dream in Jaipur." },
  { year: "2017", title: "1,000 Happy Customers", desc: "Word of mouth made us the trusted choice for Jaipur tours." },
  { year: "2020", title: "Expanded Outstation", desc: "Added outstation routes to Udaipur, Jodhpur, Ajmer, and more." },
  { year: "2024", title: "5,000+ Journeys", desc: "Now serving thousands of travellers with 20+ vehicles." },
];

export default function AboutPage() {
  const { data: settings } = useGetSettingsQuery();

  const phone = settings?.phone || "+91 9799727454";
  const whatsapp = (settings?.whatsapp || "919799727454").replace(/\D/g, "");
  const siteName = settings?.siteName || "Bhagwati Tour & Travels";

  return (
    <main className="bg-white dark:bg-zinc-950">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              <FaCar size={11} /> About Us
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-6 text-zinc-900 dark:text-white leading-[1.05] font-[family-name:var(--font-jakarta)]">
              Driven by passion.
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Powered by trust.
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Since 2014, {siteName} has been Jaipur's trusted travel partner —
              turning every trip into a story worth telling. From local
              sightseeing to long outstation journeys, we ride with heart.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition"
              >
                Book a Ride <FaArrowRight size={12} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-3.5 rounded-xl font-semibold hover:border-orange-500 transition"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="border-y border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  {s.icon}
                </div>
                <p className="text-4xl md:text-5xl font-bold mt-4 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
                  {s.value}
                </p>
                <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/places/hawa-mahal.jpg"
                  alt="Hawa Mahal"
                  className="rounded-3xl w-full h-64 object-cover shadow-xl"
                />
                <img
                  src="/places/amber-fort.jpg"
                  alt="Amber Fort"
                  className="rounded-3xl w-full h-64 object-cover shadow-xl mt-8"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 bg-orange-500 text-white p-5 rounded-2xl shadow-2xl">
                <p className="text-sm font-medium opacity-90">
                  Serving travellers since
                </p>
                <p className="text-3xl font-bold font-[family-name:var(--font-jakarta)]">
                  2014
                </p>
              </div>
            </motion.div>

            {/* Right: story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)] leading-tight">
                A journey that began with one car
              </h2>
              <p className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {settings?.about ||
                  "What started as a single taxi in the Pink City has grown into one of Jaipur's most loved travel services. Our founder believed that every traveller deserves more than just a ride — they deserve an experience. That belief continues to drive us every single day."}
              </p>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Today, with a fleet of well-maintained vehicles and a team of
                expert local drivers, we serve thousands of travellers — from
                solo backpackers to large families — with the same dedication
                and warmth as day one.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Verified & experienced drivers",
                  "Clean, AC-equipped vehicles",
                  "24x7 customer support",
                  "Transparent, honest pricing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" size={16} />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              What drives us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
              Our Core Values
            </h2>
            <p className="text-zinc-500 mt-4">
              The principles that guide every journey we take, every ride we
              deliver.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white dark:bg-zinc-950 rounded-3xl p-7 border border-zinc-100 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mt-6 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
                  {v.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
              Our Journey So Far
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-transparent md:-translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-orange-200 dark:ring-orange-500/20 md:-translate-x-1/2" />

                  {/* Content */}
                  <div className={`md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className="inline-block bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-3 py-1 rounded-full text-sm mb-3">
                      {m.year}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
                      {m.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 p-10 md:p-16 text-center">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 80% 70%, white 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-jakarta)]">
                Ready to travel with us?
              </h2>
              <p className="text-white/90 mt-4 max-w-xl mx-auto">
                Book your ride now and experience the Bhagwati difference —
                comfort, care, and the Pink City's best drivers.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-zinc-100 transition"
                >
                  <FaWhatsapp size={18} /> WhatsApp Us
                </a>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 bg-black/20 backdrop-blur border border-white/30 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-black/30 transition"
                >
                  <FaPhoneAlt size={15} /> {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}