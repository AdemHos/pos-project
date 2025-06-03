import Invoice from '../models/Invoice.js'
import express from 'express'
import mongoose from 'mongoose';

const router = express.Router();

// GET 
router.get("/get-all", async(req,res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices)
    } catch (error) {
        console.log(error)
    }
})

// POST / Create
router.post("/add-invoice", async(req,res) => {
    try {
        const newInvoice = new Invoice(req.body)
        await newInvoice.save()
        res.status(200).json("Item added successfull")
    } catch (error) {
        res.status(400).json(error)
    }
})

// PUT / Update
router.put("/update-invoice", async(req,res) => {
    try {
        await Invoice.findOneAndUpdate({_id:req.body.invoiceId}, req.body)
        res.status(200).json("Item Updated Successfully")
    } catch (error) {
        console.log(error)
    }
})

// DELETE 

router.delete("/delete-invoice", async(req,res) => {
    try {
        await Invoice.findOneAndDelete({_id:req.body.invoiceId})
        res.status(200).json("Item Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
})



export default router
 