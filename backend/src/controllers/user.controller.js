import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from 'validator';
import asyncHandler from "../utils/asyncHandler.js";
import { errorHandler } from "../utils/errorHandler.js";



const createToken=(id)=>{
   return jwt.sign({id},process.env.SECRET);
}

const addUser=asyncHandler(async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const isExisting=await User.findOne({email})
        if(isExisting){
            errorHandler(401,"User already exists")
            return;
        }
        if(!validator.isEmail(email)){
            errorHandler(401,"Invalid email")
            return;
        }
        if(password.length<8){
            errorHandler(401,"Password must be strong")
            return;
        }
        const hashedPassword=await bcryptjs.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        })
const token=createToken(newUser._id);
res.status(200).json({
    success:true,
    data:newUser,
    token
})
    } catch (error) {
        errorHandler(401,"Signup failed")
    }
})




const loginUser=asyncHandler(async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isUser=await User.findOne({email});
        if(!isUser){
        errorHandler(401,"User doesn't exists")
        return;
        }
        const isMatch=await bcryptjs.compare(password,isUser.password);
        if(!isMatch){
        errorHandler(401,"Invalid user credentials")
        return;
        }
        
    } catch (error) {
        errorHandler(401,"Login failed")
    }
})


export {
    loginUser,
    addUser
}