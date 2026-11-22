"use client";

import { motion } from "framer-motion";
import {
  FaUserShield,
  FaCar,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

const data = [
  {
    icon: <FaUserShield size={26} />,
    title: "Trusted Drivers",
    desc: "Verified, experienced drivers who know Jaipur inside out.",
  },
  {
    icon: <FaCar size={26} />,
    title: "Clean Vehicles",
    desc: "Well-maintained AC cars for a comfortable, hygienic ride.",
  },
  {
    icon: <FaClock size={26} />,
    title: "24x7 Available",
    desc: "Anytime booking for early morning or late night trips.",
  },
  {
    icon: <FaHeadset size={26} />,
    title: "Instant Support",
    desc: "Real humans ready to help you on WhatsApp or call.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Why us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-zinc-900 dark:text-white leading-tight">
              The Bhagwati <span className="text-orange-500">difference</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-5 leading-relaxed">
              We aren't just another taxi service. Our commitment to safety,
              punctuality, and hospitality makes every journey with us
              memorable.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {data.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    {d.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      {d.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {d.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img
                  src="/places/hawa-mahal.jpg"
                  alt="Hawa Mahal"
                  className="rounded-3xl h-56 w-full object-cover shadow-xl"
                />
                <img
                  src="/places/amber-fort.jpg"
                  alt="Amber Fort"
                  className="rounded-3xl h-40 w-full object-cover shadow-xl"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="/places/jal-mahal.jpg"
                  alt="Jal Mahal"
                  className="rounded-3xl h-40 w-full object-cover shadow-xl"
                />
                <img
                  src="/places/nahargarh.jpg"
                  alt="Nahargarh"
                  className="rounded-3xl h-56 w-full object-cover shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}