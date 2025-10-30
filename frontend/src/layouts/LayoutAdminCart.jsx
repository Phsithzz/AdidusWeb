import NavbarAdmin from "../components/NavbarAdmin";
import CartTable from "../pages/CartTable";
import ConsoleAdmin from "../components/ConsoleAdmin";
import { useEffect, useState } from "react";
import ModalCartAdmin from "../components/ModalCartAdmin.jsx";
import * as cart from "../function/cart.js";
const LayoutAdminCart = () => {
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await cart.getAllCart();
      setTableData(res.data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, data = null) => {
    setSelectedData(data);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newData) => {
    if (modalMode === "add") {
      try {
        const res = await cart.createCart(newData);

        setTableData((prev) => [...prev, res.data]);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await cart.updateCart(selectedData.cart_id, newData);
        setTableData((prev) =>
          prev.map((item) =>
            item.cart_id === selectedData.cart_id ? res.data : item
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex ">
        <div className="w-[20%] bg-black">
          <ConsoleAdmin />
        </div>
        <div className="flex flex-col space-4 w-[80%]">
          <NavbarAdmin
            onOpen={() => handleOpen("add")}
            onSearch={setSearchTerm}
          />
          <CartTable
            tableData={tableData}
            setTableData={setTableData}
            error={error}
            handleOpen={handleOpen}
            searchTerm={searchTerm}
          />
          {isOpen && (
            <>
              <div className="fixed top-0 right-0 z-50 bg-black/50 flex justify-center items-center w-full h-full">
                <div className="bg-white rounded-2xl p-6 w-[500px]">
                  <ModalCartAdmin
                    onSubmit={handleSubmit}
                    onClose={() => setIsOpen(false)}
                    mode={modalMode}
                    selectedData={selectedData}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LayoutAdminCart;
