const express = require("express")
const router =express.Router()
const users = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const bookorders = require("../models/BookOrder")
const stripe = require("stripe")(process.env.STRIPE_KEY)
// const { verifyUserAndAuthorization,verifyIsAdmin } = require("../verification/verifyTokens")
// const { verifyTokenAndAuthorization,verifyIsAdmin } = require("../models/verification")

// register
router.post("/registers", async(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const img = req.body.img
    const orders = req.body.orders
    const phonenumber = req.body.phonenumber
    const password =CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    const user = users({ username: username, email: email,orders: orders, password: password,phonenumber:phonenumber,img:img})
    try{
        const oldUser = await users.findOne({email: req.body.email})

        if(oldUser){
            res.status(400).json({message: "check your datils"})
        }else{
           await user.save()
            res.status(200).json( user)
        }
    }catch(err){
        res.status(500).json(err)
    }

})
//login
router.post("/login", async(req,res)=>{
    try{
        const user = await users.findOne({email: req.body.email})
        !user && res.status(400).json({message: "Please register"})
        

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const originalPass = hashedPassword.toString(CryptoJS.enc.Utf8)
        originalPass !== req.body.password && res.status(400).json({message: "Error login"})
        

        const { password,isAdmin, ...others} =user._doc
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_TOKEN,{expiresIn: "3d"})

        res.cookie("access_token",token,{httpOnly: true}).status(200).json({details: {...others},isAdmin})

    }catch(err){
        res.status(500).json(err)
    }
})
//update
router.put("/updates/:id", async(req,res)=>{
    try{
        const updatedUser = await users.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(201).json(updatedUser)

    }catch(err){
        res.status(500).json(err)
    }
})
//delete
router.delete("/users/:id", async (req,res)=>{
    try{
        await users.findByIdAndDelete(req.params.id)
        res.status(201).json("Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/countByEmails", async(req,res)=>{
    // const emails = req.query.emails.split(",")

    try{

        const list=  await users.countDocuments({})
       res.status(200).json(list)

    }catch(err){
        res.status(500).json(err)
    }
})
// router.post("/order/:userid", async(req,res)=>{
//     const orders = req.body.orders
//     const savedOrder = users({orders: orders})
//     try{
//         const Order = await savedOrder.save()
//         res.status(200).json(Order)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })
// router.post("/order/:orderid", async(req,res)=>{
//     const orderId = await Promise.all(orders.map((order)=>{
//         return ors
//     }))
//     const savedOrder = users({orders: orders})
//     try{
//         const Order = await savedOrder.save()
//         res.status(200).json(Order)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })
// //count all users
// router.get("/countByEmail", async(req,res)=>{
//     const emails = req.query.emails.split(",")

//     try{

//        const list=  await Promise.all(emails.map((email)=>{
//         return users.countDocuments({email: email})
//        }))
//        res.status(200).json(list)

//     }catch(err){
//         res.status(500).json(err)
//     }
// })
router.get("/countAll", async(req,res)=>{

    try{
        const purityCount = await users.countDocuments({username:"purity"})
        res.status(200).json({username: "purity", count: purityCount})

    }catch(err){
        res.status(500).json(err)
    }
})
//get all users
router.get("/users", async(req,res)=>{
    try{
        const getall= await users.find().limit(2).sort({_id:-1})
        res.status(200).json(getall)
    }catch(err){
        res.status(500).json(err + "err")
    }
})
router.get("/all/:id", async(req,res)=>{
    try{
        const getUserById = await users.findById(req.params.id)
        res.status(200).json(getUserById)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/orderlist/:id", async(req,res)=>{
    const ORDER = await users.findById(req.params.id)
    try{
        const getall= await Promise.all(ORDER.orders.map(item=>{
            return bookorders.findById(item)
            
        }))
        res.status(200).json(getall)
    }catch(err){
        res.status(500).json(err )
    }
})
//stats for last two months
router.get("/monthstats", async(req,res)=>{
    const date = new Date()
    const lastmonth = new Date(date.setMonth(date.getMonth() -1))
    const prevmonth = new Date(date.setMonth(lastmonth.getMonth()-1))
    try{
        const monthData = await users.aggregate([
            {$match: {createdAt: {$gte: prevmonth}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: "$month",total:{$sum: 1}}}
        ])
        res.status(200).json(monthData)
    }catch(err){
        res.status(500).json(err)
    }
})

//get user stats
router.get("/stats", async(req,res)=>{
    const date = new Date()
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1 ))
    try{
        const data = await users.aggregate([
            {
             $match: {
                    createdAt:{$gte: lastyear}
                     }
            },
            {$project:
                {
                    month:{$month:"$createdAt"},
                },
           },
           {
            $group:{

            _id: "$month",
            total: {$sum: 1}

                   }
        }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})


//Stripe payment
router.post("/checkout", (req,res)=>{
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd"
  }, (stripeErr,stripeRes)=>{
    if(stripeErr){
        res.status(500).json(stripeErr)
    }else{
        res.status(200).json(stripeRes)
    }
  })
})
// {data?.map((item)=>{
//     return <div className='orderObjects' key={item._id}>
//             <div className='orderObjectsContainer'>
//                 <div className='objalign'>
//                     <p>Orderid:</p><b>{item._id}</b>
//                 </div>
//                 <div className='objalign'>
//                     <p>Days:</p><b>{item.days}</b>
//                 </div>
//                 <div className='objalign'>
//                     <b>Paid:</b><p> ${item.amount}</p>
//                 </div>
//                 <div className='objalign'>
//                 <b>Date:</b><p style={{color:"white", fontSize: 22,marginLeft: 15,letterSpacing: 2}}>
//                         <Moment format="DD/MM/YYYY" fromNow>
//                          {item.createdAt}
//                         </Moment>
//                     </p>
//                 </div>
//                 <div className='objalign'>
//                     <p style={{color:"white", fontSize: 22,marginLeft: 105,letterSpacing: 2}}>
//                         <Moment  fromNow>
//                            {item.createdAt}
//                            {/* {"1979-04-19T12:59-0500"} */}
//                         </Moment>
//                     </p>
//                 </div>
//             </div>
//            </div>
// })}
module.exports = router