import axios from "axios";

export const checkCart= async(email)=>{
    return await axios.post(`${import.meta.env.VITE_API}/cart/checkcart`,email)

}

export const addCart = async(cartData)=>{
    return await axios.post(`${import.meta.env.VITE_API}/cart/addcart`,cartData)
}