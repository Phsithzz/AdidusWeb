import { useEffect, useState } from "react";
import * as productAPI from "../function/product.js";
import { Link } from "react-router-dom";
import { LuMousePointerClick } from "react-icons/lu";
import { BsCartPlus } from "react-icons/bs";

const AllProductBrand = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await productAPI.getProduct(); // ดึงสินค้าทั้งหมด
      setProducts(res.data);
    };
    loadData();
  }, []);

  // กำหนดลำดับแบรนด์
  const brandOrder = ["Adidas", "Nike", "Puma", "Newbalance"];

  // จัดกลุ่มสินค้าตามแบรนด์
  const productsByBrand = brandOrder.map((brand) => ({
    brand,
    items: products.filter((p) => p.brand === brand),
  }));

  return (
    <div className="p-6 space-y-12">
      {productsByBrand.map((group) =>
        group.items.length > 0 ? (
          <div key={group.brand}>
            <div className="p-4">
             <button
                  type="button"
     
                  className="cursor-pointer relative overflow-hidden font-semibold text-md text-white px-6 py-4 rounded-md
             border border-black bg-black transition-colors duration-500 group"
                >
                  <span className="relative z-10 text-3xl"> {group.brand}</span>
                  <span
                    className="absolute top-0 left-[-75%] w-1/2 h-full  bg-gradient-to-r 
               from-transparent via-white/80 to-transparent 
               skew-x-[-25deg] transition-all duration-700 ease-in-out 
               group-hover:left-[125%]"
                  ></span>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((product) => (
                <Link to={`/products/${product.product_id}`}>
                <div
                  key={product.product_id}
                  className="flex flex-col  hover:border hover:border-[#DCDCDC] rounded-xl bg-white   shadow-xl space-y-2 p-4 transition-transform duration-300 ease-in-out overflow-hidden
             hover:scale-110"
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={`${import.meta.env.VITE_API}/img_products/${
                        product.image_filename
                      }.jpg`}
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-xl font-semibold">{product.brand}</p>
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-md font-semibold">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between">
                      <p className="text-md tracking-wide font-semibold">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          minimumFractionDigits: 0,
                        }).format(product.price)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link to={`/products/${product.product_id}`}>
                          <button className="flex items-center rounded-lg bg-black gap-2 hover:text-black shadow-2xl hover:border transition-all ease-in duration-200 cursor-pointer font-medium hover:bg-white text-white p-2">
                            <span>View Detail</span>
                            <LuMousePointerClick className="text-xl" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
                
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default AllProductBrand;
