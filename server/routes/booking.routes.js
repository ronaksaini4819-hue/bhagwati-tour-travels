const express = require("express");

const router = express.Router();

const {

createBooking,

updateBooking,

deleteBooking,

getBookings

} = require("../controllers/booking.controller");

router.post("/", createBooking);

router.get("/", getBookings);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);

module.exports = router;