// Router: taskRoutes.js
const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require("../controllers/taskController");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/stats", getDashboardStats);

module.exports = router;
