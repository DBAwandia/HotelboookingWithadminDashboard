const express = require("express")
const Hotel = require("../models/Hotel")
const Room = require("../models/Room")
const hotels = require("../models/Hotel")
const router = express.Router()

//post hotel
router.post("/hotels", async (req,res)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(201).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/hotel/:id", async (req,res)=>{
    try{
         await hotels.findByIdAndDelete(req.params.id)
        res.status(201).json("Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/hotel/:id", async(req,res)=>{
    try{
        const updatedHotel = await hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true})
        res.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
    
})
router.get("/hotel/:id", async(req,res)=>{
    
    try{
        const getHotel = await hotels.findById(req.params.id)
        res.status(200).json(getHotel)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/all", async(req,res)=>{
    const {min,max, ...others}= req.query
    try{
        const hotell = await hotels.find({...others, cheapestPrice: {$gt: min | 1, $lt: max || 999},}).limit(req.query.limit)
        res.status(201).json(hotell)
    }catch(err){
        res.status(400).json("err" + err)
    }
    
})
router.get("/finds", async(req,res)=>{
    try{
        const hotells = await hotels.find().limit(6)
        res.status(201).json(hotells)
    }catch(err){
        res.status(400).json("err" + err)
    }
    
})
router.get("/hotel", async(req,res)=>{
    try{
        const hotells = await hotels.find().limit(6)
        res.status(201).json(hotells)
    }catch(err){
        res.status(400).json("err" + err)
    }
    
})
router.delete("/hotel/:id", async(req,res)=>{
    try{
         await hotels.findByIdAndDelete(req.params.id)
        res.status(201).json("deleted")
    }catch(err){
        res.status(400).json("err" + err)
    }
    
})

router.get("/countByDist", async(req,res)=>{
    const names = req.query.names.split(",")
    try{
        const list = await Promise.all(names.map(name=>{
            return hotels.countDocuments({name: name})
        }))
        res.status(201).json(list)
        
    }catch(err){
        res.status(500).json(err)
    }
})
// router.get("/countByType", async(req,res)=>{
//     try{
//         const parkCount = await hotels.countDocuments({type:"park"})
//         res.status(201).json([
//             {type: "park", count: parkCount}
//         ])
//     }catch(err){
//         res.status(500).json(err)
//     }
// })
router.get("/countByName", async(req,res)=>{
    try{
        const nameCount = await hotels.countDocuments({name: "Serena Hotel"})
        const cityCount = await hotels.countDocuments({name: "City Hotel"})
        const gardenCount = await hotels.countDocuments({name: "Garden Hotel"})
        res.status(201).json([{name: "Serena Hotel", count: nameCount}, {name: "City Hotel", count: cityCount},{name: "Garden Hotel", count: gardenCount}])
    }catch(err){ 
        res.status(500).json(err)
    }
})
//update room id
router.get("/room/:id", async (req,res)=>{
    try{
        const hotelID = await hotels.findById(req.params.id)
        const listsId = await Promise.all(hotelID.rooms.map((room=>{
            return Room.findById(room)
        })))
        res.status(200).json(listsId)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router