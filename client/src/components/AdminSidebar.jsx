"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaStar,
  FaMapMarkedAlt,
  FaImages,
  FaCog,
  FaSignOutAlt,
  FaCar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  // { href: "/admin/bookings", label: "Bookings", icon: <FaCalendarCheck /> },
  // { href: "/admin/reviews", label: "Reviews", icon: <FaStar /> },
  { href: "/admin/places", label: "Popular Places", icon: <FaMapMarkedAlt /> },
  { href: "/admin/gallery", label: "Gallery", icon: <FaImages /> },
  { href: "/admin/settings", label: "Site Settings", icon: <FaCog /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    localStorage.removeItem("admin_token");
    toast.success("Logged out");
    router.push("/admin/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-zinc-950 text-white p-6 sticky top-0 flex flex-col border-r border-zinc-800">
      {/* Logo */}
      <Link href="/admin/dashboard" className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          <FaCar className="text-white" />
        </div>
        <div>
          <p className="font-bold text-base font-[family-name:var(--font-jakarta)]">
            Bhagwati
          </p>
          <p className="text-[10px] uppercase tracking-widest text-orange-400">
            Admin Panel
          </p>
        </div>
      </Link>

      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 px-3">
        Menu
      </p>
      <nav className="space-y-1 flex-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                active
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
        >
          <span className="flex items-center gap-3">
            <FaExternalLinkAlt size={12} />
            View Website
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition w-full"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}