import fs from "fs";
import FOOD from "../models/food.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import customError from "../utils/errorHandler.js";


//Add food Item
const addFood = asyncHandler(async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;
        const food = await new FOOD({
            name,
            price,
            description,
            image,
            category
        });

        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        next(customError(400, "Failed to add food item", error));
    }

});




export {
    addFood
}