import express from "express";
import {loginUser,addUser} from "../controllers/user.controller.js"
const userRouter=express.Router();

userRouter.post("/register",addUser);
userRouter.post("/login",loginUser);


export default userRouter;
