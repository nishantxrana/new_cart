import Product from '../models/product.model.js';
import { v4 as uuidv4 } from 'uuid';

export const addProduct = async (req, res) => {
    try{
        const product = new Product({
            id: uuidv4(),
            ...req.body
        });
        const savedProduct = await product.save();
        if(!savedProduct){
            return res.status(400).json({
                success:0,
                message: 'Product not saved',
            });
        }
        res.status(201).json({
            success:1,
            message: 'Product added successfully',
            savedProduct,
        });

    }
    catch(error){
        res.status(500).json({
            success:0,
            message: error.message,
        });
    }
}


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        if(!products){
            return res.status(404).json({
                success:0,
                message: 'Products not found',
            });
        }
        res.status(200).json({
            success:1,
            products,
        });

    }
    catch(error){
        res.status(500).json({
            success:0,
            message: error.message,
        });
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findOne({id:req.body.id});
        if(!product){
            return res.status(404).json({
                success:0,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success:1,
            message: 'Product found',
            product,
        });
    }
    catch(error){
        res.status(500).json({
            success:0,
            message: error.message,
        });
    }
}