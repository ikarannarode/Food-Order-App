import express from "express";
import cors from "cors";
const app = express();

//middlewares
app.use(express.json())
app.use(cors())


//routes
import foodRoutes from "./routes/food.route.js";
app.use("/api/v1", foodRoutes);

app.use(express.static('uploads'));

export default app;
