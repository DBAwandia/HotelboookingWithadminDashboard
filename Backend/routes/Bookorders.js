const express = require("express")
const router = express.Router()
const users = require("../models/User")
const bookorders = require("../models/BookOrder")

router.post("/:userId", async(req,res)=>{
    const userid = req.params.userId
    const days = req.body.days
    const amount = req.body.amount
    const savedBooking = bookorders({ days: days, amount: amount})
    try{
        const savedBook = await savedBooking.save()
        try{
            await users.findByIdAndUpdate(userid,{$push :{orders: savedBook._id}}).sort({_id: 1})
        }catch(err){
            res.status(500).json(err)
        }
        res.status(200).json(savedBook)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/orders/:userId", async(req,res)=>{
    const userid = req.params.userId
    const days = req.body.days
    const amount = req.body.amount
    const savedBooking = bookorders({ days: days, amount: amount})
    try{
        const savedBook = await savedBooking.save()
        try{
            await users.findByIdAndUpdate(userid,{$pull :{orders: savedBook._id}})
        }catch(err){
            res.status(500).json(err)
        }
        res.status(200).json("deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/order/:orderId", async(req,res)=>{
    const oderID = req.params.orderId
    try{
        const getOrders = await bookorders.findById(oderID)
        res.status(200).json(getOrders)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/orders", async(req,res)=>{
    try{
        const getOrder = await bookorders.find()
        res.status(200).json(getOrder)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/orders/:id", async(req,res)=>{
    try{
        await bookorders.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/orderss", async(req,res)=>{
    try{
        const getOrder = await bookorders.find().sort({_id: -1}).limit(3)
        res.status(200).json(getOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//all amount
router.get("/getAmount", async(req,res)=>{
    try{
        const lists = await bookorders.find()
        const list = await Promise.all(lists.map((item)=>{
            return item.amount
        }))
     
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})

//income stats
router.get("/stats", async(req,res)=>{
    const date = new Date()
    const lastmonth = new Date(date.setMonth(date.getMonth()-1))
    const prevmonth = new Date(new Date().setMonth(lastmonth.getMonth()-1))

    try{
        const income = await bookorders.aggregate([
            {
                $match : {createdAt: {$gte : prevmonth}}
            },
            {
                $project: {month: {$month: "$createdAt"},
                           sales: "$amount"
                        }
            },
            {
                $group: {
                    _id: "$month",
                    total:{ $sum: "$sales"},
                },
            },
        ])
        res.status(201).json(income)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
