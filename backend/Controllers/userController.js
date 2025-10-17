//import
import * as userService from "../Services/userService.js";

import dotenv from "dotenv";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import multer from "multer"
//import

dotenv.config();

// upload part
// กำหนดตำแหน่งที่จะเก็บ file ที่ upload --> img_users
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"img_users")
  },
  filename:function(req,file,cb){
    const filename = `${req.body.email}.jpg`
    cb(null,filename)

  }
})
// จำกัดประเภทของไฟล์ที่อัปโหลด
const upload = multer({
    storage: storage,
}).single('file');

//ส่วน Upload File
export const uploadUser = async(req,res)=>{
  console.log("Upload User Image")
  upload(req,res,(err)=>{
    if(err) return res.status(400).json({message:err.message})
    res.status(200).json({message:"File uploaded successfully"})
  })
}

//ใช้ตอนลงทะเบียน
export const register = async (req, res) => {
  console.log("POST /user/register is request");
  try {
    const userData = req.body;
    if (
      !userData.email ||
      !userData.name ||
      !userData.lastname ||
      !userData.password
    ) {
      return res.status(400).json({
        message: "Name, lastname, email, and password are required.",
        regist: false,
      });
    }
    const checkuser = await userService.checkEmail(userData.email);
    if (checkuser) {
      return res.json({
        message: `Email ${userData.email} Alreaady exists.`,
        regist: false,
      });
    }

    const newuser = await userService.register(userData);
    res.status(201).json({
      message:"Success",
      users:newuser,
      regist: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error register",
      error: err.message,
      regist: false,
    });
  }
};

//ใช้เช็คตอนlogin
export const login = async (req, res) => {
  console.log("POST /login is requested");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Error email and password is required",
        login: false,
      });
    }

    const checkuser = await userService.checkEmail(email);

    if (!checkuser) {
      return res.status(404).json({ message: "User Not Found", login: false });
    }

    const isMatch = await bcrypt.compare(password, checkuser.passwordhash);
    if (isMatch) {
      const theuser = {
        name:checkuser.name,
        lastname:checkuser.lastname,
        email:checkuser.email,
        role:checkuser.role

        
      };
      const secret_key = process.env.SECRET_KEY;
      const token = jwt.sign(theuser, secret_key, { expiresIn: "1h" });
      res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({
        message: "Login Success",
        login: true,
        user:theuser
      });
    } else {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(401).json({
        message: "Password Invalid",
        login: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error login",
      error: err.message,
      login: false,
    });
  }
};

//เอาไว้ใช้ตอนuserดูข้อมูลของตนเอง และ เอาไว้เช็คtoken เพื่อดูว่าuser loginรึยัง
export const getUser = async (req, res) => {
  console.log("GET /user/info is requested.");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "No User ", login: false });
    }

    const secret_key = process.env.SECRET_KEY;
    const user = jwt.verify(token, secret_key);
    console.log(user);
    return res.json({
      name:user.name,
      lastname:user.lastname,
      email: user.email,
      role:user.role,
      login: true,  
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error getUser",
      login:false,
      error: err.message,
    });
  }
};

//เอาไว้ใช้ลบcookie เมื่อuser กด ออกจากระบบ
export const logoutUser = async(req,res)=>{
  console.log("GET /user/logout is request")
  try {
    res.clearCookie("token",{
      httpOnly:true,
      secure:true,
      sameSite:'strict'
    })

    res.json({
      message:"Login Fail",login:false
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error logoutUser",
      error:err.message
    })
    
  }
}

//C R U D

//Admin use

export const getAllUser = async(req,res)=>{
  console.log("GET /user is request")
  try {
    const user = await userService.getAllUser()
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).message({
      message:"Server error getAllUser",
      error:err.message
    })
    
  }
}

export const updateUser = async(req,res)=>{
  console.log("PUT /user/:userId is request")
  try {
    const {userId} = req.params
    const userData = req.body
    const updateUser = await userService.updateUser(userId,userData)
    if(!updateUser){
      return res.status(400).json({
        message: "User not Found",
      });
    }
    res.status(200).json(updateUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error updateUser",
      error:err.message
    })
    
  }
}

export const removeUser  = async(req,res)=>{
  console.log("DELETE /user/:userId is request")
  try {
    const {userId} = req.params
    const deleted = await userService.removeUser(userId)

    if(!deleted){
      return res.status(400).json({message:"User Not Found"})
    }

    res.status(200).send("DELETED")
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message:"Server error removeUser",
      error:err.message
    })
    
  }
}