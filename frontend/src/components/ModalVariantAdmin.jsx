import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
const ModalVariantAdmin = ({

  onClose,
  mode,
  onSubmit,
  variantData,
}) => {
  const [productId, setProductId] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !stockQuantity || !price || !size || !color) {
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
    try {
      const variantData = {
        product_id: parseInt(productId),
        stock_quantity: parseInt(stockQuantity),
        price: Number(price),
        size: Number(size),
        color: color,
      };

      await onSubmit(variantData);

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && variantData) {
      setProductId(variantData.product_id);
      setStockQuantity(variantData.stock_quantity);
      setPrice(variantData.price);
      setSize(variantData.size);
      setColor(variantData.color);
    } else {
      setProductId("");
      setStockQuantity("");
      setPrice("");
      setSize("");
      setColor("");
    }
  }, [mode, variantData]);
  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-center text-2xl font-semibold">
          {" "}
          {mode === "add" ? "เพิ่มสินค้า" : "แก้ไขสินค้า"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4"
        >
          <div className="flex flex-col space-2">
            <label htmlFor="product_id">ไอดีสินค้า</label>
            <input
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="product_id"
            />
          </div>
          <div className="flex flex-col space-2">
            <label htmlFor="stock">จำนวนสต๊อก</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="stock"
            />
          </div>
          <div className="flex flex-col space-2">
            <label htmlFor="price">ราคา</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="price"
            />
          </div>
          <div className="flex flex-col space-2">
            <label htmlFor="stock">ไซส์</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="size"
            />
          </div>

          <div className="flex flex-col space-2">
            <label htmlFor="color">สี</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="color"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200 rounded-md  text-center bg-black font-semibold"
            >
              {mode === "add" ? "บันทึกข้อมูล" : "อัปเดตข้อมูล"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalVariantAdmin;
