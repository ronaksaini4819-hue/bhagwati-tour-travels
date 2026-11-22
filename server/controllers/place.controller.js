const prisma = require("../config/db");

exports.getPlaces = async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPlace = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const { title, order } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const place = await prisma.place.create({
      data: {
        title,
        image: req.file.url,
        order: order ? Number(order) : 0,
      },
    });
    res.status(201).json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.order !== undefined) data.order = Number(req.body.order);
    if (req.file) data.image = req.file.url;

    const place = await prisma.place.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    await prisma.place.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};