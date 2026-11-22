"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useGetSettingsQuery } from "@/redux/api/settingsApi";

export default function WhatsappButton() {
  const { data } = useGetSettingsQuery();
  const number = (data?.whatsapp || "919799727454").replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 transition text-white p-4 rounded-full shadow-xl z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}