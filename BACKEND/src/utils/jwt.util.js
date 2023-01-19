const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
module.exports = {
  createToken: (user) => {
    const buffer = new Buffer(user.username);
    return jwt.sign(
      {
        _userId: user._id,
        username: buffer.toString("base64"),
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  },
};
