const express = require("express");
const router = express.Router();
const {
  upload,
  convertToWebp,
} = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");
const {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/place.controller");

router.get("/", getPlaces);
router.post("/", auth, upload.single("image"), convertToWebp, createPlace);
router.patch("/:id", auth, upload.single("image"), convertToWebp, updatePlace);
router.delete("/:id", auth, deletePlace);

module.exports = router;