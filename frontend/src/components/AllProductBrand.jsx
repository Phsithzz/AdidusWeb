import { useEffect, useState } from "react";
import * as productAPI from "../function/product.js";
import { Link } from "react-router-dom";
import { LuMousePointerClick } from "react-icons/lu";
import { ProductGridSkeleton } from "./Skeleton.jsx";

const AllProductBrand = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getProduct();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const brandOrder = ["Adidas", "Nike", "Puma", "Newbalance"];

  const productsByBrand = brandOrder.map((brand) => ({
    brand,
    items: products.filter((p) => p.brand === brand),
  }));

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-12 w-48 bg-gray-200 rounded-md animate-pulse ml-4"></div>
        <div className="mx-4">
          <ProductGridSkeleton count={6} />
        </div>
      </div>
    );
  }

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
                  className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r 
               from-transparent via-white/80 to-transparent 
               skew-x-[-25deg] transition-all duration-700 ease-in-out 
               group-hover:left-[125%]"
                ></span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
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
                    <div className="flex flex-col space-y-2">
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
          </div>
        ) : null
      )}
    </div>
  );
};

export default AllProductBrand;
