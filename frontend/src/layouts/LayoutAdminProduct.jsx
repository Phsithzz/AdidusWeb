import NavbarAdmin from "../components/NavbarAdmin";
import ConsoleAdmin from "../components/ConsoleAdmin";
import ProductTable from "../pages/ProductTable";
import { useEffect, useState } from "react";
import { getProductAdmin } from "../function/product";
//เหลือสร้างfunction backend เพิ่ม 
//สร้างcomponent ที่เป็นตอนalert เวลากรอกอะไรไม่ครบ อาจจะเป็นแถบขึ้้นนบนซ้ายบนขวา ใช้library
const LayoutAdmin = () => {
  
  const [searchTerm,setSearchTerm] = useState("")
  const [products,setProducts] = useState([ ])

  useEffect(()=>{
    const loadData = async()=>{
      try {
          const res = await getProductAdmin()
       const data = res.data || res; 
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err)
        
      }
    }
    loadData()
  },[])
  return (
    <>
    
      <div className="flex ">
        <div className="w-[20%] bg-black">
          <ConsoleAdmin />
        </div>
        <div className="flex flex-col space-4 w-[80%]">
          <NavbarAdmin 
          onSearch={setSearchTerm} 
          setProducts={setProducts}
          />

          <ProductTable 
          searchTerm={searchTerm}
          products={products}
          setProducts={setProducts}
          />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
