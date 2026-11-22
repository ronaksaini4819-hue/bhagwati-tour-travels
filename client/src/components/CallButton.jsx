"use client";

import { MdCall } from "react-icons/md";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";

export default function CallButton() {
  const { data } = useGetSettingsQuery();
  const phone = (data?.phone || "+91 9799727454").replace(/\s/g, "");

  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-24 right-6 bg-orange-500 hover:bg-orange-600 transition text-white p-4 rounded-full shadow-xl z-50"
    >
      <MdCall size={28} />
    </a>
  );
}