import React, { useEffect, useState } from "react";

const ModalCartAdmin = ({ onClose, mode, onSubmit, selectedData }) => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !customerEmail ||
      !variantId ||
      !quantity ||
      !price ||
      (mode === "edit" && status === "")
    ) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      const cartData =
        mode === "add"
          ? {
              customer_email: customerEmail,
              variant_id: parseInt(variantId),
              quantity: parseInt(quantity),
              price: Number(price),
            }
          : {
              customer_email: customerEmail,
              variant_id: parseInt(variantId),
              quantity: parseInt(quantity),
              price: Number(price),
              status: Boolean(status),
            };

      await onSubmit(cartData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && selectedData) {
      setCustomerEmail(selectedData.customer_email);
      setVariantId(selectedData.variant_id);
      setQuantity(selectedData.quantity);
      setPrice(selectedData.price);
      setStatus(selectedData.status);
    } else {
      setCustomerEmail("");
      setVariantId("");
      setQuantity("");
      setPrice("");
      setStatus("");
    }
  }, [mode, selectedData]);
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center text-2xl font-semibold">
        {mode === "add" ? "เพิ่มตะกร้า" : "แก้ไขตะกร้า"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <div className="flex flex-col space-2">
          <label htmlFor="customerEmail">อีเมลลูกค้า</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="customerEmail"
          />
        </div>

        <div className="flex flex-col space-2">
          <label htmlFor="variantId">รหัสสินค้า</label>
          <input
            type="number"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="variantId"
          />
        </div>

        <div className="flex flex-col space-2">
          <label htmlFor="quantity">จำนวน</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 px-2 py-2 rounded-md"
            id="quantity"
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

        {mode === "edit" && (
          <div className="flex flex-col space-2">
            <label htmlFor="status">สถานะ </label>
            <select
              id="status"
              className="border rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
            >
              <option value="">-- กำหนดสถานะ --</option>
              <option value="true">ชำระแล้ว</option>
              <option value="false">รอชำระ</option>
            </select>
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

export default ModalCartAdmin;
