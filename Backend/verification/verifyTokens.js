const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const token =req.cookies.access_token
    if(!token){
        res.status(400).json( "Invalid token")
    }else{
        jwt.verify( token, process.env.JWT_TOKEN,(err,user)=>{
            if(err){
                res.status(400).json("Wrong details")
            }else{
                req.user = user
                next()
            }
        })
    }
}

const verifyUserAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if( req.user.id === req.params.id || req.user.isAdmin){
            next()

        }else{
            res.status(403).json("Invalid")
        }
    })
}

const verifyIsAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.user.isAdmin){
            next()
        }else{
            res.status(403).json( "Invalid")
        }
    })
}

module.exports = {verifyUserAndAuthorization,verifyToken,verifyIsAdmin}