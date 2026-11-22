"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaLock, FaEnvelope, FaCar, FaArrowLeft } from "react-icons/fa";
import { useLoginMutation } from "@/redux/api/authApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      document.cookie = `admin_token=${res.token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax`;
      localStorage.setItem("admin_token", res.token);
      toast.success("Welcome back!");
      router.push("/admin/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <FaCar size={20} />
            </div>
            <div>
              <p className="font-bold text-lg">Bhagwati</p>
              <p className="text-[10px] uppercase tracking-widest opacity-80">
                Tour & Travels
              </p>
            </div>
          </Link>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Manage your travel business with confidence
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              Bookings, reviews, gallery, popular places and site settings — all
              in one powerful dashboard.
            </p>
          </div>

          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Bhagwati Tour & Travels
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-5 py-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 mb-8 transition"
          >
            <FaArrowLeft size={12} />
            Back to website
          </Link>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
            Admin Login
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/30 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}