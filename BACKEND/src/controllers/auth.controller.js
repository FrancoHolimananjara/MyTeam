const bcrypt = require("bcrypt");
const crypto = require('crypto');
const User = require("../models/user.model");
const UserVerificationEmail = require("../models/userVerificationEmail.model");
const { createToken } = require("../utils/jwt.util");

const path = require('path');

const hashData = require("../utils/hashData");
const compareData = require("../utils/compareData");
const sendEmail = require("../utils/sendMail");
module.exports = {
  /* AUTHENTICATION */
  register: async (req, res) => {
    const { username, email, password } = req.body;

    // Valid credentials
    const newUser = await createUser({ username, email, password });
    const emailData = await sendEmailVerification(newUser);
    res.status(201).json({success:true,message:"Verification email sent !",data:emailData});
  },

  verify_email: async (req, res) => {
    try {
      const user = await VeriyAccount(req.params);
      if (user) {
        res.sendFile(path.join(__dirname, "../../public/views/verified.html"));
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  resendVerificationEmail: async (req, res) => {
    try {
      const { _id } = req.params;
      const email = req.body;

      if (!_id || !email) {
        throw new Error("Empty user details are not allowed.");
      } else {
        // delete existing records and resend
        await UserVerificationEmail.deleteMany({});
        const emailData = await sendEmailVerification({ _id, email });
        res.json({
          success: true,
          message: "Verification email resend successfully",
          data: emailData,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  login: async (req, res) => {
    try {
      const { identifier, password } = req.body;
      console.log(identifier,password);
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Username or email doesn't exist!" });
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
      throw new Error("User already exist with a provided data !");
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
    const uniqueString = crypto.randomUUID() + _id;
    const currentUrl = "http://localhost:3001/";

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Verify your email address to complete registration and login to your account.</p>
                <p>This link <b>expires in 30 minutes</b>.</p>
                <p>Press <a href=${
                  currentUrl + "api/auth/verify/" + _id + "/" + uniqueString
                }>here</a> to proceed.</p>
            `,
    };
    // Verify hash
    const hashedUniqueString = await hashData(uniqueString);
    const newVerification = new UserVerificationEmail({
      userId: _id,
      uniqueString: hashedUniqueString,
      expiresAt: Date.now() + 900000
    });
    // save the user verification record
    await newVerification.save();
    await sendEmail(mailOptions);
    return {
      userId: _id,
      email,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function VeriyAccount({ _id, uniqueString }) {
  try {
    const userVerificationEmailExist = await UserVerificationEmail.findOne({
      $and: [{ userId: _id }]
    });
    if (userVerificationEmailExist) {
      const match = await compareData(uniqueString, userVerificationEmailExist.uniqueString);
      if (match) {
        const userVerified = await User.findByIdAndUpdate(
          { _id },
          { isVerified: true },
          { new: false, upsert: true });
        await UserVerificationEmail.findOneAndDelete({ userId: _id });
        return userVerified;
      } else {
        throw new Error("Unknwon unique string!")
      }
    } else {
      throw new Error("Verification doesn't exist!")
    }
  } catch (error) {
    throw new Error(error);
  }
}