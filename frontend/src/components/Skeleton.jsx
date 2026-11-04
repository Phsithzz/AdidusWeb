export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-md space-y-3 p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Text Skeletons */}
      <div className="flex flex-col space-y-2 pt-1">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
          <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="w-full bg-white animate-pulse">
      <div className="max-w-5xl mx-auto mt-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Image Placeholder */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[600px] h-[400px] md:h-[480px] bg-gray-200 rounded-xl flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            {/* Accordion Placeholders */}
            <div className="w-full max-w-[600px] space-y-3 mt-6">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* Right: Info Placeholder */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <div className="space-y-3">
              <div className="h-8 w-4/5 bg-gray-200 rounded"></div>
              <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-7 w-28 bg-gray-200 rounded"></div>
            </div>

            <div className="h-4 w-32 bg-gray-200 rounded"></div>

            {/* Size options placeholder */}
            <div className="space-y-3">
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>

            {/* Button placeholder */}
            <div className="h-12 w-full bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
