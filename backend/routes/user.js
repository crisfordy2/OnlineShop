const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const Rol = require("../models/rol");
const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin");


router.post("/register", async (req, res)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password) return res.status(401).send("Imcomplete data");

    const validEmail = await User.findOne({email: req.body.email})
    if(validEmail) return res.status(401).send("Email already exists")

    const hash = await bcrypt.hash(req.body.password, 10);
    if(!hash) return res.status(401).send("Error in the password");

    const rol = await Rol.findOne({name: "client"});
    if(!rol) return res.status(401).send("Rol dosen't exists");

    const user = await new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        idRol: rol
    })

    
    try {
        const result = await user.save();
        if(!result) return res.status(401).send("Error creating user");
        const token = user.generateJWT()
        return res.status(200).send({token})

    } catch (error) {
        return res.status(401).send("Error creating user");        
    }

});


router.post("/registerAdmin", Auth, Admin, async (req, res)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password || !req.body.idRol) return res.status(401).send("Imcomplete data");

    const validEmail = await User.findOne({email: req.body.email})
    if(validEmail) return res.status(401).send("Email already exists")

    const hash = await bcrypt.hash(req.body.password, 10);
    if(!hash) return res.status(401).send("Error in the password");

    const validRol = mongoose.isValidObjectId(req.body.idRol);
    if(!validRol) return res.status(401).send("Invalid Rol");

    const rol = await Rol.findById(req.body.idRol)
    if(!rol) return res.status(401).send("Rol dosen't exists");

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        idRol: req.body.idRol
    })
    
    try {
        const result = await user.save();
        if(!result) return res.status(401).send("Error creating user");
        const token = user.generateJWT()
        return res.status(200).send({token})

    } catch (error) {
        return res.status(401).send("Error creating user");        
    }

});


router.get("/get",  Auth, Admin, async (req, res)=>{

    const users = await User.find().populate("idRol", "name").exec();
    if(!users) return res.status(401).send("Error getting the users")

    return res.status(200).send({users});
})


router.put("/updateAdmin", Auth, Admin, async (req, res)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password || !req.body.idRol, !req.body._id) return res.status(401).send("Imcomplete data");
    
    const validUser = mongoose.isValidObjectId(req.body._id);
    if(!validUser) return res.status(401).send("Invalid User");

    const existUser = User.findById(req.body._id);
    if(!existUser) return res.status(401).send("User dosen't exist")

    const hash = await bcrypt.hash(req.body.password, 10);
    if(!hash) return res.status(401).send("Error in the password");

    const validRol = mongoose.isValidObjectId(req.body.idRol);
    if(!validRol) return res.status(401).send("Invalid Rol");

    const rol = await Rol.findById(req.body.idRol)
    if(!rol) return res.status(401).send("Rol dosen't exists");

    const user = await User.findByIdAndUpdate(req.body._id ,{
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        idRol: req.body.idRol,
        status: true
    })

    if(!user) return res.status(401).send("Error updating Users")
    return res.status(200).send({user})
});


router.put("/deleteAdmin", Auth, Admin, async (req, res)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password || !req.body.idRol) return res.status(401).send("Imcomplete data");   
    
    const validUser = mongoose.isValidObjectId(req.body._id);
    if(!validUser) return res.status(401).send("Invalid User");

    const existUser = User.findById(req.body._id);
    if(!existUser) return res.status(401).send("User dosen't exist")

    const hash = await bcrypt.hash(req.body.password, 10);
    if(!hash) return res.status(401).send("Error in the password");

    const validRol = mongoose.isValidObjectId(req.body.idRol);
    if(!validRol) return res.status(401).send("Invalid Rol");

    const rol = await Rol.findById(req.body.idRol)
    if(!rol) return res.status(401).send("Rol dosen't exists");

    const user = await User.findByIdAndUpdate(req.body._id ,{
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        idRol: req.body.idRol,
        status: false
    })

    if(!user) return res.status(401).send("Error deleting Users")
    return res.status(200).send({user})
});



module.exports = router;