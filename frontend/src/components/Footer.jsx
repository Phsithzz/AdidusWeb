import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
 <div className="relative group overflow-hidden text-white bg-gradient-to-t from-[#0A0A0A] via-[#141414] to-[#1F1F1F]">
   
      <span
        className="absolute top-0 left-[-75%] w-1/2 h-full 
        bg-gradient-to-r from-transparent via-white/20 to-transparent 
        skew-x-[-25deg] transition-all duration-[2000ms] ease-in-out 
        animate-shine"
      ></span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 border-t-2 border-white pt-10">

          <div className="flex flex-col items-start gap-4 md:pr-10">
            <img src={logo} alt="Logo" className="w-32 h-32" />
            <p className="text-lg font-semibold leading-relaxed">
              รวมรองเท้าแบรนด์ดังระดับโลกไว้ที่เดียว
              เพื่อคนที่รักในสไตล์และความสบายทุกก้าว
            </p>
          </div>

    
          <div className="md:ml-6">
            <h1 className="text-2xl font-bold mb-4">Shop</h1>
            <ul className="flex flex-col gap-3">
              <Link
                onClick={handleScroll}
                to="/"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Home
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/type/sneaker"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Sneaker
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/type/football"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Football
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/type/basketball"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Basketball
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/type/flipflops"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                FlipFlops
              </Link>
            </ul>
          </div>

  
          <div className="md:ml-6">
            <h1 className="text-2xl font-bold mb-4">Brands</h1>
            <ul className="flex flex-col gap-3">
              <Link
                onClick={handleScroll}
                to="/products/brand/adidas"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Adidas
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/brand/nike"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Nike
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/brand/puma"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                Puma
              </Link>
              <Link
                onClick={handleScroll}
                to="/products/brand/newbalance"
                className="cursor-pointer text-lg font-semibold hover:text-red-500 transition duration-200"
              >
                NewBalance
              </Link>
            </ul>
          </div>

          <div className="md:ml-6">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FiUser size={25} />
                <p className="text-lg font-semibold">phoosith.p@ku.th</p>
              </div>
              <div className="flex items-center gap-3">
                <FiUser size={25} />
                <p className="text-lg font-semibold">charatrit.n@ku.th</p>
              </div>
              <div className="flex items-center gap-3">
                <FiUser size={25} />
                <p className="text-lg font-semibold">thanawat.saenb@ku.th</p>
              </div>
              <div className="flex items-center gap-3">
                <FiUser size={25} />
                <p className="text-lg font-semibold">phoosith.p@ku.th</p>
              </div>
            </div>
          </div>
        </div>

  
        <div className="border-t border-gray-500 mt-10 pt-6 text-center text-sm text-gray-400">
         © 2025 Web Technology and Web Services Project
        </div>
      </div>
    </div>
  );
};

export default Footer;
