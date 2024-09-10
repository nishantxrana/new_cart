import React from "react";
import remove_icon from "../../assets/cart_cross_icon.png";
import { products as all_product, products } from "../../assets/testdata.js";

function CartItems() {
  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2); 
  };

  return (
    <div className="container mx-auto mt-10 mb-32 px-4 md:px-16 ">
      <div className="grid grid-cols-6 items-center gap-6 text-gray-600 text-lg font-medium border-b-2 py-4">
        <p>Product</p>
        <p>Title</p>
        <p className="text-center">Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Total</p>
        <p className="text-center">Remove</p>
      </div>
      <hr className="py-4" />
      
      <div className="itemContainer max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-20">

      {all_product.map((product, index) => {
        return (
          <div key={index}>
            <div className="grid grid-cols-6 items-center gap-6 py-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-16 h-16 object-cover"
              />
              <p>{product.title}</p>
              <p className="text-center">${product.salePrice}</p>
              <button className="border border-gray-300 ">
                {product.id}
              </button>
              <p className="text-center">${calculateTotalPrice(product.salePrice,product.id)}</p>
              <img
              
                onClick={() => {
                  console.log("remove from cart clicked");
                }}
                src={remove_icon}
                alt="Remove"
                className="w-4 cursor-pointer mx-auto"
              />
            </div>
            <hr className="my-4" />
          </div>
        );
      })}
      </div>

      <div className="flex flex-col md:flex-row mt-16 gap-16">
        {/* Total Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">Cart Total</h1>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${"Sub total"}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax(10%)</p>
              <p>+ ${"Tax"}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <h3>Total</h3>
              <h3>${"Total"}</h3>
            </div>
          </div>
          <button className="w-full py-3 bg-black text-white mt-6 uppercase">
            Proceed to Checkout
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1">
          <p className="text-lg">Have a Coupon Code? Enter it here</p>
          <div className="flex mt-4 bg-gray-200">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 p-4 bg-transparent outline-none"
            />
            <button className="p-4 bg-black text-white">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
