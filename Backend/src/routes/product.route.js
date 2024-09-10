import {addProduct,getAllProducts,getProductById} from '../controllers/product.cantroller.js';
import express from 'express';

const productRouter = express.Router();

productRouter.post('/addProduct',addProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getProductById',getProductById);

export default productRouter;