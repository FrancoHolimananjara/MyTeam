const mongoose = require("mongoose");
const userInvitationEmailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userGuestId: [{
      type: String,
      required: true,
    }],
    uniqueString: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
    }
  },
  {
    collection: "userInvitationEmails",
    timestamps: true,
  }
);

const userInvitationEmail = mongoose.model("userInvitationEmails", userInvitationEmailSchema);
module.exports = userInvitationEmail;