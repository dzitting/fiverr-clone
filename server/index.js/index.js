import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS with credentials
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

// Enable parsing of cookies
app.use(cookieParser());

// Set additional headers for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});