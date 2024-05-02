const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");


const registerUser = asynchandler(async(req, res) => {
    const { username, email, password } = req.body;
    if( !username || !email || !password) {
        res.status(400);
        throw new Error("all fields mandatory");
    }

    const useravailable = await User.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error("user already present");
    }

    //hash password creation
    const hashedpassword = await bcrypt.hash(password, 9);
    console.log("hashed pw:" , hashedpassword);
    
    //create new user
    const user = await User.create({
        username,
        email,
        password: hashedpassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("data not valid");
    }
 
    res.json({message: "register user"});
} );

const loginUser = asynchandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare pwd
    if(user && (await bcrypt.compare(password, user.password))){
        const acessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACESS_TOKEN_SECRET,
        { expiresIn: "200m"}
        );
        res.status(200).json({acessToken});
    }
    else{
        res.status(401);
        throw new Error("username or pwd is not valid");
    }
    //res.json({message: "login user"});
});

const currentUser = asynchandler(async(req, res) => {
    res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser  };