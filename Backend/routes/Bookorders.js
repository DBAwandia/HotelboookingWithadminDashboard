const express = require("express")
const router = express.Router()
const users = require("../models/User")
const bookorders = require("../models/BookOrder")
// const authToken = process.env.AUTH_TOKEN;
// const accountSid = process.env.ACCOUNT_SID;
// const client = require("twilio")(accountSid, authToken)


router.post("/:userId", async(req,res)=>{
    const userid = req.params.userId
    const days = req.body.days
    const dayone = req.body.dayone
    const amount = req.body.amount
    const daytwo = req.body.daytwo
    const name = req.body.name
    const roomname = req.body.roomname
    // const hotelname = req.body.hotelname
    const phonenumbers = req.body.phonenumbers




    const savedBooking = bookorders({ days: days, amount: amount,phonenumbers: phonenumbers,daytwo: daytwo,dayone: dayone,name: name, roomname: roomname})
    try{
        const savedBook = await savedBooking.save()
        
        try{
            await users.findByIdAndUpdate(userid,{$push :{orders: savedBook._id}})

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
        const getOrder = await bookorders.find().sort({_id: -1})
        res.status(200).json(getOrder)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/orderss/:id", async(req,res)=>{
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
//login phonenumber channel(sms/call)
// router.get("/logincode", (req,res)=>{
//     const {phonenumber, channels} =req.query

//     try{

//             client.verify.v2.services(process.env.SERVICE_ID).verifications.create(
//                 {
//                     to: phonenumber,
//                     channel: channels
//                 }
//             ).then((data=>{
//             if(data.status === "pending"){
//                 res.status(200).json({message: "verification sent", data})
//             }else{
//                 res.status(400).json({message: "wrong number"})
//             }
//             }))
        
//     }catch(err){
//         res.status(500).json(err)
//     }
// })
// //verify login phonenumber code
// router.post("/logincodeverify", (req,res)=>{
//     // const phonenumber =req.query.phonenumber
//     // const codes =req.query.codes
//     const {phonenumber, codes} =req.query

//     try{
      
//           client.verify.v2.services(process.env.SERVICE_ID).verificationChecks.create(
//                 {
//                     to: `+${phonenumber}`,
//                     code: codes
//                 }
//             ).then((data)=>{
//                 if(data.valid === "true"){
//                     res.status(200).json({message:"success", data} )
//                 }
//                 else{
//                     res.status(400).json({message:"wrong details", data})
//                 }
                
//             })
           
        
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

module.exports = router
