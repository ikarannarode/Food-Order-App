import React, { useContext,useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StroreContext"

const PlaceOrder = () => {
    const { getTotalCartAmmount,token,food_list,cart_Items,url } = useContext(StoreContext);
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
    return (
        <form className="place-order" >
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First Name" name="firstName"value={data.firstName} onChange={onChangeHandler}/><input placeholder="Last Name" name="lastName" type="text"value={data.lastName} onChange={onChangeHandler} />
                </div>
                <input type="email" name="email" placeholder="Email address"value={data.email} onChange={onChangeHandler}/><input type="text" name="street" placeholder="Street" value={data.street} onChange={onChangeHandler}/>
                <div className="multi-fields">
                    <input type="text" placeholder="City" name="city" value={data.city} onChange={onChangeHandler}/><input placeholder="State" type="text" name="state" value={data.state} onChange={onChangeHandler}/>
                </div>
                <div className="multi-fields">
                    <input type="text" name="zipcode" placeholder="Zip Code" value={data.zipcode} onChange={onChangeHandler}/><input placeholder="Country" type="text" name="country" value={data.country} onChange={onChangeHandler}/>
                </div>
                <input type="text" name="phone" placeholder="Phone"value={data.phone} onChange={onChangeHandler}/>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmmount() === 0 ? 0 : getTotalCartAmmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate("/order")}>Proceed to Checkout</button>

                </div>
            </div>
        </form>
    )
}

export default PlaceOrder