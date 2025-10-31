import { Link } from "react-router-dom";
import success from "../assets/success.png";
const SuccessPay = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center  space-y-4">
        <img src={success} alt={success} className="w-80 h-80" />
        <p className=" text-center text-2xl font-semibold ">
          คำสั่งซื้อของคุณได้รับการยืนยันแล้ว
        </p>
        <Link
          to="/cart"
          className="font-semibold text-md text-center w-full text-white bg-black px-2 hover:bg-white hover:text-black border transition-all ease-in duration-200 py-4 rounded-full cursor-pointer"
        >
          กลับไปหน้าการสั่งซื้อ
        </Link>
      </div>
    </>
  );
};

export default SuccessPay;
