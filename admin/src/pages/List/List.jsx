import React,{useState,useEffect} from 'react'
import axios from "axios"
import {toast} from "react-toastify";
import "./List.css"
const List = ({url}) => {
  const [data,setData]=useState([]);
 async function fetchData(){
    const response=await axios.get(`${url}/api/v1/all`);
    if(response.data.success){
      setData(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
const removeFood=async(foodId)=>{
const response=await axios.post(`${url}/api/v1/remove`,{id:foodId})
await fetchData();
if(response.data.success){
  toast.success(response.data.message)
}
else{
  toast.error(response.error.message)
}
}

  useEffect(()=>{
    fetchData();
  },[])
  console.log(data);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          data&&data.map((item,index)=>
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt="product" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="cursor" onClick={()=>removeFood(item._id)}>X</p>           
          </div>
          )
        }
      </div>
    </div>
  )
}

export default List