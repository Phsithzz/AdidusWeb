import React, { useEffect, useState } from "react";

import { updateProduct } from "../function/product";

const EditProduct = ({ product, onCancel, onSave }) => {
  const [tempProductName, setTempProductName] = useState("");
  const [tempProductDescription, setTempProductDescription] = useState("");
  const [tempProductPrice, setTempProductPrice] = useState("");
  const [tempProductStock, setTempProductStock] = useState("");
  const [image, setImage] = useState(null);
  const [tempProductBrand, setTempProductBrand] = useState("");
  const [tempProductDetail, setTempProductDetail] = useState("");

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      setTempProductName(product.name);
      setTempProductDescription(product.description);
      setTempProductPrice(product.price);
      setTempProductStock(product.stock_quantity);

      setTempProductBrand(product.brand);
      setTempProductDetail(product.detail);
    }
  }, [product]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", tempProductName);
    formData.append("description", tempProductDescription);
    formData.append("price", tempProductPrice);
    formData.append("stock_quantity", tempProductStock);
    formData.append("brand", tempProductBrand);
    formData.append("detail", tempProductDetail);
    if (image) formData.append("image", image);

    try {
      const res = await updateProduct(product.product_id, formData);

      const updatedProduct = {
        ...product,
        name: tempProductName,
        description: tempProductDescription,
        price: tempProductPrice,
        stock_quantity: tempProductStock,
        brand: tempProductBrand,
        detail: tempProductDetail,
        image_filename:res.data.image_filename
      };

      onSave(updatedProduct); // ส่ง object ใหม่ไป
      onCancel();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการอัปเดตสินค้า");
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-center text-2xl font-semibold">
          แก้ไขรายละเอียดสินค้า{" "}
        </h1>
        <div className="flex justify-between gap-4">
          <form className="flex flex-col w-full">
            <div className="flex flex-col space-2">
              <label htmlFor="name">ชื่อสินค้า</label>
              <input
                type="text"
                value={tempProductName}
                onChange={(e)=>setTempProductName(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="name"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="cate">หมวดหมู่</label>
              <input
                type="text"
                value={tempProductDescription}
                onChange={(e)=>setTempProductDescription(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="cate"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="price">ราคา</label>
              <input
                type="number"
                value={tempProductPrice}
                onChange={(e)=>setTempProductPrice(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="price"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="stock">จำนวนสต๊อก</label>
              <input
                type="text"
                value={tempProductStock}
                onChange={(e)=>setTempProductStock(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="stock"
              />
            </div>

            <div className="flex flex-col space-2">
              <label htmlFor="brand">แบรนด์</label>
              <input
                type="text"
                value={tempProductBrand}
                onChange={(e)=>setTempProductBrand(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="brand"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="detail">รายละเอียดสินค้า</label>
              <input
                type="text"
                value={tempProductDetail}
                onChange={(e)=>setTempProductDetail(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="detail"
              />
            </div>
          </form>

          <div className="flex flex-col space-2">
            <label htmlFor="image">รูปภาพ</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="image"
            />
            <div className="flex justify-center mt-6">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-80 h-80 object-contain   "
                />
              ) : product.image_filename ? (
                <img
                  src={`${import.meta.env.VITE_API}/img_products/${
                    product.image_filename
                  }.jpg`}
                  alt={product.image_filename}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500">ยังไม่มีรูป</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            type="button"
            className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200 rounded-md  text-center bg-black font-semibold"
            type="button"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
