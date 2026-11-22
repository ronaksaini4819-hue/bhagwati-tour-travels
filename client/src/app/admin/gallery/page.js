"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaImages } from "react-icons/fa";
import {
  useGetGalleryQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} from "@/redux/api/galleryApi";
import { imageUrl } from "@/utils/imageUrl";

export default function AdminGalleryPage() {
  const { data: items = [], isLoading } = useGetGalleryQuery();
  const [createItem] = useCreateGalleryMutation();
  const [updateItem] = useUpdateGalleryMutation();
  const [deleteItem] = useDeleteGalleryMutation();

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

  const openEdit = (item) => {
    setEditing(item);
    setTitle(item.title || "");
    setOrder(item.order);
    setImage(null);
    setPreview(imageUrl(item.image));
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
        await updateItem({ id: editing.id, formData: fd }).unwrap();
        toast.success("Updated");
      } else {
        await createItem(fd).unwrap();
        toast.success("Image added");
      }
      setOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteItem(id).unwrap();
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
            Gallery
          </h1>
          <p className="text-zinc-500 mt-2">
            Manage photos shown on the gallery page
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition"
        >
          <FaPlus size={14} /> Add Image
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-16 text-center">
          <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaImages className="text-orange-500" size={26} />
          </div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            Gallery is empty
          </h3>
          <p className="text-zinc-500 mt-1 mb-6">
            Upload photos to show on the public gallery page
          </p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold"
          >
            <FaPlus size={12} /> Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((g) => (
            <div
              key={g.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={imageUrl(g.image)}
                  alt={g.title || "gallery"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition">
                <p className="text-white text-sm font-medium truncate mb-2 opacity-0 group-hover:opacity-100">
                  {g.title || `#${g.order}`}
                </p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(g)}
                    className="flex-1 bg-white/20 backdrop-blur hover:bg-white/30 text-white py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <FaEdit size={10} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs"
                  >
                    <FaTrash size={10} />
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
                {editing ? "Edit Image" : "Add Image"}
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
                  Title (optional)
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Amber Fort at sunset"
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
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
                  {saving ? "Saving..." : editing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-zinc-700 dark:text-zinc-300"
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