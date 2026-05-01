import express from "express";

import {
  registerUser,
  loginUser,
  registerMember,
} from "../controller/authcontroller.js";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import validate from "../middleware/validationMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

// Admin-only: register a new member
router.post(
  "/admin/register-member",
  protect,
  authorizeRoles("admin"),
  registerMember
);

export default router;