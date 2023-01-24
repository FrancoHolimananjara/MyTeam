const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { createToken } = require("../utils/jwt.util");

const hashData = require("../utils/hashData");
module.exports = {
  /* AUTHENTICATION */
  register: async (req, res) => {
    const { username, email, password } = req.body;

    // Valid credentials
    const newUser = await createUser({ username, email, password });
    await sendEmailVerification(newUser);
    res.json(newUser);
  },
  verify_email: async (req, res) => {
    const emailToken = req.query.token;
    await User.findOneAndUpdate(
      { emailToken },
      {
        $set: {
          emailToken: null,
          isVerified: true,
        },
      },
      {
        upsert: true,
      }
    ).then((docs) => {
      if (docs) {
        return res
          .status(200)
          .json({ success: true, message: "Account verified !" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Email token incorrect !" });
      }
    });
  },
  login: async (req, res) => {
    try {
      const { identifier, password } = req.body;
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user) {
        throw new Error("Username or email doesn't exist!");
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
          throw new Error("Invalid password!");
        } else {
          const token = createToken(user);
          return res.status(200).json({ token });
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

async function createUser(userData) {
  try {
    const { username, email, password } = userData;

    // Check if user is already exist
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error("User already exist with a provided data!");
    } else {
      const hashPass = await hashData(password);

      // Create an user instance
      const newUser = new User({ username, email, password: hashPass });
      const createNewUser = await User.create(newUser);
      return createNewUser;
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function sendEmailVerification({ _id, email }) {
  try {
    const uniqueString = crypto.randomUUID();
    console.log(uniqueString);
  } catch (error) {
    throw new Error(error);
  }
}