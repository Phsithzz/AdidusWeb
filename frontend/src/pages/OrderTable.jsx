import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { removeOrder } from "../function/order.js";
const OrderTable = ({tableData,setTableData,error,searchTerm}) => {
    const [confirmOrder,setConfirmOrder]  = useState(null)

    const filteredData = tableData.filter(
    (item) =>
        item?.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
)

    const handleDelete = async(id)=>{
        await removeOrder(id)
        setTableData((prev)=>prev.filter((item)=>item.order_id!==id))
    }
  return (
     <>
          {error && <div className="text-red-500">{error}</div>}
          <div className="overflow-x-auto p-4">
            <div className="shadow-sm overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full min-w-[1000px] border-collapse border border-gray-300]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                      รหัสออร์เดอร์
                    </th>
                    <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                      อีเมลลูกค้า
                    </th>
                    <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                        ราคารวม
                    </th>
                    <th className="px-4 py-3 font-medium text-center text-gray-500 uppercase tracking-wider text-sm">
                      สถานะ
                    </th>
                    <th className="px-4 py-3 font-medium  text-gray-500 uppercase tracking-wider text-sm text-center">
                      ช่องทางการชำระเงิน
                    </th>
    
               
                    <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-sm text-center">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {filteredData.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-50 ">
                      <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                        {order.order_id}
                      </td>
                      <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900 font-medium">
                        {order.customer_email}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 font-medium ">
                        {order.total_price}
                      </td>
               
                      <td className="px-4 py-4  whitespace-nowrap text-sm text-gray-700 text-center">
                        {order.status ? "ชำระแล้ว" : "รอชำระ"}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">
                        {order.payment_method}
                      </td>
    
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center items-center gap-2">
                    
                          <button
                            onClick={() => {
                              setConfirmOrder(order);
                            }}
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
              {confirmOrder && (
                <>
                  <div className="fixed top-0 right-0 flex justify-center items-center bg-black/50 w-full h-full">
                    <div className="bg-white rounded-2xl p-6 w-[500px]">
                      <div className="flex flex-col justify-center space-y-4">
                        <h1 className="text-2xl text-center font-semibold ">
                          ยืนยันการลบข้อมูล?
                        </h1>
                        <p className="text-center text-md font-semibold">
                          {confirmOrder.customer_email}{" "}
                          {confirmOrder.status ? "ชำระแล้ว" : "รอชำระ"}
                        </p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setConfirmOrder(false)}
                            type="button"
                            className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
                          >
                            ยกเลิก
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(confirmOrder.order_id);
                              setConfirmOrder(null);
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
  )
}

export default OrderTable