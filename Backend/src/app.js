import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Route redirects
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

export default app;
