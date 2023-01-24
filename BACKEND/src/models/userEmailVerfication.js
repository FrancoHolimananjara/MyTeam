const mongoose = require("mongoose");
const userEmailVerificationSchema = new mongoose.Schema(
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
    collection: "userEmailVerifications",
    timestamps: true,
  }
);

const User = mongoose.model("userEmailVerifications", userEmailVerificationSchema);
module.exports = User;
