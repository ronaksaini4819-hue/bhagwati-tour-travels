const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Resolve SERVER ROOT reliably, no matter where this file lives
// (require.main.filename = the entry file `server/server.js`)
const SERVER_ROOT = path.dirname(require.main?.filename || process.cwd());
const uploadDir = path.join(SERVER_ROOT, "uploads");

console.log("[upload] Saving images to:", uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const convertToWebp = async (req, res, next) => {
  if (!req.file) return next();
  try {
    const filename = `img-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.webp`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(req.file.buffer)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log("[upload] Saved:", outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.url = `/uploads/${filename}`;
    next();
  } catch (err) {
    console.error("[upload] sharp error:", err);
    next(err);
  }
};

module.exports = { upload, convertToWebp, uploadDir };