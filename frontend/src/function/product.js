import axios from "axios"

//admin
export const getProductAdmin = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/products/admin`)
}

export const updateProduct = async(productId,productData)=>{
    return await axios.put(`${import.meta.env.VITE_API}/products/admin/${productId}`,productData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
}

export const  deleteProduct = async(productId)=>{
    return await axios.delete(`${import.meta.env.VITE_API}/products/${productId}`)
}
//admin
export const getProduct = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/products`)
}

export const createProduct = async()=>{
    return await axios.post(`${import.meta.env.VITE_API}/products`)
}
export const searchProduct = async(searchTerm)=>{
    return await axios.get(`${import.meta.env.VITE_API}/products/search?q=${searchTerm}`)
}

export const getProductShow = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/products/show`)
}

export const getProductBrand = async(brand)=>{
    return await axios.get(`${import.meta.env.VITE_API}/products/brand/${brand}`)
}

export const getProductType = async(description)=>{
    return await axios.get(`${import.meta.env.VITE_API}/products/type/${description}`)
}

export const getProductId = async(productId) =>{
    return await axios.get(`${import.meta.env.VITE_API}/products/${productId}`)
}
