const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Task creation failed", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching task", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Task update failed", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Task deleted" });
};

exports.getDashboardStats = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    if (!tasks.length) {
      return res.json({
        totalTasks: 0,
        completedPercent: 0,
        pendingPercent: 0,
        timeLapsedByPriority: {},
        averageCompletionTime: 0,
      });
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "finished");
    const pendingTasks = tasks.filter((task) => task.status === "pending");

    const completedPercent = (completedTasks.length / totalTasks) * 100;
    const pendingPercent = (pendingTasks.length / totalTasks) * 100;

    let timeLapsedByPriority = {
      1: { timeLapsed: 0, timeLeft: 0 },
      2: { timeLapsed: 0, timeLeft: 0 },
      3: { timeLapsed: 0, timeLeft: 0 },
      4: { timeLapsed: 0, timeLeft: 0 },
      5: { timeLapsed: 0, timeLeft: 0 },
    };

    let totalCompletionTime = 0;

    tasks.forEach((task) => {
      const startTime = new Date(task.startTime);
      const endTime = new Date(task.endTime);
      const currentTime = new Date();

      if (task.status === "finished") {
        const totalTime = (endTime - startTime) / (1000 * 60 * 60); // in hours
        totalCompletionTime += totalTime;
        timeLapsedByPriority[task.priority].timeLapsed += totalTime;
      } else if (task.status === "pending") {
        const timeLapsed = (currentTime - startTime) / (1000 * 60 * 60); // in hours
        const timeLeft = Math.max(
          0,
          (endTime - currentTime) / (1000 * 60 * 60)
        ); // in hours
        timeLapsedByPriority[task.priority].timeLapsed += timeLapsed;
        timeLapsedByPriority[task.priority].timeLeft += timeLeft;
      }
    });

    const averageCompletionTime =
      completedTasks.length > 0
        ? totalCompletionTime / completedTasks.length
        : 0;

    res.json({
      totalTasks,
      completedPercent,
      pendingPercent,
      timeLapsedByPriority,
      averageCompletionTime,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to calculate stats", error: err.message });
  }
};
