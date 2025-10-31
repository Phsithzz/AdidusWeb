import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
const ModalUserAdmin = ({ onClose, mode, onSubmit, selectedData }) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

 
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (name.trim() === "" || lastname.trim() === "" || email.trim() === "") {
 Swal.fire({
      icon: "warning",
      title: "ข้อมูลไม่ครบ!",
      text: "กรุณากรอกข้อมูลให้ครบทุกช่องก่อนดำเนินการ",
      confirmButtonText: "ตกลง",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "cursor-pointer bg-black text-white px-5 py-2 border rounded-md border-white hover:bg-white hover:border hover:text-black hover:border-black transition duration-200",
      },
    });
    return;
  }


  if (mode === "add" && password.trim() === "") {
   Swal.fire({
    icon: "warning",
    title: "ยังไม่ได้กรอกรหัสผ่าน!",
    text: "กรุณากรอกรหัสผ่านก่อนดำเนินการต่อ",
    confirmButtonText: "ตกลง",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "cursor-pointer bg-black text-white px-5 py-2 border rounded-md border-white hover:bg-white hover:border hover:text-black hover:border-black transition duration-200",
    },
  });
    return;
  }
    try {
  
      const userData =
        mode === "add"
          ? { name, lastname, email, password } 
          : { name, lastname, email, role }; 

      await onSubmit(userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && selectedData) {
      setName(selectedData.name);
      setLastName(selectedData.lastname);
      setEmail(selectedData.email);
      setRole(selectedData.role);
      setPassword(""); 
    } else {
      setName("");
      setLastName("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  }, [mode, selectedData]);

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center text-2xl font-semibold">
        {mode === "add" ? "เพิ่มผู้ใช้" : "แก้ไขผู้ใช้"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <div className="flex flex-col space-2">
          <label htmlFor="name">ชื่อ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="name"
          />
        </div>

        <div className="flex flex-col space-2">
          <label htmlFor="lastname">นามสกุล</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="lastname"
          />
        </div>

        <div className="flex flex-col space-2">
          <label htmlFor="email">อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="email"
          />
        </div>

    
        {mode === "edit" && (
          <div className="flex flex-col space-2">
            <label htmlFor="role">สถานะ </label>
            <select
              id="role"
              className="border rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- กำหนดสถานะ --</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
        )}

    
        {mode === "add" && (
          <div className="flex flex-col space-2">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="password"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600 transition ease-in duration-200 text-black rounded-md text-center bg-white font-semibold"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200 rounded-md text-center bg-black font-semibold"
          >
            {mode === "add" ? "บันทึกข้อมูล" : "อัปเดตข้อมูล"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalUserAdmin;
