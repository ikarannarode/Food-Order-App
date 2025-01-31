import mongoose from "mongoose";
import DB_NAME from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://karannarode999:Password@cluster0.rjsky.mongodb.net/${DB_NAME}`)
        console.log('DB connected successfully...');
    } catch (error) {
        console.log('Error: DB connection failed!!!');
    }
}


export default connectDB