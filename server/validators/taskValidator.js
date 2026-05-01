import { body } from "express-validator";

export const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required"),

  body("description")
    .notEmpty()
    .withMessage("Task description is required"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required"),

  // optional — admin may assign later
  body("assignedTo")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("project")
    .notEmpty()
    .withMessage("Project ID required"),
];