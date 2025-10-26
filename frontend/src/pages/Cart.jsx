import React, { useEffect, useState } from "react";

import { getUser } from "../function/user.js";
import { Link, useNavigate } from "react-router-dom";
import * as cart from "../function/cart.js";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const Cart = () => {
  const [email, setEmail] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      return handleDelete(cartId);
    }
    const originalCarts = [...carts];
    setCarts((prevCarts) =>
      prevCarts.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await cart.updateCartQuantity(cartId, newQuantity);
    } catch (err) {
      console.log(err);
      setCarts(originalCarts);
      alert("อัปเดตจำนวนไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };
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

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto mt-6 text-center text-gray-600">
          <p>Loading cart...</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-5xl mx-auto   p-10 mt-8">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col w-[65%] space-y-4">
              <h1 className="text-2xl font-semibold ">ตะกร้า</h1>
              {carts.length === 0 ? (
                <>
                  <p className="text-2xl font-semibold">ไม่มีสินค้าในตระกร้า</p>
                </>
              ) : (
                carts.map((cart) => (
                  <div
                    className="flex gap-4 pb-10 border-b-2 border-gray-300"
                    key={cart.cart_id}
                  >
                    <div className="flex flex-col space-y-4">
                      <Link to={`/products/${cart.product_id}`}>
                        <img
                          src={`${import.meta.env.VITE_API}/img_products/${
                            cart.image_filename
                          }.jpg`}
                          className="w-30 h-30 object-contain"
                          alt={cart.name}
                        />
                      </Link>

                      <div className="flex items-center  gap-4 border border-gray-300 px-2 rounded-full">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              cart.cart_id,
                              cart.quantity - 1
                            )
                          }
                          type="button"
                          className="cursor-pointer"
                        >
                          <RiDeleteBinLine />
                        </button>
                        <p>{cart.quantity}</p>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(
                              cart.cart_id,
                              cart.quantity + 1
                            )
                          }
                          className="cursor-pointer"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <div className="flex justify-between ">
                        <div className="flex flex-col space-y-2">
                          <Link
                            to={`/products/${cart.product_id}`}
                            className="text-md font-semibold"
                          >
                            {cart.name}
                          </Link>
                          <p className="font-medium text-md text-black/50  ">
                            {cart.description}
                          </p>
                          <p className="font-medium text-md text-black/50  ">
                            ไซส์ {cart.size}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
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
                ))
              )}
            </div>
            <div className="flex flex-col w-[35%] space-y-8">
              <h1 className="text-2xl font-semibold ">สรุป</h1>
              <div className="flex flex-col space-y-4">
                <div className="border-b-2 pb-4 space-y-2 border-gray-300 ">
                  {carts.map((cart) => (
                    <>
                      <div className="flex justify-between" key={cart.cart_id}>
                        <p className="text-xs font-semibold  ">{cart.name}</p>
                        <div className="flex gap-2">
                          <p className="text-xs tracking-wide font-semibold">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            }).format(cart.price)}
                          </p>
                          <p className="text-xs font-semibold  ">
                            {cart.quantity} x
                          </p>
                        </div>
                      </div>
                    </>
                  ))}

      
                </div>

                <div className="flex justify-between border-b-2 border-gray-300">
                  <p className="text-md font-semibold">ยอดรวม</p>
                  <p className="text-md tracking-wide mb-4 font-semibold">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                      minimumFractionDigits: 0,
                    }).format(totalPrice)}
                  </p>
                </div>
                <Link
                  to="/pay"
                  type="button"
                  className="font-semibold text-md text-center text-white bg-black px-2 hover:bg-white hover:text-black border transition-all ease-in duration-200 py-2 rounded-full cursor-pointer"
                >
                  เช็คเอาท์
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
