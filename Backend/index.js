const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()

const cookieParser = require("cookie-parser")


dotenv.config()
app.use(cookieParser())
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true})
const db = mongoose.connection
db.on("err", ()=>console.log("err"))
db.once("open", ()=>console.log("connected to mongoose"))

const roomRouter = require("./routes/room")
app.use("/api/room", roomRouter)

const stripeRouter = require("./routes/stripe")
app.use("/api/stripe", stripeRouter)

const orderRouter = require("./routes/Orders")
app.use("/api/Orders" , orderRouter)

const hotelRouter = require("./routes/hotel")
app.use("/api/hotel", hotelRouter)

const bookOrder = require("./routes/Bookorders")
app.use("/api/Bookorders", bookOrder)

const userRouter = require("./routes/userr")
app.use("/api/userr", userRouter)

const deliveryRouter = require("./routes/deliverys")
app.use("/api/deliverys", deliveryRouter)

app.listen(process.env.PORT || PORT, ()=>console.log("server running"))


