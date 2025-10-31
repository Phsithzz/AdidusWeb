
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutHome from "./layouts/LayoutHome";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeProduct from "./components/HomeProduct";
import LayoutProduct from "./layouts/LayoutProduct";
import ProductCategory from "./components/ProductCategory";
import ProductBrand from "./components/ProductBrand";
import LayoutBrand from "./layouts/LayoutBrand";
import PageUser from "./pages/PageUser";
import LayoutCart from "./layouts/LayoutCart";
import LayoutProductDetail from "./layouts/LayoutProductDetail";
import LayoutPay from "./layouts/LayoutPay";
import LayoutAdminProduct from "./layouts/LayoutAdminProduct";
import LayoutAdminVariant from "./layouts/LayoutAdminVariant";
import LayoutAdminUser from "./layouts/LayoutAdminUser";
import LayoutAdminCart from "./layouts/LayoutAdminCart";
import LayoutAdminOrder from "./layouts/LayoutAdminOrder";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutHome />}>
            <Route index element={<HomeProduct />} />

            <Route
              path="products/type/sneaker"
              element={<ProductCategory category="Sneaker" />}
            />
            <Route
              path="products/type/football"
              element={<ProductCategory category="Football" />}
            />
            <Route
              path="products/type/basketball"
              element={<ProductCategory category="Basketball" />}
            />
            <Route
              path="products/type/flipflops"
              element={<ProductCategory category="FlipFlops" />}
            />

            <Route
              path="products/brand/adidas"
              element={<ProductBrand brand="Adidas" />}
            />
            <Route
              path="products/brand/nike"
              element={<ProductBrand brand="Nike" />}
            />
            <Route
              path="products/brand/puma"
              element={<ProductBrand brand="Puma" />}
            />
            <Route
              path="products/brand/newbalance"
              element={<ProductBrand brand="NewBalance" />}
            />
          </Route>

          {/* Admin  */}
          <Route path="admin/products" element={<LayoutAdminProduct />} />
          <Route path="admin/variant" element={<LayoutAdminVariant />} />
          <Route path="admin/users" element={<LayoutAdminUser />} />
          <Route path="admin/cart" element={<LayoutAdminCart />} />
          <Route path="admin/order" element={<LayoutAdminOrder />} />
          {/* Admin  */}

          <Route path="products" element={<LayoutProduct />} />
          <Route path="brands" element={<LayoutBrand />} />
          <Route path="products/:id" element={<LayoutProductDetail />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="user/info" element={<PageUser />} />
          <Route path="cart" element={<LayoutCart />} />
          <Route path="pay" element={<LayoutPay />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
