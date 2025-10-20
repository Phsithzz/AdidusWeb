import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

const NavbarAdmin = () => {
    const [isFocus,setFocus] = useState(false)
  return (
    <>
        <div className="flex flex-wrap justify-between items-center p-4">
            
            <div className="flex items-center gap-4">
                <MdProductionQuantityLimits size={40}  />
                <h1 className="text-2xl font-semibold">Product List</h1>
            </div>

            <div className={`flex items-center border-2  border-gray-200 rounded-full justify-between py-2 px-2 origin-right transition-all duration-300 ease-in-out ${
                    isFocus ? "w-100 " : "w-40 sm:w-64"
                  }`}>
                <input type="text" placeholder="Search"
                onFocus={()=>setFocus(true)}
                className=" outline-none " />
                <IoMdSearch size={20} />

            </div>

            <button className="flex items-center gap-4 bg-black px-4 py-2 hover:bg-white group hover:border rounded-md  text-center cursor-pointer transition ease-in duration-200">
                <p className="text-lg font-semiboสd text-white group-hover:text-black ">เพิ่มสินค้า</p>
            </button>

        </div>
    </>
  )
}

export default NavbarAdmin