"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
  FaCar,
} from "react-icons/fa";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";

export default function ContactPage() {
  const { data: settings } = useGetSettingsQuery();

  const phone = settings?.phone || "+91 9799727454";
  const whatsapp = (settings?.whatsapp || "919799727454").replace(/\D/g, "");
  const email = settings?.email || "dharmendrasaini9799727454@gmail.com";
  const address = settings?.address || "Jaipur, Rajasthan, India";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending — replace with real API if needed
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 800);
  };

  const contactCards = [
    {
      icon: <FaPhoneAlt size={20} />,
      title: "Call Us",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      gradient: "from-blue-500 to-indigo-500",
      action: "Call Now",
    },
    {
      icon: <FaWhatsapp size={20} />,
      title: "WhatsApp",
      value: phone,
      href: `https://wa.me/${whatsapp}`,
      gradient: "from-green-500 to-emerald-500",
      action: "Chat Now",
    },
    {
      icon: <FaEnvelope size={20} />,
      title: "Email",
      value: email,
      href: `mailto:${email}`,
      gradient: "from-purple-500 to-pink-500",
      action: "Send Email",
    },
    {
      icon: <FaMapMarkerAlt size={20} />,
      title: "Visit Us",
      value: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      gradient: "from-orange-500 to-amber-500",
      action: "Get Directions",
    },
  ];

  return (
    <main className="bg-white dark:bg-zinc-950">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              <FaPaperPlane size={10} /> Get in Touch
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-6 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)] leading-[1.05]">
              Let's plan your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                next journey
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Questions about booking, pricing, or availability? Our team is
              here 24x7 to help you out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ CONTACT CARDS ============ */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {c.icon}
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-4 font-semibold">
                  {c.title}
                </p>
                <p className="font-bold text-zinc-900 dark:text-white mt-1 truncate">
                  {c.value}
                </p>
                <p className="text-xs text-orange-500 font-semibold mt-3">
                  {c.action} →
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORM + INFO ============ */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 md:p-10 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />

              <div className="relative">
                <h2 className="text-3xl font-bold font-[family-name:var(--font-jakarta)]">
                  Contact Information
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                  Reach out through any channel — we're always available.
                </p>

                <div className="space-y-6 mt-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                      <FaPhoneAlt size={15} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        Phone
                      </p>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="font-semibold hover:text-orange-400 transition block mt-0.5"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                      <FaWhatsapp size={16} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        WhatsApp
                      </p>
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold hover:text-green-400 transition block mt-0.5"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <FaEnvelope size={15} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        Email
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold hover:text-purple-400 transition block mt-0.5 break-all"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt size={15} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        Address
                      </p>
                      <p className="font-semibold mt-0.5">{address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <FaClock size={15} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        Hours
                      </p>
                      <p className="font-semibold mt-0.5">
                        Open 24 hours · 7 days a week
                      </p>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="pt-8 mt-8 border-t border-zinc-800">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                    Follow us
                  </p>
                  <div className="flex gap-3">
                    {settings?.facebook && (
                      <a
                        href={settings.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition"
                      >
                        <FaFacebookF size={14} />
                      </a>
                    )}
                    {settings?.instagram && (
                      <a
                        href={settings.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition"
                      >
                        <FaInstagram size={14} />
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-green-500 flex items-center justify-center transition"
                    >
                      <FaWhatsapp size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-10 border border-zinc-100 dark:border-zinc-800"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <FaPaperPlane size={16} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
                    Send us a message
                  </h2>
                  <p className="text-sm text-zinc-500">
                    We usually reply within an hour
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      placeholder="Rahul Sharma"
                      className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us about your trip, dates, and any special requests..."
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane size={14} />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ QUICK HELP ============ */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Need help fast?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
              Quick ways to reach us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 md:p-10 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <FaWhatsapp className="absolute right-6 top-6 text-white/20" size={80} />
              <div className="relative">
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">
                  WhatsApp
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 font-[family-name:var(--font-jakarta)]">
                  Chat with us
                </h3>
                <p className="text-white/80 text-sm mt-2 max-w-xs">
                  Get instant answers about bookings, pricing, and trip
                  planning — anytime.
                </p>
                <p className="mt-6 font-semibold text-sm inline-flex items-center gap-2">
                  Start Chat →
                </p>
              </div>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 md:p-10 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <FaCar className="absolute right-6 top-6 text-white/20" size={80} />
              <div className="relative">
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">
                  Call Now
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 font-[family-name:var(--font-jakarta)]">
                  {phone}
                </h3>
                <p className="text-white/80 text-sm mt-2 max-w-xs">
                  Speak directly with our team for urgent bookings and special
                  requests.
                </p>
                <p className="mt-6 font-semibold text-sm inline-flex items-center gap-2">
                  Call Now →
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}