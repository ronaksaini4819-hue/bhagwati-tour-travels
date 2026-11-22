"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSave, FaUser, FaPhone, FaGlobe, FaInfoCircle } from "react-icons/fa";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/redux/api/settingsApi";

const sections = [
  {
    title: "General",
    icon: <FaGlobe />,
    fields: [
      { key: "siteName", label: "Site Name", placeholder: "Bhagwati Tour & Travels" },
      { key: "tagline", label: "Tagline (Hero)", placeholder: "Jaipur Local • Outstation • Airport Pickup" },
    ],
  },
  {
    title: "Contact",
    icon: <FaPhone />,
    fields: [
      { key: "phone", label: "Phone Number", placeholder: "+91 9799727454" },
      { key: "whatsapp", label: "WhatsApp Number", placeholder: "919799727454" },
      { key: "email", label: "Email", placeholder: "info@example.com" },
      { key: "address", label: "Address", placeholder: "Jaipur • Rajasthan" },
    ],
  },
  {
    title: "Social Links",
    icon: <FaUser />,
    fields: [
      { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
      { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
    ],
  },
];

export default function AdminSettingsPage() {
  const { data, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: saving }] = useUpdateSettingsMutation();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(form).unwrap();
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) {
    return <p className="p-10 text-zinc-500">Loading...</p>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
          Site Settings
        </h1>
        <p className="text-zinc-500 mt-2">
          Update your contact info and site details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                {section.icon}
              </div>
              <h2 className="font-bold text-zinc-900 dark:text-white">
                {section.title}
              </h2>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-5">
              {section.fields.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {label}
                  </label>
                  <input
                    value={form[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* About */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
            <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <FaInfoCircle />
            </div>
            <h2 className="font-bold text-zinc-900 dark:text-white">About</h2>
          </div>
          <div className="p-6">
            <textarea
              value={form.about || ""}
              onChange={(e) => handleChange("about", e.target.value)}
              rows={5}
              placeholder="Tell visitors about your business..."
              className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end sticky bottom-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 disabled:opacity-60 transition"
          >
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}