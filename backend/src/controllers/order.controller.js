import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";
import {config} from "dotenv"

config({path:"./.env"})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = asyncHandler(async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
    try {
        const { userId, items, amount, address } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order items" });
        }

        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
        });

        await User.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Fixed calculation
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100, // Fixed calculation
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            session_url: session.url, // Fixed variable name
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({
            success: false,
            message: "Error processing order",
        });
    }
});

const verifyOrder=asyncHandler(async (req,res)=>{
const {orderId,success}=req.body;
try {
    if(success==="true"){
        await Order.findByIdAndUpdate(orderId,{payment:true});
        res.json({
            success:true,
            message:"Paid"
        })
    }
    else{
        await findByIdAndDelete(orderId);
        res.json({success:false,
            message:"Not paid"
        })
    }
} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:"Error"
    })
}
})


//USER ORDERS FOR FRONTEND

const userOrders=asyncHandler(async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders=await Order.find({userId});
        res.json({
            success:true,
            data:orders,

        })
    } catch (error) {
      console.log(error);
      res.json({
        success:false,
        message:"Error"
      })  
    }
})

// LISTING ORDERS FOR ADMIN
const listOrders=asyncHandler(async(req,res)=>{
    try {
        const orders=await Order.find({});
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
})


const updateStatus=asyncHandler(async(req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({
            success:true,
            message:"Status updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
})

export { placeOrder,verifyOrder ,userOrders,listOrders,updateStatus};
