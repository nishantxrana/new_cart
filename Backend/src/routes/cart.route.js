import express from "express";
import {getCart,addToCart,removeFromCart,reduceItemQuantity} from '../controllers/cart.controller.js'

const cartRouter = express.Router();

cartRouter.get("/getAll", getCart);
cartRouter.post("/addItem", addToCart);
cartRouter.post("/removeItem", removeFromCart);
cartRouter.post("/reduceItemQuantity", reduceItemQuantity);

export default cartRouter;