const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const orders = require("../models/Order")
router.post("/stripecomplete", async(req,res)=>{
    const name = req.body.name
    const number = req.body.number
    const town = req.body.town
    const areas = req.body.areas
    const province = req.body.province
    const savedData = orders({name: name, areas:areas,town: town, province: province,number: number})
    try{
        const savedDatas = await savedData.save()
        res.status(200).json({details: savedDatas})
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/getusers/:id", async(req,res)=>{
    try{
        const getUser = await orders.findById(req.params.id)
        res.status(201).json(getUser)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router