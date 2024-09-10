import {addProduct,getAllProducts,getProductById} from '../controllers/product.cantroller.js';
import express from 'express';

const productRouter = express.Router();

productRouter.post('/addProduct',addProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.post('/getProductById',getProductById);

export default productRouter;