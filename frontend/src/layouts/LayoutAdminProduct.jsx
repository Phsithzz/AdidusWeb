import NavbarAdmin from "../components/NavbarAdmin";
import ConsoleAdmin from "../components/ConsoleAdmin";
import ProductTable from "../pages/ProductTable";
import { useState } from "react";

//เหลือสร้างfunction backend เพิ่ม 
//เหลือหน้า frontend แก้ไขข้อมูลproduct เพิ่ม ลบ search 
//ให้เพื่อนไปเพิ่มชื่อไฟล์ในdddatabase ตรงชื่อรูปเพิ่ม.jpg
const LayoutAdmin = () => {
  const [searchTerm,setSearchTerm] = useState("")
  return (
    <>
    
      <div className="flex ">
        <div className="w-[20%] bg-black">
          <ConsoleAdmin />
        </div>
        <div className="flex flex-col space-4 w-[80%]">
          <NavbarAdmin onSearch={setSearchTerm}/>
          <ProductTable searchTerm={searchTerm}/>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
