
import { deleteVariant } from "../function/variant.js";

import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
const VariantTable = ({ handleOpen, searchTerm, tableData, setTableData ,error}) => {


  //search
  const filteredData = tableData.filter(
    (v) =>
      v.product_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      v.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.size && v.size.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.color && v.color.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      try {
        await deleteVariant(id);
        setTableData((prevData) =>
          prevData.filter((variant) => variant.variant_id !== id)
        );
      } catch (err) {
        console.log(err);
      }
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
                  รหัสคุณลักษณะสินค้า
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  รหัสสินค้า
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  จำนวนสต๊อก
                </th>
                <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                  ราคา
                </th>
                <th className="px-4 py-3 font-medium  text-gray-500 uppercase tracking-wider text-sm text-center">
                  ไซส์
                </th>
                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-smtext-center">
                  สี
                </th>

                <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-sm text-center">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {filteredData.map((variant) => (
                <tr
                  key={`${variant.product_id}-${variant.variant_id}`}
                  className="hover:bg-gray-50 "
                >
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                    {variant.variant_id}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                    {variant.product_id}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900 font-medium ">
                    {variant.stock_quantity}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700">
                    {variant.price}
                  </td>
                  <td className="px-4 py-4 text-centerwhitespace-nowrap text-sm text-gray-700 text-centert">
                    {variant.size}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {variant.color}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleOpen("edit", variant)}
                        className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2 text-sm"
                      >
                        <FiEdit size={14} /> แก้ไข
                      </button>
                      <button
                        onClick={()=>handleDelete(variant.variant_id)}
                        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2 text-sm"
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
    </>
  );
};

export default VariantTable;
