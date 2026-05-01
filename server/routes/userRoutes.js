import express from "express";
import User from "../models/user.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// protected route — any logged-in user can see their profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


// admin only route
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);


// GET all members (admin only)
router.get(
  "/members",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const members = await User.find({ role: "member" }).select(
        "-password"
      );
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;