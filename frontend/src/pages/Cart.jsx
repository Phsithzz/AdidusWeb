import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUser } from "../function/user.js";
import { Link, useNavigate } from "react-router-dom";
import * as cart from "../function/cart.js";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import {getProduct} from "../function/product.js"
import Slider from "react-slick";
import { LuMousePointerClick } from "react-icons/lu";

const Cart = () => {
  const [email, setEmail] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showProduct,setShowProduct]=useState([])
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getUser();

        if (!res.data.login) {
          navigate("/login");
        } else {
          setLogin(true);
          setEmail(res.data.email);
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    checkLogin();
  }, [navigate]);

  useEffect(() => {
    if (login && email) {
      const loadData = async () => {
        try {
          const res = await cart.getCart(email);
          setCarts(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [login, email]);

  const handleUpdateQuantity = async(cartId,newQuantity)=>{
    if(newQuantity<1){
      return
    }
   const originalCarts = [...carts]; 
    setCarts(prevCarts =>
      prevCarts.map(item =>
        item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await cart.updateCartQuantity(cartId,newQuantity)
    } catch (err) {
      console.log(err)
      setCarts(originalCarts); 
      alert("อัปเดตจำนวนไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  }
  const handleDelete = async (cartId) => {
    try {
      await cart.removeCart(cartId);
      setCarts((prevCarts) =>
        prevCarts.filter((item) => item.cart_id !== cartId)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const totalPrice = carts.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

   const RandomProduct = (array) => {
    return array
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  };

  useEffect(()=>{
    const loadDataShow =async()=>{
      try {
        const res = await getProduct()
        setShowProduct(RandomProduct(res.data));
        window.scrollTo(0, 0)
        
      } catch (err) {
        console.log(err)
        
      }

    }
    loadDataShow()
    
  },[])
   var settings = {
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
          slidesToShow: 2, // หน้าจอใหญ่แต่ไม่เต็ม
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // หน้าจอมือถือ
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-6 text-center text-gray-600">
          <p>Loading cart...</p>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="w-full bg-white">
        <div className="max-w-5xl mx-auto   p-10 mt-8">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col w-[70%] space-y-4">
              <h1 className="text-2xl font-semibold ">ตะกร้า</h1>
              {carts.length === 0 ? (
                <>
                  <p className="text-2xl font-semibold">ไม่มีสินค้าในตระกร้า</p>
                </>
              ) : (
                  carts.map((cart) => (
                  
                    <div className="flex gap-4 border-b-2 border-gray-300"key={cart.cart_id} >
                      <div className="flex flex-col space-y-4" >
                        <img
                          src={`${import.meta.env.VITE_API}/img_products/${
                            cart.image_filename 
                          }.jpg`}  className="w-24 h-24 object-cover"
                          alt={cart.name}
                        />

                        <div className="flex items-center mb-10 gap-4 border border-gray-300 px-2 rounded-full">
                          <button onClick={()=> handleUpdateQuantity(cart.cart_id,cart.quantity-1)}type="button" className="cursor-pointer">
                            <RiDeleteBinLine />
                          </button>
                          <p>{cart.quantity}</p>
                          <button type="button" onClick={()=>handleUpdateQuantity(cart.cart_id,cart.quantity+1)}className="cursor-pointer"><FaPlus /></button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col w-full space-y-4">
                        <div className="flex justify-between ">
                          <div className="flex flex-col space-y-2">
                          <p className="text-md font-semibold">{cart.name}</p>
                           <p className="font-semibold text-xs text-gray-400">ไซส์ {cart.size}</p>

                          </div>
                          <div className="flex flex-col space-y-2">
                          <p className="text-md tracking-wide font-semibold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(cart.price)}
                          </p>
                          <button type="button" onClick={()=>{handleDelete(cart.cart_id)}}className="px-2 py-2 bg-black text-white rounded-md cursor-pointer">ลบ</button>

                          </div>
                        </div>
                       
                      </div>
                    </div>
                  
                ))
              )}
            </div>
            <div className="flex flex-col w-[30%] space-y-4">
              <h1 className="text-2xl font-semibold ">สรุป</h1>
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between border-b-2 border-gray-300">
                      <p className="text-xs font-semibold  ">ยอดรวมย่อย</p>
                      <p className="text-xs tracking-wide mb-10 font-semibold">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          minimumFractionDigits: 0,
                        }).format(totalPrice)}
                      </p>
                    </div>
                    <div className="flex justify-between border-b-2 border-gray-300">
                      <p className="text-md font-semibold">ยอดรวม</p>
                      <p className="text-xs tracking-wide mb-10 font-semibold">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          minimumFractionDigits: 0,
                        }).format(totalPrice)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="font-semibold text-md text-white bg-black px-2 hover:bg-white hover:text-black border transition-all ease-in duration-200 py-2 rounded-full cursor-pointer"
                    >
                      ชำระ
                    </button>
                  </div>

            </div>
          </div>
        </div>
         <div className="max-w-7xl mx-auto mt-10 px-4 md:px-8 mb-20">
          <h1 className="text-2xl font-bold text-left">สินค้าที่คุณอาจสนใจ</h1>
          <div className="mt-4 ">
            <Slider {...settings} className="w-full  px-14">
              {showProduct.map((show) => (
                <div
                  className="flex flex-col   transition-all ease-in space-y-2 p-4 cursor-pointer"
                  key={show.product_id}
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
                        <Link to={`/products/${show.product_id}`}>
                          <button className="flex items-center text-xs rounded-lg bg-black gap-2 hover:text-black shadow-2xl hover:border transition-all ease-in duration-200 cursor-pointer font-medium hover:bg-white text-white p-2">
                            <span>View Detail</span>
                            <LuMousePointerClick className="text-xl" />
                          </button>
                        </Link>
                        {/* <button className="flex items-center text-xs rounded-lg bg-black gap-2 hover:text-black shadow-2xl hover:border transition-all ease-in duration-200 cursor-pointer font-medium hover:bg-white text-white p-2">
                          <BsCartPlus className="text-xl" />
                          <span>Add to Cart</span>
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
