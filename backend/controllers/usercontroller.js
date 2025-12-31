const model = require('../db/usersdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registeruser = async (req,res) => {
    const email = req.body.email;
    const user = await model.findOne({email});
    if(user){
        return res.status(406).json({ message : "Email is already registered" })
    }
    try {
        req.body.resume = req.file?.filename;
        const password = await bcrypt.hash(req.body.password, 10);
        req.body.password = password;
        await model.create(req.body);
        return res.status(201).json({ message : "User registerd" })
    } catch(err) {
        if (err.code === 11000){
            return res.status(400).json({
            message: "User with this phone number is already exists"
            });
        }
        return res.status(500).json({ error : err.message })
    }
};

exports.login = async(req,res) => {
    const { email,password } = req.body;
    try {

        const user = await model.findOne({email});
        if(!user){
            return res.status(406).json({ message : "User not found with this email" })
        }

        const passmatch = await bcrypt.compare(password,user.password);
        if(!passmatch){
            return res.status(406).json({ message : "Invalid password" })
        }

        const token = jwt.sign(
            { userid:user._id, role:user.role, email:user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1*24*60*60*1000
        })
        return res.status(200).json({ 
            token : token,
            message : "Logged in"
         })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
};

exports.getuserdetails = async (req,res) => {
    try{
        const user = await model.findById(req.params.id)
        return res.status(200).json(user)
    } catch(err) {
        return res.status(500).json(err.message)
    }
};

exports.edituserdetails = async (req,res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if(req.file){
            data.resume = req.file.filename;
        }

        const updateuser = await model.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if(!updateuser){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updateuser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
};

exports.authenticateduser = (req,res) => {
    return res.json({
        user: req.user,
    });
};

exports.logout = (req,res) => {
    res.clearCookie("token",{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
    return res.json({ message: "logged out" });
};