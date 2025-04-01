import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./database/index.js"

config({ path: "./.env" });

const PORT = process.env.PORT || 6000;


// DB connection
// 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})

