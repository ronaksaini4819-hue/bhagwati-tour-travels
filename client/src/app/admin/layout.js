"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}