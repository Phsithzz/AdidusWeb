import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="bg-black md:bg-white text-white md:text-black rounded-lg w-full p-4 flex justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold text-center">All Category</h1>

        <div className="flex flex-col space-y-4 items-center gap-4">
          <Link
            to="/products/type/sneaker"
            className="text-xl font-semibold cursor-pointer hover:text-red-500 transition-colors"
          >
            Sneaker
          </Link>
          <Link
            to="/products/type/football"
            className="text-xl font-semibold cursor-pointer hover:text-red-500 transition-colors"
          >
            Football
          </Link>
          <Link
            to="/products/type/basketball"
            className="text-xl font-semibold cursor-pointer hover:text-red-500 transition-colors"
          >
            Basketball
          </Link>
          <Link
            to="/products/type/flipflops"
            className="text-xl font-semibold cursor-pointer hover:text-red-500 transition-colors"
          >
            Slide & Flip Flops
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
