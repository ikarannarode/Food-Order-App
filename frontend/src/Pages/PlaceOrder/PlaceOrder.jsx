import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StroreContext"

const PlaceOrder = () => {
    const { getTotalCartAmmount } = useContext(StoreContext);
    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First Name" /><input placeholder="Last Name" type="text" />
                </div>
                <input type="email" placeholder="Email address" /><input type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input type="text" placeholder="City" /><input placeholder="State" type="text" />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Zip Code" /><input placeholder="Country" type="text" />
                </div>
                <input type="text" placeholder="Phone" />
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