const Task = require("../models/task.model");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/user.model");
module.exports = {
  create: async (req, res) => {
    const _userId = req._userId;
    const task = await Task.create({ ...req.body, owner: _userId });
    if (task) {
      const updateUserTodos = await User.findOneAndUpdate(
        { _id: _userId },
        { $push: { todos: { _id: task._id, title: task.title } } },
        { upsert: true }
      );
      if (updateUserTodos) {
        return res.status(201).json({
          success: true,
          message: "Task has been added!",
          data: task,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error to add new task!" });
    }
  },
  findAll: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const tasks = await Task.find({ owner: _userId }).select("-owner");
      if (tasks.length > 0) {
        return res
          .status(200)
          .json({ success: true, message: "All my tasks!", data: tasks });
      } else {
        return res.status(404).json({
          success: false,
          message: "Empty task for the moment!",
          data: [],
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  find: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const _id = ObjectId(req.params._id);
      const task = await Task.findOne({ $and: [{ _id }, { owner: _userId }] });
      if (task) {
        return res
          .status(200)
          .json({ success: true, message: "Your task!", data: task });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  completed: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const _id = ObjectId(req.params._id);
      const task = await Task.findOneAndUpdate(
        { $and: [{ _id }, { owner: _userId }] },
        { completed: true },
        { new: false, upsert: true }
      );
      if (task) {
        return res
          .status(200)
          .json({ success: true, message: "Task Completed !", data: task });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  delete: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const _id = ObjectId(req.params._id);
      const { acknowledged, deletedCount } = await Task.deleteOne({
        $and: [{ _id }, { owner: _userId }],
      });
      if (acknowledged && deletedCount) {
        return res
          .status(200)
          .json({ success: true, message: "Task deleted !" });
      } else {
        return res.status(400).json({
          success: false,
          message: "Cannot delete this !Task not found",
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
};
