import NavbarAdmin from "../components/NavbarAdmin";
import ConsoleAdmin from "../components/ConsoleAdmin";
import ProductTable from "../pages/ProductTable";

//เหลือสร้างfunction backend เพิ่ม 
//เหลือหน้า frontend แก้ไขข้อมูลproduct เพิ่ม ลบ search 
const LayoutAdmin = () => {
  return (
    <>
    
      <div className="flex ">
        <div className="w-[20%] bg-black">
          <ConsoleAdmin />
        </div>
        <div className="flex flex-col space-4 w-[80%]">
          <NavbarAdmin />
          <ProductTable/>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
