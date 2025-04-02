import React,{useState,useEffect} from 'react'
import "./Orders.css"
import {toast} from "react-toastify";
import axios from "axios";
import {assets} from "../../assets/assets.js"
const Orders = ({url}) => {
  const [orders,setOrders]=useState([])
const fetchAllOrders=async ()=>{
const response=await axios.get(`${url}/api/order/order/list`);
if(response.data.success){
  setOrders(response.data.data)
}
else{
toast.error("Error")
}
}
useEffect(()=>{
  fetchAllOrders();
},[])
const statusHandler=async(e,orderId)=>{
const response =await axios.post(`${url}/api/order/status`,{
  orderId,
  status:e.target.value
})
console.log(response);
if(response){
  await fetchAllOrders();
}
}
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div className="order-item"key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+"X"+item.quantity
                    }
                    else{
                      return item.name+"X"+item.quantity+","
                    }

                  })
                }
              
              </p>
              <p className="order-item.name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Proccessing">Food Proccessing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders