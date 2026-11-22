"use client";

import { motion } from "framer-motion";
import {
  FaCar,
  FaPlaneArrival,
  FaRoad,
  FaMapMarkedAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Jaipur Sightseeing",
    desc: "Cover all iconic spots — Hawa Mahal, Amber Fort, Jal Mahal & more.",
    icon: <FaMapMarkedAlt size={28} />,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Airport Pickup",
    desc: "On-time pickup & drop from Jaipur International Airport, 24x7.",
    icon: <FaPlaneArrival size={28} />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "One Way Taxi",
    desc: "Comfortable one-way rides to any destination at best rates.",
    icon: <FaRoad size={28} />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Round Trip",
    desc: "Round-trip packages for outstation journeys with expert drivers.",
    icon: <FaCar size={28} />,
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            What we offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            From city tours to outstation trips, we have got every ride covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-7 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
              >
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mt-6 text-zinc-900 dark:text-white">
                {s.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}