import axios from "axios";

export const getOrder = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/order/admin`)

}

export const removeOrder = async(orderId)=>{
    return await axios.delete(`${import.meta.env.VITE_API}/order/admin/${orderId}`)
}