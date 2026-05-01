import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getDashboardStats,
} from "../controller/taskController.js";

import { taskValidation } from "../validators/taskValidator.js";

import validate from "../middleware/validationMiddleware.js";

const router = express.Router();


// create task (admin only)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
   taskValidation,
  validate,
  createTask
);


// get tasks
router.get("/", protect, getTasks);
// update task
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTask
);

// dashboard stats
router.get(
  "/dashboard/stats",
  protect,
  getDashboardStats
);

// update status
router.put("/:id/status", protect, updateTaskStatus);
// delete task
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTask
);

export default router;