import axios from "axios";

export const createVariant = async(variantData)=>{
    return await axios.post(`${import.meta.env.VITE_API}/variant`,variantData)
}
export const getVariant = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/variant`)
}
export const updateVariant = async(variantId,variantData)=>{
    return await axios.put(`${import.meta.env.VITE_API}/variant/${variantId}`,variantData)
}
export const deleteVariant = async(variantId)=>{
    return await axios.delete(`${import.meta.env.VITE_API}/variant/${variantId}`)
}