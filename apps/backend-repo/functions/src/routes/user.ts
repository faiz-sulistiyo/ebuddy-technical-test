import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user";
import {authMiddleware} from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/users", authMiddleware, createUser);
userRoutes.get("/users", authMiddleware, getUsers);
userRoutes.put("/users/:userId", authMiddleware, updateUser);
userRoutes.delete("/users/:userId", authMiddleware, deleteUser);

export default userRoutes;
