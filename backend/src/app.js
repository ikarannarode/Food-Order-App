import express from "express";
import cors from "cors";
import foodRoutes from "./routes/food.route.js";
import userRouter from "./routes/user.route.js"
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"
const app = express();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1", foodRoutes);

app.use('/images',express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
export default app;
