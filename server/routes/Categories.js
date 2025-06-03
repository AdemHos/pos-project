import Category from '../models/Category.js'
import express from 'express'


const router = express.Router();

// GET 
router.get("/get-all", async(req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
})

// POST / Create
router.post("/add-category", async(req,res) => {
    try {
        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(200).json("Item added successfull")
    } catch (error) {
        res.status(400).json(error)
    }
})

// PUT / Update
router.put("/update-category", async(req,res) => {
    try {
        await Category.findOneAndUpdate({_id:req.body.categoryId}, req.body)
        res.status(200).json("Item Updated Successfully")
    } catch (error) {
        console.log(error)
    }
})

// DELETE 

router.delete("/delete-category", async(req,res) => {
    try {
        await Category.findOneAndDelete({_id:req.body.categoryId})
        res.status(200).json("Item Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
})



export default router
 