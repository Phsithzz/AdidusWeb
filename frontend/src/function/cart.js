import axios from "axios";

export const checkCart= async(email)=>{
    return await axios.post(`${import.meta.env.VITE_API}/cart/checkcart`,email)

}

export const addCart = async(cartData)=>{
    return await axios.post(`${import.meta.env.VITE_API}/cart/addcart`,cartData)
}

export const getCart = async(customerEmail)=>{
    return await axios.get(`${import.meta.env.VITE_API}/cart/${customerEmail}`)
}

export const getCartOrder = async(customerEmail)=>{
return await axios.get(`${import.meta.env.VITE_API}/cart/order/${customerEmail}`)
}

export const updateCartQuantity = async(cartId,quantity)=>{
    return await axios.put(`${import.meta.env.VITE_API}/cart/${cartId}`,{ newQuantity: quantity })
}

export const removeCart = async(cartId)=>{
    return await axios.delete(`${import.meta.env.VITE_API}/cart/${cartId}`)
}

export const confirmCart = async(customerEmail,address,paymentMethod)=>{
    return await axios.put(`${import.meta.env.VITE_API}/cart/confirm/${customerEmail}`,{address,          // ส่ง address object
    payment_method: paymentMethod})
}