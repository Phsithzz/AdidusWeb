import Cart from "../pages/Cart";
import Navbar from "../components/Navbar";
import SlideProduct from "../components/SlideProduct";
import Footer from "../components/Footer";
const LayoutCart = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <Navbar />
        <Cart />
        <SlideProduct />
        <Footer />
      </div>
    </>
  );
};

export default LayoutCart;
