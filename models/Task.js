const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  priority: { type: Number, min: 1, max: 5, required: true },
  status: { type: String, enum: ["pending", "finished"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
