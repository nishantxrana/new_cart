import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDisplay from "./components/ProductDisplay";
import CartItems from "./components/CartItems/CartItems";
import Category from "./components/Category";


const Men = () => <div>men section</div>;
const Women = () => <div>women section</div>;
const Kids = () => <div>kids</div>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/men" element={<Category category="men"/>} />
          <Route path="/women" element={<Category category="women"/>} />
          <Route path="/Kids" element={<Category category="kids"/>} />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
