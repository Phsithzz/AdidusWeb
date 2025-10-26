import { useState } from "react";

import { createProduct } from "../function/product";

const AddProductAdmin = ({ onCancel,setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile); // ตรวจสอบว่าได้ไฟล์หรือไม่
    if (!selectedFile) return; // ถ้าไม่มีไฟล์ ให้ return
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSave = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !brand ||
      !detail ||
      !imageName ||
      !category ||
      !file
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("stock_quantity", Number(stock));
    formData.append("brand", brand);
    formData.append("detail", detail);
    formData.append("image_filename", imageName);
    formData.append("category_name", category);
    formData.append("image", file);

    try {
      const newProduct = await createProduct(formData);
      setProducts(prev => (Array.isArray(prev) ? [...prev, newProduct] : [newProduct]));
      alert("เพิ่มสินค้าเรียบร้อยแล้ว");
      onCancel();
    } catch (err) {
      console.log(err);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-center text-2xl font-semibold">เพิ่มสินค้า</h1>
        <div className="flex justify-between gap-4">
          <form className="flex flex-col w-full">
            <div className="flex flex-col space-2">
              <label htmlFor="name">ชื่อสินค้า</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="name"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="description">หมวดหมู่</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="description"
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
              <label htmlFor="stock">จำนวนสต๊อก</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="stock"
              />
            </div>

            <div className="flex flex-col space-2">
              <label htmlFor="brand">แบรนด์</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="brand"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="detail">รายละเอียดสินค้า</label>
              <input
                type="text"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md"
                id="detail"
              />
            </div>
            <div className="flex flex-col space-2">
              <label htmlFor="cate">ประเภทการแสดงผล</label>
         
              <select
                    id="cate"
                    className="border rounded px-3 py-2"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                  >
                    <option value="">-- เลือกประเภทการแสดงผล --</option>
                    <option>shoe</option>
                    <option>show</option>
                  </select>
            </div>
          </form>

          <div className="flex flex-col space-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="imageName">ชื่อไฟล์รูปภาพ </label>
              <input
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                id="imageName"
                className="border border-gray-300 px-2 py-2 rounded-md"
              />
            </div>

            <label htmlFor="image">รูปภาพ</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 px-2 py-2 rounded-md"
              id="image"
            />
            <div className="flex justify-center mt-6">
     
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-80 h-80 object-cover rounded-full"
                />
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

export default AddProductAdmin;
