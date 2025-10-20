import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import * as product from "../function/product.js";
import ConfirmDelete from "../components/ConfirmDelete.jsx";
import EditProduct from "../components/EditProduct.jsx";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const [showEdit, setShowEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await product.getProductAdmin();
        setProducts(res.data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {error && <div className="text-red-500">error</div>}
      <div className="overflow-x-auto p-4">
        <table className="border border-gray-300 rounded-lg text-center w-full min-w-[1000px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">รหัสสินค้า</th>
              <th className="p-3 border">ชื่อสินค้า</th>
              <th className="p-3 border">หมวดหมู่</th>
              <th className="p-3 border">ราคา</th>
              <th className="p-3 border">จำนวนสต๊อก</th>
              <th className="p-3 border">รูปภาพ</th>
              <th className="p-3 border">แบรนด์</th>
              <th className="p-3 border">รายละเอียดสินค้า</th>
              <th className="p-3 border">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} className="hover:bg-gray-50">
                <td className="p-3 border">{product.product_id}</td>
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">{product.description}</td>
                <td className="p-3 border">{product.price}</td>
                <td className="p-3 border">{product.stock_quantity}</td>
                <td className="p-3 border">
                  <img
                    src={`${import.meta.env.VITE_API}/img_products/${
                      product.image_filename
                    }.jpg`}
                    alt={product.name}
                    className="w-20 h-20 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3 border">{product.brand}</td>
                {/* ต้องทำเป็นปุ่มแล้วกดเข้าไปดูเป็นpop up */}
                <td className="p-3 border">{product.detail}</td>
                <td className="p-3 border flex justify-center gap-2">
                  <button 
                  onClick={()=>{setSelectedProduct(product);setShowEdit(true)}}
                  className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1">
                    <FiEdit /> แก้ไข
                  </button>
                  <button
                    onClick={() => { setSelectedProduct(product); setConfirm(true)}}
                    className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <RiDeleteBinLine /> ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEdit &&(
            <>
            <div className="fixed top-0 right-0 flex justify-center items-center bg-black/50 w-full h-full z-50">
                <div className="bg-white rounded-2xl p-6 w-[800px]">
                    <EditProduct
                    product={selectedProduct}
                    onSave={((updateProduct)=>{
                        setProducts(prev=>prev.map(p=> p.product_id === updateProduct.product_id? updateProduct:p))
                    })}
                    onCancel={()=>setShowEdit(false)}
                    />
                </div>
            </div>
            </>
        )}
        {confirm && (
          <>
            <div className="fixed top-0 right-0 flex justify-center  items-center w-full h-full bg-black/30   z-50">
              <div className=" bg-white w-[500px]  rounded-2xl  p-6">
                <ConfirmDelete 
                product={selectedProduct}
                onDelete={(id) => setProducts(prev => prev.filter(p => p.product_id !== id))}
                onCancel={()=>setConfirm(false)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductTable;
