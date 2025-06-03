import Product from '../models/Product.js'
import express from 'express'
import mongoose from 'mongoose';

const router = express.Router();

// GET 
router.get("/get-all", async(req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
})

// POST / Create
router.post("/add-product", async(req,res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).json("Item added successfull")
    } catch (error) {
        res.status(400).json(error)
    }
})

// PUT / Update
router.put("/update-product", async(req,res) => {
    try {
        await Product.findOneAndUpdate({_id:req.body.productId}, req.body)
        res.status(200).json("Item Updated Successfully")
    } catch (error) {
        console.log(error)
    }
})

// DELETE 

router.delete("/delete-product", async(req,res) => {
    try {
        await Product.findOneAndDelete({_id:req.body.productId})
        res.status(200).json("Item Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
})



export default router
 