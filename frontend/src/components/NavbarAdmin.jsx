import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";


const NavbarAdmin = ({ onOpen, onSearch, showAddButton = true  }) => {
  const [isFocus, setFocus] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <MdProductionQuantityLimits size={40} />
          <h1 className="text-2xl font-semibold">Table Data</h1>
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

         {showAddButton && (
    <button
      onClick={onOpen}
      className="flex items-center gap-4 border bg-black px-4 py-2 ..."
    >
      <p className="text-lg font-semibold text-white group-hover:text-black ">
        เพิ่มข้อมูล
      </p>
    </button>
  )}
      </div>
    </>
  );
};

export default NavbarAdmin;
