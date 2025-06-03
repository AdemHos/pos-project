import User from '../models/User.js'
import express from 'express'

const router = express.Router()

// GET / All Users

router.get("/get-all", async(req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.send(400).json(error)
    }
})

// GET a User
router.get("/", async(req,res) => {
    const userId = req.body.userId
    try {
        const user = await User.findById(userId);
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error)
    }
})


export default router