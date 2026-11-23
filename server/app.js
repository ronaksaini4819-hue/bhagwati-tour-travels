const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const allowedOrigins = [
  'http://localhost:3000', 
  'https://bhagwati-tour-travels.vercel.app' // Apna actual Vercel URL yahan daalo
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Serve uploads from SERVER ROOT (same logic as middleware)
const SERVER_ROOT = path.dirname(require.main?.filename || process.cwd());
const uploadDir = path.join(SERVER_ROOT, "uploads");

console.log("[static] Serving /uploads from:", uploadDir);

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    next();
  },
  express.static(uploadDir)
);

app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/api/places", require("./routes/place.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/settings", require("./routes/settings.routes"));

// Debug endpoint — hit this in browser to test
app.get("/api/debug/uploads", (req, res) => {
  const fs = require("fs");
  try {
    const files = fs.readdirSync(uploadDir);
    res.json({
      uploadDir,
      fileCount: files.length,
      files: files.slice(0, 20),
      firstFileUrl: files[0] ? `/uploads/${files[0]}` : null,
    });
  } catch (err) {
    res.json({ uploadDir, error: err.message });
  }
});



module.exports = app;