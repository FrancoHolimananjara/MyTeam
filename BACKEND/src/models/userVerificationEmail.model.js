const mongoose = require("mongoose");
const userVerificationEmailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
    }
  },
  {
    collection: "userVerificationsEmails",
    timestamps: true,
  }
);

const userVerificationEmail = mongoose.model("userVerificationsEmails", userVerificationEmailSchema);
module.exports = userVerificationEmail;
