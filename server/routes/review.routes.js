const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getAllReviews,
  approveReview,
} = require("../controllers/review.controller");

router.post("/", createReview);
router.get("/", getReviews);
router.get("/all", getAllReviews);
router.patch("/:id/approve", approveReview);

module.exports = router;