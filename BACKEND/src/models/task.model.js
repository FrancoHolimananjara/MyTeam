const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
