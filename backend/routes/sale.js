const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Auth = require("../middleware/auth");
const Employee = require("../middleware/employee");
const User = require("../models/user");
const Sale = require("../models/sale");


router.post("/add", Auth, Employee, async(req, res)=>{
    if(!req.body.idClient || !req.body.idEmployee) return res.status(401).send("Imcomplete data");

    const validClient = mongoose.isValidObjectId(req.body.idClient);
    if(!validClient) return res.status(401).send("Invalid Client");

    const validEmployee = mongoose.isValidObjectId(req.body.idEmployee);
    if(!validEmployee) return res.status(401).send("Invalid Employee");  
    
    const existClient = await User.findById(req.body.idClient)
    if(!existClient) return res.status(401).send("Client dosen't exist")

    const existEmployee = await User.findById(req.body.idEmployee)
    if(!existEmployee) return res.status(401).send("Employee dosen't exist")

    const sale = new Sale({    
        idClient: req.body.idClient,
        idEmployee: req.body.idEmployee
    })

    const result = await sale.save();
    if(!result) return res.status(401).send("Error creating Sale");

    return res.status(200).send({result})
})


router.get("/get", Auth, Employee, async(req, res)=>{

    const sale = await Sale.find().populate("idClient", "fullName").populate("idEmployee", "fullName").exec();
    if(!sale) return res.status(401).send("No results");
    return res.status(200).send({sale});
})


router.put("/update", Auth, Employee, async(req, res)=>{
    if(!req.body.idClient || !req.body.idEmployee || !req.body._id) return res.status(401).send("Imcomplete data");

    const validSale = mongoose.isValidObjectId(req.body._id);
    if(!validSale) return res.status(401).send("Invalid Sale");

    const validClient = mongoose.isValidObjectId(req.body.idClient);
    if(!validClient) return res.status(401).send("Invalid Client");

    const validEmployee = mongoose.isValidObjectId(req.body.idEmployee);
    if(!validEmployee) return res.status(401).send("Invalid Employee");  
    
    const existClient = await User.findById(req.body.idClient)
    if(!existClient) return res.status(401).send("Client dosen't exist")

    const existEmployee = await User.findById(req.body.idEmployee)
    if(!existEmployee) return res.status(401).send("Employee dosen't exist")

    const existSale = await Sale.findById(req.body._id)
    if(!existSale) return res.status(401).send("Sale dosen't exist")

    const sale = await Sale.findByIdAndUpdate(req.body._id,{    
        idClient: req.body.idClient,
        idEmployee: req.body.idEmployee,
        status: true
    })

    if(!sale) return res.status(401).send("Error updating sale");
    return res.status(200).send({sale})
    
})


router.put("/delete", Auth, Employee, async(req, res)=>{
    if(!req.body.idClient || !req.body.idEmployee || !req.body._id) return res.status(401).send("Imcomplete data");

    const validSale = mongoose.isValidObjectId(req.body._id);
    if(!validSale) return res.status(401).send("Invalid Sale");

    const validClient = mongoose.isValidObjectId(req.body.idClient);
    if(!validClient) return res.status(401).send("Invalid Client");

    const validEmployee = mongoose.isValidObjectId(req.body.idEmployee);
    if(!validEmployee) return res.status(401).send("Invalid Employee");  
    
    const existClient = await User.findById(req.body.idClient)
    if(!existClient) return res.status(401).send("Client dosen't exist")

    const existEmployee = await User.findById(req.body.idEmployee)
    if(!existEmployee) return res.status(401).send("Employee dosen't exist")

    const existSale = await Sale.findById(req.body._id)
    if(!existSale) return res.status(401).send("Sale dosen't exist")

    const sale = await Sale.findByIdAndUpdate(req.body._id,{    
        idClient: req.body.idClient,
        idEmployee: req.body.idEmployee,
        status: false
    })

    if(!sale) return res.status(401).send("Error updating sale");
    return res.status(200).send({sale})
    
})


module.exports = router;
