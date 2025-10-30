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

export const getOneUser = async(email)=>{
    return await axios.get(`${import.meta.env.VITE_API}/user/info/${email}`)
}

export const userEditInfo = async(email,userData)=>{
    return  await axios.put(`${import.meta.env.VITE_API}/user/info/${email}`,userData)
}

export const updatePassword = async(email,currentPassword,newPassword)=>{
    return await axios.put(`${import.meta.env.VITE_API}/user/password/${email}`,{currentPassword,newPassword})
}
//admin
export const getAllUser = async()=>{
    return await axios.get(`${import.meta.env.VITE_API}/user`)
}

export const updateUser = async(userId,userData)=>{
    return await axios.put(`${import.meta.env.VITE_API}/user/${userId}`,userData)
}

export const removeUser = async(userId)=>{
    return await axios.delete(`${import.meta.env.VITE_API}/user/${userId}`)
}
