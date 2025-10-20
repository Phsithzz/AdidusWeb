import { deleteProduct } from "../function/product";

const ConfirmDelete = ({ product,onCancel,onDelete }) => {
    const handleDelete = async()=>{
        try {
            await deleteProduct(product.product_id)
            onDelete(product.product_id)  
            onCancel()
        } catch (err) {
            console.log(err)
            alert("ลบสินค้าไม่สำเร็จ");
        }
    }
  return (
    <>
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="text-2xl text-center font-semibold ">
          ยืนยันการลบข้อมูล?
        </h1>
         <p className="text-center text-md font-semibold">{product.name}</p>
        <div className="flex gap-4">
          <button
          onClick={onCancel}
            type="button"
            className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
          >
            ยกเลิก
          </button>
          <button
          onClick={handleDelete}
            className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200 rounded-md  text-center bg-black font-semibold"
            type="button"
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
