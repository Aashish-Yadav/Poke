const user = require('../Models/user');



exports.SignUp = async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !password || !email) return res.status(400).json({status:400, message:"Need all credentials"});

        try {
            const existingUser = await user.findOne({email})
            if(existing) return res.status(400).json({status:400, message:"user already exists"});

            const newUser = new user({name, email, password});
            await newUser.save();
            res.status(201).json({status:201, message:"user registered successfully"})

        } catch (error) {
            console.log(error);
            res.status(500).json({status:500, message:"error in signup "})
        }   
}   


exports.SignIn = async (req, res) =>{
    const {email, password} = req.body;
    if(!password || !email) return res.status(400).json({status:400, message:"Need all credentials"});

    const existingUser = await user.findOne({email})
}
