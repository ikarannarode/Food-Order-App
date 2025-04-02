import React, { useContext,useState,useEffect } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StroreContext"
import {useNavigate} from "react-router-dom"
import axios from "axios";

const PlaceOrder = () => {
    const navigate=useNavigate()
    const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onChangeHandler=(e)=>{
const {name,value}=e.target;
setData(data=>({...data,[name]:value}))

    }

    const placeOrder=async(e)=>{
e.preventDefault();
let orderItems=[];
food_list.map((item)=>{
    if(cartItems[item._id]>0){
let itemInfo=item;
itemInfo['quantity']=cartItems[item._id];
orderItems.push(itemInfo)
    }
})
let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
}
let response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
}
else{
    alert('Error!!!')
}
    }

    useEffect(()=>{
        if (!token) {
            navigate("/cart")
        }
        else if(getTotalCartAmount()===0){
            navigate("/cart")

        }
    },[token])
    return (
        <form className="place-order" onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required type="text" placeholder="First Name" name="firstName"value={data.firstName} onChange={onChangeHandler}/><input required placeholder="Last Name" name="lastName" type="text"value={data.lastName} onChange={onChangeHandler} />
                </div>
                <input required type="email" name="email" placeholder="Email address"value={data.email} onChange={onChangeHandler}/><input required type="text" name="street" placeholder="Street" value={data.street} onChange={onChangeHandler}/>
                <div className="multi-fields">
                    <input required type="text" placeholder="City" name="city" value={data.city} onChange={onChangeHandler}/><input required placeholder="State" type="text" name="state" value={data.state} onChange={onChangeHandler}/>
                </div>
                <div className="multi-fields">
                    <input required type="text" name="zipcode" placeholder="Zip Code" value={data.zipcode} onChange={onChangeHandler}/><input required placeholder="Country" type="text" name="country" value={data.country} onChange={onChangeHandler}/>
                </div>
                <input required type="text" name="phone" placeholder="Phone"value={data.phone} onChange={onChangeHandler}/>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type="submit">Proceed to Payment</button>

                </div>
            </div>
        </form>
    )
}

export default PlaceOrder