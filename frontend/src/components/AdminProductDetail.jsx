import React from "react";

const AdminProductDetail = ({ messageDetail, onCancel }) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl text-center font-semibold">รายละเอียดสินค้า</h1>
        <p className="text-xl font-medium">{messageDetail}</p>{" "}
        <button
          onClick={onCancel}
          type="button"
          className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
        >
          ยกเลิก
        </button>
      </div>
    </>
  );
};

export default AdminProductDetail;
