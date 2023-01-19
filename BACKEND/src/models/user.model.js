const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "random-user.png",
    },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    adminInGroup: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
