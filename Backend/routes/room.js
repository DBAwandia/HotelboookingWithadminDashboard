const express= require("express")
const router = express.Router()
const Hotel = require("../models/Hotel")
const hotels = require("../models/Hotel")
const Room = require("../models/Room")
const rooms = require("../models/Room")

//post a room
router.post("/:hotelid", async(req,res)=>{
    const Hotelid = req.params.hotelid
    const newRoom = new Room(req.body)
    
    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(Hotelid,{$push: {rooms: savedRoom._id}})
        }catch(err){
            res.status(500).json(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        res.status(500).json(err)
    }
})
//delete
// router.delete("/:hotelid", async(req,res)=>{
//     try{
//         const hotelId = req.params.hotelid
//         await rooms.findByIdAndDelete(req.params.id)
//         try{
//             await hotels.findByIdAndUpdate(hotelId,{$pull: {rooms: savedRoom._id}})
//         }catch(err){
//             res.status(500).json(err)
//         }
//         res.status(200).json({message: "Deleted"})
//     }catch(err){
//         res.status(500).json(err)
//     }
// })
router.get("/room/:id", async(req,res)=>{
    try{
        const findRoomId = await rooms.findById(req.params.id)
        res.status(200).json(findRoomId)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/room", async(req,res)=>{
    try{
        const findRoom = await rooms.find().sort({_id: -1})
        res.status(200).json(findRoom)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/room/:id", async(req,res)=>{
    try{
        await rooms.findByIdAndDelete(req.params.id)
        res.status(200).json("delted")
    }catch(err){
        res.status(500).json(err)
    }
})
//updateRoomAvailability
router.put("/availability/:id", async(req,res)=>{
    try{
        await rooms.updateOne({"roomNumbers._id": req.params.id},
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.params.date
            }
        })
        res.status(200).json("updated")
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router