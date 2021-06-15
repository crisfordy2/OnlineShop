const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/category");
const Auth = require("../middleware/auth");
const Employee = require("../middleware/employee");


router.post("/add", Auth, Employee, async(req, res)=>{
    if(!req.body.name) return res.status(401).send("Imcomplete data");

    const validCategory = await Category.findOne({name: req.body.name})
    if(validCategory) return res.status(401).send("Category already exists")

    const category = new Category({
        name: req.body.name
    })

    const result = await category.save();
    if(!result) return res.status(401).send("Error creating category");

    return res.status(200).send({result})
})


router.get("/get", Auth, Employee, async(req, res)=>{

    const category = await Category.find();
    if(!category) return res.status(401).send("Error getting the Categories")

    return res.status(200).send({category});
})


router.put("/update", Auth, Employee, async(req, res)=>{
    if(!req.body.name || !req.body._id || !req.body._id) return res.status(401).send("Imcomplete data");
    
    const validCategory = mongoose.isValidObjectId(req.body._id);
    if(!validCategory) return res.status(401).send("Invalid Category");

    const existCategory = Category.findById(req.body._id);
    if(!existCategory) return res.status(401).send("Category dosen't exist")

    const category = await Category.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        status: true
    })

    if(!category) return res.status(401).send("Error updating the category");
    return res.status(200).send({category})
})


router.put("/delete", Auth, Employee, async(req, res)=>{
    if(!req.body.name || !req.body._id || !req.body._id) return res.status(401).send("Imcomplete data");  
    
    const validCategory = mongoose.isValidObjectId(req.body._id);
    if(!validCategory) return res.status(401).send("Invalid Category");

    const existCategory = Category.findById(req.body._id);
    if(!existCategory) return res.status(401).send("Category dosen't exist")

    const category = await Category.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        status: false
    })

    if(!category) return res.status(401).send("Error deleting the category");
    return res.status(200).send({category})
})



module.exports = router;