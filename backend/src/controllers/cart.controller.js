import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const addToCart=asyncHandler(async(req,res)=>{
try {
    let userData=await User.findOne({_id:req.body.userId});
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    await User.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({
        success:true,
        message:"Added to cart"
    })
} catch (error) {
 console.log(error);   
 res.json({
    success:false,
    message:error
})
}
})


const removeFromCart=asyncHandler(async(req,res)=>{
try {
    let userData=await User.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
    }
    await User.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({
        success:true,
        message:"Removed from cart"
    })
} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:error
    })
}
})


const getCart=asyncHandler(async(req,res)=>{
try {
    let userData=await User.findById(req.body.userId);
    let cartData=await userData.cartData;
    res.json({
        success:true,
        cartData
    })

} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:error
    })
}
})

export {
    addToCart,
    removeFromCart,
    getCart
}