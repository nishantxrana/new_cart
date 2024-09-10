import React from "react";

const ProductCard = ({ product, onAddToCartClick }) => {
  return (
    <div className="w-full bg-white shadow-md rounded overflow-hidden relative">
      <div className="w-full aspect-square relative">
        <img
          src={product.thumbnail}
          alt=""
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="font-semibold text-2xl">{product.title}</h1>
        <div className="flex items-center space-x-3">
          <p className="line-through italic text-gray-500">
            MRP: ${product.mrp}
          </p>
          <p className="font-semibold">Sale Price: ${product.salePrice}</p>
        </div>
      </div>

      <span className="absolute top-2 right-2 font-semibold bg-orange-600 p-2 rounded-md inline-block text-sm text-white shadow-md">
        {product.percentOff}% Off
      </span>

      <div className="flex p-2 space-x-2">
        <button
          onClick={onAddToCartClick}
          className="flex-1 border-2 border-gray-500 hover:border-black hover:text-white hover:bg-black p-2 rounded-md text-gray-800 ease-in transition-all"
        >
          Add to Cart
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;
