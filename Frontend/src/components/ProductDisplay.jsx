import ProductCard from "./ProductCard.jsx";
import { products } from "../assets/testdata.js";
import { useEffect, useState } from "react";

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  // fetch req to get all products trying without useEffect

  useEffect(() => {
    async function getProducts() {
      try {
        await fetch("http://localhost:3005/api/products/getAllProducts")
        .then((response) => response.json())
        .then((dataArr) => dataArr.products)
        .then((data) => setProducts(data));
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);


  return (
    <>
    {products.length === 0 && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="loader border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 mb-4 animate-spin"></div>
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDisplay;
