import { useEffect, useState } from "react";
import * as product from "../function/product.js";
import { Link } from "react-router-dom";
import { LuMousePointerClick } from "react-icons/lu";
import { ProductGridSkeleton } from "./Skeleton.jsx";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await product.getProductShow();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProductGridSkeleton count={6} />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <Link key={item.product_id} to={`/products/${item.product_id}`}>
          <div
            className="flex flex-col hover:border hover:border-[#DCDCDC] rounded-xl bg-white shadow-xl space-y-2 p-4 transition-transform duration-300 ease-in-out overflow-hidden hover:scale-110"
          >
            <div className="flex justify-center items-center">
              <img
                src={`${import.meta.env.VITE_API}/img_products/${
                  item.image_filename
                }.jpg`}
                alt={item.name}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex space-y-2 flex-col">
              <p className="text-xl font-semibold">{item.brand}</p>
              <p className="text-xl font-semibold">{item.name}</p>
              <p className="text-md font-semibold">{item.description}</p>

              <div className="flex flex-wrap items-center justify-between">
                <p className="text-md tracking-wide font-semibold">
                  {new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                  }).format(item.price)}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center rounded-lg bg-black gap-2 hover:text-black shadow-2xl hover:border transition-all ease-in duration-200 cursor-pointer font-medium hover:bg-white text-white p-2">
                    <span>View Detail</span>
                    <LuMousePointerClick className="text-xl" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeProduct;
