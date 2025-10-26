import React from "react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import ConfirmDelete from "../components/ConfirmDelete.jsx";
import EditProduct from "../components/EditProduct.jsx";

const ProductTable = ({ searchTerm, products, setProducts }) => {
  const [showEdit, setShowEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const displayProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (!product) {
          return false;
        }

        const term = searchTerm.toLowerCase();

        const nameMatch =
          product.name && product.name.toLowerCase().includes(term);
        const descMatch =
          product.description &&
          product.description.toLowerCase().includes(term);
        const brandMatch =
          product.brand && product.brand.toLowerCase().includes(term);
        const categoryMatch =
          product.category_name &&
          product.category_name.toLowerCase().includes(term);

        return nameMatch || descMatch || brandMatch || categoryMatch;
      })
    : [];

  const handleSaveProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === updatedProduct.product_id ? updatedProduct : p
      )
    );
    setShowEdit(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.product_id !== id));
    setConfirm(false);
  };

  return (
    <>
      <div className="overflow-x-auto p-4">
        <div className="shadow-sm overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full min-w-[1000px] border-collapse border border-gray-300]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  รหัสสินค้า
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  การแสดงผล
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  ชื่อสินค้า
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  หมวดหมู่
                </th>
                <th className="px-4 py-3 font-medium  text-gray-500 uppercase tracking-wider text-sm text-center">
                  ราคา
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-smtext-center">
                  จำนวนสต๊อก
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-smtext-center">
                  ชื่อรูปภาพ
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-sm text-center">
                  รูปภาพ
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  แบรนด์
                </th>
                <th className="px-4 py-3 font-medium  text-gray-500 uppercase tracking-wider text-sm text-center">
                  รายละเอียด
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-sm text-center">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {displayProducts.map((product) => (
                <tr key={product.product_id} className="hover:bg-gray-50 ">
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                    {product.product_id}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                    {product.category_name}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 font-medium ">
                    {product.name}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700">
                    {product.description}
                  </td>
                  <td className="px-4 py-4 text-centerwhitespace-nowrap text-sm text-gray-700 text-centert">
                    {product.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {product.stock_quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {product.image_filename}
                  </td>
                  <td className="px-4 flex flex-col  gap-2 py-4 whitespace-nowrap text-center">
                    <img
                      src={`${import.meta.env.VITE_API}/img_products/${
                        product.image_filename
                      }.jpg`}
                      alt={product.image_filename}
                      className="w-16 h-16 object-cover mx-auto rounded" // ปรับขนาดรูปเล็กน้อย
                    />
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                    {product.brand}
                  </td>
                  {/* ทำให้เป็นปุ่มตามคอมเมนต์ */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() => alert(product.detail)} // เปลี่ยน alert เป็น modal ของคุณ
                      className="text-blue-600 hover:text-blue-800 text-xs py-1 px-2 rounded border border-blue-200 hover:bg-blue-50"
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                  {/* แก้ไขโครงสร้าง HTML ที่ผิด และจัดปุ่มให้อยู่ตรงกลาง */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEdit(true);
                        }}
                        className="bg-gray-800 cursor-pointer text-white px-3 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1.5 text-sm"
                      >
                        <FiEdit size={14} /> แก้ไข
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setConfirm(true);
                        }}
                        className="bg-red-500 cursor-pointer text-white px-3 py-1.5 rounded-md hover:bg-red-600 flex items-center gap-1.5 text-sm"
                      >
                        <RiDeleteBinLine size={14} /> ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals (ส่วนนี้ดีอยู่แล้ว) */}
      {showEdit && (
        <>
          <div className="fixed top-0 right-0 flex justify-center items-center bg-black/50 w-full h-full z-50">
            <div className="bg-white rounded-2xl p-6 w-[800px]">
              <EditProduct
                product={selectedProduct}
                onSave={handleSaveProduct}
                onCancel={() => setShowEdit(false)}
              />
            </div>
          </div>
        </>
      )}
      {confirm && (
        <>
          <div className="fixed top-0 right-0 flex justify-center  items-center w-full h-full bg-black/50  z-50">
            <div className=" bg-white w-[500px]  rounded-2xl  p-6">
              <ConfirmDelete
                product={selectedProduct}
                onDelete={handleDeleteProduct}
                onCancel={() => setConfirm(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductTable;
