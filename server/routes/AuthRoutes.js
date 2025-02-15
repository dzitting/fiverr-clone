import { Router } from "express";
import { getUserInfo, signUp, login } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);

authRoutes.post("/get-user-info", verifyToken, getUserInfo);

export default authRoutes;