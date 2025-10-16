import Navbar from "../components/Navbar"
import ProductDetail from "../pages/ProductDetail"
import SlideProduct from "../components/SlideProduct"
import { useState } from "react"
const LayoutProductDetail = () => {

  return (
    <>
    <div className="flex flex-col space-y-4">
        <Navbar/>
        <ProductDetail />
        <SlideProduct/>
    </div>
    </>
  )
}

export default LayoutProductDetail