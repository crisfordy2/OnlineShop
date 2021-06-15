const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Rol = require("../models/rol");
const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin");


router.post("/add", Auth, Admin, async(req, res)=>{
    if(!req.body.name) return res.status(401).send("Imcomplete data");

    const validRol = await Rol.findOne({name: req.body.name})
    if(validRol) return res.status(401).send("Rol already exists")

    const rol = new Rol({
        name: req.body.name
    })

    const result = await rol.save();
    if(!result) return res.status(401).send("Error creating rol");

    return res.status(200).send({result})
})


router.get("/get", Auth, Admin, async(req, res)=>{

    const rol = await Rol.find();
    if(!rol) return res.status(401).send("Error getting the roles")

    return res.status(200).send({rol});
})


router.put("/update", Auth, Admin, async(req, res)=>{
    if(!req.body.name || !req.body._id ) return res.status(401).send("Imcomplete data");   
    
    const validRol = mongoose.isValidObjectId(req.body._id);
    if(!validRol) return res.status(401).send("Invalid Rol");

    const existRol = Rol.findById(req.body._id);
    if(!existRol) return res.status(401).send("Rol dosen't exist")

    const rol = await Rol.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        status: true
    })

    if(!rol) return res.status(401).send("Error updating rol");
    return res.status(200).send({rol})
})


router.put("/delete", Auth, Admin, async(req, res)=>{
    if(!req.body.name || !req.body._id ) return res.status(401).send("Imcomplete data");    

    const validRol = mongoose.isValidObjectId(req.body._id);
    if(!validRol) return res.status(401).send("Invalid Rol");

    const existRol = Rol.findById(req.body._id);
    if(!existRol) return res.status(401).send("Rol dosen't exist")

    const rol = await Rol.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        status: false
    })

    if(!rol) return res.status(401).send("Error deleting rol");
    return res.status(200).send({rol})
})



module.exports = router;