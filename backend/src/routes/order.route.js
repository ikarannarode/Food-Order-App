import express from "express";
import {placeOrder,verifyOrder,userOrders,listOrders,updateStatus} from "../controllers/order.controller.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/status",updateStatus);
orderRouter.get("/order/list",listOrders);



export default orderRouter;