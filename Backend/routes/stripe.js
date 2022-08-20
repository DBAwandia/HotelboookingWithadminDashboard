const express = require("express")
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post("/payments", (req,res)=>{
        stripe.charges.create({
            source : req.body.tokenID,
            amount : req.body.amount,
            currency: "usd"
        },(stripeErr, stripeRes)=>{
            if(stripeErr){
                res.status(500).json("Error" + stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        })

})
module.exports = router