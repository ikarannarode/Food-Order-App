import fs from "fs";
import FOOD from "../models/food.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { errorHandler } from "../utils/errorHandler.js";


//Add food Item
const addFood = asyncHandler(async (req, res, next) => {
    try {
        const { name, price, description, category } = req.body;
        if ([name, price, description, category].some((item) => item.trim() === "")) {
            errorHandler(400, "All fields are required");
        }
        const image_filename = `${req.file.filename}`;
        const food = new FOOD({
            name,
            price,
            description,
            image: image_filename,
            category
        });

        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        errorHandler(400, "Failed to add food item", error);
    }
});




export {
    addFood
}