import ProductCard from "./ProductCard.jsx";
import { products } from "../assets/testdata.js";

function ProductDisplay() {
  return (
    <>
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

