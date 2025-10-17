import { query } from "../Config/database.js";

import bcrypt from "bcrypt";

//เอาไว้เช็คตอนLogin
export const checkEmail = async (email) => {
  const { rows } = await query("SELECT * FROM users WHERE email=$1", [email]);
  return rows[0] || null;
};

//เอาไว้บันทึกข้อมูลลงTable
export const register = async (userData) => {
  const { name, lastname, email, password } = userData;

  const salt = await bcrypt.genSalt(10);
  const pwdHash = await bcrypt.hash(password, salt);
  const { rows } = await query(
    "INSERT INTO users(name,lastname,email,passwordhash,role) VALUES($1,$2,$3,$4,'user') RETURNING *",
    [name, lastname, email, pwdHash]
  );

  return rows[0];
};

//C R U D

//Admin use

//create ใช้อันเดียวกับregister 

export const getAllUser = async()=>{
  const {rows} = await query(`
    SELECT * FROM users
    `)
    return rows
}

export const updateUser = async(userId,userData)=>{
  const { name, lastname,email,role,image_filename} = userData
  const {rows} = await query(`
    UPDATE users SET name=$1,lastname=$2,email=$3,role=$4,image_filename=$5
    WHERE user_id=$6
    RETURNING*`,[name,lastname,email,role,image_filename,userId])
  return rows[0]
}

export const removeUser = async(userId)=>{
  const {rowCount} = await query("DELETE FROM users WHERE user_id=$1",[userId])
  return rowCount >0
}


