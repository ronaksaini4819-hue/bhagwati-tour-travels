"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaCar } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  // { href: "/booking", label: "Booking" },
  // { href: "/reviews", label: "Reviews" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50"
          : "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition">
            <FaCar className="text-white text-lg" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-base text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
              Bhagwati
            </p>
            <p className="text-[10px] uppercase tracking-widest text-orange-500 font-semibold">
              Tour & Travels
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition ${
                  active
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-orange-500"
                }`}
              >
                {l.label}
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-orange-50 dark:bg-orange-500/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* <Link
            href="/booking"
            className="hidden md:inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition shadow-lg"
          >
            Book Now
          </Link> */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-xl text-zinc-700 dark:text-zinc-300 p-2"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="p-5 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    pathname === l.href
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="block mt-2 text-center bg-orange-500 text-white py-3 rounded-lg font-semibold"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}