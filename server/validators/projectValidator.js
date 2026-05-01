import { body } from "express-validator";

export const projectValidation = [
  body("title")
    .notEmpty()
    .withMessage("Project title is required"),

  body("description")
    .notEmpty()
    .withMessage("Project description is required"),
];