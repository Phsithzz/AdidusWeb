import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProduct } from "../function/product.js";
import { Link } from "react-router-dom";
import { LuMousePointerClick } from "react-icons/lu";

const SlideProduct = () => {
  const [showProduct, setShowProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getProduct();
        setShowProduct(RandomProduct(res.data));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const RandomProduct = (array) => {
    return array
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 md:px-8 mb-20">
      <h1 className="text-2xl font-bold text-left">สินค้าที่คุณอาจสนใจ</h1>
      <div className="mt-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col border border-gray-100 rounded-xl bg-white shadow-md p-4 space-y-3 animate-pulse"
              >
                <div className="w-full h-52 bg-gray-200 rounded-lg"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings} className="w-full px-14">
            {showProduct.map((show) => (
              <Link key={show.product_id} to={`/products/${show.product_id}`}>
                <div
                  className="flex flex-col border border-white hover:border-black transition-all ease-in space-y-2 p-4 cursor-pointer"
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={`${import.meta.env.VITE_API}/img_products/${
                        show.image_filename
                      }.jpg`}
                      alt={show.name}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-xl font-semibold">{show.brand}</p>
                    <p className="text-xl font-semibold">{show.name}</p>
                    <p className="text-md font-semibold">{show.description}</p>

                    <div className="flex flex-wrap items-center justify-between">
                      <p className="text-md tracking-wide font-semibold">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          minimumFractionDigits: 0,
                        }).format(show.price)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center text-xs rounded-lg bg-black gap-2 hover:text-black shadow-2xl hover:border transition-all ease-in duration-200 cursor-pointer font-medium hover:bg-white text-white p-2">
                          <span>View Detail</span>
                          <LuMousePointerClick className="text-xl" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default SlideProduct;
