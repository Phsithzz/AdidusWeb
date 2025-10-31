import Navbar from "../components/Navbar";
import ProductDetail from "../pages/ProductDetail";
import SlideProduct from "../components/SlideProduct";
import Footer from "../components/Footer";
const LayoutProductDetail = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <Navbar />
        <ProductDetail />
        <SlideProduct />
        <Footer />
      </div>
    </>
  );
};

export default LayoutProductDetail;
