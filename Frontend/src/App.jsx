import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDisplay from "./components/ProductDisplay";
import CartItems from "./components/CartItems/CartItems";


const Home = () => <div>Home Page</div>;
const Shop = () => <div>Shop Page</div>;
const Blogs = () => <div>Blogs Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
