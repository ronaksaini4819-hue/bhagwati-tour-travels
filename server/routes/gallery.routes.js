const express = require("express");
const router = express.Router();
const {
  upload,
  convertToWebp,
} = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");
const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");

router.get("/", getGallery);
router.post("/", auth, upload.single("image"), convertToWebp, createGallery);
router.patch("/:id", auth, upload.single("image"), convertToWebp, updateGallery);
router.delete("/:id", auth, deleteGallery);

module.exports = router;