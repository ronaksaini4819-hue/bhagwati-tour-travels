const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bhagwati-tour-travels.onrender.com/";

export const imageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  return path; // public folder images like /hero.jpg
};