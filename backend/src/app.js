import express from "express";
import cors from "cors";
import foodRoutes from "./routes/food.route.js";
import userRouter from "./routes/user.route.js"
const app = express();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1", foodRoutes);

app.use('/images',express.static('uploads'));
app.use("/api/user",userRouter)
export default app;
