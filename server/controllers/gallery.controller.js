const prisma = require("../config/db");

exports.getGallery = async (req, res) => {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const item = await prisma.gallery.create({
      data: {
        title: req.body.title || null,
        image: req.file.url,
        order: req.body.order ? Number(req.body.order) : 0,
      },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.order !== undefined) data.order = Number(req.body.order);
    if (req.file) data.image = req.file.url;

    const item = await prisma.gallery.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    await prisma.gallery.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};