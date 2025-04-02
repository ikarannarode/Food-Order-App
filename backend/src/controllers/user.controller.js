import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator';
import asyncHandler from "../utils/asyncHandler.js";



const createToken=(id)=>{
   return jwt.sign({id},process.env.SECRET);
}

const addUser = asyncHandler(async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const isExisting = await User.findOne({ email });
        if (isExisting) {
            return res.status(409).json({ success: false, message: "User already exists" }); // 409 Conflict
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(newUser._id);

        res.status(201).json({
            success: true,
            data: newUser,
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Signup failed", error: error.message });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(isUser._id);

        res.status(200).json({
            success: true,
            data: isUser,
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
});


export {
    loginUser,
    addUser
}