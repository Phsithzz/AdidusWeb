import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";

import { getCart } from "../function/cart";
import { getUser } from "../function/user";
import SuccessPay from "../components/SuccessPay";
const Pay = () => {
  const [email, setEmail] = useState(null);
  const [carts, setCarts] = useState([]);

  const [activeTab,setActiveTab] = useState("address")

  const [showSuccess,setShowSuccess] = useState(false)

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const res = await getUser();
        setEmail(res.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    checkEmail();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getCart(email);
        setCarts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, [email]);

  const totalPrice = carts.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto p-10 mt-8">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col gap-4 w-[60%] space-y-4 shadow-sm rounded-lg  border border-gray-200">

            <div className="flex border-b-4 border-gray-300 w-full ">
              <button
                className={`flex-1 p-4 text-lg font-semibold text-center cursor-pointer rounded-t-lg
                  ${activeTab === "address" ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                onClick={() => setActiveTab("address")}
              >
                ที่อยู่การจัดส่ง
              </button>

              <button
                className={`flex-1 p-4 text-lg font-semibold text-center rounded-t-lg cursor-pointer
                  ${activeTab === "payment" ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                onClick={() => setActiveTab("payment")}
              >
                ช่องทางการชำระเงิน
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === "address" && (
                <div className="flex flex-col space-y-4">
                  <h1 className="text-xl font-semibold">กรอกที่อยู่การจัดส่ง</h1>
                  {/* ใส่ฟอร์มกรอกที่อยู่ที่นี่ */}
                </div>
              )}

              {activeTab === "payment" && (
                <div className="flex flex-col space-y-4">
                  <h1 className="text-xl font-semibold">เลือกช่องทางการชำระเงิน</h1>
                  {/* ใส่ฟอร์มหรือปุ่มช่องทางชำระเงินที่นี่ */}
                </div>
              )}
            </div>



      
            </div>

            <div className="flex flex-col w-[40%] space-y-4 shadow-sm rounded-lg p-6 border border-gray-200 ">
              <div className="flex items-center gap-2">
                <FaBoxOpen size={40} />
                <h1 className="text-xl font-semibold ">คำสั่งซื้อของคุณ</h1>
              </div>

            <div className="flex flex-col space-y-4">

                {carts.map((cart) => (
                  <>
                  <div className="flex flex-col space-y-4" key={cart.cart_id}>

                    <div className="flex gap-2 border-b-2 pb-4 border-gray-200 ">
                      <img
                        src={`${import.meta.env.VITE_API}/img_products/${
                          cart.image_filename
                        }.jpg`}
                        className="w-20 h-20 object-contain"
                        alt={cart.name}
                      />
                      <div className="flex space-y-4 flex-col w-full">
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{cart.name}</p>
                          <p className="text-sm font-semibold text-gray-400">
                            {cart.size}
                          </p>
                        </div>

                        <div className="flex  justify-between">
                          <p  className="text-md font-semibold">X {cart.quantity}</p>
                          <p className="text-md tracking-wide font-semibold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(cart.price)}
                          </p>
                        </div>

                      </div>
                    </div>
                   
                  </div>

                 
                  </>
                ))}
                 <div className="flex flex-col space-y-2 border-b-2 border-gray-200 pb-4">
                      <div className="flex justify-between">
                      <p className="text-md font-medium">ค่าจัดส่ง</p>
                      <p className="text-md font-semibold">ฟรี</p>

                      </div>
                      <div className="flex justify-between">
                      <p className="text-md font-medium">ยอดรวมย่อย</p>
                       <p className="text-md tracking-wide font-semibold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(totalPrice)}
                          </p>

                      </div>

                    </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold ">ยอดรวม</p>
                     <p className="text-md tracking-wide font-semibold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(totalPrice)}
                          </p>
                  </div>
                   <button
                  onClick={()=>setShowSuccess(true)}
                  type="button"
                  className="font-semibold text-md text-center text-white bg-black px-2 hover:bg-white hover:text-black border transition-all ease-in duration-200 py-4 rounded-full cursor-pointer"
                >
                  ยืนยันคำสั่งซื้อ
                </button>
            </div>
        
            </div>
          </div>
        </div>
        {showSuccess &&(
          <>
          <div className="fixed top-0 right-0 z-50 flex items-center justify-center bg-black/50 w-full h-full">
          <div className="bg-white w-[600px] rounded-2xl p-6">
            <SuccessPay onCancel={()=>setShowSuccess(false)}/>
          </div>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pay;
