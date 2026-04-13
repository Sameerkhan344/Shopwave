import express from "express";
import colors from "colors"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"

dotenv.config();
//Mongoose database connecttion
connectDB();


const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: [
    "http://localhost:5173", // local dev
    "https://shopwave-dun.vercel.app",
    "https://shopwave-ocqiyue52-sameerkhan344s-projects.vercel.app"
    ], // production frontend
     credentials: true }));
app.use(cookieParser());

// importing routes
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

// http://localhost:8080/
// http://localhost:8080/api/v1/users
app.use("/api/v1/users", userRoutes)

// http://localhost:8080/api/v1/categories
app.use("/api/v1/categories", categoriesRoutes)

// http://localhost:8080/api/v1/categories
app.use("/api/v1/products", productsRoutes)



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at PORT ${PORT}`.bgMagenta))