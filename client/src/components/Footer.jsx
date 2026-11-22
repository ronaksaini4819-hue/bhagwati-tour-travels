"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaFacebookF,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";

export default function Footer() {
  const { data: settings } = useGetSettingsQuery();
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const name = settings?.siteName || "Bhagwati Tour & Travels";
  const phone = settings?.phone || "+91 9799727454";
  const whatsapp = (settings?.whatsapp || "919799727454").replace(/\D/g, "");
  const address = settings?.address || "Jaipur, Rajasthan, India";
  const email = settings?.email || "dharmendrasaini9799727454@gmail.com";

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <FaCar className="text-white" />
              </div>
              <div>
                <p className="font-bold text-lg font-[family-name:var(--font-jakarta)]">
                  {name.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">
                  Tour & Travels
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your trusted travel partner in Jaipur. Safe rides, expert drivers,
              and unforgettable journeys since 2014.
            </p>
            <div className="flex gap-3 mt-6">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition"
                >
                  <FaFacebookF size={14} />
                </a>
              )}
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition"
                >
                  <FaInstagram size={14} />
                </a>
              )}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-green-500 flex items-center justify-center transition"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                // { href: "/booking", label: "Book a Taxi" },
                { href: "/gallery", label: "Gallery" },
                // { href: "/reviews", label: "Reviews" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-400 hover:text-orange-400 transition flex items-center gap-2 group"
                  >
                    <FaArrowRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>Jaipur Sightseeing</li>
              <li>Airport Pickup</li>
              <li>One Way Taxi</li>
              <li>Round Trip</li>
              <li>Outstation Trips</li>
              <li>Wedding Car Rental</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-zinc-400">
                <FaMapMarkerAlt className="text-orange-500 mt-1 shrink-0" />
                <span>{address}</span>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex gap-3 text-zinc-400 hover:text-orange-400 transition"
                >
                  <FaPhoneAlt className="text-orange-500 mt-1 shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex gap-3 text-zinc-400 hover:text-orange-400 transition"
                >
                  <FaEnvelope className="text-orange-500 mt-1 shrink-0" />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-500">
            © {year || "2026"} {name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Made with ❤️ in Jaipur
          </p>
        </div>
      </div>
    </footer>
  );
}