import axios from "axios";

export const  register = async(userData)=>{
    return await axios.post(`${import.meta.env.VITE_API}/user/register`,userData)
}

export const login = async(email)=>{
    return await axios.post(`${import.meta.env.VITE_API}/user/login`,email)
}

export const getUser = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/user/info`)
}

export const logoutUser = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/user/logout`)
}

export const uploadUser = async(formData)=>{
    return await axios.post(`${import.meta.env.VITE_API}/user/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
}

