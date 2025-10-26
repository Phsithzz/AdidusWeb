import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

import AddProductAdmin from "./AddProductAdmin";

const NavbarAdmin = ({ onSearch,setProducts }) => {
  const [isFocus, setFocus] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  
  const handleSearchChange = async (e) => {
    onSearch(e.target.value);
  };
  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <MdProductionQuantityLimits size={40} />
          <h1 className="text-2xl font-semibold">Product List</h1>
        </div>

        <div
          className={`flex items-center border-2  border-gray-200 rounded-full justify-between py-2 px-2 origin-right transition-all duration-300 ease-in-out ${
            isFocus ? "w-100 " : "w-40 sm:w-64"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            onFocus={() => setFocus(true)}
            className=" outline-none "
          />
          <IoMdSearch size={20} />
        </div>

        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-4 border bg-black px-4 py-2 hover:bg-white group hover:border rounded-md  text-center cursor-pointer transition ease-in duration-200"
        >
          <p className="text-lg font-semiboสd text-white group-hover:text-black ">
            เพิ่มสินค้า
          </p>
        </button>
        {showAddProduct && (
          <>
          <div className="w-full h-full fixed z-50 top-0 right-0 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[800px] rounded-2xl p-6">
            <AddProductAdmin 
            onCancel={()=>setShowAddProduct(false)}
            setProducts={setProducts}
            />

            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavbarAdmin;
