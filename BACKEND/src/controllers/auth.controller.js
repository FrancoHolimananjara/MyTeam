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
    return res
      .status(201)
      .json({ success: true, message: "Verification email has been sent !", data: emailData });
  },

  verify_email: async (req, res) => {
    try {
      const user = await VerifyAccount(req.params);
      if (user) {
        res.sendFile(path.join(__dirname, "../../public/views/verified.html"));
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
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
      return res.status(500).json({ success: false, message: error });
    }
  },

  login: async (req, res) => {
    try {
      const { identifier, password } = req.body;
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
          return res
            .status(403)
            .json({ success: false, message: "Invalid credentials!" });
        } else {
          const token = createToken(user);
          return res.status(200).json({ token });
        }
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
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

    //html
    const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .paragraph {
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          background-color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          border-radius: 5px;
          border: 1px solid blue;
          transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
        }
        .button:hover {
          background-color: white;
          color: black;
          border: 1px solid black;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p class="paragraph">Before you can start, we kindly ask you to verify your email address by clicking on the following button:</p>
        <a class="button" href="${currentUrl + "api/auth/verify/" + _id + "/" + uniqueString}">Verify Email</a>
        <p class="paragraph">Once your email is verified, you will be ready to proceed with the registration process and you can login.</p>
        <p>This link <b>expires in 30 minutes</b>.</p>
        <p class="paragraph">Best regards,</p>
      </div>
    </body>
  </html>
`;

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html
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

async function VerifyAccount({ _id, uniqueString }) {
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