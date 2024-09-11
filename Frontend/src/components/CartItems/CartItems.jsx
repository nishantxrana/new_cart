import React, { useEffect, useState } from "react";
import remove_icon from "../../assets/cart_cross_icon.png";
import { useCart } from "../../context/cartContext.jsx";
import empty_cart from "../../assets/empty_cart.png";

function CartItems() {
  const {
    items,
    totalItemCount,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantity,
    totalCartValue,
  } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const [discountedTotal, setDiscountedTotal] = useState(0);
  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    SAVE30: 30,
  };

  const handleApplyCoupon = () => {
    if (coupons[couponCode]) {
      setDiscount(coupons[couponCode]);
      setInvalidCoupon(false);
    } else {
      setInvalidCoupon(true);
      setDiscount(0);
    }
  };
  useEffect(() => {
    setTotalValue(totalCartValue + totalCartValue * 0.1);
  }, [totalCartValue]);
  useEffect(() => {
    setDiscountedTotal(totalValue * (discount / 100));
  }, [discount, totalValue]);

  async function getCartItemsById() {
    try {
      const responses = await Promise.all(
        items.map((item) =>
          fetch("http://localhost:3005/api/products/getProductById", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: item.id }),
          }).then((response) => response.json())
        )
      );
      const dataArr = responses.map((response) => {
        let dataWithQuantity = {
          ...response.product,
          quantity: items.find((item) => item.id === response.product.id)
            .quantity,
        };
        return dataWithQuantity;
      });

      setCartItems(dataArr);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartItemsById();
  }, [items, totalCartValue, totalItemCount]);
  useEffect(() => {}, [cartItems]);
  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
        <div className="text-center">
          <div className="loader border-4 border-t-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
  if (items && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] bg-gray-50">
        <img
          src={empty_cart}
          alt="Empty Cart"
          className="mb-6 w-40 h-40 object-contain"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => window.location.replace("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <>
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
          {cartItems.map((product, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-6 items-center gap-6 py-4">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <p>{product.name}</p>
                  <p className="text-center">${product.salePrice.toFixed(2)}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => {
                        reduceItemQuantity(product.id);
                      }}
                      className="w-8 h-8 aspect-square flex items-center justify-center rounded-full bg-gray-200 text-lg font-medium"
                    >
                      -
                    </button>
                    <span className="w-10 text-center border border-gray-300 py-1">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => {
                        addItemToCart(product.id, product.salePrice);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-lg font-medium"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-center">
                    ${calculateTotalPrice(product.salePrice, product.quantity)}
                  </p>
                  <img
                    onClick={() => {
                      removeItemFromCart(product.id);
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

        <div className="flex flex-col-reverse md:flex-row mt-16 gap-16">
          {/* Total Section */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold">Cart Total</h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalCartValue.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (10%)</p>
                <p>+ ${(totalCartValue * 0.1).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping fee</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between">
                <p>Discount ({discount}%)</p>
                <p>- ${discountedTotal}</p>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <h3>Total</h3>
                <h3>
                  $
                  {(
                    totalCartValue +
                    totalCartValue * 0.1 -
                    discountedTotal
                  ).toFixed(2)}
                </h3>
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
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 p-4 bg-transparent outline-none"
              />
              <button
                onClick={handleApplyCoupon}
                className="p-4 bg-black text-white"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="mt-4 text-green-500">
                Coupon applied! You saved {discount}% on your total.
              </p>
            )}
            {invalidCoupon && (
              <p className="mt-4 text-red-500">Invalid coupon code.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItems;
