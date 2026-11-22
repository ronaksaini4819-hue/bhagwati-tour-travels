const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settings.controller");

router.get("/", getSettings);
router.put("/", auth, updateSettings);

module.exports = router;