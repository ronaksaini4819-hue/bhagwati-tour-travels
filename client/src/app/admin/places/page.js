"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaImage } from "react-icons/fa";
import {
  useGetPlacesQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} from "@/redux/api/placeApi";
import { imageUrl } from "@/utils/imageUrl";

export default function AdminPlacesPage() {
  const { data: places = [], isLoading } = useGetPlacesQuery();
  const [createPlace] = useCreatePlaceMutation();
  const [updatePlace] = useUpdatePlaceMutation();
  const [deletePlace] = useDeletePlaceMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setEditing(null);
    setTitle("");
    setOrder(0);
    setImage(null);
    setPreview(null);
  };

  const openNew = () => {
    reset();
    setOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setTitle(p.title);
    setOrder(p.order);
    setImage(null);
    setPreview(imageUrl(p.image));
    setOpen(true);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && !image) return toast.error("Image required");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("order", String(order));
      if (image) fd.append("image", image);

      if (editing) {
        await updatePlace({ id: editing.id, formData: fd }).unwrap();
        toast.success("Place updated");
      } else {
        await createPlace(fd).unwrap();
        toast.success("Place created");
      }
      setOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this place?")) return;
    try {
      await deletePlace(id).unwrap();
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)]">
            Popular Places
          </h1>
          <p className="text-zinc-500 mt-2">
            Manage destinations shown on the homepage
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition"
        >
          <FaPlus size={14} /> Add Place
        </button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : places.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-16 text-center">
          <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaImage className="text-orange-500" size={26} />
          </div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            No places yet
          </h3>
          <p className="text-zinc-500 mt-1 mb-6">
            Add your first destination to show on the homepage
          </p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold"
          >
            <FaPlus size={12} /> Add Place
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {places.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={imageUrl(p.image)}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                  #{p.order}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                  {p.title}
                </h3>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <FaEdit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="inline-flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {editing ? "Edit Place" : "Add New Place"}
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="w-9 h-9 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Hawa Mahal"
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Lower number appears first
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Image {editing && "(leave blank to keep)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 dark:bg-zinc-950 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:text-sm file:font-medium"
                />
                <p className="text-xs text-green-600 dark:text-green-400 mt-1.5">
                  ✓ Auto-converted to WebP
                </p>
                {preview && (
                  <img
                    src={preview}
                    className="mt-3 w-full h-40 object-cover rounded-xl"
                    alt="preview"
                  />
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                >
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}