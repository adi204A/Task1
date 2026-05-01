import Task from "../models/Task.js";
import Project from "../models/Project.js";


// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,   // optional — admin can assign to a member
      project,
    } = req.body;

    // check project exists
    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      ...(assignedTo && { assignedTo }),  // only include if provided
      project,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user._id },
        { createdBy: req.user._id },
      ],
    })
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // only assigned user or admin
    if (
      task.assignedTo.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // only admin can update
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    // admin only
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    await task.deleteOne();
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "todo",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "in-progress",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};