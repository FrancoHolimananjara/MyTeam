const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// Create nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify and testing the transport
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Ready for message , ${success}`);
  }
});

// Send message
const sendEmail = async (mailOptions) => {
  try {
    // Assign a default value if sender is undefined
    mailOptions.from = typeof (
      mailOptions.from !== "undefined" || mailOptions.from != null
    )
      ? mailOptions.from
      : "MyTeam <admin@myteam.com>";

    const emailsent = await transporter.sendMail(mailOptions);
    return emailsent;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
