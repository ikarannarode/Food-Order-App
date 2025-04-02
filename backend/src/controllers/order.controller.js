import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";

const stripe = new Stripe('sk_test_51R9CPE2LROw9cqC1qxkXyte3z5Qj50wlzpVv7RXaZ00355p0pgcEDw0tITWpEvXXrAuQPsVNyDr5uqABmXVVnmY600NsWEVHrL');

const placeOrder = asyncHandler(async (req, res) => {
    const frontend_url = "http://localhost:5173";
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

export { placeOrder };
