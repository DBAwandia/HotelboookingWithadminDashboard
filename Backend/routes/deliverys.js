const express = require("express")
const router = express.Router()
const delivery = require("../models/Delivery")
const Delivery = require("../models/Delivery")


//saving to db
router.post("/savedatas", async(req,res)=>{
    const name = req.body.name
    const photos = req.body.photos
    const phonenumber = req.body.phonenumber
    const city = req.body.city
    const savedData = delivery({name: name, photos: photos, phonenumber: phonenumber, city: city})
    try{
       const lis = await savedData.save()
        res.status(200).json(lis)
    }catch(err){
        res.status(500).json(err)
    }
})
//getbyid
router.get("/find/:id", async(req,res)=>{
    try{
        const list = await delivery.findById(req.params.id)
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})
//findByIdAnUpdate
router.put("/finds/:id",async(req,res)=>{
    try{
        const lists = await delivery.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json(lists)
    }catch(err){
        res.status(500).json(err)
    }
})
//findall
router.get("/finds",async(req,res)=>{
    try{
        const lists = await delivery.find().limit(6)
        res.status(200).json(lists)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/counts",async(req,res)=>{
    try{
        const lists = await delivery.countDocuments({name: "Kennedy"})
        res.status(200).json( {name: "kennedy", list: lists})
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/countss",async(req,res)=>{
    try{
        const lists = await delivery.countDocuments({})
        res.status(200).json(  lists)
    }catch(err){
        res.status(500).json(err)
    }
})
//delete
router.delete("/delete/:id",async(req,res)=>{
    try{
      await delivery.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router