import React, { useContext } from 'react';
import "./FoodDisplay.css"
import { StoreContext } from "../../context/StroreContext"

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className="food-display" id="food-display">
            <h1>Top dishes near you</h1>

        </div>
    )
}

export default FoodDisplay