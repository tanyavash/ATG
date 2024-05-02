const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async(req,res, next) =>{
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization;
    if(authheader && authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user not authorized");
            }
            req.user = decoded.user;
            next();
        });
        
    }
    if(!token){
        res.status(401);
        throw new Error("token is missing");
    }
});

module.exports = validateToken;