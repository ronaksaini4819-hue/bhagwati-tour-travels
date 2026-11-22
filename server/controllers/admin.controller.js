const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (
        email === "dharmendrasaini9799727454@gmail.com" &&
        password === "Amazon@0553"
    ) {

        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.json({
            token,
        });
    }

    return res.status(401).json({
        message: "Invalid Credentials",
    });

};