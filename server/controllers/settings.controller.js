const prisma = require("../config/db");

exports.getSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSetting.findFirst();
    if (!settings) {
      settings = await prisma.siteSetting.create({ data: {} });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSetting.findFirst();

    const allowed = [
      "siteName",
      "tagline",
      "phone",
      "whatsapp",
      "email",
      "address",
      "about",
      "facebook",
      "instagram",
    ];

    const data = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    if (!settings) {
      settings = await prisma.siteSetting.create({ data });
    } else {
      settings = await prisma.siteSetting.update({
        where: { id: settings.id },
        data,
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};