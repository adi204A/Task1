import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utills/generateTokens.js";


// REGISTER (public — for admins signing themselves up)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REGISTER MEMBER (admin only — creates a member account)
export const registerMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ensure caller is admin (double-check even if middleware guards the route)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const member = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "member",   // always forced to member
    });

    res.status(201).json({
      message: "Member registered successfully",
      member: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};