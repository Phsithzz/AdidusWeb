import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { deleteProduct } from "../function/product.js";
import AdminProductDetail from "../components/AdminProductDetail.jsx";
const ProductTable = ({
  handleOpen,
  searchTerm,
  tableData,
  setTableData,
  error,
}) => {
  const [confirmProduct, setConfirmProduct] = useState(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [messageDetail, setMessageDetail] = useState(null);

  const filteredData = tableData.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setTableData((prevData) => prevData.filter((p) => p.product_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
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
              {filteredData.map((product) => (
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
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-700 text-centert">
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
                      onClick={() => {
                        setMessageDetail(product.detail);
                        setModalDetail(true);
                      }}
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
                          handleOpen("edit", product);
                        }}
                        className="bg-gray-800 cursor-pointer text-white px-3 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1.5 text-sm"
                      >
                        <FiEdit size={14} /> แก้ไข
                      </button>
                      <button
                        onClick={() => {
                          setConfirmProduct(product);
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
          {modalDetail && (
            <>
              <div
                onClick={() => setModalDetail(false)}
                className="fixed z-50 top-0 right-0 flex justify-center items-center w-full h-full bg-black/50"
              >
                <div
                  className="bg-white rounded-2xl p-6 w-[500px] cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AdminProductDetail
                    onCancel={() => setModalDetail(false)}
                    messageDetail={messageDetail}
                  />
                </div>
              </div>
            </>
          )}
          {confirmProduct && (
            <>
              <div
                onClick={() => setConfirmProduct(false)}
                className="fixed z-50 top-0 right-0 flex justify-center items-center bg-black/50 w-full h-full"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl p-6 w-[500px]
              "
                >
                  <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-2xl text-center font-semibold ">
                      ยืนยันการลบข้อมูล?
                    </h1>
                    <p className="text-center text-md font-semibold">
                      Product ID:{confirmProduct.product_id}{" "}
                      {confirmProduct.name}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setConfirmProduct(false)}
                        type="button"
                        className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
                      >
                        ยกเลิก
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(confirmProduct.product_id);
                          setConfirmProduct(null);
                        }}
                        className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200 rounded-md  text-center bg-black font-semibold"
                        type="button"
                      >
                        ลบข้อมูล
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTable;
