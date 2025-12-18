const user = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.SignUp = async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !password || !email) return res.status(400).json({status:400, message:"Need all credentials"});

        try {
            const existingUser = await user.findOne({email})
            if(existingUser) return res.status(400).json({status:400, message:"user already exists"});

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new user({name, email, password:hashedPassword});
            console.log(newUser);
            await newUser.save();
            res.status(201).json({status:201, message:"user registered successfully"});

        } catch (error) {
            console.log(error);
            res.status(500).json({status:500, message:"error in signup "});
        }   
}   


exports.SignIn = async (req, res) =>{
    const {email, password} = req.body;

    console.log("Body",req.body)
    if(!password || !email) return res.status(400).json({status:400, message:"Need all credentials"});

    try{
         const existingUser = await user.findOne({email})
        if(!existingUser) return res.status(404).json({status:404,message:"user doesn't exist"});

        const ispasswordcorrect = await bcrypt.compare(password, existingUser.password);
        if(!ispasswordcorrect) return res.status(401).json({status:401, message:"Invalid credentials"});

    const token = jwt.sign({userId:existingUser._id, email : existingUser.email},
         process.env.JWT_TOKEN,
        {expiresIn:process.env.JWT_EXPIRES_IN || "1d"})

        res.status(200).json({status:200 , message:"logged in successfully",
            token, 
            user:{id:existingUser._id, name:existingUser.name, email:existingUser.email}})

    } catch(error){
        console.log("error");
        res.status(500).json({status:500, message:"error in signin"})
    }
}

exports.getAllUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex: req.query.search, $options:"i"}},
            {email:{$regex: req.query.search, $options:"i"}}
        ]
    } : {};
        try {
            const users = await user.find(keyword).find({_id:{$ne: req.user._id}});
            return res.status(200).json({status:200, users});
            console.log("users", users);
        } catch (error) {
            console.log(error)
            return res.status(500).json({status:500, message:"error in fetching users"})
        }
}



