import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: "http://localhost:3000"},
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
    credentials: true
));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});