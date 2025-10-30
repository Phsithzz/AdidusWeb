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
//ใช้แสดงข้อมูลทั้งหมดของuser แต่ละคน
export const getOneUser = async(email)=>{
  const {rows} = await query(`
    SELECT * FROM users WHERE email=$1
    `,[email])
  return rows[0]
}
//user แก้ไขข้อมูลส่วนตัว
export const userEditInfo = async(originalEmail,userData)=>{
  const { name, lastname, email: newEmail } = userData;

  const {rows} = await query(
    `
    UPDATE users
     SET name=$1,lastname=$2,email=$3
    WHERE email=$4
    RETURNING*
    `,[name,lastname,newEmail,originalEmail]
  )
  return rows[0]

}

// อัปเดตรหัสผ่าน
export const updatePassword = async (email, currentPassword, newPassword) => {
  // ดึง password hash ปัจจุบัน
  const { rows } = await query(`SELECT passwordhash FROM users WHERE email=$1`, [email]);
  if (rows.length === 0) throw new Error("User not found");

  const isMatch = await bcrypt.compare(currentPassword, rows[0].passwordhash);
  if (!isMatch) throw new Error("รหัสผ่านปัจจุบันไม่ถูกต้อง");

  // hash password ใหม่
  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(newPassword, salt);

  // อัปเดตใน DB
  const { rows: updated } = await query(
    `UPDATE users SET passwordhash=$1 WHERE email=$2 RETURNING email`,
    [newHash, email]
  );
  return updated[0];
};
//C R U D

//Admin use

//create ใช้อันเดียวกับregister 

export const getAllUser = async()=>{
  const {rows} = await query(`
    SELECT user_id,name,lastname,email,role FROM users
    `)
    return rows
}

export const updateUser = async(userId,userData)=>{
  const { name, lastname,email,role} = userData
  const {rows} = await query(`
    UPDATE users SET name=$1,lastname=$2,email=$3,role=$4
    WHERE user_id=$5
    RETURNING*`,[name,lastname,email,role,userId])
  return rows[0]
}

export const removeUser = async(userId)=>{
  const {rowCount} = await query("DELETE FROM users WHERE user_id=$1",[userId])
  return rowCount >0
}


